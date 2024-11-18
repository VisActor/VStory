import type { IBoundsLike } from '@visactor/vutils';
import type { IVChart } from '@visactor/vchart';
import type { GraphicType, IGroupGraphicAttribute, ITicker } from '@visactor/vrender';
import { genNumberType, Group } from '@visactor/vrender';

export interface IChartGraphicAttribute extends IGroupGraphicAttribute {
  renderCanvas: HTMLCanvasElement;
  spec: any;
  // ClassType: any;
  vchart: IVChart;
  mode: string;
  modeParams?: any;
  dpr: number;
  interactive: boolean;
  animation: boolean;
  disableTriggerEvent: boolean;
  disableDirtyBounds: boolean;
  viewBox: IBoundsLike;
  ticker?: ITicker;
  autoRender?: boolean;
  chartInitOptions?: any;
}

export const COMPONENT_NUMBER_TYPE = genNumberType();

// @ts-ignore
export class ComponentGroup extends Group {
  type: GraphicType = 'vstory-component-group' as any;
  numberType: number = COMPONENT_NUMBER_TYPE;

  constructor(attrs: IGroupGraphicAttribute) {
    // vstory-component-group没有主题，必须都初始化，否则动画会找不到属性
    super({ scaleX: 1, scaleY: 1, x: 0, y: 0, angle: 0, ...attrs, pickable: false });
  }
}
