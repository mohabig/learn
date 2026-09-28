# learn

A 3-month course for becoming an AI engineer, at 3 hours a day. It is written in plain language and
built around retrieval practice: you learn a little, then spend most of your time recalling, trying and
fixing.

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

- **Rounds.** Every course day is cut into 90-minute rounds, and two rounds make one 3-hour study day.
  A round is: 10 min warm-up from memory, 25 min learn one small chunk, close the page and recall it,
  40 min try it with no tutorial (three hints wait), 10 min study your mistakes, 5 min say what you must
  be able to rebuild tomorrow.
- **Warm-ups are spaced.** The warm-up pulls one question from the round you finished last, the one
  before, and others from about 3 days, a week, two weeks and a month back. It only asks about rounds
  you have ticked as done.
- **Error log.** Four questions after every round: what did I get wrong, why, what idea was I missing,
  how will I spot it next time. The entries live in the **Error log** tab and export with your progress.
- **Weekly maps.** Each week starts with a rough mental map to read once, then redraw from memory.
- **Pictures.** Every concept has a picture built from one shared icon set, next to the technical diagrams.

The pace is 5 study days a week. The **Today** label at the top follows the start date you set on the
Overview.

## Where the checklist lives

Day titles, round counts, checklist tasks and "Done when" lines have one home:
**[site/course-data.js](site/course-data.js)**.

The website loads it with a `<script src>` (rather than `fetch`, so the page still works opened straight
off disk as a `file://` URL), and the day-by-day sections of `ai-engineer-30-day-plan.md` are generated
from it. Edit the data file, then:

```
make plan          # or: python3 scripts/build_plan.py
```

Only the region between the `<!-- BEGIN GENERATED DAYS -->` and `<!-- END GENERATED DAYS -->` markers is
rewritten; every prose section around it is left alone.

`make check-plan` (`python3 scripts/build_plan.py --check`) exits non-zero if the markdown has drifted
from the data. The **Check plan** GitHub Actions workflow runs it on every pull request.

Each day's `tasks` list holds **one item per round, then one "Teach it back" item**, and `rounds` says how
many. The article for that day in `index.html` must have the same number of `<section class="round">`
blocks, because ticking a round is what unlocks its warm-up questions for later rounds.

## Editing a day

Each day is one `<article data-day="…">` in `site/index.html`, with a `day-lede`, a `daymap` picture, then
one `<section class="round" data-title="…">` per round. A round holds `.learn` (one or two `.concept`s,
each with a picture and a `dl.words` glossary), `.closebook`, `.attempt` (a `.goal` and three `details.hint`),
an optional `.mixin`, `.traps`, a `ul.recall-bank` of questions for later warm-ups, and a `.tomorrow`
line. The day ends with a `.teachback` and a `.ladder`.

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
