---
title: 'Mongoose Aggregate 查询过去一周数据'
description: '介绍如何使用Mongoose Aggregate查询过去一周数据,并提供详细的操作步骤。'
pubDate: 'May 11 2021'
heroImage: '/blog-placeholder-1.jpg'
---

## 需求

最近在使用 MongoDB 时遇到一个需求，就是查询过去一周内每天新增的用户数。我使用 Mongoose 来操作数据库，可以通过 aggregate 实现需求。

## 前提

user 模型：

```javascript
const UserSchema = mongoose.Schema(
  {
    username: { type: String, trim: true },
  },
  {
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  }
)

module.exports = mongoose.model('User', UserSchema)
```

日期格式：2021-04-11 02:18:51.418Z

## 分析

首先获取今天的日期，然后筛选出过去一周的用户，最后通过 `createTime` 进行分组。

## 实现

```javascript
const today = new Date()
const day = today.setDate(today.getDate() - 7)
const createTime = { $gte: new Date(day) }

const userGrowth = await UserModel.aggregate([
  { $match: { createTime } },
  {
    $project: {
      everyDay: { $substr: [{ $add: ['$createTime', 28800000] }, 0, 10] },
    },
  },
  {
    $group: {
      _id: '$everyDay',
      count: { $sum: 1 },
    },
  },
])
```

`$add` 操作是因为 MongoDB 存储的数据是按照世界时间存储的，加上 8 小时（毫秒）才是国内时间。

`$match` 在匹配 `createTime` 时，记得使用 `new Date()` 格式化 `day`，不然 `day` 只是个字符串，无法匹配。

## 参考

- https://mongoosejs.com/docs/api/aggregate.html
- https://www.cnblogs.com/greenteaone/p/11655543.html
