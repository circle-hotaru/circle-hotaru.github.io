---
title: 'Bilibili 评论转图片神器开发日志-html2canvas 使用'
description: '分享在开发Bilibili评论转图片工具时使用html2canvas库的经验,包括解决跨域图片和窗口滚动问题。'
pubDate: 'Jul 11 2020'
heroImage: '/blog-placeholder.png'
---

> 最近在开发[Bilibili 评论转图片神器](tool.mightyherox.me)，功能是将 Bilibili 视频评论区的评论转换成 PNG 图片。

开发这个工具的思路是使用[html2canvas](https://html2canvas.hertzen.com/)将获取到的评论转成 PNG 图片，再通过[JSZip](https://stuk.github.io/jszip/)打包下载。

[html2canvas](https://html2canvas.hertzen.com/)这个工具的使用挺简单的，官网也有示例。

![html2canvas官网](https://i.loli.net/2020/07/11/pc68nZG7IYkA4Qt.png)

以下记录自己遇到的一些问题：

## ~~图片空白？~~

~~我使用的是 Vue，推测原因是 DOM 还没渲染完，html2canvas 就开始转图片了。解决方法是使用 nextTick，等 DOM 渲染完了再转图片。~~

> ~~在 created()钩子函数执行的时候 DOM 其实并未进行任何渲染，而此时进行 DOM 操作无异于徒劳，所以此处一定要将 DOM 操作的 js 代码放进 Vue.nextTick()的回调函数中。与之对应的就是 mounted()钩子函数，因为该钩子函数执行时所有的 DOM 挂载和渲染都已完成，此时在该钩子函数中进行任何 DOM 操作都不会有问题 。
> [简单理解 Vue 中的 nextTick](https://juejin.im/post/5a6fdb846fb9a01cc0268618)~~

_2020 年 7 月 30 日 更新_

昨天把 nextTick 去掉未发现空白问题，估计当时是由于别的原因造成的，现在无法重现问题。

## canvas 中含有跨域图片，图片不显示？

html2canvas 默认不显示跨域图片，需要在配置中开启

```
// 允许跨域（图片相关）
allowTaint: true,
// 允许跨域（图片相关）
useCORS: true,
```

## 窗口有滚动，图片显示有偏差？

需要计算绘制元素的位置，具体代码如下：

```
this.$nextTick(() => {
    setTimeout(() => {
        // 获取需要绘制的元素
        let comments = this.$refs.comment;
        for (let i = 0; i < comments.length; i++) {
            // 评论内容做图片名
            let imgName = comments[i].innerText.split("\n")[1];
            // 返回元素的大小及其相对于视口的位置
            let rect = comments[i].getBoundingClientRect();
            // 不知为何rect.x返回的坐标不准确，需要加上8.5才行
            rect.x += 8.5;
            // 获取滚动轴滚动的长度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            // 获取dom 宽度
            let width = comments[i].offsetWidth
            // 获取dom 高度
            let height = comments[i].offsetHeight
            html2canvas(comments[i], {
                // 允许跨域（图片相关）
                allowTaint: true,
                // 允许跨域（图片相关）
                useCORS: true,
                // 截图的背景颜色
                backgroundColor: 'transparent',
                // 图片x轴偏移量
                x: rect.x,
                // 图片宽度
                width: width,
                // 图片高度
                height: height,
                // y轴滚动
                scrollY: -scrollTop,
                // 放大2倍
                scale: 2,
                // 关闭日志
                logging: false,
            }).then(canvas => {
                // JSZip模块中的base64.js会对文件格式进行检测，所以我们需要将之前canvas.toDataURL()得到的data去除前缀imgData = imgData.split("data:image/png;base64,")[1];。
                let imgData = canvas.toDataURL().split('data:image/png;base64,')[1];
                //这个images文件目录中创建一个base64数据为imgData的图像，图像名是上面获取的imaName
                img.file(imgName + '.png', imgData, { base64: true });
                that.done1 += 1;
                console.log("添加图片" + i);
            });
        };
    }, 1000);
});
```
