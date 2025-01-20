---
category: examples
group: character
title: vchart
keywords: vchart
order: 1-0
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/vchart.gif
---

# VTable表格元素

`VTable`是一种通用的Character元素，你可以去[VTable官网](/vtable)查看更多表格类型。配置你想要的表格，然后放在VStory中进行二次的定义和配置。
设置`type: 'VTable'`即可使用该表格作为Character。

## 代码演示

```javascript livedemo template=vstory
// 注册所有需要的内容
VStory.registerAll();
// 需要用到的图表，一个普通柱状图就可以
const columns = [
  {
    field: 'group',
    title: 'department',
    width: 'auto',
    tree: true,
    fieldFormat(rec) {
      return rec['department'] ?? rec['group'] ?? rec['name'];
    }
  },
  {
    field: 'total_children',
    title: 'memebers count',
    width: 'auto',
    fieldFormat(rec) {
      if (rec?.['position']) {
        return `position:  ${rec['position']}`;
      } else return rec?.['total_children'];
    }
  },
  {
    field: 'monthly_expense',
    title: 'monthly expense',
    width: 'auto',
    fieldFormat(rec) {
      if (rec?.['salary']) {
        return `salary:  ${rec['salary']}`;
      } else return rec?.['monthly_expense'];
    }
  },
];

const listTableOption = {
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
  columns,
  widthMode: 'standard'
};

// 定义故事的dsl
const dsl = {
  characters: [
      {
        type: 'VTable',
        id: 'table0',
        zIndex: 10,
        position: {
          top: 20,
          left: 20,
          width: 600,
          height: 300
        },
        options: {
          spec: listTableOption,
          initOption: {
            interactive: true,
            animation: false,
            disableTriggerEvent: true,
            disableDirtyBounds: true
          }
        }
      }
  ],
  acts: [
    {
      id: 'default-chapter',
      scenes: [
        {
          id: 'scene0',
          actions: [
            {
              characterId: 'table0',
              characterActions: [
                {
                  action: 'bounce',
                  payload: {
                    animation: {
                      duration: 2000,
                      easing: 'quadOut'
                    },
                    type: 'bounce4',
                    flipY: true
                    // dy: 30,
                  }
                },
              ]
            }
          ]
        }
      ]
    }
  ]
};

const story = new VStory.Story(dsl, { dom: CONTAINER_ID, width: 630, height: 200, scaleX: 'auto', scaleY: 'auto', background: '#ebecf0' });
const player = new VStory.Player(story);
story.init(player);

player.play(0);
window['story'] = story;
window['vstory'] = story;
```
