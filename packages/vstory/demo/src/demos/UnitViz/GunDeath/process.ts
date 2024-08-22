import { ISymbolGraphicAttribute } from '@visactor/vrender-core';
import { ICharacterSpec } from '../../../../../src/story/character';
import { IActionsLink, IStorySpec } from '../../../../../src/story/interface';
import { QueryNode, RequiredInput, UnitNode } from './input';

export function generateSpec(input: RequiredInput): IStorySpec {
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

  console.log('spec', spec);
  console.log('vizCharacter', vizCharacter);
  console.log('vizActions', vizActions);

  return spec;
}

function generateLayoutSpec(input: RequiredInput) {
  const { layout } = input;
  const characters: ICharacterSpec[] = [
    {
      type: 'Rect',
      id: 'background-title',
      zIndex: 2,
      position: {
        top: 0,
        left: 0,
        width: layout.width,
        height: layout.title.height
      },
      options: {
        graphic: {
          fill: layout.title.backgroundColor,
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
        width: layout.width,
        height: layout.height
      },
      options: {
        graphic: {
          fill: layout.viz.backgroundColor,
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

function generateTitleSpec(input: RequiredInput) {
  const { scenes, layout } = input;
  const { padding } = layout.title;
  console.log('layout', layout);
  console.log('padding', padding);
  let startTime = 1;
  const characters: ICharacterSpec[] = scenes.map((scene, sceneIndex) => {
    return {
      type: 'Text',
      id: 'title-' + sceneIndex,
      zIndex: 3,
      position: {
        top: layout.title.height / 2,
        left: layout.width / 2,
        width: layout.width,
        height: layout.height
      },
      options: {
        graphic: {
          width: layout.width - padding.left - padding.right,
          height: layout.height,
          fontSize: 40,
          wordBreak: 'break-word',
          textAlign: 'center',
          fill: 'black',
          fontWeight: 200,
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
            startTime: startTime + scene.animationDuration + 1,
            payload: {
              animation: {
                duration: scene.animationDuration,
                easing: 'linear',
                effect: 'fade'
              }
            }
          }
        ]
      },
      {
        characterId: `title-${sceneIndex}`,
        characterActions: [
          {
            action: 'disappear',
            startTime: startTime + scene.sceneDuration - scene.animationDuration,
            payload: {
              animation: {
                duration: scene.animationDuration,
                easing: 'linear',
                effect: 'fade'
              }
            }
          }
        ]
      }
    ];
    // startTime += scene.sceneDuration;
    return actions;
  });

  return { characters, actionsGroup };
}

function generateVizSpec(input: RequiredInput) {
  const {
    scenes,
    data,
    unit: { defaultStyle }
  } = input;
  const initialStyleList: ISymbolGraphicAttribute[] = [];
  for (let i = 0; i < data.length; i++) {
    if (typeof defaultStyle === 'function') {
      initialStyleList.push(defaultStyle(i));
    }
    if (typeof defaultStyle === 'object') {
      initialStyleList.push(defaultStyle);
    }
  }
  const character: ICharacterSpec = getUnitCharacter(initialStyleList, input);
  const actions: IActionsLink[] = [];
  let startTime = 1;
  let prevStyleList = initialStyleList;
  for (let sceneIndex = 0; sceneIndex < scenes.length; sceneIndex++) {
    const sceneSpec = scenes[sceneIndex];
    const { nodes, sceneDuration, animationDuration } = sceneSpec;
    const indexList = Array.from({ length: data.length }, (_, i) => i);
    const styleList = prevStyleList.slice();
    updateStyleList(styleList, nodes as QueryNode[], data, indexList);
    const action = createUnitViz(styleList, animationDuration, startTime);
    // startTime += sceneDuration;
    prevStyleList = styleList;
    actions.push(action);
  }
  return { character, actions };
}

function getUnitCharacter(styleList: ISymbolGraphicAttribute[], input: RequiredInput): ICharacterSpec {
  const { layout, unit } = input;
  const { padding } = layout.viz;

  const character: ICharacterSpec = {
    type: 'Unit',
    id: 'unit',
    // TODO: remove zIndex and analyze all zIndex in the story
    zIndex: 2,
    position: {
      top: layout.title.height,
      left: 0,
      width: layout.width,
      height: layout.height - layout.title.height
    },
    options: {
      graphic: {
        padding: {
          top: padding.top,
          bottom: padding.bottom,
          right: padding.right,
          left: padding.left
        },
        count: styleList.length,
        // TODO: change opacity
        styleFunc: (index: number): ISymbolGraphicAttribute => ({ ...styleList[index], opacity: 0.7 }),
        gap: unit.gap,
        aspect: unit.aspect,
        // TODO: add direction to input
        direction: 'horizontal'
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
