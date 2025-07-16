# API Reference

## 🛠️ MCP Tools

Varlet MCP Server provides the following tools for AI assistants to interact with Varlet UI.

### Component API Tools

#### `get_component_info`

Retrieve detailed information about a specific Varlet UI component.

**Parameters:**
- `component_name` (string, required): Name of the component (e.g., "Button", "Input")
- `version` (string, optional): Specific version to query (defaults to latest)

**Returns:**
```typescript
{
  name: string;
  description: string;
  props: ComponentProp[];
  events: ComponentEvent[];
  slots: ComponentSlot[];
  methods: ComponentMethod[];
  examples: CodeExample[];
  version: string;
  category: string;
  tags: string[];
}
```

**Example:**
```json
{
  "component_name": "Button",
  "version": "3.0.0"
}
```

#### `list_components`

Get a list of all available Varlet UI components.

**Parameters:**
- `category` (string, optional): Filter by component category
- `version` (string, optional): Specific version to query
- `search` (string, optional): Search term to filter components

**Returns:**
```typescript
{
  components: ComponentSummary[];
  total: number;
  categories: string[];
  version: string;
}
```

**Example:**
```json
{
  "category": "form",
  "search": "input"
}
```

#### `get_component_props`

Get detailed prop information for a component.

**Parameters:**
- `component_name` (string, required): Name of the component
- `prop_name` (string, optional): Specific prop to get details for

**Returns:**
```typescript
{
  component: string;
  props: {
    name: string;
    type: string;
    default: any;
    required: boolean;
    description: string;
    validator?: string;
    examples: any[];
  }[];
}
```

#### `get_component_events`

Get event information for a component.

**Parameters:**
- `component_name` (string, required): Name of the component

**Returns:**
```typescript
{
  component: string;
  events: {
    name: string;
    description: string;
    parameters: EventParameter[];
    examples: CodeExample[];
  }[];
}
```

#### `get_component_slots`

Get slot information for a component.

**Parameters:**
- `component_name` (string, required): Name of the component

**Returns:**
```typescript
{
  component: string;
  slots: {
    name: string;
    description: string;
    props?: SlotProp[];
    examples: CodeExample[];
  }[];
}
```

### Documentation Tools

#### `search_documentation`

Search through Varlet UI documentation.

**Parameters:**
- `query` (string, required): Search query
- `type` (string, optional): Type of content to search ("component", "guide", "api")
- `limit` (number, optional): Maximum number of results (default: 10)

**Returns:**
```typescript
{
  results: {
    title: string;
    content: string;
    url: string;
    type: string;
    relevance: number;
  }[];
  total: number;
  query: string;
}
```

#### `get_guide`

Retrieve a specific guide or tutorial.

**Parameters:**
- `guide_name` (string, required): Name of the guide
- `section` (string, optional): Specific section within the guide

**Returns:**
```typescript
{
  title: string;
  content: string;
  sections: string[];
  lastUpdated: string;
  version: string;
}
```

#### `get_changelog`

Get changelog information for Varlet UI.

**Parameters:**
- `version` (string, optional): Specific version to get changelog for
- `limit` (number, optional): Number of versions to include (default: 5)

**Returns:**
```typescript
{
  versions: {
    version: string;
    date: string;
    changes: {
      type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
      description: string;
      component?: string;
    }[];
  }[];
}
```

### Example and Template Tools

#### `get_component_examples`

Get code examples for a specific component.

**Parameters:**
- `component_name` (string, required): Name of the component
- `example_type` (string, optional): Type of example ("basic", "advanced", "playground")
- `framework` (string, optional): Framework variant ("vue3", "nuxt")

**Returns:**
```typescript
{
  component: string;
  examples: {
    title: string;
    description: string;
    code: string;
    language: string;
    type: string;
    framework: string;
    dependencies?: string[];
  }[];
}
```

#### `generate_component_template`

Generate a template for using a component.

**Parameters:**
- `component_name` (string, required): Name of the component
- `template_type` (string, optional): Type of template ("basic", "form", "page")
- `props` (object, optional): Props to include in template

**Returns:**
```typescript
{
  component: string;
  template: {
    code: string;
    language: string;
    description: string;
    props: object;
    imports: string[];
  };
}
```

#### `get_playground_link`

Generate a link to the Varlet UI playground with pre-filled code.

**Parameters:**
- `component_name` (string, required): Name of the component
- `code` (string, optional): Custom code to include
- `props` (object, optional): Props to pre-fill

**Returns:**
```typescript
{
  url: string;
  component: string;
  code: string;
}
```

### Migration and Compatibility Tools

#### `get_migration_guide`

Get migration information between Varlet UI versions.

**Parameters:**
- `from_version` (string, required): Source version
- `to_version` (string, required): Target version
- `component_name` (string, optional): Specific component to get migration info for

**Returns:**
```typescript
{
  fromVersion: string;
  toVersion: string;
  changes: {
    component: string;
    type: 'breaking' | 'deprecated' | 'new' | 'changed';
    description: string;
    migration: string;
    codemod?: string;
  }[];
  summary: string;
}
```

#### `check_compatibility`

Check compatibility between Varlet UI and other dependencies.

**Parameters:**
- `varlet_version` (string, required): Varlet UI version
- `vue_version` (string, optional): Vue.js version
- `dependencies` (object, optional): Other dependencies to check

**Returns:**
```typescript
{
  compatible: boolean;
  varletVersion: string;
  issues: {
    dependency: string;
    version: string;
    issue: string;
    solution: string;
  }[];
  recommendations: string[];
}
```

