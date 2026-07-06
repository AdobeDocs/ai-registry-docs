const API_BASE = "https://ai.adobe.io/registry/mcp/api/v1";
const OUTPUT_DIR = "mcp-servers";

interface Tool {
  name: string;
  title?: string | null;
  description: string;
}

interface Prompt {
  name: string;
  title?: string | null;
  description: string;
}

interface Capabilities {
  tools?: Tool[] | null;
  prompts?: Prompt[] | null;
}

interface ServerDetails {
  name: string;
  title?: string | null;
  summary?: string | null;
  description?: string | null;
  version?: string | null;
  status?: string | null;
  category?: string[] | null;
  deployment_mode?: string[] | null;
  tags?: string[] | null;
  surface?: string[] | null;
  vendor?: string | null;
  owner?: string[] | null;
  repository?: { url?: string | null } | null;
  updated_at?: string | null;
  installation?: string | null;
  authentication?: string | null;
  documentation?: string[] | null;
  support_contact?: string | null;
  packages?: Capabilities[] | null;
  remotes?: Capabilities[] | null;
}

function toolsTable(tools: Tool[]): string {
  if (!tools.length) return "_No tools listed._";
  return [
    "| Name | Description |",
    "|------|-------------|",
    ...tools.map((t) => `| \`${t.name}\` | ${t.description || "_No description_"} |`),
  ].join("\n");
}

function promptsTable(prompts: Prompt[]): string {
  if (!prompts.length) return "_No prompts listed._";
  return [
    "| Name | Description |",
    "|------|-------------|",
    ...prompts.map((p) => `| \`${p.name}\` | ${p.description || "_No description_"} |`),
  ].join("\n");
}

function toMarkdown(s: ServerDetails): string {
  const mode = s.deployment_mode?.[0];
  const cap = mode === "remote" ? s.remotes?.[0] : s.packages?.[0];
  const tools = cap?.tools ?? [];
  const prompts = cap?.prompts ?? [];

  const owners = s.owner?.join(", ") || "_Unknown_";
  const tags = s.tags?.length ? s.tags.map((t) => `\`${t}\``).join(", ") : "_None_";
  const surface = s.surface?.join(", ") || "_Unknown_";
  const category = s.category?.join(", ") || "N/A";
  const repoLink = s.repository?.url
    ? `[${s.repository.url}](${s.repository.url})`
    : "_N/A_";
  const docs = s.documentation?.length
    ? s.documentation.map((u) => `- ${u}`).join("\n")
    : "_No documentation links provided._";
  const updated = s.updated_at
    ? new Date(s.updated_at).toISOString().split("T")[0]
    : "N/A";

  return `# ${s.title || s.name}

> ${s.summary || "_No summary available._"}

**Version:** ${s.version ?? "N/A"} | **Status:** ${s.status ?? "N/A"} | **Category:** ${category} | **Deployment:** ${mode ?? "N/A"}

**Tags:** ${tags}
**Surface:** ${surface}
**Vendor:** ${s.vendor ?? "_Unknown_"}
**Owner:** ${owners}
**Repository:** ${repoLink}
**Updated:** ${updated}

---

## About

${s.description || "_No description provided._"}

---

## MCP Capabilities

### Tools

${toolsTable(tools)}

### Prompts

${promptsTable(prompts)}

---

## Installation Steps

${s.installation || "_No installation steps provided._"}

---

## Accessing the MCP Server

${s.authentication || "_No access instructions provided._"}

---

## Documentation

${docs}

---

## Support

${s.support_contact || "_No support contact provided._"}
`;
}

async function main() {
  const listRes = await fetch(`${API_BASE}/servers?limit=100`, {
    headers: { Accept: "application/json" },
  });
  if (!listRes.ok) throw new Error(`List request failed: ${listRes.status}`);

  const listData = await listRes.json();
  const servers: ServerDetails[] = listData.servers ?? [];

  console.log(`Found ${servers.length} MCP servers`);
  await Deno.mkdir(OUTPUT_DIR, { recursive: true });

  for (const server of servers) {
    const { name } = server;
    console.log(`Fetching: ${name}`);

    const detailRes = await fetch(`${API_BASE}/servers/${name}`, {
      headers: { Accept: "application/json" },
    });
    if (!detailRes.ok) {
      console.warn(`  Skipped ${name}: HTTP ${detailRes.status}`);
      continue;
    }

    const detailData = await detailRes.json();
    const details: ServerDetails = detailData.servers?.[0] ?? detailData;
    const path = `${OUTPUT_DIR}/${name}.md`;
    await Deno.writeTextFile(path, toMarkdown(details));
    console.log(`  Written: ${path}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  Deno.exit(1);
});
