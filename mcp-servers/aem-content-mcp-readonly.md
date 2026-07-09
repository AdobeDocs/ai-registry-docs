---
title: "AEM Content MCP Server (Read-Only)"
description: "AI-powered read-only access to AEM as a Cloud Service. Browse pages, fragments, and launches from your IDE or chat app using natural language—no create, update, or delete operations."
---

# AEM Content MCP Server (Read-Only)

> AI-powered read-only access to AEM as a Cloud Service. Browse pages, fragments, and launches from your IDE or chat app using natural language—no create, update, or delete operations.

**Version:** 1.0.0 | **Status:** active | **Category:** Developer Tools, Product Feature, Workflow Automation | **Deployment:** remote

**Tags:** `content-management`, `aem`, `mcp`, `agentic-ai`, `read-only`, `hide-from-playground`
**Surface:** Developer
**Vendor:** Adobe
**Owner:** GRP-AEM-MCP-OWNERS
**Repository:** _N/A_
**Updated:** 2026-07-09

---

## About

The AEM Content MCP Server (Read-Only) variant exposes tools for read-only operations on pages, content fragments and launches. It is designed for environments where write access is restricted or for users who only need to discover, browse, and inspect content.

Using the Read-Only Content MCP Server provides:

⋅ Natural-language interaction: Describe intent (e.g., "show me the hero banner content for this page") and let the LLM invoke the appropriate tools.
⋅ Consistent experience: The same AEM MCP tools work across Cursor, ChatGPT, Claude, and Microsoft Copilot Studio.
⋅ Security preserved: Requests run under the authenticated user identity; tools enforce existing AEM permissions.
⋅ Representative workflows: Environment discovery, sites management, page browsing, content fragment inspection, launch listing, and asset import status checking.

When Using MCP in Agentic Systems

MCP Servers are designed for human-operated MCP Clients with interactive UX and human oversight. The MCP Tools spec recommends a human in the loop who can approve or deny tool invocations.

If you use MCP Servers in an agentic or autonomous system, treat that as a separate compatibility tier. Do not hardcode tool names in prompts, allowlists, or routing logic. In MCP, the tool name is a programmatic identifier, the description is the model-facing hint for the LLM. Prefer capability or description based prompting and selection.

