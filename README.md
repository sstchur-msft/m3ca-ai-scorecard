# ★ M3CA AI Readiness Scorecard

A Copilot CLI plugin that evaluates repositories against 42 AI readiness criteria across 5 categories. Features an orchestrator agent, per-criterion skills (contributable by v-team members), and an interactive web-based report.

## Install

```bash
# Add the marketplace (one-time)
copilot plugin marketplace add sstchur-msft/m3ca-ai-scorecard

# Install the plugin
copilot plugin install ai-scorecard@m3ca-scorecard-marketplace
```

## Usage

In Copilot CLI:

```
/agent scorecard
Run the AI Scorecard on this repo
```

The agent will:
1. 📂 Scan the repo
2. 🔍 Evaluate all 42 criteria (using per-criterion skills)
3. 📊 Write `scorecard.json`
4. 🌐 Start interactive web UI at `http://localhost:3939`

### Re-evaluation with context

1. Open `http://localhost:3939`
2. Click "+ Add context" on any criterion
3. Add information the AI couldn't determine from the repo
4. Click "Save Context"
5. Back in Copilot CLI: *"Re-evaluate the scorecard with context"*

## Architecture

```
plugin.json                          ← Plugin manifest
agents/
  scorecard.agent.md                 ← Orchestrator agent
skills/
  scorecard-scan/SKILL.md            ← Repo scanner
  scorecard-report/SKILL.md          ← Report generator
  unblocking/                        ← 11 criteria
    mai-telemetry/SKILL.md
    agency-install/SKILL.md
    ...
  livesite/                          ← 14 criteria
    kusto-queries/SKILL.md
    ...
  cloud-agents/                      ← 8 criteria
    agent-prs-accepted/SKILL.md
    ...
  advanced-automation/               ← 4 criteria
    visual-inspection/SKILL.md
    ...
  ai-agility/                        ← 5 criteria
    product-inventory/SKILL.md
    ...
server/
  scorecard-server.mjs               ← Interactive web server
.github/plugin/
  marketplace.json                   ← Marketplace listing
```

## Contributing (V-Team Members)

Each criterion has its own skill file. To improve an evaluation:

1. Find the skill: `skills/<category>/<criterion>/SKILL.md`
2. Edit the "How to Evaluate" section with your domain expertise
3. Add specific file patterns, config checks, or heuristics
4. Open a PR

### Example: Improving the Kusto criterion

Edit `skills/livesite/kusto-queries/SKILL.md`:

```markdown
## How to Evaluate

Look for:
- Kusto MCP in .mcp.json with service URI pointing to prod clusters
- `run_kusto_query.py` or similar in skills
- kusto references in package.json scripts
- Specific cluster URIs: kusto.aria.microsoft.com, *.kusto.windows.net

**Yes**: Kusto MCP configured with prod cluster access
**Partial**: Kusto references exist but no prod cluster configured
**No**: No Kusto tooling found
```

## Scorecard Categories

| Category | # Criteria | Focus |
|----------|-----------|-------|
| **Unblocking Feature Work** | 11 | Dev tooling, telemetry, skills, test coverage |
| **Live Site** | 14 | Kusto, IcM, Geneva, ECS, deployment |
| **Cloud Agents** | 8 | Cloud agent access, models, speed |
| **Advanced Automation** | 4 | Visual testing, ADO/GH, SFI, deployment |
| **AI Agility** | 5 | Docs, PR quality, product inventory |

## Star Ratings

| Rating | Score |
|--------|-------|
| ★★★ | 80%+ |
| ★★ | 50-79% |
| ★ | 25-49% |
| ☆ | < 25% |

Score = (Yes + Partial × 0.5) / Total × 100
