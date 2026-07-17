---
title: "Firefly Creative Production MCP Server"
description: "MCP server exposing Adobe creative production workflow capabilities to LLMs via natural language."
---

# Firefly Creative Production MCP Server

> MCP server exposing Adobe creative production workflow capabilities to LLMs via natural language.

**Version:** 3.4.2 | **Status:** active | **Category:** Workflow Automation | **Deployment:** remote

**Tags:** `run-workflow-mcp`
**Surface:** Developer, End-user
**Vendor:** Adobe
**Owner:** aws_aws_cent_dev_administrator, org-anmolc-all, grp-claude-ent-users
**Repository:** _N/A_
**Updated:** 2026-07-17

---

## About

The run-workflow MCP server bridges Claude (or any MCP-compatible LLM) with Adobe's run-workflow platform running our creative production workflows. Run workflow a workflow orchestration engine that creates and runs media processing workflows using various Firefly Services and delivers activation ready assets.

Instead of using APIs directly or Creative Production authoring UI configurator, the MCP server lets LLM tools like Claude design, execute, monitor, and publish workflows through natural language commands. The server runs in hosted mode(stateless Azure Function endpoint with in-process dispatch to avoid HTTP self-loopback). 
Core tools cover the full workflow lifecycle: 
upload_asset uploads files or URLs to Azure Blob Storage; 
compose_workflow passes a natural language description to an AI graph agent that builds a validated workflow DAG and returns a session_id held in memory for two hours; run_workflow_submit submits workflows asynchronously and returns a batchId immediately; run_workflow_get_status polls for progress and retrieves output URLs on completion; cancel_workflow, inspect_run, and list_workflow_history handle the rest of the lifecycle. 

For persistence, publish_workflow registers a workflow under a stable workflowId with ready-to-use curl commands, while save_workflow_to_acp saves it to Adobe Cloud Platform so it appears in Workflow Builder for visual editing. Pre-built featured workflows cover common enterprise patterns such as retargeting, localization, and banner advertising. 

