---
title: 'Bilibili评论转图片神器开发日志-CSS Variables使用'
description: '介绍如何使用CSS Variables来实现Bilibili评论转图片神器开发过程中遇到的跨域问题,并提供详细的操作步骤。'
pubDate: 'Jul 12 2020'
heroImage: '/blog-placeholder-1.jpg'
---

> 最近在开发[Bilibili 评论转图片神器](tool.mightyherox.me)，功能是将 Bilibili 视频评论区的评论转换成 PNG 图片。

在开发评论模块过程中想要实现按键切换修改评论背景和文字颜色的功能，代码如下：

```html
<div class="d-flex flex-wrap align-items-start justify-content-center">
  <div
    class="comment"
    v-for="item in comments"
    ref="comment"
    :class="{ 'comment-dark': darkTheme }"
    :style="{ 'border-radius': borderRadius + 'px' }"
  >
    <img class="author-thumbnail" :src="item.member.avatar" alt="" />
    <div class="comment-main">
      <div class="user-name">{{ item.member.uname }}</div>
      <div class="content" v-html="item.content.message"></div>
      <div class="published-time" v-if="displayTime">
        {{ timestampFormat(item.ctime) }}
      </div>
    </div>
  </div>
</div>
```

```css
.comment {
  background-color: #f9f9f9;
  display: flex;
  border-radius: 10px;
  margin: 4px;
  padding: 16px;
  width: 360px;
}

.comment .author-thumbnail {
  border-radius: 50%;
  flex-shrink: 0;
  height: 40px;
  margin-right: 16px;
  width: 40px;
}

.comment .comment-main .user-name {
  color: #222;
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  display: block;
}

.comment .comment-main .content {
  color: #222;
  line-height: 20px;
  padding: 2px 0;
  font-size: 14px;
  overflow: hidden;
}

.comment .comment-main .published-time {
  color: #aaa;
  line-height: 26px;
  font-size: 12px;
}

.comment-dark {
  background-color: #181818;
  color: #fff;
}
```

使用的是 Vue，当`darkTheme`为`true`时，显示`comment-dark`样式，利用 CSS 层叠性覆盖前面`comment`设定的背景和文字颜色。但是实际过程中遇到了 CSS 权重问题，只能修改背景颜色而无法修改文字颜色。

google 后发现有 CSS Variables 这么个东西，它的主要特点和用法是：

1. 可以继承
2. 以`--`开头来命名/定义变量（区分大小写）
3. 用 var()来读取变量值

这样的话，我只需要进行如下修改即可完成想要的效果：

```css
.comment {
  --bi-spec-general-background: #f9f9f9;
  --bi-spec-text-primary: #222;
  --bi-spec-text-secondary: #aaa;
  background-color: var(--bi-spec-general-background);
  display: flex;
  border-radius: 10px;
  margin: 4px;
  padding: 16px;
  width: 360px;
}

.comment-dark {
  --bi-spec-general-background: #181818;
  --bi-spec-text-primary: #fff;
  --bi-spec-text-secondary: #aaa;
}

.comment .author-thumbnail {
  border-radius: 50%;
  flex-shrink: 0;
  height: 40px;
  margin-right: 16px;
  width: 40px;
}

.comment .comment-main .user-name {
  color: var(--bi-spec-text-primary);
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  display: block;
}

.comment .comment-main .content {
  color: var(--bi-spec-text-primary);
  line-height: 20px;
  padding: 2px 0;
  font-size: 14px;
  overflow: hidden;
}

.comment .comment-main .published-time {
  color: var(--bi-spec-text-secondary);
  line-height: 26px;
  font-size: 12px;
}
```

参考：

[30 天 CSS 隨手筆記 - 第 12 天 - CSS Variables~!!](https://ithelp.ithome.com.tw/articles/10187737)
