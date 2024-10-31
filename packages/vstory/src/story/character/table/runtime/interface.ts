import type { ICharacterVisactor } from '../../visactor/interface';
export interface ITableCharacterRuntime {
  readonly type: string;
  // config 准备完成
  onConfigReady?: () => void;

  // 图表绘制完成
  afterVRenderDraw?: () => void;
}

export interface ITableCharacterRuntimeConstructor {
  new (character: ICharacterVisactor): ITableCharacterRuntime;
}
