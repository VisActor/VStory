import type { ISymbolGraphicAttribute } from '@visactor/vrender-core';
import { DEFAULT_ANIMATION_DURATION, DEFAULT_SCENE_DURATION, defaultConfig } from './default';
import { isFunction, isObject, merge } from '@visactor/vutils';
import type { IUnitTemplateSpec, QueryNode } from './type';
import type { IActionsLink, IStorySpec } from '../../story/interface';
import type { ICharacterSpec } from '../../story/character';

export function generateSpec(input: IUnitTemplateSpec): IStorySpec {
  input = initialInput(input);
  const { characters: layoutCharacters, actions: layoutActions } = generateLayoutSpec(input);
  const { characters: titleCharacters, actionsGroup: titleActionsGroup } = generateTitleSpec(input);
  const { character: vizCharacter, actions: vizActions } = generateVizSpec(input);

  const spec: IStorySpec = {
    characters: [...layoutCharacters, ...titleCharacters, vizCharacter],
    acts: [
      {
        id: 'page1',
        scenes: input.scenes.map((_, sceneIndex) => {
          return {
            id: sceneIndex.toString(),
            actions: [...layoutActions, ...titleActionsGroup[sceneIndex], vizActions[sceneIndex]]
          };
        })
      }
    ]
  };

  return spec;
}

function initialInput(input: IUnitTemplateSpec): IUnitTemplateSpec {
  const { data, ...restInput } = input;
  const res = merge({}, defaultConfig, restInput);
  res.data = data;
  return res;
}

function generateLayoutSpec(input: IUnitTemplateSpec) {
  const {
    layout: {
      width: layoutWidth = defaultConfig.layout.width,
      height: layoutHeight = defaultConfig.layout.height,
      title: {
        height: titleHeight = defaultConfig.layout.title.height,
        backgroundColor: titleBackgroundColor = defaultConfig.layout.title.backgroundColor
      } = {},
      viz: { backgroundColor: vizBackgroundColor = defaultConfig.layout.viz.backgroundColor } = {}
    } = {}
  } = input;
  const characters: ICharacterSpec[] = [
    {
      type: 'Rect',
      id: 'background-title',
      zIndex: 2,
      position: {
        top: 0,
        left: 0,
        width: layoutWidth,
        height: titleHeight
      },
      options: {
        graphic: {
          fill: titleBackgroundColor,
          stroke: false
        }
      }
    },
    {
      type: 'Rect',
      id: 'background',
      zIndex: 0,
      position: {
        top: 0,
        left: 0,
        width: layoutWidth,
        height: layoutHeight
      },
      options: {
        graphic: {
          fill: vizBackgroundColor,
          stroke: false
        }
      }
    }
  ];
  const actions: IActionsLink[] = [
    {
      characterId: 'background-title',
      characterActions: [
        {
          action: 'appear',
          startTime: 0,
          payload: {
            animation: {
              effect: 'move',
              duration: 1
            }
          }
        }
      ]
    },
    {
      characterId: 'background',
      characterActions: [
        {
          action: 'appear',
          startTime: 0,
          payload: {
            animation: {
              effect: 'move',
              duration: 1
            }
          }
        }
      ]
    }
  ];
  return { characters, actions };
}

function generateTitleSpec(input: IUnitTemplateSpec) {
  const {
    scenes,
    layout: {
      width: layoutWidth = defaultConfig.layout.width,
      height: layoutHeight = defaultConfig.layout.height,
      title: {
        height: titleHeight = defaultConfig.layout.title.height,
        padding: {
          left: titlePaddingLeft = defaultConfig.layout.title.padding.left,
          right: titlePaddingRight = defaultConfig.layout.title.padding.right
        } = {},
        style: titleStyle = defaultConfig.layout.title.style
      } = {}
    } = {}
  } = input;

  const startTime = 0;
  const characters: ICharacterSpec[] = scenes.map((scene, sceneIndex) => {
    return {
      type: 'Text',
      id: 'title-' + sceneIndex,
      zIndex: 3,
      position: {
        top: titleHeight / 2,
        left: layoutWidth / 2,
        width: layoutWidth - titlePaddingLeft - titlePaddingRight,
        height: layoutHeight
      },
      options: {
        graphic: {
          width: layoutWidth - titlePaddingLeft - titlePaddingRight,
          height: layoutHeight,
          ...titleStyle,
          textConfig: scene.title
        }
      }
    };
  });
  const actionsGroup: IActionsLink[][] = scenes.map((scene, sceneIndex) => {
    const actions: IActionsLink[] = [
      {
        characterId: 'title-' + sceneIndex,
        characterActions: [
          {
            action: 'appear',
            startTime: startTime + (scene.animationDuration ?? DEFAULT_ANIMATION_DURATION) + 1,
            payload: {
              animation: {
                duration: scene.animationDuration ?? DEFAULT_ANIMATION_DURATION,
                easing: 'linear',
                effect: 'fade'
              }
            }
          }
        ]
      }
    ];

    // Only add disappear action if it's not the last scene
    if (sceneIndex < scenes.length - 1) {
      actions.push({
        characterId: `title-${sceneIndex}`,
        characterActions: [
          {
            action: 'disappear',
            startTime:
              startTime +
              (scene.sceneDuration ?? DEFAULT_SCENE_DURATION) -
              (scene.animationDuration ?? DEFAULT_ANIMATION_DURATION),
            payload: {
              animation: {
                duration: scene.animationDuration ?? DEFAULT_ANIMATION_DURATION,
                easing: 'linear',
                // @ts-ignore
                effect: 'fade'
              }
            }
          }
        ]
      });
    }

    return actions;
  });

  return { characters, actionsGroup };
}

