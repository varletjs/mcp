# Varlet MCP 服务器

一个为 AI 助手提供 Varlet UI 组件库全面支持的 Model Context Protocol (MCP) 服务器。

## 📚 使用指南

- **🚀 [快速开始](./QUICK_START.md)** - 5分钟快速上手指南
- **📖 [详细文档](./USER_GUIDE.md)** - 完整的使用说明和配置指南
- **🔧 [故障排除](./USER_GUIDE.md#故障排除)** - 常见问题解决方案

## ✨ 特性

- **🔍 智能组件搜索** - 快速查找 Varlet 组件和 API
- **📚 完整文档访问** - 获取组件使用指南、示例和最佳实践
- **🎯 智能代码生成** - 基于组件 API 生成代码片段
- **🌐 多语言支持** - 支持中文和英文文档
- **⚡ 高性能缓存** - 智能缓存机制提升响应速度
- **🔄 实时更新** - 自动获取最新的组件信息

## 🛠️ 安装

### 方式一：自动安装（推荐）

```bash
# 克隆项目
git clone https://github.com/your-username/varlet-mcp.git
cd varlet-mcp

# 运行自动安装脚本
chmod +x install.sh
./install.sh
```

### 方式二：手动安装

```bash
# 克隆项目
git clone https://github.com/your-username/varlet-mcp.git
cd varlet-mcp

# 安装依赖
pnpm install

# 构建项目
pnpm run build

# 启动服务器
pnpm start
```

## 🚀 使用方法

### 与 Claude Desktop 集成

1. **配置 Claude Desktop**
   
   编辑 Claude Desktop 配置文件：
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. **添加配置**
   
   ```json
   {
     "mcpServers": {
       "varlet": {
         "command": "node",
         "args": ["/path/to/varlet-mcp/dist/index.js"],
         "env": {
           "GITHUB_TOKEN": "your_github_token_here",
           "NODE_ENV": "production"
         }
       }
     }
   }
   ```

3. **重启 Claude Desktop**

### 与其他 MCP 客户端集成

任何支持 MCP 协议的客户端都可以连接到 Varlet MCP 服务器：

```bash
# 启动服务器
node dist/index.js
```

## 🔧 可用工具

### API 工具
- `search_components` - 搜索 Varlet 组件
- `get_component_api` - 获取组件 API 文档
- `get_component_examples` - 获取组件使用示例
- `search_api_methods` - 搜索特定 API 方法

### 文档工具
- `get_documentation` - 获取完整文档
- `search_documentation` - 搜索文档内容
- `get_changelog` - 获取更新日志

### 智能提示
- `suggest_components` - 根据需求推荐组件
- `generate_code_snippet` - 生成代码片段
- `validate_component_usage` - 验证组件使用方式

## 📦 资源

- **组件列表** - 完整的 Varlet 组件清单
- **API 参考** - 详细的 API 文档
- **设计指南** - UI/UX 设计最佳实践
- **示例代码** - 实用的代码示例

## 🔧 开发

### 环境设置

```bash
# 克隆项目
git clone https://github.com/your-username/varlet-mcp.git
cd varlet-mcp

# 安装依赖
pnpm install

# 设置环境变量
cp .env.example .env
# 编辑 .env 文件，添加你的 GitHub Token
```

### 开发模式

```bash
# 启动开发服务器
pnpm run dev

# 在另一个终端中测试
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | node dist/index.js
```

### 构建

```bash
# 构建生产版本
pnpm run build

# 检查构建结果
pnpm run check
```

### 测试

```bash
# 运行测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm run test:coverage
```

### 代码检查

```bash
# 运行 ESLint
pnpm run lint

# 自动修复代码风格问题
pnpm run lint:fix

# 运行类型检查
pnpm run type-check
```

## 📁 项目结构

```
varlet-mcp/
├── src/
│   ├── index.ts              # 主入口文件
│   ├── server.ts             # MCP 服务器实现
│   ├── tools/                # 工具实现
│   │   ├── api-tools.ts      # API 相关工具
│   │   ├── doc-tools.ts      # 文档工具
│   │   └── smart-tools.ts    # 智能提示工具
│   ├── resources/            # 资源提供者
│   │   ├── components.ts     # 组件资源
│   │   ├── documentation.ts  # 文档资源
│   │   └── examples.ts       # 示例资源
│   ├── prompts/              # 提示模板
│   │   ├── component-help.ts # 组件帮助提示
│   │   └── best-practices.ts # 最佳实践提示
│   ├── services/             # 服务层
│   │   ├── github.ts         # GitHub API 服务
│   │   ├── cache.ts          # 缓存服务
│   │   └── varlet.ts         # Varlet API 服务
│   └── utils/                # 工具函数
│       ├── logger.ts         # 日志工具
│       ├── config.ts         # 配置管理
│       └── helpers.ts        # 辅助函数
├── dist/                     # 构建输出
├── docs/                     # 文档
├── tests/                    # 测试文件
├── USER_GUIDE.md            # 用户指南
├── QUICK_START.md           # 快速开始
└── package.json             # 项目配置
```

## 🌟 核心功能

### 智能组件搜索
- 支持模糊搜索和精确匹配
- 基于组件功能和用途的智能推荐
- 多维度搜索（名称、功能、标签）

### 完整 API 支持
- 实时获取最新的组件 API
- 详细的参数说明和类型定义
- 丰富的使用示例和最佳实践

### 智能代码生成
- 基于组件 API 自动生成代码
- 支持多种代码风格和模板
- 智能参数填充和类型推断

### 高性能缓存
- 智能缓存策略减少 API 调用
- 支持缓存失效和更新机制
- 可配置的缓存时间和策略

## 🔒 环境变量

创建 `.env` 文件并配置以下变量：

```env
# GitHub Token（用于访问 Varlet 仓库）
GITHUB_TOKEN=your_github_token_here

# 运行环境
NODE_ENV=production

# 日志级别
LOG_LEVEL=info

# 缓存时间（秒）
CACHE_TTL=3600

# API 超时时间（毫秒）
API_TIMEOUT=10000
```

## 🤝 贡献

我们欢迎所有形式的贡献！请查看 [贡献指南](./CONTRIBUTING.md) 了解详细信息。

### 开发流程

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](./LICENSE) 文件了解详细信息。

## 🆘 支持

如果你遇到任何问题或有建议，请：

- 📖 查看 [用户指南](./USER_GUIDE.md)
- 🐛 [提交 Issue](https://github.com/your-username/varlet-mcp/issues)
- 💬 [参与讨论](https://github.com/your-username/varlet-mcp/discussions)
- 📧 发送邮件至 support@example.com

## 🙏 致谢

感谢 [Varlet](https://github.com/varletjs/varlet) 团队提供优秀的 UI 组件库，以及 [Anthropic](https://www.anthropic.com/) 开发的 Model Context Protocol。

---

**让 AI 助手更好地理解和使用 Varlet UI 组件库！** 🚀