import React, { useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAll } from '../../../../src';

const dataWordCloud = [
  {
    name: 'BIG',
    value: 400
  },
  {
    name: 'DATA',
    value: 360
  },
  {
    name: 'BASED',
    value: 120
  },
  {
    name: 'TRANSFER',
    value: 120
  },
  {
    name: 'CAPTURE',
    value: 120
  },
  {
    name: 'EXEBYTES',
    value: 120
  },
  {
    name: 'IDEA',
    value: 120
  },
  {
    name: 'PLAY',
    value: 120
  },
  {
    name: 'INCLUDE',
    value: 120
  },
  {
    name: 'LOGS',
    value: 120
  },
  {
    name: 'INTERNET',
    value: 120
  },
  {
    name: 'REL',
    value: 120
  },
  {
    name: 'SOFTWARE',
    value: 120
  },
  {
    name: 'WORLD',
    value: 120
  },
  {
    name: 'TECHNOLOGY',
    value: 120
  },
  {
    name: 'BILLION CAPTURE',
    value: 120
  },
  {
    name: 'CAPTURE',
    value: 120
  },
  {
    name: 'VALL',
    value: 120
  },
  {
    name: 'INCLUDE',
    value: 120
  },
  {
    name: 'SCIENTISTS',
    value: 120
  },
  {
    name: 'STORAGE',
    value: 120
  },
  {
    name: 'CAPABILITIES',
    value: 120
  },
  {
    name: 'NEW',
    value: 120
  },
  {
    name: 'SOFTWARE',
    value: 120
  },
  {
    name: 'PETABYTES',
    value: 120
  },
  {
    name: 'LARGE',
    value: 120
  },
  {
    name: 'BECOMES',
    value: 120
  },
  {
    name: 'SEARCH',
    value: 120
  },
  {
    name: 'PHYSIC',
    value: 120
  },
  {
    name: 'SOFT WARE',
    value: 120
  },
  {
    name: 'DEVELOPMENT',
    value: 100
  },
  {
    name: 'QUALITY',
    value: 100
  },
  {
    name: 'DATABASE',
    value: 100
  },
  {
    name: 'DEPBIDING',
    value: 100
  },
  {
    name: 'BECAUSE',
    value: 100
  },
  {
    name: 'CAPTURE DEDITOR',
    value: 100
  },
  {
    name: 'WERE',
    value: 100
  },
  {
    name: 'ONGBESKTOP',
    value: 100
  },
  {
    name: 'MANY LAN',
    value: 100
  },
  {
    name: 'PLAY',
    value: 100
  },
  {
    name: 'STORAGE',
    value: 100
  },
  {
    name: 'PART',
    value: 100
  },
  {
    name: 'LARGE',
    value: 100
  },
  {
    name: 'XEBYTES',
    value: 100
  },
  {
    name: 'SETS',
    value: 100
  },
  {
    name: 'ORGANIZATION',
    value: 100
  },
  {
    name: 'IDEA',
    value: 100
  },
  {
    name: 'INTERNET',
    value: 100
  },
  {
    name: 'RESEAR',
    value: 100
  },
  {
    name: 'BIG',
    value: 100
  },
  {
    name: 'VOLUME',
    value: 100
  },
  {
    name: 'DATABASE USING',
    value: 100
  },
  {
    name: 'DATASAGE',
    value: 100
  },
  {
    name: 'MILLION',
    value: 100
  },
  {
    name: 'PART DEVELOPMBIT',
    value: 100
  },
  {
    name: 'VALL',
    value: 100
  },
  {
    name: 'LARGE',
    value: 100
  },
  {
    name: 'MANAGEMENT',
    value: 100
  },
  {
    name: 'PHYSICS',
    value: 100
  },
  {
    name: 'MILLION',
    value: 100
  },
  {
    name: 'DEDATOR',
    value: 50
  },
  {
    name: 'VALL',
    value: 50
  },
  {
    name: 'IDEA',
    value: 50
  },
  {
    name: 'SEARCH',
    value: 50
  },
  {
    name: 'SEARCH',
    value: 50
  },
  {
    name: 'CAPING REAL',
    value: 50
  },
  {
    name: 'SETS FUTURE',
    value: 50
  },
  {
    name: 'GROW',
    value: 50
  },
  {
    name: 'SOFTWARE',
    value: 50
  },
  {
    name: 'DATA',
    value: 50
  },
  {
    name: 'SAN',
    value: 50
  },
  {
    name: 'SOFTWARE',
    value: 50
  },
  {
    name: 'DETS',
    value: 50
  },
  {
    name: 'DATABASE BEFORE',
    value: 50
  },
  {
    name: 'MANAGEMENT',
    value: 50
  },
  {
    name: 'DEVELOPMENT',
    value: 50
  },
  {
    name: 'LOWING',
    value: 50
  },
  {
    name: 'SEARCH',
    value: 50
  },
  {
    name: 'MOST',
    value: 50
  },
  {
    name: 'WAN',
    value: 50
  },
  {
    name: 'BILLION',
    value: 50
  },
  {
    name: 'TOOLS',
    value: 50
  },
  {
    name: 'STORME',
    value: 50
  },
  {
    name: 'DATABASE',
    value: 50
  },
  {
    name: 'SETS',
    value: 50
  },
  {
    name: 'DEADOFTWA',
    value: 50
  },
  {
    name: 'PHYSICS',
    value: 50
  },
  {
    name: 'SOFTWARE',
    value: 50
  },
  {
    name: 'SOFTWARE',
    value: 50
  },
  {
    name: 'SEARCH',
    value: 50
  },
  {
    name: 'BLOPM',
    value: 50
  },
  {
    name: 'PHYSICS',
    value: 50
  },
  {
    name: 'GEENTOP',
    value: 50
  },
  {
    name: 'MANY',
    value: 50
  },
  {
    name: 'INTERNET',
    value: 50
  },
  {
    name: 'TECHNOLOGY',
    value: 50
  },
  {
    name: 'CE NEW',
    value: 50
  },
  {
    name: 'BILLION',
    value: 50
  },
  {
    name: 'PART',
    value: 50
  },
  {
    name: 'TOOLS',
    value: 50
  },
  {
    name: 'PETABYTES- ALLOWING',
    value: 50
  },
  {
    name: 'SOCIAL',
    value: 50
  },
  {
    name: 'DEVELOPMENT',
    value: 50
  },
  {
    name: 'DEVEPLOMENT',
    value: 50
  },
  {
    name: 'NAS',
    value: 50
  },
  {
    name: 'DATABASE',
    value: 50
  },
  {
    name: 'BURNG',
    value: 50
  },
  {
    name: 'MANAGEMENT',
    value: 50
  },
  {
    name: 'WITH',
    value: 50
  },
  {
    name: 'TOTAL',
    value: 50
  },
  {
    name: 'AMOUNT',
    value: 50
  },
  {
    name: 'NEW',
    value: 50
  },
  {
    name: 'DATABASE',
    value: 50
  },
  {
    name: 'PHYSIOS',
    value: 50
  },
  {
    name: 'VILUME',
    value: 50
  },
  {
    name: 'MANAGEMENT',
    value: 50
  },
  {
    name: 'ALLOWINE',
    value: 50
  },
  {
    name: 'INFORMATIONDENCE',
    value: 50
  },
  {
    name: 'PROCESS',
    value: 50
  },
  {
    name: 'RELATED',
    value: 50
  }
].map((entry, index) => {
  return {
    ...entry,
    index
  };
});

