---
name: scorecard-scan
description: "Scan the current repository and write scorecard-scan.json with file tree and key file contents for scorecard evaluation."
---

# Scorecard Repo Scan

Scan the current repository to gather context for AI scorecard evaluation.

## What to examine

1. **File tree**: List all files 2 levels deep (excluding node_modules, .git, dist, build, coverage)
2. **Key configuration files** — read and include contents of:
   - `CLAUDE.md`, `AGENTS.md`, `README.md`, `CONTRIBUTING.md`
   - `package.json`, `tsconfig.json`
   - `.github/copilot-instructions.md`
   - `.github/instructions/*.instructions.md`
   - `.mcp.json`, `.copilot/mcp.json`
3. **CI/CD configs**: list files in `.github/workflows/` and `azure/`
4. **Skill/agent directories**: list contents of `.claude/skills/`, `.github/copilot/`, `.github/agents/`
5. **Test configs**: `jest.config.*`, `vitest.config.*`, `playwright.config.*`
6. **Lint configs**: `eslint.config.*`, `.eslintrc.*`, `.prettierrc*`
7. **Monorepo configs**: `lage.config.js`, `rush.json`, `nx.json`, `turbo.json`
8. **Previous context**: if `scorecard-context.json` exists, include it

## Output

Write `scorecard-scan.json` in the repo root:

```json
{
  "repoName": "repo-name",
  "scannedAt": "ISO-timestamp",
  "fileTree": ["file1", "dir/file2", ...],
  "keyFiles": {
    "CLAUDE.md": "contents...",
    "package.json": "contents..."
  },
  "ciConfigs": ["workflow1.yml", "workflow2.yml"],
  "skills": ["skill1", "skill2"],
  "agents": ["agent1", "agent2"],
  "additionalContext": {}
}
```
