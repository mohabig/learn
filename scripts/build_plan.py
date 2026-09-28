#!/usr/bin/env python3
"""Regenerate the schedule and lesson sections of ai-engineer-30-day-plan.md.

The lesson titles, round counts, checklist tasks and "Done when" lines have one
home: site/course-data.js. The website reads it with a <script src>; this script
reads the same file and rewrites the markdown plan's generated region from it, so
the two cannot drift apart.

The generated region has two parts:

* **The weeks**: the rounds of every lesson, in course order, dealt out ten to a
  week (five study days of two 90-minute rounds), then one week for catching up and
  reviewing. The site's calendar is built the same way from the same data.
* **The lessons**: every lesson under its part, with its checklist.

Only the region between the BEGIN/END marker comments in the markdown is touched.
Every prose section around it is preserved byte for byte.

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

WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]


def _global(text, name):
    """The JSON value assigned to `window.<name>` in course-data.js."""
    start = text.find("window.%s" % name)
    if start == -1:
        return None
    eq = text.index("=", start)
    try:
        value, _ = json.JSONDecoder().raw_decode(text[eq + 1:].lstrip())
    except json.JSONDecodeError as exc:
        raise SystemExit("%s: window.%s is not valid JSON: %s" % (DATA, name, exc))
    return value


def load_data(path=DATA):
    """Parse the JSON payloads out of course-data.js without a JavaScript engine.

    The file is a set of `window.X = <json>;` assignments by design, so the data can
    be read here and by the browser without fetch().
    """
    text = path.read_text(encoding="utf-8")
    weeks = _global(text, "COURSE_WEEKS")
    if not isinstance(weeks, list):
        raise SystemExit(
            "%s: expected a `window.COURSE_WEEKS = [...];` assignment whose right-hand\n"
            "side is strict JSON. See the comment at the top of that file." % path
        )
    pace_cfg = _global(text, "COURSE_PACE") or {"roundsPerWeek": 10}
    review = _global(text, "COURSE_REVIEW") or []
    return weeks, pace_cfg, review


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


def lesson_label(d):
    """"0.1" -> "Lesson 0.1"; "25–27" -> "Lessons 25–27" (matching the site)."""
    return ("Lessons " if ("–" in d or "-" in d) else "Lesson ") + d


def round_titles(day):
    """Round titles come from the checklist: '<b>Round 2 — the call:</b> ...'."""
    titles = []
    for task in day["tasks"][: day.get("rounds", 0)]:
        m = re.match(r"<b>Round \d+ — (.*?):</b>", task)
        titles.append(to_markdown(m.group(1)) if m else "")
    return titles


def rounds_in_order(weeks):
    """Every round in course order: (lesson, round number, rounds in lesson, title)."""
    out = []
    for w in weeks:
        for day in w["days"]:
            n = day.get("rounds", 0)
            for i, title in enumerate(round_titles(day)):
                out.append((day, i + 1, n, title))
    return out


def lesson_name(day):
    return to_markdown(day.get("short") or day["t"])


def week_title(chunk):
    """Lessons with at least two rounds in the week, else every lesson in it."""
    counts, order = {}, []
    for day, _, _, _ in chunk:
        if day["d"] not in counts:
            order.append(day)
            counts[day["d"]] = 0
        counts[day["d"]] += 1
    main = [d for d in order if counts[d["d"]] >= 2] or order
    return " · ".join(lesson_name(d) for d in main)


def pace(weeks, per_week):
    """Round / study-day / week totals, so the plan's headline numbers cannot drift."""
    total = sum(d.get("rounds", 0) for w in weeks for d in w["days"])
    core = sum(d.get("rounds", 0) for w in weeks if w["n"] != 0 for d in w["days"])

    def calendar_weeks(n):
        return -(-n // per_week) + 1              # content weeks, plus the review week

    return total, -(-total // 2), calendar_weeks(total), calendar_weeks(core)


def render(weeks, per_week, review):
    out = [BANNER, ""]
    total, study_days, cal, core_cal = pace(weeks, per_week)
    if total:
        out += [
            "> **The whole course is %d rounds** of 90 minutes: about %d study days, laid out as %d weeks "
            "(Week 0 to Week %d) at 3 hours a day and 5 days a week. The last week has no new lessons: "
            "it is for catching up, reviewing and applying. Leave out the basics (Lessons 0.1 to 0.5) "
            "and it is %d weeks." % (total, study_days, cal, cal - 1, core_cal),
            "",
        ]

    rounds = rounds_in_order(weeks)
    chunks = [rounds[i:i + per_week] for i in range(0, len(rounds), per_week)]
    out += [
        "## The %d weeks" % cal,
        "",
        "Each week is five study days, and each study day is two 90-minute rounds. The rounds of every "
        "lesson are dealt out in order, so a lesson can start in one week and finish in the next. "
        "In the site each round links to its lesson; here it is written out.",
        "",
    ]
    for wi, chunk in enumerate(chunks):
        out += ["### Week %d — %s" % (wi, week_title(chunk)), "",
                "| Day | Round 1 | Round 2 |", "|-----|---------|---------|"]
        for di in range(5):
            cells = chunk[di * 2: di * 2 + 2]
            if not cells:
                continue
            texts = ["%s · round %d of %d: %s" % (lesson_label(d["d"]), r, n, t) for d, r, n, t in cells]
            texts += [""] * (2 - len(texts))
            out.append("| %s | %s | %s |" % (WEEKDAYS[di], texts[0], texts[1]))
        out.append("")
    out += ["### Week %d — Catch up, review, apply" % len(chunks), "",
            "No new lessons. If you are behind, this week is your slack: finish the rounds you skipped first, "
            "then work down this list.", "",
            "| Day | Round 1 | Round 2 |", "|-----|---------|---------|"]
    for di in range(5):
        pair = review[di * 2: di * 2 + 2]
        if not pair:
            continue
        cells = ["**%s.** %s" % (to_markdown(t), to_markdown(x)) for t, x in pair]
        cells += [""] * (2 - len(cells))
        out.append("| %s | %s | %s |" % (WEEKDAYS[di], cells[0], cells[1]))
    out += ["", "---", "", "## The lessons", ""]

    for week in weeks:
        out.append("### Part %s — %s" % (week["n"], to_markdown(week["title"])))
        if week.get("range"):
            out.append("*%s*" % to_markdown(week["range"]))
        out.append("")
        out.append('**Outcome: "%s"**' % to_markdown(week["outcome"]))
        if week.get("note"):
            out += ["", to_markdown(week["note"])]
        out.append("")

        for day in week["days"]:
            heading = "#### %s — %s" % (lesson_label(day["d"]), to_markdown(day["t"]))
            if day.get("lever"):
                heading += " ⭐"
            out.append(heading)
            if day.get("rounds"):
                n = day["rounds"]
                out.append("*%d rounds of 90 minutes · about %d study day%s*" % (n, -(-n // 2), "" if n <= 2 else "s"))
                out.append("")
            for task in day["tasks"]:
                out.append("- [ ] %s" % to_markdown(task))
            if day.get("done"):
                out.append("- [ ] **Done when:** %s" % to_markdown(day["done"]))
            out.append("")

    # the separator after the last part belongs to the surrounding document
    while out and out[-1] in ("", "---"):
        out.pop()
    return "\n".join(out)


def splice(plan_text, generated):
    start = plan_text.find(BEGIN)
    end = plan_text.find(END)
    if start == -1 or end == -1 or end < start:
        raise SystemExit(
            "%s: could not find the %s / %s markers.\n"
            "Add them around the generated schedule and lessons." % (PLAN, BEGIN, END)
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

    weeks, pace_cfg, review = load_data()
    per_week = int(pace_cfg.get("roundsPerWeek", 10))
    current = PLAN.read_text(encoding="utf-8")
    updated = splice(current, render(weeks, per_week, review))

    lessons = sum(len(w["days"]) for w in weeks)
    tasks = sum(len(d["tasks"]) for w in weeks for d in w["days"])
    dones = sum(1 for w in weeks for d in w["days"] if d.get("done"))
    total, _, cal, _ = pace(weeks, per_week)
    summary = "%d parts, %d lessons, %d rounds, %d calendar weeks, %d tasks, %d done-when lines" % (
        len(weeks), lessons, total, cal, tasks, dones)

    if args.check:
        if updated == current:
            print("%s is up to date with %s (%s)." % (PLAN.name, DATA.name, summary))
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
    print("Wrote %s from %s: %s." % (PLAN.name, DATA.name, summary))
    return 0


if __name__ == "__main__":
    sys.exit(main())
