# Frequently Asked Questions (FAQ)

## 📋 Table of Contents

- [General Questions](#general-questions)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Usage & Features](#usage--features)
- [Troubleshooting](#troubleshooting)
- [Performance](#performance)
- [Development](#development)
- [Contributing](#contributing)
- [Support](#support)

## 🤔 General Questions

### What is Varlet MCP Server?

Varlet MCP Server is a Model Context Protocol (MCP) server that provides AI assistants with deep integration to the Varlet UI component library. It enables AI assistants to:

- Access comprehensive component documentation
- Generate code examples and templates
- Provide migration assistance
- Offer troubleshooting guidance
- Suggest performance optimizations

### What is the Model Context Protocol (MCP)?

MCP is a protocol developed by Anthropic that allows AI assistants to securely access external tools and data sources. It provides a standardized way for AI systems to interact with various services and APIs.

**Learn more**: [MCP Documentation](https://modelcontextprotocol.io/)

### Which AI assistants support MCP?

Currently supported:
- **Claude Desktop** (Primary support)
- **Other MCP-compatible clients** (Generic support)

Upcoming support:
- Additional AI assistants as they adopt MCP

### What versions of Varlet UI are supported?

- **Varlet UI 2.x**: Full support
- **Varlet UI 3.x**: Full support (recommended)
- **Varlet UI 1.x**: Limited support

### Is this an official Varlet project?

No, this is a community-driven project that provides MCP integration for Varlet UI. While we maintain close collaboration with the Varlet team, this is an independent project.

## 🚀 Installation & Setup

### How do I install Varlet MCP Server?

```bash
# Using npm (recommended)
npm install -g @varlet/mcp

# Using pnpm
pnpm add -g @varlet/mcp

# Using yarn
yarn global add @varlet/mcp
```

### What are the system requirements?

**Minimum Requirements:**
- Node.js >= 18.0.0
- 512MB RAM
- 100MB disk space
- Internet connection

**Recommended:**
- Node.js >= 20.0.0 (LTS)
- 1GB+ RAM
- SSD storage
- Stable internet connection

### How do I configure Claude Desktop?

1. **Install the server**:
   ```bash
   npm install -g @varlet/mcp
   ```

2. **Edit Claude Desktop config**:
   ```bash
   # macOS
   nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
   
   # Windows
   notepad %APPDATA%\Claude\claude_desktop_config.json
   
   # Linux
   nano ~/.config/Claude/claude_desktop_config.json
   ```

3. **Add server configuration**:
   ```json
   {
     "mcpServers": {
       "varlet-ui": {
         "command": "varlet-mcp-server",
         "args": [],
         "env": {
           "VARLET_VERSION": "3.0.0"
         }
       }
     }
   }
   ```

4. **Restart Claude Desktop**

### Can I use this without Claude Desktop?

Yes! The server works with any MCP-compatible client. You can also:

- Use it as a standalone CLI tool
- Integrate with custom applications
- Run as an HTTP server (with additional configuration)

## ⚙️ Configuration

### What environment variables are available?

| Variable | Description | Default | Example |
|----------|-------------|---------|----------|
| `VARLET_VERSION` | Varlet UI version | `latest` | `3.0.0` |
| `CACHE_TTL` | Cache time-to-live (ms) | `3600000` | `1800000` |
| `CACHE_DIR` | Cache directory | OS temp | `~/.cache/varlet-mcp` |
| `DEBUG` | Enable debug logging | `false` | `varlet-mcp:*` |
| `API_TIMEOUT` | API timeout (ms) | `10000` | `30000` |
| `GITHUB_TOKEN` | GitHub API token | - | `ghp_xxx` |

### How do I create a configuration file?

```bash
# Create config directory
mkdir -p ~/.config/varlet-mcp

# Create configuration file
cat > ~/.config/varlet-mcp/config.json << EOF
{
  "varlet": {
    "version": "3.0.0"
  },
  "cache": {
    "enabled": true,
    "ttl": 3600000,
    "directory": "~/.cache/varlet-mcp"
  },
  "api": {
    "timeout": 10000,
    "retries": 3
  }
}
EOF
```

### How do I use the configuration file?

```json
// Claude Desktop config
{
  "mcpServers": {
    "varlet-ui": {
      "command": "varlet-mcp-server",
      "args": ["--config", "~/.config/varlet-mcp/config.json"]
    }
  }
}
```

### Can I disable caching?

```bash
# Environment variable
export CACHE_TTL=0

# Or in config file
{
  "cache": {
    "enabled": false
  }
}
```

## 🛠️ Usage & Features

### What tools are available?

**Component Tools:**
- `get_component_info` - Get detailed component information
- `list_components` - List all available components
- `get_component_props` - Get component properties
- `get_component_events` - Get component events
- `get_component_slots` - Get component slots

**Documentation Tools:**
- `search_documentation` - Search documentation
- `get_guide` - Get specific guides
- `get_changelog` - Get version changelog

**Example Tools:**
- `get_component_examples` - Get usage examples
- `generate_component_template` - Generate templates
- `get_playground_link` - Get playground links

**Migration Tools:**
- `get_migration_guide` - Get migration guides
- `check_compatibility` - Check version compatibility

### How do I get component information?

Ask Claude:
```
"Show me information about the var-button component"
"What props does var-input accept?"
"How do I use var-dialog?"
```

### How do I generate code examples?

Ask Claude:
```
"Generate a form using Varlet UI components"
"Show me how to create a data table with var-table"
"Create a mobile-friendly layout with Varlet components"
```

### Can I get migration help?

Yes! Ask Claude:
```
"Help me migrate from Varlet UI 2.x to 3.x"
"What breaking changes are in Varlet UI 3.0?"
"Show me the migration guide for var-button"
```

### How do I search documentation?

Ask Claude:
```
"Search for information about theming in Varlet UI"
"Find documentation about form validation"
"Look up internationalization guides"
```

## 🔧 Troubleshooting

### The server won't start. What should I check?

1. **Check Node.js version**:
   ```bash
   node --version  # Should be >= 18.0.0
   ```

2. **Check installation**:
   ```bash
   varlet-mcp-server --version
   ```

3. **Check permissions**:
   ```bash
   # macOS/Linux
   ls -la $(which varlet-mcp-server)
   
   # Windows
   where varlet-mcp-server
   ```

4. **Check configuration**:
   ```bash
   varlet-mcp-server --validate-config
   ```

### Claude Desktop doesn't recognize the server

1. **Check configuration syntax**:
   ```bash
   # Validate JSON
   cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | jq .
   ```

2. **Check server path**:
   ```bash
   which varlet-mcp-server
   ```

3. **Check logs**:
   ```bash
   # Enable debug mode
   export DEBUG=varlet-mcp:*
   ```

4. **Restart Claude Desktop** completely

### I'm getting "Component not found" errors

1. **Check component name**:
   ```bash
   # List all components
   varlet-mcp-server --list-components
   ```

2. **Check Varlet version**:
   ```bash
   # Check configured version
   echo $VARLET_VERSION
   ```

3. **Clear cache**:
   ```bash
   varlet-mcp-server --clear-cache
   ```

### The server is slow or timing out

1. **Check network connection**:
   ```bash
   ping github.com
   ```

2. **Increase timeout**:
   ```bash
   export API_TIMEOUT=30000
   ```

3. **Check cache**:
   ```bash
   # Check cache size
   du -sh ~/.cache/varlet-mcp
   
   # Clear if too large
   rm -rf ~/.cache/varlet-mcp
   ```

4. **Use GitHub token** for better rate limits:
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```

### How do I enable debug logging?

```bash
# Enable all debug logs
export DEBUG=varlet-mcp:*

# Enable specific modules
export DEBUG=varlet-mcp:cache,varlet-mcp:api

# In Claude Desktop config
{
  "mcpServers": {
    "varlet-ui": {
      "command": "varlet-mcp-server",
      "env": {
        "DEBUG": "varlet-mcp:*"
      }
    }
  }
}
```

## ⚡ Performance

### How can I improve performance?

1. **Enable caching** (default):
   ```bash
   export CACHE_TTL=3600000  # 1 hour
   ```

2. **Use SSD storage** for cache

3. **Increase memory** if processing large components

4. **Use GitHub token** to avoid rate limits:
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```

5. **Optimize cache location**:
   ```bash
   export CACHE_DIR=/fast/ssd/path/varlet-mcp
   ```

### How much disk space does caching use?

- **Typical usage**: 10-50MB
- **Heavy usage**: 100-200MB
- **Maximum**: ~500MB (with auto-cleanup)

### How much memory does the server use?

- **Idle**: ~50MB
- **Active**: ~100-200MB
- **Peak**: ~300MB (large components)

### Can I run multiple instances?

Yes, but consider:
- Each instance uses separate cache
- Memory usage multiplies
- API rate limits are shared

## 👨‍💻 Development

### How do I contribute to the project?

See our [Contributing Guide](contributing.md) for detailed instructions.

### How do I set up a development environment?

```bash
# Clone repository
git clone https://github.com/varletjs/varlet-mcp.git
cd varlet-mcp

# Install dependencies
pnpm install

# Start development
pnpm run dev

# Run tests
pnpm run test
```

### How do I add a new tool?

1. **Create tool file**:
   ```typescript
   // src/tools/my-tool.ts
   export const myTool = {
     name: 'my_tool',
     description: 'My custom tool',
     inputSchema: { /* schema */ },
     handler: async (args) => {
       // Implementation
     }
   };
   ```

2. **Register tool**:
   ```typescript
   // src/tools/index.ts
   export { myTool } from './my-tool';
   ```

3. **Add tests**:
   ```typescript
   // src/tools/__tests__/my-tool.test.ts
   ```

### How do I add a new resource?

```typescript
// src/resources/my-resource.ts
export const myResource = {
  uri: 'varlet://my-resource',
  name: 'My Resource',
  description: 'My custom resource',
  mimeType: 'application/json',
  handler: async () => {
    // Implementation
  }
};
```

### How do I test my changes?

```bash
# Unit tests
pnpm run test

# Integration tests
pnpm run test:integration

# E2E tests
pnpm run test:e2e

# Test specific file
pnpm run test src/tools/my-tool.test.ts

# Test with coverage
pnpm run test:coverage
```

## 🤝 Contributing

### How can I report a bug?

1. **Check existing issues**: [GitHub Issues](https://github.com/varletjs/varlet-mcp/issues)
2. **Use bug report template**: Provides structured format
3. **Include details**:
   - Version information
   - Steps to reproduce
   - Expected vs actual behavior
   - Error logs
   - Environment details

### How can I request a feature?

1. **Check existing requests**: [GitHub Issues](https://github.com/varletjs/varlet-mcp/issues)
2. **Use feature request template**: Structured format
3. **Provide context**:
   - Use case description
   - Proposed solution
   - Alternative solutions
   - Additional context

### How can I contribute code?

1. **Read contributing guide**: [Contributing Guide](contributing.md)
2. **Start with good first issues**: Look for `good first issue` label
3. **Follow workflow**:
   - Fork repository
   - Create feature branch
   - Make changes
   - Add tests
   - Submit pull request

### How can I help with documentation?

- **Fix typos**: Simple but valuable
- **Improve examples**: Add better usage examples
- **Add translations**: Help with internationalization
- **Write guides**: Share your expertise

## 🆘 Support

### Where can I get help?

1. **Documentation**: Check our comprehensive docs
2. **FAQ**: This document (you're reading it!)
3. **GitHub Issues**: For bugs and feature requests
4. **GitHub Discussions**: For questions and community support
5. **Email**: [varlet.mcp@gmail.com](mailto:varlet.mcp@gmail.com)

### How do I report a security issue?

See our [Security Policy](../SECURITY.md) for responsible disclosure process.

### Is there a community chat?

We're planning to set up:
- Discord server (coming soon)
- Matrix room (under consideration)

For now, use [GitHub Discussions](https://github.com/varletjs/varlet-mcp/discussions).

### How can I stay updated?

- **Watch the repository**: Get notifications for releases
- **Follow releases**: [GitHub Releases](https://github.com/varletjs/varlet-mcp/releases)
- **Check changelog**: [CHANGELOG.md](../CHANGELOG.md)
- **Join discussions**: [GitHub Discussions](https://github.com/varletjs/varlet-mcp/discussions)

## 🔍 Advanced Topics

### Can I extend the server with plugins?

Currently, the server doesn't have a plugin system, but it's planned for v1.2.0. For now, you can:

- Fork the repository
- Add custom tools/resources
- Submit pull requests for useful additions

### Can I use this in production?

Yes! The server is production-ready with:
- Comprehensive error handling
- Performance optimization
- Security best practices
- Monitoring capabilities

See our [Deployment Guide](deployment.md) for production setup.

### How do I monitor the server?

```bash
# Health check
varlet-mcp-server --health-check

# Status endpoint (if running as HTTP server)
curl http://localhost:3000/status

# Metrics (if enabled)
curl http://localhost:3000/metrics
```

### Can I run this in Docker?

Yes! See our [Deployment Guide](deployment.md) for Docker setup.

### How do I backup my configuration?

```bash
# Backup config
cp ~/.config/varlet-mcp/config.json ~/backup/

# Backup cache (optional)
tar -czf ~/backup/varlet-mcp-cache.tar.gz ~/.cache/varlet-mcp/
```

---

## 📝 Still Have Questions?

If your question isn't answered here:

1. **Search existing issues**: [GitHub Issues](https://github.com/varletjs/varlet-mcp/issues)
2. **Check discussions**: [GitHub Discussions](https://github.com/varletjs/varlet-mcp/discussions)
3. **Create new issue**: Use appropriate template
4. **Email us**: [varlet.mcp@gmail.com](mailto:varlet.mcp@gmail.com)

**We're here to help!** 🚀