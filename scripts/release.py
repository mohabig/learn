#!/usr/bin/env python3
"""Production Release & Verification Manager for The 80/20 AI Engineer.

Bridges GitHub Pages (Staging/Preview) and Production (/opt/openship/static/learn)
with cryptographic SHA-256 manifests, atomic backup snapshots, and rollback automation.

Usage:
    python3 scripts/release.py --manifest                 # generate site/SHA256SUMS
    python3 scripts/release.py --dry-run                  # preview sync without changes
    python3 scripts/release.py --target /path/to/prod     # deploy with snapshot & verification
    python3 scripts/release.py --rollback                 # restore most recent backup snapshot
"""

import argparse
import hashlib
import os
import shutil
import subprocess
import sys
import time
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


def verify_target(target: Path, manifest: dict[str, str]) -> bool:
    """Verifies that target matches SHA256SUMS byte-for-byte."""
    mismatches = []
    missing = []

    for rel_path, expected_hash in manifest.items():
        dest_file = target / rel_path
        if not dest_file.exists():
            missing.append(rel_path)
            continue
        actual_hash = compute_file_hash(dest_file)
        if actual_hash != expected_hash:
            mismatches.append(rel_path)

    if missing:
        print(f"FAILED: Missing {len(missing)} files in target: {missing[:5]}")
        return False
    if mismatches:
        print(f"FAILED: Hash mismatch in {len(mismatches)} files: {mismatches[:5]}")
        return False

    print(f"SUCCESS: Target verified against {len(manifest)} cryptographic hashes.")
    return True


def rollback(target: Path):
    parent = target.parent
    prefix = f"{target.name}.bak."
    backups = sorted(parent.glob(f"{prefix}*"))
    if not backups:
        print(f"No backup snapshots found in {parent} matching {prefix}*")
        sys.exit(1)

    latest_backup = backups[-1]
    print(f"Found latest backup snapshot: {latest_backup}")

    temp_rollback = parent / f"{target.name}.tmp.rollback"
    if target.exists():
        shutil.move(target, temp_rollback)

    shutil.copytree(latest_backup, target)
    if temp_rollback.exists():
        shutil.rmtree(temp_rollback)

    print(f"Rollback successful: Restored {target} from {latest_backup.name}.")


def deploy(target: Path, dry_run: bool = False):
    # 1. First ensure site content bundle is up to date
    subprocess.run([sys.executable, str(ROOT / "scripts" / "build_site.py")], check=True)

    # 2. Generate cryptographic manifest
    manifest = generate_manifest()

    if dry_run:
        print(f"[DRY-RUN] Would deploy {len(manifest)} files from {SITE_DIR} to {target}")
        return

    # 3. Create backup snapshot if target exists
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    if target.exists():
        backup_path = target.parent / f"{target.name}.bak.{timestamp}"
        print(f"Creating timestamped backup snapshot at {backup_path}...")
        try:
            shutil.copytree(target, backup_path)
        except PermissionError as err:
            print(f"Permission denied creating backup in {target.parent}: {err}")
            print("Tip: Run with sudo if target directory is restricted.")
            sys.exit(1)

    # 4. Atomic copy
    print(f"Deploying site to {target}...")
    target.mkdir(parents=True, exist_ok=True)
    for rel_path in manifest:
        src = SITE_DIR / rel_path
        dst = target / rel_path
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)

    # 5. Copy manifest
    shutil.copy2(MANIFEST_FILE, target / "SHA256SUMS")

    # 6. Verify deployed files
    if not verify_target(target, manifest):
        print("CRITICAL: Verification failed! Initiating automatic rollback...")
        rollback(target)
        sys.exit(1)

    print(f"\n=======================================================")
    print(f" RELEASE VERIFIED & DEPLOYED TO {target}")
    print(f" Verified Assets: {len(manifest)} files")
    print(f" Timestamp:       {timestamp}")
    print(f"=======================================================\n")


def main():
    parser = argparse.ArgumentParser(description="Production Release Manager with Hash Verification")
    parser.add_argument("--target", type=Path, default=DEFAULT_TARGET, help="Deployment target directory")
    parser.add_argument("--dry-run", action="store_true", help="Preview release actions without changes")
    parser.add_argument("--manifest", action="store_true", help="Only regenerate site/SHA256SUMS manifest")
    parser.add_argument("--rollback", action="store_true", help="Restore target to latest backup snapshot")
    parser.add_argument("--verify-only", action="store_true", help="Verify target against current manifest")

    args = parser.parse_args()

    if args.manifest:
        generate_manifest()
        return

    if args.rollback:
        rollback(args.target)
        return

    if args.verify_only:
        manifest = generate_manifest()
        if not verify_target(args.target, manifest):
            sys.exit(1)
        return

    deploy(args.target, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
