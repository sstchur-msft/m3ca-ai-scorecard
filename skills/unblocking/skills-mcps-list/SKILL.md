---
name: unblocking-skills-mcps-list
description: "Evaluate: Repo has a recommended useful list of skills, MCPs, plugins, hooks, etc."
---

# Repo has a recommended useful list of skills, MCPs, plugins, hooks, etc.

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** Repo has a recommended useful list of skills, MCPs, plugins, hooks, etc.

## How to Evaluate

Check .claude/skills/ directory, .mcp.json, .github/agents/, .github/instructions/, hooks.json. Count the number of skills and MCPs. Yes = 10+ skills/MCPs, Partial = 1-9, No = 0.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
