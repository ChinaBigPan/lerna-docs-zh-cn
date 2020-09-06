---
title: Lerna Hoisting
sidebarDepth: 3
---

# Lerna Hoisting

[英文原地址](https://github.com/lerna/lerna/blob/master/doc/hoist.md)

::: warning 注意
启用此功能时要小心，因为某些配置可能会导致问题。
:::

## 原理

当整个项目被划分为多个 NPM 包时，这种组织性的改进通常是有代价的：不同的包在它们的`package.json`文件中经常有许多重复的依赖关系，这就导致在不同的`node_modules`目录中有成百上千个重复的文件。Lerna 让由许多 NPM 包组成的项目变得更容易管理，可能会无意中加剧这个问题。

幸运的是，Lerna 还提供了一个特性来改善这种情况 --- Lerna 可以通过将依赖关系“提升”到最顶层的 Lerna 项目级别的`node_modules`目录来减少开发和构建环境中对大量包副本的时间和空间需求。

`--hoist`在使用时是透明的，是一种运行时优化，理想情况下不需要对项目进行任何其他修改。当使用`--hoist`时：

- 公共依赖项将只安装到顶层的`node_modules`，单个包的`node_modules`中会省略。
- 大多数常见的依赖项仍然会被提升，但是不同版本的离群包会得到一个正常的、本地`node_modules`安装的必要依赖项。
    - 在这个实例中，不管客户端如何配置，`lerna bootstrap`将始终使用带有`--global-style`参数的`npm install`。
- 来自这些通用包的二进制文件被符号链接到单独的包的`node_modules/.bin`目录，因此`package.json`脚本可以继续起作用，而无需修改。
- 基于 Node 的高性能库应该可以不经过修改就可以继续工作。

## 缺点

### 模块解析（Module resolution）

[Node 模块解析算法]:https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders

[Node 模块解析算法][Node 模块解析算法]是递归的：当查找包 A 时，它会在本地的`node_modules/A`目录中查找，然后依次是`../node_modules/A`、`../../node_modules/A`、`../../../node_modules/A`等。

遵循此规范的工具可以轻松找到已被提升的依赖项。

不幸的是，一些工具没有严格遵循模块解析规范，而是假设或要求依赖项具体地出现在本地`node_modules`目录中。要解决这个问题，可以将包从其提升的顶层位置符号链接到单独的包`node_modules`目录。Lerna 还不能自动完成这项工作，因此建议与工具维护人员一起迁移到更兼容的模式。

### 忘记依赖（Forgetting dependencies）

Lerna 将提升在多个项目中使用的依赖项，即使它们并非在所有项目都使用了。

因此，即使您忘记在包的`package.json`文件中指定该依赖项，您的包也将能够`import`或`require`已被提升的任何依赖项。

测试会被顺利通过，并且您可能直到稍后尝试在 monorepo 之外使用此包时才会意识到它的一些依赖项丢失了。

(这个问题并不是 lerna 特有的。也可能是[npm flattening](https://medium.com/pnpm/pnpms-strictness-helps-to-avoid-silly-bugs-9a15fb306308)的结果。)

为了避免这个问题，我们可以使用[eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)包，它具有`no-extraneous-dependencies`规则，可以在从未指定的包进行导入时发出警告。在“推荐”配置中默认启用。否则的话，我们只好人工检查所有新的导入是否来自`package.json`中指定的包了。
