---
title: Lerna Hoisting
sidebarDepth: 3
---

# Lerna Hoisting

[英文原地址](https://github.com/lerna/lerna/blob/master/doc/hoist.md)

::: warning 注意
启用此功能时要小心，因为某些配置可能会导致问题。
:::

当整个项目被划分为多个 NPM 包时，这种组织性的改进通常是有代价的：不同的包在它们的`package.json`文件中经常有许多重复的依赖关系，这就导致在不同的`node_modules`目录中有成百上千个重复的文件。Lerna 让由许多 NPM 包组成的项目变得更容易管理，可能会无意中加剧这个问题。

幸运的是，Lerna 还提供了一个特性来改善这种情况 --- Lerna 可以通过将依赖关系“提升”到最顶层的 Lerna 项目级别的`node_modules`目录来减少开发和构建环境中对大量包副本的时间和空间需求。

`--hoist`在使用时是透明的，是一种运行时优化，理想情况下不需要对项目进行任何其他修改。当使用`--hoist`时：

- 

















