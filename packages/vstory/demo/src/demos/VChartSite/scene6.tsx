import type { ICharacterSpec } from '../../../../src/story/character';
import type { ISceneSpec } from '../../../../src/story/interface';
import scene5MainImage from '../../assets/scene6/main-image.png';

const asiaData: Array<{
  max: number;
  min: number;
  country: string;
  continent: string;
  type?: string;
}>[] = [
  [
    {
      max: 239.27,
      min: 0,
      country: '日本',
      continent: '亚洲'
    },
    {
      max: 22.96,
      min: 0,
      country: '印度',
      continent: '亚洲'
    },
    {
      max: 7.87,
      min: 0,
      country: '韩国',
      continent: '亚洲'
    },
    {
      max: 17.24,
      min: 0,
      country: '土耳其',
      continent: '亚洲'
    },
    {
      max: 10.98,
      min: 0,
      country: '印尼',
      continent: '亚洲'
    },
    {
      max: 23.76,
      min: 0,
      country: '沙特',
      continent: '亚洲'
    },
    {
      max: 4.13,
      min: 0,
      country: '泰国',
      continent: '亚洲'
    },
    {
      max: 5.66,
      min: 0,
      country: '菲律宾',
      continent: '亚洲'
    },
    {
      max: 2.78,
      min: 0,
      country: '马来',
      continent: '亚洲'
    },
    {
      max: 114.75,
      min: 0,
      country: '英国',
      continent: '欧洲'
    },
    {
      max: 107.57,
      min: 0,
      country: '意大利',
      continent: '欧洲'
    },
    {
      max: 55.99,
      min: 0,
      country: '西班牙',
      continent: '欧洲'
    },
    {
      max: 36.41,
      min: 0,
      country: '荷兰',
      continent: '欧洲'
    },
    {
      max: 33.92,
      min: 0,
      country: '瑞士',
      continent: '欧洲'
    },
    {
      max: 9.93,
      min: 0,
      country: '芬兰',
      continent: '欧洲'
    },
    {
      max: 23.02,
      min: 0,
      country: '瑞典',
      continent: '欧洲'
    },
    {
      max: 22.28,
      min: 0,
      country: '比利时',
      continent: '欧洲'
    },
    {
      max: 14.54,
      min: 0,
      country: '挪威',
      continent: '欧洲'
    }
  ],
  [
    {
      max: 278.39,
      min: 0,
      country: '日本',
      continent: '亚洲'
    },
    {
      max: 29.22,
      min: 0,
      country: '印度',
      continent: '亚洲'
    },
    {
      max: 13.12,
      min: 0,
      country: '韩国',
      continent: '亚洲'
    },
    {
      max: 22.62,
      min: 0,
      country: '土耳其',
      continent: '亚洲'
    },
    {
      max: 15.39,
      min: 0,
      country: '印尼',
      continent: '亚洲'
    },
    {
      max: 30.08,
      min: 0,
      country: '沙特',
      continent: '亚洲'
    },
    {
      max: 6,
      min: 0,
      country: '泰国',
      continent: '亚洲'
    },
    {
      max: 7.48,
      min: 0,
      country: '菲律宾',
      continent: '亚洲'
    },
    {
      max: 3.9,
      min: 0,
      country: '马来',
      continent: '亚洲'
    },
    {
      max: 121.14,
      min: 0,
      country: '英国',
      continent: '欧洲'
    },
    {
      max: 126.03,
      min: 0,
      country: '意大利',
      continent: '欧洲'
    },
    {
      max: 64.08,
      min: 0,
      country: '西班牙',
      continent: '欧洲'
    },
    {
      max: 41.42,
      min: 0,
      country: '荷兰',
      continent: '欧洲'
    },
    {
      max: 32.36,
      min: 0,
      country: '瑞士',
      continent: '欧洲'
    },
    {
      max: 10.8,
      min: 0,
      country: '芬兰',
      continent: '欧洲'
    },
    {
      max: 24.65,
      min: 0,
      country: '瑞典',
      continent: '欧洲'
    },
    {
      max: 24.97,
      min: 0,
      country: '比利时',
      continent: '欧洲'
    },
    {
      max: 18.16,
      min: 0,
      country: '挪威',
      continent: '欧洲'
    }
  ],
  [
    {
      max: 336.52,
      min: 0,
      country: '日本',
      continent: '亚洲'
    },
    {
      max: 34.79,
      min: 0,
      country: '印度',
      continent: '亚洲'
    },
    {
      max: 18.48,
      min: 0,
      country: '韩国',
      continent: '亚洲'
    },
    {
      max: 25,
      min: 0,
      country: '土耳其',
      continent: '亚洲'
    },
    {
      max: 20.87,
      min: 0,
      country: '印尼',
      continent: '亚洲'
    },
    {
      max: 24.13,
      min: 0,
      country: '沙特',
      continent: '亚洲'
    },
    {
      max: 7.84,
      min: 0,
      country: '泰国',
      continent: '亚洲'
    },
    {
      max: 9.07,
      min: 0,
      country: '菲律宾',
      continent: '亚洲'
    },
    {
      max: 5.51,
      min: 0,
      country: '马来',
      continent: '亚洲'
    },
    {
      max: 129.86,
      min: 0,
      country: '英国',
      continent: '欧洲'
    },
    {
      max: 141.5,
      min: 0,
      country: '意大利',
      continent: '欧洲'
    },
    {
      max: 67.43,
      min: 0,
      country: '西班牙',
      continent: '欧洲'
    },
    {
      max: 42.83,
      min: 0,
      country: '荷兰',
      continent: '欧洲'
    },
    {
      max: 35,
      min: 0,
      country: '瑞士',
      continent: '欧洲'
    },
    {
      max: 13.13,
      min: 0,
      country: '芬兰',
      continent: '欧洲'
    },
    {
      max: 26.98,
      min: 0,
      country: '瑞典',
      continent: '欧洲'
    },
    {
      max: 26.86,
      min: 0,
      country: '比利时',
      continent: '欧洲'
    },
    {
      max: 20.98,
      min: 0,
      country: '挪威',
      continent: '欧洲'
    }
  ],
  [
    {
      max: 427.65,
      min: 0,
      country: '日本',
      continent: '亚洲'
    },
    {
      max: 45.4,
      min: 0,
      country: '印度',
      continent: '亚洲'
    },
    {
      max: 30.96,
      min: 0,
      country: '韩国',
      continent: '亚洲'
    },
    {
      max: 33.34,
      min: 0,
      country: '土耳其',
      continent: '亚洲'
    },
    {
      max: 26.89,
      min: 0,
      country: '印尼',
      continent: '亚洲'
    },
    {
      max: 25.64,
      min: 0,
      country: '沙特',
      continent: '亚洲'
    },
    {
      max: 11.35,
      min: 0,
      country: '泰国',
      continent: '亚洲'
    },
    {
      max: 8.97,
      min: 0,
      country: '菲律宾',
      continent: '亚洲'
    },
    {
      max: 6.88,
      min: 0,
      country: '马来',
      continent: '亚洲'
    },
    {
      max: 158.98,
      min: 0,
      country: '英国',
      continent: '欧洲'
    },
    {
      max: 166.06,
      min: 0,
      country: '意大利',
      continent: '欧洲'
    },
    {
      max: 80.43,
      min: 0,
      country: '西班牙',
      continent: '欧洲'
    },
    {
      max: 49.07,
      min: 0,
      country: '荷兰',
      continent: '欧洲'
    },
    {
      max: 39.95,
      min: 0,
      country: '瑞士',
      continent: '欧洲'
    },
    {
      max: 15.72,
      min: 0,
      country: '芬兰',
      continent: '欧洲'
    },
    {
      max: 31.27,
      min: 0,
      country: '瑞典',
      continent: '欧洲'
    },
    {
      max: 30.52,
      min: 0,
      country: '比利时',
      continent: '欧洲'
    },
    {
      max: 24.8,
      min: 0,
      country: '挪威',
      continent: '欧洲'
    }
  ],
  [
    {
      max: 488.02,
      min: 0,
      country: '日本',
      continent: '亚洲'
    },
    {
      max: 56.68,
      min: 0,
      country: '印度',
      continent: '亚洲'
    },
    {
      max: 45.79,
      min: 0,
      country: '韩国',
      continent: '亚洲'
    },
    {
      max: 41.6,
      min: 0,
      country: '土耳其',
      continent: '亚洲'
    },
    {
      max: 37.57,
      min: 0,
      country: '印尼',
      continent: '亚洲'
    },
    {
      max: 34.67,
      min: 0,
      country: '沙特',
      continent: '亚洲'
    },
    {
      max: 17.99,
      min: 0,
      country: '泰国',
      continent: '亚洲'
    },
    {
      max: 10,
      min: 0,
      country: '菲律宾',
      continent: '亚洲'
    },
    {
      max: 10.72,
      min: 0,
      country: '马来',
      continent: '亚洲'
    },
    {
      max: 167.18,
      min: 0,
      country: '英国',
      continent: '欧洲'
    },
    {
      max: 177.75,
      min: 0,
      country: '意大利',
      continent: '欧洲'
    },
    {
      max: 89.63,
      min: 0,
      country: '西班牙',
      continent: '欧洲'
    },
    {
      max: 56.32,
      min: 0,
      country: '荷兰',
      continent: '欧洲'
    },
    {
      max: 42.74,
      min: 0,
      country: '瑞士',
      continent: '欧洲'
    },
    {
      max: 15.04,
      min: 0,
      country: '芬兰',
      continent: '欧洲'
    },
    {
      max: 30.95,
      min: 0,
      country: '瑞典',
      continent: '欧洲'
    },
    {
      max: 33.35,
      min: 0,
      country: '比利时',
      continent: '欧洲'
    },
    {
      max: 28.05,
      min: 0,
      country: '挪威',
      continent: '欧洲'
    }
  ],
  [
    {
      max: 521.74,
      min: 0,
      country: '日本',
      continent: '亚洲'
    },
    {
      max: 77.27,
      min: 0,
      country: '印度',
      continent: '亚洲'
    },
    {
      max: 59.6,
      min: 0,
      country: '韩国',
      continent: '亚洲'
    },
    {
      max: 50.56,
      min: 0,
      country: '土耳其',
      continent: '亚洲'
    },
    {
      max: 42.88,
      min: 0,
      country: '印尼',
      continent: '亚洲'
    },
    {
      max: 37.31,
      min: 0,
      country: '沙特',
      continent: '亚洲'
    },
    {
      max: 19.93,
      min: 0,
      country: '泰国',
      continent: '亚洲'
    },
    {
      max: 12.09,
      min: 0,
      country: '菲律宾',
      continent: '亚洲'
    },
    {
      max: 14.07,
      min: 0,
      country: '马来',
      continent: '亚洲'
    },
    {
      max: 196.37,
      min: 0,
      country: '英国',
      continent: '欧洲'
    },
    {
      max: 196.13,
      min: 0,
      country: '意大利',
      continent: '欧洲'
    },
    {
      max: 104.8,
      min: 0,
      country: '西班牙',
      continent: '欧洲'
    },
    {
      max: 67.57,
      min: 0,
      country: '荷兰',
      continent: '欧洲'
    },
    {
      max: 46.09,
      min: 0,
      country: '瑞士',
      continent: '欧洲'
    },
    {
      max: 18.94,
      min: 0,
      country: '芬兰',
      continent: '欧洲'
    },
    {
      max: 36.51,
      min: 0,
      country: '瑞典',
      continent: '欧洲'
    },
    {
      max: 37.79,
      min: 0,
      country: '比利时',
      continent: '欧洲'
    },
    {
      max: 34.83,
      min: 0,
      country: '挪威',
      continent: '欧洲'
    }
  ],
  [
    {
      max: 545.92,
      min: 0,
      country: '日本',
      continent: '亚洲'
    },
    {
      max: 102.5,
      min: 0,
      country: '印度',
      continent: '亚洲'
    },
    {
      max: 84.42,
      min: 0,
      country: '韩国',
      continent: '亚洲'
    },
    {
      max: 55.06,
      min: 0,
      country: '土耳其',
      continent: '亚洲'
    },
    {
      max: 51.46,
      min: 0,
      country: '印尼',
      continent: '亚洲'
    },
    {
      max: 40.5,
      min: 0,
      country: '沙特',
      continent: '亚洲'
    },
    {
      max: 25.62,
      min: 0,
      country: '泰国',
      continent: '亚洲'
    },
    {
      max: 14.62,
      min: 0,
      country: '菲律宾',
      continent: '亚洲'
    },
    {
      max: 18.21,
      min: 0,
      country: '马来',
      continent: '亚洲'
    },
    {
      max: 228.64,
      min: 0,
      country: '英国',
      continent: '欧洲'
    },
    {
      max: 211.73,
      min: 0,
      country: '意大利',
      continent: '欧洲'
    },
    {
      max: 126.72,
      min: 0,
      country: '西班牙',
      continent: '欧洲'
    },
    {
      max: 75.95,
      min: 0,
      country: '荷兰',
      continent: '欧洲'
    },
    {
      max: 49.45,
      min: 0,
      country: '瑞士',
      continent: '欧洲'
    },
    {
      max: 22.26,
      min: 0,
      country: '芬兰',
      continent: '欧洲'
    },
    {
      max: 42.29,
      min: 0,
      country: '瑞典',
      continent: '欧洲'
    },
    {
      max: 42.16,
      min: 0,
      country: '比利时',
      continent: '欧洲'
    },
    {
      max: 38.32,
      min: 0,
      country: '挪威',
      continent: '欧洲'
    }
  ],
  [
    {
      max: 578.41,
      min: 0,
      country: '日本',
      continent: '亚洲'
    },
    {
      max: 143.18,
      min: 0,
      country: '印度',
      continent: '亚洲'
    },
    {
      max: 106.28,
      min: 0,
      country: '韩国',
      continent: '亚洲'
    },
    {
      max: 74.66,
      min: 0,
      country: '土耳其',
      continent: '亚洲'
    },
    {
      max: 67.94,
      min: 0,
      country: '印尼',
      continent: '亚洲'
    },
    {
      max: 51.34,
      min: 0,
      country: '沙特',
      continent: '亚洲'
    },
    {
      max: 31.95,
      min: 0,
      country: '泰国',
      continent: '亚洲'
    },
    {
      max: 19.14,
      min: 0,
      country: '菲律宾',
      continent: '亚洲'
    },
    {
      max: 24.1,
      min: 0,
      country: '马来',
      continent: '亚洲'
    },
    {
      max: 253.56,
      min: 0,
      country: '英国',
      continent: '欧洲'
    },
    {
      max: 221.5,
      min: 0,
      country: '意大利',
      continent: '欧洲'
    },
    {
      max: 147.39,
      min: 0,
      country: '西班牙',
      continent: '欧洲'
    },
    {
      max: 86.71,
      min: 0,
      country: '荷兰',
      continent: '欧洲'
    },
    {
      max: 57.96,
      min: 0,
      country: '瑞士',
      continent: '欧洲'
    },
    {
      max: 26.27,
      min: 0,
      country: '芬兰',
      continent: '欧洲'
    },
    {
      max: 48.92,
      min: 0,
      country: '瑞典',
      continent: '欧洲'
    },
    {
      max: 47.72,
      min: 0,
      country: '比利时',
      continent: '欧洲'
    },
    {
      max: 43.33,
      min: 0,
      country: '挪威',
      continent: '欧洲'
    }
  ],
  [
    {
      max: 589.42,
      min: 0,
      country: '日本',
      continent: '亚洲'
    },
    {
      max: 197.84,
      min: 0,
      country: '印度',
      continent: '亚洲'
    },
    {
      max: 125.32,
      min: 0,
      country: '韩国',
      continent: '亚洲'
    },
    {
      max: 97.51,
      min: 0,
      country: '土耳其',
      continent: '亚洲'
    },
    {
      max: 89.73,
      min: 0,
      country: '印尼',
      continent: '亚洲'
    },
    {
      max: 62.9,
      min: 0,
      country: '沙特',
      continent: '亚洲'
    },
    {
      max: 37.88,
      min: 0,
      country: '泰国',
      continent: '亚洲'
    },
    {
      max: 24.7,
      min: 0,
      country: '菲律宾',
      continent: '亚洲'
    },
    {
      max: 29.65,
      min: 0,
      country: '马来',
      continent: '亚洲'
    },
    {
      max: 260.51,
      min: 0,
      country: '英国',
      continent: '欧洲'
    },
    {
      max: 204.67,
      min: 0,
      country: '意大利',
      continent: '欧洲'
    },
    {
      max: 134.78,
      min: 0,
      country: '西班牙',
      continent: '欧洲'
    },
    {
      max: 84.97,
      min: 0,
      country: '荷兰',
      continent: '欧洲'
    },
    {
      max: 61.07,
      min: 0,
      country: '瑞士',
      continent: '欧洲'
    },
    {
      max: 24.97,
      min: 0,
      country: '芬兰',
      continent: '欧洲'
    },
    {
      max: 51.47,
      min: 0,
      country: '瑞典',
      continent: '欧洲'
    },
    {
      max: 49.5,
      min: 0,
      country: '比利时',
      continent: '欧洲'
    },
    {
      max: 44.93,
      min: 0,
      country: '挪威',
      continent: '欧洲'
    }
  ],
  [
    {
      max: 617.03,
      min: 0,
      country: '日本',
      continent: '亚洲'
    },
    {
      max: 282.22,
      min: 0,
      country: '印度',
      continent: '亚洲'
    },
    {
      max: 144.97,
      min: 0,
      country: '韩国',
      continent: '亚洲'
    },
    {
      max: 124.05,
      min: 0,
      country: '土耳其',
      continent: '亚洲'
    },
    {
      max: 114.69,
      min: 0,
      country: '印尼',
      continent: '亚洲'
    },
    {
      max: 70.16,
      min: 0,
      country: '沙特',
      continent: '亚洲'
    },
    {
      max: 44.23,
      min: 0,
      country: '泰国',
      continent: '亚洲'
    },
    {
      max: 34.03,
      min: 0,
      country: '菲律宾',
      continent: '亚洲'
    },
    {
      max: 38.21,
      min: 0,
      country: '马来',
      continent: '亚洲'
    },
    {
      max: 287.93,
      min: 0,
      country: '英国',
      continent: '欧洲'
    },
    {
      max: 214.1,
      min: 0,
      country: '意大利',
      continent: '欧洲'
    },
    {
      max: 153.95,
      min: 0,
      country: '西班牙',
      continent: '欧洲'
    },
    {
      max: 94.81,
      min: 0,
      country: '荷兰',
      continent: '欧洲'
    },
    {
      max: 67.46,
      min: 0,
      country: '瑞士',
      continent: '欧洲'
    },
    {
      max: 26.92,
      min: 0,
      country: '芬兰',
      continent: '欧洲'
    },
    {
      max: 58.93,
      min: 0,
      country: '瑞典',
      continent: '欧洲'
    },
    {
      max: 53.84,
      min: 0,
      country: '比利时',
      continent: '欧洲'
    },
    {
      max: 48.93,
      min: 0,
      country: '挪威',
      continent: '欧洲'
    }
  ]
];
const duration = 500;
const chartSpec = {
  type: 'bar',
  padding: 0,
  data: [
    {
      id: 'dataId',
      values: []
    }
  ],
  direction: 'horizontal',
  yField: 'country',
  xField: 'max',
  seriesField: 'continent',
  color: ['#008584', '#F2993D'],
  legends: {
    orient: 'bottom',
    layoutType: 'absolute',
    bottom: 20,
    right: 115
  },
  axes: [
    {
      animation: true,
      orient: 'bottom',
      type: 'linear',
      visible: true,
      grid: {
        visible: true
      },
      label: {
        style: {
          fontSize: 12
        }
      },
      max: 650
    },
    {
      animation: true,
      id: 'axis-left',
      orient: 'left',
      tick: { visible: false },
      label: {
        visible: true,
        style: {
          fontSize: 12
        }
      },
      type: 'band',
      grid: {
        visible: false
      }
    }
  ],
  animationAppear: {
    bar: {
      type: 'growWidthIn',
      duration
    },
    axis: {
      duration,
      easing: 'linear'
    }
  },
  animationUpdate: {
    bar: {
      duration,
      easing: 'linear'
    },
    axis: {
      duration: duration * 0.8,
      easing: 'linear'
    }
  },
  bar: {
    style: {
      fill: {
        gradient: 'linear',
        stops: [
          {
            offset: 1
          },
          {
            offset: 0,
            opacity: 0.6
          }
        ]
      }
    }
  },
  background: 'rgba(205, 198, 186,0.5)'
};

