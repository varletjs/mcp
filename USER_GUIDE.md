# Varlet MCP 用户使用指南

## 简介

Varlet MCP 是一个 Model Context Protocol (MCP) 服务器，专门为 AI 助手提供 Varlet UI 组件库的全面支持。通过这个工具，AI 助手可以获取 Varlet UI 的组件 API、安装指南、文档和最佳实践等信息。

## 系统要求

- Node.js >= 18.0.0
- pnpm (推荐) 或 npm
- 支持的操作系统：macOS、Linux、Windows

## 安装步骤

### 1. 克隆或下载项目

```bash
# 如果是从 GitHub 克隆
git clone https://github.com/varletjs/varlet-mcp.git
cd varlet-mcp

# 或者如果已经下载了项目文件
cd varlet-mcp
```

### 2. 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 3. 构建项目

```bash
# 构建 TypeScript 代码
pnpm run build

# 或使用 npm
npm run build
```

## 使用方法

### 方式一：直接启动服务器

```bash
# 启动 MCP 服务器
pnpm start

# 或使用 npm
npm start
```

### 方式二：开发模式（自动重启）

```bash
# 开发模式，文件变化时自动重启
pnpm run dev

# 或使用 npm
npm run dev
```

### 方式三：使用 CLI 命令

```bash
# 使用全局安装的命令
varlet-mcp-server

# 或使用 npx
npx varlet-mcp-server
```

## 配置 AI 助手

### Claude Desktop 配置

1. 打开 Claude Desktop 的配置文件：
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

2. 添加 Varlet MCP 服务器配置：

```json
{
  "mcpServers": {
    "varlet": {
      "command": "node",
      "args": ["/path/to/varlet-mcp/dist/index.js"],
      "env": {
        "GITHUB_TOKEN": "your_github_token_here"
      }
    }
  }
}
```

**注意：** 请将 `/path/to/varlet-mcp` 替换为实际的项目路径。

### 环境变量配置（可选）

创建 `.env` 文件来配置环境变量：

```bash
# GitHub Token (可选，用于获取最新文档)
GITHUB_TOKEN=your_github_token_here

# 其他配置
NODE_ENV=production
```

## 可用功能

### 工具 (Tools)

Varlet MCP 提供以下工具供 AI 助手使用：

1. **get_varlet_component_api** - 获取 Varlet 组件的详细 API 信息
2. **get_installation_guide** - 获取不同平台的安装指南
3. **get_feature_guides** - 获取功能特性列表
4. **get_feature_guide** - 获取特定功能的详细指南
5. **get_varlet_exports** - 获取 Varlet 包的导出信息
6. **get_frequently_asked_questions** - 常见问题解答
7. **get_release_notes_by_version** - 版本发布说明
8. **get_varlet_playground_examples** - 在线示例代码

### 资源 (Resources)

- 提供 Varlet 组件 API 的结构化访问
- 支持动态获取组件信息和文档

### 提示 (Prompts)

- 组件使用最佳实践提示
- 代码示例和模板生成

## 使用示例

### 在 AI 助手中使用

配置完成后，你可以在 AI 助手中询问关于 Varlet UI 的问题：

```
用户：如何在 Vite 项目中安装 Varlet UI？
AI：我来为你获取 Vite 平台的 Varlet UI 安装指南...

用户：Button 组件有哪些属性？
AI：让我查询 Button 组件的 API 信息...

用户：如何实现暗黑模式？
AI：我来获取暗黑模式的详细指南...
```

## 故障排除

### 常见问题

#### 1. 构建失败

```bash
# 清理并重新构建
pnpm run clean
pnpm install
pnpm run build
```

#### 2. 服务器启动失败

- 检查 Node.js 版本是否 >= 18.0.0
- 确保所有依赖已正确安装
- 检查端口是否被占用

#### 3. AI 助手无法连接

- 确认配置文件路径正确
- 检查 MCP 服务器是否正在运行
- 验证配置文件 JSON 格式是否正确

#### 4. GitHub API 限制

如果遇到 GitHub API 限制，请：
- 设置 `GITHUB_TOKEN` 环境变量
- 使用个人访问令牌提高 API 限制

### 日志调试

启动服务器时会显示详细日志：

```bash
# 查看详细日志
pnpm start

# 开发模式查看实时日志
pnpm run dev
```

## 开发和贡献

### 开发环境设置

```bash
# 克隆项目
git clone https://github.com/varletjs/varlet-mcp.git
cd varlet-mcp

# 安装依赖
pnpm install

# 开发模式
pnpm run dev

# 代码检查
pnpm run lint

# 格式化代码
pnpm run format
```

### 项目结构

```
src/
├── cli/          # CLI 相关代码
├── prompts/      # MCP 提示模块
├── resources/    # MCP 资源模块
├── services/     # 业务服务层
├── tools/        # MCP 工具模块
├── transports/   # 传输层
├── utils/        # 工具函数
└── index.ts      # 主入口文件
```

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 支持和反馈

- GitHub Issues: [https://github.com/varletjs/varlet-mcp/issues](https://github.com/varletjs/varlet-mcp/issues)
- Varlet UI 官网: [https://varlet.gitee.io/varlet-ui/](https://varlet.gitee.io/varlet-ui/)
- 社区讨论: [https://github.com/varletjs/varlet/discussions](https://github.com/varletjs/varlet/discussions)

---

**祝你使用愉快！** 🎉