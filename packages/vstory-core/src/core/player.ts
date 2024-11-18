import type { ITicker } from '@visactor/vrender-core';
import type { IPlayer, IViewSizeParams } from '../interface/player';
import type { IStory } from '../interface/story';
import type { IScheduler } from '../interface/scheduler';
import { Scheduler } from './scheduler';
import type { IActionProcessor } from '../interface/action-processor';
import { ActionProcessor } from './action-processor';
import type { IActionSpec, IActSpec } from '../interface/dsl/dsl';
import type { ICharacter } from '../interface/character';
import { globalTickerStore } from '../tools/global-ticker';

interface IPlayerParams {
  // ticker?: ITicker;
  actionProcessor?: IActionProcessor;
}

export class Player implements IPlayer {
  protected _story: IStory | null;
  protected _ticker: ITicker;
  protected _scheduler: IScheduler;
  protected _currTime: number;
  protected _actionProcessor: IActionProcessor;
  protected _loop: number;

  constructor(story: IStory, params: IPlayerParams = {}) {
    const { actionProcessor = new ActionProcessor(story) } = params;
    this._story = story;
    this._ticker = globalTickerStore.getGlobalTicker();
    this._actionProcessor = actionProcessor;
    this._scheduler = new Scheduler(actionProcessor);
    this._currTime = 0;
    this.initTicker();
  }

  initTicker() {
    this._ticker.addListener('tick', this.handlerTick);
  }

  tickTo(t: number) {
    const lastTime = this._currTime;
    // 如果时间倒退，那就重置，从头开始（需要上层场景树也重置）
    if (lastTime > t) {
      this._story.reset();
    }

    const actions = this._scheduler.getActionsInRange(lastTime, t);
    const characterSet = new Set<ICharacter>();
    actions.forEach(action => {
      const character = this._story.getCharacterById(action.characterId);
      characterSet.add(character);
      this._actionProcessor.doAction(character.config.type, action.actionSpec.action, character, action.actionSpec);
    });

    this._currTime = t;

    this._story.getCharacterList().forEach(c => {
      c.tickTo && c.tickTo(t);
    });

    this._story.canvas.tickTo(t);
  }

  bindStory(story: IStory) {
    this._story = story;
  }

  initActions(acts: IActSpec[]) {
    this._scheduler.init(acts);
  }

  reset() {
    this._scheduler.clearState();
    this._ticker.getTimelines().forEach(tl => tl.clear());
    this._currTime = 0;
  }

  play(loop: number = 0) {
    const totalTime = this._scheduler.getTotalTime();
    this._loop = loop;
    if (totalTime <= 0 && !this._loop) {
      // 没有动画，且不循环也不持续，直接定位到0s
      this._currTime = 0;
      this.tickTo(0);
    } else {
      // 其他环境都需要走ticker
      this._currTime = 0;
      this._ticker.start(true);
    }
  }

  protected handlerTick = (delta: number) => {
    const totalTime = this._scheduler.getTotalTime();
    let currTime = this._currTime;

    // 如果是循环播放，_currTime按周期计算
    if (this._loop > 0) {
      if (totalTime <= 0) {
        currTime = 0;
      } else {
        while (currTime + delta > totalTime) {
          currTime = currTime + delta - totalTime;
        }
      }
    }

    if (!this._loop && currTime === totalTime) {
      return;
    }

    this.tickTo(this._loop >= 0 ? Math.min(currTime + delta, totalTime) : currTime + delta);
  };

  setViewScale(offsetX: number, offsetY: number, scaleX: number, scaleY: number, params: IViewSizeParams) {
    return;
  }

  toDSL(): IActSpec[] {
    return this._scheduler.toDSL();
  }

  addAction(sceneId: string, characterId: string, actions: IActionSpec[]) {
    this._scheduler.addAction(sceneId, characterId, actions);
  }

  removeCharacterActions(characterId: string) {
    this._scheduler.removeCharacterActions(characterId);
  }

  release() {
    this._actionProcessor.release();
    this._scheduler.release();
    this._ticker.removeListener('tick', this.handlerTick);
    this._ticker = null;
    globalTickerStore.releaseGlobalTicker();
  }
}
