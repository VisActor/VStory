import { Bounce } from '@visactor/vstory-animate';
import type { IAction, IActionPayload, ICharacter } from '@visactor/vstory-core';
import { getCharacterParentGraphic } from './common';

export interface IComponentBouncePayLoad extends IActionPayload {
  /**
   * 自定义弹跳 easing path string
   */
  customEase?: string;
  /**
   * 跳跃高度
   */
  dy?: number;
}

export interface IComponentBounceAction extends IAction<IComponentBouncePayLoad> {
  action: 'bounce';
}

export function bounce(
  character: ICharacter,
  animation: IComponentBouncePayLoad['animation'],
  params: IComponentBouncePayLoad
) {
  const graphic = getCharacterParentGraphic(character);
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
    graphic.animate().play(new Bounce({}, {}, duration, easing, { dy: dy ?? height * 0.2 }));
  }
}
