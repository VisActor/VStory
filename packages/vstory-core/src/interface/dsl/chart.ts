import type { ITextGraphicAttribute } from '@visactor/vrender-core';
import type { IInitOption, ISpec } from '@visactor/vchart';
import type { ICharacterConfigBase } from './dsl';
import type { IFormatConfig } from './common';

export const StroyAllDataGroup = '*';

export interface IComponentMatch {
  usrId?: string;
  specIndex?: number | 'all'; // all 表示所有
  [key: string]: any;
}

export type ITextAttribute = ITextGraphicAttribute;

export interface IItemMatch {
  itemKeys: string[]; // 数据匹配维度  x,type
  itemKeyMap: {
    [key: string]: {
      // 1. 匹配维度值，优先
      value?: any;
      // 2. 匹配维度值的 scaleIndex
      scaleIndex?: number;
    };
  };
}

export interface IMarkStyle<T> extends IItemMatch {
  seriesMatch: { type: string } & IComponentMatch;
  markName: string;
  style: T; // 样式
}

export interface IDataGroupStyle {
  // markName , label 也在这里，需要 label runtime 处理
  label?: {
    style?: IMarkStyle<ITextAttribute>['style'];
    formatConfig?: IFormatConfig;
    visible?: boolean; // 是否可见
    [key: string]: any; // 其他可能存在的逻辑配置
  };
  [key: string]: {
    style?: IMarkStyle<any>['style']; // markStyle
    visible?: boolean; // 是否可见
    [key: string]: any; // 其他可能存在的逻辑配置
  };
  seriesFieldMatch?: {
    value?: any;
    scaleIndex?: number;
  };
}

export interface IChartCharacterInitOption {
  vchartBoundsMode?: 'clip' | 'auto';
}

// 模块选择器
// number => model.getSpecIndex(); 模块的 specIndex
// * => chart.getAllModelInType(); 所有模块
// #id => model.userId; 模块的 userId
export type ModelSelector = number | `${number}` | '*' | `#${string}`;

// 定义一个类型辅助工具来提取非数组类型
type ElementType<T> = T extends (infer U)[] ? U : T;

export interface ITotalLabelConfig {
  visible?: boolean;
  style?: ITextAttribute;
  formatConfig?: IFormatConfig;
  single?: {
    // 使用 维度key_维度值_&_维度key_维度值 这样的格式构建key，保证唯一性
    [key: string]: {
      formatConfig?: IFormatConfig;
      style?: ITextAttribute;
    } & IItemMatch;
  };
}

export interface IChartCharacterConfig extends ICharacterConfigBase {
  options: {
    /**
     * 图表spec
     */
    spec?: any;
    /**
     * 图表类型
     */
    chartType?: string;
    /**
     * 初始化参数
     */
    initOption?: IInitOption & IChartCharacterInitOption;
    /**
     * 边距
     */
    padding?: { left: number; top: number; right: number; bottom: number };
    /**
     * 图表容器
     */
    panel?: any;
    /**
     * 数据源
     */
    data?: any;
    /**
     * 标题
     */
    title?: {
      [key in ModelSelector]: Partial<ElementType<ISpec['title']>>;
    };
    /**
     *  图例
     */
    legends?: {
      [key in ModelSelector]: Partial<ElementType<ISpec['legends']>>;
    };
    /**
     * axes
     */
    axes?: {
      [key in ModelSelector]: Partial<ElementType<ISpec['axes']>>;
    };
    /**
     * series
     */
    series?: {
      [key in ModelSelector]?: Partial<ElementType<ISpec['series']>>;
    };
    /**
     * 色板
     */
    color?: any;
    /**
     * mark 单元素样式
     */
    markStyle?: {
      [key: string]: IMarkStyle<any>;
    };
    /**
     * label 单元素样式 与 mark 区分开，runtime逻辑完全不同
     */
    labelStyle?: {
      [key: string]: IMarkStyle<ITextAttribute> & {
        formatConfig?: IFormatConfig;
      };
    };
    /**
     * 总计标签
     */
    totalLabel?: {
      // 以 `组` 为单位配置。组的 key 对应 vchart.series.stackValue
      // 默认情况下 vchart 中 stackValue = `${PREFIX}_series_${series.type}`
      // 直角坐标系下的系列 stackValue = `${PREFIX}_series_${this.type}_${axisId}`
      [key: string]: ITotalLabelConfig;
    };
    /**
     * 组样式配置
     */
    dataGroupStyle?: {
      [StroyAllDataGroup]?: IDataGroupStyle; // 全部分组的样式
      [key: string]: IDataGroupStyle; // 某一组
    };
    /**
     * 直接合并的配置
     */
    rootConfig?: Record<string, any>;
  };
}
