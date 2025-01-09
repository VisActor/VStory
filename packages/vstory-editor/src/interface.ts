import type { IGraphic } from '@visactor/vrender';
import type { IAABBBounds, IPointLike } from '@visactor/vutils';
import type { ICharacter, ICharacterPickInfo } from '@visactor/vstory-core';
import type { EditActionEnum } from './const';
import type { Edit } from './edit';

export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IEditSelectionDetailChart extends ICharacterPickInfo {
  model: string;
  mark: any;
  datum: any;
}

export type IEditSelectionDetailComponent = ICharacterPickInfo;

export interface IEditSelectionInfo extends IEditActionInfoBase {
  characterId?: string | string[];
  character?: ICharacter;
  detail?: IEditSelectionDetailChart | IEditSelectionDetailComponent;
}

export interface IEditOverActionInfo extends IEditActionInfoBase, IEditSelectionInfo {
  nextAction?: IEditActionInfo;
}

export interface VREvent extends Event {
  pickParams?: {
    shadowTarget?: IGraphic;
  };
}

export type VRenderPointerEvent = PointerEvent & { target: Partial<IGraphic> } & {
  canvas: IPointLike;
  _layerPoint: IPointLike;
};

export interface IEditActionInfoBase {
  type: keyof typeof EditActionEnum | string;
  event: VREvent;
}

export type IEditActionInfo = IEditSelectionInfo | IEditOverActionInfo;

export type ContinuousActionType = 'boxSelection' | 'layerZoom' | 'layerMove';

export interface IEditSelection {
  readonly type: string;
  readonly level: number;
  isEditing: boolean;
  readonly activeCharacter: ICharacter | null;
  readonly edit: Edit;

  // 是否 开始/继续 编辑 返回false的话，会导致当前编辑结束
  checkAction: (actionInfo: IEditActionInfo | IEditSelectionInfo) => boolean;

  checkOver?: (actionInfo: IEditActionInfo | IEditSelectionInfo) => void;

  // 编辑开始
  startEdit: (actionInfo: IEditActionInfo | IEditSelectionInfo, emitEvent?: boolean) => void;

  // 编辑结束
  endEdit: (emitEvent?: boolean) => void;
}

export type IModelInfoSpecKey = {
  specKey: string;
  specIndex: number;
};
export type IModelInfo = IModelInfoSpecKey & {
  id?: string | number; // id in spec, model.userId
};

export interface IEditSelectionConstructor {
  new (edit: Edit): IEditSelection;
}

export interface IEditMessage {
  type: string; // 编辑组件类型，
  actionInfo: IEditActionInfo;
  [key: string]: any;
  // updateCharacter: (updateParams: any) => void;
}
