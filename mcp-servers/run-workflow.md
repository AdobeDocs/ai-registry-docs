---
title: "Firefly Creative Production MCP Server"
description: "MCP server exposing Adobe creative production workflow capabilities to LLMs via natural language."
---

# Firefly Creative Production MCP Server

> MCP server exposing Adobe creative production workflow capabilities to LLMs via natural language.

**Version:** 3.4.2 | **Status:** active | **Category:** Workflow Automation | **Deployment:** remote

**Tags:** `firefly-creative-production`, `run-workflow`
**Surface:** Developer, End-user
**Vendor:** Adobe
**Owner:** aws_aws_cent_dev_administrator, org-anmolc-all, grp-claude-ent-users
**Repository:** _N/A_
**Updated:** 2026-09-16

---

## About

The Firefly Creative Production MCP Server bridges any MCP-compatible LLM Agent with Adobe's Firefly Creative Production for Enterprise (FFCPE) platform running our creative production workflows. 

FFCPE is a workflow orchestration engine that creates and executes multimodal media workflows using Adobe services like Photoshop, InDesign, Illustrator, Firefly etc. to deliver scaled activation ready assets.

Users can discover and execute prebuilt workflows or compose new workflows using natural language commands via any Agents that integrate with these MCP tools.

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `compose_workflow` | Compose a workflow using the AI graph agent. Describe the goal in 'message' and the server builds a validated workflow graph with a session_id for follow-up execution or editing. |
| `create_preset` | Publish a workflow definition as a durable preset/interface so its static assets are retained and re-minted on future runs. |
| `create_upload_url` | Mint short-lived upload URLs for direct file uploads, useful for large attached assets or multi-file transfers that should bypass large tool-call payloads. |
| `display_asset` | Display one or more image files inline in the chat as embedded previews for inspection or approval. |
| `download_output` | Download a workflow output from a presigned URL to a local file path for inspection or downstream use. |
| `generate_curl` | Generate a ready-to-use curl command for executing a published workflow, with placeholders for required asset URLs. |
| `get_action_schema` | Get the full parameter schema for a specific action type, including input/output ports and parameter metadata. |
| `get_dgr_presets` | List available DGR output presets for After Effects template renders, including aspect-ratio and platform-specific options. |
| `get_dgr_template_description` | Describe an After Effects motion graphics template (.mogrt), including variables and font metadata, so the caller can pass exact values into a render. |
| `get_featured_workflow` | Look up a predefined or featured workflow by stable id or keyword and return its prepared inputs and cached session data. |
| `get_indesign_tags` | Extract data-merge tags from an InDesign template so the caller can match template placeholders to workflow inputs before execution. |
| `get_psd_tags` | Extract data-merge tags from a Photoshop template and identify text and smart-object placeholders that need mapping. |
| `get_workflow_examples` | Look up real workflow examples for given action types to compare wiring and parameters against known-good patterns. |
| `inspect_run` | Inspect an existing workflow run or historical execution to review diagnostics, workflow JSON, rerun options, and output status. |
| `list_actions` | List available workflow actions and their categories, helping the caller discover the capabilities before building or remodeling a workflow. |
| `list_all_workflows` | List workflows visible to the caller, including personal and org-shared items, with pagination and summary metadata. |
| `list_batches` | List recent workflow batch executions for the current user, including status and run metadata, useful for auditing recent jobs. |
| `list_custom_models` | List the caller’s custom Firefly models that can be used with image-generation workflows, including their IDs and versions. |
| `list_featured_workflows` | List featured workflow templates available for intake or graph composition, including their required inputs and metadata. |
| `list_golden_workflows` | List the homepage golden-demo workflows, including their use-case labels and workflow identifiers for direct execution or inspection. |
| `list_interface_runs` | List runs launched from published interfaces or presets, representing the interface job log for the caller’s org. |
| `list_interfaces` | List published interfaces or presets available to the user, including metadata about the interface definition and workflow id. |
| `list_workflow_history` | List the caller’s workflow definitions and historical activity, with filtering by last execution or publish date and run metadata. |
| `list_workflow_runs` | List plain workflow executions (non-interface runs) for the current user, including status, timing, and batch identifiers. |
| `plan_template_rewire` | Compare a workflow’s default template tags with a custom template and generate precise rewire instructions for a supported template swap. |
| `publish_workflow` | Publish a workflow definition so it becomes reusable via a stable workflow id and can be executed or inspected later. |
| `refresh_catalog` | Refresh the action catalog and featured-workflow metadata from the remote service so newly registered actions or template updates are visible. |
| `reload_examples` | Reload workflow example fixtures from disk to pick up updates without restarting the MCP server. |
| `resolve_workflow_session` | Resolve a cached compose or featured-workflow session to its Matrix graph and related prepared inputs for editing, import, or saving. |
| `run_dgr_render` | Submit a DGR render job for a motion-graphics template with explicit variable values, font overrides, and output format presets. |
| `run_workflow_get_status` | Poll a submitted workflow batch for lifecycle status, progress counts, and final output URLs once complete. |
| `run_workflow_submit` | Submit a workflow for asynchronous execution and return immediately with a batch id for monitoring and output retrieval. |
| `save_workflow` | Save a workflow as a Builder draft so it can continue to be edited in the Workflow Builder and persist in the user’s cloud workspace. |
| `upload_asset` | Upload a file or URL to cloud storage and receive a usable asset URL for workflow inputs, including batch uploads and base64 content. |
| `validate_workflow` | Validate a workflow graph before execution, checking structural integrity, connection validity, MIME compatibility, and required inputs. |

### Prompts

_No prompts listed._

---

## Installation Steps

Connect the Firefly Creative Production MCP server

Endpoint: https://run-workflow.adobe.io/mcp

Authentication is handled automatically via IMS OAuth 2.1 — no manual API key or token entry required.

Option A — Clients with built-in remote MCP support
(Claude.ai / Claude Desktop Connectors, ChatGPT Connectors, Cursor, VS Code Copilot, and other clients that support adding a remote MCP server by URL)

Open your client's MCP/Connector settings.
1. Add a new server with URL: https://run-workflow.adobe.io/mcp
2. Save. 
3. Authorize - The client will detect the OAuth requirement and open a browser window to sign in with your Adobe ID (IMS).
Once authorized, the client will list the available Firefly Creative Production tools.

Option B — Clients that only support local (stdio) MCP servers
(Claude Code, Codex, older Claude Desktop versions, or any client expecting a command/args config instead of a URL)

Add this to the client's MCP config file:

{
  "mcpServers": {
    "firefly-creative-production": {
      "command": "npx",
      "args": ["mcp-remote", "https://run-workflow.adobe.io/mcp"]
    }
  }
}

On first use, mcp-remote opens a browser to complete IMS sign-in and caches the resulting credentials locally for future sessions.

Verifying the connection
Ask the agent to list its available tools, or check the client's MCP/tool panel — you should see Firefly Creative Production actions (e.g. workflow discovery, execution, publishing).

---

## Accessing the MCP Server

The /mcp endpoint uses the same auth as all run-workflow REST endpoints.

---

## Documentation

- https://helpx.adobe.com/firefly/web/work-with-enterprise-features/creative-production/creative-production-overview.html

---

## Support

ffcpemcp@adobe.com
