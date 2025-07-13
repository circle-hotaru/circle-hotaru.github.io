---
title: "Claude Code 入门介绍"
description: ""
pubDate: "July 13 2025"
heroImage: "/claude-code-screenshot.png"
---

Claude Code 是 Anthropic 公司推出的一个命令行工具，让开发者可以直接在终端中使用 Claude AI 模型进行编程任务。

## **基本使用**

通过 npm 安装（Node.js 18+）

```
npm install -g @anthropic-ai/claude-code
```

然后在命令行中输入 `claude` 即可运行，默认情况下，使用 `claude-opus-4-20250514` 模型

```
claude
```

![Claude Code screenshot.png](/claude-code-screenshot.png)

## 起手式

如果是对现有项目进行修改可以先让 Claude Code 分析你的项目，看看它的理解是否有误再开始做修改。

## **添加图片**

有时候需要用到图片，例如希望 Claude Code 根据设计稿生成代码。

可以通过以下方式将图片添加到对话中：

1. 直接将图片拖到 Claude Code 视窗中
2. 复制图片并使用 ctrl+v 粘贴（不是 cmd+v）
3. 提供图片路径，例如“Analyze this image: /path/to/your/image.png”

## **与 Git 搭配使用**

```
what files have I changed?
```

```
commit my changes with a descriptive message
```

```
review my changes and suggest improvements
```

## 小技巧

另外开一个终端窗口运行 Claude Code，让它去 review 第一个 Claude Code 写的代码。

将 Claude Code 功能添加到 scripts 中快速使用：

```json
// package.json
{
    ...
    "scripts": {
        ...
        "lint:claude": "claude -p 'you are a linter. please look at the changes vs main and report any issues related to typos. report the filename and line number on one line, and a description of the issue on the second line. do not return any other text.'"
    }
}
```

## **对比 Cursor、Gemini CLI**

先来说说 Gemini CLI 免费管饱，每分钟60次、每日1000次的免费请求额度。但感觉它的定位不仅仅是编程，更像是想要成为电脑里的超级助手？支持 Google 搜索、音视频处理。代码开源，更新迅速。

Claude Code 代码能力更强，虽然 Cursor 也可以选择使用 Claude 模型，但它有一些省 token、降速的操作来降低成本，导致实际效果会不及 Claude Code。

但 Claude Code 也可以集成进 Cursor 中，只需要在 Cursor 的终端中输入 `claude` 就可以启动。同时享受 Cursor 的自动补全和 Claude Code 强大的编程能力。

## **基本命令**

| claude                        | 启动 Claude Code |
| ----------------------------- | ---------------- |
| claude commit                 | 创建 Git 提交    |
| /clear                        | 清除对话历史     |
| exit 或 Ctrl+C                | 退出 Claude Code |
| claude -c                     | 继续最近的对话   |
| claude -r                     | 恢复之前的对话   |
| —dangerously-skip-permissions | 跳过请求许可提示 |

## 参考

- https://www.anthropic.com/engineering/claude-code-best-practices
