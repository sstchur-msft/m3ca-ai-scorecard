---
name: unblocking-agency-install
description: "Evaluate: Managed dev enlistments have Agency installed by default"
---

# Managed dev enlistments have Agency installed by default

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** Managed dev enlistments have Agency installed by default

## How to Evaluate

Look for Agency/agent references in dev setup scripts, devbox configs, onboarding docs, or package.json scripts (e.g., 'yarn agency'). Check devbox/ or .devcontainer/ for Agency setup.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
