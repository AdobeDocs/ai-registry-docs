# Adobe Real-Time CDP MCP Server

> Exposes Adobe Real-Time CDP capabilities as MCP tools for AI Agents.

**Version:** 1.0.0-beta | **Status:** active | **Category:** Developer Tools, Product Feature, Workflow Automation | **Deployment:** remote

**Tags:** `Agentic`, `MCP`, `AI`, `AEP`, `RTCDP`, `LLM`, `Remote`, `Developer`, `Automation`
**Surface:** Developer
**Vendor:** Adobe
**Owner:** grp-rtcdp-mcp-owners
**Repository:** _N/A_
**Updated:** 2026-06-24

---

## About

Query your Real-Time CDP audiences, destinations, sources, and activation run history using natural language inside your AI assistant — no API calls or product screens required. Built on the Model Context Protocol (MCP) with Streamable HTTP transport; authenticates via Adobe ID browser sign-in flow. Beta Customers: contact your Adobe representative to request access.

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `search_audiences` | Returns audience entities. An audience is a collection of profiles — people or accounts — that share similar behaviors or characteristics. Supports lookup by ID, catalog browsing, or filtering by name, type, state, namespace, or origin. Read-only.

**Modes:** `audienceId` → one audience (filters ignored) · `audienceIds` → bulk fetch multiple audiences by ID (filters ignored) · neither → paginated list (filters: `name` substring, `entityType` profile/account, `lifecycleState` draft/published/inactive/archived, `namespace`, `originName`; pagination via `limit` and `page`). |
| `preview_audience_membership` | Preview and estimate audience membership for a given audience query. Submits a preview request to the UPS API, polls until ready, then fetches membership estimate including size, confidence interval, and metadata. Supports both relational (SDD) and non-relational (PQL) audience queries. |
| `inspect_audience_evaluation_jobs` | Returns audience evaluation job (segment job) records. Use to inspect job history, check for failures, or measure evaluation time. Read-only.

**Modes:** `jobId` → one job · `jobIds` → many via bulk-get · neither → paginated list (filters: `status`, `audienceId`, `property`; controls: `limit`, `start`, `sort`).

Status enum: NEW, QUEUED, PROCESSING, SUCCEEDED, FAILED, CANCELLING, CANCELLED. |
| `inspect_audience_export_jobs` | Returns audience export job records. Export jobs persist audience members to datasets in the Data Lake — distinct from evaluation jobs which run the segmentation query but don't write profiles out. Read-only.

**Modes:** `exportJobId` → one job · no `exportJobId` → paginated list (controls: `limit`, `start`, `page`, `sort`). List does NOT support native filtering by status or audienceId — filter client-side. |
| `inspect_flow_runs` | Execution history for source ingestion and destination activation flows — each run is one execution of a configured flow, with status, timing, and metrics. All flow types share the same runs collection; use `flowId` to scope to a single flow, or filter by `flowSpecId` / `status` / time range across all flows.

**Modes:** `id` → one · `ids` → many with OR logic · neither → paginated list (filters: flowId, flowSpecId, status, completedAtOrAfter, completedAtOrBefore). Time-range params are epoch milliseconds (UTC). |
| `search_destination_connectors` | The catalog of available destination connectors — connector classes you can activate audiences to. Each returned connectionSpec is a type definition (the connector class), not a configured instance.

**Modes:** `id` → one · `ids` → many with OR logic · neither → paginated list (filters: name, state, additionalFilters). |
| `search_destination_accounts` | Authenticated destination accounts — base connections holding credentials and connection state for a destination connector type. Each account is a configured instance of a type from search_destination_connectors.

**Modes:** `id` → one · `ids` → many with OR logic · neither → paginated list (filters: name, state, connectionSpecId, additionalFilters). |
| `search_destination_flows` | Configured destination activation flows — the orchestration layer that ties together a destination account, a source connection (the AEP audience being exported), a target connection (the external destination), plus mappings, schedule, and state.

