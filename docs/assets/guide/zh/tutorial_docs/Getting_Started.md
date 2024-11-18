# 快速上手

在本教程中，我们将介绍如何使用 VStory 绘制一个简单的柱状图。VStory 是一款简单易用、跨平台、高性能的可视化叙事库。其能够将VisActor中的所有组件组合在一起，形成一个强大的可视化作品。

## 获取 VStory

你可以通过以下几种方式获取 VStory

### 使用 NPM 包

首先，你需要在项目根目录下使用以下命令安装 VStory

```sh
# 使用 npm 安装
npm install @visactor/vstory

# 使用 yarn 安装
yarn add @visactor/vstory
```

### 使用 CDN

你还可以通过 CDN 获取构建好的 VShart 文件。将以下代码添加到 HTML 文件的 `<script>` 标签中：

```html
<script src="https://unpkg.com/@visactor/vstory/build/index.min.js"></script>
```

## 引入 VStory

### 通过 NPM 包引入

在 JavaScript 文件顶部使用 `import` 引入 VStory

```js
import VStory from '@visactor/vstory';
```

### 使用 script 标签引入

通过直接在 HTML 文件中添加 `<script>` 标签，引入构建好的 vstory 文件：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- 引入 vstory 文件 -->
    <script src="https://unpkg.com/@visactor/vstory/build/index.min.js"></script>
  </head>
</html>
```

## 绘制一个简单的图表

在绘图前我们需要为 VStory 准备一个具备高宽的 DOM 容器。

```html
<body>
  <!-- 为 vstory 准备一个具备大小（宽高）的 DOM，当然你也可以在 spec 配置中指定 -->
  <div id="story" style="width: 600px;height:400px;"></div>
</body>
```

接下来，我们创建一个 `VStory` 实例，准备一个柱状图的VChart图表和 DOM 容器的 ID， 生成DSL然后传入：

```ts
// 注册所有需要的内容
VStory.registerAll();
// 准备一个VChart图表
const spec = {
  data: [
    {
      id: 'barData',
      values: [
        { month: 'Monday', sales: 22 },
        { month: 'Tuesday', sales: 13 },
        { month: 'Wednesday', sales: 25 },
        { month: 'Thursday', sales: 29 },
        { month: 'Friday', sales: 38 }
      ]
    }
  ],
  type: 'bar',
  xField: 'month',
  yField: 'sales'
};

// 生成一个DSL，该DSL只包含一个VChart元素
const dsl = {
  characters: [
    {
      type: 'VChart',
      id: '0',
      zIndex: 1,
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300
      },
      options: {
        panel: {
          fill: '#ffffff',
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowBlur: 10,
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          cornerRadius: 8
        }
      },
      spec
    }
  ],
  acts: [
    {
      id: 'default-chapter',
      scenes: [
        {
          id:'scene0',
          actions: [
            {
              characterId: '0',
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 1000
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
}

// 创建 vstory 实例
const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: 'pink' });
const player = new VStory.Player(story);
story.init(player);

player.play(0);
```

至此，你已经成功使用VStory绘制出了一个简单的柱状图！

```javascript livedemo
// 注册所有需要的内容
VStory.registerAll();
const spec = {
  data: [
    {
      id: 'barData',
      values: [
        { month: 'Monday', sales: 22 },
        { month: 'Tuesday', sales: 13 },
        { month: 'Wednesday', sales: 25 },
        { month: 'Thursday', sales: 29 },
        { month: 'Friday', sales: 38 }
      ]
    }
  ],
  type: 'bar',
  xField: 'month',
  yField: 'sales'
};

const dsl = {
  characters: [
    {
      type: 'VChart',
      id: '0',
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300
      },
      options: {
        spec,
        panel: {
          fill: '#ffffff',
          shadowColor: 'rgba(0, 0, 0, 0.05)',
          shadowBlur: 10,
          shadowOffsetX: 4,
          shadowOffsetY: 4,
          cornerRadius: 8
        },
      }
    }
  ],
  acts: [
    {
      id: 'default-chapter',
      scenes: [
        {
          id:'scene0',
          actions: [
            {
              characterId: '0',
              characterActions: [
                {
                  action: 'appear',
                  payload: {
                    animation: {
                      duration: 3000
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
}

// 创建 vstory 实例
const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: 'pink' });
const player = new VStory.Player(story);
story.init(player);

player.play(0);

window.vstory = story;
```

希望这篇教程对你学习如何使用 VStory 有所帮助。现在，你可以尝试添加不同类型的元素，并通过深入了解 VStory 的各种配置选项，组合出更加丰富多样的叙事效果。勇敢开始你的 VStory 之旅吧！