Implement runtime discovery via tools/list, handle tool-list changes (notifications/tools/list_changed), and align with the MCP Server provider on onboarding and versioning if you need stability guarantees beyond the protocol baseline.

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `get-all-aem-author-environments` | Workflow: get-all-aem-author-environments → get-aem-sites. |
| `get-aem-sites` | List sites in the current AEM environment. A site is a logical grouping that anchors pages; an AEM author instance can serve multiple sites. Human-readable names (e.g. 'briskbuffalo') are site names—call this tool to resolve a site name to its siteId (64+ chars) before passing it to other tools. |
| `get-aem-pages` | Browse and list pages with pagination. Use to discover pages and pageId values. Note: human-readable words are page/site names, not IDs—resolve names via get-aem-sites or search-aem-pages first. |
| `search-aem-pages` | Full-text keyword search for pages (requires a query term). To paginate search results, pass the returned cursor back to this tool (search-aem-pages). For browsing all pages without a keyword use get-aem-pages instead. |
| `get-aem-page-metadata` | Get page metadata (title, description) by pageId. Returns ETag and JSON response. |
| `get-aem-page-content` | Get page content structure (components + properties) and current ETag. |
| `get-aem-page-content-definition` | Get page content definition: allowed components + placement rules. |
| `get-aem-page-preview-url` | Get a browser preview URL for a pageId (draft/author preview). |
| `get-aem-page-editor-url` | Get the AEM Author editor URL for a pageId (clickable edit link). |
| `search-aem-assets` | Search AEM **DAM assets** on author or delivery tier (paged). Returns metadata and delivery URLs. For **site pages**, use `search-aem-pages`, not this tool. |
| `get-aem-asset-import-status` | Check status of an import-aem-asset job using jobId. While the job is in progress, the response may include a suggested wait time before polling again; honor it. Success when state COMPLETED and progress matches imported. |
| `list-aem-fragments` | List content fragments (paged) with optional folder filtering. Also use with a launch path (from get-aem-launch) to list fragments inside a launch. |
| `resolve-aem-fragment-path` | Convert a DAM fragmentPath to fragment UUID. Only needed for get-aem-fragment or patch-aem-fragment (which require UUID). NOT needed for publish/unpublish — those accept paths directly. |
| `get-aem-fragment` | Get a content fragment by UUID or DAM path. Returns current ETag + fields. |
| `get-aem-fragment-model` | Get detailed schema for a content fragment model. Returns field definitions, types, and validation rules. Use before creating fragments. Also use before patch/delete via manage-aem-fragments-batch (target=models) to retrieve the current ETag required for If-Match. |
| `search-aem-fragments` | Search and filter content fragments with comprehensive filtering. Preferred over list-aem-fragments when you need to filter by date, author, status, model, tags, locale, path, or full-text. |
| `search-aem-fragment-models` | List and search content fragment models. Call with no filters to list all models (unfiltered, paged). Use filters for refined results: folder (enabledForFolder), configuration path (configurationFolder), name, tags, status, replication status, or dates. |
| `manage-aem-fragment-versions` | Manage fragment versions. Actions: |
| `manage-aem-fragment-variations` | Manage fragment variations (list, get, create, patch, delete). Use this tool for ALL variation-specific operations—not patch-aem-fragment (which patches the main fragment, not its variations). |
| `get-aem-launch-job-status` | Get the status of a launch job. Call this tool after starting a launch job to track its progress. If the job is still ongoing or not started, use the tool again, and keep polling until status changes. |
| `get-aem-launch` | Get a launch by its UUID and return current ETag + launch details. |
| `list-aem-launches` | List launches with pagination. |
| `list-aem-cf-templates` | List HTML visualization templates for a Content Fragment Model (paged). |
| `get-aem-cf-template` | Get a specific template by templateId for a given model. Returns ETag and JSON details. |
| `render-aem-fragment-preview` | Render and return the HTML preview of a Content Fragment. Optionally specify a templateId and variation. |
| `tools_index` | Workflow: tools_index → get_tool_details (include BOTH names in workflow and tools[]). Use for advisory-only questions (including rate limiting / HTTP 429) and list ONLY tool names from the catalog. |
| `search_tools` | Workflow: search_tools → get_tool_details (include BOTH names in workflow and tools[]). Search tools by name/description to find the right tool for a task. |
| `get_tool_details` | Use this tool to answer questions like 'What does [tool-name] do?' or 'What inputs does [tool-name] take?' - call get_tool_details instead of calling the actual tool when the user asks about a tool's purpose or parameters. |

### Prompts

| Name | Description |
|------|-------------|
| `server-capabilities` | Information about this server's capabilities and limitations |
| `author-url-guide` | How to choose authorUrl (AEM Author base URL) |
| `json-patch-guide` | How to use JSON Patch (RFC 6902) for patch tools |
| `page-content-guide` | How to interpret page content and prepare safe edits |
| `page-content-definition-guide` | How to use page content definition to add components safely |
| `tool-discovery-guidance` | How to discover tools progressively |
| `pagination-guide` | How pagination works for list/search tools |
| `publishing-guide` | How to publish content immediately or schedule it for a future date |
| `bulk-page-edit-guide` | Safe workflow for bulk page edits using launches |
| `etag-guide` | How ETags work for update operations |

---

## Installation Steps

Supported MCP clients: Anthropic Claude, Cursor, OpenAI ChatGPT, Microsoft Copilot Studio.

Generic setup (all clients):
	1. Add the AEM MCP server URL (https://mcp.adobeaemcloud.com/adobe/mcp/content-readonly).
	2. Save or activate the configuration to trigger the connection.
	3. Sign in with your Adobe ID when prompted.
	4. Verify that the application has discovered the MCP tools.

Use the following JSON to configure the MCP server in Cursor:

{
	"mcpServers": {
		"AEM-Content-ReadOnly": {
			"url": "https://mcp.adobeaemcloud.com/adobe/mcp/content-readonly"
		}
	}
}

Cursor: Settings ⇒ Cursor Settings ⇒ Tools ＆ MCP ⇒ Add Custom MCP (or New MCP Server). Paste the JSON above into mcp.json. Click Connect, sign in with Adobe ID, then confirm the server shows as connected.

---

## Accessing the MCP Server

OAuth with Adobe ID. When connecting, sign in with your Adobe ID. MCP tools enforce your existing AEM permissions.

---

## Documentation

- https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/ai-in-aem/using-mcp-with-aem-as-a-cloud-service
- https://experienceleague.adobe.com/en/docs/experience-manager-learn/cloud-service/ai/mcp-servers/accelerate-content-operations-with-aem-mcp-server

---

## Support

aemcs-mcp-feedback@adobe.com
