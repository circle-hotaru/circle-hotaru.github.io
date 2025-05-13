---
title: "GitHub 自动创建前端项目版本号标签"
description: "通过 GitHub Workflow 自动创建版本号标签"
pubDate: "May 13 2025"
heroImage: "/blog-placeholder.png"
---

前端项目有版本号可以方便我们去追溯问题。一般推荐根据 [SemVer](https://semver.org) 规范更新版本号。

版本号格式：主版本号.次版本号.修订号，版本号递增规则如下：

主版本号：当你做了不兼容的 API 修改，
次版本号：当你做了向下兼容的功能性新增，
修订号：当你做了向下兼容的问题修正。
先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。

在前端项目中都有一个 package.json 文件，其中 version 字段可以被我们用于存储版本号。package.json 文件可以手动管理版本号，然后通过 GitHub Workflow 自动化创建对应的 git tag。管理流程：

1. 每次修改需根据 SemVer 规范更新 package.json 的版本号；
2. 开发分支合并到主分支后触发 GitHub Workflow 自动化创建对应的 git tag。

自动化创建 git tag 的 Workflow 文件内容如下：

```
name: Create Tag on Merge

on:
  push:
    branches:
      - master

jobs:
  tag:
    runs-on: ubuntu-latest

    permissions:
      contents: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Get version from package.json
        id: get_version
        run: |
          VERSION=$(node -p "require('./package.json').version")
          echo "version=v$VERSION" >> $GITHUB_OUTPUT

      - name: Check if tag already exists
        id: check_tag
        run: |
          git fetch --tags
          if git rev-parse "$TAG" >/dev/null 2>&1; then
            echo "Tag $TAG already exists. Skipping tag creation."
            echo "exists=true" >> $GITHUB_OUTPUT
          else
            echo "Tag does not exist."
            echo "exists=false" >> $GITHUB_OUTPUT
          fi
        env:
          TAG: ${{ steps.get_version.outputs.version }}

      - name: Create Git Tag
        if: steps.check_tag.outputs.exists == 'false'
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git tag $TAG
          git push origin $TAG
        env:
          TAG: ${{ steps.get_version.outputs.version }}
```
