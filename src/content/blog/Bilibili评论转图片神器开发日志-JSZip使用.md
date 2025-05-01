---
title: 'Bilibili评论转图片神器开发日志-JSZip使用'
description: '记录开发Bilibili评论转图片工具时使用JSZip库的经验,包括如何获取文件压缩打包的进度。'
pubDate: 'Jul 11 2020'
heroImage: '/blog-placeholder.png'
---

> 最近在开发[Bilibili 评论转图片神器](tool.mightyherox.me)，功能是将 Bilibili 视频评论区的评论转换成 PNG 图片。

开发这个工具的思路是使用[html2canvas](https://html2canvas.hertzen.com/)将获取到的评论转成 PNG 图片，再通过[JSZip](https://stuk.github.io/jszip/)打包下载。

[JSZip](https://stuk.github.io/jszip/)使用起来挺方便的，官网也有示例。在开发过程中遇到的一个问题是想要获取文件压缩打包的进度，我在中文搜索环境下找不到相关内容，不过在 JSZip 的 github issues 中找到了相关[记录](https://github.com/Stuk/jszip/issues/373)。

代码如下：

```
for(var a=0; a < name.length; a++) {
  zip.file("DXFs/" + name[a] + ".dxf", toDXF(shape));
}

zip.generateAsync({type: "blob", streamFiles: true}, function updateCallback(metadata) {
  element.style.width = metadata.percent + '%';
})
.then(function (blob) {
  saveAs(blob, "Files.zip");
});
```
