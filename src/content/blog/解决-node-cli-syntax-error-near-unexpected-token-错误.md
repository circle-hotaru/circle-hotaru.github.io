---
title: 解决 Node CLI syntax error near unexpected token `( 错误
description: 解决 Node CLI syntax error near unexpected token `( 错误
pubDate: 'Feb 10 2021'
heroImage: '/blog-placeholder-1.jpg'
---

## 前言

最近在开发一个 Node CLI 工具 [bilibili-video-analysis](https://www.npmjs.com/package/bilibili-video-analysis)，希望可以直接使用 `bili-video -u url-of-bilibili-video` 开启服务。但是执行结果却报错：

```
syntax error near unexpected token `(
```

## 原因

出错原因是因为我的开发环境是 Windows，但 CLI 工具的执行环境是 Unix。而这两者的回车换行符是不兼容的。

> Unix 系统里，每行结尾只有"<换行>"，即"\n"；Windows 系统里面，每行结尾是"<回车><换行>"，即"\r\n"；Mac 系统里，每行结尾是"<回车>"。一个直接后果是，Unix/Mac 系统下的文件在 Windows 里打开的话，所有文字会变成一行；而 Windows 里的文件在 Unix/Mac 下打开的话，在每行的结尾可能会多出一个^M 符号。
>
> ——《回车和换行》 阮一峰

## 解决

把文件中的回车换行符换成 Unix 下的换行符即可。

以 vscode 为例：

在 settings 中搜索 file:Eol，将默认的 auto 选项改为 \n，然后重新保存你的文件即可。
