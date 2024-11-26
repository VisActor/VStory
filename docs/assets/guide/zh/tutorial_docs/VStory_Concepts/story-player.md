# Story和Player

首先建议大家阅读[dsl](./dsl)的章节，了解如何编写一个VStory的DSL描述。当我们有了一个DSL的JSON描述之后，我们就需要进行VStory的实例化，然后使用播放器去播放作品了。

## 注册

VStory默认采用按需加载的模式，所以在使用VStory之前需要先注册一些模块
```ts
registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
registerLottie();
registerLottieAction();
initVR();
```

我们也提供了直接全量加载依赖的模式
```ts
// 注册所有需要的内容
registerAll();
```

## 创建Story实例

如果您已经制作了一个DSL，可以直接传入给Story实例，如果DSL还没准备好，可以传null，后续准备好了再传入。

```ts
// 方式1：传入DSL，和一个容器id（CONTAINER_ID为容器ID）
const story = new Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });

// 方式2：也可以直接传入canvas
const story = new Story(dsl, { canvas, background: '#ebecf0' });

// 方式3：也可以传入一个空的DSL
const story = new Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
// 后续再传入DSL
story.load(dsl);
```

## 命令添加character（可选）

如果您的DSL中没有包含`character`，那么您可以使用命令添加`character`。如果您已经静态的定义好了DSL，这个步骤就不需要

```ts
// 接口定义如下
addCharacter: (config: ICharacterConfig, actionParams?: IActionParams) => ICharacter;
addCharacterWithAppear: (config: ICharacterConfig) => ICharacter;
```

```ts
story.addCharacter({
  type: item.type,
  id: item.type,
  zIndex: 1,
  position: {
    top: 50 + Math.floor(index / 2) * 150,
    left: 50 + Math.floor(index % 2) * 150,
    width: 100,
    height: 100
  },
  options: item.options
}, {
  sceneId: 'defaultScene',
  actions: [
    {
      action: 'appear',
      startTime: 1000 * index,
      payload: [
        {
          animation: {
            duration: 1000,
            easing: 'linear',
            effect: item.effect
          }
        }
      ]
    }
  ]
});

story.addCharacterWithAppear({
  type: 'Text',
  id: 'title',
  zIndex: 1,
  position: {
    top: 50,
    left: 50,
    width: 800,
    height: 100
  },
  options: {
    graphic: {
      text: '这是一个文本',
      fontSize: 12,
      fontWeight: 'bold',
      fill: 'red',
      textAlign: 'left',
      textBaseline: 'top'
    },
    panel: {
      fill: 'blue',
      cornerRadius: 30
    }
  }
});
```

## 创建Player并绑定Story

创建好`Story`之后，我们就可以进行播放流程了，我们需要创建一个`Player`实例，然后绑定`Story`实例。

```ts
// 创建Player实例
const player = new Player(story);
// 初始化Story
story.init(player);
```
接下来调用`player.play()`即可播放。`play`方法接收一个`number`类型的参数，可传入0,-1,1
传入0表示只播放一次，播放到结尾就停止
传入1表示循环播放，播放到结尾就从头开始播放
传入-1表示不循环也不停止，播放到结尾之后时间线继续往后走，适用于有循环动画的场景，比如有一个持续播放的背景动画

```ts
// 只播放一次，播放到结尾就停止
player.play(0);
// 循环播放，播放到结尾就从头开始播放
player.play(1);
// 不循环也不停止，播放到结尾之后时间线继续往后走
player.play(-1);
```

到这里，`story`和`player`的定义就介绍完了，大家可以自己动手试一下，或者去example[/vstory/example]里去改一改试一试。
