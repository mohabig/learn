#!/usr/bin/env python3
"""Production Release & Verification Manager for The 80/20 AI Engineer.

Provides zero-downtime atomic deployments via release directory staging and
symlink swapping, cryptographic SHA-256 manifest verification, stale file detection,
automatic rollback snapshot retention, and remote SSH deployment capabilities.

Usage:
    python3 scripts/release.py --manifest
    python3 scripts/release.py --dry-run
    python3 scripts/release.py --target /opt/openship/static/learn
    python3 scripts/release.py --target /opt/openship/static/learn --rollback
    python3 scripts/release.py --remote root@adklout.com --target /opt/openship/static/learn
    python3 scripts/release.py --health-check https://adklout.com/learn
"""

import argparse
import hashlib
import shutil
import subprocess
import sys
import tarfile
import tempfile
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_DIR = ROOT / "site"
MANIFEST_FILE = SITE_DIR / "SHA256SUMS"
DEFAULT_TARGET = Path("/opt/openship/static/learn")


def compute_file_hash(path: Path) -> str:
    hasher = hashlib.sha256()
    hasher.update(path.read_bytes())
    return hasher.hexdigest()


def generate_manifest() -> dict[str, str]:
    """Generates site/SHA256SUMS for all static assets."""
    manifest = {}
    lines = []

    for file in sorted(SITE_DIR.rglob("*")):
        if file.is_file() and file.name != "SHA256SUMS" and not file.name.startswith("."):
            rel_path = file.relative_to(SITE_DIR).as_posix()
            h = compute_file_hash(file)
            manifest[rel_path] = h
            lines.append(f"{h}  {rel_path}\n")

    MANIFEST_FILE.write_text("".join(lines), encoding="utf-8")
    print(f"Generated {MANIFEST_FILE} with {len(manifest)} verified files.")
    return manifest


def load_manifest(manifest_path: Path) -> dict[str, str]:
    """Reads a SHA256SUMS manifest file."""
    if not manifest_path.exists():
        return {}
    manifest = {}
    for line in manifest_path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split(maxsplit=1)
        if len(parts) == 2:
            h, rel_path = parts
            manifest[rel_path.strip()] = h.strip()
    return manifest


def verify_directory(
    directory: Path, manifest: dict[str, str]
) -> tuple[bool, list[str], list[str], list[str]]:
    """Verifies that directory matches manifest byte-for-byte and has zero unexpected files.

    Returns: (is_valid, missing_files, mismatched_files, extra_files)
    """
    mismatches = []
    missing = []
    extra = []

    # 1. Check all expected files in manifest
    for rel_path, expected_hash in manifest.items():
        dest_file = directory / rel_path
        if not dest_file.exists():
            missing.append(rel_path)
            continue
        actual_hash = compute_file_hash(dest_file)
        if actual_hash != expected_hash:
            mismatches.append(rel_path)

    # 2. Check for obsolete / extra files in directory
    for file in directory.rglob("*"):
        if file.is_file():
            rel_path = file.relative_to(directory).as_posix()
            if (
                rel_path != "SHA256SUMS"
                and not file.name.startswith(".")
                and rel_path not in manifest
            ):
                extra.append(rel_path)

    is_valid = not (missing or mismatches or extra)
    return is_valid, missing, mismatches, extra


def perform_atomic_symlink_swap(target: Path, release_dir: Path):
    """Atomically points target symlink to release_dir using POSIX os.replace."""
    parent = target.parent
    parent.mkdir(parents=True, exist_ok=True)

    # If target exists and is a regular directory (not a symlink), preserve it as legacy backup
    if target.exists() and not target.is_symlink():
        legacy_backup = parent / f"{target.name}-releases" / f"legacy-{int(time.time())}"
        legacy_backup.parent.mkdir(parents=True, exist_ok=True)
        print(f"Migrating non-symlink target to {legacy_backup}...")
        shutil.move(target, legacy_backup)

    tmp_symlink = parent / f".{target.name}.tmp.{int(time.time() * 1000)}"
    if tmp_symlink.is_symlink() or tmp_symlink.exists():
        tmp_symlink.unlink()

    # Create temporary symlink pointing to release_dir
    tmp_symlink.symlink_to(release_dir.resolve())

    # Atomically rename temporary symlink to target
    tmp_symlink.replace(target)
    print(f"Atomically swapped symlink: {target} -> {release_dir.name}")


def prune_old_releases(releases_dir: Path, keep_count: int = 5):
    """Retains the most recent N releases in releases_dir and removes older ones."""
    if not releases_dir.exists():
        return
    releases = sorted(
        [d for d in releases_dir.iterdir() if d.is_dir() and d.name.startswith("release-")],
        key=lambda d: d.name,
    )
    if len(releases) > keep_count:
        to_prune = releases[:-keep_count]
        for old in to_prune:
            print(f"Pruning obsolete release snapshot: {old.name}")
            shutil.rmtree(old)


