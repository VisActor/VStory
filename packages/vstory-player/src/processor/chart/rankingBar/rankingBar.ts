import type { IVChart, Player } from '@visactor/vchart';
import type { BasePlayer } from '@visactor/vrender-components';
import { vglobal } from '@visactor/vrender';
import { isValid } from '@visactor/vutils';
import {
  CharacterType,
  globalProcessorRegistry,
  type IAction,
  type IActionPayload,
  type IActionSpec,
  type ICharacter
} from '@visactor/vstory-core';
import { ActionProcessorItem } from '../../processor-item';
import { ACTION_TYPE } from '../../constants/action';
import { VChartVisibilityActionProcessor } from '../visibility';

// TODO: move to interface folder
// export type IRankingBarPlayPayload = Omit<IActionPayload, 'animation'>;
export type IRankingBarPlayPayload = IActionPayload;

export interface IRankingBarPlayAction extends IAction<IRankingBarPlayPayload> {
  action: 'play';
}

function _forward(
  vchartPlayer: Player,
  vrenderPlayer: BasePlayer<any>,
  params: {
    progress: number;
    index?: number;
  }
): boolean {
  if (!vrenderPlayer) {
    return false;
  }
  const { index } = params;
  if (isValid(index) && index !== vrenderPlayer.getMaxIndex()) {
    vchartPlayer.changePlayerIndex(vrenderPlayer.getDataIndex());
    return true;
  }
  return false;
}

export class RankingBarPlayActionProcessor extends ActionProcessorItem {
  name: 'rankingBar-play';
  rafId: any;

  duration = 0;
  interval = 0;
  count = 0;

  start: number;
  prevIndex: number;
  done = false;

  vchartPlayer: Player;
  vrenderPlayer: BasePlayer<any>;

  constructor() {
    super();
  }

  getStartTimeAndDuration(action: IActionSpec, character?: ICharacter): { startTime: number; duration: number } {
    const { startTime: globalStartTime = 0 } = action;
    // @ts-ignore
    const { startTime = 0 } = action.payload?.animation ?? ({} as any);
    const instance = (character.graphic as any)._vchart as IVChart;
    const interval = instance?.getSpec()?.interval ?? 0;
    const count = instance?.getSpec()?.player?.specs?.length ?? 0;
    const duration = interval * count;
    const st = globalStartTime + startTime;
    this.duration = duration;
    this.interval = interval;
    this.count = count;
    return {
      startTime: st,
      duration
    };
  }

  run(character: ICharacter, actionSpec: any): void {
    const instance = (character.graphic as any)._vchart as IVChart;
    if (!instance) {
      return;
    }
    const vchartPlayer = instance.getComponents().find(cmp => cmp.type === 'player') as Player;
    if (!vchartPlayer) {
      return;
    }
    const vrenderPlayer = vchartPlayer.getVRenderComponents()[0] as BasePlayer<any>;
    if (!vrenderPlayer) {
      return;
    }
    this.vchartPlayer = vchartPlayer;
    this.vrenderPlayer = vrenderPlayer;
    this.rafId = vglobal.getRequestAnimationFrame()(this.forward.bind(this));
  }

  forward = (timestamp: number) => {
    if (!isValid(this.start)) {
      this.start = timestamp;
      this.vrenderPlayer.play();
    }
    const elapsed = timestamp - this.start;
    const progress = elapsed / this.duration;
    const curIndex = Math.floor(Math.min(progress * this.count, this.count));

    if (curIndex < this.count - 1) {
      if (this.prevIndex !== curIndex) {
        const result = _forward(this.vchartPlayer, this.vrenderPlayer, { index: curIndex, progress });
        if (result) {
          this.prevIndex = curIndex;
        }
      } else {
        _forward(this.vchartPlayer, this.vrenderPlayer, { progress });
      }

      // this.rafId = vglobal.getRequestAnimationFrame()(this.forward.bind(this));
    } else {
      this.start = undefined;
      this.prevIndex = undefined;
      // vglobal.getCancelAnimationFrame()(this.rafId);
      return;
    }
  };
}

export function registerRankingBarPlayAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.RANKINGBAR, {
    [ACTION_TYPE.PLAY]: new RankingBarPlayActionProcessor()
  });
}
export function registerRankingBarVisibilityAction() {
  globalProcessorRegistry.registerProcessor(CharacterType.RANKINGBAR, {
    [ACTION_TYPE.APPEAR]: new VChartVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new VChartVisibilityActionProcessor()
  });
}
