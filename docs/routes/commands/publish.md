---
title: lerna/publish
sidebarDepth: 3
---

# `@lerna/publish`

> 在当前项目中发布包

## 使用

```bash
lerna publish              # 发布自上一个版本以来发生了变化的包
lerna publish from-git     # 发布当前提交中标记的包
lerna publish from-package # 发布注册表中没有最新版本的包
```

在运行时，该命令做了下面几件事中的一个：

- 发布自上一个版本以来更新的包(背后调用了[lerna version](https://github.com/lerna/lerna/tree/master/commands/version#readme))。
    - 这是 lerna 2.x 版本遗留下来的。
- 发布在当前提交中标记的包(`from-git`)。
- 发布在最新提交时注册表中没有版本的包(`from-package`)。
- 发布在前一次提交中更新的包(及其依赖项)的“金丝雀(canary)”版。

::: warning 注意
Lerna 永远不会发布标记为`private`的包（`package.json`中的`”private“: true`）
:::

在所有的发布过程中，都有[生命周期](https://github.com/lerna/lerna/tree/master/commands/publish#lifecycle-scripts)在根目录和每个包中运行(除非使用了`--ignore-scripts`)。

请查看[每个包的配置](https://github.com/lerna/lerna/tree/master/commands/publish#per-package-configuration)以了解发布作用域限定的包、自定义注册表和自定义标记的详细信息。

## 位置

### `from-git`

除了 [lerna version](https://github.com/lerna/lerna/tree/master/commands/version#positionals) 支持的语义化版本关键字外，`lerna publish`也支持`from-git`关键字。这将会识别`lerna version`标记的包，并将它们发布到 npm。这在您希望手动增加版本的 CI 场景中非常有用，但要通过自动化过程一直地发布包内容本身。

### `from-package`

与`from-git`关键字类似，只是要发布的包列表是通过检查每个`package.json`确定的，并且要确定注册表中是否存在任意版本的包。注册表中没有的任何版本都将被发布。当前一个`lerna publish`未能将所有包发布到注册表时，就是他发挥的时候了。

## 配置项

`lerna publish`支持`lerna version`提供的所有配置项，除了以下这些：

### `--canary`

```shell
lerna publish --canary
# 1.0.0 => 1.0.1-alpha.0+${SHA} of packages changed since the previous commit
# a subsequent canary publish will yield 1.0.1-alpha.1+${SHA}, etc

lerna publish --canary --preid beta
# 1.0.0 => 1.0.1-beta.0+${SHA}

# The following are equivalent:
lerna publish --canary minor
lerna publish --canary preminor
# 1.0.0 => 1.1.0-alpha.0+${SHA}
```

当使用该标志运行时，`lerna publish`以更粒度的方式(每次提交)来发布包。在发布到 npm 之前，它会通过当前的`version`创建新的`version`标记，升级到下一个小版本(minor)，添加传入的 meta 后缀(默认为`alpha`)并且附加当前的 git sha 码（例如：`1.0.0`变成`1.1.0-alpha.0+81e3b443`）。

如果您已经从 CI 中的多个活动开发分支发布了 canary 版本，那么建议在每个分支的基础上定制[--preid](https://github.com/lerna/lerna/tree/master/commands/publish#--preid)和[--dist-tag &lt;tag&gt;](https://github.com/lerna/lerna/tree/master/commands/publish#--dist-tag-tag)以避免版本冲突。

> 该参数是需要发布每次提交版或每日构建版时使用。

### `--contents <dir>`

要发布的子目录。必定应用于所有包，且必须包含 package.json 文件。包的生命周期仍然在原来的叶子目录中运行。您应当使用其中的一个生命周期(`prepare`、`prepublishOnly`或`prepack`)来创建子目录等等。

如果您不喜欢非必要的复杂发布，这将给您带来乐趣。

```shell
lerna publish --contents dist
# 发布每个由 Lerna 管理的叶子包的 dist 文件夹
```

::: tip 注意
您应该等到`postpublish`生命周期阶段(根目录或叶目录)才清理这个生成的子目录，因为生成的 package.json 是在包上传期间(在`postpack`之后)使用的。
:::

### `--dist-tag <tag>`

```shell
lerna publish --dist-tag next
```

当带有该参数时，`lerna publish`将使用给定的 npm [dist-tag](https://docs.npmjs.com/cli/dist-tag)(默认为`latest`) 发布到 npm。

该配置项可用于在非`latest`的 dist-tag 下发布[预发布](http://carrot.is/coding/npm_prerelease)或`beta`版本，帮助用户免于自动升级到预发布质量的代码。

::: tip 注意
`latest`标记是用户运行`npm install my-package`时使用的标记。要安装不同的标记，用户可以运行`npm install my-package@prerelease`。
:::

### `--git-head <sha>`

在打包压缩时，显式地在 manifest 上设置为 gitHead，该操作只允许通过[from-package](https://github.com/lerna/lerna/tree/master/commands/publish#bump-from-package)位置进行。

举个例子，当我们从 AWS CodeBuild (这里`git`用不了)发布时，您可以使用该配置项传递适当的[环境变量](https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html)来作为该包的元数据。

```js
lerna publish from-package --git-head ${CODEBUILD_RESOLVED_SOURCE_VERSION}
```

在所有其他情况下，该值是从本地的`git`命令派生而成的。

### `--graph-type <all|dependencies>`

设置在构建包依赖图时使用哪种依赖关系。默认值是`dependencies`，因此只包括包的`package.json`的`dependencies`部分中列出的包。若设置为`all`，则在构建包依赖图和决定拓扑顺序时会包括`dependencies`和`devDependencies`。

在使用传统的 peer + dev 依赖对时，应该将此项配置为`all`，以便 peer 可以总在其依赖项之前发布。

```bash
lerna publish --graph-type all
```

通过`lerna.json`来配置:

```json
{
  "command": {
    "publish": {
      "graphType": "all"
    }
  }
}
```

### `--ignore-scripts`

这个参数会让`lerna publish`在发布期间禁用运行的[生命周期脚本](https://github.com/lerna/lerna/tree/master/commands/publish#lifecycle-scripts)

### `--ignore-prepublish`

这个参数会让`lerna publish`在发布期间禁用[已废弃](https://docs.npmjs.com/misc/scripts#prepublish-and-prepare)的[`prepublish`脚本](https://github.com/lerna/lerna/tree/master/commands/publish#lifecycle-scripts)。

### `--legacy-auth`

当您发布需要身份验证但使用内部托管的 NPM 注册表时，该注册表只使用旧 Base64 版本的 username:password。这与 NPM publish 的 `_auth`标志相同。

```shell
lerna publish --legacy-auth aGk6bW9t
```

### `--no-git-reset`

默认情况下，`lerna publish`确保任何对工作树的更改都会被重置。

为了避免这种情况，可以设置`——no-git-reset`。当作为 CI 流程的一部分与`——canary`一起使用时，这一点特别有用。例如，已经被替换的`package.json`版本号可能需要在随后的`CI`流程步骤中使用(比如 Docker 构建)。

```shell
lerna publish --no-git-reset
```

### `--no-granular-pathspec`

默认情况下，`lerna publish`将尝试(如果启用)只`git checkout`在发布过程中临时修改的叶子包清单。这相当于`git checkout -- packages/*/package.json`，但是*精确地*定制了变化。

如果您确实知道您需要不同的行为，那么您就会理解：通过`--no-granular-pathspec`会让 git 命令执行的`git checkout -- .`。通过选择这个[路径规范](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-aiddefpathspecapathspec)，您必须有意忽略所有未版本化的内容。

该项最好在`lerna.json`中配置，否则会原地去世的：

```json
{
  "version": "independent",
  "granularPathspec": false
}
```

根级配置是有意为之，因为它还包括了[`lerna version`中的同名配置项](https://github.com/lerna/lerna/tree/master/commands/version#--no-granular-pathspec)。

### `--no-verify-access`

默认情况下，`lerna`将严重登录的 npm 用户对即将发布的包的访问权限。设置该参数将禁用该验证。

如果您使用的是不支持`npm access ls-packages`的第三方注册表，则需要设置它(或在`lerna.json`中设置`command.publish.verifyAccess`为`false`)。

::: warning 小心
请小心使用。
:::

### `--otp`

当发布需要双重身份验证的包时，您可以使用`——otp`指定[一次性密码](https://docs.npmjs.com/about-two-factor-authentication):

```shell
lerna publish --otp 123456
```

::: warning 请注意
一次性密码在生成后 **30** 秒内过期。如果它在发布操作期间到期，提示符将在继续之前请求更新后的值。
:::

### `--preid`

和同名的`lerna version`配置项不同，该配置项仅适用于 [--canary](https://github.com/lerna/lerna/tree/master/commands/publish#--canary) 版本计算。

```shell
lerna publish --canary
# 举例，使用下一个语义化预发布版本
# 1.0.0 => 1.0.1-alpha.0

lerna publish --canary --preid next
# 举例，使用指定的预发布标识符来标识下一个语义化预发布版本
# 1.0.0 => 1.0.1-next.0
```

当使用该参数运行时，`lerna publish --canary`将使用指定的 [prerelease 标识符](http://semver.org/#spec-item-9)递增`premajor`、`preminor`、`prepatch`或`prerelease`语义化版本。

### `--pre-dist-tag <tag>`

```shell
lerna publish --pre-dist-tag next
```

除了只适用于与预发行版本一起发布的软件包外，它和[--dist-tag](https://github.com/lerna/lerna/tree/master/commands/publish#--dist-tag-tag)并无二致。

### `--registry <url>`

当使用该参数运行时，转发的 npm 命令将为您的包使用指定 url 的注册表。

如果您不想在使用私有注册表时在所有`package.json`文件中分别设置注册表配置，那就是它出场的时候。

### `--tag-version-prefix`

配置项项允许提供自定义前缀来替代默认的`v`:

```shell
# 本地
lerna version --tag-version-prefix=''

# CI
lerna publish from-git --tag-version-prefix=''
```

您也可以在`lerna.json`中进行配置，对这两个命令也同样适用：

```json
{
  "tagVersionPrefix": "",
  "packages": ["packages/*"],
  "version": "independent"
}
```

### `--temp-tag`

当传递了该参数时，他将会改变默认的发布过程，首先将所有更改过的包发布到一个临时的 dist-tag (`lerna-temp`)中，然后将新版本移动到由[--dist-tag](https://github.com/lerna/lerna/tree/master/commands/publish#--dist-tag-tag)配置的 dist-tag 中(默认值`latest`)。

这通常是没有必要的，因为Lerna在默认情况下会按照拓扑顺序(所有依赖项优先)来发布包。

### `--yes`

```shell
lerna publish --canary --yes
# 跳过“您确定要发布上述更改吗?”
```

当使用此标志运行时，`lerna publish`将跳过所有确认提示。在[持续集成(CI)](https://en.wikipedia.org/wiki/Continuous_integration)中用于自动回答发布确认提示。

## 已废弃的配置项

### `--skip-npm`

直接调用 [lerna version](https://github.com/lerna/lerna/tree/master/commands/version#positionals) 即可。

## 每个包的配置

叶子包可以可以配置特殊的[publishConfig](https://docs.npmjs.com/files/package.json#publishconfig)，在某些情况下可以改变`lerna publish`的行为。

### `publishConfig.access`

要发布具有作用域的包(如`@mycompany/rocks`)，您必须设置[access](https://docs.npmjs.com/misc/config#access):

```json
"publishConfig": {
  "access": "public"
}
```

- 如果把该字段设置到无作用域的包上，那么它会失败的。
- 如果您希望限定范围的包保持私有状态(即`“restricted”`)，则无需设置该值。

**注意：这与在叶子包中设置`“private:true”`不一样。如果设置了`private`字段，那么在任何情况下都不会发布该包。**

### `publishConfig.registry`

您可以通过设置[registry](https://docs.npmjs.com/misc/config#registry)在每个包上定制注册表。

```json
"publishConfig": {
  "registry": "http://my-awesome-registry.com/"
}
```

- 传入[--registry](https://github.com/lerna/lerna/tree/master/commands/publish#--registry-url)可以应用到全局，其实在某些情况下会起到反效果。

### `publishConfig.tag`

您可以通过设置[tag](https://docs.npmjs.com/misc/config#tag)来定制每个包的 dist-tag:

```json
"publishConfig": {
  "tag": "flippin-sweet"
}
```

- 传入[--dist-tag](https://github.com/lerna/lerna/tree/master/commands/publish#--dist-tag-tag)将会覆盖该值。
- 如果同时传入了[--canary](https://github.com/lerna/lerna/tree/master/commands/publish#--canary)则该值会被忽略。
  
### `publishConfig.directory`

这个非标准字段允许您定制已发布的子目录，就像[--contents](https://github.com/lerna/lerna/tree/master/commands/publish#--contents-dir)一样，但它是以每个包为基础的。所有其他关于`--contents`的内容仍然适用。

```json
"publishConfig": {
  "directory": "dist"
}
```

## 生命周期脚本

```shell
// prepublish:      在打包和发布包之前运行。
// prepare:         在打包和发布包之前运行，在 prepublish 之后，prepublishOnly 之前。
// prepublishOnly:  在打包和发布包之前运行，只在 npm publish 时运行。
// prepack:         只在源码压缩打包之前运行。
// postpack:        在源码压缩打包生成并移动到最终目的地后运行。
// publish:         在包发布后运行。
// postpublish:     在包发布后运行。
```

Lerna 将在`lerna publish`期间运行[npm生命周期脚本](https://docs.npmjs.com/misc/scripts#description)，顺序如下:

1. 如果采用没有指定版本，则运行所有[版本生命周期脚本](https://github.com/lerna/lerna/tree/master/commands/version#lifecycle-scripts)
2. 如果[可用](https://github.com/lerna/lerna/tree/master/commands/publish#--ignore-prepublish)，在根目录运行`prepublish`生命周期。
3. 在根目录中运行`prepare`生命周期。
4. 在根目录中运行`prepublishOnly`生命周期。
5. 在根目录运行`prepack`生命周期。
6. 对于每个更改的包，按照拓扑顺序(所有依赖项在依赖关系之前):    
   i. 如果[可用](https://github.com/lerna/lerna/tree/master/commands/publish#--ignore-prepublish)，运行`prepublish`生命周期。    
   ii. 运行`prepare`生命周期。    
   iii. 运行`prepublishOnly`生命周期。    
   iv. 运行`prepack`生命周期。   
   v. 通过[JS API](https://github.com/lerna/lerna/tree/master/utils/pack-directory#readme)在临时目录中创建源码压缩包。
   vi. 运行`postpack`生命周期。    
7. 在根目录运行`postpack`生命周期。
8. 对于每个更改的包，按照拓扑顺序(所有依赖项在依赖关系之前):  
   i. 通过[JS API](https://github.com/lerna/lerna/tree/master/utils/npm-publish#readme)发布包到配置的[注册表](https://github.com/lerna/lerna/tree/master/commands/publish#--registry-url)。   
   ii. 运行`publish`生命周期。    
   iii. 运行`postpublish`生命周期。 
9. 在根目录中运行`publish`生命周期。
   - 为了避免递归调用，不要使用这个根生命周期来运行`lerna publish`。
10. 在根目录中运行`postpublish`生命周期。
11. 如果[可用](https://github.com/lerna/lerna/tree/master/commands/publish#--temp-tag)，将临时的 dist-tag 更新到最新













