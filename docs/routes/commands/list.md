---
title: lerna/list
---

# `@lerna/list`

> 列出本地包

[英文原地址](https://github.com/lerna/lerna/tree/master/commands/list#readme)

安装 lerna 以访问`lerna` CLI。

## 使用

`list`子命令有多个简写(和[npm ls](https://docs.npmjs.com/cli/ls))

- `lerna ls`: 和`lerna list`相同。
- `lerna ll`: 等同于`lerna ls -l`。
- `lerna la`: 等同于`lerna ls -la`。显示所有的包(包括子包)。

```shell
lerna ls
package-1
package-2
```

在 shell 中运行这些命令时，您可能会注意到 `lerna`提供了额外的日志记录。请放心，它们不会污染您的命令，因为所有的日志都是按照`strerr`发送的而非`stdout`。

在任何情况下，你可以随时通过`--loglevel silent`恢复原始的 shell 显示。

## 配置项

`lerna ls`还支持所有可用的[过滤器](https://www.npmjs.com/package/@lerna/filter-options)。

以 JSON 数组的形式展示信息。

```shell
$ lerna ls --json
[
  {
    "name": "package-1",
    "version": "1.0.0",
    "private": false,
    "location": "/path/to/packages/pkg-1"
  },
  {
    "name": "package-2",
    "version": "1.0.0",
    "private": false,
    "location": "/path/to/packages/pkg-2"
  }
]
```


























