---
name: livesite-ecs-change-history
description: "Evaluate: Given an ECS flag in code, agent can see change history (when was this last modified?)"
---

# Given an ECS flag in code, agent can see change history (when was this last modified?)

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** Given an ECS flag in code, agent can see change history (when was this last modified?)

## How to Evaluate

Look for ECS change history tools, audit logs, or history query capabilities.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
