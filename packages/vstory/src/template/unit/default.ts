import type { IUnitTemplateSpec } from './type';

export const DEFAULT_SCENE_DURATION = 5000;
export const DEFAULT_ANIMATION_DURATION = 1000;

export const defaultConfig: Partial<IUnitTemplateSpec> = {
  layout: {
    width: 1920,
    height: 1080,
    title: {
      height: 250,
      backgroundColor: '#ffffff',
      style: {
        fontSize: 40,
        fontWeight: 200,
        textAlign: 'center',
        fill: 'black',
        wordBreak: 'break-word'
      },
      padding: {
        left: 50,
        right: 50,
        top: 50,
        bottom: 0
      }
    },
    viz: {
      backgroundColor: '#ffffff',
      direction: 'horizontal',
      padding: {
        left: 50,
        right: 50,
        top: 50,
        bottom: 50
      }
    }
  },
  unit: {
    gap: [0.5, 0.5],
    aspect: 1,
    defaultStyle: {
      symbolType: 'circle',
      fill: '#ffffff'
    }
  },
  data: [],
  scenes: []
};
