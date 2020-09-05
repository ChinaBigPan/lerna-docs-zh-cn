---
title: lerna/changed
sidebarDepth: 3
---

# @lerna/changed

> 列出自上次标记发布以来发生变化的本地包

[英文原地址](https://github.com/lerna/lerna/tree/master/commands/changed#readme)

安装 lerna 以访问`lerna` CLI。

## 使用

`lerna changed`输出的是下一个`lerna version`或`lerna publish`执行后的包列表。

```bash
lerna changed
package-1
package-2
```

::: tip 
`lerna publish`和`lerna version`的`lerna.json`配置也会影响`lerna changed`。比如`command.publish.ignoreChanges`。
:::

## 配置项

[lerna ls]:https://github.com/lerna/lerna/tree/master/commands/list#options

`lerna changed`支持[lerna ls][lerna ls]的所有参数。

- [--json](https://github.com/lerna/lerna/tree/master/commands/list#--json)
- [--ndjson](https://github.com/lerna/lerna/tree/master/commands/list#--ndjson)
- [--a, --all](https://github.com/lerna/lerna/tree/master/commands/list#--all)
- [-l, --long](https://github.com/lerna/lerna/tree/master/commands/list#--long)
- [-p, --parseable](https://github.com/lerna/lerna/tree/master/commands/list#--parseable)
- [--toposort](https://github.com/lerna/lerna/tree/master/commands/list#--toposort)
- [--graph](https://github.com/lerna/lerna/tree/master/commands/list#--graph)

[filter options]:https://www.npmjs.com/package/@lerna/filter-options

和`lerna ls`不同，`lerna changed`**并不支持**[过滤器配置项][filter options]，因为其本身并不为`lerna version`或`lerna publish`所支持。

`lerna changed`支持下列`lerna version`的配置项(其他的都无关紧要了):

- [--conventional-graduate](https://github.com/lerna/lerna/tree/master/commands/version#--conventional-graduate)
- [--force-publish](https://github.com/lerna/lerna/tree/master/commands/version#--force-publish)
- [--ignore-changes](https://github.com/lerna/lerna/tree/master/commands/version#--ignore-changes)
- [--include-merged-tags](https://github.com/lerna/lerna/tree/master/commands/version#--include-merged-tags)


