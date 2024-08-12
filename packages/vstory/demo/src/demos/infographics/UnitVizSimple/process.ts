import { IConicalGradient, ILinearGradient, IRadialGradient } from '@visactor/vrender-core';
import { ICharacterSpec } from '../../../../../src/story/character';
import { IActionsLink, IStorySpec } from '../../../../../src/story/interface';
import { Input, QueryNode, InputData, UnitNode } from './input';

export function generateSpec(input: Input): IStorySpec {
  const { characters: layoutCharacters, actions: layoutActions } = generateLayoutSpec(input);
  const { characters: titleCharacters, actionsGroup: titleActionsGroup } = generateTitleSpec(input);
  const { character: vizCharacters, actionsGroup: vizActionsGroup } = generateVizSpec(input);

  const spec: IStorySpec = {
    characters: [
      ...layoutCharacters,
      ...titleCharacters
      // ...vizCharacters
    ],
    acts: [
      {
        id: 'page1',
        scenes: input.scene.map((scene, sceneIndex) => {
          return {
            id: scene.id,
            actions: [
              ...layoutActions,
              ...titleActionsGroup[sceneIndex]
              // ...vizActionsGroup[sceneIndex]
            ]
          };
        })
      }
    ]
  };

  return {
    characters: [
      {
        type: 'RectComponent',
        id: 'background-title',
        zIndex: 2,
        position: {
          top: 0,
          left: 0,
          width: 1920,
          height: 254
        },
        options: {
          graphic: {
            fill: '#2D6BA0',
            stroke: false
          }
        }
      },
      {
        type: 'RectComponent',
        id: 'background',
        zIndex: 0,
        position: {
          top: 0,
          left: 0,
          width: 1920,
          height: 1080
        },
        options: {
          graphic: {
            fill: '#193446',
            fillOpacity: 1,
            stroke: false
          }
        }
      },
      {
        type: 'RichTextComponent',
        id: 'title-0',
        zIndex: 3,
        position: {
          top: 127,
          left: 960,
          width: 1920,
          height: 1080
        },
        options: {
          graphic: {
            width: 1720,
            height: 1080,
            fontSize: 40,
            wordBreak: 'break-word',
            textAlign: 'center',
            fill: 'white',
            fontWeight: 200,
            textConfig: [
              {
                text: 'In America, nearly '
              },
              {
                text: 'two-thirds',
                fontWeight: 'bold'
              },
              {
                text: ' of gun deaths are '
              },
              {
                text: 'suicides',
                fontWeight: 'bold'
              }
            ]
          }
        }
      },
      {
        type: 'RichTextComponent',
        id: 'title-1',
        zIndex: 3,
        position: {
          top: 127,
          left: 960,
          width: 1920,
          height: 1080
        },
        options: {
          graphic: {
            width: 1720,
            height: 1080,
            fontSize: 40,
            wordBreak: 'break-word',
            textAlign: 'center',
            fill: 'white',
            fontWeight: 200,
            textConfig: [
              {
                text: 'More than '
              },
              {
                text: '85 percent',
                fontWeight: 'bold'
              },
              {
                text: ' of suicide victims are'
              },
              {
                text: 'male',
                fontWeight: 'bold'
              }
            ]
          }
        }
      }
    ],
    acts: [
      {
        id: 'page1',
        scenes: [
          {
            id: 'scene-1',
            actions: [
              {
                characterId: 'background-title',
                characterActions: [
                  {
                    action: 'appear',
                    startTime: 0,
                    duration: 0,
                    payload: {
                      animation: {
                        duration: 0
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
                    duration: 0,
                    payload: {
                      animation: {
                        duration: 0
                      }
                    }
                  }
                ]
              },
              {
                characterId: 'title-0',
                characterActions: [
                  {
                    action: 'appear',
                    startTime: 801,
                    duration: 0,
                    payload: {
                      animation: {
                        duration: 800,
                        easing: 'linear',
                        effect: 'fade'
                      }
                    }
                  }
                ]
              },
              {
                characterId: 'title-0',
                characterActions: [
                  {
                    action: 'disappear',
                    startTime: 2400,
                    duration: 0,
                    payload: {
                      animation: {
                        duration: 800,
                        easing: 'linear',
                        effect: 'fade'
                      }
                    }
                  }
                ]
              }
            ]
          },
          {
            id: 'scene-2',
            actions: [
              {
                characterId: 'background-title',
                characterActions: [
                  {
                    action: 'appear',
                    startTime: 0,
                    duration: 0,
                    payload: {
                      animation: {
                        duration: 800,
                        easing: 'linear',
                        effect: 'fade'
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
                    duration: 0,
                    payload: {
                      animation: {
                        duration: 800,
                        easing: 'linear',
                        effect: 'fade'
                      }
                    }
                  }
                ]
              },
              {
                characterId: 'title-1',
                characterActions: [
                  {
                    action: 'appear',
                    startTime: 4001,
                    duration: 0,
                    payload: {
                      animation: {
                        duration: 800,
                        easing: 'linear',
                        effect: 'fade'
                      }
                    }
                  }
                ]
              },
              {
                characterId: 'title-1',
                characterActions: [
                  {
                    action: 'disappear',
                    startTime: 5600,
                    duration: 0,
                    payload: {
                      animation: {
                        duration: 800,
                        easing: 'linear',
                        effect: 'fade'
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  return spec;
}

function generateLayoutSpec(input: Input) {
  const { layout } = input;
  const characters: ICharacterSpec[] = [
    {
      type: 'RectComponent',
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
          fill: layout.color,
          stroke: false
        }
      }
    },
    {
      type: 'RectComponent',
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
          fill: '#193446',
          fillOpacity: 1,
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
          duration: 0
        }
      ]
    },
    {
      characterId: 'background',
      characterActions: [
        {
          action: 'appear',
          startTime: 0,
          duration: 0
        }
      ]
    }
  ];
  return { characters, actions };
}

function generateTitleSpec(input: Input) {
  const { scene, layout } = input;
  let startTime = 0;
  const characters: ICharacterSpec[] = scene.map((scene, sceneIndex) => {
    return {
      type: 'RichTextComponent',
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
          width: layout.width - 2 * layout.titlePadding.x,
          height: layout.height,
          fontSize: 40,
          wordBreak: 'break-word',
          textAlign: 'center',
          fill: 'white',
          fontWeight: 200,
          textConfig: scene.title
        }
      }
    };
  });
  const actionsGroup: IActionsLink[][] = scene.map((scene, sceneIndex) => {
    const actions: IActionsLink[] = [
      {
        characterId: 'title-' + sceneIndex,
        characterActions: [
          {
            action: 'appear',
            startTime: startTime + scene.animationDuration + 1,
            // ? set to scene.animationDuration will cause error: TypeError: Cannot read properties of undefined (reading 'effect')
            duration: 0,
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
            duration: 0,
            // ? without payload, it will throw error and won't disappear
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
    startTime += scene.sceneDuration;
    return actions;
  });

  return { characters, actionsGroup };
}

function generateVizSpec(input: Input) {
  const { scene, data } = input;
  const character: ICharacterSpec[] = [];
  const actionsGroup: IActionsLink[][] = [];
  for (let sceneIndex = 0; sceneIndex < scene.length; sceneIndex++) {
    const sceneSpec = scene[sceneIndex];
    const { nodes } = sceneSpec;
    const unitData = getUnitTree(nodes, data);
    const { characters, actions } = createUnitViz(unitData, input, sceneIndex);
    character.push(...characters);
    actionsGroup.push(actions);
  }
  return { character, actionsGroup };
}

function getUnitTree(nodes: QueryNode[], data: InputData[]): UnitNode[] {
  let tree: UnitNode[] = [];
  for (let node of nodes) {
    const filteredData = data.filter(node.query);
    if (!node.children) {
      tree.push({
        label: node.label,
        style: node.style,
        count: filteredData.length
      });
    } else {
      tree.push({
        label: node.label,
        style: node.style,
        count: filteredData.length,
        children: getUnitTree(node.children, filteredData)
      });
    }
  }
  return tree;
}

function createUnitViz(unitData: UnitNode[], input: Input, sceneIndex: number) {
  const numCharacters = calNumCharacters(unitData);
  const {
    layout: {
      width,
      height,
      title: { height: titleHeight },
      viz: { padding: vizPadding }
    },
    unit: { gap, aspect }
  } = input;

  const vizWidth = width - 2 * vizPadding.x;
  const vizHeight = height - titleHeight - 2 * vizPadding.y;
  const numRowsLowerBound = calNumRowsLowerBound(vizWidth, vizHeight, aspect, gap, numCharacters);
  const { numRows, numCols, unitHeight, unitWidth } = calLayout(
    numRowsLowerBound,
    numCharacters,
    vizHeight,
    vizWidth,
    gap,
    aspect
  );

  const offsetWidth = (vizWidth - numCols * unitWidth - (numCols - 1) * gap[0] * unitWidth) / (numCols - 1);
  const startX = vizPadding.x;
  const startY = titleHeight + vizPadding.y;
  const startPoint = { startX, startY };
  const matrix = { numRows, numCols, unitHeight, unitWidth, gap, offsetWidth };

  return generateShapes(unitData, startPoint, matrix, 'white', sceneIndex, input);
}

function calNumCharacters(unitData: UnitNode[]): number {
  let numCharacters = 0;
  for (let unitNode of unitData) {
    const children = unitNode.children;
    if (!children) {
      numCharacters += unitNode.count;
    } else {
      numCharacters += calNumCharacters(children);
    }
  }
  return numCharacters;
}

function calNumRowsLowerBound(w: number, h: number, aspect: number, gap: [number, number], count: number): number {
  const a = Math.pow(w * (1 + gap[1]), 2);
  const b = gap[0] * aspect * h - w * gap[1];
  const c = -count * h * aspect * (1 + gap[0]) * (1 + gap[1]);
  const delta = Math.sqrt(b * b - 4 * a * c);
  return Math.ceil((-b + delta) / (2 * a));
}

// TODO: test for one line special case
function calLayout(
  numRowsLowerBound: number,
  count: number,
  h: number,
  w: number,
  gap: [number, number],
  aspect: number
) {
  let numRows = numRowsLowerBound;
  let numCols;
  let unitHeight;
  let unitWidth;
  let totalWidth;
  do {
    unitHeight = h / (numRows * (1 + gap[1]) - gap[1]);
    unitWidth = aspect * unitHeight;
    numCols = Math.ceil(count / numRows);
    totalWidth = numCols * unitWidth + (numCols - 1) * gap[0] * unitWidth;
  } while (totalWidth > w && numRows++);
  return {
    numRows,
    numCols,
    unitHeight,
    unitWidth
  };
}

type StartPoint = {
  startX: number;
  startY: number;
};

type Matrix = {
  numRows: number;
  numCols: number;
  unitHeight: number;
  unitWidth: number;
  gap: [number, number];
  offsetWidth: number;
};

function generateShapes(
  unitData: UnitNode[],
  startPoint: StartPoint,
  matrix: Matrix,
  defaultColor: string | true | ILinearGradient | IRadialGradient | IConicalGradient,
  sceneIndex: number,
  input: Input
) {
  const characters: ICharacterSpec[] = [];
  const actions: IActionsLink[] = [];
  const { startX, startY } = startPoint;
  const { numRows, unitHeight, unitWidth, gap, offsetWidth } = matrix;
  const sceneStartTime = input.scene.reduce(
    (acc, scene, index) => (index < sceneIndex ? acc + scene.sceneDuration : acc),
    0
  );
  const sceneEndTime = sceneStartTime + input.scene[sceneIndex].sceneDuration;
  for (let unitNode of unitData) {
    const children = unitNode.children;
    let color = unitNode.style?.fill || defaultColor;
    if (!children) {
      for (let i = 0; i < unitNode.count; i++) {
        const numCharacters = characters.length;
        const col = Math.floor(numCharacters / numRows);
        const row = numCharacters - col * numRows;
        const id = `scene-${sceneIndex}:unit-${col}-${row}`;
        characters.push({
          type: 'ShapeComponent',
          id: id,
          zIndex: 3 + sceneIndex,
          position: {
            top: startY + row * (unitHeight + gap[1] * unitHeight),
            left: startX + col * (unitWidth + gap[0] * unitWidth + offsetWidth),
            width: unitWidth,
            height: unitHeight
          },
          options: {
            graphic: {
              symbolType: input.unit.style.symbolType,
              stroke: false,
              size: unitHeight,
              fill: color
            }
          }
        });
        actions.push({
          characterId: id,
          characterActions: [
            {
              startTime: sceneStartTime + Math.floor(Math.random() * input.scene[sceneIndex].animationDuration) + 1,
              duration: 0,
              action: 'appear',
              payload: {
                animation: {
                  duration: input.scene[sceneIndex].animationDuration,
                  easing: 'linear',
                  effect: 'fade'
                }
              }
            }
          ]
        });
        actions.push({
          characterId: id,
          characterActions: [
            {
              startTime: sceneEndTime - Math.floor(Math.random() * input.scene[sceneIndex].animationDuration),
              duration: 0,
              action: 'disappear',
              payload: {
                animation: {
                  duration: input.scene[sceneIndex].animationDuration,
                  easing: 'linear',
                  effect: 'fade'
                }
              }
            }
          ]
        });
      }
    } else {
      const { characters: childrenCharacters, actions: childrenActions } = generateShapes(
        children,
        startPoint,
        matrix,
        color,
        sceneIndex,
        input
      );
      characters.push(...childrenCharacters);
      actions.push(...childrenActions);
    }
  }
  return { characters, actions };
}
