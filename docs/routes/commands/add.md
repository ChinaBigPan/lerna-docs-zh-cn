---
title: lerna/add
sidebarDepth: 3
---

# `@lerna/add`

> 向匹配的包添加依赖关系

[英文原地址](https://github.com/lerna/lerna/tree/master/commands/add#readme)

安装 lerna 以访问`lerna` CLI。

## 使用

```bash
lerna add <package>[@version] [--dev] [--exact] [--peer]
```

将本地或远程`package`作为依赖项添加到当前 Lerna 仓库中的包。注意，与`yarn add`或`npm install`相比，一次只能添加一个包。

运行时，该命令将：

1. 向每个适用的包添加`package`。适用是指在作用域内且不是`package`的包。
2. 对`manifest`文件(`package.json`)进行更改的引导包。

如果没有提供`version`指示符，其默认值为`latest`dist-tag，和`npm install`一样。

## 配置项

`lerna add`接受所有的[过滤器参数](https://www.npmjs.com/package/@lerna/filter-options)

### `--dev`

将新包添加到`devDependencies`而不是`dependencies`。

### `--exact`

```bash
lerna add --exact
```

为新包添加一个确切的版本(例如，`1.0.1`)，而不是默认的`^`语义化版本号范围(例如，`^1.0.1`)。

### `--peer`

将新包添加到`peerDependencies`而不是`dependencies`。

### `--registry <url>`

使用自定义注册表安装目标包。

### `--no-bootstrap`

跳过链式的`lerna bootstrap`。

## 示例

```bash
# 将 module-1 的包添加到以“prefix-”为前缀文件夹中的包中
lerna add module-1 packages/prefix-*

# 将 module-1 安装到 module-2
lerna add module-1 --scope=module-2

# 将 module-1 安装到 module-2 的 devDependencies
lerna add module-1 --scope=module-2 --dev

# 将 module-1 安装到 module-2 的 peerDependencies
lerna add module-1 --scope=module-2 --peer

# 将 module-1 安装到除了 module-1 的所有模块
lerna add module-1

# 在所有模块中安装 babel-core
lerna add babel-core
```



















