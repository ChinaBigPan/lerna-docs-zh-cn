---
title: 概念
---

# 概念

当运行命令遇到错误时，Lerna 会将其记录到`lerna-debug.log`文件（与`npm-debug.log`）一样。

Lerna 同样也支持[scoped packages](https://docs.npmjs.com/misc/scope)。

运行`lerna --help`查看所有可用的命令和配置项。


## lerna.json

```json
{
  "version": "1.1.3",
  "npmClient": "npm",
  "command": {
    "publish": {
      "ignoreChanges": ["ignored-file", "*.md"],
      "message": "chore(release): publish",
      "registry": "https://npm.pkg.github.com"
    },
    "bootstrap": {
      "ignore": "component-*",
      "npmClientArgs": ["--no-package-lock"]
    }
  },
  "packages": ["packages/*"]
}
```

[@lerna/version]:https://github.com/lerna/lerna/blob/master/commands/version#--message-msg

**说明：**
| 属性名 | 描述 |
|:---:|----|
| `version` | 当前版本 |
| `npmClient` | 指定运行命令的客户端(也可以根据每个命令单独指定)。设定为`"yarn"`则使用`yarn`运行。默认值是`"npm"` |
| `command.publish.ignoreChanges` | 通配符的数组，其中的值不会被 lerna 监测更改和发布。使用它可以防止因更改发布不必要的新版本，比如仅仅是修复 README.md 的错误。|
| `command.publish.message` | 执行发布版本更新时的自定义提交消息。更多细节见[@lerna/version][@lerna/version] |
| `command.publish.registry` | 使用它来设置要发布的自定义注册 url，而非 npmjs.org，如果需要的话，您必须经过授权。 |
| `command.bootstrap.ignore` | 运行`lerna bootstrap`指令时会忽视该字符串数组中的通配符匹配的文件。 |
| `command.bootstrap.npmClientArgs` | 该字符串数组中的参数将在`lerna bootstrap`命令期间直接传递给`npm install`。|
| `command.bootstrap.scope` | 该通配符的数组会在`lerna bootstrap`命令运行时限制影响的范围。 |
| `packages` | 表示包位置的全局变量数组。|

`lerna.json`中的`packages`配置是一个通配符列表，用于匹配包含了`package.json`的的目录。这就是 lerna 识别“叶子”包(和“根”`package.json`相对应，用于管理整个仓库的开发依赖和脚本)。

默认情况下，lerna 将包的列表初始化为`["packages/*"]`，但是您也可以使用另一个目录，比如`["modules/*"]`或`["package1", "package2"]`。定义的通配符是相对于`lerna.json`所在的目录的，该目录通常是存储库的更目录。唯一的限制是不能直接嵌套包的未知，但是该限制在“普通” npm 包中也是存在的。

举个栗子🌰，`["packages/*", "src/**"]`匹配的是下面这样的树形结构：

```bash
packages/
├── foo-pkg
│   └── package.json
├── bar-pkg
│   └── package.json
├── baz-pkg
│   └── package.json
└── qux-pkg
    └── package.json
src/
├── admin
│   ├── my-app
│   │   └── package.json
│   ├── stuff
│   │   └── package.json
│   └── things
│       └── package.json
├── profile
│   └── more-things
│       └── package.json
├── property
│   ├── more-stuff
│   │   └── package.json
│   └── other-things
│       └── package.json
└── upload
    └── other-stuff
        └── package.json

```

定位`packages/*`下的叶子包被认为是“最佳实践”，但不是使用 Lerna 的必要条件。

**一些已经废弃的字段**

一些`lerna.json`字段已不再使用。值得注意的包括:

- `lerna`: 原本用于指示当前 Lerna 的版本。在 v3 中被[废弃](https://github.com/lerna/lerna/pull/1122)和[删除](https://github.com/lerna/lerna/pull/1225)

### 常见的`devDependencies`

通过`Lerna link convert`，大多数`devdependency`可以被拉到 Lerna 库的根目录。

上面的命令将自动提升(hoist)文件并使用相对的`files`文件说明符。

提升有如下好处:

- 所有的包使用的依赖版本均相同。
- 可以使用[GreenKeeper](https://greenkeeper.io/)之类的自动化工具更新根目录中的依赖。
- 降低了依赖安装时间。
- 所需的存储空间更少了。

注意，提供 npm 脚本使用的“二进制”可执行文件的`devdependency`仍然需要直接安装在使用它们的每个包中。

例如，对于正确运行`lerna run nsp`(以及在包的目录中运行`npm run nsp`)来说，`nsp`依赖关系是必须的:

```json
{
  "scripts": {
    "nsp": "nsp"
  },
  "devDependencies": {
    "nsp": "^2.3.3"
  }
}
```

## Git 托管的依赖

Lerna 允许本地依赖包的目标版本通过`committish`编写为[git 远程 url](https://docs.npmjs.com/cli/install)(例如`#v1.0.0`或`#semver:^1.0.0`)。而非正常数值范围版本。当包必须为私有且无需[私有的 npm 注册表](https://www.dotconferences.com/2016/05/fabien-potencier-monolithic-repositories-vs-many-repositories)时，允许通过 git 仓库发包。

请注意，lerna 并没有实际地将 git 历史记录分割到单独的只读存储库当中。这是用户的事情。(点击[这里](https://github.com/lerna/lerna/pull/1033#issuecomment-335894690)了解实现细节)。

```js
// packages/pkg-1/package.json
{
  name: "pkg-1",
  version: "1.0.0",
  dependencies: {
    "pkg-2": "github:example-user/pkg-2#v1.0.0"
  }
}

// packages/pkg-2/package.json
{
  name: "pkg-2",
  version: "1.0.0"
}
```

在上面的示例中：

- `lerna bootstrap`会将`pkg-2`与`pkg-1`恰当的连接起来。
- `lerna publish`当`pkg-2`发生变化时，它将更新`pkg-1`中的 committish (`#v1.0.0`)。

## README 标签

用 Lerna 不整一个标签么？[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

```md
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
```

## 向导

如果您喜欢一些关于 cli 的指导信息(如果您即将开始使用 lerna 或将其介绍给一个新的团队)，那么您可能会喜欢[lerna-wizard](https://github.com/szarouski/lerna-wizard)。它通过一些定义好的步骤来帮助您：


![image](/lerna-docs-zh-cn/images/lerna-wizard.png)











