import React, { createRef, useEffect } from 'react';
import { Story } from '../../../src/story/story';
import { createWeatherTableDSL } from '../../../src/dsl-creator/weather-table.ts';
import Scene3ChartImage2 from '../assets/scene3/chart-2.png';
import { loadAllSelection } from '../../../src/edit/edit-component';
import { Edit } from '../../../src/edit/edit';
import VChart from '@visactor/vchart';
import { weatherBg, icon } from './imageBase64.ts';

loadAllSelection();

const data = [
  { city: '北京', date: '1月1日', weather: 'rain' },
  { city: '上海', date: '1月1日', weather: 'rainSnow' },
  { city: '广州', date: '1月1日', weather: 'none' },
  { city: '深圳', date: '1月1日', weather: 'snow' },
  { city: '杭州', date: '1月1日', weather: 'none' },
  { city: '成都', date: '1月1日', weather: 'snow' },
  { city: '西安', date: '1月1日', weather: 'none' },
  { city: '北京', date: '2日', weather: 'none' },
  { city: '上海', date: '2日', weather: 'snow' },
  { city: '广州', date: '2日', weather: 'wind' },
  { city: '深圳', date: '2日', weather: 'none' },
  { city: '杭州', date: '2日', weather: 'none' },
  { city: '成都', date: '2日', weather: 'none' },
  { city: '西安', date: '2日', weather: 'rainSnow' },
  { city: '北京', date: '3日', weather: 'rainSnow' },
  { city: '上海', date: '3日', weather: 'none' },
  { city: '广州', date: '3日', weather: 'rain' },
  { city: '深圳', date: '3日', weather: 'none' },
  { city: '杭州', date: '3日', weather: 'rain' },
  { city: '成都', date: '3日', weather: 'none' },
  { city: '西安', date: '3日', weather: 'rain' },
  { city: '北京', date: '4日', weather: 'wind' },
  { city: '上海', date: '4日', weather: 'none' },
  { city: '广州', date: '4日', weather: 'snow' },
  { city: '深圳', date: '4日', weather: 'snow' },
  { city: '杭州', date: '4日', weather: 'none' },
  { city: '成都', date: '4日', weather: 'none' },
  { city: '西安', date: '4日', weather: 'rain' },
  { city: '北京', date: '5日', weather: 'snow' },
  { city: '上海', date: '5日', weather: 'none' },
  { city: '广州', date: '5日', weather: 'rain' },
  { city: '深圳', date: '5日', weather: 'none' },
  { city: '杭州', date: '5日', weather: 'rainSnow' },
  { city: '成都', date: '5日', weather: 'rainSnow' },
  { city: '西安', date: '5日', weather: 'none' }
].map(item => {
  return {
    ...item,
    effectName: `${item.weather}-box`,
    windAnimateEffect: 'clipRange'
  };
});

