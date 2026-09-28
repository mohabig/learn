# The Curious AI Builder

This is a hands-on course for a curious young builder. It teaches real ideas from AI engineering without assuming the learner is already an adult software developer. The goal is not to get hired: it is to make useful, interesting things with AI, understand how they work, and notice when they get things wrong. The main course is self-paced; ask a trusted adult before installing software, creating accounts, using paid services, or sharing work online.

- **[The 90-Day Curious AI Builder Course](ai-engineer-90-day-plan.md)** — the main guided journey: start with foundations, build a project around a topic you care about, and grow it into a careful, tested AI system. The optional final six days are challenges, not a deadline.
- **[The 30-Day Professional Sprint](ai-engineer-30-day-plan.md)** — a separate, compressed track for experienced adult developers; it is not the recommended starting point for young learners.
- **[site/index.html](site/index.html)** — the interactive course with daily lessons, visual tools, optional challenge labs, and spaced-retrieval practice.
- **[LOG.md](LOG.md)** — daily learning log for the plan (`make log` or 1-click export from web).
- **[starters/](starters/)** — optional adult reference code for production-style AI services; not needed for the young learner course.
- **[labs/](labs/)** — four optional pretend debugging mysteries. They are extensions, not required lessons.
- **[datasets/](datasets/)** — sample data for experiments; use only fictional or public examples in the main course.

## Two separate learning paths

| Path | Duration | Who it is for | Scope |
|---|---|---|---|
| **Curious AI Builder** | 12 weeks + optional challenges | Curious learners building with supportive adult guidance where needed | Programming foundations $\to$ model experiments $\to$ search and sources $\to$ safe tools $\to$ testing, reflection, and a project showcase. |
| **Professional Sprint** | 4 Weeks (30 Days) | Experienced adult backend / full-stack engineers | Fast-track model API fluency, vector search, evals, and production deployment. |

*The website keeps progress for each path separate. The main course is the young learner path; the professional sprint is an adult extension.*

## Developer & Study Commands

```bash
make plan          # rebuild markdown plan from site/course-data.js
make check-plan    # verify markdown and course data are in sync (CI check)
make build-site    # compile modular content into site/content-bundle.js
make test          # run full test suite (labs, starters, widgets, and datasets)
make status        # view current course completion stats
make log           # interactive daily learning logger
make drill         # 10-minute active recall spaced retrieval challenge
make labs          # run all 4 adversarial bug hunt production labs
```

## Deployment architecture (maintainers)

The application has two distinct deployment tiers:

1. **Staging / GitHub Pages Preview:**
   `.github/workflows/pages.yml` automatically bundles and deploys the `site/` folder to GitHub Pages on every push to `main`.
2. **Production Release (`/opt/openship/static/learn`):**
   Production deployments are managed via `scripts/release.py`:
   ```bash
   python3 scripts/release.py --target /opt/openship/static/learn
   ```
   This generates a cryptographic `SHA256SUMS` manifest, creates an atomic timestamped backup snapshot (`/opt/openship/static/learn.bak.<timestamp>`), syncs the verified build, and validates all file hashes. To rollback instantly:
   ```bash
   python3 scripts/release.py --target /opt/openship/static/learn --rollback
   ```

## Layout

```
ai-engineer-90-day-plan.md   the flagship 12-week (84-day) plan
ai-engineer-30-day-plan.md   the accelerated 30-day sprint plan
LOG.md                       daily learning log
Makefile                     make plan / build-site / test / labs / drill / status
datasets/                    sample evaluation datasets (invoices, golden RAG)
labs/                        hands-on adversarial bug hunt debugging labs (Labs 1–4)
scripts/build_plan.py        markdown plan generator
scripts/build_site.py        modular lesson content compiler
scripts/release.py           production release manager with hash verification
scripts/log.py               progress tracker & spaced retrieval drill CLI
scripts/test_widgets.js      automated widget unit test suite
scripts/test_browser_e2e.js  headless browser end-to-end integration test suite
site/index.html              lightweight modern shell (<30 KB)
site/content/                modular lesson articles and week intros
site/content-bundle.js       compiled lesson content bundle
site/course-data.js          the 12-week course checklist (single source of truth)
site/drills-data.js          the 16 core spaced retrieval drills
site/labs-data.js            the 4 adversarial bug hunt lab scenarios
site/reference-data.js       25 senior interview gauntlet & portfolio rubrics
site/style.css               modern glassmorphic design system
site/widgets.js              interactive visualizer widgets (Vector Compass, SSE Streamer)
starters/                    FastAPI SSE streaming starter & BudgetGuard safety module
.github/workflows/           ci.yml (CI quality gate) and pages.yml (deploy)
```
