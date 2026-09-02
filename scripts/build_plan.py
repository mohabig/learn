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
PLAN = ROOT / "ai-engineer-30-day-plan.md"

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
    match = re.search(r"window\.COURSE_WEEKS\s*=\s*(\[.*\])\s*;\s*$", text, re.S)
    if not match:
        raise SystemExit(
            "%s: expected a `window.COURSE_WEEKS = [...];` assignment whose right-hand\n"
            "side is strict JSON. See the comment at the top of that file." % path
        )
    try:
        return json.loads(match.group(1))
    except json.JSONDecodeError as exc:
        raise SystemExit("%s: right-hand side is not valid JSON: %s" % (path, exc))


def to_markdown(text):
    """Convert the inline HTML the site renders into markdown."""
    text = re.sub(r"<code>(.*?)</code>", r"`\1`", text, flags=re.S)
    text = re.sub(r"<b>(.*?)</b>", r"**\1**", text, flags=re.S)
    text = re.sub(r"<(?:i|em)>(.*?)</(?:i|em)>", r"*\1*", text, flags=re.S)
    leftover = re.findall(r"</?[a-zA-Z][^>]*>", text)
    if leftover:
        raise SystemExit(
            "unhandled inline HTML in course data: %s\n"
            "Add a rule to to_markdown() in scripts/build_plan.py." % ", ".join(sorted(set(leftover)))
        )
    return html.unescape(text)


def day_label(d):
    """"0.1" -> "Day 0.1"; "25-27" -> "Days 25-27" (matching the site)."""
    return ("Days " if ("–" in d or "-" in d) else "Day ") + d


def render(weeks):
    out = [BANNER, ""]
    for week in weeks:
        out.append("## Week %s — %s" % (week["n"], to_markdown(week["title"])))
        if week.get("range"):
            out.append("*%s*" % to_markdown(week["range"]))
        out.append("")
        out.append('**Outcome: "%s"**' % to_markdown(week["outcome"]))
        if week.get("note"):
            out += ["", to_markdown(week["note"])]
        out.append("")

        for day in week["days"]:
            heading = "### %s — %s" % (day_label(day["d"]), to_markdown(day["t"]))
            if day.get("lever"):
                heading += " ⭐"
            out.append(heading)
            for task in day["tasks"]:
                out.append("- [ ] %s" % to_markdown(task))
            if day.get("done"):
                out.append("- [ ] **Done when:** %s" % to_markdown(day["done"]))
            out.append("")

        out.append("---")
        out.append("")

    # the separator after the last week belongs to the surrounding document
    while out and out[-1] in ("", "---"):
        out.pop()
    return "\n".join(out)


def splice(plan_text, generated):
    start = plan_text.find(BEGIN)
    end = plan_text.find(END)
    if start == -1 or end == -1 or end < start:
        raise SystemExit(
            "%s: could not find the %s / %s markers.\n"
            "Add them around the Week 0 .. Day 30 region." % (PLAN, BEGIN, END)
        )
    head = plan_text[: start + len(BEGIN)]
    tail = plan_text[end:]
    return "%s\n\n%s\n\n%s" % (head, generated, tail)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument(
        "--check",
        action="store_true",
        help="do not write; exit 1 if the markdown plan is out of date",
    )
    args = parser.parse_args(argv)

    weeks = load_weeks()
    current = PLAN.read_text(encoding="utf-8")
    updated = splice(current, render(weeks))

    days = sum(len(w["days"]) for w in weeks)
    tasks = sum(len(d["tasks"]) for w in weeks for d in w["days"])
    dones = sum(1 for w in weeks for d in w["days"] if d.get("done"))

    if args.check:
        if updated == current:
            print(
                "%s is up to date with %s (%d weeks, %d days, %d tasks, %d done-when lines)."
                % (PLAN.name, DATA.name, len(weeks), days, tasks, dones)
            )
            return 0
        diff = difflib.unified_diff(
            current.splitlines(True),
            updated.splitlines(True),
            fromfile="%s (on disk)" % PLAN.name,
            tofile="%s (generated)" % PLAN.name,
        )
        sys.stdout.writelines(diff)
        print(
            "\n%s is stale. Run `make plan` (or `python3 scripts/build_plan.py`) and commit the result."
            % PLAN.name,
            file=sys.stderr,
        )
        return 1

    if updated == current:
        print("%s already up to date." % PLAN.name)
        return 0

    PLAN.write_text(updated, encoding="utf-8")
    print(
        "Wrote %s from %s: %d weeks, %d days, %d tasks, %d done-when lines."
        % (PLAN.name, DATA.name, len(weeks), days, tasks, dones)
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
