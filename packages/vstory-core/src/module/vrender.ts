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
  registerOrthoCamera
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
  registerWrapText
} from '@visactor/vrender-kits';

let _registered = false;
export function initVR() {
  if (_registered) {
    return;
  }
  _registered = true;
  preLoadAllModule();

  if (isBrowserEnv()) {
    loadBrowserEnv(container);
  } else if (isNodeEnv()) {
    loadNodeEnv(container);
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

  registerFlexLayoutPlugin();
  registerViewTransform3dPlugin();
  registerHtmlAttributePlugin();
  registerReactAttributePlugin();
  registerDirectionalLight();
  registerOrthoCamera();
}
