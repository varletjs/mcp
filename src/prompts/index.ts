/**
 * Registers prompts with the MCP server.
 */
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

import { registerDocumentationPrompts } from '#prompts/documentation'

export async function registerPrompts (server: McpServer) {
  await registerDocumentationPrompts(server)
}