def deploy_local(target: Path, dry_run: bool = False, keep_count: int = 5) -> bool:
    """Executes atomic staged deployment to a local target directory."""
    print("Compiling modular content bundle...")
    subprocess.run([sys.executable, str(ROOT / "scripts" / "build_site.py")], check=True)

    manifest = generate_manifest()

    parent = target.parent
    releases_dir = parent / f"{target.name}-releases"
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    staged_release = releases_dir / f"release-{timestamp}"

    if dry_run:
        print(f"[DRY-RUN] Staging target: {staged_release}")
        print(f"[DRY-RUN] Would copy {len(manifest)} verified assets and SHA256SUMS")
        print("[DRY-RUN] Would verify staged release byte-for-byte with zero stale files")
        print(f"[DRY-RUN] Would atomically swap symlink {target} -> {staged_release.name}")
        print(f"[DRY-RUN] Would retain {keep_count} previous release snapshots")
        return True

    print(f"Staging release in {staged_release}...")
    staged_release.mkdir(parents=True, exist_ok=True)

    # 1. Copy assets to staging
    for rel_path in manifest:
        src = SITE_DIR / rel_path
        dst = staged_release / rel_path
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)

    shutil.copy2(MANIFEST_FILE, staged_release / "SHA256SUMS")

    # 2. Verify staging directory
    is_valid, missing, mismatches, extra = verify_directory(staged_release, manifest)
    if not is_valid:
        print(
            f"CRITICAL: Staging verification failed! Missing: {missing}, Mismatches: {mismatches}, Extra: {extra}"
        )
        shutil.rmtree(staged_release)
        return False

    # 3. Atomic symlink swap
    perform_atomic_symlink_swap(target, staged_release)

    # 4. Verify active target
    target_valid, _t_miss, _t_mism, _t_extra = verify_directory(target, manifest)
    if not target_valid:
        print("CRITICAL: Live target verification failed after swap! Aborting...")
        rollback_local(target)
        return False

    # 5. Prune old releases
    prune_old_releases(releases_dir, keep_count=keep_count)

    print("\n=======================================================")
    print(f" ATOMIC RELEASE DEPLOYED & VERIFIED AT {target}")
    print(f" Active Release:  {staged_release.name}")
    print(f" Verified Assets: {len(manifest)} files")
    print(f" Timestamp:       {timestamp}")
    print("=======================================================\n")
    return True


def rollback_local(target: Path) -> bool:
    """Restores target symlink to the previous release snapshot."""
    releases_dir = target.parent / f"{target.name}-releases"
    if not releases_dir.exists():
        print(f"No releases directory found at {releases_dir}")
        return False

    releases = sorted(
        [d for d in releases_dir.iterdir() if d.is_dir() and d.name.startswith("release-")],
        key=lambda d: d.name,
    )
    if not releases:
        print(f"No release snapshots found in {releases_dir}")
        return False

    current_target = None
    if target.is_symlink():
        try:
            current_target = target.resolve()
        except Exception:
            current_target = None

    # Pick candidate preceding the active one
    candidate = None
    if current_target:
        for r in reversed(releases):
            if r.resolve() != current_target:
                candidate = r
                break
    if not candidate:
        candidate = releases[-1] if releases else None

    if not candidate:
        print("No eligible rollback candidate found.")
        return False

    print(f"Initiating rollback to snapshot: {candidate.name}...")
    perform_atomic_symlink_swap(target, candidate)
    print(f"Rollback successful: {target} now points to {candidate.name}")
    return True