export const scene6Characters: ICharacterSpec[] = [
  {
    type: 'RectComponent',
    id: `scene6-background-top`,
    zIndex: 0,
    position: {
      top: 0,
      left: 0,
      width: 1440,
      height: 760
    },
    options: {
      graphic: {
        stroke: false,
        fill: '#CDC6BA'
      }
    }
  },
  {
    type: 'RectComponent',
    id: `scene6-background-bottom`,
    zIndex: 0,
    position: {
      top: 760,
      left: 0,
      width: 1440,
      height: 50
    },
    options: {
      graphic: {
        stroke: false,
        fill: '#FFFFFD'
      }
    }
  },
  {
    type: 'ImageComponent',
    id: `scene5-main-image`,
    zIndex: 1,
    position: {
      top: 160,
      left: (1440 * (1 - 0.65)) / 2,
      width: 1440 * 0.65,
      height: 680 * 0.65
    },
    options: {
      graphic: {
        image: scene5MainImage
      }
    }
  },
  {
    type: 'BarChart',
    id: `scene6-chart`,
    zIndex: 0,
    position: {
      top: 232,
      left: 728,
      width: 458,
      height: 308
    },
    options: {
      spec: chartSpec,
      panel: {
        fill: '#ffffff'
      }
    }
  }
];

