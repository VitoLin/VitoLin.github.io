---
title: "Building an OpenCode Plugin for MorphLLM"
date: 2026-02-08
tags: post
permalink: "/morph-opencode-plugin/"
---

# Building an OpenCode Plugin for MorphLLM

{{ page.date | date: "%Y-%m-%d" }}
[[toc]]

## The Problem

[OpenCode](https://opencode.ai/) is my primary AI coding assistant—fast, local, and dead simple to extend. But using GitHub Copilot as a provider meant burning through monthly premium requests on trivial tasks like "format this JSON."

Every prompt ate the same quota whether it needed Opus or not. Debugging sessions would hit the limit mid-month, leaving weaker models for the rest of the month. Or worse, hesitating to use powerful models because the quota felt too precious to waste.

The goal: route simple prompts to cheaper models automatically, reserve premium requests for complex tasks, and keep the workflow seamless.

## The Solution

[MorphLLM](https://morphllm.com/) has a prompt classification system that categorizes prompts as `easy`, `medium`, or `hard`. The idea: build an OpenCode plugin that uses this classification to route prompts to the right model automatically.

The result is [`opencode-morphllm`](https://www.npmjs.com/package/opencode-morphllm), a plugin that brings MorphLLM's model routing and MCP tools into OpenCode.

## How It Works

Here's the routing in practice with GitHub Copilot:

| Prompt | Classification | Model Used | Premium Request? |
|--------|---------------|------------|------------------|
| "Format this JSON" | Easy | GPT-5 Mini | ❌ No |
| "Add a React component" | Medium | Minimax M2.1 (free) | ❌ No |
| "Debug this race condition" | Hard | Gemini 2.5 Pro | ✅ Yes |
| "Explain this regex" | Easy | GPT-5 Mini | ❌ No |
| "Refactor this class" | Medium | Minimax M2.1 (free) | ❌ No |

Premium requests now last the entire month. Usage dropped roughly **70-80%** while response quality on complex tasks actually improved—no more hesitation about using the expensive model when it matters.

## Implementation

### Model Router

The router hooks into OpenCode's `chat.message` event, classifies the prompt via MorphLLM's API, and swaps in the appropriate model:

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

That's the core concept—extract text, classify, swap model. See the [full source on GitHub](https://github.com/VitoLin/opencode-morphllm/blob/main/src/morph/router.ts) for the complete implementation including prompt caching mode and session tracking.

### MCP Tools

The plugin also injects MorphLLM's specialized tools via OpenCode's config hook:

```typescript
// src/index.ts
const MorphOpenCodePlugin: Plugin = async () => {
  const builtinMcps = createBuiltinMcps();
  const routerHook = createModelRouterHook();

  return {
    config: async (currentConfig) => {
      currentConfig.mcp = { ...currentConfig.mcp, ...builtinMcps };
    },
    ...routerHook,
  };
};
```

#### edit_file - Fast Apply

Morph's [**Fast Apply**](https://morphllm.com/mcp) technology applies changes at [**10,500+ tokens/sec**](https://morphllm.com/mcp) with [**~98% accuracy**](https://morphllm.com/edit-formats)—roughly [**2x faster**](https://morphllm.com/mcp) than traditional search-and-replace approaches.

Traditional methods struggle:
- Diff formats: 70-80% accuracy, pattern matching breaks on complex changes
- Whole file rewrites: 60-75% accuracy, inefficient for large files  
- Unified diff: 80-85% accuracy, technical complexity causes errors

Fast Apply uses **semantic merge**: provide the original code and an update snippet with `// ... existing code ...` placeholders, and it intelligently merges them while preserving imports, types, and structure. Works with partial snippets, handles multi-location edits, and is robust to imperfect inputs.

#### warpgrep_codebase_search - Subagent Search

**WarpGrep** is a [**code search subagent**](https://docs.morphllm.com/sdk/components/warp-grep) that operates in its own context window. Instead of dumping raw grep results into the main agent's context (causing pollution and "context rot"), it performs intelligent multi-step searches and returns only relevant code.

Under the hood, it uses three tools: **grep** (ripgrep), **read** (file sections), and **list_dir** (directory exploration). It performs up to [**24 tool calls**](https://docs.morphllm.com/sdk/components/warp-grep) (8 parallel × 4 turns) in [**under 6 seconds**](https://docs.morphllm.com/sdk/components/warp-grep), reasoning about what to search.

The result: [**4x faster**](https://morphllm.com/products/warpgrep) agentic code search, [**no embeddings required**](https://docs.morphllm.com/sdk/components/warp-grep), better long-horizon performance, and clean context.

## Configuration

The plugin supports both user-level (`~/.config/opencode/morph.json`) and project-level (`.opencode/morph.json`) configs with JSONC support.

Example setup:

```json
{
  "MORPH_API_KEY": "your_key_here",
  "MORPH_ROUTER_CONFIGS": {
    "MORPH_MODEL_EASY": "github-copilot/gpt-5-mini",
    "MORPH_MODEL_MEDIUM": "opencode/kimi-k2.5-free",
    "MORPH_MODEL_HARD": "opencode/kimi-k2.5-free",
    "MORPH_ROUTER_ENABLED": true
  }
}
```

My personal setup routes easy prompts to Copilot's cheaper tier and medium/hard to free Kimi models. Install via:

```json
{
  "plugins": ["opencode-morphllm"]
}
```

OpenCode handles the npm installation automatically.

## Results

After a few weeks of use:

- Premium requests last the entire month
- ~70-80% cost reduction on simple tasks
- Better responses on complex tasks (no more hesitation)
- Zero friction—just type and the right model handles it

Routing adds ~50-100ms latency for classification, negligible compared to the savings.

## Links

- **GitHub**: [VitoLin/opencode-morphllm](https://github.com/VitoLin/opencode-morphllm)
- **NPM**: [opencode-morphllm](https://www.npmjs.com/package/opencode-morphllm)
- **MorphLLM**: [morphllm.com](https://morphllm.com/)
- **OpenCode**: [opencode.ai](https://opencode.ai/)
