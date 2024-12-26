import type { IAction, IActionPayload, IAnimationParams } from '@visactor/vstory-core';

/************ Visibility **************/
export interface IChartVisibilityPayload extends IActionPayload {
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

export interface IChartVisibilityAction extends IAction<IChartVisibilityPayload> {
  action: 'appear';
}

/************ Add **************/
type Datum = Record<string, any>;

export interface IChartAddPayload extends IActionPayload {
  id: string | number;
  values: Datum | Datum[];
  style?: {
    [key: string]: number | string;
  };
}

export interface IChartAddAction extends IAction<IChartAddPayload> {
  action: 'add';
}

/************ Update **************/
export interface IChartUpdatePayload extends IActionPayload {
  // 批量更新数据
  values: Array<Datum>;

  // 将sourceValue替换为targetValue
  data: Array<{
    sourceValue: Datum;
    targetValue: Datum;
  }>;

  id: string | number;
}

export interface IChartUpdateAction extends IAction<IChartUpdatePayload> {
  action: 'update';
}

/************ Highlight **************/
export interface IChartHighlightPayload extends IActionPayload {
  value: Datum;
  inverse?: boolean;
  id: string | number;
  style: {
    [key: string]: number | string;
  };
}

export interface IChartHighlightAction extends IAction<IChartHighlightPayload> {
  action: 'highlight';
}
