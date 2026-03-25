---
name: unblocking-claude-md-coverage
description: "Evaluate: High-quality AGENT.md/CLAUDE.md coverage, kept up to date"
---

# High-quality AGENT.md/CLAUDE.md coverage, kept up to date

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** High-quality AGENT.md/CLAUDE.md coverage, kept up to date

## How to Evaluate

Check for CLAUDE.md and AGENTS.md at repo root and in subdirectories. Evaluate quality: does it cover architecture, commands, code style, testing? Yes = root + multiple package-level files with substantive content. Partial = only root level. No = missing or empty.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
