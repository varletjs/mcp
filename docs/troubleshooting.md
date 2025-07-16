# Troubleshooting Guide

## 🚨 Common Issues

### Installation Issues

#### Issue: `npm install -g @varlet/mcp` fails

**Symptoms:**
- Permission denied errors
- Network timeout errors
- Package not found errors

**Solutions:**

1. **Permission Issues (macOS/Linux):**
   ```bash
   # Use sudo (not recommended)
   sudo npm install -g @varlet/mcp
   
   # Better: Configure npm to use a different directory
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc
   npm install -g @varlet/mcp
   ```

2. **Network Issues:**
   ```bash
   # Use different registry
   npm install -g @varlet/mcp --registry https://registry.npmmirror.com
   
   # Or use pnpm
   pnpm add -g @varlet/mcp
   ```

3. **Package Not Found:**
   ```bash
   # Check if package exists
   npm view @varlet/mcp
   
   # Try installing from GitHub
   npm install -g https://github.com/varletjs/varlet-mcp.git
   ```

#### Issue: `varlet-mcp-server: command not found`

**Symptoms:**
- Command not found after installation
- PATH issues

**Solutions:**

1. **Check Installation:**
   ```bash
   # Check if package is installed
   npm list -g @varlet/mcp
   
   # Check global bin directory
   npm config get prefix
   ls -la $(npm config get prefix)/bin
   ```

