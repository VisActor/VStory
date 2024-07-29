import data from './sample.json' assert { type: 'json' };

export const input = {
  layout: {
    width: 1920,
    height: 1080,
    titleHeight: 254,
    titlePadding: {
      x: 100,
      y: 100
    },
    vizPadding: {
      x: 100,
      y: 100
    }
  },
  unit: {
    scale: 1,
    style: {
      gap: [4, 0.9],
      // svg: 'M0,32a32,32 0 1,0 64,0a32,32 0 1,0 -64,0'
      svg: 'M0,0 L32,0 L32,64 L0,64 Z'
    }
  },
  data: data,
  scene: [
    {
      sceneId: 'scene-1',
      sceneDuration: 3200,
      animationDuration: 800,
      nodes: [
        {
          query: datum => datum['intent'] === 'Suicide',
          label: 'suicide',
          style: {
            fill: '#3164b4',
            opacity: 1,
            stroke: 0.5
          }
        },
        {
          query: datum => datum['intent'] !== 'Suicide',
          label: 'not-suicide'
        }
      ]
    },
    {
      sceneId: 'scene-2',
      sceneDuration: 3200,
      animationDuration: 800,
      nodes: [
        {
          query: datum => datum['intent'] === 'Suicide',
          label: 'suicide',
          style: {
            fill: '#86b1ea',
            opacity: 1,
            stroke: 0.5
          },
          children: [
            {
              query: datum => datum['sex'] === 'M',
              label: 'male',
              style: {
                fill: '#3164b4'
              }
            },
            {
              query: datum => datum['sex'] !== 'M',
              label: 'not-male'
            }
          ]
        },
        {
          query: datum => datum['intent'] !== 'Suicide',
          label: 'not-suicide'
        }
      ]
    }
  ]
};

export type Input = typeof input;

export type UnitNode = {
  label: string;
  style?: {
    fill?: string;
    opacity?: number;
    stroke?: number;
  };
  count: number;
  children?: UnitNode[];
};

type QueryNode = {
  query: (datum: any) => boolean;
  label: string;
  style?: {
    fill?: string;
    opacity: number;
    stroke: number;
  };
  children?: QueryNode[];
};

type Unit = (typeof input.data)[number];

function getUnitTree(nodes: QueryNode[], data: Unit[]): UnitNode[] {
  let tree: UnitNode[] = [];
  for (let node of nodes) {
    const filteredData = data.filter(node.query);
    if (!node.children) {
      tree.push({
        label: node.label,
        style: node.style,
        count: filteredData.length
      });
    } else {
      tree.push({
        label: node.label,
        style: node.style,
        count: filteredData.length,
        children: getUnitTree(node.children, filteredData)
      });
    }
  }
  return tree;
}

function generateUnitTrees(input: Input) {
  let trees: UnitNode[][] = [];
  for (let scene of input.scene) {
    trees.push(getUnitTree(scene.nodes, input.data));
  }
  return trees;
}

export const unitTrees = generateUnitTrees(input);
