/**
 * Registers resources with the MCP server.
 */
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { registerApiResources } from '#resources/api';

export async function registerResources(server: McpServer) {
  await registerApiResources(server);
}