## 📚 MCP Resources

Resources provide structured data that AI assistants can access.

### Component Resources

#### `varlet://components`

List of all available components with basic information.

**Structure:**
```typescript
{
  uri: "varlet://components";
  name: "Varlet UI Components";
  description: "Complete list of Varlet UI components";
  mimeType: "application/json";
}
```

#### `varlet://components/{name}`

Detailed information about a specific component.

**Structure:**
```typescript
{
  uri: "varlet://components/Button";
  name: "Button Component";
  description: "Detailed information about the Button component";
  mimeType: "application/json";
}
```

### Documentation Resources

#### `varlet://docs/guides`

List of available guides and tutorials.

#### `varlet://docs/api`

API documentation for all components.

#### `varlet://docs/changelog`

Changelog and version history.

### Example Resources

#### `varlet://examples/{component}`

Code examples for a specific component.

#### `varlet://templates/{type}`

Template collections (forms, pages, layouts).

## 🎯 Smart Prompts

Pre-defined prompts that help AI assistants generate better responses.

### Documentation Prompts

#### `generate_component_usage`

Generate usage examples and best practices for a component.

**Arguments:**
- `component_name`: Name of the component
- `use_case`: Specific use case or scenario
- `complexity`: Level of complexity ("basic", "intermediate", "advanced")

#### `generate_layout_design`

Generate layout design suggestions using Varlet UI components.

**Arguments:**
- `layout_type`: Type of layout ("dashboard", "form", "list", "detail")
- `requirements`: Specific requirements or constraints
- `responsive`: Whether to include responsive design

#### `generate_migration_guide`

Generate migration guide from other UI libraries to Varlet UI.

**Arguments:**
- `source_library`: Source UI library name
- `components`: List of components to migrate
- `version`: Target Varlet UI version

#### `generate_troubleshooting`

Generate troubleshooting guide for common issues.

**Arguments:**
- `issue_type`: Type of issue ("styling", "functionality", "performance")
- `component`: Specific component (optional)
- `environment`: Development environment details

#### `generate_performance_guide`

Generate performance optimization guide.

**Arguments:**
- `app_type`: Type of application
- `performance_goals`: Specific performance goals
- `current_issues`: Current performance issues

## 🔧 Configuration

### Environment Variables

- `VARLET_VERSION`: Varlet UI version to use (default: "latest")
- `CACHE_TTL`: Cache time-to-live in milliseconds (default: 3600000)
- `CACHE_DIR`: Cache directory path (default: OS temp directory)
- `DEBUG`: Enable debug logging (default: false)
- `GITHUB_TOKEN`: GitHub API token for enhanced rate limits
- `API_BASE_URL`: Base URL for Varlet UI API (default: official API)

### Server Configuration

```typescript
interface ServerConfig {
  name: string;
  version: string;
  capabilities: {
    tools: boolean;
    resources: boolean;
    prompts: boolean;
    logging: boolean;
  };
  cache: {
    enabled: boolean;
    ttl: number;
    directory: string;
  };
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
}
```

## 🚨 Error Handling

### Error Types

#### `ComponentNotFoundError`

Thrown when a requested component doesn't exist.

```typescript
{
  code: "COMPONENT_NOT_FOUND";
  message: string;
  component: string;
  availableComponents: string[];
}
```

#### `InvalidVersionError`

Thrown when an invalid version is specified.

```typescript
{
  code: "INVALID_VERSION";
  message: string;
  version: string;
  availableVersions: string[];
}
```

#### `APIError`

Thrown when API requests fail.

```typescript
{
  code: "API_ERROR";
  message: string;
  status: number;
  endpoint: string;
}
```

#### `CacheError`

Thrown when cache operations fail.

```typescript
{
  code: "CACHE_ERROR";
  message: string;
  operation: string;
  path: string;
}
```

### Error Response Format

All errors follow the MCP error response format:

```typescript
{
  error: {
    code: number;
    message: string;
    data?: any;
  };
}
```

## 📊 Rate Limiting

### Default Limits

- **API calls**: 100 requests per minute
- **Documentation searches**: 50 requests per minute
- **Component queries**: 200 requests per minute

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## 🔍 Debugging

### Debug Logging

Enable debug logging with the `DEBUG` environment variable:

```bash
DEBUG=varlet-mcp:* varlet-mcp-server
```

### Log Levels

- `error`: Error messages
- `warn`: Warning messages
- `info`: Informational messages
- `debug`: Debug messages
- `trace`: Detailed trace messages

### Health Check

The server provides a health check endpoint:

```bash
curl http://localhost:3000/health
```

Response:
```json
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

## 📈 Performance

### Caching Strategy

- **Component data**: Cached for 1 hour
- **Documentation**: Cached for 30 minutes
- **Examples**: Cached for 2 hours
- **API responses**: Cached for 15 minutes

### Optimization Tips

1. **Use specific component names** instead of searching
2. **Cache frequently used data** locally
3. **Batch multiple requests** when possible
4. **Use version-specific queries** for better caching

## 🔗 Related APIs

### Varlet UI Official API

- **Base URL**: `https://api.varlet.app/v1`
- **Documentation**: [api.varlet.app](https://api.varlet.app)
- **Rate Limits**: 1000 requests per hour

### GitHub API Integration

- **Repository**: `varletjs/varlet`
- **API**: GitHub REST API v4
- **Authentication**: Optional GitHub token

---

**Need help?** Check our [troubleshooting guide](troubleshooting.md) or [create an issue](https://github.com/varletjs/varlet-mcp/issues).