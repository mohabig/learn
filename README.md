# learn

- [The 80/20 AI Engineer — a 30-Day Plan](ai-engineer-30-day-plan.md) — the fastest realistic path to
  employable AI engineer: model API fluency → RAG → agents & evals → production, with four shipped
  projects by Day 30.
- **[learn.167-233-170-107.sslip.io](https://learn.167-233-170-107.sslip.io)** — the full course as a
  self-contained website, live: every day taught with diagrams, plus progress tracking, search,
  export/import and a printable day view. The source is [site/index.html](site/index.html), which also
  works opened straight off disk.
- [LOG.md](LOG.md) — daily learning log for the plan. Each day page on the site has a
  **Copy log entry** button that fills this template in for you.

## Where the checklist lives

The day titles, tasks and "Done when" lines have one home: **[site/course-data.js](site/course-data.js)**.

The website loads it with a `<script src>` (rather than `fetch`, so the page still works opened
straight off disk as a `file://` URL), and the day-by-day sections of `ai-engineer-30-day-plan.md`
are generated from it. Edit the data file, then:

```
make plan          # or: python3 scripts/build_plan.py
```

Only the region between the `<!-- BEGIN GENERATED DAYS -->` and `<!-- END GENERATED DAYS -->`
markers is rewritten; every prose section around it is left alone.

`make check-plan` (`python3 scripts/build_plan.py --check`) exits non-zero if the markdown has
drifted from the data. The **Check plan** GitHub Actions workflow runs it on every pull request.

## Publishing the site

The site is hosted on the VPS by [Openship](https://openship.io), a self-hosted deployment platform,
and is public at **<https://learn.167-233-170-107.sslip.io>**.

Openship watches this repository and redeploys the `site/` folder on every push to `main`, so
publishing a change is just merging it. There is no build step: `site/index.html` and
`site/course-data.js` are served as they are.

The hostname is the VPS address written in [sslip.io](https://sslip.io) form, which is the default
domain Openship hands out and needs no DNS setup. To put the site on a real domain, add it to the
app in the Openship dashboard and point the domain's DNS at the VPS; Openship issues the TLS
certificate itself.

This repo has no GitHub Pages workflow and Pages is not enabled on it. The only GitHub Actions
workflow is **Check plan** (see above).

## Layout

```
ai-engineer-30-day-plan.md   the plan (day sections generated — see above)
LOG.md                       daily log
Makefile                     make plan / make check-plan
scripts/build_plan.py        generator, stdlib only
site/index.html              the course site, self-contained
site/course-data.js          the checklist, single source of truth
.github/workflows/           check-plan (PRs and pushes to main)
```
