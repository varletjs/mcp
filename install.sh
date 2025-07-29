#!/bin/bash

# Varlet MCP 安装脚本

set -e

echo "🚀 开始安装 Varlet MCP..."

# 检查 Node.js 版本
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未找到 Node.js，请先安装 Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ 错误：Node.js 版本过低，需要 18+，当前版本：$(node -v)"
    exit 1
fi

echo "✅ Node.js 版本检查通过：$(node -v)"

# 检查包管理器
if command -v pnpm &> /dev/null; then
    PKG_MANAGER="pnpm"
    echo "✅ 使用 pnpm 作为包管理器"
elif command -v npm &> /dev/null; then
    PKG_MANAGER="npm"
    echo "✅ 使用 npm 作为包管理器"
else
    echo "❌ 错误：未找到 npm 或 pnpm"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
$PKG_MANAGER install

# 构建项目
echo "🔨 构建项目..."
$PKG_MANAGER run build

# 检查构建结果
if [ ! -f "dist/index.js" ]; then
    echo "❌ 构建失败：未找到 dist/index.js"
    exit 1
fi

echo "✅ 构建完成"

# 获取当前路径
CURRENT_PATH=$(pwd)

# 生成配置文件示例
echo "📝 生成配置文件..."
cat > claude_desktop_config_generated.json << EOF
{
  "mcpServers": {
    "varlet": {
      "command": "node",
      "args": ["$CURRENT_PATH/dist/index.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
EOF

echo "✅ 安装完成！"
echo ""
echo "📋 下一步操作："
echo "1. 复制生成的配置到 Claude Desktop 配置文件："
echo "   - macOS: ~/Library/Application Support/Claude/claude_desktop_config.json"
echo "   - Windows: %APPDATA%\\Claude\\claude_desktop_config.json"
echo "   - Linux: ~/.config/Claude/claude_desktop_config.json"
echo ""
echo "2. 配置内容已生成到：claude_desktop_config_generated.json"
echo ""
echo "3. 重启 Claude Desktop"
echo ""
echo "4. 测试连接：在 Claude 中询问 'Button 组件有哪些属性？'"
echo ""
echo "🎉 祝你使用愉快！"