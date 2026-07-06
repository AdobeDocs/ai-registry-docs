# Adobe Analytics MCP Server

> AI-powered access to Adobe Analytics. Discover report suites, dimensions, metrics, segments, and run reports from your IDE or chat app using natural language.

**Version:** 1.0.0 | **Status:** active | **Category:** Product Feature, Developer Tools, Workflow Automation | **Deployment:** remote

**Tags:** `analytics`, `adobe`, `reporting`, `data-analysis`, `mcp`
**Surface:** Developer
**Vendor:** Adobe
**Owner:** grp-analytics-mcp-owners
**Repository:** _N/A_
**Updated:** 2026-05-01

---

## About

The Adobe Analytics MCP server lets LLM clients interact with your components and data in Adobe Analytics. Once connected, you can retrieve report suites, dimensions, metrics, segments, and run ranked or trended reports through natural language prompts.

Using the Adobe Analytics MCP Server provides:

	• Natural-language interaction: Describe intent (e.g., "show me page views by day for last month") and let the LLM invoke the appropriate tools.
	• Consistent experience: The same Adobe Analytics MCP tools work across Cursor, ChatGPT, and Claude.
	• Security preserved: Requests run under the authenticated user identity; tools enforce existing Adobe Analytics permissions.
	• Representative workflows: Report suite discovery, dimension and metric exploration, segment management, report execution, calculated metric creation, and workspace project management.

Capabilities:

	• Discover report suites and their configurations
	• Find and describe dimensions, metrics, and calculated metrics
	• Create and run ranked and trended reports
	• Manage segments and date ranges
	• Explore workspace projects

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `describeAa` | The starting point for learning how to use the Adobe Analytics MCP tools. Returns focused reference guides covering tool usage, available dimensions and metrics, segment definition syntax, calculated metric definition syntax, and organizational context. Call this tool before creating segments or calculated metrics to learn the required structures. |
| `describeProjectDefinition` | Returns a guide for creating or modifying workspace project definitions. Call this tool with the BASE guide before calling upsertProject to learn the required project structure. |
| `setSessionDefaults` | Sets the default report suite ID and global company ID for the current session. Once set, other tools that accept these parameters can omit them. The defaults persist for up to 8 hours. |
| `getDefaultSessionReportSuiteId` | Returns the current default report suite ID for this session. Returns '(not set)' if no default has been configured. |
| `clearDefaultSessionReportSuiteId` | Clears the default report suite ID for this session. |
| `findCompanies` | Lists all companies (login companies) accessible to the current user. Use this tool to discover which companies you have access to and to obtain a globalCompanyId. |
| `findReportSuites` | Finds report suites accessible to the user within a specific company. Returns a paginated list, useful for discovering available report suites or obtaining a report suite ID. |
| `findDimensions` | Finds dimensions available for the given report suite. Hidden dimensions are excluded by default. The returned dimension IDs can be used directly in runReport and searchDimensionItems. |
| `findMetrics` | Finds available metrics for the given report suite. Hidden metrics are excluded by default. Returns both standard metrics and calculated metrics in a single response. |
| `findSegments` | Finds segments available to the user. Returns a paginated list of segments that the current user has access to. |
| `findDateRanges` | Finds saved date range components available to the user. Returns a paginated list. |
| `findProjects` | Finds workspace projects available to the user. Returns a paginated list. |
| `runReport` | The primary tool for pulling analytics data from Adobe Analytics. Runs a ranked report with one dimension and one or more metrics over a specified date range. Segments can be applied as global filters. |
| `searchDimensionItems` | Retrieves the top dimension items for a given dimension. Also supports keyword search to find specific items within a dimension. |
| `describeSegment` | Returns metadata for a given segment, including its name, description, definition, and compatibility. |
| `describeCalculatedMetric` | Shows the metric formula and base metrics used for a calculated metric. |
| `describeProject` | Shows details about a workspace project. Response includes a workspaceLink field with a direct URL to open the project. |
| `listComponentUsage` | Lists the components of a specified type that are most used in reports, ranked by usage frequency. |
| `listFrequentlyUsedWith` | Lists components that are frequently used together in reports with a specified component. |
| `listSimilarTo` | Lists components that are similar to a specified component. |
| `upsertSegment` | Creates a new segment or updates an existing one. Call describeAa with SEGMENT_DEFINITION_GUIDE first to learn the required structure. |
| `upsertCalculatedMetric` | Creates a new calculated metric or updates an existing one. Call describeAa with CALCULATED_METRIC_DEFINITION_GUIDE first to learn the required structure. |
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

OAuth with Adobe ID. Sign in with your Adobe ID when connecting. MCP tools enforce your existing Adobe Analytics permissions.

Authentication flow: Connect through your IDE or LLM client, log in with Adobe ID credentials, select your IMS organization if you belong to multiple, and approve the connection. Access tokens are automatically managed by the client.

To switch IMS organizations: Disconnect the MCP connector, log out of your Adobe session in your browser, then reconnect to see the organization chooser.

Required: Valid Adobe ID with access to the desired IMS organization and Adobe Analytics product permissions.

Programmatic access: Use OAuth server-to-server credentials from Adobe Developer Console. Include headers: Authorization (Bearer token), x-gw-ims-org-id, x-api-key, and x-global-company-id.

---

## Documentation

- https://developer.adobe.com/analytics-mcp/docs/aa/
- https://developer.adobe.com/analytics-mcp/docs/guides/

---

## Support

analytics-mcps@adobe.com
