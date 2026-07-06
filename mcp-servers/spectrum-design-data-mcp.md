# Spectrum Design Data MCP Server

> A Model Context Protocol (MCP) server that provides AI tools with structured access to Adobe Spectrum design system data, including design tokens and component API schemas.

**Version:** 1.1.1 | **Status:** active | **Category:** Developer Tools, Learning and Documentation | **Deployment:** local

**Tags:** `spectrum`, `design-system`, `design-tokens`, `component-schemas`, `mcp`, `adobe`, `hide-from-playground`
**Surface:** Developer
**Vendor:** Adobe
**Owner:** GRP-SPECTRUM-DESIGN-DATA-MCP-OWNERS
**Repository:** [https://github.com/adobe/spectrum-design-data](https://github.com/adobe/spectrum-design-data)
**Updated:** 2026-04-20

---

## About

This MCP server enables AI assistants to query and interact with Spectrum design data through a standardized protocol. It provides access to:

⋅ Design Tokens: Color palettes, typography, layout tokens, and semantic tokens
⋅ Component Schemas: API definitions and validation schemas for Spectrum components
⋅ Future: Component anatomy, design patterns, and guidelines

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `query-tokens` | Search Spectrum tokens by name, type, or category. Categories: color-aliases, color-component, color-palette, icons, layout, layout-component, semantic-color-palette, typography. |
| `query-tokens-by-value` | Find tokens by direct or resolved value (follows aliases). |
| `get-token-details` | Get full token data by path (flat token name). |
| `get-component-tokens` | Get tokens whose name contains a component (e.g. button, input). |
| `list-components` | List all components (names and summary, no full schema). |
| `get-component-schema` | Get full JSON schema for one component. |
| `validate-component-props` | Validate props against a component schema. |
| `search-components-by-feature` | Find components that have a property matching a name (e.g. size, disabled). |

### Prompts

_No prompts listed._

---

## Installation Steps

Node.js 20+ must be installed on your system to run the MCP server.

Supported MCP clients: Cursor, VS Code, Claude Code, Codex, Gemini CLI.

Cursor:
	1. Add the Spectrum Design Data MCP server via Cursor's MCP install guide.
	2. Use the following config in mcp.json:

{
	"mcpServers": {
		"spectrum-design-data": {
			"command": "npx",
			"args": ["-y", "@adobe/spectrum-design-data-mcp"]
		}
	}
}

Or with global installation:

{
	"mcpServers": {
		"spectrum-design-data": {
			"command": "@adobe/spectrum-design-data-mcp"
		}
	}
}

Claude Code:
	Use the Claude Code CLI to add the server:

	claude mcp add spectrum-design-data -- npx -y @adobe/spectrum-design-data-mcp

	For more information, see the Claude Code MCP documentation: https://docs.claude.com/en/docs/claude-code/mcp

Gemini CLI:
	Use the Gemini CLI to add the server:

	gemini mcp add spectrum-design-data -- npx -y @adobe/spectrum-design-data-mcp

	For more information, see the Gemini CLI MCP documentation: https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md#how-to-set-up-your-mcp-server

---

## Accessing the MCP Server

The server runs locally via npx; no authentication required.

---

## Documentation

- https://github.com/adobe/spectrum-design-data/tree/main/tools/spectrum-design-data-mcp#readme

---

## Support

_No support contact provided._
