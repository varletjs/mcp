/**
 * Authentication transport wrapper for MCP server.
 */
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

export class AuthTransportWrapper {
  private transport: StdioServerTransport;

  constructor() {
    this.transport = new StdioServerTransport();
  }

  async connect() {
    return this.transport;
  }

  async close() {
    // Cleanup if needed
  }
}
