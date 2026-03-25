---
name: unblocking-test-coverage
description: "Evaluate: The repository has 80%+ line and branch test coverage"
---

# The repository has 80%+ line and branch test coverage

## Evaluation Instructions

Assess whether the current repository meets this criterion.

**Criterion:** The repository has 80%+ line and branch test coverage

## How to Evaluate

Look for coverage thresholds in jest.config, vitest.config, or CI configs. Check for coverage reports or badges in README. If no threshold is configured, mark Partial if tests exist, No if minimal tests.

## Output

Return your evaluation as:
- **value**: "Yes", "No", "Partial", or "Unknown"
- **reasoning**: One sentence explaining your assessment

If `scorecard-context.json` exists and contains additional context for this criterion (keyed by category name + "::" + criterion text), incorporate that context into your evaluation.
