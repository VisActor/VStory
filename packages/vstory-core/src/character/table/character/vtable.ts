import { CharacterType } from '../../../constants/character';
import { CharacterTable } from '../character-table';
import type { ITableGraphicAttribute } from '../graphic/vtable-graphic';

export class VTableCharacter extends CharacterTable<ITableGraphicAttribute> {
  static type = CharacterType.VTABLE;
}
