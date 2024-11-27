# Story and Player

First, it is recommended to read the chapter on [dsl](./dsl) to understand how to write a VStory DSL description. Once we have a DSL JSON description, we need to instantiate the VStory and then use a player to play the work.

## Registration

VStory defaults to a lazy loading mode, so before using VStory, you need to register some modules first.
```ts
registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
registerLottie();
registerLottieAction();
initVR();
```

We also provide a mode to directly load all dependencies.
```ts
// Register all necessary content
registerAll();
```

## Create Story Instance

If you have created a DSL, you can directly pass it to the Story instance. If the DSL is not ready yet, you can pass null and then pass it later.

```ts
// Method 1: Pass the DSL and a container id (CONTAINER_ID is the container ID)
const story = new Story(dsl, { dom: CONTAINER_ID, background: '#ebecf0' });

// Method 2: You can also directly pass a canvas
const story = new Story(dsl, { canvas, background: '#ebecf0' });

// Method 3: You can also pass an empty DSL
const story = new Story(null, { dom: CONTAINER_ID, background: '#ebecf0' });
// Later pass the DSL
story.load(dsl);
```

## Add Character Commands (Optional)

If your DSL does not include `character`, you can use commands to add `character`. If you have already statically defined the DSL, this step is not necessary.

```ts
// Interface definition as follows
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
      text: 'This is a text',
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

## Create Player and Bind Story

After creating the `Story`, we can proceed with the playback process by creating a `Player` instance and then binding it to the `Story` instance.

```ts
// Create a Player instance
const player = new Player(story);
// Initialize the Story
story.init(player);
```
Next, call `player.play()` to start playing. The `play` method takes a parameter of type `number`, where you can pass 0, -1, or 1.
Passing 0 means playing only once, stopping at the end.
Passing 1 means looping playback, starting over from the beginning at the end.
Passing -1 means neither looping nor stopping, allowing the timeline to continue after reaching the end, suitable for scenes with continuous animations, such as a background animation that plays continuously.

```ts
// Play only once, stop at the end
player.play(0);
// Loop playback, start over from the beginning at the end
player.play(1);
// Neither loop nor stop, continue the timeline after reaching the end
player.play(-1);
```

That's all for the definitions of `story` and `player`. You can try it out yourself or make changes in the [example](/vstory/example) to see how it works.
