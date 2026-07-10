---
title: "OpenCode Plugin for MorphLLM"
description: "An OpenCode plugin that uses MorphLLM's classifier to route prompts to the cheapest adequate model, cutting premium usage by 70-80%."
date: 2026-02-08
tags: post
permalink: "/morph-opencode-plugin/"
---

# OpenCode Plugin for MorphLLM

{{ page.date | date: "%Y-%m-%d" }}
[[toc]]

## Background

I was burning through my GitHub Copilot quota on trivial stuff. "Update the README" doesn't need Opus, but every prompt ate the same monthly allowance. Mid-month I'd be rationing requests or settling for weaker models.

[MorphLLM](https://morphllm.com/) has a classifier that tags prompts as easy, medium, or hard. I built [`opencode-morphllm`](https://www.npmjs.com/package/opencode-morphllm) to route prompts to appropriate models based on complexity.

## The Router

The plugin hooks OpenCode's `chat.message` event:

```typescript
// src/morph/router.ts
export function createModelRouterHook() {
  return {
    'chat.message': async (input, output) => {
      if (!MORPH_ROUTER_ENABLED) return;

      const promptText = extractPromptText(output.parts);
      const classification = await getMorphClient()
        .routers.raw.classify({ input: promptText });
      
      const chosen = pickModelForDifficulty(classification?.difficulty);
      input.model.providerID = chosen.providerID || input.model.providerID;
      input.model.modelID = chosen.modelID || input.model.modelID;
    },
  };
}
```

Morph returns `easy`, `medium`, or `hard`. The `pickModelForDifficulty` maps those to configured models:

```typescript
function pickModelForDifficulty(difficulty?: string) {
  switch (String(difficulty).toLowerCase()) {
    case 'easy':   return parseModel(MORPH_MODEL_EASY);
    case 'medium': return parseModel(MORPH_MODEL_MEDIUM);
    case 'hard':   return parseModel(MORPH_MODEL_HARD);
    default:       return parseModel(MORPH_MODEL_DEFAULT);
  }
}
```

There's also a caching mode where it sticks to the first model chosen per session—useful if your provider charges less for cached prompts.

## MCP Tools

The plugin injects Morph's MCP tools through the config hook:

```typescript
// src/morph/mcps.ts
export function createBuiltinMcps() {
  return {
    morph_mcp: {
      type: 'local',
      command: ['npx', '-y', '@morphllm/morphmcp'],
      environment: {
        MORPH_API_KEY: API_KEY,
        ENABLED_TOOLS: 'edit_file,warpgrep_codebase_search',
      },
      enabled: true,
    },
  };
}
```

**edit_file** uses Morph's Fast Apply. Instead of diff matching, you provide the original code plus a snippet with `// ... existing code ...` placeholders. It merges semantically, preserving imports and structure. Morph claims ~98% accuracy at 10,500+ tokens/sec.

**warpgrep_codebase_search** runs as a subagent in its own context. Instead of dumping raw grep results into your main conversation, it performs multi-step searches (up to 24 tool calls across 4 turns) and returns relevant code. Keeps your main context clean—no embedding index required.

## My Setup

```json
{
  "MORPH_API_KEY": "key",
  "MORPH_ROUTER_CONFIGS": {
    "MORPH_MODEL_EASY": "github-copilot/gpt-5-mini",
    "MORPH_MODEL_MEDIUM": "opencode/kimi-k2.5-free",
    "MORPH_MODEL_HARD": "opencode/kimi-k2.5-free",
    "MORPH_ROUTER_ENABLED": true
  }
}
```

Easy stuff goes to Copilot's cheaper tier. Medium and hard go to free Kimi models. Premium usage dropped 70-80%. Classification adds ~50-100ms.

Install by adding to `~/.config/opencode/opencode.json`:

```json
{
  "plugins": ["opencode-morphllm"]
}
```

OpenCode handles npm installation.

## Continuation

Some things I want to explore:
> - Testing the router's accuracy on a benchmark of prompts
> - Adding support for more model providers

## Links

- [GitHub](https://github.com/VitoLin/opencode-morphllm)
- [NPM](https://www.npmjs.com/package/opencode-morphllm)
- [MorphLLM](https://morphllm.com/)
