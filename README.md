# learn

A 3-month course for becoming an AI engineer, at 3 hours a day: 13 weeks, Week 0 to Week 12. It is
written in plain language and built around retrieval practice: you learn a little, then spend most of
your time recalling, trying and fixing.

- [The 80/20 AI Engineer: a 3-month plan](ai-engineer-30-day-plan.md): the fastest realistic path to an
  employable AI engineer. Model API fluency, then RAG, then agents and evals, then production, with four
  shipped projects at the end.
- [site/index.html](site/index.html): the whole course as one self-contained website. Every day is taught
  in short rounds with pictures, plus progress tracking, spaced warm-ups, an error log, search and a
  printable day view. Open the file directly in a browser. No server is needed.
- [LOG.md](LOG.md): the daily learning log. Each day page has a **Copy log entry** button that fills the
  template in for you.

## How the course teaches

The full method is on the site's **How to learn** tab. In short:

- **Rounds.** Every lesson is cut into 90-minute rounds, and two rounds make one 3-hour study day.
  A round is: 10 min warm-up from memory, 25 min learn one small chunk, close the page and recall it,
  40 min try it with no tutorial (three hints wait), 10 min study your mistakes, 5 min say what you must
  be able to rebuild tomorrow.
- **Warm-ups are spaced.** The warm-up pulls one question from the round you finished last, the one
  before, and others from about 3 days, a week, two weeks and a month back. It only asks about rounds
  you have ticked as done.
- **Error log.** Four questions after every round: what did I get wrong, why, what idea was I missing,
  how will I spot it next time. The entries live in the **Error log** tab and export with your progress.
- **Part maps.** Each of the five parts starts with a rough mental map to read once, then redraw from
  memory. It opens in the calendar week where that part begins.
- **Pictures.** Every concept has a picture built from one shared icon set, next to the technical diagrams.

## The 13 weeks

The **course** tab is a calendar. Each week is five study days (Monday to Friday), and each study
day is two rounds, so a week is ten rounds. The rounds of every lesson are dealt out in order, so a
lesson can start in one week and finish in the next. The last week has no new lessons: it is for
catching up, reviewing and applying.

Two settings on the Overview shape it: the date Week 0 starts, and whether you already have the basics
(leaving out Lessons 0.1 to 0.5 moves every week up). The **Today** label at the top follows both. A
second view, **By lesson**, lists the same lessons grouped into parts, with search.

Vocabulary: a **lesson** is a topic with its own page (one to two study days). A **part** is a group
of lessons with one outcome. A **round** is one 90-minute sitting. A **week** is on the calendar.

## Where the checklist lives

Lesson titles, round counts, checklist tasks, "Done when" lines and the pace that lays the lessons out
over the weeks have one home: **[site/course-data.js](site/course-data.js)**.

The website loads it with a `<script src>` (rather than `fetch`, so the page still works opened straight
off disk as a `file://` URL), and the day-by-day sections of `ai-engineer-30-day-plan.md` are generated
from it. Edit the data file, then:

```
make plan          # or: python3 scripts/build_plan.py
```

The generated region holds the week-by-week schedule and every lesson with its checklist. Only the
region between the `<!-- BEGIN GENERATED DAYS -->` and `<!-- END GENERATED DAYS -->` markers is
rewritten; every prose section around it is left alone.

`make check-plan` (`python3 scripts/build_plan.py --check`) exits non-zero if the markdown has drifted
from the data. The **Check plan** GitHub Actions workflow runs it on every pull request.

Each lesson's `tasks` list holds **one item per round, then one "Teach it back" item**, and `rounds` says
how many. The article for that lesson in `index.html` must have the same number of
`<section class="round">` blocks, because ticking a round is what unlocks its warm-up questions for later
rounds. `COURSE_PACE.roundsPerWeek` (10) and `COURSE_REVIEW` (the last week) live there too, so the site's
calendar and the plan's schedule are built from the same numbers.

## Editing a lesson

Each lesson is one `<article data-day="…">` in `site/index.html`, with a `day-lede`, a `daymap` picture, then
one `<section class="round" data-title="…">` per round. A round holds `.learn` (one or two `.concept`s,
each with a picture and a `dl.words` glossary), `.closebook`, `.attempt` (a `.goal` and three `details.hint`),
an optional `.mixin`, `.traps`, a `ul.recall-bank` of questions for later warm-ups, and a `.tomorrow`
line. The lesson ends with a `.teachback` and a `.ladder`.

The round heading, time strip, warm-up, error-log form and "round done" tick box are added by the page's
script, so they are not in the HTML. Pictures use the icon sprite at the top of `<body>`
(`<use href="#i-robot">` and so on), so they follow light and dark mode.

## Publishing the site

The GitHub Pages workflow was removed, so nothing publishes the site automatically. `site/` is plain static
files: open `site/index.html` locally, or host the folder on any static host.

## Layout

```
ai-engineer-30-day-plan.md   the plan (day sections generated: see above)
LOG.md                       daily log
Makefile                     make plan / make check-plan
scripts/build_plan.py        generator, stdlib only
site/index.html              the course site, self-contained
site/course-data.js          the checklist, single source of truth
.github/workflows/           check-plan (runs on pull requests)
```
