---
name: unblocking-engineering-skills
description: "Evaluate: Agents have repo-specific skills for basic engineering practices"
---

# Agents have repo-specific skills for basic engineering practices

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** Agents have repo-specific skills for basic engineering practices

## How to Evaluate

Check .claude/skills/ for skills covering: building, testing, linting, PR creation, dependency management. Count relevant skills. Yes = 5+ engineering skills, Partial = 1-4, No = 0.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
