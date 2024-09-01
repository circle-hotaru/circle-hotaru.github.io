---
title: '使用code-server打造你的云端VS Code'
description: '介绍如何使用code-server在浏览器上运行VS Code，并提供详细的操作步骤。'
pubDate: 'Nov 29 2020'
heroImage: '/blog-placeholder-1.jpg'
---

最近外出学习老是要背着个电脑还挺累的，但是我又需要电脑进行编程。有没有什么方法可以让我只需携带 iPad 外出同时又能进行编程呢？

答案是开源项目[code-server](https://github.com/cdr/code-server)，通过它可以在浏览器上运行 VS Code。下面我将介绍如何使用 code-server 打造你的云端 VS Code。

## 目标

通过 code-server 在你的服务器上运行 VS Code，然后通过浏览器访问 VS Code。

## 服务器

首先你需要准备一台服务器，官方文档推荐的最低配置是

- 1 GB of RAM
- 2 cores（1 核能跑，但有时候会卡住）

如果你还没有服务器，国内推荐购买腾讯云（良心云）服务器；国外推荐购买 Vultr，按量计费，线路不错，支持微信/支付宝。如果你想支持我，可以使用我的[AFF 链接](https://www.vultr.com/?ref=8451050-6G)，你将会获得 100 美元的使用额度，我也会得到 25 美元的使用额度。

操作系统可以使用任何你喜欢的 Linux 发行版，本文以 Ubuntu 20.04 为例。

## 安装 code-server

我们将通过官方提供的脚本安装 code-server。使用 XShell 或 Putty 等登陆你的服务器，然后依次运行如下命令：

```shell
curl -fsSL https://code-server.dev/install.sh | sh -s -- --dry-run
curl -fsSL https://code-server.dev/install.sh | sh
```

运行完毕后，安装脚本将会打印出如何运行和使用 code-server。

```shell
systemctl start code-server@$USER // 启动code-server
```

## 访问 code-server

code-server 默认使用密码登录（密码保存在`~/.config/code-server/config.yaml`），并且监听 losthost 从而避免向外界暴露自己。但我们的目标是在不同的机器上访问它。

下面我将介绍一种安全的且简单的访问 code-server 的方法。

在更进一步之前，你需要确保服务器开启 HTTP/HTTPS 端口

```shell
ufw allow 80
ufw allow 443
```

1. 一个你自己的域名（你都已经看到这里了相信你也是有域名的人。如果还没有，你可以考虑购买一个，我使用的是 NameCheap，Github 学生包里有一年的免费 NameCheap 域名）。

2. 使用 A 记录解析你的域名到服务器 IP。

3. 安装[Caddy](https://caddyserver.com/docs/download#debian-ubuntu-raspbian)。

   ```shell
   echo "deb [trusted=yes] https://apt.fury.io/caddy/ /" \
       | sudo tee -a /etc/apt/sources.list.d/caddy-fury.list
   sudo apt update
   sudo apt install caddy
   ```

   > Caddy 服务器是一个开源的，使用 Golang 编写，支持 HTTP/2 的 Web 服务端。它使用 Golang 标准库提供 HTTP 功能。 Caddy 一个显著的特性是默认启用 HTTPS。它是第一个无需额外配置即可提供 HTTPS 特性的 Web 服务器。
   >
   > ——维基百科

   > 注意：上述方法安装的是 Caddy 2，而目前中文互联网搜索出来的 Caddy 文档大部分是 1 版本，2 和 1 有不少区别，请读者自行查阅官方英文文档。

4. `nano /etc/caddy/Caddyfile`，将里的内容替换下面内容

   ```shell
   yourdomain.com
   reverse_proxy 127.0.0.1:8080
   ```

5. 重启 caddy：

   ```shell
   sudo systemctl reload caddy
   ```

接着在浏览器访问`https://<your-domain-name>`就可以进入你的 code-server 页面啦！

## 修改密码

只需修改`~/.config/code-server/config.yaml`里 password 的值，然后重启 code-server 即可：

```shell
sudo systemctl restart code-server@$USER
```

## 参考

[code-server Setup Guide](https://github.com/cdr/code-server/blob/v3.7.3/doc/guide.md)
