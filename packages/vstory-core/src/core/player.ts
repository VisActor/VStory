import type { ITicker } from '@visactor/vrender-core';
import { EventEmitter } from '@visactor/vutils';
import type {
  IPlayer,
  IPlayerEndEvent,
  IPlayerState,
  IPlayerStateChangeEvent,
  IViewSizeParams
} from '../interface/player';
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

export class Player extends EventEmitter implements IPlayer {
  protected _story: IStory | null;
  protected _ticker: ITicker;
  protected _scheduler: IScheduler;
  protected _currTime: number;
  protected _actionProcessor: IActionProcessor;
  protected _loop: number;
  protected _state: IPlayerState;
  protected _tickerListening: boolean;
  protected _preserveStateOnReset: boolean;
  protected _lastFrameTime: number = -1;

  constructor(story: IStory, params: IPlayerParams = {}) {
    super();
    const { actionProcessor = new ActionProcessor(story) } = params;
    this._story = story;
    this._ticker = globalTickerStore.getGlobalTicker();
    this._actionProcessor = actionProcessor;
    this._scheduler = new Scheduler(actionProcessor);
    this._currTime = 0;
    this._loop = 0;
    this._state = 'idle';
    this._tickerListening = false;
    this._preserveStateOnReset = false;
    this.initTicker();
  }

  get state(): IPlayerState {
    return this._state;
  }

  get currentTime(): number {
    return this._currTime;
  }

  get totalTime(): number {
    return this._scheduler.getTotalTime();
  }

  initTicker() {
    this._attachTickerListener();
  }

  tickTo(t: number) {
    const lastTime = this._currTime;
    // 如果时间倒退，那就重置，从头开始（需要上层场景树也重置）
    if (lastTime > t) {
      this._preserveStateOnReset = true;
      try {
        this._story.reset();
      } finally {
        this._preserveStateOnReset = false;
      }
    }

    // 初始化 appear 的属性
    const appearActionList = this._scheduler.getUnAppliedAppearAction();
    appearActionList.forEach(action => {
      const character = this._story.getCharacterById(action.characterId);
      this._actionProcessor.applyAppearAttrs(
        character.config.type,
        action.actionSpec.action,
        character,
        action.actionSpec
      );
    });

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

    if (!this._preserveStateOnReset) {
      this._loop = 0;
      this._lastFrameTime = -1;
      this._detachTickerListener();
      this._setState('idle');
    }
  }

  play(loop: number = 0) {
    const totalTime = this.totalTime;
    this._loop = loop;
    this._currTime = 0;
    this._lastFrameTime = -1;
    this._attachTickerListener();
    this._setState('playing');
    if (totalTime <= 0 && !this._loop) {
      // 没有动画，且不循环也不持续，直接定位到0s
      this.tickTo(0);
      this._finishPlayback();
    } else {
      // 其他环境都需要走ticker
      this._ticker.start(true);
    }
  }

  pause() {
    if (this._state !== 'playing') {
      return;
    }
    this._lastFrameTime = -1;
    this._detachTickerListener();
    this._setState('paused');
  }

  resume() {
    if (this._state !== 'paused') {
      return;
    }
    this._lastFrameTime = -1;
    this._attachTickerListener();
    this._ticker.start(true);
    this._setState('playing');
  }

  protected handlerTick = (delta?: number) => {
    if (this._state !== 'playing') {
      return;
    }

    const time = Date.now();
    if (delta === void 0) {
      if (this._lastFrameTime >= 0) {
        delta = time - this._lastFrameTime;
      } else {
        delta = 0;
      }
    }
    this._lastFrameTime = time;

    const totalTime = this.totalTime;
    const currTime = this._currTime;
    let nextTime = currTime + delta;

    // 如果是循环播放，_currTime按周期计算
    if (this._loop > 0) {
      if (totalTime <= 0) {
        nextTime = 0;
      } else if (nextTime > totalTime) {
        nextTime = nextTime % totalTime;
      }
    }

    if (!this._loop && currTime === totalTime) {
      this._finishPlayback();
      return;
    }

    this.tickTo(this._loop >= 0 ? Math.min(nextTime, totalTime) : nextTime);

    if (!this._loop && this._currTime >= totalTime) {
      this._finishPlayback();
    }
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
    this._detachTickerListener();
    this.removeAllListeners();
    this._actionProcessor.release();
    this._scheduler.release();
    this._ticker = null;
    // globalTickerStore.releaseGlobalTicker();
  }

  protected _attachTickerListener() {
    if (!this._ticker || this._tickerListening) {
      return;
    }
    this._ticker.addListener('tick', this.handlerTick);
    this._tickerListening = true;
  }

  protected _detachTickerListener() {
    if (!this._ticker || !this._tickerListening) {
      return;
    }
    this._ticker.removeListener('tick', this.handlerTick);
    this._tickerListening = false;
  }

  protected _setState(state: IPlayerState) {
    if (this._state === state) {
      return;
    }
    const previousState = this._state;
    this._state = state;
    const event: IPlayerStateChangeEvent = {
      state,
      previousState,
      currentTime: this.currentTime,
      totalTime: this.totalTime
    };
    this.emit('stateChange', event);
  }

  protected _finishPlayback() {
    if (this._state === 'ended') {
      return;
    }
    this._lastFrameTime = -1;
    this._detachTickerListener();
    this._setState('ended');
    const event: IPlayerEndEvent = {
      currentTime: this.currentTime,
      totalTime: this.totalTime
    };
    this.emit('end', event);
  }
}