function generateVizSpec(input: IUnitTemplateSpec) {
  const { scenes, data, unit: { defaultStyle = defaultConfig.unit.defaultStyle } = {} } = input;
  const initialStyleList: ISymbolGraphicAttribute[] = [];
  for (let i = 0; i < data.length; i++) {
    if (isFunction(defaultStyle)) {
      initialStyleList.push(defaultStyle(i));
    }
    if (isObject<ISymbolGraphicAttribute>(defaultStyle)) {
      initialStyleList.push(defaultStyle);
    }
  }
  const character: ICharacterSpec = getUnitCharacter(initialStyleList, input);
  const actions: IActionsLink[] = [];
  const startTime = 0;
  let prevStyleList = initialStyleList;
  for (let sceneIndex = 0; sceneIndex < scenes.length; sceneIndex++) {
    const sceneSpec = scenes[sceneIndex];
    const { nodes, animationDuration } = sceneSpec;
    const indexList = Array.from({ length: data.length }, (_, i) => i);
    const styleList = prevStyleList.slice();
    updateStyleList(styleList, nodes, data, indexList);
    const action = createUnitViz(styleList, animationDuration ?? DEFAULT_ANIMATION_DURATION, startTime);
    prevStyleList = styleList;
    actions.push(action);
  }
  return { character, actions };
}

function getUnitCharacter(styleList: ISymbolGraphicAttribute[], input: IUnitTemplateSpec): ICharacterSpec {
  const {
    layout: {
      width: layoutWidth = defaultConfig.layout.width,
      height: layoutHeight = defaultConfig.layout.height,
      title: { height: titleHeight = defaultConfig.layout.title.height } = {},
      viz: {
        padding: {
          left: vizPaddingLeft = defaultConfig.layout.viz.padding.left,
          right: vizPaddingRight = defaultConfig.layout.viz.padding.right,
          top: vizPaddingTop = defaultConfig.layout.viz.padding.top,
          bottom: vizPaddingBottom = defaultConfig.layout.viz.padding.bottom
        } = {},
        direction: vizDirection = defaultConfig.layout.viz.direction
      } = {}
    } = {},
    unit: { gap: unitGap = defaultConfig.unit.gap, aspect: unitAspect = defaultConfig.unit.aspect } = {}
  } = input;

  const character: ICharacterSpec = {
    type: 'Unit',
    id: 'unit',
    zIndex: 2,
    position: {
      top: titleHeight,
      left: 0,
      width: layoutWidth,
      height: layoutHeight - titleHeight
    },
    options: {
      graphic: {
        padding: {
          top: vizPaddingTop,
          bottom: vizPaddingBottom,
          right: vizPaddingRight,
          left: vizPaddingLeft
        },
        count: styleList.length,
        styleFunc: (index: number): ISymbolGraphicAttribute => ({ ...styleList[index] }),
        gap: unitGap,
        aspect: unitAspect,
        direction: vizDirection
      }
    }
  };

  return character;
}

function updateStyleList(
  styleList: ISymbolGraphicAttribute[],
  nodes: QueryNode[],
  data: Record<string, any>[],
  indexList: number[]
) {
  for (const node of nodes) {
    const query = node.query;
    const filteredIndexList = query ? indexList.filter(index => query(data[index])) : indexList;
    for (const index of filteredIndexList) {
      styleList[index] = { ...styleList[index], ...node.style };
    }
    if (node.children) {
      updateStyleList(styleList, node.children, data, filteredIndexList);
    }
  }
  return styleList;
}

function createUnitViz(
  styleList: ISymbolGraphicAttribute[],
  animationDuration: number,
  startTime: number
): IActionsLink {
  const action: IActionsLink = {
    characterId: 'unit',
    characterActions: [
      {
        action: 'style',
        startTime: startTime,
        payload: {
          animation: {
            effect: 'style',
            styleFunc: (index: number) => styleList[index],
            duration: animationDuration,
            easing: 'linear',
            stagger: {
              enable: true
            }
          }
        }
      }
    ]
  };

  return action;
}
