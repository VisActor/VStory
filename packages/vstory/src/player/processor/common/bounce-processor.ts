import type { ICharacter } from '../../../story/character';
import { getCharacterParentGraphic } from './common';
import type { IComponentBouncePayLoad } from '../interface/style-action';
import { CustomEase } from '../../../animate/util/util';
import { Bounce } from '../../../animate/bounce';

export function bounce(
  character: ICharacter,
  animation: IComponentBouncePayLoad['animation'],
  params: IComponentBouncePayLoad
) {
  const graphic = getCharacterParentGraphic(character);
  if (graphic) {
    const { duration, easing } = animation;
    const { dy } = params;
    let { customEase } = params;
    const { y1, y2 } = graphic.AABBBounds;
    const height = Math.abs(y1 - y2);
    const easingPath =
      customEase ??
      'M0,0 C0,0 0.058,1 0.2,1 0.346,1 0.41,0 0.53,0 0.559,0 0.681,-0.002 0.702,0.011 0.788,0.065 0.774,0.212 0.853,0.212 0.928,0.212 1,0 1,0 ';
    customEase = CustomEase.create('bounce', easingPath, {});
    graphic.animate().play(new Bounce({}, {}, duration, easing, { dy: dy ?? height * 0.2, customEase }));
  }
}