registerAll();
export const BigDataWordCloud = () => {
  const id = 'BigDataWordCloud';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const dsl = {
      acts: [
        {
          id: 'defaultAct',
          scenes: [
            {
              id: 'defaultScene',
              actions: [
                {
                  characterId: [
                    'background',
                    'arc0',
                    'arc1',
                    'arc2',
                    'leftTitle'
                    // 'listIconLeft1',
                    // 'listIconRight1',
                    // 'listNo1',
                    // 'listContent1',

                    // 'listIconLeft2',
                    // 'listIconRight2',
                    // 'listNo2',
                    // 'listContent2',

                    // 'listIconLeft3',
                    // 'listIconRight3',
                    // 'listNo3',
                    // 'listContent3',

                    // 'listIconLeft4',
                    // 'listIconRight4',
                    // 'listNo4',
                    // 'listContent4',

                    // 'wordCloud'
                  ],
                  characterActions: [
                    {
                      action: 'appear'
                    }
                  ]
                },

                {
                  characterId: ['leftTitle'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 0,
                      payload: [
                        {
                          animation: {
                            duration: 400,
                            easing: 'linear',
                            effect: 'wipe'
                          }
                        }
                      ]
                    }
                  ]
                },

                {
                  characterId: ['listIconLeft1', 'listIconRight1', 'listNo1'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 400,
                      payload: [
                        {
                          animation: {
                            duration: 200,
                            easing: 'linear',
                            effect: 'fade'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  characterId: ['listContent1'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 600,
                      payload: [
                        {
                          animation: {
                            duration: 600,
                            easing: 'linear',
                            effect: 'wipe'
                          }
                        }
                      ]
                    }
                  ]
                },

                {
                  characterId: ['listIconLeft2', 'listIconRight2', 'listNo2'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 1200,
                      payload: [
                        {
                          animation: {
                            duration: 200,
                            easing: 'linear',
                            effect: 'fade'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  characterId: ['listContent2'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 1400,
                      payload: [
                        {
                          animation: {
                            duration: 600,
                            easing: 'linear',
                            effect: 'wipe'
                          }
                        }
                      ]
                    }
                  ]
                },

                {
                  characterId: ['listIconLeft3', 'listIconRight3', 'listNo3'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 2000,
                      payload: [
                        {
                          animation: {
                            duration: 200,
                            easing: 'linear',
                            effect: 'fade'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  characterId: ['listContent3'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 2200,
                      payload: [
                        {
                          animation: {
                            duration: 600,
                            easing: 'linear',
                            effect: 'wipe'
                          }
                        }
                      ]
                    }
                  ]
                },

                {
                  characterId: ['listIconLeft4', 'listIconRight4', 'listNo4'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 2800,
                      payload: [
                        {
                          animation: {
                            duration: 200,
                            easing: 'linear',
                            effect: 'fade'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  characterId: ['listContent4'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 3000,
                      payload: [
                        {
                          animation: {
                            duration: 600,
                            easing: 'linear',
                            effect: 'wipe'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  characterId: ['wordCloud'],
                  characterActions: [
                    {
                      action: 'appear',
                      startTime: 3600,
                      payload: [
                        {
                          animation: {
                            selector: '*',
                            duration: 100,
                            easing: 'linear',
                            effect: 'scale',
                            oneByOne: true
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      characters: [
        {
          id: 'background',
          type: 'Rect',
          zIndex: 0,
          position: {
            x: 0,
            y: 0,
            width: 1280,
            height: 720
          },
          options: {
            graphic: {
              fill: '#fff'
            }
          }
        },

        {
          id: 'arc0',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: -300,
            y: -860,
            width: 1280 + 300,
            height: 720 + 860
          },
          options: {
            panel: {
              clip: true
            },
            graphic: {
              size: 1200,
              symbolType:
                '<svg t="1734336148623" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17355" width="60" height="60"><path d="M821.324992 1010.006204A498.543202 498.543202 0 0 1 703.856746 1024a492.456469 492.456469 0 0 1-354.338842-150.006666 519.647666 519.647666 0 0 1 0-723.979842 494.447457 494.447457 0 0 1 471.693317-135.955984 2240.145058 2240.145058 0 0 0-14.221337 66.840285A425.900611 425.900611 0 0 0 703.856746 68.326131a443.705725 443.705725 0 0 0 0 887.41145 426.014381 426.014381 0 0 0 103.133138-12.628548c4.266401 21.843974 9.044771 44.313687 14.278223 66.840286z" p-id="17356"></path></svg>',
              fill: '#a9efd6'
            }
          }
        },
        {
          id: 'arc1',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: -257,
            y: -810,
            width: 1280 + 257,
            height: 720 + 810
          },
          options: {
            panel: {
              clip: true
            },
            graphic: {
              size: 1200,
              symbolType:
                '<svg t="1734336148623" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17355" width="60" height="60"><path d="M821.324992 1010.006204A498.543202 498.543202 0 0 1 703.856746 1024a492.456469 492.456469 0 0 1-354.338842-150.006666 519.647666 519.647666 0 0 1 0-723.979842 494.447457 494.447457 0 0 1 471.693317-135.955984 2240.145058 2240.145058 0 0 0-14.221337 66.840285A425.900611 425.900611 0 0 0 703.856746 68.326131a443.705725 443.705725 0 0 0 0 887.41145 426.014381 426.014381 0 0 0 103.133138-12.628548c4.266401 21.843974 9.044771 44.313687 14.278223 66.840286z" p-id="17356"></path></svg>',
              fill: '#dadad8'
            }
          }
        },

        {
          id: 'arc2',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: -220,
            y: -780,
            width: 1280 + 220,
            height: 720 + 780
          },
          options: {
            panel: {
              clip: true
            },
            graphic: {
              size: 1200,
              symbolType:
                '<svg t="1734336148623" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17355" width="60" height="60"><path d="M821.324992 1010.006204A498.543202 498.543202 0 0 1 703.856746 1024a492.456469 492.456469 0 0 1-354.338842-150.006666 519.647666 519.647666 0 0 1 0-723.979842 494.447457 494.447457 0 0 1 471.693317-135.955984 2240.145058 2240.145058 0 0 0-14.221337 66.840285A425.900611 425.900611 0 0 0 703.856746 68.326131a443.705725 443.705725 0 0 0 0 887.41145 426.014381 426.014381 0 0 0 103.133138-12.628548c4.266401 21.843974 9.044771 44.313687 14.278223 66.840286z" p-id="17356"></path></svg>',
              fill: '#fff'
            }
          }
        },

        {
          id: 'leftTitle',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 54,
            y: 60,
            width: 444,
            height: 140
          },
          options: {
            graphic: {
              text: 'Big Data Technology Development and Management Word Cloud',
              lineHeight: 40,
              fontSize: 32,
              textAlign: 'left',
              textBaseline: 'top',
              fontWeight: 'bolder',
              lineClamp: 3,
              wordBreak: 'break-word'
            }
          }
        },

        {
          id: 'listIconLeft1',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 54,
            y: 250,
            width: 54,
            height: 54
          },
          options: {
            graphic: {
              symbolType: 'circle',
              size: 54,
              stroke: '#a9efd8',
              lineWidth: 2
            }
          }
        },

        {
          id: 'listIconRight1',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 84,
            y: 250,
            width: 54,
            height: 54
          },
          options: {
            graphic: {
              symbolType: 'circle',
              size: 54,
              stroke: '#a9efd8',
              lineWidth: 2
            }
          }
        },

        {
          id: 'listNo1',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 95,
            y: 277,
            width: 50,
            height: 50
          },
          options: {
            graphic: {
              text: '01',
              lineHeight: 48,
              fontSize: 16,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 'bold'
            }
          }
        },

        {
          id: 'listContent1',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 160,
            y: 277,
            width: 340,
            height: 54
          },
          options: {
            graphic: {
              text: `This slide is 100% editable. Adapt it to your needs and capture your audience's attention.`,
              lineHeight: 26,
              fontSize: 16,
              textAlign: 'left',
              textBaseline: 'middle',
              lineClamp: 2,
              wordBreak: 'break-word'
            }
          }
        },

        {
          id: 'listIconLeft2',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 54,
            y: 360,
            width: 54,
            height: 54
          },
          options: {
            graphic: {
              symbolType: 'circle',
              size: 54,
              stroke: '#a9efd8',
              lineWidth: 2
            }
          }
        },

        {
          id: 'listIconRight2',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 84,
            y: 360,
            width: 54,
            height: 54
          },
          options: {
            graphic: {
              symbolType: 'circle',
              size: 54,
              stroke: '#a9efd8',
              lineWidth: 2
            }
          }
        },

        {
          id: 'listNo2',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 95,
            y: 387,
            width: 50,
            height: 50
          },
          options: {
            graphic: {
              text: '02',
              lineHeight: 48,
              fontSize: 16,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 'bold'
            }
          }
        },

        {
          id: 'listContent2',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 160,
            y: 387,
            width: 340,
            height: 54
          },
          options: {
            graphic: {
              text: `This slide is 100% editable. Adapt it to your needs and capture your audience's attention.`,
              lineHeight: 26,
              fontSize: 16,
              textAlign: 'left',
              textBaseline: 'middle',
              lineClamp: 2,
              wordBreak: 'break-word'
            }
          }
        },

        {
          id: 'listIconLeft3',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 54,
            y: 470,
            width: 54,
            height: 54
          },
          options: {
            graphic: {
              symbolType: 'circle',
              size: 54,
              stroke: '#a9efd8',
              lineWidth: 2
            }
          }
        },

        {
          id: 'listIconRight3',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 84,
            y: 470,
            width: 54,
            height: 54
          },
          options: {
            graphic: {
              symbolType: 'circle',
              size: 54,
              stroke: '#a9efd8',
              lineWidth: 2
            }
          }
        },

        {
          id: 'listNo3',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 95,
            y: 497,
            width: 50,
            height: 50
          },
          options: {
            graphic: {
              text: '03',
              lineHeight: 48,
              fontSize: 16,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 'bold'
            }
          }
        },

        {
          id: 'listContent3',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 160,
            y: 497,
            width: 340,
            height: 54
          },
          options: {
            graphic: {
              text: `This slide is 100% editable. Adapt it to your needs and capture your audience's attention.`,
              lineHeight: 26,
              fontSize: 16,
              textAlign: 'left',
              textBaseline: 'middle',
              lineClamp: 2,
              wordBreak: 'break-word'
            }
          }
        },

        {
          id: 'listIconLeft4',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 54,
            y: 580,
            width: 54,
            height: 54
          },
          options: {
            graphic: {
              symbolType: 'circle',
              size: 54,
              stroke: '#a9efd8',
              lineWidth: 2
            }
          }
        },

        {
          id: 'listIconRight4',
          type: 'Shape',
          zIndex: 0,
          position: {
            x: 84,
            y: 580,
            width: 54,
            height: 54
          },
          options: {
            graphic: {
              symbolType: 'circle',
              size: 54,
              stroke: '#a9efd8',
              lineWidth: 2
            }
          }
        },

        {
          id: 'listNo4',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 95,
            y: 607,
            width: 50,
            height: 50
          },
          options: {
            graphic: {
              text: '04',
              lineHeight: 48,
              fontSize: 16,
              textAlign: 'center',
              textBaseline: 'middle',
              fontWeight: 'bold'
            }
          }
        },

        {
          id: 'listContent4',
          type: 'Text',
          zIndex: 0,
          position: {
            x: 160,
            y: 607,
            width: 340,
            height: 54
          },
          options: {
            graphic: {
              text: `This slide is 100% editable. Adapt it to your needs and capture your audience's attention.`,
              lineHeight: 26,
              fontSize: 16,
              textAlign: 'left',
              textBaseline: 'middle',
              lineClamp: 2,
              wordBreak: 'break-word'
            }
          }
        },

        {
          id: 'wordCloud',
          type: 'VChart',
          zIndex: 0,
          position: {
            x: 720,
            y: 112,
            width: 500,
            height: 500
          },
          options: {
            spec: {
              type: 'wordCloud',
              color: [
                '#30c695',
                '#30c695',
                '#4589a7',
                '#57878b',
                '#4589a7',
                '#77a5a4',
                '#c9f0e3',
                '#c9f0e3',
                '#323436',
                '#323436'
              ],
              nameField: 'name',
              valueField: 'value',
              seriesField: 'name',
              rotateAngles: [0, 90],
              fontSizeRange: [10, 70],
              maskShape: {
                shape: 'circle',
                type: 'geometric',
                hollow: true,
                backgroundColor: '#eee'
              },
              word: {
                padding: 2,
                style: {
                  fontWeight: (datum: any) => {
                    return datum.index < 2 ? 'bolder' : datum.index < 20 ? 'bold' : 'normal';
                  }
                }
              },
              data: {
                name: 'baseData',
                values: dataWordCloud
              }
            }
          }
        }
      ]
    };

    const story = new Story(dsl, { canvas, width: 1280, height: 720, background: 'pink' });
    const player = new Player(story);
    story.init(player);
    player.play(-1);

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
