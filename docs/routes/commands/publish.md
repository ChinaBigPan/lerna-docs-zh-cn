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

`--canary`

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





























