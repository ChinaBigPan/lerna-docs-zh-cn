---
title: lerna/init
sidebarDepth: 3
---

# `@lerna/init`

> 创建一个新的 Lerna 仓库或将现有的仓库升级到 Lerna 的当前版本

[英文原地址](https://github.com/lerna/lerna/blob/master/commands/init#readme)

安装 lerna 以访问`lerna` CLI。

## 使用

```bash
lerna init
```

创建一个新的 Lerna 仓库或将现有的仓库升级到 Lerna 的当前版本。

> Lerna 假设该仓库已经用`git init`进行了初始化。

在运行时，该仓库将会：

1. 如果其尚未存在于`package.json`的`devDependency`，则将`lerna`添加进去。
2. 创建`lerna.json`配置文件已储存`version`号。

示例：

```bash
lerna init
lerna info version v2.0.0
lerna info Updating package.json
lerna info Creating lerna.json
lerna success Initialized Lerna files
```

## 配置项

### `--independent`

```bash
lerna init --independent
```

该参数是告诉 Lerna 使用独立的版本控制模式。

### `--exact`

```bash
lerna init --exact
```

默认情况下，当添加或更新lerna的本地版本时，`lerna init`将使用插入符号范围，如`npm install --save-dev lerna`。

为了保留 lerna 1.x 的“精确”比较行为，可以传递该参数。您也可以在`lerna.json`中配置以强制后续所有都执行精确匹配：

```bash
{
  "command": {
    "init": {
      "exact": true
    }
  },
  "version": "0.0.0"
}
```




































