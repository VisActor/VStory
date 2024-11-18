import type { ITicker, ITimeline } from '@visactor/vrender-core';
import { DefaultTicker, DefaultTimeline } from '@visactor/vrender-core';

// let globalTimeline: ITimeline;

export class GlobalTickerStore {
  timelineMap: Map<string, ITimeline>;
  protected globalTicker: ITicker;

  init() {
    const defaultGlobalTimeline = new DefaultTimeline();
    const globalTicker = new DefaultTicker([]);
    globalTicker.addTimeline(defaultGlobalTimeline);
    globalTicker.autoStop = false;
    const TICKER_FPS = 60;
    globalTicker.setFPS(TICKER_FPS);
    this.globalTicker = globalTicker;
    this.timelineMap = new Map();
    this.timelineMap.set('default', defaultGlobalTimeline);
  }

  getGlobalTicker() {
    if (!this.globalTicker) {
      this.init();
    }
    return this.globalTicker;
  }

  releaseGlobalTicker() {
    this.globalTicker.release();
    this.globalTicker = null;
  }

  getTimeline(name: string) {
    if (!this.globalTicker) {
      this.init();
    }
    let timeline = this.timelineMap.get(name);
    if (!timeline) {
      timeline = new DefaultTimeline();
      this.timelineMap.set(name, timeline);
      this.globalTicker.addTimeline(timeline);
    }
    return timeline;
  }

  release() {
    this.globalTicker.release();
    this.globalTicker = null;
    this.timelineMap.forEach(tl => tl.clear());
    this.timelineMap.clear();
  }
}

export const globalTickerStore = new GlobalTickerStore();
