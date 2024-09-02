import { ISymbolGraphicAttribute } from '@visactor/vrender-core';
import { ICharacterSpec } from '../../../../../src/story/character';
import { IActionsLink, IStorySpec } from '../../../../../src/story/interface';
import { DEFAULT_ANIMATION_DURATION, DEFAULT_SCENE_DURATION, defaultInput, Input, QueryNode } from './input';
import { isFunction, isObject } from '@visactor/vutils';

export function generateSpec(input: Input): IStorySpec {
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

function generateLayoutSpec(input: Input) {
  const {
    layout: {
      width: layoutWidth = defaultInput.layout.width,
      height: layoutHeight = defaultInput.layout.height,
      title: {
        height: titleHeight = defaultInput.layout.title.height,
        backgroundColor: titleBackgroundColor = defaultInput.layout.title.backgroundColor
      } = {},
      viz: { backgroundColor: vizBackgroundColor = defaultInput.layout.viz.backgroundColor } = {}
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

function generateTitleSpec(input: Input) {
  const {
    scenes,
    layout: {
      width: layoutWidth = defaultInput.layout.width,
      height: layoutHeight = defaultInput.layout.height,
      title: {
        height: titleHeight = defaultInput.layout.title.height,
        padding: {
          left: titlePaddingLeft = defaultInput.layout.title.padding.left,
          right: titlePaddingRight = defaultInput.layout.title.padding.right
        } = {},
        style: titleStyle = defaultInput.layout.title.style
      } = {}
    } = {}
  } = input;

  let startTime = 0;
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

function generateVizSpec(input: Input) {
  const { scenes, data, unit: { defaultStyle = defaultInput.unit.defaultStyle } = {} } = input;
  const initialStyleList: ISymbolGraphicAttribute[] = [];
  for (let i = 0; i < data.length; i++) {
    if (isFunction(defaultStyle)) {
      initialStyleList.push(defaultStyle(i));
    }
    if (isObject(defaultStyle)) {
      initialStyleList.push(defaultStyle as ISymbolGraphicAttribute);
    }
  }
  const character: ICharacterSpec = getUnitCharacter(initialStyleList, input);
  const actions: IActionsLink[] = [];
  let startTime = 0;
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

function getUnitCharacter(styleList: ISymbolGraphicAttribute[], input: Input): ICharacterSpec {
  const {
    layout: {
      width: layoutWidth = defaultInput.layout.width,
      height: layoutHeight = defaultInput.layout.height,
      title: { height: titleHeight = defaultInput.layout.title.height } = {},
      viz: {
        padding: {
          left: vizPaddingLeft = defaultInput.layout.viz.padding.left,
          right: vizPaddingRight = defaultInput.layout.viz.padding.right,
          top: vizPaddingTop = defaultInput.layout.viz.padding.top,
          bottom: vizPaddingBottom = defaultInput.layout.viz.padding.bottom
        } = {},
        direction: vizDirection = defaultInput.layout.viz.direction
      } = {}
    } = {},
    unit: { gap: unitGap = defaultInput.unit.gap, aspect: unitAspect = defaultInput.unit.aspect } = {}
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
  for (let node of nodes) {
    const query = node.query;
    const filteredIndexList = query ? indexList.filter(index => query(data[index])) : indexList;
    for (let index of filteredIndexList) {
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
