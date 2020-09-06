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

在每个包中执行任意命令。必须使用双横线`--`来将虚线参数传递给派生的命令，但当所有参数都是位置时，就不是必需的了。

当前包的名称可以通过环境变量`LERNA_PACKAGE_NAME`获取：

```bash
lerna exec -- npm view \$LERNA_PACKAGE_NAME
```

您也可以通过环境变量`LERNA_ROOT_PATH`在一个复杂的目录结构中运行一个位于根目录下的脚本：

```bash
lerna exec -- node \$LERNA_ROOT_PATH/scripts/some-script.js
```

## 配置项

`lerna exec`接受所有的[过滤器参数](https://www.npmjs.com/package/@lerna/filter-options)

```bash
lerna exec --scope my-component -- ls -la
```

> 使用给定的并发(除了`--parallel`)并行生成命令。输出是以管道形式传输的，所以并不确定。如果您想一个接一个包运行这个命令，可以这样使用：

```bash
lerna exec --concurrency 1 -- ls -la
```

### `--stream`

立即从子进程输出流，它的前缀为原始的包名。这让不同的包交叉输出成为可能。

```bash
lerna exec --stream -- babel src -d lib
```

### `--parallel`

和`--stream`相类似，但完全忽略并发性和拓扑顺序。它会立即在带有前缀的流输出的所有匹配包中运行给定的命令或脚本。这是在许多包上运行的长时间运行的进程(如`babel src -d lib -w`)的首选参数。

```bash
lerna exec --parallel -- babel src -d lib -w
```

::: warning 注意
在使用`--parallel`时建议限制该命令的作用域，因为生成几十个子进程可能会损害 shell 的稳定性(例如，最大文件描述符限制)。这个因人而异。
:::

### `--no-bail`

```bash
# 运行一个命令，忽略非零(错误)退出代码
lerna exec --no-bail <command>
```

默认情况下，如果任何执行过程返回一个非零的退出代码，`lerna exec`将退出并报错。`——no-bail`可以禁用此行为，让其所有包中执行，而无视退出代码。

### `--no-prefix`

当输出为流(`--stream`或`--parallel`)时禁用包名前缀。该配置项应用在将结果传输到其他进程时很有用，比如编辑器插件。

### `--profile`

对命令执行进行分析，并生成性能分析文件，可以在基于 chrome 的浏览器中使用 DevTools 进行分析(URL为：devtools://devtools/bundled/devtools_app.html)。该分析文件显示了命令执行的时间线，其中每次执行都会分配给一个打开的槽。槽的数量由`--concurrency`决定，开放槽的数量由`--concurrency`减去正在进行的操作的数量决定。最终结果是对并行执行命令的可视化展示。

性能分析文件输出的默认位置是项目的根目录。

```bash
lerna exec --profile -- <command>
```

::: tip 注意
Lerna 只会在启用拓扑排序(即不使用`--parallel`和`--no-sort`)时分析性能。
:::

### `--profile-location <location>`

您可以提供一个自定义位置用于性能分析文件的输出。提供的路径是相对于当前工作目录进行解析的。

```bash
lerna exec --profile --profile-location=logs/profile/ -- <command>
```







