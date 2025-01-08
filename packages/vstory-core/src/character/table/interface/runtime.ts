import type { ICharacterTableRuntimeConfig, IVTable } from './character-table';
export interface ITableCharacterRuntime {
  readonly type: string;
  // 应用config到attribute
  applyConfigToAttribute?: (character: ICharacterTableRuntimeConfig) => void;

  // 图表初始化完成
  afterInitialize?: (character: ICharacterTableRuntimeConfig, vtable: IVTable) => void;

  // 图表绘制完成
  beforeVRenderDraw?: (character: ICharacterTableRuntimeConfig, vtable: IVTable) => void;
}

export interface ITableCharacterRuntimeConstructor {
  new (): ITableCharacterRuntime;
}
