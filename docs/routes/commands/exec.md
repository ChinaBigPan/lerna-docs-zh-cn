---
title: lerna/exec
sidebarDepth: 3
---

# `@lerna/exec`

> 在每个包中执行任意命令

[英文原地址](https://github.com/lerna/lerna/tree/master/commands/exec#readme)

安装 lerna 以访问`lerna` CLI。

## 使用

```bash
lerna exec -- <command> [..args] # 在所有包中运行命令
lerna exec -- rm -rf ./node_modules
lerna exec -- protractor conf.js
```


































