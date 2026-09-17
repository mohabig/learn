#!/usr/bin/env python3
"""Regenerate the per-day sections of ai-engineer-30-day-plan.md.

The day titles, checklist tasks and "Done when" lines have one home:
site/course-data.js. The website reads it with a <script src>; this script
reads the same file and rewrites the markdown plan's day region from it, so
the two cannot drift apart again.

Only the region between the BEGIN/END marker comments in the markdown is
touched. Every prose section around it — the reframe, the Day 0 gate, the
ground rules, the stack, the 15 questions, the portfolio bar, the weekly
checkpoints, the resources, the variants and the honest expectations — is
preserved byte for byte.

    python3 scripts/build_plan.py            rewrite the markdown
    python3 scripts/build_plan.py --check    exit 1 if the markdown is stale

Standard library only, Python 3.8+.
"""

import argparse
import difflib
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "site" / "course-data.js"
DEFAULT_PLAN = ROOT / "ai-engineer-90-day-plan.md"

BEGIN = "<!-- BEGIN GENERATED DAYS -->"
END = "<!-- END GENERATED DAYS -->"

BANNER = (
    "<!-- Generated from site/course-data.js by scripts/build_plan.py — do not edit\n"
    "     this region by hand. Edit the data file and run `make plan`. -->"
)


def load_weeks(path=DATA):
    """Parse the JSON payload out of the course-data.js assignment.

    The file is `window.COURSE_WEEKS = <json>;` by design, so the data can be
    read here without a JavaScript engine and by the browser without fetch().
    """
    text = path.read_text(encoding="utf-8")
    match = re.search(r"window\.COURSE_WEEKS\s*=\s*(\[.*\])\s*;\s*$", text, re.DOTALL)
    if not match:
        raise SystemExit(
            f"{path}: expected a `window.COURSE_WEEKS = [...];` assignment whose right-hand\n"
            "side is strict JSON. See the comment at the top of that file."
        )
    try:
        return json.loads(match.group(1))
    except json.JSONDecodeError as exc:
        raise SystemExit(f"{path}: right-hand side is not valid JSON: {exc}")


def to_markdown(text):
    """Convert the inline HTML the site renders into markdown."""
    text = re.sub(r"<code>(.*?)</code>", r"`\1`", text, flags=re.DOTALL)
    text = re.sub(r"<b>(.*?)</b>", r"**\1**", text, flags=re.DOTALL)
    text = re.sub(r"<(?:i|em)>(.*?)</(?:i|em)>", r"*\1*", text, flags=re.DOTALL)
    leftover = re.findall(r"</?[a-zA-Z][^>]*>", text)
    if leftover:
        raise SystemExit(
            "unhandled inline HTML in course data: {}\n"
            "Add a rule to to_markdown() in scripts/build_plan.py.".format(
                ", ".join(sorted(set(leftover)))
            )
        )
    return html.unescape(text)


def day_label(d):
    """ "0.1" -> "Day 0.1"; "25-27" -> "Days 25-27" (matching the site)."""
    return ("Days " if ("–" in d or "-" in d) else "Day ") + d


def render(weeks):
    out = [BANNER, ""]
    for week in weeks:
        out.append("## Week {} — {}".format(week["n"], to_markdown(week["title"])))
        if week.get("range"):
            out.append("*{}*".format(to_markdown(week["range"])))
        out.append("")
        out.append('**Outcome: "{}"**'.format(to_markdown(week["outcome"])))
        if week.get("note"):
            out += ["", to_markdown(week["note"])]
        out.append("")

        for day in week["days"]:
            heading = "### {} — {}".format(day_label(day["d"]), to_markdown(day["t"]))
            if day.get("lever"):
                heading += " ⭐"
            out.append(heading)
            for task in day["tasks"]:
                out.append(f"- [ ] {to_markdown(task)}")
            if day.get("done"):
                out.append("- [ ] **Done when:** {}".format(to_markdown(day["done"])))
            out.append("")

        out.append("---")
        out.append("")

    # the separator after the last week belongs to the surrounding document
    while out and out[-1] in ("", "---"):
        out.pop()
    return "\n".join(out)


def splice(plan_text, generated, plan_name="plan"):
    start = plan_text.find(BEGIN)
    end = plan_text.find(END)
    if start == -1 or end == -1 or end < start:
        raise SystemExit(
            f"{plan_name}: could not find the {BEGIN} / {END} markers.\n"
            "Add them around the generated region."
        )
    head = plan_text[: start + len(BEGIN)]
    tail = plan_text[end:]
    return f"{head}\n\n{generated}\n\n{tail}"


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument(
        "--check",
        action="store_true",
        help="do not write; exit 1 if the markdown plan is out of date",
    )
    parser.add_argument(
        "--plan",
        type=Path,
        default=DEFAULT_PLAN,
        help="path to markdown plan to update (default: ai-engineer-90-day-plan.md)",
    )
    args = parser.parse_args(argv)

    plan_path = args.plan
    if not plan_path.is_absolute():
        plan_path = ROOT / plan_path

    weeks = load_weeks()
    current = plan_path.read_text(encoding="utf-8")
    updated = splice(current, render(weeks), plan_path.name)

    days = sum(len(w["days"]) for w in weeks)
    tasks = sum(len(d["tasks"]) for w in weeks for d in w["days"])
    dones = sum(1 for w in weeks for d in w["days"] if d.get("done"))

    if args.check:
        if updated == current:
            print(
                f"{plan_path.name} is up to date with {DATA.name} ({len(weeks)} weeks, {days} days, {tasks} tasks, {dones} done-when lines)."
            )
            return 0
        diff = difflib.unified_diff(
            current.splitlines(True),
            updated.splitlines(True),
            fromfile=f"{plan_path.name} (on disk)",
            tofile=f"{plan_path.name} (generated)",
        )
        sys.stdout.writelines(diff)
        print(
            f"\n{plan_path.name} is stale. Run `make plan` (or `python3 scripts/build_plan.py`) and commit the result.",
            file=sys.stderr,
        )
        return 1

    if updated == current:
        print(f"{plan_path.name} already up to date.")
        return 0

    plan_path.write_text(updated, encoding="utf-8")
    print(
        f"Wrote {plan_path.name} from {DATA.name}: {len(weeks)} weeks, {days} days, {tasks} tasks, {dones} done-when lines."
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
