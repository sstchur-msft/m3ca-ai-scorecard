---
name: livesite-ecs-rollout-status
description: "Evaluate: Given an ECS flag in code, agent can determine rollout status for various rings"
---

# Given an ECS flag in code, agent can determine rollout status for various rings

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** Given an ECS flag in code, agent can determine rollout status for various rings

## How to Evaluate

Look for ECS/feature-flag skills that query rollout status. Check for Control Tower integration or ECS API access.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