export const scene6: ISceneSpec = {
  id: 'scene6',
  actions: [
    // 背景
    {
      characterId: 'scene6-background-top',
      characterActions: [
        {
          // TODO: startOffset
          startTime: 1,
          duration: 0,
          action: 'appear',
          payload: {
            animation: {
              easing: 'easeInOutQuad',
              duration: 0,
              scale: {
                ratio: 1
              }
            }
          }
        }
      ]
    },
    {
      characterId: 'scene6-background-bottom',
      characterActions: [
        {
          // TODO: startOffset
          startTime: 1,
          duration: 0,
          action: 'appear',
          payload: {
            animation: {
              easing: 'easeInOutQuad',
              duration: 0,
              scale: {
                ratio: 1
              }
            }
          }
        }
      ]
    },
    // 主图
    {
      characterId: 'scene5-main-image',
      characterActions: [
        {
          // TODO: startOffset
          startTime: 1,
          duration: 1200,
          action: 'appear',
          payload: {
            animation: {
              easing: 'cubicInOut',
              duration: 1200,
              scale: {
                ratio: 1
              }
            }
          }
        }
      ]
    },
    // 图表
    {
      characterId: 'scene6-chart',
      characterActions: [
        {
          startTime: 1500,
          duration: 500,
          action: 'appear',
          payload: {
            animation: {
              easing: 'cubicInOut',
              duration: 500,
              fade: {
                opacity: 1
              },
              scale: {
                ratio: 1
              }
            }
          }
        },
        ...asiaData.map((data, index) => {
          // 更新数据
          return {
            startTime: 1500 + 500 + index * duration,
            duration: duration,
            action: 'update',
            payload: {
              id: 'dataId',
              values: data.sort((b, a) => a.max - b.max)
            }
          };
        }),
        {
          startTime: 2000 + asiaData.length * duration,
          duration: 1200,
          action: 'disappear',
          payload: {
            animation: {
              easing: 'cubicInOut',
              duration: 1200,
              fade: {
                opacity: 0
              },
              scale: {
                ratio: 0
              }
            }
          }
        }
      ]
    }
  ]
};
