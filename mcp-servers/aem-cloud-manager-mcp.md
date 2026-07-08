---
title: "AEM Cloud Manager MCP Server"
description: "Manage Cloud Manager programs, environments, pipelines, and repositories from your IDE. Run pipelines, debug failures, and access Cloud Manager tools via natural language—no context switching."
---

# AEM Cloud Manager MCP Server

> Manage Cloud Manager programs, environments, pipelines, and repositories from your IDE. Run pipelines, debug failures, and access Cloud Manager tools via natural language—no context switching.

**Version:** 1.0.0 | **Status:** active | **Category:** Developer Tools, Product Feature, Workflow Automation | **Deployment:** remote

**Tags:** `cloud-manager`, `aem`, `mcp`, `agentic-ai`, `ci-cd`, `pipelines`, `hide-from-playground`
**Surface:** Developer
**Vendor:** Adobe
**Owner:** GRP-AEM-MCP-OWNERS
**Repository:** _N/A_
**Updated:** 2026-07-08

---

## About

The AEM Cloud Manager MCP Server exposes tools for managing Adobe Cloud Manager programs, environments, pipelines, repositories, and pipeline executions. It lets AEM developers run pipelines, debug failures, and access Cloud Manager tools directly in their IDE—no context switching.

Using the Cloud Manager MCP Server provides:

⋅ Natural-language interaction: Describe intent (e.g., "list my programs", "start the production pipeline", "show me the logs from the failed build") and let the LLM invoke the appropriate tools.
⋅ Consistent experience: The same AEM MCP tools work across Cursor, ChatGPT, Claude, and Microsoft Copilot Studio.
⋅ Security preserved: Requests run under the authenticated user identity; destructive actions (e.g., start pipeline, create environment) require explicit user confirmation by typing the pipeline or environment name.
⋅ Representative workflows: Program discovery, environment management, pipeline listing and execution, repository and branch inspection, execution step details, and log retrieval for debugging failed pipelines.

When Using MCP in Agentic Systems

MCP Servers are designed for human-operated MCP Clients with interactive UX and human oversight. The MCP Tools spec recommends a human in the loop who can approve or deny tool invocations.

If you use MCP Servers in an agentic or autonomous system, treat that as a separate compatibility tier. Do not hardcode tool names in prompts, allowlists, or routing logic. In MCP, the tool name is a programmatic identifier, the description is the model-facing hint for the LLM. Prefer capability or description based prompting and selection.

Implement runtime discovery via tools/list, handle tool-list changes (notifications/tools/list_changed), and align with the MCP Server provider on onboarding and versioning if you need stability guarantees beyond the protocol baseline.

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `manage_programs` | Consolidated tool for managing Cloud Manager programs. Actions: list (all programs), get (specific program details), create (new program). This is a new consolidated tool that replaces list-programs, get-program, and create-program. |
| `manage_environments` | Consolidated tool for managing Cloud Manager environments. Actions: list (all environments in program), get (specific environment details), create (new environment: dev/stage/prod/rde - REQUIRES USER TO TYPE ENVIRONMENT NAME). IMPORTANT FOR CREATE ACTION: Always call with action="create", programId, name, and type ONLY. DO NOT include confirmEnvironmentName parameter on first call. The tool will return a confirmation prompt asking the user to type the exact environment name. Only after user provides the environment name should you call again with confirmEnvironmentName set to what the user typed. The server will validate that the typed name matches the actual environment name. This is a new consolidated tool that replaces list-environments, get-environment, and create-environment. |
| `manage_pipelines` | Consolidated tool for managing Cloud Manager pipelines. Actions: list (all pipelines in program), get (specific pipeline details), start (trigger pipeline execution - REQUIRES USER TO TYPE PIPELINE NAME). IMPORTANT FOR START ACTION: Always call with action="start", programId, and pipelineId ONLY. DO NOT include confirmPipelineName parameter on first call. The tool will return a confirmation prompt asking the user to type the exact pipeline name. Only after user provides the pipeline name should you call again with confirmPipelineName set to what the user typed. The server will validate that the typed name matches the actual pipeline name. This is a new consolidated tool that replaces list-pipelines, get-pipeline, and start-pipeline. |
| `manage_pipeline_executions` | Consolidated tool for managing pipeline executions. Actions: list (all executions for a pipeline), get (specific execution details), cancel (stop running execution), advance (approve/move to next step). This is a new consolidated tool that replaces list-pipeline-executions, get-pipeline-execution, cancel-pipeline-execution, and advance-pipeline-execution. |
| `manage_execution_steps` | Consolidated tool for managing pipeline execution steps. Actions: get-details (step status and metrics), get-logs (fetch and summarize log output with intelligent sampling for large files). This is a new consolidated tool that replaces get-execution-step-details and get-execution-step-logs. |
| `manage_repositories` | Consolidated tool for managing Git repositories. Actions: list (all repositories in program), get (specific repository details), list-branches (all branches in repository). This is a new consolidated tool that replaces list-repositories, get-repository, and get-repository-branches. |

### Prompts

_No prompts listed._

---

## Installation Steps

Supported MCP clients: Anthropic Claude, Cursor, OpenAI ChatGPT, Microsoft Copilot Studio.

Generic setup (all clients):
	1. Add the AEM Cloud Manager MCP server URL (https://mcp.adobeaemcloud.com/adobe/mcp/cloudmanager).
	2. Save or activate the configuration to trigger the connection.
	3. Sign in with your Adobe ID when prompted.
	4. Verify that the application has discovered the MCP tools.

Use the following JSON to configure the MCP server in Cursor:

{
	"mcpServers": {
		"AEM-Cloud-Manager": {
			"url": "https://mcp.adobeaemcloud.com/adobe/mcp/cloudmanager"
		}
	}
}

Cursor: Settings ⇒ Cursor Settings ⇒ Tools ＆ MCP ⇒ Add Custom MCP (or New MCP Server). Paste the JSON above into mcp.json. Click Connect, sign in with Adobe ID, then confirm the server shows as connected.

---

## Accessing the MCP Server

OAuth with Adobe ID. When connecting, sign in with your Adobe ID. Destructive actions (e.g., start pipeline, create environment) require explicit user confirmation by typing the pipeline or environment name.

---

## Documentation

- https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/ai-in-aem/using-mcp-with-aem-as-a-cloud-service
- https://experienceleague.adobe.com/en/docs/experience-manager-learn/cloud-service/ai/mcp-servers/overview
- https://experienceleague.adobe.com/en/docs/experience-manager-learn/cloud-service/ai/mcp-servers/cloud-manager

---

## Support

aemcs-mcp-feedback@adobe.com
