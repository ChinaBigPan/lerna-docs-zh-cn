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

















