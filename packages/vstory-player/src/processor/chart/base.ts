import type { IComponent, ISeries, IVChart } from '@visactor/vchart';
import { ActionProcessorItem } from '../processor-item';
import type { IActionSpec } from '@visactor/vstory-core';
import { array } from '@visactor/vutils';

export class VChartBaseActionProcessor extends ActionProcessorItem {
  /**
   * 筛选器，payload中可以配置筛选器来设置这个
   * @param selector
   * @param vchart
   */
  selectBySelector(selector: string, vchart: IVChart) {
    let chart = false;
    let seriesList = vchart.getChart().getAllSeries();
    let componentsList = vchart.getChart().getAllComponents();
    const selectorList = selector.split(' ');
    // 是否包含panel, >0为包含
    let includePanel = 1;
    selectorList.forEach(subSelector => {
      if (subSelector === '*') {
        chart = true;
      } else if (/:not\(([^)]+)\)/.test(subSelector)) {
        const match = /:not\(([^)]+)\)/.exec(subSelector)[1];
        const data = this.selectByNameOrType(seriesList, componentsList, match, false);
        seriesList = data.seriesList;
        componentsList = data.componentsList;
        if (match === 'panel') {
          includePanel = -Infinity; // 如果被排除，那么一定不包含了
        }
      } else {
        const data = this.selectByNameOrType(seriesList, componentsList, subSelector);
        seriesList = data.seriesList;
        componentsList = data.componentsList;
        if (subSelector === 'panel') {
          includePanel = Infinity; // 如果有正选，那么选中才算
        } else {
          includePanel--;
        }
      }
    });

    return {
      chart,
      panel: includePanel > 0,
      seriesList,
      componentsList
    };
  }

  protected selectByNameOrType(
    seriesList: ISeries[],
    componentsList: IComponent[],
    select: string,
    match: boolean = true
  ) {
    if (select === '#') {
      return this.selectByName(seriesList, componentsList, select, match);
    }
    return this.selectByType(seriesList, componentsList, select, match);
  }

  protected selectByName(seriesList: ISeries[], componentsList: IComponent[], select: string, match: boolean = true) {
    const name = select.substring(1);
    return {
      seriesList: seriesList.filter(item => (item.name === name) === match),
      componentsList: componentsList.filter(item => (item.name === name) === match)
    };
  }

  protected selectByType(seriesList: ISeries[], componentsList: IComponent[], name: string, match: boolean = true) {
    return {
      seriesList: seriesList.filter(item => (item.type === name || item.specKey === name) === match),
      componentsList: componentsList.filter(item => (item.type === name || item.specKey === name) === match)
    };
  }

  getStartTimeAndDuration(action: IActionSpec): { startTime: number; duration: number } {
    const { startTime: globalStartTime = 0 } = action;
    let totalStartTime = Infinity;
    let totalEndTime = -Infinity;
    array(action.payload).forEach(payload => {
      const { startTime = 0, duration = 0 } = payload?.animation ?? ({} as any);
      totalStartTime = Math.min(startTime ?? 0, totalStartTime);
      totalEndTime = Math.max(startTime + duration, totalEndTime);
    });

    let st = globalStartTime + totalStartTime;
    let d = totalEndTime - totalStartTime;
    // 避免数据不合法，算出来时长有问题
    if (!isFinite(st)) {
      st = 0;
    }
    if (!isFinite(d)) {
      d = 0;
    }
    return {
      startTime: st,
      duration: d
    };
  }
}
