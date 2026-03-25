---
name: unblocking-agent-approval
description: "Evaluate: Agents can run safely without approval interruption"
---

# Agents can run safely without approval interruption

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** Agents can run safely without approval interruption

## How to Evaluate

Look for .claude/settings.json with permission configurations, auto-approval settings, or allowed tools lists. Check if there's a workflow that avoids interactive prompts.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
