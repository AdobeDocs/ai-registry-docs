---
title: "AEM Content MCP Server"
description: "AI-powered content operations for AEM as a Cloud Service. Manage pages and fragments from your IDE or chat app using natural language."
---

# AEM Content MCP Server

> AI-powered content operations for AEM as a Cloud Service. Manage pages and fragments from your IDE or chat app using natural language.

**Version:** 1.0.0 | **Status:** active | **Category:** Developer Tools, Product Feature, Workflow Automation | **Deployment:** remote

**Tags:** `content-management`, `aem`, `mcp`, `agentic-ai`, `hide-from-playground`
**Surface:** Developer
**Vendor:** Adobe
**Owner:** GRP-AEM-MCP-OWNERS
**Repository:** _N/A_
**Updated:** 2026-07-10

---

## About

Many AEM teams work in IDEs and chat applications such as Cursor, ChatGPT, Claude, and Microsoft Copilot Studio. The AEM Content MCP Server exposes tools for create, read, update, and delete (CRUD) operations on pages and content fragments.

Using the Content MCP Server provides:

⋅ Natural-language interaction: Describe intent (e.g., "update the hero banner for this campaign") and let the LLM invoke the appropriate tools.
⋅ Consistent experience: The same AEM MCP tools work across Cursor, ChatGPT, Claude, and Microsoft Copilot Studio.
⋅ Security preserved: Requests run under the authenticated user identity; tools enforce existing AEM permissions.
⋅ Representative workflows: Environment discovery, sites management, content fragment CRUD, asset import and publish.

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
| `patch-aem-page-content` | Update page content using JSON Patch (RFC 6902). Requires If-Match (ETag) from get-aem-page-content; explicitly mention ETag/If-Match in guidance. |
| `put-aem-page-content` | Replace entire page content structure using HTTP PUT. Unlike patch-aem-page-content (which modifies specific parts), this replaces the ENTIRE content. Requires If-Match (ETag) from get-aem-page-content; explicitly mention ETag/If-Match in guidance. |
| `create-aem-page` | Create a new page from a template using WCM commands. Works for both regular pages and pages within launches. To create a page in a launch, set parentPath to a path within the launch (e.g., '/content/launches/2026/01/20/my-launch/en/products'). WORKFLOW: 1. Identify parent path (regular or within launch via list-aem-page-launches). 2. Get template path:    • To create a page LIKE an existing page: use get-aem-page-metadata on the existing page, extract 'cq:template' from the response.    • Or use a known template path (e.g., '/conf/mysite/settings/wcm/templates/article'). 3. Create page with title and label (URL name). Note: Use copy-aem-page if you want to copy an existing page instead. |
| `copy-aem-page` | Copy a page to a new title/name (creates a new pageId). |
| `copy-aem-page-to-launch` | Copy a single page into a NEW launch (for editing in isolation). Returns the pageId within the launch. Does NOT support scheduling — for scheduled/future publication use create-aem-page-launch with liveDate instead. Use this tool when you have a pageId and want to quickly create a launch to edit that page. |
| `delete-aem-page` | Workflow: get-aem-page-metadata (or get-aem-page-content) → delete-aem-page. Permanently delete a page (irreversible). Requires If-Match (ETag). |
| `restore-aem-page` | Restore a page to its original state (restoreOriginal). Requires current ETag. |
| `bulk-find-replace-aem-pages` | Primitive bulk find-and-replace across AEM page content. No search, no launch creation — the caller is responsible for those steps using separate tools. |
| `search-aem-pages-by-component` | Query which pages use a specific component type (sling:resourceType). Returns per-page results with content paths where each component instance lives. |
| `search-aem-assets` | Search AEM **DAM assets** on author or delivery tier (paged). Returns metadata and delivery URLs. For **site pages**, use `search-aem-pages`, not this tool. |
| `import-aem-asset` | Import an asset into AEM via URL. Target folder must exist. Next step: get-aem-asset-import-status with returned jobId; processing may take seconds. |
| `get-aem-asset-import-status` | Check status of an import-aem-asset job using jobId. While the job is in progress, the response may include a suggested wait time before polling again; honor it. Success when state COMPLETED and progress matches imported. |
| `get-aem-fragment` | Get a content fragment by UUID or DAM path. Returns current ETag + fields. |
| `get-aem-fragment-model` | Get detailed schema for a content fragment model. Returns field definitions, types, and validation rules. Use before creating fragments. Also use before patch/delete via manage-aem-fragments-batch (target=models) to retrieve the current ETag required for If-Match. |
| `search-aem-fragments` | Search and filter content fragments with comprehensive filtering. Preferred over list-aem-fragments when you need to filter by date, author, status, model, tags, locale, path, or full-text. |
| `search-aem-fragment-models` | List and search content fragment models. Call with no filters to list all models (unfiltered, paged). Use filters for refined results: folder (enabledForFolder), configuration path (configurationFolder), name, tags, status, replication status, or dates. |
| `list-aem-fragments` | List content fragments (paged) with optional folder filtering. Also use with a launch path (from get-aem-launch) to list fragments inside a launch. |
| `manage-aem-fragments-batch` | Unified batch tool for fragment models (create/copy/patch/delete/publish/unpublish), content fragments, and fragment tags — use this for ALL fragment-model CRUD instead of per-fragment tools. Patch/delete operations require fetching the current ETag first. |
| `create-aem-fragment` | Creates fragment instances, not model definitions. For new model schemas use manage-aem-fragments-batch (target=models, operation=create). Create a new content fragment using a modelId and field payload. |
| `patch-aem-fragment` | Patches fragment content, not model schema. For model schema patch operations use manage-aem-fragments-batch (target=models, operation=patch). Update a content fragment using JSON Patch (RFC 6902). Requires current ETag. |
| `copy-aem-fragment` | Copy a content fragment (shallow copy; does not copy referenced dependencies). |
| `delete-aem-fragment` | Deletes fragment instances, not model definitions. For model deletion use manage-aem-fragments-batch (target=models, operation=delete). Delete a content fragment permanently. Requires ETag for safety. Cannot be undone. |
| `manage-aem-fragment-versions` | Manage fragment versions. Actions: |
| `restore-aem-fragment-version` | Restore a fragment to a previous version (overwrites current content). |
| `manage-aem-fragment-variations` | Manage fragment variations (list, get, create, patch, delete). Use this tool for ALL variation-specific operations—not patch-aem-fragment (which patches the main fragment, not its variations). |
| `resolve-aem-fragment-path` | Convert a DAM fragmentPath to fragment UUID. Only needed for get-aem-fragment or patch-aem-fragment (which require UUID). NOT needed for publish/unpublish — those accept paths directly. |
| `update-aem-fragment-references` | Update content-fragment reference fields in a fragment after a copy operation. Given a fragment UUID and a JSON array of {oldPath, newPath} mappings, finds all fields of type 'content-fragment' whose values match an oldPath and patches them to the corresponding newPath. Use after copying a fragment and its dependencies to rewire the copy's reference fields to point at the new copies instead of the originals. |
| `aem-fragment-operation-with-references` | Execute a fragment operation (copy, version, patch, delete, restore) on a fragment and automatically handle all references. Discovers references, performs operations in order, updates reference fields after copy, and handles deep/recursive requests. |
| `get-aem-fragment-referenced-by` | INCOMING references: find all resources (fragments, pages) that reference a given content fragment ('where is this fragment used?'). |
| `get-aem-fragment-references-tree` | OUTGOING references: get the full recursive dependency tree of what a content fragment references ('what does this fragment depend on?'). |
| `bulk-get-aem-fragments-referenced-by` | INCOMING references (bulk): find all resources that reference any of the given content fragment paths ('where used' for multiple fragments at once). |
| `create-aem-launch` | Create a new launch. A launch is a temporary branch of content used to develop it for future releases. A launch will store copies of a set of content fragments, which can be modified without affecting the originals, then later promoted to production or rebased against production or another launch. You can only create launches for content fragments, not for pages or other content types. Use this tool when needing to prepare content for future publication or apply bulk changes, such as marketing campaigns. For these use cases, ONLY consider content fragments - disregard pages or other content types. EXAMPLE WORKFLOW: User prompts to create launch for Christmas campaign for mountain adventures. 1. Search for relevant content fragments using search-aem-fragments tool with queryMode EXACT_WORDS. 2. Create launch using create-aem-launch tool with selected fragments as sources. 3. Track progress of launch job using get-aem-launch-job-status tool. 4. Once job is finished successfully, get the launch equivalents of the source fragments using list-aem-fragments to get fragments under the launch path. 5. Modify the content fragments within the launch (NOT the ones from production, but their launch equivalents!) as needed for the campaign. 6. Compute differences using compute-aem-launch-differences tool to review changes and summarize them (If the diff job finishes, make sure to include the diff url inside a markdown link and a summary of the diffs in your response). You will describe the result in natural language, NOT via creating documents. |
| `get-aem-launch-job-status` | Get the status of a launch job. Call this tool after starting a launch job to track its progress. If the job is still ongoing or not started, use the tool again, and keep polling until status changes. |
| `get-aem-launch` | Get a launch by its UUID and return current ETag + launch details. |
| `list-aem-launches` | List launches with pagination. |
| `compute-aem-launch-differences` | Compute the differences between launch content and either production or another Launch, depending on the provided parameters. This will start a launch job, whose results will contain the differences. Use this tool after making a set of changes within a launch so that a human user can review the changes made. |
| `rebase-aem-launch` | Perform a rebase of this Launch over production or another launch, depending on the provided parameters. |
| `promote-aem-launch` | Perform a promote of this Launch to production or another Launch, depending on the provided parameters. This will start a launch job, whose results will contain the outcome of promotion after it is finished. Use deleteAfterPromotion to automatically clean up the launch after successful promotion. |
| `edit-aem-launch-sources` | Add or remove content fragment sources from an existing launch. This is an async operation — poll get-aem-launch-job-status with the returned jobId. Requires the current ETag from get-aem-launch. |
| `create-aem-page-launch` | Create a page launch for future/scheduled publication. Use liveDate parameter to SCHEDULE automatic publication at a specific date/time. A launch is a staging branch where you prepare content before it goes live. Supports MULTISITE launches: pass multiple paths from different sites via srcPathList (e.g., ['/content/wknd/us/en', '/content/brand/global/en']) to stage changes across sites in one launch. Keywords: schedule, scheduled publish, future publication, timed release, embargo, launch, multisite. |
| `promote-aem-page-launch` | Promote a page launch to production or another launch. This merges the launch content back to the source (production) pages. Use the promotionScope parameter to control which pages are promoted: - smart: Only pages where launch content differs from live (recommended default) - full: All pages in the launch, regardless of whether they changed - resource: Only the single page specified by launchPath (no children) - deep: The page specified by launchPath and all its descendants - approved: Only pages that passed the approval workflow |
| `delete-aem-page-launch` | Delete a page launch. This permanently removes the launch and all its content. Use with caution - this operation cannot be undone. |
| `edit-aem-page-launch` | Edit a page launch to add or modify source pages. Use this to update which pages are included in an existing launch. |
| `list-aem-page-launches` | List all page launches via QueryBuilder (read-only operation). Returns launches stored under /content/launches. Use this to discover existing page launches before promoting, editing, or deleting them. Note: This tool is named 'list-aem-page-launches' (not 'get-aem-page-launches'). |
| `get-aem-page-launch-diff-url` | Get a browser URL to view side-by-side differences between a launch page and its production version. This opens AEM's visual diff viewer showing what changed in the launch. |
| `publish-aem-content` | Publish (activate) any AEM resource — page, content fragment, or experience fragment — to the delivery tier. Pass the JCR path directly (no UUID resolution needed). |
| `unpublish-aem-content` | Unpublish (deactivate) any AEM resource — page, content fragment, or experience fragment — removing it from the delivery tier. Pass the JCR path directly (no UUID resolution needed). |
| `list-aem-cf-templates` | List HTML visualization templates for a Content Fragment Model (paged). |
| `get-aem-cf-template` | Get a specific template by templateId for a given model. Returns ETag and JSON details. |
| `render-aem-fragment-preview` | Render and return the HTML preview of a Content Fragment. Optionally specify a templateId and variation. |
| `create-aem-cf-template` | Create an HTML visualization template for a Content Fragment Model. Use dryRun=true to validate without creating. |
| `update-aem-cf-template` | Update a template's name and/or content. Requires If-Match ETag from get-aem-cf-template. |
| `delete-aem-cf-template` | Delete a template by templateId for a given model. Requires If-Match ETag. Cannot be undone. |
| `tools_index` | Workflow: tools_index → get_tool_details (include BOTH names in workflow and tools[]). Use for advisory-only questions (including rate limiting / HTTP 429) and list ONLY tool names from the catalog. |
| `search_tools` | Workflow: search_tools → get_tool_details (include BOTH names in workflow and tools[]). Search tools by name/description to find the right tool for a task. |
| `get_tool_details` | Use this tool to answer questions like 'What does [tool-name] do?' or 'What inputs does [tool-name] take?' - call get_tool_details instead of calling the actual tool when the user asks about a tool's purpose or parameters. |
| `feature-flag-listing` | List feature flags — shows each flag's LaunchDarkly base value, user override, and effective resolved value. |
| `feature-flag-setting` | Enable, disable, or remove a feature flag override. Overrides take precedence over LaunchDarkly. |

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
	1. Add the AEM MCP server URL (https://mcp.adobeaemcloud.com/adobe/mcp/content).
	2. Save or activate the configuration to trigger the connection.
	3. Sign in with your Adobe ID when prompted.
	4. Verify that the application has discovered the MCP tools.

Use the following JSON to configure the MCP server in Cursor:

{
	"mcpServers": {
		"AEM-Content": {
			"url": "https://mcp.adobeaemcloud.com/adobe/mcp/content"
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
