import type { Dict } from '@visactor/vutils';
import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChart } from '../interface/character-chart';
import type { IVChart } from '@visactor/vchart';
import { getChartType, transformMarkerSymbolAttributeByKey } from './utils';
import { LineSymbolType, MARKER_NOT_SUPPORT_CHARTS, MarkerTypeEnum } from './const';

export class ChartMarkerRuntime implements IChartCharacterRuntime {
  type = 'ChartMarker';

  applyConfigToAttribute(character: ICharacterChart) {
    const config = character.getRuntimeConfig().config;
    const marker = config.options?.marker;
    const rawAttribute = character.getRuntimeConfig().getAttribute();
    const { spec } = rawAttribute;
    const chartType = getChartType(config.options);

    if (marker) {
      Object.keys(marker).forEach(key => {
        if (spec[key]) {
          spec[key] = spec[key].filter((s: Dict<any>) => !s.name);
        } else {
          spec[key] = [];
        }
        if (marker[key as 'markLine' | 'markPoint' | 'markArea']) {
          spec[key].push(...marker[key as 'markLine' | 'markPoint' | 'markArea']);
        }
      });

      if (chartType !== 'scatter' && spec.markLine && spec.markLine.length) {
        // 非散点图，过滤分区标注
        spec.markLine = spec.markLine.filter((spec: any) => spec.name !== MarkerTypeEnum.partitionLine);
      }
    }

    // 如果当前图表不支持标注
    if (MARKER_NOT_SUPPORT_CHARTS.includes(chartType)) {
      spec.markArea = [];
      spec.markLine = [];
    }

    if (spec.markLine && spec.markLine.length) {
      // 处理 marker 的 symbol 样式
      spec.markLine.forEach((mark: any) => {
        if (
          [
            MarkerTypeEnum.growthLine,
            MarkerTypeEnum.hierarchyDiffLine,
            MarkerTypeEnum.horizontalLine,
            MarkerTypeEnum.partitionLine,
            MarkerTypeEnum.totalDiffLine,
            MarkerTypeEnum.verticalLine
          ].includes(mark.name)
        ) {
          transformMarkerSymbolAttributeByKey(mark, 'startSymbol');
          transformMarkerSymbolAttributeByKey(mark, 'endSymbol');
        }
      });
    }

    if (spec.markPoint && spec.markPoint.length) {
      spec.markPoint.forEach((mark: any) => {
        if (mark.name === MarkerTypeEnum.point) {
          const itemLine = mark.itemLine;
          transformMarkerSymbolAttributeByKey(itemLine, 'startSymbol');
          transformMarkerSymbolAttributeByKey(itemLine, 'endSymbol');

          if (itemLine.startSymbol.originSymbolType) {
            if (itemLine.type !== 'type-arc' && itemLine.startSymbol.originSymbolType === LineSymbolType.arrow) {
              itemLine.startSymbol.refX = -itemLine.startSymbol.size / 2;
            } else {
              itemLine.startSymbol.refX = 0;
            }
          }

          if (itemLine.endSymbol.originSymbolType) {
            if (itemLine.type !== 'type-arc' && itemLine.endSymbol.originSymbolType === LineSymbolType.arrow) {
              itemLine.endSymbol.refX = -itemLine.endSymbol.size / 2;
            } else {
              itemLine.endSymbol.refX = 0;
            }
          }
        }
      });
    }
  }
}

export const ChartMarkerRuntimeInstance = new ChartMarkerRuntime();
