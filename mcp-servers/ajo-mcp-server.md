---
title: "Adobe Journey Optimizer MCP Server"
description: "This MCP server exposes Adobe Journey Optimizer (AJO) tools to AI clients, letting marketers manage campaigns, journeys, audiences, and messages through agents."
---

# Adobe Journey Optimizer MCP Server

> This MCP server exposes Adobe Journey Optimizer (AJO) tools to AI clients, letting marketers manage campaigns, journeys, audiences, and messages through agents.

**Version:** 1.0.0-beta | **Status:** active | **Category:** Learning and Documentation, Developer Tools, Administrative Tools, Workflow Automation | **Deployment:** remote

**Tags:** `ai`, `hide-from-playground`
**Surface:** Developer
**Vendor:** Adobe
**Owner:** org-snikhil-all
**Repository:** [https://github.com/Adobe-CJM/ajo-mcp-service](https://github.com/Adobe-CJM/ajo-mcp-service)
**Updated:** 2026-07-14

---

## About

This MCP server exposes Adobe Journey Optimizer (AJO) tools to AI clients, letting marketers manage campaigns, journeys, audiences, and messages through agents.

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `list_resources` | List all available resources that can be read via read_resource. |
| `read_resource` | Read the content of a resource by its URI (e.g., skill://workflow-name, resource://doc-name). |
| `ajo_campaign_list` | List AJO marketing campaigns (not journeys, not loyalty challenges).

Supported server-side filters (all optional, combinable):
  status:        DRAFT, PUBLISHING, UNPUBLISHING, LIVE, SCHEDULED,
                 COMPLETED, CLOSED, ARCHIVED, STOPPED
  campaign_type: Scheduled, ApiTriggered
  category:      TRANSACTIONAL, MARKETING
  channel:       email, sms, push, directMail

Date ranges, name search, audience filters, and tags are not supported.

Returns the first page (up to 20 by default, max 100). Use filters to narrow results
rather than paginating through thousands of campaigns.

Field projection: default returns id, name, status, campaignType, startDate, endDate.
Pass fields=['minimal'] for id/name/status only; fields=['detail'] adds description,
tags, and message variants. |
| `ajo_campaign_get` | Get details and configuration of a specific AJO campaign by campaign ID.

Requires the sandbox that contains the campaign. A campaign exists in exactly
one sandbox, so the sandbox must be correct. If the user has not said which
sandbox, call ajo_sandbox_list and confirm the sandbox with them first — do
not call this tool repeatedly against different sandboxes to hunt for the
campaign. If the campaign is not in the given sandbox, this returns a structured
result with found=false (not an error) telling you to check another sandbox. |
| `ajo_journey_list` | List AJO customer journeys (automated flows/workflows).

Status filter: the journey API does not support server-side status filtering.
To filter by status, paginate through all pages and filter the results
client-side. Valid values: DRAFT, LIVE, CLOSED, FINISHED.

Projection: pass `fields=["minimal"]` for id/name/status only;
omit for the default 8-field table row.

Pagination contract — response always includes:
  total       — total number of journeys across all pages
  count       — number of journeys in this page
  has_more    — true if more pages remain
  next_offset — pass as offset on the next call; null when has_more=false

To collect ALL journeys: call with offset=0, then loop while has_more=true,
passing next_offset as offset each time. Default page size is 20; max is 100. |
| `ajo_journey_get` | Get configuration, details, and current status of a specific AJO journey. |
| `ajo_loyalty_get_challenges` | List (get/fetch) active loyalty program challenges (tasks, promotions, offers).

Returns challenges that are currently published and running. Use this for loyalty
challenges — NOT ajo_campaign_list.

Returns challenges where state is published, startDate <= now,
and endDate > now. Use the limit parameter to control result count. |
| `ajo_sandbox_list` | List AEP sandboxes available to the current org.

Results are cached for 5 minutes per org. |
| `ajo_interactive_render_chart` | Render an interactive chart inline in the response.

Use this when the user asks for a chart or visual, or when you are
presenting aggregated/comparative data (e.g. counts by status, trends
over time, distributions). Do NOT use for single-item detail views —
present those as structured text instead.

All chart types support: title (required), description, badge —
EXCEPT "metric" (no title, use label) and "data_dashboard" (no title at all).
badge fields: label (str), variant — MUST be exactly one of "positive"|"negative"|"info"|"neutral".
  DO NOT use "success", "warning", "error", "danger", or any other string — validation will fail.
series fields: label (str), data (list[float|None]), color (hex str, optional).
extra="forbid" — passing any undocumented field causes a validation error.

Chart types and their EXACT valid fields:

"line"           — title, description, badge, series, x_labels
"area"           — title, description, badge, series, x_labels
"bar"            — title, description, badge, series, x_labels, stacked (bool)
"horizontal_bar" — title, description, badge, series, x_labels, stacked (bool)
"pie"            — title, description, badge, series
                   NO x_labels — segment names go in series[].label, values in series[].data[0]
"donut"          — title, description, badge, series, center_label
                   NO x_labels — same as pie; center_label is optional text in hole
"scatter"        — title, description, badge, series
                   NO x_labels
"metric"         — label (required), value (num|str), description, trend (float -100..1000)
                   badge: {label, variant} — variant MUST be "positive"|"negative"|"info"|"neutral" only
                   NOT title — use label instead
"dashboard"      — title, charts (list of ChartItem, min 1)
                   ChartItem = line|area|bar|horizontal_bar|pie|donut|scatter|metric ONLY
                   NEVER put "table" inside dashboard.charts — use "data_dashboard" instead
"table"          — title, columns (list of {label, key}), rows (list of {cells: {key: value}})
"data_dashboard" — description (optional), metrics (list of MetricCard),
                   charts (list of ChartItem), table (DataTable|null)
                   NOT title — data_dashboard has no title field

REQUIRED: every chart object MUST include the "type" field — including
"data_dashboard". Omitting "type" causes a discriminator validation error.

x_labels usage: list of strings, one per data point, aligns with
series[].data indices. Only valid on: line, area, bar, horizontal_bar.
Never on pie/donut/scatter/metric.

Call once per chart or dashboard. Each call renders one panel inline. |
| `ajo_interactive_render_graph` | Render an interactive node/edge graph inline in the response.

Use this when the user asks to draw, visualize, diagram, or show as a
graph any structure with nodes and connections — e.g. journey
flowcharts, hierarchies, or relationship maps. Do NOT use for tabular
data or charts (use ajo_interactive_render_chart instead).

Supported graph types (set graph.type):
- "flow": directional flowchart with optional layout direction
  (LR / TB / RL / BT). Use for journeys, pipelines, approval flows.
- "tree": hierarchical tree with TB or LR direction. Use for org
  charts, taxonomies, or any single-root hierarchy.
- "network": non-directional node/edge graph. Use for relationship
  maps or audience overlap.

Each graph has:
- nodes: list of GraphNode (id, title, subtitle, shape, color, icon, badge)
- edges: list of GraphEdge (source, target, label, style)

Node shapes: circle, rect, rounded_rect, diamond, pill, hexagon.
Node colors: teal, amber, blue, gray, purple, green, orange, red, neutral.
Edge styles: solid, dashed, dotted.

Edge `source` and `target` must reference node `id` values that exist
in the same graph. Call once per graph; each call renders one panel. |
| `import-claude-design-from-url` | Create an AJO email template from a hosted HTML URL.

The URL must point to a self-contained HTML email bundle (images and styles
inlined). The server fetches the HTML, creates an AJO email content template,
and returns an openable Journey Optimizer deep link. |
| `skill__list_campaigns` | List, browse, and preview AJO campaigns. Use when asked to list, show, browse, or view the contents of email campaigns. |
| `skill__list_journeys` | List, browse, inspect, or get details about AJO journeys — including showing a journey's flow diagram. Use when asked to list, show, browse, view, get, open, or visualize any journey. |
| `skill__tool_reference` | Start here before any AJO workflow. Enforces Rule 0 — read the relevant skill doc before calling any tool. |
| `channels__list-channel-configs` | List channel configurations with optional filters (name, status, channels, sandboxName) to return a unified list from both backend APIs, setting channels for specified types and returning the total count from _count for count questions. |
| `channels__get-channel-config` | Fetch a single channel configuration by its required configId UUID and optional sandboxName by automatically searching both endpoints to return full details including name, channel type, settings, status, and metadata. |
| `channels__list-config-resource` | Lists channel configuration resources by resource type with optional filters. Returns matching resources with a count. Inputs: resourceType (required) — one of pushCredential, emailSubdomain, emailIpPool, smsCredential, smsSubdomain, whatsappCredential, directMailFileRouting, lineChannelSettings, liveActivityRegistry. Optional filters: name (contains match), platform/messagingService/appId (pushCredential only), status (smsSubdomain|whatsappCredential|directMailFileRouting), sandboxName. Returned ids feed channel configs (e.g. emailSubdomain→email.subDomainId, smsCredential→sms.configId); lineChannelSettings and liveActivityRegistry also return channelRegistryId and channelPublicationVersion. |
| `channels__get-config-resource` | Fetch a single configuration resource by its ID and required resourceType (plus optional sandboxName) to return full resource details (or _etag), excluding liveActivityRegistry which lacks get-by-id, while including channelRegistryId and channelPublicationVersion for lineChannelSettings. |
| `channels__list-marketing-actions` | List available DULE marketing actions for a given sandboxName (optional), where each action provides a name and a self href link used to determine its type as core or custom based on the path structure. |
| `content__list_content_templates` | List AJO content templates with pagination and optional property filters (templateType, channels, name, dates). Returns stringified JSON with items and pagination links. |
| `content__get_content_template` | Fetch a single AJO content template by UUID, including embedded variant content (template body and referenced fragments). |
| `content__list_fragments` | List AJO content fragments with pagination and optional property filters (fragmentType, channels, name, dates). Returns stringified JSON with items and pagination links. |
| `content__get_fragment` | Fetch a single AJO content fragment by UUID with embedded variant content. Optional status filter (DRAFT or PUBLISHED). |

### Prompts

_No prompts listed._

---

## Installation Steps

Supported MCP clients: Anthropic Claude, Cursor, OpenAI ChatGPT.

Generic setup (all clients):
	1. Add the Adobe Journey Optimizer MCP server URL (https://ajo-mcp.adobe.io/mcp).
	2. Save or activate the configuration to trigger the connection.
	3. Sign in with your Adobe ID when prompted.
	4. If your Adobe ID belongs to multiple IMS organizations, select the desired organization.
	5. Approve the connection between Adobe and your client.
	6. Verify that the application has discovered the MCP tools.

Use the following JSON to configure the MCP server in Claude:
{
	"mcpServers": {
		"adobe-journey-optimizer": {
			"command": "npx",
			"args": [
				"-y",
				"mcp-remote@latest",
				"https://ajo-mcp.adobe.io/mcp",
				"--allow-http"
			]
		}
	}
}

Claude: Select the Customize icon → Connectors → + icon → Create app. Name it "Adobe Journey Optimizer" and enter the URL.

Before using, ensure you have an Adobe ID with access to the desired IMS organization and correct product permissions for Adobe Journey Optimizer.

---

## Accessing the MCP Server

OAuth with Adobe ID. Sign in with your Adobe ID when connecting. MCP tools enforce your existing Adobe Journey Optimizer permissions.

Authentication flow: Connect through your IDE or LLM client, log in with Adobe ID credentials, select your IMS organization if you belong to multiple, and approve the connection. Access tokens are automatically managed by the client.

To switch IMS organizations: Disconnect the MCP connector, log out of your Adobe session in your browser, then reconnect to see the organization chooser.

Required: Valid Adobe ID with access to the desired IMS organization and Adobe Analytics product permissions.

Programmatic access: Use OAuth server-to-server credentials from Adobe Developer Console. Include headers: Authorization (Bearer token), x-gw-ims-org-id, x-api-key, and x-global-company-id.

---

## Documentation

_No documentation links provided._

---

## Support

ajo-mcp-feedback@adobe.com