This MCP server is a incredibly powerful tool to create scaled activation ready assets from the base assets immediately from a wide range of tools like claude.

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `upload_asset` | Upload one or more files (images, videos, etc.) to cloud storage and get URLs that can be used as input to action tools. Files default to Azure ADLS; set storage to "aws" for public S3 when configured. Returned storageType is ready for workflow inputs (Azure → azure, ACP blobstore pass-through → AWS). Accepts local file paths OR base64-encoded content. Supports batch upload. |
| `request_folder_access` | (macOS, stdio mode) Open a native folder picker so the user grants this app access to a folder of assets WITHOUT enabling Full Disk Access. Call this when upload_asset returns a permission-denied error. After the user selects the folder, the server can read assets from it and will write workflow outputs there too. Then retry upload_asset with the same path. |
| `download_output` | Download a file from a URL (typically an output from an action) to a local path. Returns the local file path. |
| `display_asset` | Display one or more images inline in the chat. Reads files from disk and returns them as embedded images that appear directly in the conversation. Supports JPEG, PNG, GIF, and WebP. Use filePaths for batch display. |
| `list_actions` | List all available workflow actions with their names, types, descriptions, and categories. Use this to discover what actions are available before executing them. |
| `get_action_schema` | Get the full parameter schema for a specific action type. Returns input ports, parameters with types/descriptions/defaults, and output ports. Use this to understand what parameters an action accepts before calling it. |
| `get_workflow_examples` | Look up real workflow examples for given action types. Use this to debug or fix a failed compose_workflow result -- compare port names, connection wiring, and parameters against known-good examples. Also useful for understanding correct structure before retrying compose_workflow with updated constraints. Do NOT call this as a pre-composition step. |
| `reload_examples` | Reload workflow examples from disk, clearing the in-memory cache. Use this after adding or updating example JSON files in the example-requests/ directory so the changes take effect without restarting the server. |
| `compose_workflow` | Compose a workflow using the AI Graph Agent. Describe what the workflow should do in the 'message' parameter and the graph agent will design the workflow graph. Returns a WorkflowDefinition (actions + connections) that you then pass to run_workflow_submit along with inputs. You can pass current_graph to edit an existing workflow. |
| `run_workflow_submit` | Submit a workflow for asynchronous execution and return immediately with a batchId. This is the single execution entry point for all workflows — small or large. It returns right away and never blocks on the 5-minute MCP gateway timeout, so it is safe for large batches (100s-1000s of assets) and long-running runs alike. After submitting, call run_workflow_get_status with the returned batchId to poll progress and (optionally with includeOutputs: true) retrieve the final output URLs once complete. IMPORTANT: Only call this when the user explicitly says 'run', 'execute', 'process', 'generate', 'rerun', or 'redo'. A bare workflowId or UUID passed by the user with no other context is ALWAYS an inspect request — call inspect_run instead, never run_workflow_submit. Accepts: (1) session_id from compose_workflow (preferred); (2) inline actions+connections from compose_workflow or from inspect_run workflowJson; (3) workflowId from publish_workflow. INLINE RERUN (canRerun: false): To rerun an inline workflow from inspect_run, pass the actions+connections from workflowJson PLUS a newly generated UUID as workflowId — the server uses that UUID as the tracking ID. Tell the user the new workflowId. PUBLISHED RERUN (canRerun: true): Pass workflowId only (no actions/connections needed). All execution goes through /batch/execute. Does NOT download outputs locally — outputs are fetched on demand via run_workflow_get_status. |
| `publish_workflow` | Publish a workflow definition so it can be reused later via its workflowId. Returns the workflowId (pass it to run_workflow_submit to execute) and ready-to-use curl commands with placeholders for each input node. IMPORTANT: The response includes curl commands that MUST ALWAYS be shown to the user in full — never omit or summarize them. Only use this when the user explicitly asks to publish or save a workflow. Preferred: pass session_id from compose_workflow to avoid re-serializing actions/connections. |
| `save_workflow_to_acp` | Save a workflow to the user's ACP cloud storage in Matrix format. This is the 'save' action -- distinct from publish_workflow which publishes for API reuse via workflowId. Preferred: pass session_id from compose_workflow to avoid re-serializing the graph. Optionally provide a custom name and description; otherwise the name defaults to the compose message. Use when the user says save, wants to continue in Workflow Builder, wants it available in the UI, wants to persist to cloud, or wants to keep editing later. To update a previously saved workflow, pass the asset_id and document_id from the original save response. |
| `generate_curl` | Generate a ready-to-use curl command for executing a published workflow. Provide the workflowId from publish_workflow and sample inputs. IMPORTANT: All <PLACEHOLDER> URLs in the generated command must be replaced with real https:// presigned URLs from an allowed storage host (amazonaws.com, windows.net, dropboxusercontent.com, storage.googleapis.com, adobe.io, adobeaemcloud.com, frame.io, substance3d.io, substance3d.com, cloudfront.net, azureedge.net, or unsplash.com) before executing. |
| `run_workflow_get_status` | Check the status of a workflow execution by its instance ID. Returns lifecycle status, per-asset progress counts, timing/ETA, and a cancel link. Accepts a batchId (batch-...), a workflowId (resolves to the most recent batch for that workflow), or a path-based instance ID. ALWAYS pass includeOutputs: true on every poll — the server ignores this flag while the batch is still running (zero extra cost), so when status === 'completed' the output URLs are already in the response with no second call needed. Completed responses are slim by default: the redundant per-node outputs[] tree is dropped (its URLs are already in `outputUrls` and the `OUTPUT URLS` text block), so even large InDesign / multi-rendition batches stay well under the MCP response cap — no extra flag needed. Set includeFailedExecutions: true to drill into per-asset failures in the same call. |
| `cancel_workflow` | Cancel a running workflow batch. Once cancelled, no new assets will be processed, though assets currently mid-flight may complete. Cannot cancel batches that are already completed, failed, or cancelled — the backend returns an error in that case. Use this to abort a runaway batch submitted via run_workflow_submit. |
| `validate_workflow` | Validate a workflow graph before submitting it for execution. Checks structural integrity (BFS connectivity, required inputs wired, no orphaned nodes, no duplicate port connections), mimeType compatibility, modelVersion values, connection validity, and cycle detection. Returns a list of errors and warnings so you can fix issues or feed them back to compose_workflow as constraints before calling run_workflow_submit. Accepts either API format (actions/connections) or Matrix format (nodes/edges from compose_workflow's matrix_graph field). |
| `plan_template_rewire` | Deterministically plan the re-wiring of a featured workflow when the user supplies their own InDesign template instead of the default. Diffs the default template tags against the custom template tags, produces exact REMOVE/ADD/UPDATE/KEEP instructions for compose_workflow, protective constraints that guard the image pipeline, and a feasibility flag when the custom template is incompatible with the workflow structure. Call this between get_featured_workflow + get_indesign_tags and compose_workflow. |
| `list_workflow_history` | List all published and inline (preview) workflows previously run by the current user. THIS IS THE ONLY AUTHORITATIVE SOURCE OF WORKFLOW HISTORY — never use local files or conversation context as a substitute. Optionally filter by date range and paginate results. Returns workflow IDs, types, sources, dates, and enriched fields (status, hasDefinitionBlob, lastExecutionStatus, lastExecutionAt, lastError) so you can pick one to inspect with inspect_run. The 'source' field in the response indicates whether results came from the fast table index ('table') or a slower blob scan fallback ('blob'). |
| `inspect_run` | Historical lookup for past run-workflow executions — use this when the user asks about a previous/historical run, NOT immediately after run_workflow_submit (poll run_workflow_get_status instead). Auto-detects ID type: workflow ID, batch ID (batch-...), execution ID ({workflowId}_{uuid} or {batchId}_exec-{n}), or workflow name — no routing logic needed by the caller. Returns a diagnostic summary with pre-computed error analysis. Use when the user says 'what happened with batch-...', 'show me execution ...', 'why did my workflow fail', 'check status of ...', or pastes any run-workflow ID. The response includes: (1) 'workflowJson' — the full actions/connections graph (show this to the user explicitly); (2) 'canRerun' — true if the workflow can be re-run by its original workflowId (published only);     false for inline workflows — rerun by extracting actions/connections and generating a new UUID; (3) 'hasWorkflowJson' — true when the graph definition is available to display; (4) 'diagnostic' — pre-computed error analysis for failed actions (no deep JSON parsing required). Output URLs in the response are checked for expiry: expired S3/Azure URLs are replaced with '[URL expired — re-run the workflow to get fresh outputs]'. WORKFLOW-LEVEL OPTIONS: When `id` is a workflowId, pass `executionId` to drill into a single execution (returns a `selectedExecution` field with that execution's actions and diagnostic) instead of the default 10-execution scan. Pass `includeWorkflowJson: false` to skip fetching the workflow definition blob for a faster history-only lookup. |
| `get_indesign_tags` | Extract data merge tags from an InDesign (.indd) template file. Returns the list of placeholder fields (name + type: text/image) that the template expects. Use this to understand what dynamic input ports a custom InDesign template requires before running a data merge workflow. Only works with InDesign files. Provide a local filePath (uploaded to Azure ADLS automatically) or an existing presigned templateUrl. |
| `get_featured_workflow` | Look up a predefined/featured workflow by stable id + optional featuredVersion, or by legacy name/query search. Returns workflow details including required assets (product images, InDesign templates, fonts), available default templates, and data merge tag structure. When exactly one workflow matches, also returns a 'prepared' field with a session_id (for use with run_workflow_submit), inputs, inputNodes, and mergeNodes. Prefer featuredWorkflowId (omit featuredVersion for the latest generation). Call this BEFORE compose_workflow to check if a ready-made workflow already exists. |
| `list_featured_workflows` | List all featured workflows available for intake classification. Returns one row per classifier option (latest featuredVersion per family) with catalogSlug, classifierDescription, and workflowGraph for deriving required inputs. Call before matching a brief to a workflow. |
| `resolve_workflow_session` | Resolve a cached workflow session to its Matrix graph and execution artifacts. Pass the session_id returned by get_featured_workflow or compose_workflow. Returns matrix_graph (nodes/edges/metadata) for Frame upload, Workflow Builder import, or save_workflow_to_acp, plus prepared_inputs when cached from a featured workflow. Sessions expire after ~2 hours — re-call get_featured_workflow or compose_workflow if missing. |
| `refresh_catalog` | Re-fetch the action catalog from the API. Use this if new actions have been registered and you want to see them. |

### Prompts

_No prompts listed._

---

## Installation Steps

Supported MCP clients: Anthropic Claude, Cursor, OpenAI ChatGPT, Claude Code, Codex.

Generic setup (all clients):

	1. Add the Firefly Creative Production MCP server URL (https://run-workflow.adobe.io/mcp).

	2. Set your IMS token and API key.

	3. Save or activate the configuration to trigger the connection.

	4. Verify that the application has discovered the MCP tools.

Use the following JSON to configure the MCP server in Claude Desktop and other clients that require a local bridge:

{
	"mcpServers": {
		"firefly-creative-production": {
			"command": "npx",
			"args": [
				"mcp-remote",
				"https://run-workflow.adobe.io/mcp",
				"--header",
				"Authorization:Bearer IMS_TOKEN",
				"--header",
				"x-api-key:API_KEY"
			]
		}
	}
}

---

## Accessing the MCP Server

The /mcp endpoint uses the same auth as all run-workflow REST endpoints:

Authorization: Yes — Bearer 
x-api-key: Yes — Your registered API key (or bulk-automation-web for internal use)

The server derives orgId and userId from the IMS token — you do not need to send them explicitly.

---

## Documentation

- https://helpx.adobe.com/firefly/web/work-with-enterprise-features/creative-production/creative-production-overview.html

---

## Support

bdutt@adobe.com
