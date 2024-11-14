import { initVR, registerCharacters, registerGraphics } from '@visactor/vstory-core';
import { registerCommonBounceAction, registerVChartAction, registerVComponentAction } from '@visactor/vstory-player';

export * from '@visactor/vstory-core';
export * from '@visactor/vstory-player';

export function registerAll() {
  registerGraphics();
  registerCharacters();
  registerVChartAction();
  registerVComponentAction();
  registerCommonBounceAction();
  initVR();
}
