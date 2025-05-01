---
title: 'Bilibili评论转图片神器开发日志-解决跨域问题'
description: '介绍如何解决Bilibili评论转图片神器开发过程中遇到的跨域问题,并提供详细的操作步骤。'
pubDate: 'Jul 11 2020'
heroImage: '/blog-placeholder.png'
---

> 最近在开发[Bilibili 评论转图片神器](tool.mightyherox.me)，功能是将 Bilibili 视频评论区的评论转换成 PNG 图片。

本来打算是做一个纯前端，通过[B 站 API](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/comment/comment_list.md)（热心网友整理的 API）获取数据即可。但是实际开发过程中遇到了跨域问题。

关于跨域问题的解决，网上有许多解决方案，比如 jsonp。

原本以为使用 jsonp 后，就可以开开心心的从 B 站获取数据了。但悲剧又来了，B 站 API 返回的是 json 格式，jsonp 要求返回 jsonp 格式。

![2020-07-11-CORB.png](https://i.loli.net/2020/07/11/q5i4nUbJ32RyEKd.png)

上图显示，我虽然获得了数据，但是浏览器说这个是 json 数据，不是 jsonp 数据，所以我把它拦截下来了。晕，就是说我收到了这个数据，但是浏览器把它拦在了门口不进来。

网上找到大多数解决方案是不用 jsonp，而是 cross。但是应用场景是自家 api，修改服务端就可以了。B 站又不是我家开的，改不了它的服务端呀。于是选择一个折中的办法——自己写一个后端 API，用 API 去取数据。

之前学过一点 node.js，这次就使用 node.js 来处理。

代码如下：

```
// express, http
const express = require('express');
const app = express();

// request
const request = require('request');

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// port
const PORT = 8089;
app.listen(PORT);

// cross domain config
app.all('/api/v1', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    next();
});

app.get('/api/v1/bv2av', (req, res, next) => {

    // 白名單
    if (!req.get('Origin')) return;

    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');

    request('https://api.bilibili.com/x/web-interface/view?bvid=' + req.query.bvid, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    });

});

app.get('/api/v1/comments', (req, res, next) => {

    // 白名單
    if (!req.get('Origin')) return;

    res.set('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    request('https://api.bilibili.com/x/reply?type=1&oid=' + req.query.oid + '&sort=' + req.query.sort + '&pn=' + req.query.pn + '&ps=' + req.query.ps + '&nohot=1', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    });

});
```

这样，前端只需要向我写的 node.js 端发起请求即可获取数据。

另外还有一个小问题，用户头像的图片无法显示出来，但是手动访问链接后再刷新又可以显示了。如下图：

![2020-07-11-服务器设置防盗链.png](https://i.loli.net/2020/07/11/z9loMUiKnwCVTBR.png)

google 一番后发现是因为服务器设置了图片防盗链的原因，解决方法很简单，在 head 加上一行代码即可：

```
<meta name="referrer" content="no-referrer"/>
```

参考：

[接氣象局 api、跨網域 ajax 資料](https://letswrite.tw/api-cross-domain-node/)

[秒建一个 json 转 jsonp 的中间层服务器](https://www.ituring.com.cn/article/273795)

[JSONP 跨域详解](https://www.jianshu.com/p/e1e2920dac95)

[对 B 站各种数据进行抓包分析](https://www.cnblogs.com/brusally/p/11198512.html)

[bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
