---
title: lerna/version
sidebarDepth: 3
---

# `@lerna/version`

[英文原地址](https://github.com/lerna/lerna/tree/master/commands/version#lernaversion)

> 更改自上次发布以来的包版本号。

## 使用

```shell
lerna version 1.0.1 # 显式指定
lerna version patch # 语义化关键字
lerna version       # 根据提示选择
```

在运行时，该命令执行以下操作:

1. 标识自上一个版本以来更新的包。
2. 提示输入新版本。
3. 修改包的元数据，在根目录和每个包当中运行适当的生命周期脚本。
4. 提交这些更改并打上标记。
5. 推动到 git 远程服务器。

## 位置

### 语义化版本号

```shell
lerna version [major | minor | patch | premajor | preminor | prepatch | prerelease]
# 使用下一个语义化版本号，然后跳过“为…选择一个新版本”的提示。
```

当传递位置参数时，`lerna version`将跳过版本选择的提示问题并根据关键字[增加](https://github.com/npm/node-semver#functions)版本号。当然仍然需要使用`--yes`来避免所有的问题。

## 预发布

如果你有一个预发布版本号的软件包(例如`2.0.0-beta.3`)，并且你运行了`lerna version`和一个非预先发布的版本(`major`、`minor`或`patch`)，它将会发布那些之前发布的软件包以及自上次发布以来已经改变的软件包。

对于使用常规提交的项目，使用以下标志进行预发行管理：

[--conventional-prerelease]:https://github.com/lerna/lerna/tree/master/commands/version#--conventional-prerelease
[--conventional-graduate]:https://github.com/lerna/lerna/tree/master/commands/version#--conventional-graduate

- [--conventional-prerelease][--conventional-prerelease]: 将当前更改作为预发行版本发布。
- [--conventional-graduate][--conventional-graduate]: 将预发布版本的包升级为稳定版本。

如果不使用上面的参数运行`lerna version --conventional-commits`，则只有在版本已经在`prerelease`中时，才会将当前更改作为`prerelease`释放。

## 配置项

## `--allow-branch <glob>`

匹配启用了`lerna version`的 git 分支的白名单。在`lerna.json`中配置它是最简单的(我们也这么推荐)，但是也可以将它作为 CLI 配置项传入进去。

```json
{
  "command": {
    "version": {
      "allowBranch": "master"
    }
  }
}
```

使用上面的配置，`lerna version`在除`master`之外的任何分支运行时都将失败。最佳实践是将`lerna version`限制到主分支。

```json
{
  "command": {
    "version": {
      "allowBranch": ["master", "feature/*"]
    }
  }
}
```

在上面的配置中，`lerna version`将被允许出现在任何以`feature/`为前缀的分支中。请注意，在 feature 分支中生成 git 标签会产生潜在的错误，因为这些分支会被合并到主分支中。如果标签和其原始上下文“分离”开来(可能通过`squash merge`或`conflicted merge`提交)，那么未来的`lerna version`执行将很难确定正确的“自上一个版本以来的差异”。

使用命令行会覆盖这个“持久”的配置，请谨慎使用。

```shell
lerna version --allow-branch hotfix/oops-fix-the-thing
```

## `--amend`

```shell
lerna version --amend
# 保留 commit 的消息，并跳过 git push
```

当使用该参数运行时，`lerna version`将对当前提交执行所有更改，而不是添加一个新的。这在[持续集成(CI)](https://en.wikipedia.org/wiki/Continuous_integration)期间非常有用，可以减少项目历史记录中的提交数量。

为了防止意外的覆盖，这个命令将跳过`git push`(也就是说`--no-push`)。

## `--changelog-preset`

```shell
lerna version --conventional-commits --changelog-preset angular-bitbucket
```

默认情况下，changelog 预设值是[angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular#angular-convention)。在某些情况下，您可能需要使用另一个预设值或自定义一个。

预设值是常规更改日志的内置或可安装配置的名称。预设值可以作为包的全名或自动扩展的后缀进行传递(举个例子，`angular`扩展为`conventional-changelog-angular`)。

## `--conventional-commits`

```shell
lerna version --conventional-commits
```

当您使用这个参数运行时，`lerna version`将使用[传统的提交规范](https://conventionalcommits.org/)来[确定版本](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump)并[生成 CHANGELOG.md 文件](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)。

传入[--no-changelog](https://github.com/lerna/lerna/tree/master/commands/version#--no-changelog)将阻止生成(或更新)`CHANGELOG.md`文件。

## `--conventional-graduate`

```shell
lerna version --conventional-commits --conventional-graduate=package-2,package-4

# 强制所有的预发行包分级
lerna version --conventional-commits --conventional-graduate
```

When run with this flag, lerna version will graduate the specified packages (comma-separated) or all packages using *. This command works regardless of whether the current HEAD has been released, similar to --force-publish, except that any non-prerelease packages are ignored. If changes are present for packages that are not specified (if specifying packages), or for packages that are not in prerelease, those packages will be versioned as they normally would using --conventional-commits.

























