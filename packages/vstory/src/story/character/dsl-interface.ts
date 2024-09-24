import type { IInitOption } from '@visactor/vchart';
import type { IRichTextGraphicAttribute, ITextGraphicAttribute } from '@visactor/vrender';
import type { DirectionType } from './chart/const';

export type IPercent = `${number}%`;
export type WidgetNumber = number; // | IPercent;

export type IWidgetData = {
  left?: WidgetNumber;
  top?: WidgetNumber;
  x?: WidgetNumber;
  y?: WidgetNumber;
  angle?: number;
  anchor?: [number, number];
} & (
  | {
      bottom: WidgetNumber;
      right: WidgetNumber;
    }
  | {
      width: WidgetNumber;
      height: WidgetNumber;
    }
);

export interface ICharacterSpecBase {
  id: string;
  type: string; // 类型
  position: IWidgetData; // 定位描述
  zIndex: number;
}

export type IEditorTextGraphicAttribute = {
  graphicAlign?: 'left' | 'center' | 'right';
  graphicBaseline?: 'top' | 'middle' | 'bottom';
} & Partial<ITextGraphicAttribute & IRichTextGraphicAttribute>;

export interface IComponentCharacterSpec extends ICharacterSpecBase {
  options: {
    graphic: any;
    text?: IEditorTextGraphicAttribute;
    isResized?: boolean;
    // angle?: number;
    shapePoints?: any;
  };
}

export interface IComponentMatch {
  usrId?: string;
  specIndex?: number | 'all'; // all 表示所有
  [key: string]: any;
}

export interface IComponentSpec {
  specKey: string;
  matchInfo: IComponentMatch;
  spec: any;
}

export interface IChartCharacterSpec extends ICharacterSpecBase {
  options: {
    // 图表spec
    spec?: any;
    // 初始化参数
    initOption?: IInitOption;
    panel?: any;
    // 数据源
    data?: any;
    // 标题
    title?: any;
    // 图例
    legends?: any;
  };
}

export type ICharacterSpec = IChartCharacterSpec | IComponentCharacterSpec;
