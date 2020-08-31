---
title: lerna/publish
---

# `@lerna/publish`

## 使用

```bash
lerna publish              # 发布自上一个版本以来发生了变化的包
lerna publish from-git     # 发布当前提交中标记的包
lerna publish from-package # 发布注册表中没有最新版本的包
```

在运行时，该命令做了下面几件事中的一个：

- 发布自上一个版本以来更新的包(背后调用了[lerna version](https://github.com/lerna/lerna/tree/master/commands/version#readme))。
    - 这是 lerna 2.x 版本遗留下来的。
- 发布在当前提交中标记的包(`from-git`)。
- 发布在最新提交时注册表中没有版本的包(`from-package`)。
- 发布在前一次提交中更新的包(及其依赖项)的“金丝雀(canary)”版。

::: warning 注意
Lerna 永远不会发布标记为`private`的包（`package.json`中的`”private“: true`）
:::

在所有的发布过程中，都有[生命周期](https://github.com/lerna/lerna/tree/master/commands/publish#lifecycle-scripts)在根目录和每个包中运行(除非使用了`--ignore-scripts`)。

请查看[每个包的配置](https://github.com/lerna/lerna/tree/master/commands/publish#per-package-configuration)以了解发布作用域限定的包、自定义注册表和自定义标记的详细信息。

## 位置

### `from-git`

除了 [lerna version](https://github.com/lerna/lerna/tree/master/commands/version#positionals) 支持的语义化版本关键字外，`lerna publish`也支持`from-git`关键字。这将会识别`lerna version`标记的包，并将它们发布到 npm。这在您希望手动增加版本的 CI 场景中非常有用，但要通过自动化过程一直地发布包内容本身。

### `from-package`

与`from-git`关键字类似，只是要发布的包列表是通过检查每个`package.json`确定的，并且要确定注册表中是否存在任意版本的包。注册表中没有的任何版本都将被发布。当前一个`lerna publish`未能将所有包发布到注册表时，就是他发挥的时候了。

## 配置项

`lerna publish`支持`lerna version`提供的所有配置项，除了以下这些：

### `--canary`

```shell
lerna publish --canary
# 1.0.0 => 1.0.1-alpha.0+${SHA} of packages changed since the previous commit
# a subsequent canary publish will yield 1.0.1-alpha.1+${SHA}, etc

lerna publish --canary --preid beta
# 1.0.0 => 1.0.1-beta.0+${SHA}

# The following are equivalent:
lerna publish --canary minor
lerna publish --canary preminor
# 1.0.0 => 1.1.0-alpha.0+${SHA}
```

当使用该标志运行时，`lerna publish`以更粒度的方式(每次提交)来发布包。在发布到 npm 之前，它会通过当前的`version`创建新的`version`标记，升级到下一个小版本(minor)，添加传入的 meta 后缀(默认为`alpha`)并且附加当前的 git sha 码（例如：`1.0.0`变成`1.1.0-alpha.0+81e3b443`）。

如果您已经从 CI 中的多个活动开发分支发布了 canary 版本，那么建议在每个分支的基础上定制`[--preid](https://github.com/lerna/lerna/tree/master/commands/publish#--preid)`和`[--dist-tag <tag>](https://github.com/lerna/lerna/tree/master/commands/publish#--dist-tag-tag)`以避免版本冲突。

> 该参数是需要发布每次提交版或每日构建版时使用。

### `--contents <dir>`

要发布的子目录。必定应用于所有包，且必须包含 package.json 文件。包的生命周期仍然在原来的叶子目录中运行。您应当使用其中的一个生命周期(`prepare`、`prepublishOnly`或`prepack`)来创建子目录等等。

如果您不喜欢非必要的复杂发布，这将给您带来乐趣。

```shell
lerna publish --contents dist
# 发布每个由 Lerna 管理的叶子包的 dist 文件夹
```

::: tip 注意
您应该等到`postpublish`生命周期阶段(根目录或叶目录)才清理这个生成的子目录，因为生成的 package.json 是在包上传期间(在`postpack`之后)使用的。
:::

### `--dist-tag <tag>`

```shell
lerna publish --dist-tag next
```

当带有该参数时，`lerna publish`将使用给定的 npm [dist-tag](https://docs.npmjs.com/cli/dist-tag)(默认为`latest`) 发布到 npm。

该配置项可用于在非`latest`的 dist-tag 下发布[预发布](http://carrot.is/coding/npm_prerelease)或`beta`版本，帮助用户免于自动升级到预发布质量的代码。

::: tip 注意
`latest`标记是用户运行`npm install my-package`时使用的标记。要安装不同的标记，用户可以运行`npm install my-package@prerelease`。
:::

### `--git-head <sha>`























