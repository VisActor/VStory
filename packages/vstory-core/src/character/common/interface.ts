import type { ICharacterConfig } from '../../interface/dsl/dsl';

export type IUpdateConfigParams = Omit<Partial<ICharacterConfig>, 'id' | 'type'>;