export const VTable = () => {
  const id = 'VTable';

  const canvas = createRef<HTMLCanvasElement>();

  useEffect(() => {
    try {
      const c = canvas.current!;
      const story: any = new Story(null, {
        // canvas: c,
        dom: id,
        playerOption: { scaleX: 0.5, scaleY: 0.5 }
      });

      // story.canvas.getStage().defaultLayer.scale(0.4, 0.4);
      const lottieFiles = [
        'Blustery大风',
        'Clear Night晴-夜晚',
        'Cloudy多云',
        'Cold寒冷',
        'Dust浮尘',
        'Foggy有雾',
        'Hot热',
        'Isolated Thundershowers局部雷雨',
        'Mostly Cloudy Day晴间多云-白天',
        'Mostly Cloudy Night晴间多云-夜晚',
        'Rain',
        'Showers阵雨',
        'Snow Flurries小雪',
        'Snow',
        'Sunny晴-白天',
        'Tornado龙卷风',
        'Windy',
        'cloudy-02',
        'cloudy-03',
        'cloudy-and-rainny',
        'cloudy',
        'fog',
        'full-moon',
        'light-snow',
        'night-cloudy',
        'night-rain-and-storm',
        'night-rain',
        'night',
        'sunny-day',
        'sunny-hight',
        'thunder',
        'typhoon'
      ]
        .map(item => ({ [item]: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/weather/${item}.json` }))
        .reduce((a, b) => ({ ...a, ...b }), {});

      const effectMap = {
        'rain-box': {
          type: 'weather-box',
          rain: 0.5,
          rainSizeRange: [1, 3],
          rainCountThreshold: 20,
          wind: 0.5,
          windStyle: {
            stroke: 'transparent'
          },
          snow: 0,
          snowRainBottomPadding: 20,
          background: 'rgb(135, 160, 225)'
        },
        'snow-box': {
          type: 'weather-box',
          rain: 0,
          wind: 0,
          snow: 0.5,
          snowRainBottomPadding: 20,
          background: 'rgb(64, 68, 144)'
        },
        'rainSnow-box': {
          type: 'weather-box',
          rain: 0.5,
          wind: 0.3,
          rainSizeRange: [1, 3],
          rainCountThreshold: 20,
          windSpeed: 3,
          snowRainBottomPadding: 20,
          background: 'rgb(130, 190, 210)',
          windStyle: {
            stroke: 'rgba(255, 255, 255, 0.8)'
          },
          snow: 0.5
        },
        'wind-box': {
          type: 'weather-box',
          rain: 0,
          wind: 0.3,
          windSpeed: 3,
          snow: 0,
          windStyle: {
            stroke: 'rgba(255, 255, 255, 0.8)'
          },
          background: 'rgb(184, 206, 239)'
        },
        'none-box': {
          type: 'weather-box',
          rain: 0,
          wind: 0,
          snow: 0,
          background: 'rgb(184, 206, 239)'
        },
        'rain-lottie': {
          type: 'weather-lottie',
          data: lottieFiles.Rain
          // background: 'rgb(135, 160, 225)'
        },
        'snow-lottie': {
          type: 'weather-lottie',
          data: lottieFiles.Snow
          // background: 'rgb(64, 68, 144)'
        },
        'rainSnow-lottie': {
          type: 'weather-lottie',
          data: lottieFiles['night-rain-and-storm']
          // background: 'rgb(15, 15, 15)',
        },
        'wind-lottie': {
          type: 'weather-lottie',
          data: lottieFiles.Windy
          // background: 'rgb(184, 206, 239)'
        },
        'none-lottie': {
          type: 'weather-lottie',
          data: lottieFiles.night
          // background: 'rgb(184, 206, 239)'
        }
      };

      const dsl = createWeatherTableDSL(data, {
        // 配置背景图片
        backgroundImage: weatherBg,
        // 配置logo
        icon: icon,
        // 配置雨雪的特效
        effectMap,
        // 配置背景雨雪效果
        backgroundEffect: {
          rainRatio: 0,
          snowRatio: 1,
          snowSpeed: 0.05,
          snowSizeRange: [20, 30],
          windRatio: 0.2,
          rainCountThreshold: 0,
          snowCountThreshold: 30
        },
        // 配置面板的样式
        panelStyle: {
          background: 'white',
          opacity: 0.6,
          blur: 3,
          cornerRadius: 8
        },
        // 标题配置
        title: {
          text: '2024首场大范围雨雪来袭',
          style: {
            fontSize: 32,
            fontWeight: 'bold',
            fill: 'rgb(68, 66, 147)',
            stroke: 'white',
            lineWidth: 3
          }
        },
        // 副标题配置
        subTitle: {
          text: '大城市雨雪日历',
          style: {
            fontSize: 40,
            fontWeight: 'bold',
            fill: 'rgb(68, 66, 147)',
            stroke: 'white',
            lineWidth: 3
          }
        },
        annotate: {
          text: '注：数据基于中央气象台2024年1月15日12时发布的城市天气预报。中国天气网制图',
          style: {
            fontSize: 14,
            fontWeight: 'normal',
            fill: 'black'
          }
        },
        iconTitle: {
          text: '中国天气',
          style: {
            fontSize: 20,
            fontWeight: 'bold',
            fill: 'black'
          }
        }
      });
      story.load(dsl);

      (window as any).story = story;

      story.play();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div style={{ width: 610, height: 400 }} id={id}>
      {/* <canvas
        ref={canvas as any}
        width={3200}
        height={2000}
        style={{ width: '1600px', height: '1000px', background: 'grey' }}
      ></canvas> */}
    </div>
  );
};
