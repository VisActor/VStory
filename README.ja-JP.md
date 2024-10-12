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

VStoryは、VisActorの基盤機能を統合し、すぐに使えるデータナラティブソリューションを提供します。

</div>

<div align="center">

[English](./README.md) | 简体中文 | 日本語

</div>

<div align="center">

（デモビデオ）

</div>

## 概要

VStoryは、VisActorの可視化システムにおけるチャートコンポーネントライブラリです。可視化チャートライブラリ[VChart](https://github.com/VisActor/VChart)、可視化文法ライブラリ[VGrammar](https://github.com/VisActor/VGrammar)、および可視化レンダリングエンジン[VRender](https://github.com/VisActor/VRender)に基づいてコンポーネントをカプセル化しています。主な機能は以下の通りです：

1. **一つのコードで複数のプラットフォームに対応**：デスクトップ、H5、および複数の小プログラム環境に自動適応
2. **ナラティブ指向**：注釈、アニメーション、プロセス制御、ナラティブテンプレートなどの一連の強化機能を総合的に適用してナラティブ可視化を作成
3. **シーンの蓄積**：最終ユーザーに向けて可視化機能を蓄積し、開発者の生産性を解放

## リポジトリの紹介

このリポジトリには以下のパッケージが含まれています：

1. [`vstory`](https://sophon-ai.bytedance.net/paas/packages/vstory/): コアパッケージ、VStoryエディター
2. [`docs`](https://sophon-ai.bytedance.net/paas/docs/): VStoryサイトのソースコード、サイト上のすべての日本語および英語のドキュメント、サンプルコードなどを含む。

## 🔨 使用方法

構築中...

## ⌨️ 開発

まず、[@microsoft/rush](https://rushjs.io/pages/intro/get_started/)をグローバルにインストールします：

```bash
$ npm i --global @microsoft/rush
```

次に、コードをローカルにクローンします：

```bash
# クローン
$ git clone git@github.com:VisActor/VStory.git
$ cd VStory
# 依存関係をインストール
$ rush update
# vstoryのローカル開発を開始
$ rush start
# サイトのローカル開発を開始
$ rush docs
```

## 📖 ドキュメント

依存関係をインストールして更新した後、docsコマンドを実行してvstoryのローカルドキュメントプレビューを開始できます：

```bash
# vstoryドキュメントサーバーを開始
$ rush start
```

## 🔗 関連リンク

- [VCharts チャート例](https://www.visactor.io/vchart/example)
- [VChart チャートチュートリアル](https://www.visactor.io/vchart/guide/tutorial_docs/VChart_Website_Guide)
- [VChart チャート設定項目](https://www.visactor.io/vchart/option/)
- [VChart API](https://www.visactor.io/vchart/api/API/vchart)
- [VGrammar](https://www.visactor.io/vgrammar)
- [VRender](https://www.visactor.io/vrender)

## 🤝 貢献 [](https://github.com/VisActor/VChart/blob/main/CONTRIBUTING.md#your-first-pull-request)

貢献したい場合は、[行動規範](https://sophon-ai.bytedance.net/paas/CODE_OF_CONDUCT.md)および[貢献ガイドライン](https://sophon-ai.bytedance.net/paas/CONTRIBUTING.md)をお読みください。

小さな流れが川となり、最終的には海となる！

<a href="https://github.com/visactor/vstory/graphs/contributors"></a>