**Modes:** `id` → one · `ids` → many with OR logic · neither → paginated list (filters: name, state, additionalFilters, connection spec, flow spec, segment IDs, source/target connection IDs). |
| `search_destination_input_connections` | The AEP audience or dataset that feeds a destination flow. Returns sourceConnection entities — NOTE: in a destination flow, the sourceConnection field actually points at the AEP-side input (the audience being exported), NOT an external source.

**Modes:** `id` → one · `ids` → many with OR logic · neither → paginated list (filters: name, state, baseConnectionId, connectionSpecId, additionalFilters). |
| `search_destination_output_connections` | The external destination of a destination flow — the endpoint that receives exported audience data (data format + path config). Returns targetConnection entities.

**Modes:** `id` → one · `ids` → many with OR logic · neither → paginated list (filters: name, state, baseConnectionId, connectionSpecId, additionalFilters). |
| `search_source_connectors` | The catalog of available source connectors — connector classes you can authenticate against and ingest from. Each returned connectionSpec is a type definition (the connector class), not a configured instance.

**Modes:** `id` → one · `ids` → many with OR logic · neither → paginated list (filters: name, state, additionalFilters). |
| `search_source_accounts` | Authenticated source accounts — base connections holding credentials and connection state for a specific source connector type. Each account is a configured instance of a type from search_source_connectors.

**Modes:** `id` → one · `ids` → many with OR logic · neither → paginated list (filters: name, state, connectionSpecId, additionalFilters). |
| `search_source_flows` | Configured source ingestion pipelines — the orchestration layer that ties together a source account, an ingest connection, and a target connection, plus mappings, schedule, and state.

**Modes:** `id` → one · `ids` → many with OR logic · neither → paginated list (filters: name, state, additionalFilters, connection spec, flow spec, source/target connection IDs). |
| `search_source_input_connections` | The data selection layer of a source flow — what data to pull from an account (table, file path, schema). Sits between search_source_accounts and search_source_flows. Returns sourceConnection entities.

**Modes:** `id` → one · `ids` → many with OR logic · neither → paginated list (filters: name, state, baseConnectionId, connectionSpecId, additionalFilters). |
| `search_source_output_connections` | The AEP dataset destination of a source flow — where ingested data lands inside AEP. Returns targetConnection entities.

**Modes:** `id` → one · `ids` → many with OR logic · neither → paginated list (filters: name, state, baseConnectionId, connectionSpecId, additionalFilters). |
| `search_identity_namespaces` | Returns identity namespace definitions. Namespaces classify identity values (e.g. Email, Phone, ECID, loyalty IDs). Includes both Adobe-provided standard namespaces (custom: false) and organization-defined custom namespaces (custom: true).

**Modes:** `id` → one namespace · no `id` → all namespaces filtered client-side by code, idType, custom. No pagination — returns every namespace in one response. |
| `search_merge_policies` | Returns merge policy records. A merge policy defines how RT-CDP assembles a unified Real-Time Customer Profile from profile fragments across datasets — controlling which fragments are included, whether identities are stitched, and which value wins on conflict.

**Modes:** `mergePolicyId` → one · `mergePolicyIds` → bulk fetch · neither → paginated list (filters: schemaName, default, isActiveOnEdge, identityGraphType, attributeMergeType, orderBy). |
| `search_organizations` | Returns the list of Adobe IMS organizations accessible to the authenticated user. Each organization has orgName (human-readable) and orgId (canonical ID used across AEP, already formatted as {ident}@{authSrc}). Use to show available Organizations when Organization ID is needed for other tools. |

### Prompts

_No prompts listed._

---

## Installation Steps

Validated MCP clients: Anthropic Claude, Cursor, OpenAI ChatGPT, Claude Code, Codex.

NOTE: The Real-Time CDP MCP server is in Public Beta. Access is not automatic -- contact your Adobe account representative to request enrollment and have your organization allowlisted before attempting to connect.

BEFORE YOU START
- Your Adobe organization has been allowlisted for the RT-CDP MCP Beta (your account rep confirms this).
- You have RT-CDP permissions to view audiences, destinations, and data flows in Adobe Experience Platform.
- You know your Organization ID and sandbox name.
- Server URL: https://rtcdp-mcp.adobe.io/mcp
- You sign in with your Adobe ID in the browser on first use. There is no API key to create or store.

