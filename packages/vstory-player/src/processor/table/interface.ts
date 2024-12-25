import type { IAction, IActionPayload, IAnimationParams } from '@visactor/vstory-core';

/************ Visibility **************/
export interface ITableVisibilityPayload extends IActionPayload {
  animation: IAnimationParams & {
    oneByOne: boolean;
    /**
     * 柱状图支持: 'grow' | 'fade' | 'bounce'
     * 折线图支持: 'grow' | 'fade'
     * 饼图支持: 'grow' | 'fade' | 'growAngle' | 'growRadius'
     */
    effect: string | string[];
  };
  fade?: { isBaseOpacity?: boolean };
}

export interface ITableVisibilityAction extends IAction<ITableVisibilityPayload> {
  action: 'appear';
}

/************ Add **************/
type Datum = Record<string, any>;

export interface ITableAddPayload extends IActionPayload {
  id: string | number;
  values: Datum | Datum[];
  style?: {
    [key: string]: number | string;
  };
}

export interface ITableAddAction extends IAction<ITableAddPayload> {
  action: 'add';
}

/************ Update **************/
export interface ITableUpdatePayload extends IActionPayload {
  // 批量更新数据
  values: Array<Datum>;

  // 将sourceValue替换为targetValue
  data: Array<{
    sourceValue: Datum;
    targetValue: Datum;
  }>;

  id: string | number;
}

export interface ITableUpdateAction extends IAction<ITableUpdatePayload> {
  action: 'update';
}

/************ Highlight **************/
export interface ITableHighlightPayload extends IActionPayload {
  value: Datum;
  id: string | number;
  style: {
    [key: string]: number | string;
  };
}

export interface ITableHighlightAction extends IAction<ITableHighlightPayload> {
  action: 'highlight';
}
