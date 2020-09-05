---
title: lerna/diff
sidebarDepth: 3
---

# `@lerna/diff`

> 显示自上次发布以来的所有包或单个包的区别

[英文原地址](https://github.com/lerna/lerna/tree/master/commands/diff#readme)

安装 lerna 以访问`lerna` CLI。

## 使用

```bash
lerna diff [package]

lerna diff
# 显示指定包的差异
lerna diff package-name
```

显示自上次发布以来的所有包或单个包的区别。

> 和`lerna changed`相类似。不过该命令运行的是`git diff`。

