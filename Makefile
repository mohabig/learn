# Regenerate the day-by-day sections of the markdown plan from the course data
# that the website also reads (site/course-data.js).
.PHONY: plan check-plan

plan:
	python3 scripts/build_plan.py

# Fails if ai-engineer-30-day-plan.md has drifted from site/course-data.js.
check-plan:
	python3 scripts/build_plan.py --check
