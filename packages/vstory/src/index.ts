import { initVR, registerCharacters, registerGraphics } from '@visactor/vstory-core';
import { registerCommonBounceAction, registerVChartAction, registerVComponentAction } from '@visactor/vstory-player';

export * from '@visactor/vstory-core';
export * from '@visactor/vstory-player';
export * from '@visactor/vstory-templates';
export * from '@visactor/vstory-external';

export function registerAll() {
  registerGraphics();
  registerCharacters();
  registerVChartAction();
  registerVComponentAction();
  registerCommonBounceAction();
  initVR();
}
