import scene6MainImage1 from '../../../assets/scene6/main-image.png';
import scene6MainImage2 from '../../../assets/scene6/main-image2.png';
import scene6SubImage1 from '../../../assets/scene6/chart.png';
import scene6SubImage2 from '../../../assets/scene6/text.png';

const scene62Start = 8500;
const endTimeStart = 14000;
const endTimeFinished = 15000;

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
const barDuration = 500;
const barChartSpec = {
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
      duration: barDuration
    },
    axis: {
      duration: barDuration,
      easing: 'linear'
    }
  },
  animationUpdate: {
    bar: {
      duration: barDuration,
      easing: 'linear'
    },
    axis: {
      duration: barDuration * 0.8,
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

const rangeChartSpec = {
  type: 'common',
  data: [
    {
      id: 'areaData',
      values: [
        { year: 1700, exports: 35, imports: 70 },
        { year: 1710, exports: 59, imports: 81 },
        { year: 1720, exports: 76, imports: 96 },
        { year: 1730, exports: 65, imports: 97 },
        { year: 1740, exports: 67, imports: 93 },
        { year: 1750, exports: 79, imports: 90 },
        { year: 1753, exports: 87, imports: 87 },
        { year: 1760, exports: 115, imports: 79 },
        { year: 1770, exports: 163, imports: 85 },
        { year: 1780, exports: 185, imports: 93 }
      ]
    }
  ],
  series: [
    {
      type: 'rangeArea',
      xField: 'year',
      yField: ['exports', 'imports'],
      area: {
        style: {
          curveType: 'monotone',
          fill: data => {
            if (data.year <= 1755) {
              return '#F5222D';
            }
            return '#FAAD14';
          }
        }
      }
    },
    {
      type: 'line',
      xField: 'year',
      yField: 'exports',
      point: {
        style: {
          size: 0
        }
      },
      line: {
        style: {
          curveType: 'monotone',
          stroke: '#F5222D'
        }
      }
    },
    {
      type: 'line',
      xField: 'year',
      yField: 'imports',
      point: {
        style: {
          size: 0
        }
      },
      line: {
        style: {
          curveType: 'monotone',
          stroke: '#FAAD14'
        }
      }
    }
  ],
  markPoint: [
    {
      coordinate: {
        year: 1730,
        exports: 50
      },
      itemContent: {
        type: 'text',
        autoRotate: false,
        text: {
          text: 'BALANCE AGAINST',
          style: {
            fontSize: 14,
            fontWeight: 'bold',
            fill: 'rgba(0,0,0,0.45)',
            textAlign: 'center',
            textBaseline: 'middle'
          }
        }
      },
      itemLine: {
        visible: false
      }
    },
    {
      coordinate: {
        year: 1765,
        exports: 75
      },
      itemContent: {
        offsetX: -40,
        type: 'text',
        autoRotate: false,
        text: {
          text: ['BALANCE in', 'FAVOUR of ENGLAND'],
          style: {
            fontSize: 14,
            fontWeight: 'bold',
            fill: 'rgba(0,0,0,0.45)',
            textAlign: 'left',
            textBaseline: 'middle'
          }
        }
      },
      itemLine: {
        visible: false
      }
    }
  ],
  axes: [
    {
      orient: 'left',
      label: {
        visible: true
      },
      type: 'linear'
    },
    { orient: 'bottom', type: 'linear', min: '1700', max: '1780' }
  ],
  crosshair: {
    xField: {
      line: {
        type: 'line'
      },
      label: {
        visible: true
      }
    }
  },
  padding: 0,
  animationAppear: {}
};

const scene6_1 = [
  // 主图[1,1200]
  {
    characterId: 'scene6-img1',
    characterActions: [
      {
        action: 'appear',
        payload: {
          animation: {
            easing: 'easeInOutQuad',
            duration: 1200,
            effect: 'scale'
          }
        }
      },
      {
        startTime: 8200,
        duration: 300,
        action: 'disappear',
        payload: {
          animation: {
            easing: 'easeInOutQuad',
            duration: 300,
            effect: 'fade'
          }
        }
      }
    ]
  },
  // 图表[1500, 8200]
  {
    characterId: 'scene6-chart',
    characterActions: [
      {
        startTime: 1500,
        action: 'appear',
        payload: {
          animation: {
            easing: 'easeInOutQuad',
            duration: 500,
            effect: ['fade', 'scale'],
            fade: {
              opacity: 1,
              isBaseOpacity: true
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
          startTime: 1500 + 500 + index * barDuration,
          action: 'update',
          payload: {
            id: 'dataId',
            duration: barDuration,
            values: data.sort((b, a) => a.max - b.max)
          }
        };
      }),
      {
        startTime: 2000 + asiaData.length * barDuration,
        action: 'disappear',
        payload: {
          animation: {
            easing: 'easeInOutQuad',
            duration: 1200,
            fade: {
              opacity: 0,
              isBaseOpacity: true
            }
          }
        }
      }
    ]
  }
];

const scene6_2 = [
  // 主图[8500 + 1000, 14000 + 1000]
  {
    characterId: 'scene6-img2',
    characterActions: [
      {
        startTime: scene62Start,
        action: 'appear',
        payload: {
          animation: {
            easing: 'easeInOutQuad',
            duration: 1000
          }
        }
      },
      {
        startTime: endTimeStart,
        action: 'disappear',
        payload: {
          animation: {
            easing: 'easeInOutQuad',
            duration: 1000
          }
        }
      }
    ]
  },

  // 左图[8500 + 1000, 14000 + 1000]
  {
    characterId: 'scene6-img3',
    characterActions: [
      {
        startTime: scene62Start,
        action: 'appear',
        payload: {
          animation: {
            easing: 'easeInOutQuad',
            duration: 1000,
            effect: 'move',
            move: {
              pos: 'bottom'
            }
          }
        }
      },
      {
        startTime: endTimeStart,
        action: 'disappear',
        payload: {
          animation: {
            easing: 'easeInOutQuad',
            duration: 1000,
            effect: 'move',
            move: {
              pos: 'top'
            }
          }
        }
      }
    ]
  },
  // 图表[10000, 14000]
  {
    characterId: 'scene6-range-chart',
    characterActions: [
      {
        startTime: 10000,
        action: 'appear',
        payload: {
          animation: {
            easing: 'cubicInOut',
            duration: 1000,
            fade: {
              opacity: 1,
              isBaseOpacity: true
            }
          }
        }
      },
      {
        startTime: 13000,
        action: 'disappear',
        payload: {
          animation: {
            easing: 'cubicInOut',
            duration: 1000,
            fade: {
              opacity: 0,
              isBaseOpacity: true
            }
          }
        }
      }
    ]
  },
  // 右图[8500 + 1000, 14000 + 1000]
  {
    characterId: 'scene6-img4',
    characterActions: [
      {
        startTime: scene62Start,
        action: 'appear',
        payload: {
          animation: {
            easing: 'easeInOutQuad',
            duration: 1000,
            effect: 'move',
            move: {
              pos: 'bottom'
            }
          }
        }
      },
      {
        startTime: endTimeStart,
        action: 'disappear',
        payload: {
          animation: {
            easing: 'easeInOutQuad',
            duration: 1000
          }
        }
      }
    ]
  },

  // 底部黑边[8200 + 300, 15000]
  {
    characterId: 'scene6-bg-bottom',
    characterActions: [
      {
        startTime: 8200,
        action: 'appear',
        payload: {
          animation: {
            easing: 'easeInOutQuad',
            duration: 300
          }
        }
      },
      {
        startTime: endTimeFinished - 5,
        action: 'disappear',
        payload: {
          animation: {
            duration: 5,
            easing: 'easeInOutQuad'
          }
        }
      }
    ]
  },

  // 顶部灰边[8500 + 1000, 15000]
  {
    characterId: 'scene6-bg-top',
    characterActions: [
      {
        startTime: scene62Start,
        action: 'appear',
        payload: {
          animation: {
            easing: 'easeInOutQuad',
            duration: 600
          }
        }
      },
      {
        startTime: endTimeFinished - 5,
        action: 'disappear',
        payload: {
          animation: {
            duration: 5,
            easing: 'easeInOutQuad'
          }
        }
      }
    ]
  }
];

export const scene6Characters: ICharacterSpec[] = [
  // 背景1
  {
    type: 'Rect',
    id: `scene6-bg1`,
    zIndex: 1,
    position: {
      top: 0,
      left: 0,
      width: 1440,
      height: 810
    },
    options: {
      graphic: {
        stroke: false,
        fill: '#CDC6BA'
      }
    }
  },
  // 背景2
  {
    type: 'Rect',
    id: `scene6-bg2`,
    zIndex: -1,
    position: {
      top: 0,
      left: 0,
      width: 1440,
      height: 810
    },
    options: {
      graphic: {
        stroke: false,
        fill: '#DBDBDB'
      }
    }
  },
  // 底部黑边
  {
    type: 'Rect',
    id: `scene6-bg-bottom`,
    zIndex: 1,
    position: {
      top: 662,
      left: 90,
      width: 1262,
      height: 148
    },
    options: {
      graphic: {
        stroke: false,
        fill: 'rgb(30,34,33)'
      }
    }
  },
  // 顶部白边
  {
    type: 'Rect',
    id: `scene6-bg-top`,
    zIndex: 0,
    position: {
      top: 0,
      left: 90,
      width: 1262,
      height: 68
    },
    options: {
      graphic: {
        stroke: false,
        fill: 'rgb(195,195,195)'
      }
    }
  },

  // 四张图片
  {
    type: 'Image',
    id: `scene6-img1`,
    zIndex: 1,
    position: {
      top: 160,
      left: (1440 * (1 - 0.65)) / 2,
      width: 1440 * 0.65,
      height: 680 * 0.65
    },
    options: {
      graphic: {
        image: scene6MainImage1
      }
    }
  },
  {
    type: 'Image',
    id: 'scene6-img2',
    zIndex: 1,
    position: {
      top: 0,
      left: 90,
      width: 1262,
      height: 876
    },
    options: {
      graphic: {
        image: scene6MainImage2
      }
    }
  },
  {
    type: 'Image',
    id: 'scene6-img3',
    zIndex: 1,
    position: {
      top: 240,
      left: 90,
      width: 711 * 0.75,
      height: 570 * 0.75
    },
    options: {
      graphic: {
        image: scene6SubImage1
      }
    }
  },
  {
    type: 'Image',
    id: 'scene6-img4',
    zIndex: 1,
    position: {
      top: 300,
      left: 750,
      width: 778 * 0.5,
      height: 551 * 0.5
    },
    options: {
      graphic: {
        image: scene6SubImage2
      }
    }
  },
  // 柱状图
  {
    type: 'VChart',
    id: `scene6-chart`,
    zIndex: 1,
    position: {
      top: 232,
      left: 728,
      width: 458,
      height: 308
    },
    options: {
      spec: barChartSpec,
      panel: {
        fill: '#ffffff'
      }
    }
  },
  // 区间面积图
  {
    type: 'VChart',
    id: 'scene6-range-chart',
    zIndex: 2,
    position: {
      top: 280,
      left: 108,
      width: 496,
      height: 303
    },
    options: {
      spec: rangeChartSpec,
      panel: {
        fill: '#ffffff'
      }
    }
  }
];

export const scene6: ISceneSpec = {
  id: 'scene6',
  delay: -500,
  actions: [
    // 背景1 [1, 8500 + 1000]
    {
      characterId: 'scene6-bg1',
      characterActions: [
        {
          action: 'appear',
          payload: {
            animation: {
              easing: 'easeInOutQuad',
              duration: 1,
              effect: 'scale'
            }
          }
        },
        {
          startTime: 8000,
          action: 'style',
          payload: {
            graphic: { x: 90, width: 1262 },
            animation: {
              easing: 'easeInOutQuad',
              duration: 300
            }
          }
        },
        {
          startTime: scene62Start,
          action: 'disappear',
          payload: {
            animation: {
              easing: 'easeInOutQuad',
              duration: 1000
            }
          }
        }
      ]
    },
    // 背景2 [8000, 15000]
    {
      characterId: 'scene6-bg2',
      characterActions: [
        {
          startTime: 8000,
          action: 'appear',
          payload: {
            animation: {
              easing: 'easeInOutQuad',
              duration: 0
            }
          }
        },
        {
          startTime: endTimeFinished - 5,
          action: 'disappear',
          payload: {
            animation: {
              easing: 'easeInOutQuad',
              duration: 5
            }
          }
        }
      ]
    },
    // 6-1
    ...scene6_1,
    // // 6-2
    ...scene6_2,
    {
      characterId: 'timeline',
      characterActions: [
        {
          startTime: 500,
          action: 'state',
          payload: {
            animation: {
              effect: 'forward',
              duration: 14000,
              easing: 'linear'
            }
          }
        },
        {
          startTime: 1000,
          action: 'moveTo',
          payload: {
            destination: {
              x: 750,
              y: 60
            },
            animation: {
              duration: 500
            }
          }
        }
      ]
    }
  ]
};
