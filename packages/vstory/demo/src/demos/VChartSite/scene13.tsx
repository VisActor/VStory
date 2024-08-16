import type { ICharacterSpec } from '../../../../src/story/character';
import type { ISceneSpec } from '../../../../src/story/interface';
import scene13Logo from '../../assets/scene13/logo.png';

import { easeInOutQuad } from './util';

export const scene13Characters: ICharacterSpec[] = [
  {
    type: 'Rect',
    id: `scene13-background`,
    zIndex: 2,
    position: {
      top: 0,
      left: 0,
      width: 1440,
      height: 810
    },
    options: {
      graphic: {
        stroke: false,
        fill: 'white'
      }
    }
  },
  {
    type: 'Image',
    id: `scene13-logo`,
    zIndex: 2,
    position: {
      top: 320,
      left: 350,
      width: 740,
      height: 166
    },
    options: {
      graphic: {
        image: scene13Logo
      }
    }
  }
];

export const scene13: ISceneSpec = {
  id: 'scene13',
  actions: [
    {
      characterId: 'scene13-background',
      characterActions: [
        {
          action: 'appear',
          startTime: 0,
          duration: 1000,
          payload: {
            animation: {
              duration: 1000,
              easing: easeInOutQuad,
              effect: 'fade'
            }
          }
        }
      ]
    },
    {
      characterId: 'scene13-logo',
      characterActions: [
        {
          action: 'appear',
          startTime: 0,
          duration: 1000,
          payload: {
            animation: {
              duration: 2000,
              effect: 'scale',
              easing: easeInOutQuad,
              fade: { opacity: 1 }
            }
          }
        }
      ]
    }
  ]
};
