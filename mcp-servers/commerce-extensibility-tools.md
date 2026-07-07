---
title: "Adobe Commerce App Builder MCP"
description: "The Adobe Commerce App Builder MCP enables AI-powered workflows for App Builder by integrating coding tools that convert natural language into Adobe App Builder apps."
---

# Adobe Commerce App Builder MCP

> The Adobe Commerce App Builder MCP enables AI-powered workflows for App Builder by integrating coding tools that convert natural language into Adobe App Builder apps.

**Version:** 1.0.0 | **Status:** active | **Category:** Developer Tools, Learning and Documentation | **Deployment:** local

**Tags:** `developer-tools`, `learning-and-documentation`, `hide-from-playground`
**Surface:** Developer
**Vendor:** Adobe
**Owner:** grp-ai-registry-admins, Grp-RegX
**Repository:** _N/A_
**Updated:** 2026-03-25

---

## About

The Adobe Commerce App Builder MCP supports both migration and new development workflows for Adobe Commerce App Builder. It enables partners and customers to leverage their own LLMs for natural‑language prompt‑to‑code generation, intelligent refactoring, and context‑aware editing when creating new App Builder app.

Using the tool provides the following benefits:

⋅ Enhanced development workflow: Integrated Adobe Commerce development tools.
⋅ AI-powered assistance: Context-aware code generation and debugging.
⋅ Commerce-specific features: Specialized tools for Adobe Commerce App Builder development.
⋅ Automated workflows: Streamlined development and deployment processes.

---

## MCP Capabilities

### Tools

| Name | Description |
|------|-------------|
| `aio-app-deploy` | Deploy an Adobe I/O App to runtime. Can deploy specific actions or the entire app. |
| `aio-app-dev` | Start a local development server for Adobe I/O App. Runs the app locally for development and testing. |
| `aio-app-use` | Configure the runtime namespace for the current Adobe I/O App project. |
| `aio-configure-global` | Change the global Adobe I/O configuration (org, project, workspace). Can list available options or set specific values. |
| `aio-dev-invoke` | Invoke a runtime action that is running locally via aio app dev. Can discover available actions and call them with parameters. |
| `aio-login` | Log in to Adobe I/O. Opens browser for OAuth2 authentication and handles the login flow. |
| `aio-where` | Show current Adobe I/O configuration (org, project, workspace) and ask for deployment confirmation. |
| `commerce-event-subscribe` | Run npm run commerce-event-subscribe to subscribe to Commerce events for product and customer changes. This script sets up event listeners for catalog operations, customer operations, and customer group operations using Commerce OAuth1 authentication. |
| `onboard` | Run npm run onboard to configure Adobe I/O event providers and the Adobe I/O Events for Commerce module. This script creates event providers, registers event metadata, creates event registrations, and configures the Commerce Events module. It handles authentication, provider creation, and Commerce integration setup. |
| `search-commerce-docs` | Search Adobe Commerce and App Builder documentation for coding guidance and implementation details. The backend intelligently finds the most relevant documentation based on your query. |

### Prompts

_No prompts listed._

---

## Installation Steps

Developers can run the extensibility:tools-setup command on the commerce aio plugin to setup the MCP tools and rules in their codebase.
Detailed installation instructions are available at https://experienceleague.adobe.com/en/docs/commerce/cloud-service/migration/migration-tools/coding-tools#installation


		aio commerce extensibility tools-setup

---

## Accessing the MCP Server

IMS auth using aio


		aio auth login

---

## Documentation

- https://experienceleague.adobe.com/en/docs/commerce/cloud-service/migration/coding-tools
- https://experienceleague.adobe.com/en/docs/commerce/cloud-service/tutorials/ratings-extension

---

## Support

stargriffinsextended@adobe.com
