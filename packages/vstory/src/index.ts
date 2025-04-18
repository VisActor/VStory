import { registerEasing } from '@visactor/vstory-animate';
import { initVR, registerCharacters, registerGraphics } from '@visactor/vstory-core';
import {
  registerCommonBounceAction,
  registerVChartAction,
  registerVComponentAction,
  registerVTableAction
} from '@visactor/vstory-player';

export * from '@visactor/vstory-core';
export * from '@visactor/vstory-player';
export * from '@visactor/vstory-templates';
export * from '@visactor/vstory-external';
export * from '@visactor/vstory-animate';
export * from '@visactor/vstory-editor';

export function registerAll(
  mode: 'browser' | 'node' = 'browser',
  nodeParams?: { createCanvas: any; createImageData: any; loadImage: any; Resvg: any }
) {
  registerGraphics();
  registerCharacters();
  registerVChartAction();
  registerVComponentAction();
  registerCommonBounceAction();
  registerEasing();
  registerVTableAction();
  initVR(mode, nodeParams);
}
export * as VUtils from '@visactor/vutils';
