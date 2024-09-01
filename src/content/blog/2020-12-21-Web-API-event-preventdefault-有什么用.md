---
title: 'Web API：event.preventdefault() 有什么用？'
description: '介绍event.preventdefault()的作用，并提供详细的操作步骤。'
pubDate: 'Dec 21 2020'
heroImage: '/blog-placeholder-1.jpg'
---

今天阅读某个项目源码时候遇到了 `event.preventdefault()` 这行代码。之前有遇到过几次，也去 MDN 查看了它的[介绍](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)，但还是不太理解它的实际应用场景。直到今天看到这部分源码才恍然大悟。

> [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 接口的 `preventDefault()` 方法，告诉[user agent](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent)：如果此事件没有被显式处理，它默认的动作也不应该照常执行。此事件还是继续传播，除非碰到事件侦听器调用[`stopPropagation()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation) 或[`stopImmediatePropagation()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation)，才停止传播。
>
> ——MDN

从 MDN 的解释我们可以了解到 `event.preventdefault()` 的作用是停止事件的默认动作，然后呢？它的实际应用场景是什么？

一般情况下，我们会使用 `<a>` 标签时候跳转到新的网页。

HTML

```html
<a id="clickMe" href="https://blog.mightyherox.me/" target="_blank"
  >跳转到多度橙的博客</a
>
```

但有时候我们会利用 `<a>` 标签当作按钮，它本身就拥有链接的功能，但我们会为它添加类似 `onclick` 事件。只要在 `<a>` 标签触发的事件中加入 `event.preventdefault()` ，就不会执行它的默认动作，也就是不会再执行「链接到某个网址」动作。

HTML

```html
<a id="clickMe" href="https://blog.mightyherox.me/" target="_blank">about Me</a>
```

JavaScript

```javascript
document.getElementById('clickMe').onclick = (event) => {
  alert("Hey there 👋, I'm circlehotarux!")
  event.preventDefault()
}
```

上述案例中，HTML 文件除了修改显示的文本外，其他的部分都没有修改。然后我们在 JavaScript 中加入了 `event.preventDefault()` 以及一个弹窗事件。再次点击 `<a>` 标签，这时就只有弹窗事件发生，而并没有发生跳转事件。因为 `event.preventDefault()` 把 `<a>` 标签默认的功能给取消了！

## 参考文章

1. https://ithelp.ithome.com.tw/articles/10198999