GENERIC SETUP (ALL CLIENTS)
1. Add the Real-Time CDP MCP server URL (https://rtcdp-mcp.adobe.io/mcp).
2. Save or activate the configuration to trigger the connection.
3. Sign in with your Adobe ID when prompted.
4. If your Adobe ID belongs to multiple organizations, select the desired organization.
5. Approve the connection between Adobe and your client.
6. Verify that the application has discovered the MCP tools.
7. At the start of each session, tell your assistant your Organization ID and sandbox name:
   "Use org  and sandbox  for this session."

WHERE TO ADD THE SERVER, BY CLIENT
- Claude (web and desktop): Settings &gt; Connectors &gt; Add custom connector
- ChatGPT (web and desktop): Apps &amp; Connectors (Developer Mode)
- Cursor: mcp.json configuration file
- Claude Code: claude mcp add, or config file
- Codex: ~/.codex/config.toml configuration file

CONFIGURATION FOR CLIENTS THAT USE A CONFIG FILE (e.g., Cursor, Claude Code, Codex)
{
  "mcpServers": {
    "rtcdp": {
      "url": "https://rtcdp-mcp.adobe.io/mcp",
      "transport": "http"
    }
  }
}

ENTERPRISE and TEAM ROLLOUT (ADMIN GUIDE)
On organization plans, custom connectors are off by default. An admin enables RT-CDP once; then each user connects with their own Adobe ID. Because every user signs in individually, their own AEP permissions and PII access carry through -- no shared credentials, no over-broad access.

Claude Team and Claude Enterprise:
1. An Owner or Primary Owner goes to Settings &gt; Organization &gt; Connectors.
2. Click Add custom connector.
3. Enter the URL https://rtcdp-mcp.adobe.io/mcp. Leave OAuth Client ID/Secret blank -- RT-CDP registers automatically.
4. Click Add.
5. Each user then connects the "rtcdp" connector from their own settings and signs in with their Adobe ID.
Note: Claude Enterprise also offers Enterprise-managed auth (beta) -- authorize the connector once via your identity provider and users inherit access on first login.

ChatGPT Business and ChatGPT Enterprise:
1. A workspace admin goes to Settings &gt; Permissions &amp; Roles &gt; Connected data.
2. Enable Developer Mode / Create custom MCP connectors. (Each admin enables it for themselves.)
3. On Enterprise/Edu, use RBAC to grant connector access to specific people, and allowlist the RT-CDP connector.
4. Users add https://rtcdp-mcp.adobe.io/mcp under Apps &amp; Connectors and sign in with their Adobe ID.

VERIFY and TROUBLESHOOT
- No tools appear: confirm your org is allowlisted and that the connection was approved.
- Permission errors on a tool: you need the matching RT-CDP permission (audiences / destinations / data flows) in AEP.
- Wrong data returned: re-state your org and sandbox at the start of the session.

Before using, ensure your Adobe organization has been allowlisted for the RT-CDP MCP Beta, and that you have the necessary permissions in Adobe Experience Platform to view audiences, destinations, and flow service entities.

For more information, check out the documentation link.

---

## Accessing the MCP Server

OAuth with Adobe ID. Sign in when connecting — MCP tools enforce your existing Real-Time CDP permissions.

Authentication flow: Connect through your MCP client, sign in with Adobe ID, select your organization if you belong to multiple, and approve the connection. Tokens are managed by the client.

Session context required: Every tool call requires your Organization ID and sandbox name. At the start of each session, tell your assistant: "Use org  and sandbox  for this session." If you don't know your Organization ID, call search_organizations — it returns all orgs your credentials can access.

To switch organizations: Disconnect the MCP connector, log out of your Adobe session in your browser, then reconnect to see the organization chooser.

Required: Valid Adobe ID with access to an allowlisted Adobe organization and the necessary Real-Time CDP product permissions.

---

## Documentation

- https://experienceleague.adobe.com/en/docs/experience-cloud-ai/experience-cloud-ai/mcp/rtcdp-mcp

---

## Support

adobecxmcp@adobe.com
