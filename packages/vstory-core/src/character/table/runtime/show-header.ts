import type { ITableCharacterRuntime } from '../interface/runtime';
import type { ICharacterTable } from '../interface/character-table';
import { isValid } from '@visactor/vutils';

export class ShowHeaderRuntime implements ITableCharacterRuntime {
  type = 'ShowHeader';

  applyConfigToAttribute(character: ICharacterTable): void {
    const spec = character.getRuntimeConfig().getAttribute().spec;
    const options = character.getRuntimeConfig().config.options;

    if (isValid(options.showHeader)) {
      spec.showHeader = options.showHeader !== false;
    }
  }
}

export const ShowHeaderRuntimeInstance = new ShowHeaderRuntime();
