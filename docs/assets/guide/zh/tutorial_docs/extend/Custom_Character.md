# 自定义Character

在前面的章节中，我们介绍了DSL的基本概念，然后介绍了如何使用VStory来编排一个故事。但是在实际的开发中，我们可能需要自定义一些Character，比如自定义一个特殊的组件，然后在DSL中使用。这个章节我们以一个真实的例子，介绍如何自定义一个Character。

## 介绍

我们提供了`@visactor/vstory-external`包，用于方便用户进行自定义Character的开发。一些扩展功能都可以在这个包中实现。下面我们通过一个接入Lottie的例子来介绍如何在这个包中进行扩展。

![](https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/vstory-external.png)

## 自定义一个Lottie的Character

如果需要在作品中现在需要展示一个Lottie动画，但是VStory的主包里并没有提供这样的Character。现在我们就需要在`@visactor/vstory-external`包中进行扩展。

### 实现一个基于VRender的组件

VStory底层是基于VRender的，所以我们需要用VRender先实现对应的功能，然后再接入到VStory中成为VStory的一个`Character`。很好的是`@visactor/vrender-kits`里已经提供了一个Lottie图元，我们可以直接使用。
我们找到了`@visactor/vrender-kits`包中的`Lottie`图元，在VStory中使用它我们需要将它封装一下，封装的目的有两个：
1. 提供一些默认的属性
2. 提供参数转换，因为VStory中的参数和VRender中`Lottie`图元的参数是不一样的，所以我们需要进行参数转换。比如布局的参数要转成对应的x、y、width、height等参数。
3. 得到一些VStory的特殊能力，比如VStory的所有组件都携带一个文字配置。

```ts
export class LottieComponent extends BaseComponentWithText {
  static defaultAttributes: Partial<ILottieComponentAttributes> = {
    visible: true,
    textStyle: {},
    width: 100,
    height: 100,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  };

  lottieInstance: Lottie;

  constructor(attributes: ILottieComponentAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, LottieComponent.defaultAttributes, attributes));
  }

  protected render(): void {
    super.render();
    // 添加image
    this.renderLottie();
  }
  protected renderLottie() {
    const { graphic, padding, width, height } = this.attribute as ILottieComponentAttributes;
    const attrs = { ...graphic };
    if (!attrs.x) {
      attrs.x = padding.left;
    }
    if (!attrs.y) {
      attrs.y = padding.top;
    }
    if (!attrs.width) {
      attrs.width = width - padding.left - padding.right;
    }
    if (!attrs.height) {
      attrs.height = height - padding.top - padding.bottom;
    }
    if (!this.lottieInstance) {
      const lottie = new Lottie({});
      this.lottieInstance = lottie;
      this.addChild(lottie);
    }
    this.lottieInstance.setAttributes({ ...attrs, scaleX: 1, scaleY: 1, angle: 0, postMatrix: null });
  }
}
```

### 封装一个Character

有了一个`Lottie`组件之后，我们就可以封装一个`Character`了。后续再`DSL`中的`character`配置就会被实例化为我们现在封装的`Character`实例，在Character中，我们将会使用上面的`Lottie`组件。

```ts
export class LottieCharacter extends CharacterComponent<LottieComponent, ILottieComponentAttributes> {
  static type = LOTTIE;

  protected _group: IGroup;

  static RunTime: IComponentCharacterRuntimeConstructor[] = [LottieRuntime];

  protected createAndAddGraphic(attribute: ILottieComponentAttributes): void {
    this._graphic = new LottieComponent(attribute);
    this.canvas.addGraphic(this._graphic);
  }

  protected _initRuntime(): void {
    LottieCharacter.RunTime.forEach(R => {
      this._runtime.push(new R(this));
    });
  }

  protected getDefaultAttribute(): Partial<ILottieComponentAttributes> {
    return {
      ...super.getDefaultAttribute(),
      width: 100,
      height: 100
    };
  }

  protected _clearGraphic(): void {
    super._clearGraphic();
  }

  show() {
    this._graphic.setAttribute('visibleAll', true);
  }
  hide() {
    this._graphic.setAttribute('visibleAll', false);
  }
}
```

实例封装好了之后，我们需要定义一下`Lottie`的`Runtime`。`Runtime`是一个`Character`的运行时执行的内容，其有一些生命周期，比如当主动更新Character的options时，runtime就会执行

```ts
export class LottieRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = 'Lottie';
  applyConfigToAttribute(): void {
    super.applyConfigToAttribute();
    const rawAttribute = this._character.getAttribute();

    const { data } = rawAttribute.graphic;
    // 放一个默认的lottie
    const builtData = builtinLottieMap[data];
    if (builtData) {
      rawAttribute.graphic.data = builtData;
    }
    // TODO 目前VRender有问题，必须配置fill才能绘制
    rawAttribute.graphic.fill = true;
  }
}
```

## 定义processor

上面我们定义好了一个Lottie的Character，现在我们需要定义具体的行为了，比如appear、disappear、style等用来执行入场、出场、样式变化的行为。代码中行为的定义在`processor`中。processor负责处理DSL中定义的对应行为。我们只需要给`Lottie`定义一个appear和disappear的processor即可。其他的就复用通用组件的行为

我们要做的很简单，只需要在appear的时候，调用图元播放Lottie动画就行。其他的就复用通用组件的行为
```ts
function runLottieAnimate(character: ICharacter, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _runLottieAnimate(graphic));
}

function _runLottieAnimate(graphic: IGraphic) {
  if (graphic && graphic.type !== 'text' && graphic.type !== 'richtext') {
    // appear的时候，播放Lottie动画
    if (graphic.lottieInstance) {
      graphic.lottieInstance.stop();
      graphic.lottieInstance.play();
    }
  }
}

export class LottieVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: string = 'appearOrDisAppear';
  constructor() {
    super();
  }

  run(character: ICharacter, actionSpec: IActionSpec): void {
    super.run(character, actionSpec);
    // 执行lottie的特殊行为
    runLottieAnimate(character, actionSpec.action);
  }
}
```

## 注册

接下来我们导出`Character`和`Processor`的注册方法即可。
具体的代码大家在`packages/vstory-external/src/character/lottie`和`packages/vstory-external/src/processor/lottie`中可以看到。

最终，我们就可以在`DSL`中使用`Lottie`了。

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// 注册Lottie
VStory.registerLottie();
VStory.registerLottieAction();

const story = new VStory.Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

story.addCharacterWithAppear({
  type: 'Lottie',
  id: 'lottie-test',
  zIndex: 2,
  position: {
    top: 50,
    left: 50,
    width: 300,
    height: 300
  },
  options: {
    graphic: {
      data: 'loading1'
    },
    panel: {
      fill: '#ffffff',
      shadowColor: 'rgba(0, 0, 0, 0.05)',
      shadowBlur: 10,
      shadowOffsetX: 4,
      shadowOffsetY: 4
    }
  }
});

player.play(-1);
window.vstory = story;
```
