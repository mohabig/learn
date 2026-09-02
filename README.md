# learn

- [The 80/20 AI Engineer — a 30-Day Plan](ai-engineer-30-day-plan.md) — the fastest realistic path to
  employable AI engineer: model API fluency → RAG → agents & evals → production, with four shipped
  projects by Day 30.
- [site/index.html](site/index.html) — the full course as a self-contained website: every day taught
  with diagrams, plus progress tracking, search, export/import and a printable day view. Open the
  file directly in a browser, or serve it with GitHub Pages.
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

`.github/workflows/pages.yml` publishes the `site/` folder to GitHub Pages on every push to `main`
that touches it. To turn it on once:

**Settings → Pages → Build and deployment → Source: GitHub Actions.**

No other setup is needed — the workflow uploads `site/` as the Pages artifact, so the folder does
not have to be renamed to `docs/` or moved to the repo root.

## Layout

```
ai-engineer-30-day-plan.md   the plan (day sections generated — see above)
LOG.md                       daily log
Makefile                     make plan / make check-plan
scripts/build_plan.py        generator, stdlib only
site/index.html              the course site, self-contained
site/course-data.js          the checklist, single source of truth
.github/workflows/           check-plan (PRs) and pages (deploy)
```
