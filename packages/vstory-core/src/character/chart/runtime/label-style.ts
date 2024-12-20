import { array, isValid, merge } from '@visactor/vutils';
import type { IChartCharacterRuntime } from '../interface/runtime';
import type { ICharacterChart } from '../interface/character-chart';
import type { ISeries, IVChart } from '@visactor/vchart';
import type { ILabelInfo, Label as VChartLabelComponent } from '@visactor/vchart/esm/component/label/label';
import { MarkStyleRuntime } from './mark-style';
import { getSeriesKeyScalesMap, isSeriesMatch, matchDatumWithScaleMap } from './utils';
import type { IGraphic } from '@visactor/vrender-core';
import { StroyAllDataGroup } from '../../../interface/dsl/chart';
import type { IMark } from '@visactor/vchart/esm/mark/interface';
import { CommonMarkAttributeMap, fillMarkAttribute, SeriesMarkStyleMap } from './const';

export class LabelStyleRuntime implements IChartCharacterRuntime {
  type = 'LabelStyle';

  applyConfigToAttribute(character: ICharacterChart) {
    // 设置 visible 为 true 关闭标签能力放到分组上
    // 当前 dataGroupStyle 中有 label.visible 配置，在这里添加上 visible = true
    const dataGroupStyle = character.config.options?.dataGroupStyle;
    if (!dataGroupStyle) {
      return;
    }
    let hasLabelVisible = false;
    Object.keys(dataGroupStyle).forEach(key => {
      if (hasLabelVisible) {
        return;
      }
      if (isValid(dataGroupStyle[key]?.label?.visible)) {
        hasLabelVisible = true;
      }
    });
    // 如果没有设置 visible，不处理
    if (!hasLabelVisible) {
      return;
    }
    // 否则全部设置为 true
    const rawAttribute = character.getAttribute();
    const { spec } = rawAttribute;
    if (!spec.label) {
      spec.label = { visible: true };
    } else {
      spec.label.visible = true;
    }
    spec.series?.forEach((s: any) => {
      if (!s.label) {
        s.label = { visible: true };
      } else {
        s.label.visible = true;
      }
    });
  }

  /**
   * 处理 fill stroke 之外的样式
   * format 在这里处理，否则防重叠会无法正确使用format之后的值进行计算
   * @param character
   * @param vchart
   * @returns
   */
  afterInitialize(character: ICharacterChart, vchart: IVChart) {
    const labelComponent = vchart.getChart().getComponentsByKey('label')[0] as VChartLabelComponent;
    if (!labelComponent) {
      return;
    }
    this._setDataGroupStyle(character, labelComponent);
  }

