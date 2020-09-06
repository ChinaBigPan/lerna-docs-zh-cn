---
title: lerna/clean
sidebarDepth: 3
---

# `@lerna/clean`

> 从所有包中删除`node_modules`目录

[英文源链接](https://github.com/lerna/lerna/tree/master/commands/clean#readme)

安装 lerna 以访问`lerna` CLI。

## 使用

```bash
lerna clean
```

`lerna clearn`接受所有的[过滤器参数](https://www.npmjs.com/package/@lerna/filter-options)，以及`--yes`

::: tip
`lerna clean`不会从根`node_modules`目录中删除模块，即使您使用了`--hoist`。
:::



