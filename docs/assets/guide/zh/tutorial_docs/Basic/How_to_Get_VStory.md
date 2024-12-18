# 如何获取 VStory

获取 VStory 的方式有以下几种：

1. 从 npm 获取
2. 从 cdn 获取
3. 从 GitHub 仓库获取

## npm 获取

```bash
# npm
$ npm install @visactor/vstory

# yarn
$ yarn add @visactor/vstory
```

获取时候如何使用，详见[如何在项目中引用 VStory](./How_to_Import_VStory)。

## cdn 获取

> 说明：cdn 方式引入的时候，VStory 的引用方式需要注意：`const story = new VStory.Story(dsl, { dom: 'chart' });`

可以从以下免费的 CDN 中获取 VStory:

```html
<!-- unpkg -->
<script src="https://unpkg.com/@visactor/vstory/dist/index.min.js"></script>

<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@visactor/vstory/dist/index.min.js"></script>
```

## GitHub 获取

从 GitHub 上你可以直接获取 VStory 的源码：

1. 你可以直接从 GitHub clone 源码。
2. 你也可以从 VStory 的 [release](https://github.com/VisActor/VStory/releases) 页面选择对应的版本，点击页面下方 Assets 中的 Source code，将其下载至本地解压后使用。
