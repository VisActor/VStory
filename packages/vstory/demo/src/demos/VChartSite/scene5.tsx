import type { ICharacterSpec } from '../../../../src/story/character';
import type { ISceneSpec } from '../../../../src/story/interface';
import scene5TitleImage from '../../assets/scene5/title-image.png';
import scene5Decoration from '../../assets/scene5/bg-decoration.png';
import scene5Atom from '../../assets/scene5/atom.png';
import scene5ChartImage from '../../assets/scene5/chart.png';
import scene5EnText from '../../assets/scene5/text-en.png';
import scene5ZhText from '../../assets/scene5/text-zh.png';
import { easeInOutQuad } from './util';
import { Matrix } from '@visactor/vutils';

const chartSpec = {
  type: 'sequence',
  scrollBar: { visible: false },
  color: ['#64b5fc', '#ff8f62'],
  series: [
    {
      type: 'link',
      dataId: 'dataLinkSeries',
      dotSeriesIndex: 1,
      fromField: 'from',
      toField: 'to',
      tooltip: {
        mark: {
          title: {
            key: 'link 信息',
            value: 'link 信息'
          },
          content: [
            {
              hasShape: true,
              shapeType: 'square',
              key: 'from',
              value: (datum: any) => datum.from
            },
            {
              hasShape: true,
              shapeType: 'square',
              key: 'to',
              value: (datum: any) => datum.to
            }
          ]
        }
      },
      arrow: {
        style: {
          visible: false
        }
      },
      link: {
        style: {
          stroke: '#ccc'
        }
      }
    },
    {
      type: 'dot',
      dataId: 'dataDotSeries',
      xField: 'event_time',
      yField: 'player_name',
      dotTypeField: 'event_type',
      titleField: 'player_name',
      highLightSeriesGroup: '',
      height: 300,
      clipHeight: 800,
      title: {
        style: {
          fill: 'rgba(46, 47, 50)'
        }
      },
      subTitle: {
        style: {
          fill: 'rgba(46, 47, 50)',
          dy: 7
        }
      },
      grid: {
        style: {
          visible: false
        }
      },
      symbol: {
        style: {
          visible: false
        }
      },
      tooltip: {
        mark: {
          title: {
            key: 'event 信息',
            value: 'event 信息'
          },
          content: [
            {
              hasShape: true,
              shapeType: 'square',
              key: (datum: any) => datum.player_name
            },
            {
              hasShape: false,
              key: 'event_time_stamp',
              value: (datum: any) => datum.event_time
            }
          ]
        }
      }
    }
  ],
  axes: [
    {
      orient: 'top',
      type: 'time',
      range: {
        min: -2209017943000,
        max: -2209015063000
      },
      layers: [
        {
          tickStep: 28800,
          timeFormat: '%Y%m%d'
        },
        {
          tickStep: 28800,
          timeFormat: '%H:%M'
        }
      ],
      label: {
        visible: false
      }
    }
  ],
  data: [
    {
      id: 'dataDotSeries',
      values: [
        {
          player_name: 'Deandre Ayton',
          type: 'Deandre Ayton',
          dots: [
            {
              event_time: -2209017943000,
              node_name: 'Deandre Ayton_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209017476000,
              node_name: 'Deandre Ayton_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016998000,
              node_name: 'Deandre Ayton_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016057000,
              node_name: 'Deandre Ayton_1_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209015551000,
              node_name: 'Deandre Ayton_2_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015127000,
              node_name: 'Deandre Ayton_2_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209015116000,
              node_name: 'Deandre Ayton_3_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015063000,
              node_name: 'Deandre Ayton_3_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Devin Booker',
          type: 'Devin Booker',
          dots: [
            {
              event_time: -2209017943000,
              node_name: 'Devin Booker_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209017293000,
              node_name: 'Devin Booker_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016892000,
              node_name: 'Devin Booker_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015783000,
              node_name: 'Devin Booker_1_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209015380000,
              node_name: 'Devin Booker_2_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015063000,
              node_name: 'Devin Booker_2_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Kyle Lowry',
          type: 'Kyle Lowry',
          dots: [
            {
              event_time: -2209017943000,
              node_name: 'Kyle Lowry_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209017476000,
              node_name: 'Kyle Lowry_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209017223000,
              node_name: 'Kyle Lowry_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016762000,
              node_name: 'Kyle Lowry_1_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016614000,
              node_name: 'Kyle Lowry_2_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016057000,
              node_name: 'Kyle Lowry_2_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209015884000,
              node_name: 'Kyle Lowry_3_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015063000,
              node_name: 'Kyle Lowry_3_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Jae Crowder',
          type: 'Jae Crowder',
          dots: [
            {
              event_time: -2209017943000,
              node_name: 'Jae Crowder_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209017293000,
              node_name: 'Jae Crowder_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016998000,
              node_name: 'Jae Crowder_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016139000,
              node_name: 'Jae Crowder_1_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209015651000,
              node_name: 'Jae Crowder_2_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015063000,
              node_name: 'Jae Crowder_2_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Aron Baynes',
          type: 'Aron Baynes',
          dots: [
            {
              event_time: -2209017943000,
              node_name: 'Aron Baynes_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209017476000,
              node_name: 'Aron Baynes_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016503000,
              node_name: 'Aron Baynes_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016166000,
              node_name: 'Aron Baynes_1_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Pascal Siakam',
          type: 'Pascal Siakam',
          dots: [
            {
              event_time: -2209016892000,
              node_name: 'Pascal Siakam_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015788000,
              node_name: 'Pascal Siakam_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209015528000,
              node_name: 'Pascal Siakam_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015063000,
              node_name: 'Pascal Siakam_1_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209017943000,
              node_name: 'Pascal Siakam_2_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209017223000,
              node_name: 'Pascal Siakam_2_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Mikal Bridges',
          type: 'Mikal Bridges',
          dots: [
            {
              event_time: -2209017943000,
              node_name: 'Mikal Bridges_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209017650000,
              node_name: 'Mikal Bridges_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016998000,
              node_name: 'Mikal Bridges_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016762000,
              node_name: 'Mikal Bridges_1_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016503000,
              node_name: 'Mikal Bridges_2_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016003000,
              node_name: 'Mikal Bridges_2_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209015783000,
              node_name: 'Mikal Bridges_3_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015063000,
              node_name: 'Mikal Bridges_3_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Chris Paul',
          type: 'Chris Paul',
          dots: [
            {
              event_time: -2209017943000,
              node_name: 'Chris Paul_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209017476000,
              node_name: 'Chris Paul_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016998000,
              node_name: 'Chris Paul_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016057000,
              node_name: 'Chris Paul_1_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209015551000,
              node_name: 'Chris Paul_2_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015063000,
              node_name: 'Chris Paul_2_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'OG Anunoby',
          type: 'OG Anunoby',
          dots: [
            {
              event_time: -2209017943000,
              node_name: 'OG Anunoby_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209017476000,
              node_name: 'OG Anunoby_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209017223000,
              node_name: 'OG Anunoby_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016614000,
              node_name: 'OG Anunoby_1_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016503000,
              node_name: 'OG Anunoby_2_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016021000,
              node_name: 'OG Anunoby_2_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209015788000,
              node_name: 'OG Anunoby_3_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015063000,
              node_name: 'OG Anunoby_3_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Fred VanVleet',
          type: 'Fred VanVleet',
          dots: [
            {
              event_time: -2209016892000,
              node_name: 'Fred VanVleet_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015884000,
              node_name: 'Fred VanVleet_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209015651000,
              node_name: 'Fred VanVleet_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015063000,
              node_name: 'Fred VanVleet_1_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209017943000,
              node_name: 'Fred VanVleet_2_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209017223000,
              node_name: 'Fred VanVleet_2_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Cameron Johnson',
          type: 'Cameron Johnson',
          dots: [
            {
              event_time: -2209017650000,
              node_name: 'Cameron Johnson_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016998000,
              node_name: 'Cameron Johnson_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016762000,
              node_name: 'Cameron Johnson_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016503000,
              node_name: 'Cameron Johnson_1_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016139000,
              node_name: 'Cameron Johnson_2_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015651000,
              node_name: 'Cameron Johnson_2_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Yuta Watanabe',
          type: 'Yuta Watanabe',
          dots: [
            {
              event_time: -2209017476000,
              node_name: 'Yuta Watanabe_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016892000,
              node_name: 'Yuta Watanabe_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016021000,
              node_name: 'Yuta Watanabe_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015651000,
              node_name: 'Yuta Watanabe_1_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Dario Saric',
          type: 'Dario Saric',
          dots: [
            {
              event_time: -2209017476000,
              node_name: 'Dario Saric_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016998000,
              node_name: 'Dario Saric_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016057000,
              node_name: 'Dario Saric_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015551000,
              node_name: 'Dario Saric_1_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209015127000,
              node_name: 'Dario Saric_2_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015116000,
              node_name: 'Dario Saric_2_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Chris Boucher',
          type: 'Chris Boucher',
          dots: [
            {
              event_time: -2209017476000,
              node_name: 'Chris Boucher_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016998000,
              node_name: 'Chris Boucher_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209015962000,
              node_name: 'Chris Boucher_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015528000,
              node_name: 'Chris Boucher_1_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Norman Powell',
          type: 'Norman Powell',
          dots: [
            {
              event_time: -2209017476000,
              node_name: 'Norman Powell_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209017119000,
              node_name: 'Norman Powell_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016762000,
              node_name: 'Norman Powell_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016547000,
              node_name: 'Norman Powell_1_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016057000,
              node_name: 'Norman Powell_2_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015063000,
              node_name: 'Norman Powell_2_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Cameron Payne',
          type: 'Cameron Payne',
          dots: [
            {
              event_time: -2209017476000,
              node_name: 'Cameron Payne_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016998000,
              node_name: 'Cameron Payne_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016057000,
              node_name: 'Cameron Payne_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015551000,
              node_name: 'Cameron Payne_1_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Langston Galloway',
          type: 'Langston Galloway',
          dots: [
            {
              event_time: -2209017293000,
              node_name: 'Langston Galloway_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016998000,
              node_name: 'Langston Galloway_0_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Jevon Carter',
          type: 'Jevon Carter',
          dots: [
            {
              event_time: -2209017293000,
              node_name: 'Jevon Carter_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016892000,
              node_name: 'Jevon Carter_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016003000,
              node_name: 'Jevon Carter_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015380000,
              node_name: 'Jevon Carter_1_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Malachi Flynn',
          type: 'Malachi Flynn',
          dots: [
            {
              event_time: -2209017119000,
              node_name: 'Malachi Flynn_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016892000,
              node_name: 'Malachi Flynn_0_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: 'Alex Len',
          type: 'Alex Len',
          dots: [
            {
              event_time: -2209016998000,
              node_name: 'Alex Len_0_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209016503000,
              node_name: 'Alex Len_0_end_node',
              event_type: 'end'
            },
            {
              event_time: -2209016166000,
              node_name: 'Alex Len_1_start_node',
              event_type: 'start'
            },
            {
              event_time: -2209015962000,
              node_name: 'Alex Len_1_end_node',
              event_type: 'end'
            }
          ]
        },
        {
          player_name: "DeAndre' Bembry",
          type: "DeAndre' Bembry",
          dots: [
            {
              event_time: -2209016547000,
              node_name: "DeAndre' Bembry_0_start_node",
              event_type: 'start'
            },
            {
              event_time: -2209015783000,
              node_name: "DeAndre' Bembry_0_end_node",
              event_type: 'end'
            }
          ]
        }
      ]
    },
    {
      id: 'dataLinkSeries',
      values: [
        {
          pos: 'Deandre Ayton_0_start_node',
          to: 'Deandre Ayton_0_end_node'
        },
        {
          pos: 'Deandre Ayton_1_start_node',
          to: 'Deandre Ayton_1_end_node'
        },
        {
          pos: 'Deandre Ayton_2_start_node',
          to: 'Deandre Ayton_2_end_node'
        },
        {
          pos: 'Deandre Ayton_3_start_node',
          to: 'Deandre Ayton_3_end_node'
        },
        {
          pos: 'Devin Booker_0_start_node',
          to: 'Devin Booker_0_end_node'
        },
        {
          pos: 'Devin Booker_1_start_node',
          to: 'Devin Booker_1_end_node'
        },
        {
          pos: 'Devin Booker_2_start_node',
          to: 'Devin Booker_2_end_node'
        },
        {
          pos: 'Kyle Lowry_0_start_node',
          to: 'Kyle Lowry_0_end_node'
        },
        {
          pos: 'Kyle Lowry_1_start_node',
          to: 'Kyle Lowry_1_end_node'
        },
        {
          pos: 'Kyle Lowry_2_start_node',
          to: 'Kyle Lowry_2_end_node'
        },
        {
          pos: 'Kyle Lowry_3_start_node',
          to: 'Kyle Lowry_3_end_node'
        },
        {
          pos: 'Jae Crowder_0_start_node',
          to: 'Jae Crowder_0_end_node'
        },
        {
          pos: 'Jae Crowder_1_start_node',
          to: 'Jae Crowder_1_end_node'
        },
        {
          pos: 'Jae Crowder_2_start_node',
          to: 'Jae Crowder_2_end_node'
        },
        {
          pos: 'Aron Baynes_0_start_node',
          to: 'Aron Baynes_0_end_node'
        },
        {
          pos: 'Aron Baynes_1_start_node',
          to: 'Aron Baynes_1_end_node'
        },
        {
          pos: 'Pascal Siakam_0_start_node',
          to: 'Pascal Siakam_0_end_node'
        },
        {
          pos: 'Pascal Siakam_1_start_node',
          to: 'Pascal Siakam_1_end_node'
        },
        {
          pos: 'Pascal Siakam_2_start_node',
          to: 'Pascal Siakam_2_end_node'
        },
        {
          pos: 'Mikal Bridges_0_start_node',
          to: 'Mikal Bridges_0_end_node'
        },
        {
          pos: 'Mikal Bridges_1_start_node',
          to: 'Mikal Bridges_1_end_node'
        },
        {
          pos: 'Mikal Bridges_2_start_node',
          to: 'Mikal Bridges_2_end_node'
        },
        {
          pos: 'Mikal Bridges_3_start_node',
          to: 'Mikal Bridges_3_end_node'
        },
        {
          pos: 'Chris Paul_0_start_node',
          to: 'Chris Paul_0_end_node'
        },
        {
          pos: 'Chris Paul_1_start_node',
          to: 'Chris Paul_1_end_node'
        },
        {
          pos: 'Chris Paul_2_start_node',
          to: 'Chris Paul_2_end_node'
        },
        {
          pos: 'OG Anunoby_0_start_node',
          to: 'OG Anunoby_0_end_node'
        },
        {
          pos: 'OG Anunoby_1_start_node',
          to: 'OG Anunoby_1_end_node'
        },
        {
          pos: 'OG Anunoby_2_start_node',
          to: 'OG Anunoby_2_end_node'
        },
        {
          pos: 'OG Anunoby_3_start_node',
          to: 'OG Anunoby_3_end_node'
        },
        {
          pos: 'Fred VanVleet_0_start_node',
          to: 'Fred VanVleet_0_end_node'
        },
        {
          pos: 'Fred VanVleet_1_start_node',
          to: 'Fred VanVleet_1_end_node'
        },
        {
          pos: 'Fred VanVleet_2_start_node',
          to: 'Fred VanVleet_2_end_node'
        },
        {
          pos: 'Cameron Johnson_0_start_node',
          to: 'Cameron Johnson_0_end_node'
        },
        {
          pos: 'Cameron Johnson_1_start_node',
          to: 'Cameron Johnson_1_end_node'
        },
        {
          pos: 'Cameron Johnson_2_start_node',
          to: 'Cameron Johnson_2_end_node'
        },
        {
          pos: 'Yuta Watanabe_0_start_node',
          to: 'Yuta Watanabe_0_end_node'
        },
        {
          pos: 'Yuta Watanabe_1_start_node',
          to: 'Yuta Watanabe_1_end_node'
        },
        {
          pos: 'Dario Saric_0_start_node',
          to: 'Dario Saric_0_end_node'
        },
        {
          pos: 'Dario Saric_1_start_node',
          to: 'Dario Saric_1_end_node'
        },
        {
          pos: 'Dario Saric_2_start_node',
          to: 'Dario Saric_2_end_node'
        },
        {
          pos: 'Chris Boucher_0_start_node',
          to: 'Chris Boucher_0_end_node'
        },
        {
          pos: 'Chris Boucher_1_start_node',
          to: 'Chris Boucher_1_end_node'
        },
        {
          pos: 'Norman Powell_0_start_node',
          to: 'Norman Powell_0_end_node'
        },
        {
          pos: 'Norman Powell_1_start_node',
          to: 'Norman Powell_1_end_node'
        },
        {
          pos: 'Norman Powell_2_start_node',
          to: 'Norman Powell_2_end_node'
        },
        {
          pos: 'Cameron Payne_0_start_node',
          to: 'Cameron Payne_0_end_node'
        },
        {
          pos: 'Cameron Payne_1_start_node',
          to: 'Cameron Payne_1_end_node'
        },
        {
          pos: 'Langston Galloway_0_start_node',
          to: 'Langston Galloway_0_end_node'
        },
        {
          pos: 'Jevon Carter_0_start_node',
          to: 'Jevon Carter_0_end_node'
        },
        {
          pos: 'Jevon Carter_1_start_node',
          to: 'Jevon Carter_1_end_node'
        },
        {
          pos: 'Malachi Flynn_0_start_node',
          to: 'Malachi Flynn_0_end_node'
        },
        {
          pos: 'Alex Len_0_start_node',
          to: 'Alex Len_0_end_node'
        },
        {
          pos: 'Alex Len_1_start_node',
          to: 'Alex Len_1_end_node'
        },
        {
          pos: "DeAndre' Bembry_0_start_node",
          to: "DeAndre' Bembry_0_end_node"
        }
      ]
    }
  ]
};

const getTransformPointFunc = (offsetX: number, offsetY: number, scaleX: number, scaleY: number) => {
  const m = new Matrix().translate(-offsetX, -offsetY).setScale(1 / scaleX, 1 / scaleY);
  return (x: number, y: number) => {
    const point = { x: 0, y: 0 };
    m.transformPoint({ x, y }, point);
    return point;
  };
};

export const scene5Characters: ICharacterSpec[] = [
  {
    type: 'Rect',
    id: `scene5-background-top`,
    zIndex: 0,
    position: {
      top: 0,
      left: 0,
      width: 1440,
      height: 590
    },
    options: {
      graphic: {
        stroke: false,
        fill: 'rgb(214,216,216)'
      }
    }
  },
  {
    type: 'Rect',
    id: `scene5-background-bottom`,
    zIndex: 0,
    position: {
      top: 590,
      left: 0,
      width: 1440,
      height: 220
    },
    options: {
      graphic: {
        stroke: false,
        fill: 'rgb(242,242,241)'
      }
    }
  },
  {
    type: 'Image',
    id: `scene5-title-image`,
    zIndex: 1,
    position: {
      top: 125,
      left: 210,
      width: 256,
      height: 421
    },
    options: {
      graphic: {
        image: scene5TitleImage
      }
    }
  },
  {
    type: 'Image',
    id: `scene5-background-decoration`,
    zIndex: 0,
    position: {
      top: 0,
      left: 56,
      width: 1080,
      height: 607
    },
    options: {
      graphic: {
        image: scene5Decoration,
        scale: 0.6
      }
    }
  },
  {
    type: 'Image',
    id: `scene5-atom`,
    zIndex: 0,
    position: {
      top: 620,
      left: 210,
      width: 400,
      height: 140
    },
    options: {
      graphic: {
        image: scene5Atom
      }
    }
  },
  {
    type: 'Image',
    id: `scene5-zh-text`,
    zIndex: 0,
    position: {
      top: 406,
      left: 520,
      width: 200,
      height: 90
    },
    options: {
      graphic: {
        image: scene5ZhText
      }
    }
  },
  {
    type: 'Image',
    id: `scene5-en-text`,
    zIndex: 0,
    position: {
      top: 640,
      left: 700,
      width: 440,
      height: 100
    },
    options: {
      graphic: {
        image: scene5EnText
      }
    }
  },
  {
    type: 'Image',
    id: `scene5-chart-image`,
    zIndex: 0,
    position: {
      top: 163,
      left: 828,
      width: 310,
      height: 390
    },
    options: {
      graphic: {
        image: scene5ChartImage
      }
    }
  },
  {
    type: 'VChart',
    id: `scene5-chart`,
    zIndex: 0,
    position: {
      top: 190,
      left: 830,
      width: 306,
      height: 350
    },
    options: {
      spec: chartSpec,
      panel: {
        fill: 'white'
      }
    }
  }
];

export const scene5: ISceneSpec = {
  id: 'scene5',
  actions: [
    {
      characterId: 'scene5-background-top',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              easing: easeInOutQuad,
              duration: 700,
              effect: 'move',
              move: {
                pos: 'top'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene5-background-decoration',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              easing: easeInOutQuad,
              duration: 700,
              effect: 'move',
              move: {
                pos: 'top'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene5-background-bottom',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              easing: easeInOutQuad,
              duration: 700,
              effect: 'move',
              move: {
                pos: 'bottom'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene5-title-image',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              easing: easeInOutQuad,
              duration: 700,
              effect: 'move',
              move: {
                pos: 'top'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene5-zh-text',
      characterActions: [
        {
          startTime: 200,
          action: 'appear',
          payload: {
            animation: {
              easing: easeInOutQuad,
              duration: 700,
              effect: 'move',
              move: {
                pos: 'top'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene5-chart-image',
      characterActions: [
        {
          startTime: 400,
          action: 'appear',
          payload: {
            animation: {
              easing: easeInOutQuad,
              duration: 700,
              effect: 'move',
              move: {
                pos: 'top'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene5-atom',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              easing: easeInOutQuad,
              duration: 700,
              effect: 'move',
              move: {
                pos: 'bottom'
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene5-chart',
      characterActions: [
        {
          startTime: 2000,
          action: 'appear',
          payload: {
            animation: {
              easing: easeInOutQuad,
              duration: 700,
              fade: {
                isBaseOpacity: true
              }
            }
          }
        },
        {
          startTime: 4000,
          action: 'disappear',
          payload: {
            animation: {
              easing: easeInOutQuad,
              duration: 700,
              fade: {
                opacity: 0,
                isBaseOpacity: true
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene5-en-text',
      characterActions: [
        {
          startTime: 300,
          action: 'appear',
          payload: {
            animation: {
              easing: easeInOutQuad,
              duration: 700,
              effect: 'move',
              move: {
                pos: 'bottom'
              }
            }
          }
        }
      ]
    }
  ]
};

// disappear
scene5.actions
  .filter(({ characterId }) => characterId !== 'scene5-chart')
  .forEach(({ characterId, characterActions }) => {
    const duration = 1000;

    if (characterId !== 'scene5-background-decoration') {
      const scaleX = 4;
      const scaleY = 4;
      const transformPointFunc = getTransformPointFunc(-450, -180, scaleX, scaleY);

      const character = scene5Characters.find(c => c.id === characterId);
      if (character) {
        // @ts-ignore
        const { left, top, width, height } = character.position;
        const { x, y } = transformPointFunc(left, top);
        const newWidth = width * scaleX;
        const newHeight = height * scaleY;
        characterActions.push({
          startTime: 5400,
          action: 'style',
          payload: {
            graphic: {
              width: newWidth,
              height: newHeight,
              x,
              y
            },
            animation: {
              easing: easeInOutQuad,
              duration
            }
          }
        });
      }
    }
    characterActions.push({
      startTime: 5400,
      action: 'disappear',
      payload: {
        animation: {
          easing: easeInOutQuad,
          duration,
          fade: {
            opacity: 0
          }
        }
      }
    });
  });
