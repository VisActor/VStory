import type { IInitOption, ISpec } from '@visactor/vchart';
import type { ICharacterConfigBase } from './dsl';

export const StroyAllDataGroup = '_STORY_ALL_DATA_GROUP';

export type IChartModelMatch =
  | {
      usrId: string;
    }
  | {
      specIndex: number | 'all'; // all 表示所有
    };

export interface IComponentMatch {
  usrId?: string;
  specIndex?: number | 'all'; // all 表示所有
  [key: string]: any;
}

export type IComponentConfig<T = any> = IChartModelMatch & {
  spec: T;
};

export interface IMarkStyle {
  seriesMatch: { type: string } & IComponentMatch;
  markName: string;
  id: string; // 唯一id，避免单个元素有多个匹配样式
  itemKeys: string[]; // 数据匹配维度
  itemKeyMap: { [key: string]: any }; // 匹配维度值
  style: any; // 样式
}

export interface IDataGroupStyle {
  // markName , label 也在这里，需要 label runtime 处理
  [key: string]: {
    style: IMarkStyle['style']; // markStyle
    visible: boolean; // 是否可见
    [key: string]: any; // 其他可能存在的逻辑配置
  };
}

export interface IChartCharacterConfig extends ICharacterConfigBase {
  options: {
    // 图表spec
    spec?: any;
    // 初始化参数
    initOption?: IInitOption;
    // 边距
    padding?: { left: number; top: number; right: number; bottom: number };
    // 图表容器
    panel?: any;
    // 数据源
    data?: any;
    // 标题
    title?: {
      [key: string]: IComponentConfig<ISpec['title']>;
    };
    // 图例
    legends?: {
      [key: string]: IComponentConfig<ISpec['legends']>;
    };
    // axes
    axes?: {
      [key: string]: IComponentConfig<ISpec['axes']>;
    };
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
    // 直接合并的配置
    rootConfig?: Record<string, any>;
  };
}
