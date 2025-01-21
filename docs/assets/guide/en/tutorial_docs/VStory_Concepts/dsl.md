# DSL Definition

DSL is a JSON format that describes a VStory work. It defines which elements are used in this work and their related configurations. It describes how the work is arranged, what elements are doing what actions at what moment. For a quick hands-on introduction to DSL, please refer to [A Basic DSL](../Basic/A_Basic_DSL). This tutorial will provide a detailed explanation of the specific definition of DSL.

## Structure

`DSL` is a JSON format object that contains the following fields:

1. `character` array
   The `character` array is used to describe which elements are used in this work and their related configurations.
2. `acts` array
   The `acts` array is used to describe how the work is arranged, what elements are doing what actions at what moment.

```ts
interface IStoryDSL {
  acts: IActSpec[]; // Chapters of the work, describing how the work is arranged and what elements are doing what actions at what moment.
  characters: ICharacterConfig[]; // Elements in the work, describing which elements are used in this work and their related configurations.
}
```

### character Array

The `character` array is used to describe which types of elements are used in this work and their related configurations. It includes position and size (`position`), and layer (`layout`) information.

```ts
type ICharacterConfig = IChartCharacterConfig | IComponentCharacterConfig;

// Definition of position, describing the position, size, rotation anchor, etc. of the element
type IWidgetData = {
  left?: number;
  top?: number;
  x?: number;
  y?: number;
  angle?: number;
  anchor?: [number, number];
} & (
  | {
      bottom?: number;
      right?: number;
    }
  | {
      width?: number;
      height?: number;
    }
);

interface ICharacterConfigBase {
  id: string;
  type: string; // Type of character
  position: IWidgetData; // Position description
  zIndex: number; // Layer description
  extra?: any; // Extra information, optional
}
```

Currently, there are three major types of `character`: chart, component, and table. This is mainly because the configurations of these three types differ significantly, and each type has numerous subtypes. For example, in the component type, you can customize any component and register it in VStory for use in DSL.

#### Chart Type

The chart type supports VChart charts, where you can directly configure the VChart spec and additional properties as listed below:

```ts
interface IChartCharacterConfig extends ICharacterConfigBase {
  options: {
    // Chart spec
    spec?: any;
    // Initialization parameters
    initOption?: IInitOption;
    // Padding
    padding?: { left: number; top: number; right: number; bottom: number };
    // Chart container
    panel?: any;
    // Data source
    data?: any;
    // Title
    title?: {
      [key in ModelSelector]: Partial<ElementType<ISpec['title']>>;
    };
    // Legends
    legends?: {
      [key in ModelSelector]: Partial<ElementType<ISpec['legends']>>;
    };
    // Axes
    axes?: {
      [key in ModelSelector]: Partial<ElementType<ISpec['axes']>>;
    };
    // Color palette
    color?: any;
    // Mark element style
    markStyle?: {
      [key: string]: IMarkStyle;
    };
    // Label element style, different from mark in runtime logic
    labelStyle?: {
      [key: string]: IMarkStyle;
    };
    // Data group style configuration
    dataGroupStyle?: {
      [StroyAllDataGroup]: IDataGroupStyle; // Style for all groups
      [key: string]: IDataGroupStyle; // Style for a specific group
    };
    // Directly merged configuration, using VChart spec
    rootConfig?: Record<string, any>;
  };
}
```

#### Component Type

Text, images, etc., belong to the component type. If you need to use custom components in VStory, you need to register them in VStory first and then use them in DSL. This will be detailed in [Custom Component](./Custom_Component).
Note that a component can carry additional text, which is configured through the `text` property, while the `graphic` property is the configuration of the component itself.

```ts
interface IComponentCharacterConfig extends ICharacterConfigBase {
  options: {
    // Main graphic element configuration
    graphic: any;
    // Panel configuration
    panel?: any;
    // Text configuration
    text?: any;
    // Padding
    padding?: { left: number; top: number; right: number; bottom: number };
  };
}
```

#### Table Type

Under development

### Acts Array

Through the `characters` array, we can place multiple elements on the canvas. Next, we need to use the `acts` array to describe how the work is arranged, what elements are doing what actions at what moment. `acts` consist of acts, scenes, and actions.
The `acts` array can contain multiple acts, where acts are connected in a sequential structure. Each act can contain multiple scenes, where scenes are connected in a default sequential structure. However, scenes' timelines can overlap, and the `delay` field can be configured to control the offset of the timeline between this scene and the previous scene. Each scene can contain multiple actions, where actions describe specific behaviors of one or more `character`. Multiple characters and actions can be included in one scene, and actions are executed in parallel. The `startTime` is configured to control the start time of the action.

#### Acts

Acts are the largest chapters in the work, and a work can contain multiple acts, which are connected in a sequential structure.

```ts
interface IActSpec {
  id: string; // Act ID
  scenes: ISceneSpec[]; // Array of scenes
}
```

#### Scenes

A scene is a timeline that contains an array of actions. Scenes are connected in a default sequential structure, but the timeline of scenes can be offset from the previous scene by configuring the `delay` field.

```ts
type ISceneSpec = {
  id: string;
  delay?: number; // Entrance delay, can be positive or negative
  actions: IActions[];
};
```

#### Actions

An action contains the specific behavior of one or more `character`. Multiple actions can be included in one scene, and actions are executed in parallel. The `startTime` is configured to control the start time of the action.

```ts
interface IActions {
  characterId: string | string[]; // ID or array of IDs of characters to perform the action
  characterActions: IAction<IActionPayload>[];
}

interface IAction<T extends IActionPayload> {
  action: string; // Specific action, such as appear
  startTime?: number; // Start time of the action
  payload?: T | T[]; // Action parameters
}

export interface IActionPayload {
  animation?: IAnimationParams; // Specific animation parameter definition
  selector?: string; // Selector, used to specify the element to perform the action, e.g., selecting a bar in a chart
}

export interface IAnimationParams {
  duration: number; // Animation duration
  easing?: EasingType; // Animation curve
  loop?: number | boolean; // Whether to loop, number of loops
  effect?: string | string[]; // Effects, such as fade, bounce for appear
  // Other parameters
  dimensionCount?: number;
  delayPerTime?: number;
  enterPerTime?: number;
  params?: Record<string, any>;
  [key: string]: any;
}
```

With this, the complete definition of a DSL is finished. You can try it out yourself or make changes in the [examples](/vstory/examples) to experiment.
