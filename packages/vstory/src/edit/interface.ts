import type { Edit } from './edit';
import type { ICharacter, ICharacterPickInfo } from './../story/character/runtime-interface';
import type { IRect } from '../type/space';
import type { IGraphic } from '@visactor/vrender';

export enum EditActionEnum {
  singleSelection = 'singleSelect', // 单选
  multipleSelection = 'multipleSelect' // 多选
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
  detail: IEditSelectionDetailChart | IEditSelectionDetailComponent;
}

export interface VREvent extends Event {
  pickParams?: {
    shadowTarget?: IGraphic;
  };
}

export interface IEditActionInfoBase {
  type: keyof typeof EditActionEnum | string;
  event: VREvent;
}

export type IEditActionInfo = IEditActionInfoBase | IEditSelectionInfo;

export type ContinuousActionType = 'boxSelection' | 'layerZoom' | 'layerMove';

export interface IEditComponent {
  readonly level: number;
  isEditing: boolean;

  // 是否 开始/继续 编辑 返回false的话，会导致当前编辑结束
  checkAction: (actionInfo: IEditActionInfo | IEditSelectionInfo) => boolean;

  // 编辑结束
  editEnd: () => void;

  getActiveCharacter: () => ICharacter | null | undefined;
}

export type IModelInfoSpecKey = {
  specKey: string;
  specIndex: number;
};
export type IModelInfo = IModelInfoSpecKey & {
  id?: string | number; // id in spec, model.userId
};

export interface ILayoutLine extends Partial<IModelInfo> {
  orient: 'x' | 'y';
  type: 'start' | 'middle' | 'end';
  value: number;
  start: number;
  end: number;
  rect: IRect;
}

export interface IEditComponentConstructor {
  new (edit: Edit): IEditComponent;
}

export interface IEditMessage {
  type: string; // 编辑组件类型，
  actionInfo: IEditActionInfo;
  updateCharacter: (updateParams: any) => void;
}
