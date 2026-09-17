# Regenerate the day-by-day sections of the markdown plan from the course data
# that the website also reads (site/course-data.js).
.PHONY: plan check-plan build-site status log drill labs test

plan:
	python3 scripts/build_plan.py

build-site:
	python3 scripts/build_site.py

# Fails if markdown plan has drifted from site/course-data.js.
check-plan:
	python3 scripts/build_plan.py --check

status:
	python3 scripts/log.py --status

log:
	python3 scripts/log.py

drill:
	python3 scripts/log.py --drill

labs:
	python3 labs/lab_01_retry_storm/test_lab01.py
	python3 labs/lab_02_inverted_retrieval/test_lab02.py
	python3 labs/lab_03_prompt_injection/test_lab03.py
	python3 labs/lab_04_stream_leak/test_lab04.py
	@echo "All 4 Adversarial Bug Hunt labs passed."

test: labs
	uv run --directory starters --extra dev pytest
	node scripts/test_widgets.js
	node scripts/test_browser_e2e.js
	python3 -m json.tool datasets/messy_invoices.json > /dev/null
	python3 -m json.tool datasets/golden_rag_eval.json > /dev/null
	@echo "All tests, labs, starters, widgets, and browser E2E validations passed."

release:
	python3 scripts/release.py

verify-deploy:
	python3 scripts/release.py --verify-only
