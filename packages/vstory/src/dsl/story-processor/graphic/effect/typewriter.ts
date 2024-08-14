import type { EasingType, IText } from '@visactor/vrender';
import { TypeWriter } from '../../../../animate/typewirter';
import { isString } from '@visactor/vutils';

export function typewriter(graphic: IText, params: any) {
  if (graphic && (graphic.type === 'text' || graphic.type === 'richtext')) {
    const { duration, easing } = params;
    const { text } = graphic.attribute;
    if (isString(text)) {
      graphic.animate().play(new TypeWriter({ text: '' }, { text }, duration, easing as EasingType));
    }
  }
}
