---
name: agility-pr-size-quality
description: "Evaluate: >75% of PRs in the week are in good size (< 500LOC and < 10 files touched)"
---

# >75% of PRs in the week are in good size (< 500LOC and < 10 files touched)

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** >75% of PRs in the week are in good size (< 500LOC and < 10 files touched)

## How to Evaluate

Requires PR history data. Usually Unknown from repo scan.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
