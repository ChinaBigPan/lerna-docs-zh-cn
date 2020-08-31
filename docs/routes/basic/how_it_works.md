---
title: 如何工作的？
---

# 它是如何工作的

Lerna 允许您使用两种模式来管理您的项目：固定模式(Fixed)或独立模式(Independent)。

## 固定模式(默认)

固定模式的 Lerna 项目以单一版本来操作。版本信息在`lerna.json`文件的`version`处。当您运行`lerna publish`时，如果自上次发布以来模块已经更新，那么它将被更新为您正在发布的新版本。这意味着您可以按需发布新版本的包.

::: warning 注意
如果您的主版本是`0`，那么所有的更新都会被认为是[破坏性更新](https://semver.org/#spec-item-4)。因此在主版本为`0`时运行`lerna publish`并选择任何非预发行版本号将导致对所有包发布新版本，就算并非您的所有的包自上个版本以来都发生了更改也会这样。
:::

这是 Babel 目前使用的模式。如果你想讲所有包版本自动地绑定在一起，请使用该功能。这种方法的一个问题是，任何包中的主要更改都会导致所有的包都有了一个新的主版本。

## 独立模式

`lerna init --independent`

独立模式的 Lerna 项目允许维护人员独立地增加包版本号。每次发布时，您都会收到一个提示，用以说明每个更改过的包是补丁(patch)、小更改(minor)、大更改(major)还是自定义更改(custom change)。

独立模式允许您更具体地址更新每个包的版本，对一组组件也有意义。将这种模式与[semantic-release](https://github.com/semantic-release/semantic-release)结合起来可以方便您的开发。（[atlassian/lerna-semantic-release](https://github.com/atlassian/lerna-semantic-release)上已有这方面的工作）。

> 将`lerna.json`中的`version`设置为`independent`可以运行独立模式。

