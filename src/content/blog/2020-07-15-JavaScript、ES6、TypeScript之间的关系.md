---
title: 'JavaScript、ES6、TypeScript之间的关系'
description: '探讨JavaScript、ES6、TypeScript之间的关系,解释ES6是JavaScript的一个版本,TypeScript是JavaScript的超集,并介绍TypeScript的安装和使用方法。'
pubDate: 'Jul 15 2020'
heroImage: '/blog-placeholder-1.jpg'
---

> 今天复习前端三剑客之**JavaScript**。

## JavaScript 和 ES6

JavaScript 看了也挺多遍了，在学习过程中经常遇到 ES6 和 TypeScript 这些字眼。以前因为没接触过，所以不自觉地就觉得它们高深莫测，好像很难的样子。今天不知道看什么资料复习，找到了以前经常看的[小马技术频道](https://www.youtube.com/channel/UCazV3A3_1-Mtd6E_auw_ifg)，里面刚好有讲 ES6，遂把这个[系列视频](https://www.youtube.com/playlist?list=PLliocbKHJNwu150Kc7_eEywQBFLTJyPZs)看了一遍。视频不算多，一共就 23 个视频，每个视频大概五六分钟时长。看完后发现 ES6 的一些语法其实我之前也有接触过、使用过，只不过当时并不知道而已。

那么 ES6 和 JavaScript 之间到底有什么关系呢？根据个人理解，**ES6 是一个规范，而 JavaScript 是具体实现**。当然除了 ES6 还有其他版本 ES，只不过目前 ES6 较为流行和普适。

## JavaScript 和 TypeScript

那么[TypeScript](https://www.typescriptlang.org/)又是什么呢？[小马技术频道](https://www.youtube.com/channel/UCazV3A3_1-Mtd6E_auw_ifg)里也有一个 TypeScript 的[系列视频](https://www.youtube.com/playlist?list=PLliocbKHJNwtCfLQu5U3LF_AS-wuP6M7w)，不过目前还没看完。根据维基百科的介绍：

> TypeScript 是一种开源的编程语言，该语言项目由微软进行维护和管理。TypeScript 不仅包含 JavaScript 的语法，而且还提供了静态类型检查以及使用看起来像基于类的面向对象编程语法操作 Prototype。

大众说法说，TypeScript 是 JavaScript 的超集。简单理解就是**语法上合法的 JavaScript，一定是合法的 TypeScript。**

### 如何使用 TypeScript 呢？

在 win10 操作系统下，您可以通过`npm install -g typescript`进行安装，安装完成后使用`tsc -v `进行检查，若出现版本号则表示安装成功。

编写一个以`ts`为后缀的文件，接着使用`tsc ${fileName}.ts`进行编译，编译成功后就可以看到多出来一个`${fileName}.js`文件，直接运行`node ${fileName}.js`即可。

另外，学习 JavaScript 过程中也经常遇到[Babel](https://babeljs.io/)这个名词，通俗理解，Babel 解决并不是所有浏览器都支持高版本 JavaScript 的问题。它可以将高版本 JavaScript 转变为低版本。
