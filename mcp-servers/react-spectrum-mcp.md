---
title: "React Spectrum (S2) MCP"
description: "AI-powered React Spectrum S2 documentation and design system tools. Browse component docs, search icons and illustrations, and look up style values—all from your IDE or chat app."
---

# React Spectrum (S2) MCP

> AI-powered React Spectrum S2 documentation and design system tools. Browse component docs, search icons and illustrations, and look up style values—all from your IDE or chat app.

**Version:** 1.0.0 | **Status:** active | **Category:** Developer Tools, Learning and Documentation | **Deployment:** local

**Tags:** `react-spectrum`, `design-system`, `mcp`, `documentation`, `icons`, `illustrations`, `hide-from-playground`
**Surface:** Developer
**Vendor:** Adobe
**Owner:** GRP-REACT-SPECTRUM-MCP-OWNERS
**Repository:** [https://github.com/adobe/react-spectrum](https://github.com/adobe/react-spectrum)
**Updated:** 2026-03-25

---

## About

The React Spectrum MCP Server exposes tools for working with React Spectrum S2 documentation and design system assets. It lets developers and designers discover components, find icons and illustrations, and look up style macro values directly in their IDE—no context switching.

Using the React Spectrum MCP provides:

⋅ Natural-language interaction: Describe intent (e.g., "show me the Button component docs", "find icons for search", "what are the valid values for background?") and let the LLM invoke the appropriate tools.
⋅ Consistent experience: The same React Spectrum MCP tools work across Cursor, VS Code, Claude Code, Codex, and Gemini CLI.
⋅ No authentication: The server runs locally via npx; no sign-in required.
⋅ Representative workflows: List documentation pages, fetch full markdown content for components, search the S2 icon set, search the S2 illustration set, and look up style macro property values.

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `list_s2_pages` | Returns a list of available pages in the S2 docs. Use to discover component documentation (e.g., Button, Dialog, Picker) before fetching full content. |
| `get_s2_page` | Returns the full markdown content for a page, or a specific section if provided. Use for component docs (e.g., Button, Dialog), guides (getting-started, forms), or migration docs. |
| `get_s2_page_info` | Returns page description and list of sections for a given page. Use to preview a page's structure before fetching full content with get_s2_page. |
| `search_s2_icons` | Searches the S2 workflow icon set by one or more terms; returns matching icon names. Use to find icons for UI (e.g., 'search', 'edit', 'delete'). |
| `search_s2_illustrations` | Searches the S2 illustrations set by one or more terms; returns matching illustration names. Use for empty states, error states, or onboarding visuals. |
| `get_style_macro_property_values` | Returns the allowed values for a given S2 style macro property (including expanded color/spacing value lists where applicable). Use for style tokens like background, padding, border-radius. |

### Prompts

_No prompts listed._

---

## Installation Steps

Node.js must be installed on your system to run the MCP server.

Supported MCP clients: Cursor, VS Code, Claude Code, Codex, Gemini CLI.

Cursor:
	1. Add the React Spectrum MCP server via Cursor's MCP install guide.
	2. Use the following config in mcp.json:

{
	"mcpServers": {
		"React Spectrum (S2)": {
			"command": "npx",
			"args": ["@react-spectrum/mcp@latest"]
		}
	}
}

Or use the Add to Cursor button on https://react-spectrum.adobe.com/ai

Claude Code:
	Use the Claude Code CLI to add the server:

	claude mcp add react-spectrum-s2 npx @react-spectrum/mcp@latest

	For more information, see the Claude Code MCP documentation: https://docs.claude.com/en/docs/claude-code/mcp

Gemini CLI:
	Use the Gemini CLI to add the server:

	gemini mcp add react-spectrum-s2 npx @react-spectrum/mcp@latest

	For more information, see the Gemini CLI MCP documentation: https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md#how-to-set-up-your-mcp-server

---

## Accessing the MCP Server

The server runs locally via npx; no authentication required.

---

## Documentation

- https://react-spectrum.adobe.com/ai

---

## Support

_No support contact provided._
