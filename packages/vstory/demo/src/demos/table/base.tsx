import React, { useEffect } from 'react';
import { Player, Story, initVR, registerGraphics, registerCharacters, IStoryDSL } from '../../../../../vstory-core/src';
import { registerVComponentAction, registerVChartAction, registerVTableAction } from '../../../../../vstory-player/src';
import { StroyAllDataGroup } from '../../../../../vstory-core/src/interface/dsl/chart';

registerGraphics();
registerCharacters();
registerVChartAction();
registerVComponentAction();
registerVTableAction();
initVR();

function loadDSL() {
  const tableSpec0 = {
    records: [
      {
        department: 'Human Resources Department',
        total_children: 30,
        monthly_expense: '$45000',
        new_hires_this_month: 6,
        resignations_this_month: 3,
        complaints_and_suggestions: 2,
        children: [
          {
            group: 'Recruiting Group',
            children: [
              {
                name: 'John Smith',
                position: 'Recruiting Manager',
                salary: '$8000'
              },
              {
                name: 'Emily Johnson',
                position: 'Recruiting Supervisor',
                salary: '$6000'
              },
              {
                name: 'Michael Davis',
                position: 'Recruiting Specialist',
                salary: '$4000'
              }
            ],
            total_children: 15,
            monthly_expense: '$25000',
            new_hires_this_month: 4,
            resignations_this_month: 2,
            complaints_and_suggestions: 1
          },
          {
            group: 'Training Group',
            children: [
              {
                name: 'Jessica Brown',
                position: 'Training Manager',
                salary: '$8000'
              },
              {
                name: 'Andrew Wilson',
                position: 'Training Supervisor',
                salary: '$6000'
              }
            ],
            total_children: 15,
            monthly_expense: '$20000',
            new_hires_this_month: 2,
            resignations_this_month: 1,
            complaints_and_suggestions: 1
          }
        ],
        hierarchyState: 'collapse'
      },
      {
        department: 'Marketing Department',
        total_children: 20,
        monthly_expense: '$35000',
        new_hires_this_month: 5,
        resignations_this_month: 2,
        complaints_and_suggestions: 1,
        children: [
          {
            group: 'Advertising Group',
            children: [
              {
                name: 'Alice Chen',
                position: 'Advertising Manager',
                salary: '$10000'
              },
              {
                name: 'Bob Wang',
                position: 'Advertising Supervisor',
                salary: '$8000'
              },
              {
                name: 'Cathy Liu',
                position: 'Advertising Specialist',
                salary: '$6000'
              }
            ],
            total_children: 10,
            monthly_expense: '$20000',
            new_hires_this_month: 3,
            resignations_this_month: 1,
            complaints_and_suggestions: 0
          },
          {
            group: 'Market Research Group',
            children: [
              {
                name: 'David Zhang',
                position: 'Market Research Manager',
                salary: '$10000'
              },
              {
                name: 'Emily Wang',
                position: 'Market Research Supervisor',
                salary: '$8000'
              },
              {
                name: 'George Chen',
                position: 'Market Research Analyst',
                salary: '$5000'
              }
            ],
            total_children: 10,
            monthly_expense: '$15000',
            new_hires_this_month: 2,
            resignations_this_month: 1,
            complaints_and_suggestions: 1
          }
        ],
        hierarchyState: 'collapse'
      },
      {
        department: 'Finance Department',
        total_children: 25,
        monthly_expense: '$40000',
        new_hires_this_month: 4,
        resignations_this_month: 1,
        complaints_and_suggestions: 0,
        children: [
          {
            group: 'Accounting Group',
            children: [
              {
                name: 'John Chen',
                position: 'Accounting Manager',
                salary: '$10000'
              },
              {
                name: 'Linda Wang',
                position: 'Accounting Supervisor',
                salary: '$8000'
              },
              {
                name: 'Sam Li',
                position: 'Accountant',
                salary: '$6000'
              }
            ],
            total_children: 10,
            monthly_expense: '$20000',
            new_hires_this_month: 2,
            resignations_this_month: 0,
            complaints_and_suggestions: 0
          },
          {
            group: 'Financial Planning Group',
            children: [
              {
                name: 'Kevin Zhang',
                position: 'Financial Planning Manager',
                salary: '$10000'
              },
              {
                name: 'Grace Liu',
                position: 'Financial Planning Supervisor',
                salary: '$8000'
              },
              {
                name: 'Tom Wang',
                position: 'Financial Planner',
                salary: '$6000'
              }
            ],
            total_children: 15,
            monthly_expense: '$20000',
            new_hires_this_month: 2,
            resignations_this_month: 1,
            complaints_and_suggestions: 0
          }
        ],
        hierarchyState: 'collapse'
      },
      {
        department: 'Sales Department',
        total_children: 35,
        monthly_expense: '$50000',
        new_hires_this_month: 7,
        resignations_this_month: 4,
        complaints_and_suggestions: 2,
        children: [
          {
            group: 'Inside Sales Group',
            children: [
              {
                name: 'Alex Brown',
                position: 'Inside Sales Manager',
                salary: '$10000'
              },
              {
                name: 'Julia Lee',
                position: 'Inside Sales Supervisor',
                salary: '$8000'
              },
              {
                name: 'Erica Chen',
                position: 'Inside Sales Representative',
                salary: '$5000'
              }
            ],
            total_children: 15,
            monthly_expense: '$25000',
            new_hires_this_month: 4,
            resignations_this_month: 2,
            complaints_and_suggestions: 1
          },
          {
            group: 'Outside Sales Group',
            children: [
              {
                name: 'Daniel Zhang',
                position: 'Outside Sales Manager',
                salary: '$10000'
              },
              {
                name: 'Karen Wang',
                position: 'Outside Sales Supervisor',
                salary: '$8000'
              },
              {
                name: 'Jack Liu',
                position: 'Outside Sales Representative',
                salary: '$5000'
              }
            ],
            total_children: 20,
            monthly_expense: '$25000',
            new_hires_this_month: 3,
            resignations_this_month: 2,
            complaints_and_suggestions: 1
          }
        ],
        hierarchyState: 'collapse'
      },
      {
        department: 'IT Department',
        total_children: 40,
        monthly_expense: '$60000',
        new_hires_this_month: 8,
        resignations_this_month: 3,
        complaints_and_suggestions: 1,
        children: [
          {
            group: 'Software Development Group',
            children: [
              {
                name: 'Jason Wang',
                position: 'Software Development Manager',
                salary: '$12000'
              },
              {
                name: 'Emily Chen',
                position: 'Software Development Supervisor',
                salary: '$10000'
              },
              {
                name: 'David Li',
                position: 'Software Developer',
                salary: '$8000'
              }
            ],
            total_children: 25,
            monthly_expense: '$40000',
            new_hires_this_month: 5,
            resignations_this_month: 1,
            complaints_and_suggestions: 1
          },
          {
            group: 'IT Support Group',
            children: [
              {
                name: 'Michael Zhang',
                position: 'IT Support Manager',
                salary: '$10000'
              },
              {
                name: 'Lucy Wang',
                position: 'IT Support Supervisor',
                salary: '$8000'
              },
              {
                name: 'Sam Li',
                position: 'IT Support Specialist',
                salary: '$6000'
              }
            ],
            total_children: 15,
            monthly_expense: '$20000',
            new_hires_this_month: 3,
            resignations_this_month: 2,
            complaints_and_suggestions: 0
          }
        ],
        hierarchyState: 'collapse'
      },
      {
        department: 'Purchasing Department',
        total_children: 25,
        monthly_expense: '$35000',
        new_hires_this_month: 4,
        resignations_this_month: 1,
        complaints_and_suggestions: 0,
        children: [
          {
            group: 'Procurement Group',
            children: [
              {
                name: 'David Chen',
                position: 'Procurement Manager',
                salary: '$8000'
              },
              {
                name: 'Karen Zhang',
                position: 'Procurement Supervisor',
                salary: '$6000'
              },
              {
                name: 'Tom Li',
                position: 'Procurement Specialist',
                salary: '$4000'
              }
            ],
            total_children: 15,
            monthly_expense: '$25000',
            new_hires_this_month: 3,
            resignations_this_month: 1,
            complaints_and_suggestions: 0
          },
          {
            group: 'Logistics Group',
            children: [
              {
                name: 'Alice Wang',
                position: 'Logistics Manager',
                salary: '$8000'
              },
              {
                name: 'Bob Chen',
                position: 'Logistics Supervisor',
                salary: '$6000'
              },
              {
                name: 'Cathy Li',
                position: 'Logistics Specialist',
                salary: '$4000'
              }
            ],
            total_children: 10,
            monthly_expense: '$10000',
            new_hires_this_month: 1,
            resignations_this_month: 0,
            complaints_and_suggestions: 0
          }
        ],
        hierarchyState: 'collapse'
      },
      {
        department: 'Customer Service Department',
        total_children: 30,
        monthly_expense: '$40000',
        new_hires_this_month: 5,
        resignations_this_month: 2,
        complaints_and_suggestions: 2,
        children: [
          {
            group: 'Customer Support Group',
            children: [
              {
                name: 'Emma Zhang',
                position: 'Customer Support Manager',
                salary: '$8000'
              },
              {
                name: 'Kevin Wang',
                position: 'Customer Support Supervisor',
                salary: '$6000'
              },
              {
                name: 'Lucy Li',
                position: 'Customer Support Representative',
                salary: '$4000'
              }
            ],
            total_children: 20,
            monthly_expense: '$25000',
            new_hires_this_month: 3,
            resignations_this_month: 2,
            complaints_and_suggestions: 2
          },
          {
            group: 'Technical Support Group',
            children: [
              {
                name: 'Frank Chen',
                position: 'Technical Support Manager',
                salary: '$8000'
              },
              {
                name: 'Grace Zhang',
                position: 'Technical Support Supervisor',
                salary: '$6000'
              },
              {
                name: 'Jack Wang',
                position: 'Technical Support Specialist',
                salary: '$4000'
              }
            ],
            total_children: 10,
            monthly_expense: '$15000',
            new_hires_this_month: 2,
            resignations_this_month: 0,
            complaints_and_suggestions: 0
          }
        ],
        hierarchyState: 'collapse'
      }
    ],
    columns: [
      {
        field: 'group',
        title: 'department',
        width: 'auto',
        tree: true
      },
      {
        field: 'total_children',
        title: 'memebers count',
        width: 'auto'
      },
      {
        field: 'monthly_expense',
        title: 'monthly expense',
        width: 'auto'
      },
      {
        field: 'new_hires_this_month',
        title: 'new hires this month',
        width: 'auto'
      },
      {
        field: 'resignations_this_month',
        title: 'resignations this month',
        width: 'auto'
      },
      {
        field: 'complaints_and_suggestions',
        title: 'recived complaints counts',
        width: 'auto'
      }
    ],
    widthMode: 'standard'
  };
  const barSpec1 = {
    type: 'bar',
    data: [
      {
        values: [
          { type: 'Category One', min: 76, max: 100, range: 'A', type2: 'p', color: 'A_p' },
          { type: 'Category Two', min: 56, max: 108, range: 'A', type2: 'p', color: 'A_p' },
          { type: 'Category One', min: 56, max: 100, range: 'B', type2: 'p', color: 'B_p' },
          { type: 'Category Two', min: 36, max: 108, range: 'B', type2: 'p', color: 'B_p' },

          { type: 'Category One', min: 76, max: 100, range: 'A', type2: 'k', color: 'A_k' },
          { type: 'Category Two', min: 56, max: 108, range: 'A', type2: 'k', color: 'A_k' },
          { type: 'Category One', min: 56, max: 100, range: 'B', type2: 'k', color: 'B_k' },
          { type: 'Category Two', min: 36, max: 108, range: 'B', type2: 'k', color: 'B_k' }
        ]
      }
    ],
    xField: ['type', 'range', 'type2'],
    yField: 'min',
    seriesField: 'color',
    paddingInner: [0.6, 0.6, 0.6],
    bandPadding: [0.6, 0.6, 0.6],
    label: {
      position: 'bothEnd'
    },
    axes: [
      {
        orient: 'bottom',
        showAllGroupLayers: true,
        sampling: false,
        tick: {
          tickCount: 2
        }
      }
    ],
    legends: {
      visible: true
    }
  };
  const dsl: IStoryDSL = {
    characters: [
      {
        type: 'VTable',
        id: 'table0',
        zIndex: 10,
        position: {
          top: 50,
          left: 50,
          width: 500,
          height: 300
        },
        options: {
          spec: tableSpec0,
          initOption: {
            interactive: true,
            animation: false,
            disableTriggerEvent: true,
            disableDirtyBounds: true
          },
          dataGroupStyle: {
            [StroyAllDataGroup]: {
              label: {
                // visible: true,
                style: {
                  fill: 'green',
                  stroke: 'yellow',
                  lineWidth: 2
                }
              }
            },
            a: {
              label: {
                // visible: true,
                style: {
                  fill: 'red'
                }
              }
            },
            b: {
              label: {
                // visible: true,
                style: {
                  stroke: 'blue',
                  lineWidth: 5
                }
              }
            }
          }
        }
      }
      // {
      //   type: 'VChart',
      //   id: 'chart1',
      //   zIndex: 10,
      //   position: {
      //     top: 380,
      //     left: 50,
      //     width: 500,
      //     height: 300
      //   },
      //   options: {
      //     spec: barSpec1,
      //     initOption: {
      //       interactive: true,
      //       animation: false,
      //       disableTriggerEvent: true,
      //       disableDirtyBounds: true
      //     },
      //     dataGroupStyle: {
      //       [StroyAllDataGroup]: {
      //         bar: {
      //           style: {
      //             fill: 'green',
      //             stroke: 'yellow',
      //             lineWidth: 2
      //           }
      //         }
      //       },
      //       A_p: {
      //         bar: {
      //           style: {
      //             fill: 'red'
      //           }
      //         }
      //       },
      //       B_k: {
      //         bar: {
      //           style: {
      //             stroke: 'blue',
      //             lineWidth: 5
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
    ],
    acts: []
  };
  dsl.acts = [
    {
      id: 'defaultAct',
      scenes: [
        {
          id: 'defaultScene',
          actions: [
            {
              characterId: dsl.characters.map(i => i.id),
              characterActions: [
                {
                  action: 'appear'
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  return dsl;
}

export const TableBase = () => {
  const id = 'table-base';

  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 800, height: 800, background: 'gray' });
    const player = new Player(story);
    story.init(player);
    // @ts-ignore
    window.story = story;
    // @ts-ignore
    window.player = player;
    const dsl = loadDSL();
    story.load(dsl);
    player.play(-1);

    const table0 = story.getCharacterById('table0');
    // @ts-ignore
    window.table0 = table0;

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