def deploy_remote(remote: str, target: Path, dry_run: bool = False, keep_count: int = 5) -> bool:
    """Deploys site to remote host over SSH with remote atomic staging and verification."""
    print("Building content bundle and generating cryptographic manifest...")
    subprocess.run([sys.executable, str(ROOT / "scripts" / "build_site.py")], check=True)
    manifest = generate_manifest()

    timestamp = time.strftime("%Y%m%d_%H%M%S")
    archive_name = f"learn-release-{timestamp}.tar.gz"

    with tempfile.TemporaryDirectory() as tmp_dir:
        archive_path = Path(tmp_dir) / archive_name

        print(f"Packaging {len(manifest)} assets into {archive_path.name}...")
        with tarfile.open(archive_path, "w:gz") as tar:
            for file in sorted(SITE_DIR.rglob("*")):
                if file.is_file() and not file.name.startswith("."):
                    arcname = file.relative_to(SITE_DIR).as_posix()
                    tar.add(file, arcname=arcname)

        if dry_run:
            print(f"[DRY-RUN] Remote target: {remote}:{target}")
            print(
                f"[DRY-RUN] Would upload archive {archive_path.name} ({archive_path.stat().st_size} bytes)"
            )
            print(
                f"[DRY-RUN] Would invoke remote atomic staging, SHA256 verification, and symlink swap on {remote}"
            )
            return True

        remote_parent = target.parent.as_posix()
        remote_releases = f"{remote_parent}/{target.name}-releases"
        remote_staged = f"{remote_releases}/release-{timestamp}"

        # Script to run on remote server
        remote_script = f"""set -e
mkdir -p {remote_releases} {remote_staged}
tar -xzf - -C {remote_staged}
cd {remote_staged}
sha256sum -c SHA256SUMS
ln -sfn {remote_staged} {target.as_posix()}
# Prune old releases keeping last {keep_count}
cd {remote_releases}
ls -d release-* 2>/dev/null | sort | head -n -{keep_count} | xargs -r rm -rf
echo "REMOTE_SUCCESS: Deployed release-{timestamp} to {target.as_posix()}"
"""

        print(f"Streaming release bundle to {remote} via SSH...")
        with open(archive_path, "rb") as f:
            proc = subprocess.run(
                ["ssh", remote, f"bash -c {subprocess.list2cmdline([remote_script])}"],
                stdin=f,
                capture_output=True,
                text=True,
                check=False,
            )

        if proc.returncode != 0:
            print(f"Remote deployment failed (exit code {proc.returncode}):\n{proc.stderr}")
            return False

        print(proc.stdout.strip())
        print("\n=======================================================")
        print(f" REMOTE RELEASE DEPLOYED & VERIFIED ON {remote}")
        print(f" Target Path:     {target}")
        print(f" Release ID:      release-{timestamp}")
        print(f" Assets:          {len(manifest)} verified files")
        print("=======================================================\n")
        return True


def check_health(url: str, timeout_sec: int = 10) -> bool:
    """Performs HTTP/HTTPS health probe against deployed URL."""
    print(f"Probing deployment health at {url}...")
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "learn-deploy-verifier/1.0"},
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout_sec) as resp:
            status = resp.status
            body = resp.read().decode("utf-8", errors="replace")
            if status == 200 and "The 80/20 AI Engineer" in body:
                print(f"HEALTH CHECK PASSED: HTTP {status} OK, content verified.")
                return True
            print(f"HEALTH CHECK FAILED: HTTP {status}, unexpected content.")
            return False
    except urllib.error.URLError as err:
        print(f"HEALTH CHECK FAILED: Unable to reach {url}: {err}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Production Release Manager with Atomic Symlink Staging & Verification"
    )
    parser.add_argument(
        "--target", type=Path, default=DEFAULT_TARGET, help="Deployment target directory"
    )
    parser.add_argument(
        "--remote",
        type=str,
        default=None,
        help="Remote SSH host ([user@]hostname) for remote deployment",
    )
    parser.add_argument(
        "--dry-run", action="store_true", help="Preview release actions without making changes"
    )
    parser.add_argument(
        "--manifest", action="store_true", help="Only regenerate site/SHA256SUMS manifest"
    )
    parser.add_argument(
        "--rollback", action="store_true", help="Restore target to latest previous release snapshot"
    )
    parser.add_argument(
        "--verify-only", action="store_true", help="Verify target against current manifest"
    )
    parser.add_argument(
        "--health-check",
        type=str,
        default=None,
        help="URL to probe for HTTP 200 and content verification",
    )
    parser.add_argument(
        "--keep", type=int, default=5, help="Number of release snapshots to retain (default: 5)"
    )

    args = parser.parse_args()

    if args.manifest:
        generate_manifest()
        return

    if args.rollback:
        if args.remote:
            print(
                "Remote rollback via CLI is currently unsupported; SSH into the host and swap symlink."
            )
            sys.exit(1)
        if not rollback_local(args.target):
            sys.exit(1)
        return

    if args.verify_only:
        manifest = generate_manifest()
        is_valid, missing, mismatches, extra = verify_directory(args.target, manifest)
        if not is_valid:
            print(f"FAILED: Missing: {missing}, Mismatches: {mismatches}, Extra: {extra}")
            sys.exit(1)
        print(f"SUCCESS: Target verified against {len(manifest)} cryptographic hashes.")
        return

    success = False
    if args.remote:
        success = deploy_remote(
            args.remote, args.target, dry_run=args.dry_run, keep_count=args.keep
        )
    else:
        success = deploy_local(args.target, dry_run=args.dry_run, keep_count=args.keep)

    if not success:
        sys.exit(1)

    if args.health_check and not args.dry_run and not check_health(args.health_check):
        sys.exit(1)


if __name__ == "__main__":
    main()
