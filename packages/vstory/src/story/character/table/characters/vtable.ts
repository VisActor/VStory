import { StoryVisactorType } from '../../../../constants';
import { StoryFactory } from '../../../factory/factory';
import { CharacterTable } from '../character';
import { VTableTemp } from '../temp/templates/vtable-temp';

StoryFactory.registerTableTemp(VTableTemp.type, VTableTemp);

export class VTableCharacter extends CharacterTable {
  static type = StoryVisactorType.VTABLE;
}
