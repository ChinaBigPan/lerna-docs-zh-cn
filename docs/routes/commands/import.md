---
title: lerna/import
sidebarDepth: 3
---

# `@lerna/import`

> 将一个包导入到带有提交历史记录的`monorepo`中

[英文原地址](https://github.com/lerna/lerna/tree/master/commands/import#readme)

安装 lerna 以访问`lerna` CLI。

## 使用

```bash
lerna import <path-to-external-repository>
```

将位于`<path-to-external-repository>`处的带有提交历史记录的包导入到`packages/<directory-name>`中。原始提交作者、日期和消息保存了下来。提交应用于当前分支。

这对于将预先存在的独立的包收集到 Lerna 仓库非常有用。每次提交都修改为相对于包目录进行更改。例如，添加`package.json`的提交将改为添加`packages/<directory-name>/package.json`。

::: tip 注意
如果要在新的 lerna 存储库上导入外部存储库，那么一定要记住至少进行一次提交。
:::

```bash
# Lerna 起始
git init lerna-repo && cd lerna-repo
npx lerna init
npm install

# 提交一次
git add .
git commit -m "Initial lerna commit" # 如果没有提交会报错

# 引入其他库
npx lerna import <path-to-external-repository>
```

## 配置项

### `--flatten`

当导入带有冲突合并提交的存储库时，`import`命令在尝试应用所有提交时将失败。用户可以使用这个标志来请求“抹平(flat)”历史的导入，也就是说，在每次合并提交时，合并就会被引入。

```bash
lerna import ~/Product --flatten
```

### `--dest`

在导入存储库时，可以根据`lerna.json`中列出的目录指定目标目录。

```bash
lerna import ~/Product --dest=utilities
```

### `--preserve-commit`

每次`git`提交都有一位**作者**和一位**提交者**(每人都有一个单独的日期)。通常他们是同一个人(和日期)，但是因为`lerna import`从外部存储库重新创建每个提交，**提交者**就变成了当前的`git`用户(和日期)。这在技术上是正确的，但可能并不可取，例如，在 Github 上，如果**作者**和**提交者**是不同的人，它就会同时显示他们，这可能会导致导入提交时的历史/职责出现混乱。

启用该配置项可以保留原始提交者(和提交日期)，以避免此类问题。

```bash
lerna import ~/Product --preserve-commit
```
