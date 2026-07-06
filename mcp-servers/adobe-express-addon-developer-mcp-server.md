# Adobe Express Developer MCP Server

> Accelerate your Adobe Express Add-on development workflow through Model Context Protocol(MCP) that seamlessly integrates with any AI-powered IDEs.

**Version:** 1.0.0 | **Status:** active | **Category:** Developer Tools, Learning and Documentation | **Deployment:** local

**Tags:** `developer-tools`, `learning-and-documentation`, `hide-from-playground`
**Surface:** Developer
**Vendor:** Adobe
**Owner:** org-nitmitta-all-mgrs
**Repository:** _N/A_
**Updated:** 2026-04-02

---

## About

Now, to build Adobe Express Add-ons, all you require is a Model Context Protocol (MCP)-compatible IDE with an LLM of your choice. 

The Adobe Express Developer MCP Server brings the right context to your LLM so that it provides accurate answers for coding, debugging, and building full-fledged add-ons quickly. 

⋅ Brings the goodness of add-on documentation and typedefs directly to your development environment. 
⋅ Works with any Large Language Model (LLM) of your choice. 

Reach out to us via our community forum (https://discord.gg/nc3QDyFeb4) for feedback or questions.

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `get_relevant_documentations` | Provides relevant documentations to answer questions about Express Add-ons and add-on development. |
| `get_typedefinitions` | Provides TypeScript definitions required for Adobe Express Add-on development.These definitions are essential for type-safe add-on development and understanding available functionality. |

### Prompts

_No prompts listed._

---

## Installation Steps

You don't need to clone or build anything. Just configure your MCP client to launch the server via npx.

Pre-requisites:
1. Node.js 18+ (check with node --version) - Required to run the Adobe Express Add-on MCP Server package via npx
2. MCP-compatible IDE - Such as Cursor, Claude Desktop, VS Code or other editors supporting the Model Context Protocol.

Use the following JSON to configure the MCP server in your choice of environment:

{
	"mcpServers": {
		"adobe-express-add-on": {
			"command": "npx",
			"args": [
				"@adobe/express-developer-mcp@latest",
				"--yes"
			]
		}
	}
}

The MCP server can be added using a configuration file specific to your IDE. The file's location might vary by IDE.
For Cursor, use ~/.cursor/mcp.json. For Claude Desktop, use claude_desktop_config.json. For VS Code, use ~/.vscode/mcp.json.
Note: If there's a toggle to enable the new MCP server in your IDE, make sure it's enabled.

---

## Accessing the MCP Server

_No access instructions provided._

---

## Documentation

- https://developer.adobe.com/express/add-ons/docs/guides/getting_started/local_development/mcp_server/

---

## Support

http://discord.gg/nc3QDyFeb4
