# Contributing Guide

## 🎯 Welcome Contributors!

Thank you for your interest in contributing to Varlet MCP Server! This guide will help you get started with contributing to our project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Workflow](#contributing-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)
- [Review Process](#review-process)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](../CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 Getting Started

### Types of Contributions

We welcome many types of contributions:

- 🐛 **Bug Reports**: Help us identify and fix issues
- 💡 **Feature Requests**: Suggest new features or improvements
- 📝 **Documentation**: Improve or add documentation
- 🔧 **Code Contributions**: Fix bugs or implement features
- 🧪 **Testing**: Add or improve tests
- 🎨 **Design**: UI/UX improvements
- 🌐 **Translations**: Help translate the project
- 📢 **Community**: Help others in discussions

### Before You Start

1. **Check existing issues**: Look for existing [issues](https://github.com/varletjs/varlet-mcp/issues) or [discussions](https://github.com/varletjs/varlet-mcp/discussions)
2. **Read the documentation**: Familiarize yourself with the project
3. **Start small**: Begin with good first issues labeled `good first issue`
4. **Ask questions**: Don't hesitate to ask in discussions or issues

## 🛠️ Development Setup

### Prerequisites

- **Node.js**: >= 18.0.0 (LTS recommended)
- **pnpm**: >= 8.0.0 (preferred package manager)
- **Git**: Latest version
- **TypeScript**: >= 5.0.0

### Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/varlet-mcp.git
cd varlet-mcp

# Add upstream remote
git remote add upstream https://github.com/varletjs/varlet-mcp.git
```

### Install Dependencies

```bash
# Install dependencies
pnpm install

# Verify installation
pnpm run build
pnpm run test
```

### Development Environment

```bash
# Start development mode
pnpm run dev

# Run tests in watch mode
pnpm run test:watch

# Type checking
pnpm run type-check

# Linting
pnpm run lint

# Format code
pnpm run format
```

## 🔄 Contributing Workflow

### 1. Create a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring
- `test/description` - Test improvements
- `chore/description` - Maintenance tasks

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add tests for new functionality
- Update documentation as needed
- Commit frequently with clear messages

### 3. Test Your Changes

```bash
# Run all tests
pnpm run test

# Run specific test file
pnpm run test src/tools/component.test.ts

# Run integration tests
pnpm run test:integration

# Check test coverage
pnpm run test:coverage

# Type checking
pnpm run type-check

# Linting
pnpm run lint

# Format check
pnpm run format:check
```

### 4. Commit Changes

```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: add component search functionality"
```

#### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes

**Examples:**
```bash
git commit -m "feat(tools): add component props validation"
git commit -m "fix: resolve cache invalidation issue"
git commit -m "docs: update API documentation"
git commit -m "test: add unit tests for search functionality"
```

### 5. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create pull request on GitHub
```

## 📏 Coding Standards

### TypeScript Guidelines

```typescript
// Use explicit types
interface ComponentInfo {
  name: string;
  version: string;
  description?: string;
}

// Prefer const assertions
const SUPPORTED_VERSIONS = ['2.x', '3.x'] as const;

// Use proper error handling
try {
  const result = await fetchComponentInfo(name);
  return result;
} catch (error) {
  logger.error('Failed to fetch component info', { error, name });
  throw new Error(`Component ${name} not found`);
}

// Document complex functions
/**
 * Searches for components matching the given criteria
 * @param query - Search query string
 * @param options - Search options
 * @returns Promise resolving to search results
 */
async function searchComponents(
  query: string,
  options: SearchOptions = {}
): Promise<ComponentSearchResult[]> {
  // Implementation
}
```

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Always use semicolons
- **Line length**: Maximum 100 characters
- **Trailing commas**: Always use in multiline structures

### File Organization

```
src/
├── tools/           # MCP tools
│   ├── component.ts
│   ├── documentation.ts
│   └── index.ts
├── resources/       # MCP resources
├── prompts/         # MCP prompts
├── utils/           # Utility functions
├── types/           # Type definitions
├── constants/       # Constants
└── __tests__/       # Test files
```

### Naming Conventions

- **Files**: kebab-case (`component-search.ts`)
- **Functions**: camelCase (`getComponentInfo`)
- **Classes**: PascalCase (`ComponentManager`)
- **Constants**: SCREAMING_SNAKE_CASE (`DEFAULT_CACHE_TTL`)
- **Interfaces**: PascalCase with descriptive names (`ComponentSearchOptions`)

## 🧪 Testing Guidelines

### Test Structure

```typescript
// component.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ComponentTool } from '../tools/component';

describe('ComponentTool', () => {
  let componentTool: ComponentTool;

  beforeEach(() => {
    componentTool = new ComponentTool();
  });

  afterEach(() => {
    // Cleanup
  });

  describe('getComponentInfo', () => {
    it('should return component information for valid component', async () => {
      // Arrange
      const componentName = 'var-button';
      
      // Act
      const result = await componentTool.getComponentInfo(componentName);
      
      // Assert
      expect(result).toBeDefined();
      expect(result.name).toBe(componentName);
      expect(result.props).toBeInstanceOf(Array);
    });

    it('should throw error for invalid component', async () => {
      // Arrange
      const invalidName = 'non-existent-component';
      
      // Act & Assert
      await expect(
        componentTool.getComponentInfo(invalidName)
      ).rejects.toThrow('Component not found');
    });
  });
});
```

### Test Categories

1. **Unit Tests**: Test individual functions/classes
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test complete workflows
4. **Performance Tests**: Test performance characteristics

### Test Coverage

- Aim for **>90%** code coverage
- Focus on critical paths and edge cases
- Test both success and error scenarios
- Mock external dependencies

```bash
# Check coverage
pnpm run test:coverage

# View coverage report
open coverage/index.html
```

## 📚 Documentation

### Code Documentation

```typescript
/**
 * Retrieves detailed information about a Varlet UI component
 * 
 * @param name - The component name (e.g., 'var-button', 'var-input')
 * @param version - Optional version to fetch (defaults to latest)
 * @returns Promise resolving to component information
 * 
 * @example
 * ```typescript
 * const info = await getComponentInfo('var-button');
 * console.log(info.props); // Component props
 * ```
 * 
 * @throws {Error} When component is not found
 * @throws {NetworkError} When API request fails
 */
async function getComponentInfo(
  name: string,
  version?: string
): Promise<ComponentInfo> {
  // Implementation
}
```

### README Updates

- Update feature lists
- Add usage examples
- Update installation instructions
- Keep changelog current

### API Documentation

- Document all public APIs
- Provide usage examples
- Include error scenarios
- Update OpenAPI specs if applicable

## 📤 Submitting Changes

### Pull Request Guidelines

1. **Use the PR template**: Fill out all sections
2. **Clear title**: Descriptive and concise
3. **Detailed description**: Explain what and why
4. **Link issues**: Reference related issues
5. **Screenshots**: Include for UI changes
6. **Breaking changes**: Clearly document

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated and passing
- [ ] Documentation updated
- [ ] No breaking changes (or properly documented)
- [ ] Commit messages follow convention
- [ ] PR title is descriptive
- [ ] Related issues linked

### PR Template Example

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots
(If applicable)

## Breaking Changes
(If any)

## Additional Notes
(Any additional context)
```

## 🔍 Review Process

### What to Expect

1. **Automated checks**: CI/CD pipeline runs
2. **Code review**: Maintainers review code
3. **Feedback**: Suggestions and requests
4. **Iteration**: Make requested changes
5. **Approval**: Final approval and merge

### Review Criteria

- **Functionality**: Does it work as intended?
- **Code quality**: Is it clean and maintainable?
- **Performance**: Any performance implications?
- **Security**: Are there security concerns?
- **Documentation**: Is it properly documented?
- **Tests**: Are tests adequate?

### Addressing Feedback

```bash
# Make requested changes
git add .
git commit -m "fix: address review feedback"
git push origin feature/your-feature-name
```

## 🏷️ Release Process

### Version Management

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Workflow

1. **Feature freeze**: Stop adding new features
2. **Testing**: Comprehensive testing
3. **Documentation**: Update docs and changelog
4. **Version bump**: Update version numbers
5. **Tag release**: Create git tag
6. **Publish**: Release to npm
7. **Announce**: Notify community

## 🎯 Good First Issues

Looking for a place to start? Check out issues labeled:

- `good first issue`: Perfect for newcomers
- `help wanted`: We need community help
- `documentation`: Documentation improvements
- `bug`: Bug fixes needed
- `enhancement`: Feature improvements

### Suggested First Contributions

1. **Fix typos**: Documentation improvements
2. **Add tests**: Improve test coverage
3. **Update examples**: Better usage examples
4. **Improve error messages**: More helpful errors
5. **Add validation**: Input validation improvements

## 🌟 Recognition

### Contributors

All contributors are recognized in:

- **README**: Contributors section
- **Changelog**: Release notes
- **GitHub**: Contributors graph
- **NPM**: Package contributors

### Contribution Types

We recognize various contribution types:

- 💻 Code
- 📖 Documentation
- 🐛 Bug reports
- 💡 Ideas
- 🤔 Answering questions
- ⚠️ Tests
- 🎨 Design
- 🌍 Translation

## 💬 Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General discussions
- **Discord**: Real-time chat (coming soon)
- **Email**: [varlet.mcp@gmail.com](mailto:varlet.mcp@gmail.com)

### Getting Help

1. **Search existing issues**: Your question might be answered
2. **Check documentation**: Comprehensive guides available
3. **Ask in discussions**: Community support
4. **Create an issue**: For bugs or feature requests

### Community Guidelines

- **Be respectful**: Treat everyone with respect
- **Be helpful**: Help others when you can
- **Be patient**: Maintainers are volunteers
- **Be constructive**: Provide actionable feedback
- **Be inclusive**: Welcome all contributors

## 📋 Contributor Checklist

### Before Your First Contribution

- [ ] Read Code of Conduct
- [ ] Set up development environment
- [ ] Run tests successfully
- [ ] Understand project structure
- [ ] Join community channels

### For Each Contribution

- [ ] Create feature branch
- [ ] Write/update tests
- [ ] Update documentation
- [ ] Follow coding standards
- [ ] Test changes locally
- [ ] Write clear commit messages
- [ ] Create detailed PR
- [ ] Respond to feedback

## 🚀 Advanced Contributing

### Becoming a Maintainer

Interested in becoming a maintainer?

1. **Consistent contributions**: Regular, quality contributions
2. **Community involvement**: Help others, review PRs
3. **Technical expertise**: Deep understanding of codebase
4. **Communication skills**: Clear, helpful communication
5. **Time commitment**: Available for ongoing maintenance

### Maintainer Responsibilities

- **Code review**: Review and approve PRs
- **Issue triage**: Label and prioritize issues
- **Release management**: Coordinate releases
- **Community support**: Help contributors
- **Technical decisions**: Guide project direction

### Special Interest Groups

- **Documentation Team**: Focus on docs
- **Testing Team**: Improve test coverage
- **Performance Team**: Optimize performance
- **Security Team**: Security reviews
- **Accessibility Team**: A11y improvements

## 📚 Resources

### Learning Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [Varlet UI Documentation](https://varlet.gitee.io/varlet-ui/)

### Development Tools

- **VS Code Extensions**:
  - TypeScript and JavaScript Language Features
  - ESLint
  - Prettier
  - GitLens
  - Thunder Client (API testing)

### Useful Commands

```bash
# Development
pnpm run dev          # Start development
pnpm run build        # Build project
pnpm run test         # Run tests
pnpm run lint         # Lint code
pnpm run format       # Format code

# Git helpers
git log --oneline     # View commit history
git status            # Check status
git diff              # View changes
git stash             # Stash changes
git rebase -i HEAD~3  # Interactive rebase

# NPM helpers
npm outdated          # Check outdated packages
npm audit             # Security audit
npm run               # List available scripts
```

---

## 🙏 Thank You!

Thank you for contributing to Varlet MCP Server! Your contributions help make this project better for everyone.

**Questions?** Don't hesitate to ask in [GitHub Discussions](https://github.com/varletjs/varlet-mcp/discussions) or create an [issue](https://github.com/varletjs/varlet-mcp/issues/new).

**Happy coding!** 🚀