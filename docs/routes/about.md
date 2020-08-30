---
title: 关于
---

# 关于

将大型的代码库拆分为独立的带版本的包(independently versioned package)对于代码共享非常有用。不过可惜的是，跨多个库进行内容梗概既混乱又很难跟踪，同时也让测试雪上加霜。

为了解决这些(以及其它一些)问题，一些项目将它们的代码库拆分到多个包存储库(有时候也称为单一存储库)中。业内知名的 Babel、React、Angular、Ember、Meteor、Jest 等项目都在一个单独的存储库中开发它们的所有包。

**Lerna 是一个使用 git 和 npm 优化多包存储库管理工作流的工具。**

Lerna 还可以减少开发和构建环境中大量重复包的时间和空间需求 —— 这通常是将项目划分为许多单独的 NPM 包的缺点。有关详细信息，请参阅[hoist 文档](https://github.com/lerna/lerna/blob/master/doc/hoist.md)。

## Lerna 仓库的结构

您的文件结构应该是这样的:

```text
my-lerna-repo/
  package.json
  packages/
    package-1/
      package.json
    package-2/
      package.json
```

## Lerna 能做什么

Lerna 中的两个主要命令是`lerna bootstrap`和`lerna publish`。

`bootstrap`将把仓库中的依赖项链接在一起。`publish`将帮助发布任意的更新包。

## Lerna 不能做什么

Lerna 不是一个针对无服务器单存储库(serverless monorepo)部署工具。Hoist 可能与传统的无服务器的单存储库部署技术并不兼容。
