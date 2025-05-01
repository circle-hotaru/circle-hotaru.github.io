---
title: '杀死那个MySQL-main process exited code=killed status=9/kill'
description: '分析并解决MySQL服务因系统内存不足而无法启动的问题,包括问题定位和解决方案。'
pubDate: 'Nov 25 2020'
heroImage: '/blog-placeholder.png'
---

## 引言

最近发现一个项目获取不到后端数据，于是登陆服务器查看一下情况，结果发现 MySQL 没有正常跑起来。

## 问题定位

运行`systemctl status mysql`发现失败原因是`main process exited code=killed status=9/kill`。Google 一下发现是因为系统内存不足。这就很奇怪了，这台服务器配置虽然是 1 核 1G，但是跑的项目并不多。

直接运行`top`命令发现有个 Java 项目在疯狂吃内存，推测原因是因为它`nohup`一直在后台运行导致内存不足。不过我对这方面还不是很了解，有朋友知道的话欢迎在下方评论区留言。

## 解决

知道问题出在哪里，下一步当然是去解决它啦。直接重启这个 Java 项目，然后发现 MySQL 也能正常跑起来。看来应该定时重启一下这个 Java 项目以免内存占用过大。

## Reference

[CentOS 7.4 MySQL 被杀的问题](https://www.tangyuecan.com/2018/12/08/centos-7-4-mysql%E8%A2%AB%E6%9D%80%E7%9A%84%E9%97%AE%E9%A2%98/)
