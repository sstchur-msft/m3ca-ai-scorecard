---
name: scorecard-report
description: "Generate the final scorecard.json file and start the interactive web server at localhost:3939."
---

# Scorecard Report Generator

## Instructions

After all criteria have been evaluated, generate the scorecard report.

### 1. Write scorecard.json

Collect all evaluation results and write `scorecard.json` in the repo root:

```json
{
  "repoName": "repo-name",
  "generatedAt": "ISO-timestamp",
  "categories": [
    {
      "name": "UNBLOCKING FEATURE WORK",
      "results": [
        { "criterion": "criterion text", "value": "Yes|No|Partial|Unknown", "reasoning": "brief explanation" }
      ]
    }
  ]
}
```

Include ALL 42 criteria across all 5 categories:
- UNBLOCKING FEATURE WORK (11)
- LIVE SITE (14)
- CLOUD AGENTS (8)
- ADVANCED AUTOMATION (4)
- AI AGILITY (5)

### 2. Start the interactive web server

Run in the background:
```bash
node node_modules/m3ca-ai-scorecard/server/scorecard-server.mjs &
```

### 3. Tell the user

```
★ AI Scorecard complete!
🌐 Open http://localhost:3939 to view the interactive scorecard
📝 Add context per criterion in the web UI
🔄 Say "re-evaluate the scorecard with context" to re-run with your additions
```
