import type { IVTable } from '@visactor/vtable';
import type { ICharacterConfig } from '../../../interface/dsl/dsl';
import type { ICharacterTableRuntimeConfig } from './character-table';
export interface ITableCharacterRuntime {
  readonly type: string;
  // 应用config到attribute
  applyConfigToAttribute?: (character: ICharacterTableRuntimeConfig) => void;

  // 图表初始化完成
  afterInitialize?: (character: ICharacterTableRuntimeConfig, vtable: IVTable) => void;

  // 图表绘制完成
  afterVRenderDraw?: (character: ICharacterTableRuntimeConfig, vtable: IVTable) => void;
}

export interface ITableCharacterRuntimeConstructor {
  new (): ITableCharacterRuntime;
}

export type IUpdateConfigParams = Omit<Partial<ICharacterConfig>, 'id' | 'type'>;
