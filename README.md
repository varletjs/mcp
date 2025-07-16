# Varlet MCP Server
# Varlet MCP Server

<div align="center">
  <img src="https://varlet.gitee.io/varlet-ui/varlet_icon.png" width="150" height="150" alt="Varlet Logo">
  <h3>Model Context Protocol Server for Varlet UI</h3>
  <p>Providing AI assistants with comprehensive access to Varlet UI documentation, component APIs, and development resources.</p>
  
  [![npm version](https://badge.fury.io/js/@varlet%2Fmcp.svg)](https://badge.fury.io/js/@varlet%2Fmcp)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

## 🌟 Features

- 🔍 **Component API Access**: Get detailed information about Varlet UI components, props, events, and slots
- 📚 **Documentation Tools**: Access installation guides, feature documentation, and best practices
- 🎯 **Smart Prompts**: Pre-built prompts for component usage, layout design, and troubleshooting
- 🚀 **Performance Optimization**: Built-in caching and efficient data retrieval
- 🌐 **Multi-language Support**: Support for internationalization features
- 🔄 **Version Management**: Support for multiple Varlet UI versions
- 📱 **Mobile-First**: Optimized for mobile development workflows
- 🛠️ **Developer Experience**: Rich tooling and debugging capabilities

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Claude Desktop or other MCP-compatible client

### From npm (Recommended)

```bash
npm install -g @varlet/mcp
```

### From Source

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

### With Claude Desktop

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

### With Other MCP Clients

Start the server directly:

```bash
varlet-mcp-server
```

Or use npx:

```bash
npx @varlet/mcp
```

### Example Usage in Claude

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
| `get_varlet_api_by_version` | Download and cache Varlet API types | `version` (string) |
| `get_component_api_by_version` | Get detailed component API information | `componentName`, `version` |
| `get_directive_api_by_version` | Get directive API information | `directiveName`, `version` |
| `get_varlet_components_list` | Get list of all available components | `version` |

### Documentation Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_installation_guide` | Get installation instructions | `platform`, `ssr`, `fresh` |
| `get_feature_guides` | Get list of available features | - |
| `get_feature_guide` | Get detailed feature guide | `feature` |
| `get_varlet_exports` | Get package exports list | - |
| `get_frequently_asked_questions` | Get FAQ content | - |
| `get_release_notes_by_version` | Get version release notes | `version` |
| `get_varlet_playground_examples` | Get playground examples | `component` |

### Smart Prompts

| Prompt | Description | Use Case |
|--------|-------------|----------|
| `varlet_component_usage` | Generate component usage examples | Learning component APIs |
| `varlet_layout_design` | Generate layout design suggestions | Building app layouts |
| `varlet_migration_guide` | Generate migration guides | Switching from other UI libs |
| `varlet_troubleshooting` | Generate troubleshooting guides | Debugging issues |
| `varlet_performance_optimization` | Generate optimization guides | Improving app performance |

## 📚 Resources

The server provides several structured resources:

| Resource URI | Content Type | Description |
|--------------|--------------|-------------|
| `varlet://api/components` | `application/json` | Complete list of Varlet components by category |
| `varlet://api/directives` | `application/json` | Available directives with usage examples |
| `varlet://api/utilities` | `application/json` | Utilities, services, and helper functions |
| `varlet://examples/quick-start` | `text/markdown` | Quick start guide with code examples |

### Resource Examples

```javascript
// Access component list
const components = await mcp.readResource('varlet://api/components')

// Get quick start guide
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

### Project Structure

```
src/
├── cli/           # CLI interface
├── tools/         # MCP tools implementation
├── resources/     # MCP resources
├── prompts/       # Smart prompts
├── services/      # Core services
├── utils/         # Utility functions
└── transports/    # Transport layer
```

### Architecture

The server follows a modular architecture:

- **Tools**: Provide specific functionality (API queries, documentation)
- **Resources**: Expose structured data (component lists, examples)
- **Prompts**: Generate contextual prompts for AI assistants
- **Services**: Handle business logic (documentation, caching)
- **Utils**: Shared utilities (API calls, caching)

### Adding New Tools

1. Create tool in `src/tools/`
2. Register in `src/tools/index.ts`
3. Add tests
4. Update documentation

## ⚙️ Configuration

The server supports various configuration options through environment variables:

| Variable | Description | Default | Example |
|----------|-------------|---------|----------|
| `VARLET_VERSION` | Default Varlet UI version | `latest` | `3.0.0` |
| `VARLET_API_BASE_URL` | Base URL for Varlet API | `https://unpkg.com/@varlet/ui` | Custom CDN URL |
| `CACHE_TTL` | Cache time-to-live (ms) | `3600000` (1 hour) | `7200000` |
| `CACHE_DIR` | Cache directory path | `~/.varlet-mcp` | `/tmp/varlet-cache` |
| `DEBUG` | Enable debug logging | `false` | `true` |
| `GITHUB_TOKEN` | GitHub API token (optional) | - | `ghp_xxx` |

### Configuration File

You can also use a configuration file `.varletmcprc.json`:

```json
{
  "version": "latest",
  "cacheDir": "~/.varlet-mcp",
  "cacheTTL": 3600000,
  "debug": false,
  "apiBaseUrl": "https://unpkg.com/@varlet/ui"
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines

1. **Code Quality**
   - Follow TypeScript best practices
   - Use ESLint and Prettier configurations
   - Maintain 80%+ test coverage

2. **Documentation**
   - Update README for new features
   - Add JSDoc comments for public APIs
   - Include usage examples

3. **Testing**
   - Write unit tests for new features
   - Test with multiple Varlet UI versions
   - Verify MCP protocol compliance

4. **Pull Requests**
   - Use conventional commit messages
   - Include detailed description
   - Link related issues

### Reporting Issues

When reporting issues, please include:

- Varlet MCP version
- Varlet UI version
- MCP client (Claude Desktop, etc.)
- Operating system
- Detailed error messages
- Steps to reproduce

## License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

### Varlet Ecosystem

- [Varlet UI](https://github.com/varletjs/varlet) - The main Varlet UI library
- [Varlet CLI](https://github.com/varletjs/varlet-cli) - Development toolchain
- [Varlet Icons](https://github.com/varletjs/varlet-icons) - Icon library
- [Varlet VSCode Extension](https://marketplace.visualstudio.com/items?itemName=varletjs.varlet-vscode) - IDE support

### MCP Ecosystem

- [Model Context Protocol](https://github.com/modelcontextprotocol) - The MCP specification
- [MCP SDK](https://github.com/modelcontextprotocol/sdk) - TypeScript/Python SDKs
- [Claude Desktop](https://claude.ai/desktop) - AI assistant with MCP support

### Similar Projects

- [Vue MCP Server](https://github.com/vue/mcp-server) - MCP server for Vue.js
- [Element Plus MCP](https://github.com/element-plus/mcp) - MCP server for Element Plus

## 🏆 Acknowledgments

- [Varlet Team](https://github.com/varletjs) for creating the amazing UI library
- [Anthropic](https://anthropic.com) for developing the MCP protocol
- All contributors and community members

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/varletjs/varlet-mcp?style=social)
![GitHub forks](https://img.shields.io/github/forks/varletjs/varlet-mcp?style=social)
![GitHub issues](https://img.shields.io/github/issues/varletjs/varlet-mcp)
![GitHub pull requests](https://img.shields.io/github/issues-pr/varletjs/varlet-mcp)
![npm downloads](https://img.shields.io/npm/dm/@varlet/mcp)

## ❓ FAQ

### General Questions

**Q: What is MCP (Model Context Protocol)?**  
A: MCP is a protocol that allows AI assistants to access external data sources and tools. It enables Claude and other AI assistants to interact with your development environment.

**Q: Do I need to restart Claude Desktop after configuration?**  
A: Yes, you need to restart Claude Desktop after modifying the configuration file.

**Q: Can I use this with other AI assistants?**  
A: Yes, any MCP-compatible client can use this server. Currently, Claude Desktop has the best support.

### Technical Questions

**Q: How do I update to a new Varlet UI version?**  
A: Set the `VARLET_VERSION` environment variable or use the `get_varlet_api_by_version` tool with the desired version.

**Q: Where is the cache stored?**  
A: By default, cache is stored in `~/.varlet-mcp`. You can change this with the `CACHE_DIR` environment variable.

**Q: How do I clear the cache?**  
A: Delete the cache directory or restart the server with `DEBUG=true` to see cache operations.

**Q: Can I use this offline?**  
A: Partially. Cached data works offline, but fetching new API data requires internet connection.

### Troubleshooting

**Q: Server fails to start**  
- Check Node.js version (18+ required)
- Verify installation: `varlet-mcp-server --version`
- Check for port conflicts

**Q: Claude doesn't see the tools**  
- Verify configuration file syntax
- Restart Claude Desktop
- Check server logs with `DEBUG=true`

**Q: API data seems outdated**  
- Clear cache directory
- Check `CACHE_TTL` setting
- Verify internet connection

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [FAQ section](#faq) above
2. Search existing [GitHub Issues](https://github.com/varletjs/varlet-mcp/issues)
3. Join our [Discord Community](https://discord.gg/varletjs)
4. Create a new issue with detailed information

### Getting Help

When seeking help, please provide:

- Varlet MCP Server version
- Varlet UI version being used
- MCP client and version
- Operating system
- Configuration file (remove sensitive data)
- Error messages and logs
- Steps to reproduce the issue

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by the <a href="https://github.com/varletjs">Varlet Team</a></p>
  <p>If this project helped you, please consider giving it a ⭐️</p>
</div>
<div align="center">
  <img src="https://varlet.gitee.io/varlet-ui/varlet_icon.png" width="150" height="150" alt="Varlet Logo">
  <h3>Model Context Protocol Server for Varlet UI</h3>
  <p>Providing AI assistants with comprehensive access to Varlet UI documentation, component APIs, and development resources.</p>
  
  [![npm version](https://badge.fury.io/js/@varlet%2Fmcp.svg)](https://badge.fury.io/js/@varlet%2Fmcp)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

## 🌟 Features

- 🔍 **Component API Access**: Get detailed information about Varlet UI components, props, events, and slots
- 📚 **Documentation Tools**: Access installation guides, feature documentation, and best practices
- 🎯 **Smart Prompts**: Pre-built prompts for component usage, layout design, and troubleshooting
- 🚀 **Performance Optimization**: Built-in caching and efficient data retrieval
- 🌐 **Multi-language Support**: Support for internationalization features
- 🔄 **Version Management**: Support for multiple Varlet UI versions
- 📱 **Mobile-First**: Optimized for mobile development workflows
- 🛠️ **Developer Experience**: Rich tooling and debugging capabilities

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Claude Desktop or other MCP-compatible client

### From npm (Recommended)

```bash
npm install -g @varlet/mcp
```

### From Source

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

### With Claude Desktop

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

### With Other MCP Clients

Start the server directly:

```bash
varlet-mcp-server
```

Or use npx:

```bash
npx @varlet/mcp
```

### Example Usage in Claude

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
| `get_varlet_api_by_version` | Download and cache Varlet API types | `version` (string) |
| `get_component_api_by_version` | Get detailed component API information | `componentName`, `version` |
| `get_directive_api_by_version` | Get directive API information | `directiveName`, `version` |
| `get_varlet_components_list` | Get list of all available components | `version` |

### Documentation Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_installation_guide` | Get installation instructions | `platform`, `ssr`, `fresh` |
| `get_feature_guides` | Get list of available features | - |
| `get_feature_guide` | Get detailed feature guide | `feature` |
| `get_varlet_exports` | Get package exports list | - |
| `get_frequently_asked_questions` | Get FAQ content | - |
| `get_release_notes_by_version` | Get version release notes | `version` |
| `get_varlet_playground_examples` | Get playground examples | `component` |

### Smart Prompts

| Prompt | Description | Use Case |
|--------|-------------|----------|
| `varlet_component_usage` | Generate component usage examples | Learning component APIs |
| `varlet_layout_design` | Generate layout design suggestions | Building app layouts |
| `varlet_migration_guide` | Generate migration guides | Switching from other UI libs |
| `varlet_troubleshooting` | Generate troubleshooting guides | Debugging issues |
| `varlet_performance_optimization` | Generate optimization guides | Improving app performance |

## 📚 Resources

The server provides several structured resources:

| Resource URI | Content Type | Description |
|--------------|--------------|-------------|
| `varlet://api/components` | `application/json` | Complete list of Varlet components by category |
| `varlet://api/directives` | `application/json` | Available directives with usage examples |
| `varlet://api/utilities` | `application/json` | Utilities, services, and helper functions |
| `varlet://examples/quick-start` | `text/markdown` | Quick start guide with code examples |

### Resource Examples

```javascript
// Access component list
const components = await mcp.readResource('varlet://api/components')

// Get quick start guide
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

### Project Structure

```
src/
├── cli/           # CLI interface
├── tools/         # MCP tools implementation
├── resources/     # MCP resources
├── prompts/       # Smart prompts
├── services/      # Core services
├── utils/         # Utility functions
└── transports/    # Transport layer
```

### Architecture

The server follows a modular architecture:

- **Tools**: Provide specific functionality (API queries, documentation)
- **Resources**: Expose structured data (component lists, examples)
- **Prompts**: Generate contextual prompts for AI assistants
- **Services**: Handle business logic (documentation, caching)
- **Utils**: Shared utilities (API calls, caching)

### Adding New Tools

1. Create tool in `src/tools/`
2. Register in `src/tools/index.ts`
3. Add tests
4. Update documentation

## ⚙️ Configuration

The server supports various configuration options through environment variables:

| Variable | Description | Default | Example |
|----------|-------------|---------|----------|
| `VARLET_VERSION` | Default Varlet UI version | `latest` | `3.0.0` |
| `VARLET_API_BASE_URL` | Base URL for Varlet API | `https://unpkg.com/@varlet/ui` | Custom CDN URL |
| `CACHE_TTL` | Cache time-to-live (ms) | `3600000` (1 hour) | `7200000` |
| `CACHE_DIR` | Cache directory path | `~/.varlet-mcp` | `/tmp/varlet-cache` |
| `DEBUG` | Enable debug logging | `false` | `true` |
| `GITHUB_TOKEN` | GitHub API token (optional) | - | `ghp_xxx` |

### Configuration File

You can also use a configuration file `.varletmcprc.json`:

```json
{
  "version": "latest",
  "cacheDir": "~/.varlet-mcp",
  "cacheTTL": 3600000,
  "debug": false,
  "apiBaseUrl": "https://unpkg.com/@varlet/ui"
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines

1. **Code Quality**
   - Follow TypeScript best practices
   - Use ESLint and Prettier configurations
   - Maintain 80%+ test coverage

2. **Documentation**
   - Update README for new features
   - Add JSDoc comments for public APIs
   - Include usage examples

3. **Testing**
   - Write unit tests for new features
   - Test with multiple Varlet UI versions
   - Verify MCP protocol compliance

4. **Pull Requests**
   - Use conventional commit messages
   - Include detailed description
   - Link related issues

### Reporting Issues

When reporting issues, please include:

- Varlet MCP version
- Varlet UI version
- MCP client (Claude Desktop, etc.)
- Operating system
- Detailed error messages
- Steps to reproduce

## License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

### Varlet Ecosystem

- [Varlet UI](https://github.com/varletjs/varlet) - The main Varlet UI library
- [Varlet CLI](https://github.com/varletjs/varlet-cli) - Development toolchain
- [Varlet Icons](https://github.com/varletjs/varlet-icons) - Icon library
- [Varlet VSCode Extension](https://marketplace.visualstudio.com/items?itemName=varletjs.varlet-vscode) - IDE support

### MCP Ecosystem

- [Model Context Protocol](https://github.com/modelcontextprotocol) - The MCP specification
- [MCP SDK](https://github.com/modelcontextprotocol/sdk) - TypeScript/Python SDKs
- [Claude Desktop](https://claude.ai/desktop) - AI assistant with MCP support

### Similar Projects

- [Vue MCP Server](https://github.com/vue/mcp-server) - MCP server for Vue.js
- [Element Plus MCP](https://github.com/element-plus/mcp) - MCP server for Element Plus

## 🏆 Acknowledgments

- [Varlet Team](https://github.com/varletjs) for creating the amazing UI library
- [Anthropic](https://anthropic.com) for developing the MCP protocol
- All contributors and community members

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/varletjs/varlet-mcp?style=social)
![GitHub forks](https://img.shields.io/github/forks/varletjs/varlet-mcp?style=social)
![GitHub issues](https://img.shields.io/github/issues/varletjs/varlet-mcp)
![GitHub pull requests](https://img.shields.io/github/issues-pr/varletjs/varlet-mcp)
![npm downloads](https://img.shields.io/npm/dm/@varlet/mcp)

## ❓ FAQ

### General Questions

**Q: What is MCP (Model Context Protocol)?**  
A: MCP is a protocol that allows AI assistants to access external data sources and tools. It enables Claude and other AI assistants to interact with your development environment.

**Q: Do I need to restart Claude Desktop after configuration?**  
A: Yes, you need to restart Claude Desktop after modifying the configuration file.

**Q: Can I use this with other AI assistants?**  
A: Yes, any MCP-compatible client can use this server. Currently, Claude Desktop has the best support.

### Technical Questions

**Q: How do I update to a new Varlet UI version?**  
A: Set the `VARLET_VERSION` environment variable or use the `get_varlet_api_by_version` tool with the desired version.

**Q: Where is the cache stored?**  
A: By default, cache is stored in `~/.varlet-mcp`. You can change this with the `CACHE_DIR` environment variable.

**Q: How do I clear the cache?**  
A: Delete the cache directory or restart the server with `DEBUG=true` to see cache operations.

**Q: Can I use this offline?**  
A: Partially. Cached data works offline, but fetching new API data requires internet connection.

### Troubleshooting

**Q: Server fails to start**  
- Check Node.js version (18+ required)
- Verify installation: `varlet-mcp-server --version`
- Check for port conflicts

**Q: Claude doesn't see the tools**  
- Verify configuration file syntax
- Restart Claude Desktop
- Check server logs with `DEBUG=true`

**Q: API data seems outdated**  
- Clear cache directory
- Check `CACHE_TTL` setting
- Verify internet connection

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [FAQ section](#faq) above
2. Search existing [GitHub Issues](https://github.com/varletjs/varlet-mcp/issues)
3. Join our [Discord Community](https://discord.gg/varletjs)
4. Create a new issue with detailed information

### Getting Help

When seeking help, please provide:

- Varlet MCP Server version
- Varlet UI version being used
- MCP client and version
- Operating system
- Configuration file (remove sensitive data)
- Error messages and logs
- Steps to reproduce the issue

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by the <a href="https://github.com/varletjs">Varlet Team</a></p>
  <p>If this project helped you, please consider giving it a ⭐️</p>
</div>