2. **Fix PATH:**
   ```bash
   # Add npm global bin to PATH
   echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Alternative Installation:**
   ```bash
   # Use npx to run without global install
   npx @varlet/mcp
   ```

### Configuration Issues

#### Issue: Claude Desktop doesn't recognize the server

**Symptoms:**
- Server not listed in Claude Desktop
- Connection errors
- "Server failed to start" messages

**Solutions:**

1. **Check Configuration File Location:**
   ```bash
   # macOS
   ~/Library/Application Support/Claude/claude_desktop_config.json
   
   # Windows
   %APPDATA%/Claude/claude_desktop_config.json
   
   # Linux
   ~/.config/Claude/claude_desktop_config.json
   ```

2. **Verify Configuration Format:**
   ```json
   {
     "mcpServers": {
       "varlet-ui": {
         "command": "varlet-mcp-server",
         "args": []
       }
     }
   }
   ```

3. **Test Server Manually:**
   ```bash
   # Test if server starts
   varlet-mcp-server
   
   # Check for errors
   DEBUG=varlet-mcp:* varlet-mcp-server
   ```

4. **Common Configuration Mistakes:**
   ```json
   // ❌ Wrong - missing mcpServers wrapper
   {
     "varlet-ui": {
       "command": "varlet-mcp-server"
     }
   }
   
   // ❌ Wrong - incorrect command path
   {
     "mcpServers": {
       "varlet-ui": {
         "command": "/usr/local/bin/varlet-mcp-server",
         "args": []
       }
     }
   }
   
   // ✅ Correct
   {
     "mcpServers": {
       "varlet-ui": {
         "command": "varlet-mcp-server",
         "args": []
       }
     }
   }
   ```

#### Issue: Environment variables not working

**Symptoms:**
- Default values used instead of custom settings
- Cache not working as expected
- API rate limits hit quickly

**Solutions:**

1. **Set Environment Variables Properly:**
   ```bash
   # In shell profile (.bashrc, .zshrc, etc.)
   export VARLET_VERSION="3.0.0"
   export CACHE_TTL="7200000"
   export DEBUG="true"
   export GITHUB_TOKEN="your_token_here"
   ```

2. **For Claude Desktop (macOS):**
   ```json
   {
     "mcpServers": {
       "varlet-ui": {
         "command": "varlet-mcp-server",
         "args": [],
         "env": {
           "VARLET_VERSION": "3.0.0",
           "CACHE_TTL": "7200000",
           "DEBUG": "true"
         }
       }
     }
   }
   ```

3. **Verify Environment Variables:**
   ```bash
   # Check if variables are set
   echo $VARLET_VERSION
   echo $CACHE_TTL
   
   # Test with debug output
   DEBUG=varlet-mcp:* varlet-mcp-server
   ```

### Runtime Issues

#### Issue: "Component not found" errors

**Symptoms:**
- Valid component names return "not found"
- Inconsistent component availability

**Solutions:**

1. **Check Component Name Casing:**
   ```bash
   # ❌ Wrong casing
   get_component_info("button")
   
   # ✅ Correct casing
   get_component_info("Button")
   ```

2. **Verify Varlet Version:**
   ```bash
   # Check available components for version
   list_components({"version": "3.0.0"})
   ```

3. **Clear Cache:**
   ```bash
   # Clear cache directory
   rm -rf ~/.cache/varlet-mcp
   
   # Or set different cache directory
   export CACHE_DIR="/tmp/varlet-mcp-cache"
   ```

#### Issue: API rate limits exceeded

**Symptoms:**
- "Rate limit exceeded" errors
- Slow response times
- Temporary service unavailable

**Solutions:**

1. **Add GitHub Token:**
   ```bash
   # Get token from https://github.com/settings/tokens
   export GITHUB_TOKEN="ghp_your_token_here"
   ```

2. **Increase Cache TTL:**
   ```bash
   # Cache for 2 hours instead of 1
   export CACHE_TTL="7200000"
   ```

3. **Batch Requests:**
   ```javascript
   // ❌ Multiple individual requests
   await get_component_info("Button");
   await get_component_info("Input");
   await get_component_info("Select");
   
   // ✅ Single batch request
   await list_components({"search": "Button,Input,Select"});
   ```

#### Issue: Cache-related errors

**Symptoms:**
- "Permission denied" when writing cache
- "Cache directory not found" errors
- Stale data returned

**Solutions:**

1. **Fix Cache Permissions:**
   ```bash
   # Check cache directory permissions
   ls -la ~/.cache/varlet-mcp
   
   # Fix permissions
   chmod -R 755 ~/.cache/varlet-mcp
   ```

2. **Set Custom Cache Directory:**
   ```bash
   # Use writable directory
   export CACHE_DIR="$HOME/varlet-mcp-cache"
   mkdir -p "$HOME/varlet-mcp-cache"
   ```

3. **Disable Cache Temporarily:**
   ```bash
   # Disable caching for debugging
   export CACHE_TTL="0"
   ```

### Performance Issues

#### Issue: Slow response times

**Symptoms:**
- Long delays for component queries
- Timeouts in Claude Desktop
- High memory usage

**Solutions:**

1. **Enable Caching:**
   ```bash
   # Ensure caching is enabled
   export CACHE_TTL="3600000"  # 1 hour
   export CACHE_DIR="~/.cache/varlet-mcp"
   ```

2. **Optimize Queries:**
   ```javascript
   // ❌ Broad search
   search_documentation({"query": "component"})
   
   // ✅ Specific search
   search_documentation({"query": "Button component props", "limit": 5})
   ```

3. **Use Specific Versions:**
   ```javascript
   // ❌ Always queries latest
   get_component_info({"component_name": "Button"})
   
   // ✅ Specific version (better caching)
   get_component_info({"component_name": "Button", "version": "3.0.0"})
   ```

#### Issue: High memory usage

**Symptoms:**
- Server crashes with out-of-memory errors
- System becomes slow
- Cache grows very large

**Solutions:**

1. **Limit Cache Size:**
   ```bash
   # Reduce cache TTL
   export CACHE_TTL="1800000"  # 30 minutes
   
   # Clear cache regularly
   find ~/.cache/varlet-mcp -type f -mtime +1 -delete
   ```

2. **Monitor Memory Usage:**
   ```bash
   # Check server memory usage
   ps aux | grep varlet-mcp-server
   
   # Monitor cache size
   du -sh ~/.cache/varlet-mcp
   ```

## 🔧 Debugging Tools

### Enable Debug Logging

```bash
# Enable all debug logs
DEBUG=varlet-mcp:* varlet-mcp-server

# Enable specific debug logs
DEBUG=varlet-mcp:api varlet-mcp-server
DEBUG=varlet-mcp:cache varlet-mcp-server
DEBUG=varlet-mcp:tools varlet-mcp-server
```

### Health Check

```bash
# Check server health
curl -X GET http://localhost:3000/health

