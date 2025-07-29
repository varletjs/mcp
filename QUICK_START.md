# Varlet MCP 快速开始指南

## 🚀 5分钟快速上手

### 第一步：安装依赖

```bash
cd varlet-mcp
pnpm install
```

### 第二步：构建项目

```bash
pnpm run build
```

### 第三步：启动服务器

```bash
pnpm start
```

看到 "Server is ready!" 消息表示启动成功！

## 🔧 配置 Claude Desktop

### 1. 找到配置文件

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

### 2. 添加配置

```json
{
  "mcpServers": {
    "varlet": {
      "command": "node",
      "args": ["/Users/你的用户名/Desktop/varlet-mcp/dist/index.js"]
    }
  }
}
```

**重要：** 请将路径替换为你的实际项目路径！

### 3. 重启 Claude Desktop

配置完成后，重启 Claude Desktop 应用。

## ✅ 测试连接

在 Claude 中输入以下问题测试：

```
如何在 Vue 项目中安装 Varlet UI？
```

```
Button 组件有哪些属性？
```

```
如何实现暗黑模式？
```

如果 Claude 能够回答这些问题并提供详细信息，说明配置成功！

## 🛠️ 常见问题

### Q: 服务器启动失败？
**A:** 检查 Node.js 版本是否 >= 18.0.0

### Q: Claude 无法连接？
**A:** 确认配置文件路径正确，JSON 格式无误

### Q: 构建报错？
**A:** 运行 `pnpm run clean && pnpm install && pnpm run build`

## 📚 更多功能

查看完整文档：[USER_GUIDE.md](./USER_GUIDE.md)

---

**🎉 现在你可以开始使用 Varlet MCP 了！**