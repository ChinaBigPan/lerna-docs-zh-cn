---
title: 全局配置项
sidebarDepth: 3
---

# `@lerna/global-options`

> 适用于每个 lerna 子命令的全局配置项

[英文原地址](https://github.com/lerna/lerna/blob/master/core/global-options)

## 配置项

当 Lerna 将任务并行执行时，需要使用多少线程(默认为逻辑 CPU 内核数)。

```bash
lerna publish --concurrency 1
```

### `--loglevel <silent|error|warn|success|info|verbose|silly>`

要报告什么级别的日志。如果失败，所有日志都写到当前工作目录中的 lerna-debug.log 中。

任何高于该设置的日志都会显示出来。默认值是“info”。

### `--max-buffer <bytes>`

为每个底层进程调用设置的最大缓冲区长度。例如，当有人希望在运行`lerna import`的同时导入包含大量提交的仓库时，就是它出场的时候了。在这种情况下，内置的缓冲区长度可能不够。

### `--no-progress`

禁用进度条。在 CI 环境中总是这样。

### `--no-sort`

默认情况下，所有任务都按照拓扑排序的顺序在包上执行，以尊重所讨论的包的依赖关系。在不保证 Lerna 调用一致的情况下，以最努力的方式打破循环。

如果只有少量的包邮许多依赖项，或者某些包执行的时间长得不成比例，拓扑排序可能会导致并发瓶颈。`--no-sort`配置项禁用排序，而是以最大并发的任意顺序执行任务。

如果您运行多个`watch`命令，该配置项也会有所帮助。因为`lerna run`将按照拓扑排序的顺序执行命令，所以在继续执行之前可能会等待某个命令。当您运行"watch"命令时会阻塞执行，因为他们通常不会结束。这里有一个`watch`命令运行`babel`的[示例](https://babeljs.io/docs/usage/cli/#babel-compile-files)

### `--reject-cycles`

如果(在`bootstrap`、`exec`、`publish`或`run`中)发现循环，则立即失败。

```bash
lerna bootstrap --reject-cycles
```
