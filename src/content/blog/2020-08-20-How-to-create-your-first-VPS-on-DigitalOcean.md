---
title: '如何在DigitalOcean创建你的第一台VPS'
description: '详细指导如何在DigitalOcean上创建和设置第一个Linux虚拟专用服务器(VPS),包括账号注册、项目创建和Droplet配置。'
pubDate: 'Aug 20 2020'
heroImage: '/blog-placeholder.png'
---

在本文中，我将指导您完成在 DigitalOcean 上设置第一个 Linux 虚拟专用服务器（VPS）的过程。

DigitalOcean 是最著名的 VPS 服务商之一。

DigitalOcean 为最著名的应用程序和操作系统提供一键式安装过程，它提供了遍布全球的数据中心和 CDN 位置。最低消费仅需 5 美刀/月。

我认为 DigitalOcean 是最实惠且易于使用的解决方案之一，并且可以将其用于各种服务。

## 一、 创建一个 DigitalOcean 账号

您可以使用[链接](https://m.do.co/c/165e0813b0d9)获得$100 的免费信用额，可在接下来的 60 天内使用。

> 免责声明：这是会员链接。 当您使用此链接进行注册时，您将获得 100 美元的 DigitalOcean 免费信用额，我将获得 25 美元的 DigitalOcean 免费信用额。

我会推荐 DigitalOcean 不仅仅是因为他们有会员计划。 恰恰相反，由于我经常使用它，所以如果我可以降低账单，我会抓住这个机会。当然，如果您是一名学生，我更建议您使用 Github 的学生包，它将提供您$50 的免费信用额，时限一年。

进入网站后即可开始注册：
![DigitalOcean注册页面](https://i.loli.net/2020/08/20/u9Npx8ALl3fsdY2.png)

注册完成后不要忘记到您的邮箱进行确认。

接着您需要绑定您的信用卡或者 Paypal：

![DigitalOcean绑定信用卡或Paypal](https://i.loli.net/2020/08/20/YOzfudTRrtoyiQP.png)

## 二、创建一个项目

一旦您注册完毕，就可以创建一个新的项目：

![创建一个新项目.png](https://i.loli.net/2020/08/20/ykUK5wOZ9p2AVGD.png)

单击**Create Project**后，该项目现在已添加到您的项目列表中，并且项目仪表板如下所示：

![DigitalOcean项目仪表板.png](https://i.loli.net/2020/08/20/NlEi86RfAc2BVDW.png)

这是您要对此项目进行任何操作的控制中心。

首先，这里有一个**Get Started with a Droplet**的蓝色大按钮。

什么是 Droplet？DigitalOcean Droplet 是一个虚拟机，即 VPS。DigitalOcean 上的所有内容都围绕 Droplet 展开。

通过此接口，我们还可以初始化托管数据库，创建空间（用于存储文件的位置）以及创建负载均衡器以在多个 Droplet 之间分配流量。

但是，暂时不需要管那么多，我们只需要创建一个 Droplet 即可。

### 创建一个 Droplet

单击**Get Started with a Droplet**按钮，将会显示一个包含很多选项的页面：

![Create Droplets.png](https://i.loli.net/2020/08/20/YuxCjowymHaPbI3.png)

让我们从上面开始。

![选择镜像.png](https://i.loli.net/2020/08/20/6FpPQzwdHon8VKs.png)

首先的选择镜像，这里我们可以选择一些 Linux 发行版（Ubuntu, Fedora, Debian and CentOS）和 FreeBSD（另一个 UNIX 操作系统）

除了发行版，我们还有其他类别。 特别是通过 Marketplace，只需单击一下，我们就可以安装预配置了 WordPress，Ghost，LAMP 服务器或 150 多个应用程序中的任何一个的服务器。 这是快速启动和运行任何项目的一种非常方便的方法。

快照，备份和自定义映像使您可以从已有的服务器创建服务器。

现在您已经知道在这里可以做的一切，让我们从**Distributions**面板中选择 Ubuntu 20.04。

![选择计划.png](https://i.loli.net/2020/08/20/nq1dN6Q7MaAFyel.png)

在**Choose a plan**中，您可以在“标准”计划（我们将使用的计划）或性能更高的“ CPU 优化”或“内存优化”服务器之间进行选择。 这意味着服务器将花费更多。

这里我们选择“标准”里的$5/mo（按时计费$0.007/hour），即可。

![选择数据中心区域.png](https://i.loli.net/2020/08/20/o4ZbYGMruQAzgPF.png)

接着我们选择数据中心区域，可以根据您所在位置和运营商来选择。不同的运营商对不同地方的线路优化不同，中国大陆用户建议使用新加坡地区的服务器。

![登陆验证方式.png](https://i.loli.net/2020/08/20/pgrnxvycewCY4PT.png)

接下来还有其他选项，您可以跳过，让我们选择登录 VPS 的验证方式：

选择“密码”可以简化操作，但是对于真实服务器，我建议使用 SSH 密钥身份验证（设置更复杂，但更安全）。

输入您要用于 root 用户（Linux 系统管理员）的密码。

![填写机器名.png](https://i.loli.net/2020/08/20/vf4TkpCNEaIngo2.png)

然后填写对您有意义的机器名：

![Create Droplet.png](https://i.loli.net/2020/08/20/YU8d2k71rjTlOmD.png)

最后，点击**Create Droplet**按钮，DigitalOcean 将开始创建您的第一台 VPS。

一旦创建完成，它将会显示 VPS 的公网 IP 地址：

![创建成功.png](https://i.loli.net/2020/08/20/fA7qSDbYXWtLhFN.png)

单击机器名以显示 Droplet 仪表板：

![20200820-Droplet仪表板.png](https://i.loli.net/2020/08/20/HNPfbKX6RzcUs5L.png)

在这里您可以控制任何东西。 您可以将其开机、关机等等。

请记住，Droplet 关机并不会停止 DigitalOcean 计费：您必须销毁它才能停止计费。

## 三、连接您的第一台 VPS

连接的方法有许多，在 Windows 平台，您可以通过如[Xshell](https://www.netsarang.com/zh/xshell/)、[PuTTY](https://www.putty.org/)。我常用的是 Xshell，您只需在官网选择[家庭/学校版](https://www.netsarang.com/zh/free-for-home-school/)，注册即可免费使用。

![Xshell教育版.png](https://i.loli.net/2020/08/20/uBMlXJQWrvtZbRN.png)

下载并安装完 Xshell 后双击运行会弹出会话框，点击**新建**，然后按右侧所示依次填入名称（自定义）、主机（您的公网 IP）和端口号（默认是 22）：

![Xshell连接1.png](https://i.loli.net/2020/08/20/ZIrBeMjRAydVW2h.png)

接着点击**用户身份验证**，右侧依次填入 root（以超级管理员身份登陆）、密码（您创建时所设置的密码）：

![Xshell设置登陆密码.png](https://i.loli.net/2020/08/20/bdXYDZyExQarVv1.png)

然后点击连接，第一次连接会出现如下所示警告，选择**接受并保存**即可：

![接受并保存密钥.png](https://i.loli.net/2020/08/20/ylo6WFDK43heQLk.png)

出现如图所示信息即表示您已连接成功！！！

![Xshell连接成功.png](https://i.loli.net/2020/08/20/7zhlPawvTpGZuJF.png)

## 四、总结

现在，您可以完全控制位于世界某个地方的数据中心中的计算机。

这不是很酷吗？ 这仅仅是个开始。

接下来我将会写一系列文章介绍 VPS 的一些用途，敬请期待！