  private _setDataGroupStyle(character: ICharacterChart, labelComponent: VChartLabelComponent) {
    const config = character.config;
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
      const infos = labelComponent._labelComponentMap.get(componentMark)();
      if (!infos) {
        return;
      }
      array(infos).forEach(info => {
        const { series, labelMark } = info as { series: ISeries; labelMark: IMark };
        const keyScaleMap = getSeriesKeyScalesMap(series);
        // 先看单标签样式
        const findKey = hasLabelStyle
          ? Object.keys(config.options.labelStyle).find(k =>
              isSeriesMatch(config.options.labelStyle[k].seriesMatch, series)
            )
          : null;
        const singleConfig = findKey ? config.options.labelStyle[findKey] : null;
        // 系列分组key
        const seriesField = series.getSeriesField();
        // style Map 是 能设置的样式
        const styleKeys =
          SeriesMarkStyleMap[series.type]?.label?.style ?? CommonMarkAttributeMap.label ?? fillMarkAttribute;

        // TODO: 在这里完成组样式下的标签 format
        // 多组数据在同一个系列，使用vchart mark后处理
        styleKeys.forEach((key: string) => {
          // fill 和 stroke 使用vrender后处理
          if (key === 'fill' || key === 'stroke') {
            return;
          }
          if (!labelMark.stateStyle.normal?.[key]) {
            // TODO VChart bug。如果直接设置属性为 undefined 会报错
            // 默认值 还必须这样写
            labelMark.setAttribute(key, (): any => undefined);
          }
          // 如果是有单标签样式的
          if (singleLabelStyleKeys[key] && singleConfig && isValid(singleConfig.style[key])) {
            labelMark.setPostProcess(key, (result, datum) => {
              // 如果匹配到单标签样式
              if (matchDatumWithScaleMap(singleConfig.itemKeys, singleConfig.itemKeyMap, keyScaleMap, datum)) {
                // TODO: 单标签format处理
                return singleConfig.style[key];
              }
              // 否则匹配组样式
              return (
                MarkStyleRuntime.getMarkStyle(labelMark, dataGroupStyle, key, datum, seriesField, 'label') ?? result
              );
            });
          } else {
            // 没有单标签样式的
            // 直接匹配组样式
            labelMark.setPostProcess(key, (result, datum) => {
              return (
                MarkStyleRuntime.getMarkStyle(labelMark, dataGroupStyle, key, datum, seriesField, 'label') ?? result
              );
            });
          }
        });
        // visible 单独设置
        if (!labelMark.stateStyle.normal?.visible) {
          // TODO VChart bug。如果直接设置属性为 undefined 会报错
          // 默认值 还必须这样写
          labelMark.setAttribute('visible', (): any => undefined);
        }
        labelMark.setPostProcess('visible', (result, datum) => {
          return (
            dataGroupStyle[datum[seriesField]]?.label?.visible ??
            dataGroupStyle[StroyAllDataGroup]?.label?.visible ??
            result
          );
        });
      });
    });
  }

  /**
   * 只处理 fill stroke 值，
   * 因为智能反色逻辑会修改它们，在 afterInitialize 中设置无效。
   * @param character
   * @param vchart
   * @returns
   */
  afterVRenderDraw(character: ICharacterChart, vchart: IVChart) {
    const dataGroupStyle = character.config.options?.dataGroupStyle;
    const labelStyle = character.config.options?.labelStyle;
    if (!labelStyle && !dataGroupStyle) {
      return;
    }

    const labelComponent = vchart.getChart().getComponentsByKey('label')[0] as VChartLabelComponent;
    if (!labelComponent) {
      return;
    }
    // 遍历mark
    labelComponent.getMarks().forEach(componentMark => {
      // @ts-ignore
      const infos = labelComponent._labelComponentMap.get(componentMark)();
      array(infos).forEach(info => {
        const { series: series } = info as { series: ISeries; labelMark: IMark };
        const keyScaleMap = getSeriesKeyScalesMap(series);
        const labelGraphics: IGraphic[] = [];
        findLabelGraphicWithInfo(componentMark.getProduct().graphicItem, info, labelGraphics);

        // 先设置分组样式
        if (dataGroupStyle) {
          const seriesField = series.getSeriesField();
          const groupValueList = series.getRawDataStatisticsByField(seriesField)?.values as string[];
          groupValueList.forEach(groupValue => {
            // 是否存在分组样式
            if (!dataGroupStyle[groupValue]?.label?.style && !dataGroupStyle[StroyAllDataGroup]?.label?.style) {
              return;
            }
            const style = merge(
              {},
              dataGroupStyle[StroyAllDataGroup].label.style ?? {},
              dataGroupStyle[groupValue].label.style ?? {}
            );
            // 只设置 fill 和 stroke 颜色
            if (!isValid(style.fill) && !isValid(style.stroke)) {
              return;
            }
            const labels = labelGraphics.filter(l => (l.attribute as any).data[seriesField] === groupValue);
            labels.forEach(l => {
              isValid(style.fill) && l.setAttribute('fill', style.fill);
              isValid(style.stroke) && l.setAttribute('stroke', style.stroke);
            });
          });
        }

        //  再设置单标签样式
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
    });
    return;
  }
}

function _collectAllLabelGraphic(g: IGraphic, list: IGraphic[]) {
  if (g.type === 'text' || g.type === 'richtext') {
    list.push(g);
    return;
  }
  if (g.children) {
    g.children.forEach((child: IGraphic) => _collectAllLabelGraphic(child, list));
  }
}

function findLabelGraphicWithInfo(g: IGraphic, info: ILabelInfo, list: IGraphic[]) {
  const matchLabel = g.children[0].children.find(
    // @ts-ignore
    (c: IGraphic) => c.attribute.baseMarkGroupName === info.baseMark.getProduct().graphicItem.name
  );
  if (!matchLabel) {
    return;
  }
  _collectAllLabelGraphic(matchLabel, list);
}

export const LabelStyleRuntimeInstance = new LabelStyleRuntime();
