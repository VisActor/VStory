import type { IActSpec, IStory } from '../story/interface';
import type { ICharacter } from '../story/character';
import { EventEmitter } from '@visactor/vutils';

export class Ticker {
  cb?: (delta: number) => void;
  rafIdx = 0;
  running: boolean;
  speed: number = 1;
  start(cb: (t: number) => void) {
    this.stop();
    this.cb = cb;
    this.running = true;
    this._tick(0);
  }

  _tick = (lt: number) => {
    if (!this.running) {
      return;
    }
    const ct = Date.now();
    this.rafIdx = requestAnimationFrame(() => this._tick(ct));
    this.cb && this.cb((lt === 0 ? 0 : ct - lt) * this.speed);
  };

  stop() {
    this.rafIdx && cancelAnimationFrame(this.rafIdx);
    this.rafIdx = 0;
    this.running = false;
  }
}

export class Player extends EventEmitter {
  protected _story: IStory;
  protected _ticker: Ticker;
  protected _currTime: number;

  set speed(speed: number) {
    this._ticker.speed = speed;
  }

  get speed(): number {
    return this._ticker ? this._ticker.speed : 1;
  }

  constructor(story: IStory, options?: { scaleX?: number; scaleY?: number }) {
    super();
    this._story = story;
    this._ticker = new Ticker();
    this._currTime = 0;
    const stage = this._story.canvas.getStage();
    const scaleX = options?.scaleX ?? 1;
    const scaleY = options?.scaleY ?? 1;

    stage.window.setViewBoxTransform(scaleX, 0, 0, scaleY, 0, 0);
  }

  initActs(acts: IActSpec[]) {
    // nothing
  }

  // 清除当前状态，一般用于回放操作
  reset() {
    this._story.canvas.getStage().getTimeline().clear();
    this._currTime = 0;
    return;
  }

  tickTo(t: number) {
    const characterSet = new Set<ICharacter>();
    // 将character show出来
    // TODO 后续放在appear处理，因为现在创建之后就会展示，所以只能先visible为false
    characterSet.forEach(character => {
      character.show();
    });

    this._currTime = t;

    const stage = this._story.canvas.getStage();
    stage.ticker.tickAt(t);
    stage.render();
  }

  play(): void {
    this._ticker.stop();
    this._currTime = 0;
    this.reset();
    const stage = this._story.canvas.getStage();
    // 开启ticker
    stage.ticker.start(true);
    stage.getTimeline().resume();
  }

  release(): void {
    return;
  }
}
