# Customer Journey Analytics MCP Server

> AI-powered access to Customer Journey Analytics (CJA). Discover data views, dimensions, metrics, segments, audiences, and run reports from your IDE or chat app using natural language.

**Version:** 1.0.0 | **Status:** active | **Category:** Product Feature, Developer Tools, Workflow Automation | **Deployment:** remote

**Tags:** `cja`, `analytics`, `adobe`, `customer-journey`, `reporting`, `data-analysis`, `mcp`
**Surface:** Developer
**Vendor:** Adobe
**Owner:** grp-analytics-mcp-owners
**Repository:** _N/A_
**Updated:** 2026-05-01

---

## About

The Customer Journey Analytics (CJA) MCP server lets LLM clients interact with your components and data in Customer Journey Analytics. Once connected, you can retrieve data views, dimensions, metrics, segments, and run reports through natural language prompts.

Using the Customer Journey Analytics MCP Server provides:

	• Natural-language interaction: Describe intent (e.g., "show me sessions by marketing channel for last quarter") and let the LLM invoke the appropriate tools.
	• Consistent experience: The same Customer Journey Analytics MCP tools work across Cursor, ChatGPT, and Claude.
	• Security preserved: Requests run under the authenticated user identity; tools enforce existing Customer Journey Analytics permissions.
	• Representative workflows: Data view discovery, dimension and metric exploration, segment management, audience management, report execution with breakdown support, calculated metric creation, and workspace project management.

Capabilities:

	• Discover data views and their configurations
	• Find and describe dimensions, metrics, and calculated metrics
	• Create and run ranked and trended reports with breakdown support
	• Manage segments, audiences, and date ranges
	• Explore workspace projects

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `describeCja` | The starting point for learning how to use the Customer Journey Analytics MCP tools. Returns focused reference guides covering tool usage, available dimensions and metrics, segment definition syntax, calculated metric definition syntax, and the two-step breakdown report workflow. Call this tool before creating segments, calculated metrics, or breakdown reports to learn the required structures. |
| `describeProjectDefinition` | Returns a guide for creating or modifying workspace project definitions. Call this tool with the BASE guide before calling upsertProject to learn the required project structure. |
| `setDefaultSessionDataViewId` | Sets the default data view ID for the current session. Once set, other tools that accept a dataViewId parameter can omit it. The default persists for up to 8 hours. |
| `findDimensions` | Finds dimensions available in a given data view. Supports semantic search with searchQuery parameter. Hidden dimensions are excluded by default. The returned dimension IDs can be used directly in runReport and searchDimensionItems. |
| `findMetrics` | Finds available standard and custom metrics from the data view. Does NOT include calculated metrics (use findCalculatedMetrics for those). Supports semantic search. Hidden metrics are excluded by default. |
| `findCalculatedMetrics` | Finds available calculated metrics. Hidden calculated metrics are excluded by default. |
| `findSegments` | Finds segments available to the user. Returns a paginated list of segments that the current user has access to. |
| `findDateRanges` | Finds saved date range components available to the user. Returns a paginated list. |
| `findDataViews` | Finds data views accessible to the user. Returns a paginated list, useful for discovering available data views or obtaining a data view ID. |
| `findProjects` | Finds workspace projects available to the user. Returns a paginated list. |
| `findAudiences` | Lists audiences available to the user. Returns a paginated list of audience components. |
| `runReport` | The primary tool for pulling analytics data from Customer Journey Analytics. Runs a ranked report with support for single or multiple dimensions and metrics over a specified date range. Supports breakdown reports via breakdowns parameter—call describeCja(BREAKDOWN_GUIDE) for the full two-step workflow. |
| `searchDimensionItems` | Retrieves the top dimension items for a given dimension. Also supports keyword search. Essential for obtaining numeric itemId values needed for breakdown reports in runReport. |
| `describeDimension` | Returns detailed metadata for a given dimension, including its name, description, type, and other properties. |
| `describeMetric` | Returns metadata for a given metric, including its name, description, type, and other properties. |
| `describeSegment` | Returns metadata for a given segment, including its name, description, definition, and compatibility. |
| `describeCalculatedMetric` | Shows the metric formula and base metrics used for a calculated metric. |
| `describeProject` | Shows details about a workspace project. Response includes a workspaceLink field with a direct URL to open the project. |
| `describeAudience` | Returns metadata for a given audience, including its name, description, definition, publishing status, and other properties. |
| `listComponentUsage` | Lists the components of a specified type that are most used in reports, ranked by usage frequency. |
| `listFrequentlyUsedWith` | Lists components that are frequently used together in reports with a specified component. |
| `listSimilarTo` | Lists components that are similar to a specified component. |
| `upsertSegment` | Creates a new segment or updates an existing one. Call describeCja with SEGMENT_DEFINITION_GUIDE first to learn the required structure. |
| `upsertCalculatedMetric` | Creates a new calculated metric or updates an existing one. Call describeCja with CALCULATED_METRIC_DEFINITION_GUIDE first to learn the required structure. |
| `createDateRange` | Creates a new reusable date range component. |
| `upsertProject` | Creates a new workspace project or updates an existing one. Call describeProjectDefinition with BASE first to learn the required structure. Response includes a workspaceLink field. |

### Prompts

_No prompts listed._

---

## Installation Steps

For detailed setup instructions, please refer to the official onboarding guides for your preferred MCP client:

	• ChatGPT: https://developer.adobe.com/analytics-mcp/docs/guides/chatgpt
	• Claude: https://developer.adobe.com/analytics-mcp/docs/guides/claude
	• Cursor: https://developer.adobe.com/analytics-mcp/docs/guides/cursor
	• Gemini CLI: https://developer.adobe.com/analytics-mcp/docs/guides/gemini
	• OAuth server-to-server: https://developer.adobe.com/analytics-mcp/docs/guides/oauth

Before connecting, ensure you have a valid Adobe ID with access to the desired IMS organization and the necessary product permissions.

---

## Accessing the MCP Server

OAuth with Adobe ID. Sign in with your Adobe ID when connecting. MCP tools enforce your existing Customer Journey Analytics permissions.

Authentication flow: Connect through your IDE or LLM client, log in with Adobe ID credentials, select your IMS organization if you belong to multiple, and approve the connection. Access tokens are automatically managed by the client.

To switch IMS organizations: Disconnect the MCP connector, log out of your Adobe session in your browser, then reconnect to see the organization chooser.

Required: Valid Adobe ID with access to the desired IMS organization and Customer Journey Analytics product permissions.

Programmatic access: Use OAuth server-to-server credentials from Adobe Developer Console. Include headers: Authorization (Bearer token), x-gw-ims-org-id, and x-api-key.

---

## Documentation

- https://developer.adobe.com/analytics-mcp/docs/cja/
- https://developer.adobe.com/analytics-mcp/docs/guides/

---

## Support

analytics-mcps@adobe.com
