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

### `--allow-branch <glob>`

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

### `--amend`

```shell
lerna version --amend
# 保留 commit 的消息，并跳过 git push
```

当使用该参数运行时，`lerna version`将对当前提交执行所有更改，而不是添加一个新的。这在[持续集成(CI)](https://en.wikipedia.org/wiki/Continuous_integration)期间非常有用，可以减少项目历史记录中的提交数量。

为了防止意外的覆盖，这个命令将跳过`git push`(也就是说`--no-push`)。

### `--changelog-preset`

```shell
lerna version --conventional-commits --changelog-preset angular-bitbucket
```

默认情况下，changelog 预设值是[angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular#angular-convention)。在某些情况下，您可能需要使用另一个预设值或自定义一个。

预设值是常规更改日志的内置或可安装配置的名称。预设值可以作为包的全名或自动扩展的后缀进行传递(举个例子，`angular`扩展为`conventional-changelog-angular`)。

### `--conventional-commits`

```shell
lerna version --conventional-commits
```

[传统的提交规范]:https://conventionalcommits.org/
[确定版本]:https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump
[生成 CHANGELOG.md 文件]:https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli

当您使用这个参数运行时，`lerna version`将使用[传统的提交规范][传统的提交规范]来[确定版本][确定版本]并[生成 CHANGELOG.md 文件][生成 CHANGELOG.md 文件]。

[--no-changelog]:https://github.com/lerna/lerna/tree/master/commands/version#--no-changelog

传入[--no-changelog][--no-changelog]将阻止生成(或更新)`CHANGELOG.md`文件。

### `--conventional-graduate`

```shell
lerna version --conventional-commits --conventional-graduate=package-2,package-4

# 强制分隔所有的预发行包
lerna version --conventional-commits --conventional-graduate
```

当使用该参数时，`lerna version`将使用`*`分隔指定的包(用逗号隔开的)或所有的包。无论当前的 HEAD 是否已释放，该命令都可以工作，它和`--force-publish`相类似，除了忽略任何非预发布包。如果未指定的包(如果指定了包)或未预先发布的包发生了更改，那么这些包将按照它们通常使用的`--conventional-commits`提交的方式进行版本控制。

“分隔”一个软件包意味着一个预发布版本的非预发布版本变体。例如`package-1@1.0.0-alpha.0 => package-1@1.0.0`。

> 注意：当指定包时，它的依赖项将被释放，但不会被分隔。

### `--conventional-prerelease`

```shell
lerna version --conventional-commits --conventional-prerelease=package-2,package-4

# 强制所有发生改变的包变为预发布
lerna version --conventional-commits --conventional-prerelease
```

当使用该参数时，`lerna version`将使用`*`分隔指定的包(用逗号隔开的)或所有的包。通过在`conventional-commits`的版本推荐之前加上`pre`，可以将所有未发布的更改作为 pre (patch/minor/major/release)版来发布。如果当前的更改包含了特性提交，那么推荐的版本将成为`minor`，因此该参数会使其成为`preminor`发布。如果未指定的包(如果指定了包)或未预先发布的包发生了更改，那么这些包将按照它们通常使用的`--conventional-commits`提交的方式进行版本控制。

### `--create-release <type>`

```shell
lerna version --conventional-commits --create-release github
lerna version --conventional-commits --create-release gitlab
```

当使用该参数时，`lerna version`将基于更改的包创建一个正式的 GitHub 或 GitLab 版本。需要传递`conventional-commits`以便生成变更日志。

要使用 GitHub 进行身份验证，可以定义以下环境变量。

- `GH_TOKEN`（必须）- 您的 GitHub 认证 token (在设置(Settings) > 开发人员设置(Developer Settings) > 个人访问令牌(Personal access tokens)下)。
- `GHE_API_URL` - 当使用 GitHub Enterprise 时，API 的绝对URL。
- `GHE_VERSION` - 当使用 GitHub Enterprise 时，当前安装的 GHE 版本。[支持以下版本](https://github.com/octokit/plugin-enterprise-rest.js)。

要使用 GitLab 进行身份验证，可以定义以下环境变量。

- `GL_TOKEN`（必须）- 您的 GitLab 认证 token (在用户设置(User Settings) > 访问令牌(Access Tokens)下)。
- `GL_API_URL` - API 的绝对URL，包括版本号。(默认值：https://gitlab.com/api/v4)

::: warning 注意
当使用该配置项的时候，不要设置`--no-changelog`
:::

该配置项也可以在`lerna.json`中配置：

```json
{
  "changelogPreset": "angular"
}
```

[预设配置]:https://github.com/conventional-changelog/conventional-changelog-config-spec

如果预先导出一个构件函数（如：`conventional-changelog-conventionalcommits`），您也可以指定[预设配置][预设配置]：

```json
{
  "changelogPreset": {
    "name": "conventionalcommits",
    "issueUrlFormat": "{{host}}/{{owner}}/{{repository}}/issues/{{id}}"
  }
}
```

### `--exact`

```shell
lerna version --exact
```

当使用该参数时，`lerna version`将在更新的包中精确地指定更新过的依赖项(无标点符号)，而不做语义化版本号兼容(使用`^`)。

[依赖关系]:https://docs.npmjs.com/files/package.json#dependencies

有关更多信息，请参见 package.json 文档的[依赖关系][依赖关系]。

### `--force-publish`

```shell
lerna version --force-publish=package-2,package-4

# 强制所有的包标上版本
lerna version --force-publish
```

当使用该参数时，`lerna version`将强制发布指定的包(逗号分隔)或使用`*`发布所有包。

::: tip 注意
这将跳过以更改包的`lerna changed`检查，并强制更新没有`git diff`更改的包。
:::

### `--git-remote <name>`

```shell
lerna version --git-remote upstream
```

当使用该参数时，`lerna version`将把 git 更改推送到指定的远程服务器，而不是`origin`。

### `--ignore-changes`

当检测到更改的包时，忽略由通配符匹配到的文件中的更改。

```shell
lerna version --ignore-changes '**/*.md' '**/__tests__/**'
```

该配置项最好通过`lerna.json`指定，既避免过早的 shell 验证也能够和`lerna diff`及`lerna changed`共享配置：

```json
{
  "ignoreChanges": ["**/__fixtures__/**", "**/__tests__/**", "**/*.md"]
}
```

使用`--no-ignore-changes`禁用任何现有的持久配置。

::: warning 在下列情况下，无论该配置项如何设置，包都会发布：
1. 该包的最新版本是`prerelease`版(即`1.0.0-alpha`，`1.0.0-0.3.7`等等)。
2. 包的一个或多个相关依赖项已发生更改。
::: 

### `--ignore-scripts`

[生命周期脚本]:https://github.com/lerna/lerna/tree/master/commands/version#lifecycle-scripts

当使用该参数时，`lerna version`会在运行期间禁用[生命周期脚本][生命周期脚本]

### `--include-merged-tags`

```shell
lerna version --include-merged-tags
```

在检测更改的包时包含合并分支的标记。

### `--message <msg>`

可简写为`-m`，用于`git commit`。

```shell
lerna version -m "chore(release): publish %s"
# commit message = "chore(release): publish v1.0.0"

lerna version -m "chore(release): publish %v"
# commit message = "chore(release): publish 1.0.0"

# 当单独对包进行版本控制时，不会替换占位符
lerna version -m "chore(release): publish"
# commit message = "chore(release): publish
#
# - package-1@3.0.1
# - package-2@1.5.4"
```

[commitizen]:https://github.com/commitizen/cz-cli
[语义化版本发布]:https://github.com/semantic-release/semantic-release

当使用该参数时，`lerna version`会在提交发布版本更新时使用所提供的消息。对于将 lerna 集成到期望提交消息遵守某些规则的项目中非常有用，例如使用[commitizen][commitizen]和/或[语义化版本发布][语义化版本发布]的项目。

如果消息包含`%s`，则将其替换为新的全局版本版本号，该版本号前缀为“v”。如果消息包含`%v`，它将被替换为新的全局版本版本号，但没有前缀“v”。注意，这个占位符插值只在使用默认的“固定”版本模式时使用，因为在独立版本控制时没有“全局”版本可以进行插值。

在`lerna.json`中这样配置：

```json
{
  "command": {
    "version": {
      "message": "chore(release): publish %s"
    }
  }
}
```

### `--no-changelog`

```shell
lerna version --conventional-commits --no-changelog
```

使用`--conventional-commits`时，不要生成任何`CHANGELOG.md`文件。

::: warning 注意
当使用该配置项的时候，不要设置`--create-release`
:::

### `--no-commit-hooks`

默认情况下，`lerna version`将允许 git commit 钩子在提交版本更改时运行。通过`——no-commit-hook`来禁用此行为。

[--commit-hooks]:https://docs.npmjs.com/misc/config#commit-hooks

该配置项类似于`npm version`的[--commit-hooks][--commit-hooks]配置项，只是反过来了。

### `--no-git-tag-version`

默认情况下，`lerna version`将提交对 package.json 文件的更改，并标记发行版。通过`——no-git-tag-version`可以禁用该行为。

[--git-tag-version]:https://docs.npmjs.com/misc/config#git-tag-version

该配置项与`npm version`的配置项[--git-tag-version][--git-tag-version]相类似，只是反过来了。

### `--no-granular-pathspec`

默认情况下，`lerna version`将在`git add`时只添加在版本控制过程中更改过的叶子包 manifest (可能还有更改日志)。这相当于`git add -- packages/*/package.json`，但是精确地定制了变化。

[pathspec]:https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddefpathspecapathspec

如果您**确定**需要不同的行为，您就会理解：通过`——no-granular-pathspec`来使 git 命令执行`git add -- .`。通过设置[pathspec][pathspec]，**您必须将所有秘密和构建输出适当地忽略掉，否则它们会被提交并推到仓库的。**

通过`lerna.json`设置：

```json
{
  "version": "independent",
  "granularPathspec": false
}
```

采用根级配置是有意为之，因为它还包括了`lerna publish`中的[同名配置项](https://github.com/lerna/lerna/tree/master/commands/publish#--no-granular-pathspec)。

### `--no-private`

默认情况下，`lerna version`将在选择版本、提交和标记发布时包含私有包。我们可以通过`--no-private`来禁用该行为。

[private scoped packages]:https://docs.npmjs.com/about-private-packages
[private field]:https://docs.npmjs.com/configuring-npm/package-json.html#private

::: tip 注意
该配置项并未将[私有作用域的包][private scoped packages]排除在外，只会排除 package.json 文件中`private`[字段][private field]设置为`true`的包。
:::

### `--no-push`

[git remote]:https://github.com/lerna/lerna/tree/master/commands/version#--git-remote-name

默认情况下，`lerna version`将提交和标记的更改推到已配置的 [git 远程服务器][git remote]。设置`--no-push`来禁用此行为。

### `--preid`

```shell
lerna version prerelease
# 使用下一个语义化预发布版本，如：
# 1.0.0 => 1.0.1-alpha.0

lerna version prepatch --preid next
# 通过制定的预发布标识符以使用下一个语义化预发布版本，如
# 1.0.0 => 1.0.1-next.0
```

[prerelease identifier]:http://semver.org/#spec-item-9

使用该参数时，`lerna version`将使用[指定的 prerelease 标识符][prerelease identifier]递增`premajor`、`preminor`、`prepatch`或`prerelease` 语义化版本号。

### `--sign-git-commit`

该配置项和`npm version`的同名[配置项](https://docs.npmjs.com/misc/config#sign-git-commit)相类似。

### `--sign-git-tag`

该配置项和`npm version`的同名[配置项](https://docs.npmjs.com/misc/config#sign-git-tag)相类似。

### `--force-git-tag`

该配置项将替换任意的现有标签，而非失败信息。

### `--tag-version-prefix`

该配置项允许设置自定义前缀，默认的前缀是:`v`。

::: tip 请记住
目前您必须设置两次：分别对应`version`命令和`publish`命令。
:::

```shell
# 本地
lerna version --tag-version-prefix=''
# 在 CI 上
lerna publish from-git --tag-version-prefix=''
```

### `--yes`

```shell
lerna version --yes
# 跳过 `Are you sure you want to publish these packages?`
```

当使用该参数运行时，`lerna version`将将跳过所有确认提示。在[持续集成(CI)](https://en.wikipedia.org/wiki/Continuous_integration)中用于自动回答发布确认提示。

## 已废弃配置项

> 既然是已废弃的，内容就不翻译了。

### `--cd-version`

### `--repo-version`

### `--skip-git`

## 提示

### 生成初始的更新日志

[conventional-changelog-cli]:https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli#readme
[lerna exec]:https://github.com/lerna/lerna/tree/master/commands/exec#readme

如果您在 monorepo 启动一段时间后才开始使用`--conventional-commits`配置项，您仍然可以使用[conventional-changelog-cli][conventional-changelog-cli]和[lerna exec][lerna exec]为以前的版本生成更改日志。

```shell
# Lerna does not actually use conventional-changelog-cli, so you need to install it temporarily
npm i -D conventional-changelog-cli
# Documentation: `npx conventional-changelog --help`

# fixed versioning (default)
# run in root, then leaves
npx conventional-changelog --preset angular --release-count 0 --outfile ./CHANGELOG.md --verbose
npx lerna exec --concurrency 1 --stream -- 'conventional-changelog --preset angular --release-count 0 --commit-path $PWD --pkg $PWD/package.json --outfile $PWD/CHANGELOG.md --verbose'

# independent versioning
# (no root changelog)
npx lerna exec --concurrency 1 --stream -- 'conventional-changelog --preset angular --release-count 0 --commit-path $PWD --pkg $PWD/package.json --outfile $PWD/CHANGELOG.md --verbose --lerna-package $LERNA_PACKAGE_NAME'
```

如果您使用`--changelog-preset`进行自定义，那么您应该相应地更改上面的示例中的`--preset`值。

## 生命周期

```js
// preversion:  在设置版本号之前运行.
// version:     在设置版本号之后，提交之前运行.
// postversion: 在设置版本号之后，提交之后运行.
```

[npm lifecycle scripts]:https://docs.npmjs.com/misc/scripts#description

lerna 将在`lerna version`期间运行[npm 生命周期脚本][npm lifecycle scripts]：

1. 侦测更改的包，选择版本号进行覆盖。
2. 在根目录运行`preversion`。
3. 对于每个更改的包，按照拓扑顺序(所有依赖项在依赖关系之前):    
    i. 运行`preversion`生命周期。   
    ii. 更新 package.json 中的版本。   
    iii. 运行`version`生命周期。   
4. 在根目录运行`version`生命周期。
5. 如果[可用](https://github.com/lerna/lerna/tree/master/commands/version#--no-git-tag-version)，将更改文件添加到索引。
6. 如果[可用](https://github.com/lerna/lerna/tree/master/commands/version#--no-git-tag-version)创建提交和标记。
7. 对于每个改变包，按照词法顺序(根据目录结构的字母顺序):    
    i. 运行`postversion`生命周期。
8. 在根目录运行`postversion`。
9. 如果[可用](https://github.com/lerna/lerna/tree/master/commands/version#--no-push)推动提交和标记到远程服务器。
10. 如果[可用](https://github.com/lerna/lerna/tree/master/commands/version#--create-release-type)创建发布。
    








