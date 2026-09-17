# The 80/20 AI Engineer

- **[The 12-Week AI Engineer: 84-Day Plan](ai-engineer-90-day-plan.md)** — the flagship 12-week (84-day) journey to build production-ready engineering foundations and a portfolio of 4 shipped AI systems, with optional Days 85–90 Capstone Hardening & Hiring Sprint.
- **[The 80/20 AI Engineer: 30-Day Accelerated Sprint](ai-engineer-30-day-plan.md)** — the compressed 4-week fast track for experienced software engineers.
- **[site/index.html](site/index.html)** — the modern, self-contained interactive web platform: daily step-by-step builds, live 1,536-D Vector Compass, SSE Streaming Ticker, in-browser Spaced Retrieval Drills, and Command Palette (`Cmd+K`).
- **[LOG.md](LOG.md)** — daily learning log for the plan (`make log` or 1-click export from web).
- **[starters/](starters/)** — production-grade FastAPI SSE microservice scaffolding with Pydantic v2 schemas and `starters/common/budget_guard.py` for spend caps and eval caching.
- **[labs/](labs/)** — four adversarial bug hunt production mystery labs (thundering herd, inverted vector metric, prompt injection, and stream leak).
- **[datasets/](datasets/)** — curated evaluation benchmarks for structured extraction and golden RAG retrieval.

## The Two Curricula

| Path | Duration | Who it is for | Scope |
|---|---|---|---|
| **Flagship Path** | 12 Weeks (84 Days) | Developers wanting ground-up production mastery | Developer foundations $\to$ Async Python $\to$ Model APIs $\to$ Hybrid RAG $\to$ Compound AI & MCP $\to$ vLLM / LoRA $\to$ Production Fortress Capstone. |
| **Accelerated Sprint** | 4 Weeks (30 Days) | Experienced backend / full-stack engineers | Fast-track model API fluency, vector search, evals, and production deployment with 4 public shipped repos. |

*Note: Progress on the website is tracked independently in separate namespaces (`ai80-20-flagship-v1` and `ai80-20-sprint-v1`).*

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

## Deployment Architecture

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
