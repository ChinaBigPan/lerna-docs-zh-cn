---
title: lerna/bootstrap
sidebarDepth: 3
---

# @lerna/bootstrap

> 将本地包链接在一起并安装剩余的包依赖项

[英文原地址](https://github.com/lerna/lerna/tree/master/commands/publish#readme)

安装 lerna 以访问`lerna` CLI。

## 使用

```shell
lerna bootstrap
```

引导当前 Lerna 仓库中的包。安装器所有·依赖项并连接所有的交叉依赖。

在运行时，该命令：

1. `npm install`每个包所有的外部依赖。
2. 将所有相互依赖的 Lerna `package`符号链接在一起。
3. 在所有引导包中运行`npm run prepublish`(除非传入了`--ignore-prepublish`)。
4. 在所有引导包中运行`npm run prepare`。
   
`lerna bootstrap`接受所有[过滤器属性](https://www.npmjs.com/package/@lerna/filter-options)

通过将额外的参数放在`--`之后来传递给 npm 客户端：

```shell
lerna bootstrap -- --production --no-optional
```

在`lerna.json`中这样配置：

```json
{
  "npmClient": "yarn",
  "npmClientArgs": ["--production", "--no-optional"]
}
```

### --hoist [glob]

在仓库根目录安装与`glob`匹配的外部依赖，这样所有包都可以使用他们。这些依赖的任何二进制文件都将链接到依赖包的`node_modules/.bin/`目录中，这样 npm 脚本就可以使用它们了。如果传了该参数但却没有设置`glob`，则默认为`**`(提升所有)。该配置项仅影响`bootstrap`命令。

```shell
lerna bootstrap --hoist
```

关于`--hoist`，请参阅文档[hoist documentation](https://github.com/lerna/lerna/blob/master/doc/hoist.md)

::: warning 注意
如果包依赖于不同版本的外部依赖项，则会将最常用的版本提升，并发出警告。
:::

`--hoist`与`file：`标识符[不兼容](https://github.com/lerna/lerna/issues/1679#issuecomment-461544321)，请只使用一个。

### --strict

当和`hoist`一起使用时，会抛出一个错误，并在发出版本警告后停止引导。如果没有`hoist`或没有版本警告则无效果。

### --nohoist [glob]

**不要**在仓库根目录安装与`glob`匹配的外部依赖项。该参数可以用来选择不提升某些依赖项。

```shell
lerna bootstrap --hoist --nohoist=babel-*
```

### --ignore

```shell
lerna bootstrap --ignore component-*
```

该参数与`bootstrap`命令一起使用时，也可以在`lerna.json`的`command.bootstrap.ignore`中设置。命令行中设置该参数优先于`lerna.json`。

```json
{
  "version": "0.0.0",
  "command": {
    "bootstrap": {
      "ignore": "component-*"
    }
  }
}
```

::: tip 提示
通配符匹配的是`package.json`中定义的包名，而不是与包所在的目录名。
:::

## 配置项

### `--ignore-prepublish`

跳过在引导包中默认运行的预发布生命周期脚本。注意，这个生命周期是[已废弃的](https://docs.npmjs.com/misc/scripts#deprecation-note)，可能会在Lerna 的下一个主要版本中被删除。

```shell
lerna bootstrap --ignore-prepublish
```

### `--ignore-scripts`

跳过在引导包中正常运行的生命周期脚本(`prepare`等等)。

```shell
lerna bootstrap --ignore-scripts
```

### `--registry <url>`

当使用该参数时，转发的 npm 命令将为您的包使用指定的注册表。

如果您不想在使用私有注册表时在所有 package.json 文件中分别设置注册表配置，那么这就是它出场的时候了。

### `--npm-client <client>`

它必须是一个知道如何安装 npm 包依赖的可执行文件。默认的`--npm-client`是`npm`。

```shell
lerna bootstrap --npm-client=yarn
```

也可在`lerna.json`中配置：

```json
{
  "npmClient": "yarn"
}
```

### `--use-workspaces`

[Yarn Workspaces]:https://github.com/yarnpkg/rfcs/blob/master/implemented/0000-workspaces-install-phase-1.md

支持和 [yarn 工作区][Yarn Workspaces] (从yarn@0.27+版本开始)数组中的值是 Lerna 将在其中委托操作给 Yarn 的命令(目前仅在 bootstrap 中可用)。如果`--use-workspaces`为真，那么`packages`将被`package.json/workspaces`的值覆盖。

也可在`lerna.json`中配置：

```json
{
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

根级别的 package.json 还必须包含一个工作区数组:

```json
{
  "private": true,
  "devDependencies": {
    "lerna": "^2.2.0"
  },
  "workspaces": ["packages/*"]
}
```

这个列表与 lerna 的 `package`配置大体上类似(通过 package.json 用通配符匹配的目录列表)，只是它不支持递归的通配符匹配(`**`，也叫“globstars”)

### `--no-ci`

[npm ci]:https://docs.npmjs.com/cli/ci

当使用默认的`--npm-client`，`lerna bootstrap`将调用[npm ci][npm ci]而非在 CI 环境中调用`npm install`。若要禁用此行为，可以使用`--no-ci`:

```shell
lerna bootstrap --no-ci
```

若要在本地安装期间强制执行(在本地安装中不会自动启用)，请使用`--ci`：

```shell
lerna bootstrap --ci
```

这对于“干净的”重新安装或重新克隆后的初次安装非常有用。

### `--force-local`

```shell
lerna bootstrap --force-local
```

当使用该参数时，它会让`bootstrap`命令始终符号链接本地依赖项，而不考虑匹配的版本范围。

### `publishConfig.directory`

这个*非标准*字段允许您自定义符号链接子目录，它会作为符号链接的源目录，就像使用已发布的包一样。

```json
"publishConfig": {
  "directory": "dist"
}
```

在本例中，当这个包被引导并链接时，`dist`目录将是源目录(例如`package-1/dist => node_modules/package-1`)。

## 它是怎么工作的？

让我们以`babel`为例：

[babel package.json]:https://github.com/babel/babel/blob/13c961d29d76ccd38b1fc61333a874072e9a8d6a/packages/babel-core/package.json#L28-L47

- `babel-generator`和`source-map`(以及其他)是`babel-core`的依赖项。
- `babel-core`的[package.json][babel package.json]将这两个包作为`dependencies`中列出，如下所示。

```json
// babel-core package.json
{
  "name": "babel-core",
  // ...
  "dependencies": {
    // ...
    "babel-generator": "^6.9.0",
    // ...
    "source-map": "^0.5.0"
  }
}
```

- Lerna 会检查每个依赖项是否也是 Lerna 仓库的一部分。
    - 在本例中，`babel-generator`可以是内部依赖项，而`source-map`始终是外部依赖项。
    - `babel-core`的`package.json`中的`babel-generator`版本通过`packages/babel-generator`来对应，传递内部依赖项。
    - `source-map`和正常一样使用`npm install`(或`yarn`)安装。
- `packages/babel-core/node_modules/babel-generator`符号链接到`packages/babel-generator`
- 允许目录嵌套引入。

## 注意

- 当仓库中相同名称的包不能满足包中的依赖版本时，它将像往常一样以`npm install`或`yarn`的方式安装。
- 类似`latest`的 Dist-tag，并不满足[语义化版本](https://semver.npmjs.com/)范围。
- 循环依赖会导致循环符号链接，这可能会影响编辑器/IDE。

[WebStorm]:https://www.jetbrains.com/webstorm/

[WebStorm][WebStorm]会在出现循环符号链接时锁定。为了防止这种情况，在`首选项(Preferences) => 编辑器(Editor) => 文件类型(File Types) => 忽略文件和文件夹(Ignored files and folders)`列表中添加`node_modules`。






