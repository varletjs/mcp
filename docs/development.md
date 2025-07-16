# Development Guide

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0 (recommended) or npm >= 9.0.0
- **Git**: Latest version
- **TypeScript**: >= 5.0.0 (installed as dev dependency)

### Development Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/varletjs/varlet-mcp.git
   cd varlet-mcp
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build the project**
   ```bash
   pnpm run build
   ```

4. **Start development server**
   ```bash
   pnpm run dev
   ```

5. **Run tests**
   ```bash
   pnpm run test
   ```

## 🏗️ Project Architecture

### Directory Structure

```
varlet-mcp/
├── src/                    # Source code
│   ├── index.ts           # Main entry point
│   ├── server.ts          # MCP server implementation
│   ├── tools/             # MCP tools
│   │   ├── index.ts       # Tools registry
│   │   ├── api.ts         # API-related tools
│   │   ├── documentation.ts # Documentation tools
│   │   └── search.ts      # Search functionality
│   ├── resources/         # MCP resources
│   │   ├── index.ts       # Resources registry
│   │   ├── components.ts  # Component resources
│   │   └── examples.ts    # Example resources
│   ├── prompts/           # Smart prompts
│   │   ├── index.ts       # Prompts registry
│   │   └── documentation.ts # Documentation prompts
│   ├── utils/             # Utility functions
│   │   ├── cache.ts       # Caching utilities
│   │   ├── github.ts      # GitHub API utilities
│   │   ├── logger.ts      # Logging utilities
│   │   └── validation.ts  # Input validation
│   └── types/             # TypeScript type definitions
│       ├── index.ts       # Main types
│       ├── api.ts         # API types
│       └── mcp.ts         # MCP-specific types
├── bin/                   # CLI executables
│   └── cli.js            # CLI entry point
├── dist/                  # Compiled output
├── docs/                  # Documentation
├── tests/                 # Test files
├── .github/              # GitHub workflows and templates
└── config files          # Various config files
```

### Core Components

#### 1. MCP Server (`src/server.ts`)

The main MCP server implementation that handles:
- Tool registration and execution
- Resource management
- Prompt handling
- Error handling and logging

#### 2. Tools (`src/tools/`)

MCP tools that provide functionality to AI assistants:
- **API Tools**: Interact with Varlet UI API
- **Documentation Tools**: Access and search documentation
- **Search Tools**: Find components and examples

#### 3. Resources (`src/resources/`)

MCP resources that provide structured data:
- **Component Resources**: Component definitions and metadata
- **Example Resources**: Code examples and demos

#### 4. Prompts (`src/prompts/`)

Smart prompts that guide AI assistants:
- **Documentation Prompts**: Generate documentation-related content
- **Code Generation Prompts**: Generate code examples

## 🛠️ Development Workflow

### Code Style and Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build process or auxiliary tool changes

**Examples:**
```bash
feat(tools): add component search functionality
fix(cache): resolve cache invalidation issue
docs(readme): update installation instructions
```

### Branch Strategy

- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/***: Feature development branches
- **fix/***: Bug fix branches
- **release/***: Release preparation branches

### Development Commands

```bash
# Development
pnpm run dev              # Start development server
pnpm run build:watch      # Build with watch mode
pnpm run type-check       # TypeScript type checking

# Testing
pnpm run test             # Run all tests
pnpm run test:unit        # Run unit tests
pnpm run test:integration # Run integration tests
pnpm run test:watch       # Run tests in watch mode

# Code Quality
pnpm run lint             # Run ESLint
pnpm run lint:fix         # Fix ESLint issues
pnpm run format           # Format code with Prettier
pnpm run format:check     # Check code formatting

# Build
pnpm run build            # Production build
pnpm run clean            # Clean build artifacts

# Release
pnpm run release:dry      # Dry run release
pnpm run release          # Create release
```

## 🧪 Testing

### Test Structure

```
tests/
├── unit/                 # Unit tests
│   ├── tools/           # Tool tests
│   ├── resources/       # Resource tests
│   └── utils/           # Utility tests
├── integration/         # Integration tests
│   ├── server.test.ts   # Server integration tests
│   └── cli.test.ts      # CLI integration tests
├── fixtures/            # Test fixtures
└── helpers/             # Test helpers
```

### Writing Tests

```typescript
// Example unit test
import { describe, it, expect } from 'vitest';
import { validateComponentName } from '../src/utils/validation';

describe('validateComponentName', () => {
  it('should validate correct component names', () => {
    expect(validateComponentName('Button')).toBe(true);
    expect(validateComponentName('DatePicker')).toBe(true);
  });

  it('should reject invalid component names', () => {
    expect(validateComponentName('')).toBe(false);
    expect(validateComponentName('invalid-name')).toBe(false);
  });
});
```

### Test Coverage

- Aim for >90% code coverage
- All public APIs must be tested
- Critical paths must have integration tests
- Error scenarios must be tested

## 🔧 Adding New Features

### Adding a New Tool

1. **Create tool file**
   ```typescript
   // src/tools/my-new-tool.ts
   import { Tool } from '@modelcontextprotocol/sdk/types.js';
   
   export const myNewTool: Tool = {
     name: 'my_new_tool',
     description: 'Description of what this tool does',
     inputSchema: {
       type: 'object',
       properties: {
         // Define input parameters
       },
       required: []
     }
   };
   
   export async function handleMyNewTool(args: any) {
     // Implementation
   }
   ```

2. **Register tool**
   ```typescript
   // src/tools/index.ts
   import { myNewTool, handleMyNewTool } from './my-new-tool.js';
   
   export const tools = [
     // ... existing tools
     myNewTool
   ];
   
   export const toolHandlers = {
     // ... existing handlers
     my_new_tool: handleMyNewTool
   };
   ```

3. **Add tests**
   ```typescript
   // tests/unit/tools/my-new-tool.test.ts
   import { describe, it, expect } from 'vitest';
   import { handleMyNewTool } from '../../../src/tools/my-new-tool';
   
   describe('handleMyNewTool', () => {
     it('should handle valid input', async () => {
       // Test implementation
     });
   });
   ```

4. **Update documentation**
   - Add tool description to README.md
   - Add usage examples
   - Update CHANGELOG.md

### Adding a New Resource

1. **Create resource file**
   ```typescript
   // src/resources/my-resource.ts
   import { Resource } from '@modelcontextprotocol/sdk/types.js';
   
   export async function getMyResource(): Promise<Resource[]> {
     // Implementation
   }
   ```

2. **Register resource**
   ```typescript
   // src/resources/index.ts
   import { getMyResource } from './my-resource.js';
   
   export async function listResources(): Promise<Resource[]> {
     return [
       // ... existing resources
       ...(await getMyResource())
     ];
   }
   ```

## 🐛 Debugging

### Debug Configuration

```bash
# Enable debug logging
export DEBUG=varlet-mcp:*

# Run with debug output
pnpm run dev
```

### VS Code Debug Configuration

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug MCP Server",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/bin/cli.js",
      "env": {
        "DEBUG": "varlet-mcp:*"
      },
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### Common Issues

1. **Build Errors**
   - Check TypeScript configuration
   - Verify all imports are correct
   - Run `pnpm run type-check`

2. **Runtime Errors**
   - Check environment variables
   - Verify API endpoints are accessible
   - Check cache permissions

3. **Test Failures**
   - Update test fixtures
   - Check async/await usage
   - Verify mock configurations

## 📦 Release Process

### Version Management

We use [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. **Prepare release**
   ```bash
   # Update version and changelog
   pnpm run version
   ```

2. **Create release PR**
   ```bash
   git checkout -b release/v1.2.0
   git add .
   git commit -m "chore: prepare release v1.2.0"
   git push origin release/v1.2.0
   ```

3. **Merge and tag**
   ```bash
   # After PR is merged
   git checkout main
   git pull origin main
   git tag v1.2.0
   git push origin v1.2.0
   ```

4. **Publish**
   - GitHub Actions will automatically publish to npm
   - Create GitHub release with changelog

## 🤝 Contributing Guidelines

### Before Contributing

1. Check existing issues and PRs
2. Discuss major changes in issues first
3. Follow the code style and conventions
4. Write tests for new functionality
5. Update documentation

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Run all checks locally
6. Submit a pull request

### Code Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes (or properly documented)
- [ ] Performance impact is considered
- [ ] Security implications are reviewed

## 📚 Resources

### Documentation

- [MCP Specification](https://modelcontextprotocol.io/)
- [Varlet UI Documentation](https://varlet.gitee.io/varlet-ui/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tools and Libraries

- [Model Context Protocol SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Vitest](https://vitest.dev/) - Testing framework
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting

### Community

- [Discord Server](https://discord.gg/varlet)
- [GitHub Discussions](https://github.com/varletjs/varlet-mcp/discussions)
- [Issue Tracker](https://github.com/varletjs/varlet-mcp/issues)

---

**Need help?** Feel free to ask questions in our [Discord server](https://discord.gg/varlet) or [create an issue](https://github.com/varletjs/varlet-mcp/issues/new).