<div align="center">
  <a href="https://github.com/VisActor#gh-light-mode-only" target="_blank">
    <img alt="VisActor Logo" width="200" src="https://github.com/VisActor/.github/blob/main/profile/logo_500_200_light.svg"/>
  </a>
  <a href="https://github.com/VisActor#gh-dark-mode-only" target="_blank">
    <img alt="VisActor Logo" width="200" src="https://github.com/VisActor/.github/blob/main/profile/logo_500_200_dark.svg"/>
  </a>
</div>

<div align="center">
  <h1>VStory</h1>
</div>

<div align="center">

VStory，整合 VisActor 底层能力，提供开箱即用的数据叙事解决方案。

</div>

<div align="center">

[English](./README.md) | 简体中文

</div>

<div align="center">

（演示视频）

</div>

## 简介

VStory 是 VisActor 可视化体系中的图表组件库，基于可视化图表库[VChart](https://github.com/VisActor/VChart) ，可视化语法库[VGrammar](https://github.com/VisActor/VGrammar)，可视化渲染引擎 [VRender](https://github.com/VisActor/VRender) 进行组件封装。核心能力如下：

1. **一码多端**：自动适配桌面、H5、多个小程序环境
2. **面向叙事**：综合应用标注、动画、流程控制、叙事模板等一系列增强功能进行叙事可视化创作。
3. **场景沉淀**：面向最终用户沉淀可视化能力，解放开发者生产力

## 仓库简介

本仓库包含如下包：

1. [`vstory`](./packages/vstory/)：核心包，VStory 编辑器
2. [`docs`](./docs/): VStory 站点源码，同时也包含站点所有的中英文文档、示例代码等内容。

## 🔨 使用

正在构建中...

## ⌨️ 开发

首先，全局安装 [@microsoft/rush](https://rushjs.io/pages/intro/get_started/)

```bash
$ npm i --global @microsoft/rush
```

接着将代码 clone 至本地：

```bash
# clone
$ git clone git@github.com:VisActor/VStory.git
$ cd VStory
# 安装依赖
$ rush update
# 开始 vstory 的本地开发
$ rush start
# 开始站点的本地开发
$ rush docs
```

## 📖 Documents

安装并且更新依赖后，可以执行 docs 命令，开启 vstory 的本地文档预览

```bash
# start vstory document server
$ rush start
```

## 🔗 相关链接

- [VCharts 图表示例](https://www.visactor.io/vchart/example)
- [VChart 图表教程](https://www.visactor.io/vchart/guide/tutorial_docs/VChart_Website_Guide)
- [VChart 图表配置项](https://www.visactor.io/vchart/option/)
- [VChart API](https://www.visactor.io/vchart/api/API/vchart)
- [VGrammar](https://www.visactor.io/vgrammar)
- [VRender](https://www.visactor.io/vrender)

## 🤝 参与贡献 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/VisActor/VChart/blob/main/CONTRIBUTING.md#your-first-pull-request)

如想参与贡献，请先阅读[行为准则](./CODE_OF_CONDUCT.md) 和[贡献指南](./CONTRIBUTING.zh-CN.md)。

细流成河，终成大海！

<a href="https://github.com/visactor/vstory/graphs/contributors"><img src="https://contrib.rocks/image?repo=visactor/vstory" /></a>
