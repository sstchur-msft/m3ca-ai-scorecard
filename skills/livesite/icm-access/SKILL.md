---
name: livesite-icm-access
description: "Evaluate: Agent can access and update IcMs (local/codespace — MCP exists)"
---

# Agent can access and update IcMs (local/codespace — MCP exists)

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** Agent can access and update IcMs (local/codespace — MCP exists)

## How to Evaluate

Look for ICM MCP in .mcp.json or scripts. Check for investigate-incident skills or icm references.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
