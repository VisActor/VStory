# Getting Started

In this tutorial, we will introduce how to use VStory to draw a simple bar chart. VStory is a simple, easy-to-use, cross-platform, high-performance visualization storytelling library. It can combine all components in VisActor to create a powerful visual work.

## Get VStory

You can get VStory in the following ways:

### Using NPM Package

First, you need to install VStory in the project root directory using the following command:

```sh
# Install using npm
npm install @visactor/vstory

# Install using yarn
yarn add @visactor/vstory
```

### Using CDN

You can also get the built VStory file through CDN. Add the following code to the `<script>` tag in your HTML file:

```html
<script src="https://unpkg.com/@visactor/vstory/build/index.min.js"></script>
```

## Import VStory

### Import via NPM Package

Import VStory at the top of your JavaScript file using `import`:

```js
import VStory from '@visactor/vstory';
```

### Import using script tag

By adding a `<script>` tag directly in your HTML file, you can import the built vstory file:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- Import vstory file -->
    <script src="https://unpkg.com/@visactor/vstory/build/index.min.js"></script>
  </head>
</html>
```

## Place a Chart

Before drawing the chart, we need to prepare a DOM container with a specific width and height for VStory.

```html
<body>
  <!-- Prepare a DOM with size (width and height) for vstory, you can also specify it in the spec configuration -->
  <div id="story" style="width: 600px;height:400px;"></div>
</body>
```

Next, we create a `VStory` instance, prepare a VChart chart with the DOM container's ID, generate DSL, and pass it in:

```ts
// Register all necessary content
VStory.registerAll();
// Prepare a VChart chart
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

