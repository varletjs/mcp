# Varlet MCP Server

<div align="center">
  <img src="https://varlet.gitee.io/varlet-ui/varlet_icon.png" width="150" height="150" alt="Varlet Logo">
  <h3>A Model Context Protocol Server for Varlet UI</h3>
  <p>Provides AI assistants with comprehensive access to Varlet UI documentation, component APIs, and development resources.</p>
  
  [![npm version](https://badge.fury.io/js/@varlet%2Fmcp.svg)](https://badge.fury.io/js/@varlet%2Fmcp)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

## 📖 Guides

- **🚀 [Quick Start](./QUICK_START.md)** - Get up and running in 5 minutes
- **📚 [User Guide](./USER_GUIDE.md)** - A comprehensive guide to usage
- **🔧 [Troubleshooting](./USER_GUIDE.md#troubleshooting)** - Solutions to common problems

## 🌟 Features

- 🔍 **Component API Access**: Get detailed information about Varlet UI components, props, events, and slots.
- 📚 **Documentation Tools**: Access installation guides, feature documentation, and best practices.
- 🎯 **Smart Prompts**: Pre-built prompts for component usage, layout design, and troubleshooting.
- 🚀 **Performance Optimized**: Built-in caching and efficient data retrieval.
- 🌐 **Multi-language Support**: Support for internationalization.
- 🔄 **Version Management**: Support for multiple Varlet UI versions.
- 📱 **Mobile First**: Optimized for mobile development workflows.
- 🛠️ **Developer Experience**: Rich tools and debugging features.

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or pnpm
- Claude Desktop or other MCP-compatible client

### Install from npm (Recommended)

```bash
npm install -g @varlet/mcp
```

### Install from Source

```bash
git clone https://github.com/varletjs/varlet-mcp.git
cd varlet-mcp
pnpm install
pnpm run build
npm link
```

### Verify Installation

```bash
varlet-mcp-server --version
```

## 🚀 Usage

### Integration with Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`  
**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "varlet-ui": {
      "command": "varlet-mcp-server",
      "args": [],
      "env": {
        "VARLET_VERSION": "latest",
        "CACHE_TTL": "3600000"
      }
    }
  }
}
```

### Integration with Other MCP Clients

Start the server directly:

```bash
varlet-mcp-server
```

Or use npx:

```bash
npx @varlet/mcp
```

### Usage Examples in Claude

Once configured, you can ask Claude questions like:

- "How do I use the Varlet Button component?"
- "Show me the installation guide for Vite"
- "What are the props for var-input?"
- "Generate a mobile layout using Varlet components"
- "Help me migrate from Element Plus to Varlet"

## 🛠️ Available Tools

### API Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_varlet_api_by_version` | Downloads and caches Varlet API types | `version` (string) |
| `get_component_api_by_version` | Gets detailed component API information | `componentName`, `version` |
| `get_directive_api_by_version` | Gets directive API information | `directiveName`, `version` |
| `get_varlet_components_list` | Gets a list of all available components | `version` |

### Documentation Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_installation_guide` | Gets installation instructions | `platform`, `ssr`, `fresh` |
| `get_feature_guides` | Gets a list of available features | - |
| `get_feature_guide` | Gets a detailed feature guide | `feature` |
| `get_varlet_exports` | Gets a list of package exports | - |
| `get_frequently_asked_questions` | Gets the content of frequently asked questions | - |
| `get_release_notes_by_version` | Gets release notes for a version | `version` |
| `get_varlet_playground_examples` | Gets playground examples | `component` |

### Smart Prompts

| Prompt | Description | Use Case |
|--------|-------------|----------|
| `varlet_component_usage` | Generates component usage examples | Learning component APIs |
| `varlet_layout_design` | Generates layout design suggestions | Building application layouts |
| `varlet_migration_guide` | Generates migration guides | Switching from other UI libraries |
| `varlet_troubleshooting` | Generates troubleshooting guides | Debugging issues |
| `varlet_performance_optimization` | Generates optimization guides | Improving application performance |

## 📚 Resources

The server provides several structured resources:

| Resource URI | Content Type | Description |
|--------------|--------------|-------------|
| `varlet://api/components` | `application/json` | A complete list of Varlet components, categorized |
| `varlet://api/directives` | `application/json` | Available directives with usage examples |
| `varlet://api/utilities` | `application/json` | Utility functions, services, and helpers |
| `varlet://examples/quick-start` | `text/markdown` | A quick start guide with code examples |

### Resource Example

```javascript
// Access the component list
const components = await mcp.readResource('varlet://api/components')

// Get the quick start guide
const guide = await mcp.readResource('varlet://examples/quick-start')
```

## 🔧 Development

### Setup

```bash
git clone https://github.com/varletjs/varlet-mcp.git
cd varlet-mcp
pnpm install
```

### Development Mode

```bash
pnpm run dev
```

### Build

```bash
pnpm run build
```

### Testing

```bash
pnpm test
```

### Linting

```bash
pnpm run lint
pnpm run lint:fix
```
