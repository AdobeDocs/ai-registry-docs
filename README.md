# MCP Server Docs

Auto-generated markdown documentation for Adobe's MCP server registry.

## How it works

A scheduled GitHub Action (`.github/workflows/generate-mcp-docs.yml`) runs daily Mon–Fri at 9 AM UTC. It fetches all servers from the Adobe MCP Registry, pulls full details for each, and writes a markdown file to `mcp-servers/` — one file per server.

You can also trigger it manually via **Actions → Generate MCP Server Docs → Run workflow**.

## Structure

```
mcp-servers/
  aem-content-mcp.md
  adobe-analytics-mcp.md
  ...
```

Each file contains: About, MCP Capabilities (Tools + Prompts), Installation Steps, Accessing the MCP Server, Documentation, and Support.
