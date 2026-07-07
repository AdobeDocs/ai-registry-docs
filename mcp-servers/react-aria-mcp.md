---
title: "React Aria MCP"
description: "AI-powered React Aria documentation tools. Browse component docs and primitives directly from your IDE or chat app."
---

# React Aria MCP

> AI-powered React Aria documentation tools. Browse component docs and primitives directly from your IDE or chat app.

**Version:** 1.0.0 | **Status:** active | **Category:** Developer Tools, Learning and Documentation | **Deployment:** local

**Tags:** `react-aria`, `react`, `mcp`, `documentation`, `accessibility`, `hooks`, `hide-from-playground`
**Surface:** Developer
**Vendor:** Adobe
**Owner:** GRP-REACT-SPECTRUM-MCP-OWNERS
**Repository:** [https://github.com/adobe/react-spectrum](https://github.com/adobe/react-spectrum)
**Updated:** 2026-03-25

---

## About

The React Aria MCP Server exposes tools for working with React Aria documentation. It lets developers discover components and primitives, list available pages, and fetch full markdown content directly in their IDE—no context switching.

Using the React Aria MCP provides:

⋅ Natural-language interaction: Describe intent (e.g., "show me the Button docs", "find the useButton hook", "what are the Dialog options?") and let the LLM invoke the appropriate tools.
⋅ Consistent experience: The same React Aria MCP tools work across Cursor, VS Code, Claude Code, Codex, and Gemini CLI.
⋅ No authentication: The server runs locally via npx; no sign-in required.
⋅ Representative workflows: List documentation pages, fetch full markdown content for components and hooks, and preview page structure before fetching.

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `list_react_aria_pages` | List available pages in the React Aria docs. Use to discover component and hook documentation before fetching full content. |
| `get_react_aria_page_info` | Return page description and list of section titles for a given page. Use to preview a page's structure before fetching full content with get_react_aria_page. |
| `get_react_aria_page` | Return full page markdown, or only the specified section. Use for component docs, hooks (useButton, useDialog), guides, or API reference. |

### Prompts

_No prompts listed._

---

## Installation Steps

Node.js must be installed on your system to run the MCP server.

Supported MCP clients: Cursor, VS Code, Claude Code, Codex, Gemini CLI.

Cursor:
	1. Add the React Aria MCP server via Cursor's MCP install guide.
	2. Use the following config in mcp.json:

{
	"mcpServers": {
		"React Aria": {
			"command": "npx",
			"args": ["@react-aria/mcp@latest"]
		}
	}
}

Or use the Add to Cursor button on https://react-aria.adobe.com/ai

VS Code:
	code --add-mcp '{"name":"React Aria","command":"npx","args":["@react-aria/mcp@latest"]}'

Claude Code:
	claude mcp add react-aria npx @react-aria/mcp@latest

	For more information, see the Claude Code MCP documentation: https://docs.claude.com/en/docs/claude-code/mcp

Gemini CLI:
	gemini mcp add react-aria npx @react-aria/mcp@latest

	For more information, see the Gemini CLI MCP documentation: https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md#how-to-set-up-your-mcp-server

---

## Accessing the MCP Server

The server runs locally via npx; no authentication required.

---

## Documentation

- https://react-aria.adobe.com/ai

---

## Support

_No support contact provided._
