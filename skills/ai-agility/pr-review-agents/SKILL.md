---
name: agility-pr-review-agents
description: "Evaluate: Product/repo-context aware PR agents automatically review all PRs"
---

# Product/repo-context aware PR agents automatically review all PRs

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** Product/repo-context aware PR agents automatically review all PRs

## How to Evaluate

Look for .github/agents/ with review agents, PR review skills, or automated review configurations.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