// Generate a DSL that only contains a VChart element
const dsl = {
  characters: [
    {
      type: 'VChart',
      id: '0',
      zIndex: 1,
      // Position of the chart on the canvas
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300
      },
      options: {
        // Configuration of the chart's background panel
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
  // Specific animation arrangement for the chart
  acts: [
    // Array of chapters, a story can contain multiple chapters, and chapters are connected in a specific order
    {
      id: 'default-chapter',
      scenes: [
        // Array of scenes, can contain multiple scenes, and scenes are connected in a specific order
        {
          id:'scene0',
          // Array of actions in the scene, actions describe specific behaviors of one or more characters, and actions are executed in parallel within a scene
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

// Create a VStory instance
const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: 'pink' });
const player = new VStory.Player(story);
story.init(player);

player.play(0);
```

You have successfully drawn a simple bar chart using VStory!

Hope this tutorial helps you learn how to use VStory. Now, you can try adding different types of elements and create more diverse storytelling effects by exploring the various configuration options of VStory. Start your VStory journey with courage!# Getting Started

In this tutorial, we will introduce how to use VStory to draw a simple bar chart. VStory is a simple, easy-to-use, cross-platform, high-performance visualization storytelling library. It can combine all components in VisActor to create a powerful visual work.

## Get VStory

You can get VStory in the following ways:

### Using NPM Package

First, you need to install VStory in the project root directory using the following command:

```sh
# Install using npm
npm install @visactor/vstory

# Install using yarn
yarn add @visactor/vstory
```

### Using CDN

You can also get the built VStory file through CDN. Add the following code to the `<script>` tag in your HTML file:

```html
<script src="https://unpkg.com/@visactor/vstory/build/index.min.js"></script>
```

## Import VStory

### Import via NPM Package

Import VStory at the top of your JavaScript file using `import`:

```js
import VStory from '@visactor/vstory';
```

### Import using script tag

By adding a `<script>` tag directly in your HTML file, you can import the built vstory file:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- Import vstory file -->
    <script src="https://unpkg.com/@visactor/vstory/build/index.min.js"></script>
  </head>
</html>
```

## Place a Chart

Before drawing the chart, we need to prepare a DOM container with a specific width and height for VStory.

```html
<body>
  <!-- Prepare a DOM with size (width and height) for vstory, you can also specify it in the spec configuration -->
  <div id="story" style="width: 600px;height:400px;"></div>
</body>
```

Next, we create a `VStory` instance, prepare a VChart chart with the DOM container's ID, generate DSL, and pass it in:

```ts
// Register all necessary content
VStory.registerAll();
// Prepare a VChart chart
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

// Generate a DSL that only contains a VChart element
const dsl = {
  characters: [
    {
      type: 'VChart',
      id: '0',
      zIndex: 1,
      // Position of the chart on the canvas
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300
      },
      options: {
        // Configuration of the chart's background panel
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
  // Specific animation arrangement for the chart
  acts: [
    // Array of chapters, a story can contain multiple chapters, and chapters are connected in a specific order
    {
      id: 'default-chapter',
      scenes: [
        // Array of scenes, can contain multiple scenes, and scenes are connected in a specific order
        {
          id:'scene0',
          // Array of actions in the scene, actions describe specific behaviors of one or more characters, and actions are executed in parallel within a scene
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

// Create a VStory instance
const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: 'pink' });
const player = new VStory.Player(story);
story.init(player);

player.play(0);
```

You have successfully drawn a simple bar chart using VStory!

Hope this tutorial helps you learn how to use VStory. Now, you can try adding different types of elements and create more diverse storytelling effects by exploring the various configuration options of VStory. Start your VStory journey with courage!# Getting Started

In this tutorial, we will introduce how to use VStory to draw a simple bar chart. VStory is a simple, easy-to-use, cross-platform, high-performance visualization storytelling library. It can combine all components in VisActor to create a powerful visual work.

## Get VStory

You can get VStory in the following ways:

### Using NPM Package

First, you need to install VStory in the project root directory using the following command:

```sh
# Install using npm
npm install @visactor/vstory

# Install using yarn
yarn add @visactor/vstory
```

### Using CDN

You can also get the built VStory file through CDN. Add the following code to the `<script>` tag in your HTML file:

```html
<script src="https://unpkg.com/@visactor/vstory/build/index.min.js"></script>
```

## Import VStory

### Import via NPM Package

Import VStory at the top of your JavaScript file using `import`:

```js
import VStory from '@visactor/vstory';
```

### Import using script tag

By adding a `<script>` tag directly in your HTML file, you can import the built vstory file:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- Import vstory file -->
    <script src="https://unpkg.com/@visactor/vstory/build/index.min.js"></script>
  </head>
</html>
```

## Place a Chart

Before drawing the chart, we need to prepare a DOM container with a specific width and height for VStory.

```html
<body>
  <!-- Prepare a DOM with size (width and height) for vstory, you can also specify it in the spec configuration -->
  <div id="story" style="width: 600px;height:400px;"></div>
</body>
```

Next, we create a `VStory` instance, prepare a VChart chart with the DOM container's ID, generate DSL, and pass it in:

```ts
// Register all necessary content
VStory.registerAll();
// Prepare a VChart chart
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

// Generate a DSL that only contains a VChart element
const dsl = {
  characters: [
    {
      type: 'VChart',
      id: '0',
      zIndex: 1,
      // Position of the chart on the canvas
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300
      },
      options: {
        // Configuration of the chart's background panel
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
  // Specific animation arrangement for the chart
  acts: [
    // Array of chapters, a story can contain multiple chapters, and chapters are connected in a specific order
    {
      id: 'default-chapter',
      scenes: [
        // Array of scenes, can contain multiple scenes, and scenes are connected in a specific order
        {
          id:'scene0',
          // Array of actions in the scene, actions describe specific behaviors of one or more characters, and actions are executed in parallel within a scene
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

// Create a VStory instance
const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: 'pink' });
const player = new VStory.Player(story);
story.init(player);

player.play(0);
```

You have successfully drawn a simple bar chart using VStory!

Hope this tutorial helps you learn how to use VStory. Now, you can try adding different types of elements and create more diverse storytelling effects by exploring the various configuration options of VStory. Start your VStory journey with courage!# Getting Started

In this tutorial, we will introduce how to use VStory to draw a simple bar chart. VStory is a simple, easy-to-use, cross-platform, high-performance visualization storytelling library. It can combine all components in VisActor to create a powerful visual work.

## Get VStory

You can get VStory in the following ways:

### Using NPM Package

First, you need to install VStory in the project root directory using the following command:

```sh
# Install using npm
npm install @visactor/vstory

# Install using yarn
yarn add @visactor/vstory
```

### Using CDN

You can also get the built VStory file through CDN. Add the following code to the `<script>` tag in your HTML file:

```html
<script src="https://unpkg.com/@visactor/vstory/build/index.min.js"></script>
```

## Import VStory

### Import via NPM Package

Import VStory at the top of your JavaScript file using `import`:

```js
import VStory from '@visactor/vstory';
```

### Import using script tag

By adding a `<script>` tag directly in your HTML file, you can import the built vstory file:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- Import vstory file -->
    <script src="https://unpkg.com/@visactor/vstory/build/index.min.js"></script>
  </head>
</html>
```

## Place a Chart

Before drawing the chart, we need to prepare a DOM container with a specific width and height for VStory.

```html
<body>
  <!-- Prepare a DOM with size (width and height) for vstory, you can also specify it in the spec configuration -->
  <div id="story" style="width: 600px;height:400px;"></div>
</body>
```

Next, we create a `VStory` instance, prepare a VChart chart with the DOM container's ID, generate DSL, and pass it in:

```ts
// Register all necessary content
VStory.registerAll();
// Prepare a VChart chart
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

// Generate a DSL that only contains a VChart element
const dsl = {
  characters: [
    {
      type: 'VChart',
      id: '0',
      zIndex: 1,
      // Position of the chart on the canvas
      position: {
        top: 50,
        left: 50,
        width: 300,
        height: 300
      },
      options: {
        // Configuration of the chart's background panel
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
  // Specific animation arrangement for the chart
  acts: [
    // Array of chapters, a story can contain multiple chapters, and chapters are connected in a specific order
    {
      id: 'default-chapter',
      scenes: [
        // Array of scenes, can contain multiple scenes, and scenes are connected in a specific order
        {
          id:'scene0',
          // Array of actions in the scene, actions describe specific behaviors of one or more characters, and actions are executed in parallel within a scene
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

// Create a VStory instance
const story = new VStory.Story(dsl, { dom: CONTAINER_ID, background: 'pink' });
const player = new VStory.Player(story);
story.init(player);

player.play(0);
```

You have successfully drawn a simple bar chart using VStory!

Hope this tutorial helps you learn how to use VStory. Now, you can try adding different types of elements and create more diverse storytelling effects by exploring the various configuration options of VStory. Start your VStory journey with courage!