# Expected response
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": 3600,
  "cache": {
    "enabled": true,
    "size": 1024,
    "hits": 150,
    "misses": 25
  }
}
```

### Test Individual Tools

```bash
# Test component info tool
echo '{
  "method": "tools/call",
  "params": {
    "name": "get_component_info",
    "arguments": {
      "component_name": "Button"
    }
  }
}' | varlet-mcp-server
```

### Validate Configuration

```bash
# Validate Claude Desktop config
python3 -m json.tool ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Check for syntax errors
node -e "console.log(JSON.parse(require('fs').readFileSync('claude_desktop_config.json', 'utf8')))"
```

## 📋 Diagnostic Checklist

When reporting issues, please provide:

### System Information
- [ ] Operating System and version
- [ ] Node.js version (`node --version`)
- [ ] npm/pnpm version (`npm --version`)
- [ ] Varlet MCP version (`varlet-mcp-server --version`)
- [ ] Claude Desktop version

### Configuration
- [ ] Claude Desktop configuration file
- [ ] Environment variables
- [ ] Cache directory permissions
- [ ] Network connectivity

### Error Details
- [ ] Complete error message
- [ ] Steps to reproduce
- [ ] Debug logs
- [ ] Expected vs actual behavior

### Diagnostic Commands

```bash
# System info
node --version
npm --version
varlet-mcp-server --version

# Configuration check
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
echo $VARLET_VERSION
echo $CACHE_TTL

# Test server
DEBUG=varlet-mcp:* varlet-mcp-server

# Check cache
ls -la ~/.cache/varlet-mcp
du -sh ~/.cache/varlet-mcp

# Network test
curl -I https://api.github.com/repos/varletjs/varlet
```

## 🆘 Getting Help

### Before Asking for Help

1. **Search existing issues**: Check [GitHub Issues](https://github.com/varletjs/varlet-mcp/issues)
2. **Check documentation**: Review [README](../README.md) and [API docs](api.md)
3. **Try debugging steps**: Follow the diagnostic checklist above
4. **Test with minimal config**: Use basic configuration to isolate issues

### Where to Get Help

1. **GitHub Issues**: [Create an issue](https://github.com/varletjs/varlet-mcp/issues/new)
2. **Discord Server**: [Join our Discord](https://discord.gg/varlet)
3. **GitHub Discussions**: [Start a discussion](https://github.com/varletjs/varlet-mcp/discussions)
4. **Email Support**: [team@varletjs.org](mailto:team@varletjs.org)

### Issue Template

When creating an issue, please use this template:

```markdown
## Bug Description
[Clear description of the issue]

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- OS: [e.g., macOS 14.0]
- Node.js: [e.g., 18.17.0]
- Varlet MCP: [e.g., 1.0.0]
- Claude Desktop: [e.g., 1.0.0]

## Configuration
```json
[Your Claude Desktop config]
```

## Error Logs
```
[Error messages and debug output]
```

## Additional Context
[Any other relevant information]
```

## 🔄 Known Issues and Workarounds

### Issue: Server randomly stops responding

**Status**: Under investigation
**Workaround**: Restart Claude Desktop or run `varlet-mcp-server` manually
**Tracking**: [Issue #123](https://github.com/varletjs/varlet-mcp/issues/123)

### Issue: Some components missing in v3.0.0

**Status**: Fixed in v1.0.1
**Workaround**: Use `VARLET_VERSION=2.14.0` or upgrade to latest MCP server
**Tracking**: [Issue #456](https://github.com/varletjs/varlet-mcp/issues/456)

### Issue: Windows path issues

**Status**: Fixed in v1.0.2
**Workaround**: Use forward slashes in paths or upgrade
**Tracking**: [Issue #789](https://github.com/varletjs/varlet-mcp/issues/789)

## 📚 Additional Resources

- [MCP Specification](https://modelcontextprotocol.io/)
- [Claude Desktop Documentation](https://docs.anthropic.com/claude/desktop)
- [Varlet UI Documentation](https://varlet.gitee.io/varlet-ui/)
- [Node.js Troubleshooting](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [npm Troubleshooting](https://docs.npmjs.com/troubleshooting)

---

**Still having issues?** Don't hesitate to [create an issue](https://github.com/varletjs/varlet-mcp/issues/new) or ask in our [Discord server](https://discord.gg/varlet). We're here to help!