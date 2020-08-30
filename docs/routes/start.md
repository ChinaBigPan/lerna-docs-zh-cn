---
title: 开始
---

# 开搞

> 以下是针对 Lerna 3.x 的说明。我们建议使用它而不是 2.x 版本来启动一个新的 Lerna 项目。

让我们首先用 npm 将 Lerna 作为项目的开发依赖项安装。

```bash
mkdir lerna-repo && cd $_
npx lerna init
```

这会创建一个`lerna.json`配置文件和`packages`文件夹，因此您的文件夹📂应该是下面这样的结构：

```text
lerna-repo/
  packages/
  package.json
  lerna.json
```





















