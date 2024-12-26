import { ActionProcessorItem } from '../processor-item';
import type { IActionSpec, ICharacter } from '@visactor/vstory-core';
import { array } from '@visactor/vutils';

export class VTableBaseActionProcessor extends ActionProcessorItem {
  /**
   * 筛选器，payload中可以配置筛选器来设置这个
   * @param selector
   * @param vtable
   */
  selectBySelector(
    selector: string | string[],
    character: ICharacter
  ): {
    table: boolean;
    panel: boolean;
  } {
    return character.getGraphicBySelector(selector);
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
