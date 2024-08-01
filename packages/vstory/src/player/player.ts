import type { IActSpec, IStory } from '../story/interface';
import { IAction } from '../story/interface';
import type { ICharacter } from '../story/character';
import type { IPlayer } from './interface/player';
import type { IActionProcessor } from './processor/interface/action-processor';
import { ActionProcessor } from './processor/processor';
import { processorMap } from './processor/processorMap';
import type { IScheduler } from './interface/scheduler';
import { Scheduler } from './scheduler';

export class Ticker {
  cb?: (delta: number) => void;
  rafIdx = 0;
  start(cb: (t: number) => void) {
    this.stop();
    this.cb = cb;
    this._tick(0);
  }

  _tick = (lt: number) => {
    const ct = Date.now();
    this.cb && this.cb(lt === 0 ? 0 : ct - lt);
    this.rafIdx = requestAnimationFrame(() => this._tick(ct));
  };

  stop() {
    this.rafIdx && cancelAnimationFrame(this.rafIdx);
    this.rafIdx = 0;
  }
}

export class Player implements IPlayer {
  protected _story: IStory;
  protected _ticker: Ticker;
  protected _currTime: number;
  // protected _encoder: Encoder;
  protected _actionProcessor: IActionProcessor;
  protected _scheduler: IScheduler;

  constructor(story: IStory, options?: { scaleX?: number; scaleY?: number }) {
    this._story = story;
    this._ticker = new Ticker();
    this._currTime = 0;
    this._story.canvas.getStage().defaultLayer.setAttributes({
      scaleX: options?.scaleX ?? 1,
      scaleY: options?.scaleY ?? 1
    });
    // this._encoder = new Encoder();
    this._actionProcessor = new ActionProcessor(story, processorMap);
    this._scheduler = new Scheduler(this._actionProcessor);
  }

  initActs(acts: IActSpec[]) {
    this._scheduler.initActs(acts);
  }

  // 清除当前状态，一般用于回放操作
  reset() {
    this._scheduler.clearState();
    return;
  }

  tickTo(t: number) {
    // console.log(t);
    const lastTime = this._currTime;
    const totalTime = this._scheduler.getTotalTime();
    while (t > totalTime) {
      t -= totalTime;
    }
    if (lastTime > t) {
      this.reset();
      this._currTime = 0;
      this.tickTo(0);
    }

    const actions = this._scheduler.getActionsInRange(lastTime, t);
    const characterSet = new Set<ICharacter>();
    actions.forEach(action => {
      const character = this._story.getCharactersById(action.characterId);
      characterSet.add(character);
      this._actionProcessor.doAction(character.spec.type, action.actionSpec.action, character, action.actionSpec);
    });

    // 将character show出来
    // TODO 后续放在appear处理，因为现在创建之后就会展示，所以只能先visible为false
    characterSet.forEach(character => {
      character.show();
    });

    this._currTime = t;
    this._story.canvas.getStage().ticker.tickAt(t);
    this._story.canvas.getStage().render();
  }

  play(): void {
    this._ticker.stop();
    this._currTime = 0;
    this.reset();
    this._ticker.start(t => {
      this.tickTo(this._currTime + t);
    });
  }

  async encodeToVideo(millsecond: number, fps: number): Promise<any> {
    // // if (!this._currChapter) {
    // //   return;
    // // }
    // const frameNum = (millsecond / 1000) * fps;
    // const deltaT = 1000 / fps;
    // this.tickTo(0);
    // const objUrl = await this._encoder.exportVideo(frameNum, fps, async i => {
    //   const t = deltaT * i;
    //   this.tickTo(t);
    //   return new Promise((resolve, reject) => {
    //     this._canvas
    //       .getStage()
    //       .window.getContext()
    //       .canvas.nativeCanvas.toBlob((blob: any) => {
    //         if (blob) {
    //           resolve(blob);
    //         } else {
    //           // console.log('no blob');
    //           reject('no blob');
    //         }
    //       }, `image/png`);
    //   });
    // });

    // return objUrl;
    return null;
  }

  pause(): void {
    this._ticker.stop();
  }

  resume(): void {
    this._ticker._tick(this._currTime);
  }

  release(): void {
    return;
  }
}
