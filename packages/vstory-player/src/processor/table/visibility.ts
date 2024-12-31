import { array, merge } from '@visactor/vutils';
import type { IActionSpec, ICharacter } from '@visactor/vstory-core';
import { globalProcessorRegistry, CharacterType } from '@visactor/vstory-core';
import { VTableBaseActionProcessor } from './base';
import type { ITableVisibilityAction, ITableVisibilityPayload } from './interface';
import { transformMap } from './transformFunc/transformMap';
import type { IGroup } from '@visactor/vrender-core';
import { ACTION_TYPE } from '../constants/action';
import { CommonBounceActionProcessor } from '../component/common/bounce';
import { CommonStyleActionProcessor } from '../component/common/style';
import type { IVTable } from '@visactor/vstory-core/src/character/table/interface/character-table';
import { scaleInstance } from '../common/scale-processor';
import { wipeInstance } from '../common/wipe-processor';
import { fadeInstance } from '../common/fade-processor';
import { moveInstance } from '../common/move-processor';

export class VTableVisibilityActionProcessor extends VTableBaseActionProcessor {
  name: 'appearOrDisAppear';
  protected character: ICharacter | null;

  constructor() {
    super();
  }

  run(character: ICharacter, actionSpec: ITableVisibilityAction): void {
    super.preRun(character, actionSpec);
    this.character = character;
    // 基于选择器做筛选
    // 同一个Action的payload数组中，项与项之间是覆盖关系，后项覆盖前项
    let runnedTable = false;
    array(actionSpec.payload)
      .reverse()
      .forEach(payload => {
        const { table, panel, rowHeader, colHeader, bodyGroup } = this.selectBySelector(
          payload.selector ?? '*',
          character
        );
        if (!runnedTable && table) {
          // table & panel
          this.tableVisibility(character.graphic as any, actionSpec.action, payload);
        } else if (!runnedTable && panel) {
          // panel
          this.panelVisibility(character.graphic as any, actionSpec.action, payload);
        }
        if (rowHeader) {
          this.headerAppear('row', character.graphic as any, rowHeader, actionSpec.action, payload, true);
        }
        if (colHeader) {
          this.headerAppear('col', character.graphic as any, colHeader, actionSpec.action, payload, true);
        }
        if (bodyGroup) {
          this.bodyGroupAppear(character.graphic as any, bodyGroup, actionSpec.action, payload, true);
        }
        runnedTable = runnedTable || table;
      });
    this.character = null;
  }

  protected headerAppear(
    type: 'row' | 'col',
    vtable: IVTable,
    headerGroup: IGroup,
    action: 'appear' | 'disappear',
    payload: ITableVisibilityPayload,
    isRun: boolean
  ) {
    if (isRun) {
      headerGroup.setAttribute('visibleAll', true);
      const appear = action === 'appear';
      const effectInstance = this.getEffectInstance(payload.animation?.effect as string, appear);
      effectInstance.run(headerGroup, { from: type === 'col' ? 'left' : 'top', ...payload.animation }, appear, true);
    } else {
      headerGroup.setAttribute('visibleAll', false);
    }
  }

  protected bodyGroupAppear(
    vtable: IVTable,
    bodyGroup: IGroup,
    action: 'appear' | 'disappear',
    payload: ITableVisibilityPayload,
    isRun: boolean
  ) {
    if (isRun) {
      bodyGroup.setAttribute('visibleAll', true);
      // 做默认动画
      const appear = action === 'appear';
      const { duration, oneByOne = true, easing } = payload.animation;
      let delay = 0;
      let actualDuration = duration;
      if (oneByOne) {
        actualDuration = duration * 0.6;
        delay = (duration - actualDuration) / bodyGroup.childrenCount;
      }
      const from = appear ? { baseOpacity: 0 } : { baseOpacity: 1 };
      const to = appear ? { baseOpacity: 1 } : { baseOpacity: 0 };
      bodyGroup.forEachChildren((child, i) => {
        (child as any).setAttributes(from);
        (child as any)
          .animate()
          .wait(delay * i)
          .to(to, actualDuration, easing);
      });
    } else {
      bodyGroup.setAttribute('visibleAll', false);
    }
  }

  getEffectInstance(effect: string, appear: boolean) {
    switch (effect) {
      case 'scale':
        return scaleInstance;
      case 'wipe':
        return wipeInstance;
      case 'fade':
        return fadeInstance;
      case 'move':
        return moveInstance;
    }
    return fadeInstance;
  }

  // protected rowHeaderAppear(
  //   vtable: IVTable,
  //   rowHeader: IGroup
  // ) {
  //   return this.headerAppear(vtable, rowHeader);
  // }

  protected tableVisibility(tableGraphic: any, action: 'appear' | 'disappear', payload: ITableVisibilityPayload) {
    const appearTransformFunc = transformMap.appear.table;
    const defaultPayload = VTableVisibilityActionProcessor.fadePayload;
    this.runTransformFunc(tableGraphic as any, appearTransformFunc, action, payload, defaultPayload);
  }

  protected panelVisibility(tableGraphic: any, action: 'appear' | 'disappear', payload: ITableVisibilityPayload) {
    const appearTransformFunc = transformMap.appear.panel;
    const defaultPayload = VTableVisibilityActionProcessor.fadePayload;
    this.runTransformFunc(tableGraphic as any, appearTransformFunc, action, payload, defaultPayload);
  }

  private runTransformFunc(
    instance: IGroup,
    appearTransformFunc: any,
    action: 'appear' | 'disappear',
    payload: ITableVisibilityPayload,
    defaultPayload: IActionSpec['payload'] = {} as any,
    actionOption: Record<string, any> = {}
  ) {
    if (instance && appearTransformFunc) {
      const mergePayload = merge({}, defaultPayload, payload) as ITableVisibilityPayload;
      appearTransformFunc(instance, mergePayload.animation, {
        disappear: action === 'disappear',
        ...actionOption,
        payload: mergePayload
      });
    }
  }

  static rectPayload = (seriesType: string) => {
    return {
      animation: {
        effect: seriesType === 'treemap' ? 'centerGrow' : 'grow',
        duration: 2000,
        easing: 'cubicOut',
        oneByOne: false,
        loop: false
      }
    };
  };

  static defaultPayload: ITableVisibilityAction['payload'] = {
    animation: {
      effect: 'grow',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };

  static fadePayload: ITableVisibilityAction['payload'] = {
    animation: {
      effect: 'fade',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };

  static arcPayload: ITableVisibilityAction['payload'] = {
    animation: {
      effect: 'growAngle',
      duration: 2000,
      easing: 'cubicOut',
      oneByOne: false,
      loop: false
    }
  };

  static linePayload: ITableVisibilityAction['payload'] = VTableVisibilityActionProcessor.defaultPayload;
  static symbolPayload: ITableVisibilityAction['payload'] = VTableVisibilityActionProcessor.defaultPayload;
  static textPayload: ITableVisibilityAction['payload'] = VTableVisibilityActionProcessor.defaultPayload;
}

export function registerVTableVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.VTABLE, {
    [ACTION_TYPE.APPEAR]: new VTableVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new VTableVisibilityActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor()
  });

  globalProcessorRegistry.registerProcessor(CharacterType.PIVOT_CHART, {
    [ACTION_TYPE.APPEAR]: new VTableVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new VTableVisibilityActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor()
  });
}
