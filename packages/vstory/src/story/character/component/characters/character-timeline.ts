import type { Graphic } from '../graphic/graphic';
import { GraphicTimeline } from '../graphic/timeline';
import { CharacterComponent } from '../character';
import { StoryComponentType } from '../../../../constants/character';

export class CharacterComponentTimeline extends CharacterComponent {
  readonly graphicType: string = 'timeline';
  protected _createGraphic(): Graphic {
    return new GraphicTimeline(StoryComponentType.TIMELINE, this as any);
  }
}
