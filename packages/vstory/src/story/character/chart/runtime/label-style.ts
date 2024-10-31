import type { IGraphic } from '@visactor/vrender';
import { MarkStyleRuntime } from './mark-style';
import { isValid } from '@visactor/vutils';
import type { CharacterChart } from '../character';
import type { IChartCharacterRuntime } from './interface';
import type { ISeries, ISpec, IVChart } from '@visactor/vchart';
import type { IMark } from '@visactor/vchart/esm/mark/interface';
import { CommonMarkAttributeMap, fillMarkAttribute, SeriesMarkStyleMap } from './const';
import { getSeriesKeyScalesMap, isSeriesMatch, matchDatumWithScaleMap } from './utils';
import type { Label as VChartLabelComponent } from '@visactor/vchart/esm/component/label/label';
import { StroyAllDataGroup } from '../../dsl-interface';

export class LabelStyleRuntime implements IChartCharacterRuntime {
  type = 'LabelStyle';

  protected declare _character: CharacterChart;
  protected _vchart: IVChart;

  constructor(character: CharacterChart) {
    this._character = character;
  }

  onConfigReady() {
    // 设置 visible 为 true 关闭标签能力放到分组上
    const rawSpec = this._character.specProcess.getVisSpec() as ISpec & { label: { visible: boolean } };
    if (!rawSpec.label) {
      rawSpec.label = { visible: true };
    } else {
      rawSpec.label.visible = true;
    }
    rawSpec.series?.forEach((s: any) => {
      if (!s.label) {
        s.label = { visible: true };
      } else {
        s.label.visible = true;
      }
    });
  }
  afterInitialize(vchart: IVChart) {
    this._vchart = vchart;
    const labelComponent = vchart.getChart().getComponentsByKey('label')[0] as VChartLabelComponent;
    if (!labelComponent) {
      return;
    }
    this._setDataGroupStyle(vchart, labelComponent);
  }

  private _setDataGroupStyle(vchart: IVChart, labelComponent: VChartLabelComponent) {
    const config = this._character.config;
    const dataGroupStyle = config.options?.dataGroupStyle;
    if (!dataGroupStyle) {
      return;
    }

    const singleLabelStyleKeys: { [key: string]: boolean } = {};
    const hasLabelStyle = !!config.options?.labelStyle;
    if (hasLabelStyle) {
      Object.values(config.options?.labelStyle).forEach(ls => {
        Object.keys(ls.style).forEach(k => (singleLabelStyleKeys[k] = true));
      });
    }

    labelComponent.getMarks().forEach(componentMark => {
      // @ts-ignore
      const info = labelComponent._labelComponentMap.get(componentMark)();
      if (!info) {
        return;
      }
      const { series, labelMark } = info as { series: ISeries; labelMark: IMark };
      const keyScaleMap = getSeriesKeyScalesMap(series);
      // 先看单标签样式
      const findKey = hasLabelStyle
        ? Object.keys(config.options.labelStyle).find(k =>
            isSeriesMatch(config.options.labelStyle[k].seriesMatch, series)
          )
        : null;
      const item = findKey ? config.options.labelStyle[findKey] : null;
      // 系列分组key
      const seriesField = series.getSeriesField();
      // style Map 是 能设置的样式
      const styleKeys =
        SeriesMarkStyleMap[series.type]?.label?.style ?? CommonMarkAttributeMap.label ?? fillMarkAttribute;

      // TODO: 在这里完成组样式下的format配置 第二处
      // 多组数据在同一个系列，使用vchart mark后处理
      styleKeys.forEach(key => {
        // fill 和 stroke 使用vrender后处理
        if (key === 'fill' || key === 'stroke') {
          return;
        }
        if (!labelMark.stateStyle.normal?.[key]) {
          // TODO VChart bug。如果直接设置属性为 undefined 会报错
          // 默认值 还必须这样写
          labelMark.setAttribute(key, () => undefined);
        }
        // 如果是有单标签样式的
        if (singleLabelStyleKeys[key] && item && isValid(item.style[key])) {
          labelMark.setPostProcess(key, (result, datum) => {
            // 如果匹配到单标签样式
            if (matchDatumWithScaleMap(item.itemKeys, item.itemKeyMap, keyScaleMap, datum)) {
              return item.style[key];
            }
            // 否则匹配组样式
            return MarkStyleRuntime.getMarkStyle(labelMark, dataGroupStyle, key, datum, seriesField, 'label') ?? result;
          });
        } else {
          labelMark.setPostProcess(key, (result, datum) => {
            return MarkStyleRuntime.getMarkStyle(labelMark, dataGroupStyle, key, datum, seriesField, 'label') ?? result;
          });
        }
      });
    });
  }

  afterVRenderDraw() {
    const dataGroupStyle = this._character.config.options?.dataGroupStyle;
    const labelStyle = this._character.config.options?.labelStyle;
    if (!labelStyle && !dataGroupStyle) {
      return;
    }

    const labelComponent = this._vchart.getChart().getComponentsByKey('label')[0] as VChartLabelComponent;
    if (!labelComponent) {
      return;
    }
    // 遍历mark
    labelComponent.getMarks().forEach(componentMark => {
      // @ts-ignore
      const info = labelComponent._labelComponentMap.get(componentMark)();
      const { series: series } = info as { series: ISeries; labelMark: IMark };
      const keyScaleMap = getSeriesKeyScalesMap(series);
      const labelGraphics: IGraphic[] = [];
      findLabelGraphic(componentMark.getProduct().graphicItem, labelGraphics);

      // 先设置分组样式
      if (dataGroupStyle) {
        const seriesField = series.getSeriesField();
        const seriesValueList = series.getRawDataStatisticsByField(seriesField)?.values as string[];
        seriesValueList.forEach(seriesValue => {
          // 是否存在分组样式
          const style = dataGroupStyle[seriesValue]?.label?.style ?? dataGroupStyle[StroyAllDataGroup]?.label?.style;
          if (!style) {
            return;
          }
          // 只设置 fill 和 stroke 颜色
          if (!isValid(style.fill) && !isValid(style.stroke)) {
            return;
          }
          const labels = labelGraphics.filter(l => (l.attribute as any).data[seriesField] === seriesValue);
          labels.forEach(l => {
            isValid(style.fill) && l.setAttribute('fill', style.fill);
            isValid(style.fill) && l.setAttribute('stroke', style.stroke);
          });
        });
      }

      //  再设置系列下的单标签样式
      if (labelStyle) {
        const findKeys = !!labelStyle
          ? Object.keys(labelStyle).filter(k => isSeriesMatch(labelStyle[k].seriesMatch, series))
          : null;
        findKeys.forEach(findKey => {
          const item = labelStyle[findKey];
          // 只设置 fill 和 stroke 颜色
          if (!isValid(item.style.fill) && !isValid(item.style.stroke)) {
            return;
          }
          // 找到对应的标签
          const label = labelGraphics.find(l =>
            matchDatumWithScaleMap(item.itemKeys, item.itemKeyMap, keyScaleMap, (l.attribute as any).data as any)
          );
          if (!label) {
            return;
          }
          isValid(item.style.fill) && label.setAttribute('fill', item.style.fill);
          isValid(item.style.stroke) && label.setAttribute('stroke', item.style.stroke);
        });
      }
    });
    return;
  }
}

function findLabelGraphic(g: IGraphic, list: IGraphic[]) {
  if (g.type === 'text' || g.type === 'richtext') {
    list.push(g);
    return;
  }
  if (g.children) {
    g.children.forEach((child: IGraphic) => findLabelGraphic(child, list));
  }
}
