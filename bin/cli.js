#!/usr/bin/env node

// Import and run the compiled TypeScript entry point
import('../dist/index.js').catch(error => {
  console.error('Failed to start Varlet MCP server:', error)
  process.exit(1)
})
