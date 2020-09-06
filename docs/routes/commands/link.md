---
title: lerna/link
sidebarDepth: 3
---

# `@lerna/link`

> 将所有相互依赖的包符号链接在一起

[英文原地址](https://github.com/lerna/lerna/tree/master/commands/link#readme)

安装 lerna 以访问`lerna` CLI。

## 使用

```bash
lerna link
```

将当前 Lerna 仓库中相互依赖的所有 Lerna `packages`符号链接在一起。

## 配置项

### `--force-local`

```bash
lerna link --force-local
```

当使用该参数时，此标志将导致`link`命令始终符号链接本地依赖项，而不考虑匹配的版本范围。

### `publishConfig.directory`

这是一个**非标准**字段，它将允许您定制作为符号链接的源目录的符号链接子目录，就像使用已发布的包一样。

```json
"publishConfig": {
    "directory": "dist"
}
```

在这个例子中，当该包连接时，`dist`目录将成为源目录(例如，`package-1/dist => node_modules/package-1`)。



