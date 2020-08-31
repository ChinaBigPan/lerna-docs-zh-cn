---
title: 排忧解难
---

# 排忧解难

这个文档包含了我们的用户在过去使用 Lerna 时遇到的一些问题的解决方案。

[英文原地址](https://github.com/lerna/lerna/blob/master/doc/troubleshooting.md)

## Boostrap 指令

### 使用 yarn 的时候客户端出错了

在 Lerna `v2.0.0-rc`发布之前，使用`--npm-client`参数可能因为引导过程不能正常运行而受到影响。

```bash
Error running command.
error Command failed with exit code 1.
```

请将 Lerna 升级到上述版本，或者添加`--concurrency=1`作为替代方案。

### 私有的 npm 注册 (Artifactory、npm Enterprise等等)集成问题

如果`lerna bootstrap`失败，那是因为您在私有服务器上本身有了库，所以请确保包含该注册表。示例:`lerna bootstrap -- --registry=http://[registry-url]`

## Import 指令

### 引入期间的缓冲(buffer)问题

当你尝试导入一个存储库且它的提交(commit)非常多时，你有可能会得到一个错误，比如:

```bash
DeprecationWarning: Unhandled promise rejections are deprecated
```

或

```bash
Error: spawnSync /bin/sh ENOBUFS during ImportCommand.execute
```

**解决办法：**

运行`lerna import`时加上`--max-buffer`并传入足够大的数字(按字节算)。底层默认值是`10MB`。

## 无法导入合并冲突提交

当您尝试导入一个包含合并提交(需要解决冲突)的存储库时，import命令会失败并出现一个错误:

```bash
lerna ERR! execute Error: Command failed: git am -3
lerna ERR! execute error: Failed to merge in the changes.
lerna ERR! execute CONFLICT (content): Merge conflict in [file]
```

**解决办法：**

运行`lerna import`时加上`--flatten`进入“flat”模式以引入历史。也就是说，每一次合并提交都是一个引入合并的单独变更。

## 当 git 树有未提交的更改时失败

若当前的项目收到**未提交的更改**，您会收到`fatal: ambiguous argument 'HEAD':`错误。

**解决办法：**

在使用`lerna import`任何包之前，请确保提交 lerna 项目中的更改。

## Publish 指令

### 在 Github/Github Enterprise 模式下，`Publish`不会检测手动创建的标签。

当通过[web ui](https://help.github.com/articles/working-with-tags)创建发布时，Github 和 Github Enterprise 使用轻量级的 Git 标签，而 Lerna 使用注释标签。

这可能会造成一个问题，Lerna 会忽略之前已经手动执行并使用 Github web ui 标记过的发布版本。

例如，如果发布的历史如下：

- v1.1.0 通过`lerna publish`发布并标记。
- v1.2.0 通过 Github web ui 手动发布并标记。
- v1.2.1 通过 Github web ui 手动发布并标记。

那么运行`lerna publish`现在会侦测 v1.1.0 而非 v1.2.1 作为最新的发布标记。

这其中的含义取决于您对`lerna publish`的使用方式：

- 发布提示符将使用 v1.1.0 作为主要/次要/补丁(major/minor/patch)建议的基础。
- 当使用`--conventional-commit`时：
    - 建议基于自 v1.1.0 以来的所有提交(包括来自 v1.2.0、v1.2.1 等的提交)来增加语义化版本号。
    - 生成的 CHANGELOG.md 文件将重复所有已经在 v1.2.0、v1.2.1 等版本中发布的提交。

**解决办法：**

尽可能使用`lerna publish`而非手动发布。

对于新的手动版本，使用`git tag -a -m <version>`，而非 Github web ui。

对于现有的轻量级标签，它们可以通过以下方式转换为注释标签:

```bash
GIT_AUTHOR_NAME="$(git show $1 --format=%aN -s)"
GIT_AUTHOR_EMAIL="$(git show $1 --format=%aE -s)"
GIT_AUTHOR_DATE="$(git show $1 --format=%aD -s)"
GIT_COMMITTER_NAME="$(git show $1 --format=%cN -s)"
GIT_COMMITTER_EMAIL="$(git show $1 --format=%cE -s)"
GIT_COMMITTER_DATE="$(git show $1 --format=%cD -s)"

git tag -a -m $1 -f $1 $1

git push --tags --force
```

参见[这个帖子](https://stackoverflow.com/questions/5002555/can-a-lightweight-tag-be-converted-to-an-annotated-tag)获取更多信息。

## 发布到私有的 npm 注册表 (Artifactory, npm Enterprise 等等)

如果`lerna publish`失败，请确保您的`package.json`中有：

```json
"publishConfig": {
    "registry": "https://[registry-url]"
}
```

您可能还需要在您的`.npmrc`文件中添加以下内容:

```bash
egistry = https://[registry-url]
```








