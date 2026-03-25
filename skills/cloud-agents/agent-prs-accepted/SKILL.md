---
name: cloud-agents-prs-accepted
description: "Evaluate: At least one PR accepted from recurrent SWE agents"
---

# At least one PR accepted from recurrent SWE agents

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** At least one PR accepted from recurrent SWE agents

## How to Evaluate

Requires PR history data. Usually Unknown from repo scan. Look for bot/agent PR patterns in docs.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
