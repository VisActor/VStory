import '@visactor/vrender-core';
import {
  container,
  isBrowserEnv,
  isNodeEnv,
  preLoadAllModule,
  registerFlexLayoutPlugin,
  registerViewTransform3dPlugin,
  registerHtmlAttributePlugin,
  registerReactAttributePlugin,
  registerDirectionalLight,
  registerOrthoCamera,
  vglobal
} from '@visactor/vrender-core';
import { loadBrowserEnv, loadNodeEnv } from '@visactor/vrender-kits';
import {
  registerArc,
  registerArc3d,
  registerArea,
  registerCircle,
  registerGlyph,
  registerGroup,
  registerImage,
  registerLine,
  registerPath,
  registerPolygon,
  registerPyramid3d,
  registerRect,
  registerRect3d,
  registerRichtext,
  registerShadowRoot,
  registerSymbol,
  registerText,
  registerWrapText,
  registerGifImage
} from '@visactor/vrender-kits';

let _registered = false;
export function initVR(
  mode: 'browser' | 'node' = 'browser',
  nodeParams?: { createCanvas: any; createImageData: any; loadImage: any; Resvg: any }
) {
  if (_registered) {
    return;
  }
  _registered = true;
  preLoadAllModule();

  if (mode === 'browser' && isBrowserEnv()) {
    loadBrowserEnv(container);
    vglobal.setEnv('browser');
  } else if (isNodeEnv()) {
    loadNodeEnv(container);
    vglobal.setEnv('node', nodeParams);
  }
  registerArc();
  registerArc3d();
  registerArea();
  registerCircle();
  registerGlyph();
  registerGroup();
  registerImage();
  registerLine();
  registerPath();
  registerPolygon();
  registerPyramid3d();
  registerRect();
  registerRect3d();
  registerRichtext();
  registerShadowRoot();
  registerSymbol();
  registerText();
  registerWrapText();
  registerGifImage();

  registerFlexLayoutPlugin();
  registerViewTransform3dPlugin();
  registerHtmlAttributePlugin();
  registerReactAttributePlugin();
  registerDirectionalLight();
  registerOrthoCamera();
}
