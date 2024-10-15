import type { IInitOption, ISpec } from '@visactor/vchart';
import type { IRichTextGraphicAttribute, ITextGraphicAttribute } from '@visactor/vrender';
import type { IMarkStyle } from './chart/spec-process/interface';

export type IPercent = `${number}%`;
export type WidgetNumber = number; // | IPercent;

export const StroyAllDataGroup = '_STORY_ALL_DATA_GROUP';

export interface IDataGroupStyle {
  // markName , label 也在这里，需要 label runtime 处理
  [key: string]: {
    style: IMarkStyle['style']; // markStyle
  };
}

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

export interface ICharacterConfigBase {
  id: string;
  type: string; // 类型
  position: IWidgetData; // 定位描述
  zIndex: number;
  extra?: any; // 带着的额外信息
}

export type IEditorTextGraphicAttribute = {
  graphicAlign?: 'left' | 'center' | 'right';
  graphicBaseline?: 'top' | 'middle' | 'bottom';
} & Partial<ITextGraphicAttribute & IRichTextGraphicAttribute>;

export interface IComponentCharacterConfig extends ICharacterConfigBase {
  options: {
    graphic: any;
    group?: any;
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

export type ChartModelMatch =
  | {
      usrId: string;
    }
  | {
      specIndex: number | 'all'; // all 表示所有
    };

export type IComponentConfig<T = any> = ChartModelMatch & {
  spec: T;
};

export interface IChartCharacterConfig extends ICharacterConfigBase {
  options: {
    // 图表spec
    spec?: any;
    // 初始化参数
    initOption?: IInitOption;
    panel?: any;
    // 数据源
    data?: any;
    // 标题
    title?: IComponentConfig<ISpec['title']>[] | ISpec['title'];
    // 图例
    legends?: IComponentConfig<ISpec['legends']>[] | ISpec['legends'];
    // axes
    axes?: IComponentConfig<ISpec['axes']>[];
    // 色板
    color?: any;
    // mark 单元素样式
    markStyle?: {
      [key: string]: IMarkStyle;
    };
    // label 单元素样式 与 mark 区分开，runtime逻辑完全不同
    labelStyle?: {
      [key: string]: IMarkStyle;
    };
    // 组样式配置
    dataGroupStyle?: {
      [StroyAllDataGroup]: IDataGroupStyle; // 全部分组的样式
      [key: string]: IDataGroupStyle; // 某一组
    };
  };
}

export type ICharacterConfig = IChartCharacterConfig | IComponentCharacterConfig;
