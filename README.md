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

VStory, tell stories with data. An intelligent data narrative development framework.

</div>

<div align="center">

English | [简体中文](./README.zh-CN.md) | [日本語](./README.ja-JP.md)

</div>

<div align="center">

(Demo Video)

</div>

## Introduction

VStory is a narrative visualization development framework in the VisActor visualization system. It encapsulates components based on the visualization chart library [VChart](https://github.com/VisActor/VChart), visualization grammar library [VGrammar](https://github.com/VisActor/VGrammar), and visualization rendering engine [VRender](https://github.com/VisActor/VRender). Core capabilities include:

1. **Cross-platform Compatibility**: Automatically adapts to desktop, H5, and multiple mini-program environments
2. **Narrative-oriented**: Creates narrative visualizations by comprehensively applying enhanced features such as annotations, animations, process control, and narrative templates
3. **Scene Accumulation**: Accumulates narrative visualization capabilities for data dashboards, infographics, data videos, data reports, and other scenarios, liberating developer productivity

## Repository Introduction

This repository contains the following packages:

1. [`vstory`](./packages/vstory/): Core package, VStory editor
2. [`docs`](./docs/): VStory site source code, including all Chinese and English documentation, example code, and other content on the site.

## 🔨 Demo

[Demo](https://www.visactor.io/vstory/example)

## ⌨️ Development

First, install [@microsoft/rush](https://rushjs.io/pages/intro/get_started/) globally:

```bash
$ npm i --global @microsoft/rush
```

Then clone the code locally:

```bash
# clone
$ git clone git@github.com:VisActor/VStory.git
$ cd VStory
# install dependencies
$ rush update
# start local development of vstory
$ rush start
# start local development of the site
$ rush docs
```

## 📖 Documents

After installing and updating dependencies, you can execute the docs command to start local document preview for vstory:

```bash
# start vstory document server
$ rush start
```

## 🔗 Related Links

- [VCharts Examples](https://www.visactor.io/vchart/example)
- [VChart Tutorial](https://www.visactor.io/vchart/guide/tutorial_docs/VChart_Website_Guide)
- [VChart Configuration](https://www.visactor.io/vchart/option/)
- [VChart API](https://www.visactor.io/vchart/api/API/vchart)
- [VGrammar](https://www.visactor.io/vgrammar)
- [VRender](https://www.visactor.io/vrender)

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/VisActor/VChart/blob/main/CONTRIBUTING.md#your-first-pull-request)

If you would like to contribute, please read our [Code of Conduct](./CODE_OF_CONDUCT.md) and [Contributing Guidelines](https://www.visactor.io/vstory/contributing/).

Small streams form rivers, eventually becoming the sea!

<a href="https://github.com/visactor/vstory/graphs/contributors"><img src="https://contrib.rocks/image?repo=visactor/vstory" /></a>
