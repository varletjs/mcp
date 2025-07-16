# Contributing to Varlet MCP Server

感谢您对 Varlet MCP Server 项目的关注！我们欢迎所有形式的贡献，包括但不限于代码、文档、问题报告和功能建议。

## 🚀 快速开始

### 开发环境要求

- Node.js 18+
- pnpm (推荐) 或 npm
- Git
- TypeScript 知识
- 对 MCP (Model Context Protocol) 的基本了解

### 设置开发环境

1. **Fork 项目**
   ```bash
   # 在 GitHub 上 fork 项目，然后克隆你的 fork
   git clone https://github.com/YOUR_USERNAME/varlet-mcp.git
   cd varlet-mcp
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **运行开发模式**
   ```bash
   pnpm run dev
   ```

4. **运行测试**
   ```bash
   pnpm test
   ```

## 📋 贡献类型

### 🐛 Bug 报告

在提交 bug 报告之前，请：

1. 搜索现有的 issues，确保问题尚未被报告
2. 使用最新版本测试问题
3. 收集详细的错误信息

**Bug 报告应包含：**

- **环境信息**：操作系统、Node.js 版本、Varlet MCP 版本
- **重现步骤**：详细的步骤说明
- **预期行为**：您期望发生什么
- **实际行为**：实际发生了什么
- **错误日志**：完整的错误消息和堆栈跟踪
- **配置文件**：相关的配置信息（移除敏感数据）

### ✨ 功能请求

在提交功能请求之前，请：

1. 搜索现有的 issues 和讨论
2. 考虑功能是否符合项目目标
3. 准备详细的用例说明

**功能请求应包含：**

- **问题描述**：当前的限制或需求
- **建议解决方案**：您希望如何解决
- **替代方案**：考虑过的其他方法
- **用例**：具体的使用场景
- **影响范围**：对现有功能的影响

### 📝 文档改进

文档贡献包括：

- README 改进
- API 文档更新
- 示例代码添加
- 教程和指南
- 注释改进

### 💻 代码贡献

## 🔧 开发指南

### 项目结构

```
src/
├── cli/              # CLI 接口
│   ├── index.ts      # CLI 入口
│   └── intro.ts      # 介绍信息
├── tools/            # MCP 工具实现
│   ├── index.ts      # 工具注册
│   ├── api.ts        # API 相关工具
│   └── docs.ts       # 文档相关工具
├── resources/        # MCP 资源
│   ├── index.ts      # 资源注册
│   └── api.ts        # API 资源
├── prompts/          # 智能提示
│   ├── index.ts      # 提示注册
│   └── documentation.ts # 文档提示
├── services/         # 核心服务
│   ├── cache.ts      # 缓存服务
│   ├── api.ts        # API 服务
│   └── docs.ts       # 文档服务
├── utils/            # 工具函数
│   ├── http.ts       # HTTP 工具
│   ├── cache.ts      # 缓存工具
│   └── types.ts      # 类型定义
└── index.ts          # 主入口
```

### 代码规范

#### TypeScript 规范

- 使用严格的 TypeScript 配置
- 为所有公共 API 提供类型定义
- 使用 JSDoc 注释描述复杂逻辑
- 避免使用 `any` 类型

```typescript
// ✅ 好的示例
interface ComponentAPI {
  name: string;
  props: Record<string, PropDefinition>;
  events: Record<string, EventDefinition>;
  slots: Record<string, SlotDefinition>;
}

/**
 * 获取组件 API 信息
 * @param componentName 组件名称
 * @param version Varlet UI 版本
 * @returns 组件 API 信息
 */
async function getComponentAPI(
  componentName: string,
  version: string = 'latest'
): Promise<ComponentAPI> {
  // 实现逻辑
}

// ❌ 避免的示例
function getAPI(name: any, ver?: any): any {
  // 缺少类型定义
}
```

#### 命名规范

- **文件名**：使用 kebab-case（如 `component-api.ts`）
- **函数名**：使用 camelCase（如 `getComponentAPI`）
- **类名**：使用 PascalCase（如 `APIService`）
- **常量**：使用 UPPER_SNAKE_CASE（如 `DEFAULT_CACHE_TTL`）
- **接口**：使用 PascalCase，可选择 `I` 前缀（如 `ComponentAPI` 或 `IComponentAPI`）

#### 错误处理

```typescript
// ✅ 好的错误处理
try {
  const result = await apiCall();
  return result;
} catch (error) {
  if (error instanceof NetworkError) {
    throw new MCPError('网络请求失败', 'NETWORK_ERROR');
  }
  throw new MCPError('未知错误', 'UNKNOWN_ERROR', error);
}

// ❌ 避免的错误处理
try {
  return await apiCall();
} catch (e) {
  console.log(e); // 不要只是打印错误
  return null;    // 不要静默失败
}
```

### 测试规范

#### 单元测试

- 使用 Jest 作为测试框架
- 测试覆盖率应达到 80% 以上
- 为每个公共函数编写测试
- 测试边界条件和错误情况

```typescript
// 测试示例
describe('getComponentAPI', () => {
  it('should return component API for valid component', async () => {
    const api = await getComponentAPI('Button', '3.0.0');
    expect(api.name).toBe('Button');
    expect(api.props).toBeDefined();
  });

  it('should throw error for invalid component', async () => {
    await expect(getComponentAPI('InvalidComponent'))
      .rejects.toThrow('Component not found');
  });

  it('should use latest version by default', async () => {
    const api = await getComponentAPI('Button');
    expect(api).toBeDefined();
  });
});
```

#### 集成测试

- 测试 MCP 协议兼容性
- 测试与 Claude Desktop 的集成
- 测试缓存机制
- 测试错误恢复

### 性能考虑

- **缓存策略**：合理使用缓存减少 API 调用
- **懒加载**：按需加载大型数据
- **内存管理**：避免内存泄漏
- **并发控制**：限制并发请求数量

```typescript
// ✅ 好的缓存实现
class APICache {
  private cache = new Map<string, CacheEntry>();
  private readonly ttl: number;

