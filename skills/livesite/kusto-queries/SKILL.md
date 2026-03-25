---
name: livesite-kusto-queries
description: "Evaluate: Agent can run Kusto queries in prod, non-EUDB clusters"
---

# Agent can run Kusto queries in prod, non-EUDB clusters

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** Agent can run Kusto queries in prod, non-EUDB clusters

## How to Evaluate

Look for Kusto MCP in .mcp.json, kusto references in scripts/skills, run_kusto_query.py or similar. Check for kusto service URI configurations.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
