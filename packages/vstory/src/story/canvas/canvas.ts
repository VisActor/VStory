import type { Story } from '../story';
import type { IStage } from '@visactor/vrender';
import { createStage, vglobal, container, preLoadAllModule, ManualTicker, initNodeEnv } from '@visactor/vrender';
import { loadBrowserEnv } from '@visactor/vrender';
import type { IStoryCanvas, StoryEvent } from '../interface/runtime-interface';
import type { ICharacter } from '../character/runtime-interface';

export function setBrowserEnv() {
  preLoadAllModule();
  loadBrowserEnv(container);
  vglobal.setEnv('browser');
}

export function setNodeEnv(params: { createCanvas: any; createImageData: any; loadImage: any; Resvg: any }) {
  preLoadAllModule();
  initNodeEnv();
  vglobal.setEnv('node', params);
}

export class StoryCanvas implements IStoryCanvas {
  protected _story: Story;
  protected _canvas: HTMLCanvasElement;
  protected _stage: IStage;
  getStage() {
    return this._stage;
  }

  getCanvas() {
    return this._canvas;
  }

  protected _container: HTMLDivElement | null;
  get container() {
    return this._container;
  }

  protected _params: {
    container?: HTMLDivElement;
    canvas?: HTMLCanvasElement;
    width?: number;
    height?: number;
    dpr?: number;
    pluginList?: string[];
  };
  get dpr() {
    return this._params.dpr ?? vglobal.devicePixelRatio;
  }

  constructor(
    story: Story,
    params: {
      container?: HTMLDivElement;
      canvas?: HTMLCanvasElement;
      width?: number;
      height?: number;
      dpr?: number;
      pluginList?: string[];
    }
  ) {
    this._story = story;
    this._params = params;
    this._container = params.container;
    this._container && this._initCanvasByContainer();
    params.canvas && this._initCanvasByCanvas(params.canvas, params.width || 500, params.height || 500, params.dpr);
  }

  resize(w: number, h: number) {
    if (this._canvas) {
      this._canvas.width = w * vglobal.devicePixelRatio;
      this._canvas.height = h * vglobal.devicePixelRatio;
      this._canvas.style.width = w + 'px';
      this._canvas.style.height = h + 'px';
      this._stage.resize(w, h);
    }
  }

  protected _initCanvasByContainer() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.id = `_visactor_story_canvas_${this._story.id}`;
    this._container.appendChild(canvas);
    this._canvas = canvas;
    const stage = createStage({
      canvas: this._canvas,
      width: this._container.clientWidth,
      height: this._container.clientHeight,
      dpr: this.dpr,
      canvasControled: true,
      // 得开启自动渲染，否则编辑场景中无法触发视图更新
      autoRender: true,
      disableDirtyBounds: true,
      ticker: new ManualTicker([]),
      pluginList: this._params.pluginList ?? [],
      event: {
        clickInterval: 300
      }
    });
    // @ts-ignore
    this._stage = stage;
  }

  protected _initCanvasByCanvas(canvas: HTMLCanvasElement, width: number, height: number, dpr: number) {
    this._canvas = canvas;
    const stage = createStage({
      canvas: this._canvas,
      width,
      height,
      canvasControled: true,
      // 得开启自动渲染，否则编辑场景中无法触发视图更新
      autoRender: true,
      disableDirtyBounds: true,
      ticker: new ManualTicker([]),
      pluginList: this._params.pluginList ?? [],
      dpr: this.dpr,
      event: {
        clickInterval: 300
      }
    });
    // @ts-ignore
    this._stage = stage;
  }

  getEventDetail(event: StoryEvent) {
    // 得到交互元素的详细信息
    const characterMap = this._story.getCharacters();
    let characterInfo;
    let character: ICharacter;
    Object.keys(this._story.getCharacters()).find(id => {
      const characterTemp = characterMap[id];
      const info = characterTemp.checkEvent(event);
      if (info) {
        characterInfo = info;
        character = characterTemp;
        return true;
      }
      return false;
    });

    return {
      character,
      characterInfo
    };
  }

  release() {
    this._stage.release();
  }
}
