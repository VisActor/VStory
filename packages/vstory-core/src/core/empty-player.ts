import type { IPlayer, IViewSizeParams } from '../interface/player';
import type { IStory } from '../interface/story';
import type { IScheduler } from '../interface/scheduler';
import { Scheduler } from './scheduler';
import type { IActionProcessor } from '../interface/action-processor';
import { ActionProcessor } from './action-processor';
import type { IActionSpec, IActSpec } from '../interface/dsl/dsl';

interface IPlayerParams {
  // ticker?: ITicker;
  actionProcessor?: IActionProcessor;
}

export class EmptyPlayer implements IPlayer {
  protected _story: IStory | null;
  protected _scheduler: IScheduler;

  constructor(story: IStory, params: IPlayerParams = {}) {
    const { actionProcessor = new ActionProcessor(story) } = params;
    this._story = story;
    this._scheduler = new Scheduler(actionProcessor);
    story.setPlayer(this);
  }

  tickTo(t: number) {
    return;
  }

  bindStory(story: IStory) {
    this._story = story;
  }

  initActions(acts: IActSpec[]) {
    this._scheduler.init(acts);
  }

  reset() {
    this._scheduler.clearState();
  }

  play(loop: number = 0) {
    this._story.getCharacterList().forEach(c => {
      c.show();
    });
    this._story.canvas.getStage().render();
    return;
  }

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
    this._scheduler.release();
  }
}
