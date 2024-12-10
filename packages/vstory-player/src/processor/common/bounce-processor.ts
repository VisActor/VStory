import { Bounce } from '@visactor/vstory-animate';
import type { IAction, IActionPayload, ICharacter } from '@visactor/vstory-core';
import { getCharacterParentGraphic } from './common';
import type { IGraphic } from '@visactor/vrender-core';

export interface IComponentBouncePayLoad extends IActionPayload {
  /**
   * 自定义弹跳 easing path string
   */
  customEase?: string;

  type?: 'bounce1' | 'bounce2';
  flipY?: boolean;

  /**
   * 跳跃高度
   */
  dy?: number;
}

export interface IComponentBounceAction extends IAction<IComponentBouncePayLoad> {
  action: 'bounce';
}

const bounce2Str =
  'M 0 -0.545 C 0.024 -0.045 0.068 0.414 0.21 0.429 C 0.36 0.436 0.396 -0.258 0.521 -0.237 C 0.626 -0.232 0.634 0.131 0.717 0.128 C 0.827 0.133 0.827 -0.073 0.91 -0.083 C 0.962 -0.086 1 0 1 0';
const bounce3Str =
  'M 0 -0.545 C 0.024 -0.045 0.052 0.358 0.216 0.381 C 0.321 0.368 0.37 -0.122 0.506 -0.114 C 0.615 -0.12 0.668 0.094 0.837 0.092 C 0.923 0.087 0.973 0.034 1.004 -0.005';
const bounce4Str =
  'M 0 -0.545 C 0.024 -0.045 0.075 0.389 0.216 0.381 C 0.36 0.376 0.425 -0.133 0.756 -0.127 C 0.918 -0.109 0.973 -0.057 1.007 0.003';
const bounceMap: any = {
  bounce2: bounce2Str,
  bounce3: bounce3Str,
  bounce4: bounce4Str
};

export function bounce(
  graphic: IGraphic,
  animation: IComponentBouncePayLoad['animation'],
  params: IComponentBouncePayLoad
) {
  if (graphic) {
    const { duration, easing } = animation;
    const { dy } = params;
    const visible = graphic.attribute.visible;
    if (visible === false) {
      graphic.attribute.visible = true;
    }
    const height = graphic.AABBBounds.height();
    if (visible === false) {
      graphic.setAttribute('visible', false);
    }
    graphic.animate().play(
      new Bounce({}, {}, duration, easing, {
        dy: (params.flipY ? -1 : 1) * (dy ?? height * 0.2),
        customEase: params.customEase || bounceMap[params.type]
      })
    );
  }
}