  async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key);
    if (cached && !this.isExpired(cached)) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    return data;
  }
}
```

## 🔄 提交流程

### 1. 创建分支

```bash
# 从 main 分支创建新分支
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 或者修复 bug
git checkout -b fix/issue-number-description
```

### 2. 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型 (type)：**

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式化（不影响功能）
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动
- `perf`: 性能优化
- `ci`: CI/CD 相关

**示例：**

```bash
# 新功能
git commit -m "feat(api): add support for Varlet UI v3.1.0"

# Bug 修复
git commit -m "fix(cache): resolve memory leak in API cache"

# 文档更新
git commit -m "docs: update installation guide for Windows"

# 重构
git commit -m "refactor(tools): simplify component API fetching logic"
```

### 3. 代码检查

提交前确保通过所有检查：

```bash
# 代码格式化
pnpm run lint:fix

# 类型检查
pnpm run type-check

# 运行测试
pnpm test

# 构建检查
pnpm run build
```

### 4. 创建 Pull Request

**PR 标题格式：**

```
<type>: <description>
```

**PR 描述模板：**

```markdown
## 📝 变更描述

简要描述此 PR 的变更内容。

## 🔗 相关 Issue

- Closes #123
- Related to #456

## 📋 变更类型

- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化
- [ ] 测试改进

## 🧪 测试

描述如何测试这些变更：

- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试完成

## 📸 截图（如适用）

如果有 UI 变更，请提供截图。

## ✅ 检查清单

- [ ] 代码遵循项目规范
- [ ] 添加了必要的测试
- [ ] 更新了相关文档
- [ ] 通过了所有 CI 检查
- [ ] 进行了自我代码审查
```

## 📖 添加新工具

### 1. 创建工具文件

在 `src/tools/` 目录下创建新的工具文件：

```typescript
// src/tools/my-new-tool.ts
import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const myNewTool: Tool = {
  name: 'my_new_tool',
  description: '工具描述',
  inputSchema: {
    type: 'object',
    properties: {
      param1: {
        type: 'string',
        description: '参数描述'
      }
    },
    required: ['param1']
  }
};

export async function handleMyNewTool(args: any) {
  // 工具实现逻辑
  return {
    content: [
      {
        type: 'text',
        text: '工具执行结果'
      }
    ]
  };
}
```

### 2. 注册工具

在 `src/tools/index.ts` 中注册新工具：

```typescript
import { myNewTool, handleMyNewTool } from './my-new-tool.js';

export function registerTools(server: Server) {
  // 注册现有工具...
  
  // 注册新工具
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        // 现有工具...
        myNewTool
      ]
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    switch (name) {
      // 现有工具处理...
      
      case 'my_new_tool':
        return await handleMyNewTool(args);
        
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  });
}
```

### 3. 添加测试

```typescript
// tests/tools/my-new-tool.test.ts
import { handleMyNewTool } from '../../src/tools/my-new-tool.js';

describe('myNewTool', () => {
  it('should handle valid input', async () => {
    const result = await handleMyNewTool({ param1: 'test' });
    expect(result.content).toBeDefined();
  });

  it('should throw error for invalid input', async () => {
    await expect(handleMyNewTool({})).rejects.toThrow();
  });
});
```

### 4. 更新文档

在 README.md 中添加新工具的文档。

## 🎯 最佳实践

### 代码质量

1. **单一职责原则**：每个函数只做一件事
2. **依赖注入**：避免硬编码依赖
3. **错误处理**：提供有意义的错误消息
4. **日志记录**：在关键点添加日志
5. **配置管理**：使用环境变量和配置文件

### 性能优化

1. **缓存策略**：合理使用缓存
2. **异步处理**：避免阻塞操作
3. **资源管理**：及时释放资源
4. **批量处理**：减少网络请求次数

### 安全考虑

1. **输入验证**：验证所有用户输入
2. **错误信息**：不泄露敏感信息
3. **依赖管理**：定期更新依赖
4. **访问控制**：限制文件系统访问

## 🤝 社区

### 沟通渠道

- **GitHub Issues**：Bug 报告和功能请求
- **GitHub Discussions**：一般讨论和问答
- **Discord**：实时交流（如果有的话）

### 行为准则

我们致力于为所有人提供友好、安全和欢迎的环境。请遵循以下原则：

1. **尊重他人**：尊重不同的观点和经验
2. **建设性反馈**：提供有帮助的、建设性的反馈
3. **包容性**：欢迎所有背景的贡献者
4. **专业性**：保持专业和友好的交流

### 获得帮助

如果您需要帮助：

1. 查看现有文档和 FAQ
2. 搜索现有的 issues 和讨论
3. 在 GitHub Discussions 中提问
4. 创建新的 issue（如果是 bug 或功能请求）

## 📄 许可证

通过贡献代码，您同意您的贡献将在 MIT 许可证下授权。

---

感谢您的贡献！每一个贡献都让 Varlet MCP Server 变得更好。🎉