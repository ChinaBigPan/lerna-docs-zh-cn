---
title: 常见问题
---

# 常见问题

[英文原地址](https://github.com/lerna/lerna/blob/master/FAQ.md)

该文档原作者仍旧保持更新，如果英文内容有新增，请通知。

## 如何将包添加到 Lerna 库?

对于添加到 Lerna 存储库中的任何包，您应该运行`[lerna bootstrap](https://github.com/lerna/lerna/blob/master/commands/bootstrap/README.md)`，而不是运行npm安装。这将考虑到包文件夹中的现有项目以及外部依赖关系。

### 新包

在`packages`文件夹中为您的包创建一个目录，并正常运行`npm init`来创建`package.json`。

### 现有包

[lerna import <package>]:https://github.com/lerna/lerna/blob/master/commands/import/README.md

您可以使用`[lerna import <package>][lerna import <package>]`将现有的包转移到 Lerna 存储库中；此命令将保存提交历史记录。 

`[lerna import <package>][lerna import <package>]`采用本地路径而不是 URL。在这种情况下，您需要在文件系统中有连接到仓库。

## 如果`publish`失败了，我如何重试呢？

有些时候`lerna publish`不起作用。可能是您的网络出现了波动，也可能是没有登录到 npm 等等。

如果`lerna.json`并没有更新，重试一下`lerna publish`。

如果已经更新，您可以强制重新发布。`lerna publish --force-publish $(ls packages/)`

## bootstrap 过程慢到爆，咋办啊？

包含许多包的项目可能需要很长时间才能启动。

如果您开启 hoisting 那么就可以显著地降低`lerna bootstrap`花费的时间，更多信息请参阅[hoisting 文档](https://github.com/lerna/lerna/blob/master/doc/hoist.md)。

与此相结合，您可以通过使用`yarn`而不是`npm`客户端来提高`bootstrap`的性能。

## 根目录`package.json`

根目录的`package.json`至少是您在 CI 构建期间本地安装`lerna`的方式。您还应该将您的测试、语法检查和类似的任务放在那里，从根目录运行它们，因为单独从每个包运行它们会比较慢。根目录还可以保存所有“hoisted”的包，这在使用`——hoist`时加速了 bootstrap。

## CI 设置

正如上面所提到的根目录的`package.json`负责本地安装`lerna`。不过您需要自动运行`bootstrap`。这可以通过将其作为 npm 脚本在 CI 阶段使用来实现。

示例：

```json
{
  "name": "my-monorepo",
  "private": true,
  "devDependencies": {
    "eslint": "^3.19.0",
    "jest": "^20.0.4",
    "lerna": "^2.0.0"
  },
  "scripts": {
    "bootstrap": "lerna bootstrap --hoist",
    "pretest": "eslint packages",
    "test": "jest"
  }
}
```

以 CircleCI 配置文件为例 (`circle.yml`):

```yml
dependencies:
  post:
    - npm run bootstrap
```









