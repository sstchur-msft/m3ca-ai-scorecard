---
name: unblocking-pr-checks
description: "Evaluate: Agent changes pass PR checks before CI (linting/formatting, lockfiles, build, etc.)"
---

# Agent changes pass PR checks before CI (linting/formatting, lockfiles, build, etc.)

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** Agent changes pass PR checks before CI (linting/formatting, lockfiles, build, etc.)

## How to Evaluate

Check CI/CD configs for lint, format, build, test steps. Look for pre-commit hooks, GitHub Actions workflows, or Azure pipeline definitions that run on PR. Check for prepare-for-pr style skills.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
