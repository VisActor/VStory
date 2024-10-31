---
category: examples
group: unit
title: unit-infographic
keywords: unit-infographic
order: 2-1
cover: https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/unit-infographic.png
---

# 天气表格可视化模板
该模板使用到了`VTable`作为表格组件，使用`WeatherBox`组件在一定区域内模拟了下雨下雪和有风的天气情况。
表格内的每个单元格可以使用`WeatherBox`组件基于传入的一些参数模拟下雨下雪和有风的天气情况。同时也可以使用`lottie`文件来表达天气情况。当然，你也可以在一个表格的各个cell中混用这两种组件，可以在`effectMap`中预定义好所有你想要的效果。
表格中每个cell的状态是独立的，当你在`effectMap`中预定义好所有效果之后，仅需要在数据的`effectName`字段中指定一下即可

WeatherBox的接口类型定义如下，可以精细的调整天气情况
```ts
export interface IWeatherBoxAttrs extends IGroupGraphicAttribute {
  // 雨水图标替换
  rainIconPath?: string;
  // 雪花图标替换
  snowIconPath?: string;
  // 风图标替换
  windIconPath?: string;
  width: number;
  height: number;
  // 雨水大小区间
  rainSizeRange?: [number, number];
  // 雪花大小区间
  snowSizeRange?: [number, number];
  // 风图标大小(0-1)
  windSize?: number;
  // 雨水下落速度(0-1)
  rainSpeed?: number;
  // 雪花下落速度(0-1)
  snowSpeed?: number;
  // 风速，越大则风的动画越快
  windSpeed?: number;

  // 雪花落地消失的padding
  snowRainBottomPadding?: number;

  // 雨点的密度(0-1)
  rainRatio?: number;
  // 最大密度
  rainCountThreshold?: number;
  // 雪花的密度(0-1)
  snowRatio?: number;
  // 最大密度
  snowCountThreshold?: number;
  // 风的频率，越大则雪花和雨水偏移越大
  windRatio?: number;

  windAnimateEffect?: 'fade' | 'clipRange';

  // 配置雨点样式
  rainStyle?: ISymbolGraphicAttribute;
  // 配置雪花样式
  snowStyle?: ISymbolGraphicAttribute;
  // 配置风样式
  windStyle?: ISymbolGraphicAttribute;
}
```

## 代码演示

```javascript livedemo template=vstory
/* 生成数据 */
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
    // 这里配置使用的动画类型
    effectName: `${item.weather}-box`,
    // 放开下面的注释，一键换成lottie
    // effectName: `${item.weather}-box`,
    // 这里配置额外要传入的参数，在WeatherBox模板中，还可以配置 'fade'
    windAnimateEffect: 'clipRange'
  };
});

// 我们准备了一些lottie文件，如果不想用`WeatherBox`模拟，可以用这些lottie文件
const lottieFiles = [ "Blustery大风", "Clear Night晴-夜晚", "Cloudy多云", "Cold寒冷", "Dust浮尘", "Foggy有雾", "Hot热", "Isolated Thundershowers局部雷雨", "Mostly Cloudy Day晴间多云-白天", "Mostly Cloudy Night晴间多云-夜晚", "Rain", "Showers阵雨", "Snow Flurries小雪", "Snow", "Sunny晴-白天", "Tornado龙卷风", "Windy", "cloudy-02", "cloudy-03", "cloudy-and-rainny", "cloudy", "fog", "full-moon", "light-snow", "night-cloudy", "night-rain-and-storm", "night-rain", "night", "sunny-day", "sunny-hight", "thunder", "typhoon"].map(item => ({[item]: `https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/weather/${item}.json`})).reduce((a, b) => ({...a,...b}), {});

// 预定义好所有状态的动画效果，比如下雨，下雪，雨雪交加。以及下雨的WeatherBox或者下雨的lottie文件。
// effectMap中的key对应到数据中的effectName字段，您可以随意定义，只要匹配即可
// 每一项的type是内置的，目前支持`weather-box`和`weather-lottie`，您只能使用这两种之一
// WeatherBox支持的参数很多，具体在上面的介绍中有，您可以对照
const effectMap = {
  'rain-box': {
    type: 'weather-box',
    rain: 0.5,
    rainSizeRange: [1, 3],
    rainCountThreshold: 20,
    wind: 0.5,
    windStyle: {
      stroke: 'transparent',
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
    snow: 0.5,
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
    data: lottieFiles.Rain,
  },
  'snow-lottie': {
    type: 'weather-lottie',
    data: lottieFiles.Snow,
  },
  'rainSnow-lottie': {
    type: 'weather-lottie',
    data: lottieFiles['night-rain-and-storm']
  },
  'wind-lottie': {
    type: 'weather-lottie',
    data: lottieFiles.Windy,
  },
  'none-lottie': {
    type: 'weather-lottie',
    data: lottieFiles.night,
  }
}

// 我们真正创建一个dsl描述，其中的配置您可以随意修改并查看效果
const dsl = VStory.createWeatherTableDSL(data, {
  // 配置背景图片
  backgroundImage: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/weather/weatherBg.png',
  // 配置logo
  icon: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/weather/weather-icon.png',
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
})

const vstory = new VStory.Story(dsl, {
  dom: CONTAINER_ID,
  width: 450,
  height: 800,
  playerOption: { scaleX: 0.5, scaleY: 0.5 }
});

vstory.play(false);
window.vstory = vstory;
```
