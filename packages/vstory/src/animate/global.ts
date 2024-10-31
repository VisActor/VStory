import type { ITimeline } from '@visactor/vrender-core';
import { DefaultTicker, DefaultTimeline } from '@visactor/vrender-core';

let globalTimeline: ITimeline;

export function getGlobalTimeline() {
  if (!globalTimeline) {
    globalTimeline = new DefaultTimeline();
    const globalTicker = new DefaultTicker([globalTimeline]);
    // 永不停止的ticker
    globalTicker.autoStop = false;

    const TICKER_FPS = 60;
    globalTicker.setFPS(TICKER_FPS);
    globalTicker.start(true);
  }
  return globalTimeline;
}
