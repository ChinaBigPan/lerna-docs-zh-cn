---
title: 过滤器配置项
sidebarDepth: 3
---

# `@lerna/filter-options`

> 需要过滤的 lerna 子命令的选项

[英文原地址](https://github.com/lerna/lerna/tree/master/core/filter-options)

## 配置项

### `--scope <glob>`

只包含名称与给定通配符匹配的包。

```bash
lerna exec --scope my-component -- ls -la
lerna run --scope toolbar-* test
lerna run --scope package-1 --scope *-2 lint
```

::: tip
对于某些通配符，可能有必要传入配置项参数以避免过早的 shell 扩展。
:::

### `--ignore <glob>`

排除名称与给定通配符匹配的包。

```bash
lerna exec --ignore package-{1,2,5}  -- ls -la
lerna run --ignore package-1  test
lerna run --ignore package-@(1|2) --ignore package-3 lint
```

[这里](https://github.com/lerna/lerna/blob/c0a750e0f482c16dda2f922f235861283efbe94d/commands/list/__tests__/list-command.test.js#L305-L356)有更多示例

### `--no-private`

排除私有的包。默认情况下是包含它们的。

### `--since [ref]`

只包含自指定`ref`以来已经改变的包。如果没有传递`ref`，它默认为最近的标记。

```bash
# 列出自最新标记以来发生变化的包的内容
$ lerna exec --since -- ls -la

# 为自“master”以来所有发生更改的包运行测试
$ lerna run test --since master

# 列出自“某个分支”以来发生变化的所有包
$ lerna ls --since some-branch
```

在 CI 中使用时， 如果您可以获得 PR 将要进入的目标分支，那么它将特别有用，因为您可以将其作为`--since`配置项的`ref`。这对于进入`master`和`feature`分支的 PR 来说很有效。

### `--exclude-dependents`

当使用`--since`运行命令时，排除所有传递的被依赖项，覆盖默认的“changed”算法。

如果没有`--since`该参数时无效的，会抛出错误。

### `--include-dependents`

在运行命令时包括所有传递的被依赖项，无视`--scope`、`--ignore`或`--since`。

### `--include-dependencies`

在运行命令时包括所有传递依赖项，无视`--scope`、`--ignore`或`--since`。

与接受`--scope`(`bootstrap`、`clean`、`ls`、`run`、`exec`)的任何命令组合使用。确保对任何作用域的包(通过`--scope`或`--ignore`)的所有依赖项(和 dev 依赖项)也进行操作。

::: tip 注意
这将会覆盖`--scope`和`--ignore`。

例如，如果一个匹配了`--ignore`的包被另一个正在引导的包所以来，那么它仍会照常工作。
:::

当您想要“设置”一个依赖于其他正在设置的包其中的一个包时，这是非常有用的。

```bash
lerna bootstrap --scope my-component --include-dependencies
# my-component 及其所有依赖项将被引导
```

```bash
lerna bootstrap --scope "package-*" --ignore "package-util-*" --include-dependencies
# 所有匹配 "package-util-*" 的包将被忽略，除非它们依赖于名称匹配 "package-*" 的包
```

### `--include-merged-tags`

```bash
lerna exec --since --include-merged-tags -- ls -la
```

在使用`--since`命令时，它包含来自合并分支的标记。这只有在从`feature`分支进行大量发布时才有用，通常情况下不推荐这样做。


