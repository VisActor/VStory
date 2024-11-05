import type { ITicker } from '@visactor/vrender-core';
import { DefaultTicker, DefaultTimeline, ITimeline } from '@visactor/vrender-core';
import type { IPlayer, IViewSizeParams } from '../interface/player';
import type { IStory } from '../interface/story';
import type { IScheduler } from '../interface/scheduler';
import { Scheduler } from './scheduler';
import type { IActionProcessor } from '../interface/action-processor';
import { ActionProcessor } from './action-processor';
import type { IActionSpec, IActSpec } from '../interface/dsl/dsl';
import type { ICharacter } from '../interface/character';

interface IPlayerParams {
  ticker?: ITicker;
  actionProcessor?: IActionProcessor;
}

export class Player implements IPlayer {
  protected _story: IStory | null;
  protected _ticker: ITicker;
  protected _scheduler: IScheduler;
  protected _currTime: number;
  protected _actionProcessor: IActionProcessor;
  protected _loop: boolean;

  constructor(story: IStory, params: IPlayerParams = {}) {
    const { ticker = new DefaultTicker([new DefaultTimeline()]), actionProcessor = new ActionProcessor(story) } =
      params;
    this._story = story;
    this._ticker = ticker;
    this._actionProcessor = actionProcessor;
    this._scheduler = new Scheduler(actionProcessor);
    this._currTime = 0;
    this.initTicker();
  }

  initTicker() {
    this._ticker.autoStop = false;
    this._ticker.addListener('tick', this.handlerTick);
  }

  tickTo(t: number) {
    const lastTime = this._currTime;
    // 如果时间倒退，那就重置，从头开始（需要上层场景树也重置）
    if (lastTime > t) {
      this.reset();
    }

    const actions = this._scheduler.getActionsInRange(lastTime, t);
    const characterSet = new Set<ICharacter>();
    actions.forEach(action => {
      const character = this._story.getCharacterById(action.characterId);
      characterSet.add(character);
      this._actionProcessor.doAction(character.config.type, action.actionSpec.action, character, action.actionSpec);
    });

    // 将character show出来
    // TODO 后续放在appear处理，因为现在创建之后就会展示，所以只能先visible为false
    characterSet.forEach(character => {
      character.show();
    });

    this._currTime = t;

    this._story.canvas.tickTo(t);
  }

  bindStory(story: IStory) {
    this._story = story;
  }

  initActions(acts: IActSpec[]) {
    this._scheduler.init(acts);
  }

  protected reset() {
    this._scheduler.clearState();
    this._story.canvas.getStage().getTimeline().clear();
    this._currTime = 0;
    this._ticker.stop();
    return;
  }

  play(loop: boolean = false) {
    const totalTime = this._scheduler.getTotalTime();
    if (totalTime > 0) {
      this._loop = loop;
      this._currTime = 0;
      this._ticker.start(true);
    } else {
      // 没有动画，全部展示，全部渲染
      this._story.getCharacterList().forEach(c => {
        c.show();
      });
      const stage = this._story.canvas.getStage();
      stage.render();
    }
  }

  protected handlerTick = (delta: number) => {
    const totalTime = this._scheduler.getTotalTime();
    if (this._currTime >= totalTime) {
      this._currTime = this._loop ? 0 : totalTime;
      return;
    }
    this.tickTo(this._currTime + delta);
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
    this._ticker.release();
    this._scheduler.release();
  }
}
