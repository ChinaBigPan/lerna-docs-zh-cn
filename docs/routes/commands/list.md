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

```bash
lerna ls
package-1
package-2
```

在 shell 中运行这些命令时，您可能会注意到 `lerna`提供了额外的日志记录。请放心，它们不会污染您的命令，因为所有的日志都是按照`strerr`发送的而非`stdout`。

在任何情况下，你可以随时通过`--loglevel silent`恢复原始的 shell 显示。

## 配置项

`lerna ls`还支持所有可用的[过滤器](https://www.npmjs.com/package/@lerna/filter-options)。

以 JSON 数组的形式展示信息。

```bash
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

::: tip 
使用 [json](http://trentm.com/json/) 工具可以按照属性挑选
:::

```bash
lerna ls --json --all | json -a -c 'this.private === true' name
package-3
```

### `--ndjson`

[newline-delimited JSON]:http://ndjson.org/

用[换行分隔][newline-delimited JSON]的方式展示信息。

```bash
lerna ls --ndjson
{"name":"package-1","version":"1.0.0","private":false,"location":"/path/to/packages/pkg-1"}
{"name":"package-2","version":"1.0.0","private":false,"location":"/path/to/packages/pkg-2"}
```

### `--all`

别名：`-a`

展示默认隐藏的私有包。

```bash
$ lerna ls --all
package-1
package-2
package-3 (private)
```

### `--long`

别名：`-l`

显示扩展信息。

```bash
lerna ls --long
package-1 v1.0.1 packages/pkg-1
package-2 v1.0.2 packages/pkg-2

lerna ls -la
package-1 v1.0.1 packages/pkg-1
package-2 v1.0.2 packages/pkg-2
package-3 v1.0.3 packages/pkg-3 (private)
```

### `--parseable`

别名：`-p`

显示可解析的输出，而不是竖向排列的显示。

默认情况下，每一行都是包的绝对路径。

在`--long`输出中，每一行的格式都是以`:`分隔的`<fullpath>:<name>:<version>[:flags..]`

```bash
lerna ls --parseable
/path/to/packages/pkg-1
/path/to/packages/pkg-2

lerna ls -pl
/path/to/packages/pkg-1:package-1:1.0.1
/path/to/packages/pkg-2:package-2:1.0.2

lerna ls -pla
/path/to/packages/pkg-1:package-1:1.0.1
/path/to/packages/pkg-2:package-2:1.0.2
/path/to/packages/pkg-3:package-3:1.0.3:PRIVATE
```

### `--toposort`

按照拓扑顺序对包进行排序，而不是按目录对包进行词法排序。

```bash
json dependencies <packages/pkg-1/package.json
{
  "pkg-2": "file:../pkg-2"
}

lerna ls --toposort
package-2
package-1
```

### `--graph`

将依赖图显示为json格式的[邻接表](https://en.wikipedia.org/wiki/Adjacency_list)。

```bash
lerna ls --graph
{
  "pkg-1": [
    "pkg-2"
  ],
  "pkg-2": []
}

lerna ls --graph --all
{
  "pkg-1": [
    "pkg-2"
  ],
  "pkg-2": [
    "pkg-3"
  ],
  "pkg-3": [
    "pkg-2"
  ]
}
```






















