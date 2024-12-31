import type { ICanvasLike, IGraphic, IStage } from '@visactor/vrender-core';
import { createStage, ManualTicker, vglobal } from '@visactor/vrender-core';
import type { IStoryCanvas } from '../interface/canvas';
import type { IStory } from '../interface/story';
import type { IStoryEvent } from '../interface/event';
import type { ICharacter } from '../interface/character';
import { isValidNumber } from '@visactor/vutils';

export class StoryCanvas implements IStoryCanvas {
  protected _story: IStory;
  protected _stage: IStage;
  protected _canvas: ICanvasLike;

  getNativeCanvas() {
    return this._canvas;
  }

  getStage() {
    return this._stage;
  }

  protected _container: HTMLDivElement | null;
  get container() {
    return this._container;
  }

  constructor(
    story: IStory,
    params: {
      container?: HTMLDivElement;
      canvas?: HTMLCanvasElement;
      width?: number;
      height?: number;
      dpr?: number;
      background: string;
      layerBackground: string;
      scaleX?: number | 'auto';
      scaleY?: number | 'auto';
    }
  ) {
    this._story = story;
    this._container = params.container;
    this._canvas = params.canvas as any;

    const {
      canvas,
      width: _w,
      height: _h,
      background = 'transparent',
      layerBackground = 'transparent',
      dpr = vglobal.devicePixelRatio,
      scaleX: _sx = 1,
      scaleY: _sy = 1
    } = params;
    const { scaleX, scaleY, width, height } = this.getScale(_w, _h, _sx, _sy);

    this._container && this._initCanvasByContainer(width, height, dpr, background);
    params.canvas && this._initCanvasByCanvas(canvas, width ?? 500, height ?? 500, dpr, background);

    // this._stage.background = background;
    this._stage.defaultLayer.setAttributes({ background: layerBackground });
    this._stage.defaultLayer.scale(scaleX, scaleY);
  }

  protected _initCanvasByContainer(width: number, height: number, dpr: number, background: string) {
    const container = this._container;
    if (!container) {
      return;
    }
    const canvas = document.createElement('canvas');
    // canvas.style.position = 'absolute';
    canvas.id = `_visactor_story_canvas_${this._story.id}`;
    this._canvas = canvas as any;
    container.appendChild(canvas);
    const stage = this._initCanvas(
      canvas,
      width ?? container.clientWidth,
      height ?? container.clientHeight,
      dpr,
      background
    );
    // @ts-ignore
    this._stage = stage;
  }

  protected _initCanvasByCanvas(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    dpr: number,
    background: string
  ) {
    const stage = this._initCanvas(canvas, width, height, dpr, background);
    this._canvas = canvas as any;
    // @ts-ignore
    this._stage = stage;
  }

  protected _initCanvas(canvas: HTMLCanvasElement, width: number, height: number, dpr: number, background: string) {
    const stage = createStage({
      canvas: canvas,
      width,
      height,
      dpr,
      canvasControled: true,
      background,
      // 得开启自动渲染，否则编辑场景中无法触发视图更新
      autoRender: false,
      disableDirtyBounds: true,
      ticker: new ManualTicker([]),
      pluginList: ['RichTextEditPlugin'],
      event: {
        clickInterval: 300
      }
    });
    stage.id = `vstory_${this._story.id}`;
    return stage;
  }

  protected getScale(
    width: number,
    height: number,
    scaleX: number | 'auto',
    scaleY: number | 'auto'
  ): { scaleX: number; scaleY: number; width: number; height: number } {
    // 仅在传入width和height时有效
    if (scaleX === 'auto' || scaleY === 'auto') {
      if (!Number.isFinite(width) || !Number.isFinite(height)) {
        scaleX = scaleY = 1;
      } else {
        const clipWidth = this._container
          ? this._container.clientWidth
          : this._canvas?.width / vglobal.devicePixelRatio;
        const clipHeight = this._container
          ? this._container.clientHeight
          : this._canvas?.height / vglobal.devicePixelRatio;
        if (!isValidNumber(clipWidth) || !isValidNumber(clipHeight)) {
          scaleX = scaleY = 1;
          return { scaleX, scaleY, width, height };
        }

        const clipAspectRatio = clipWidth / clipHeight;
        const contentAspectRatio = width / height;
        const scale = clipAspectRatio > contentAspectRatio ? clipHeight / height : clipWidth / width;
        if (!isValidNumber(scale)) {
          scaleX = scaleY = 1;
        } else {
          if (scaleX === 'auto') {
            scaleX = scale;
          }

          if (scaleY === 'auto') {
            scaleY = scale;
          }
        }
        width *= scaleX;
        height *= scaleY;
      }
    }
    return { scaleX, scaleY, width, height };
    // this._stage.defaultLayer.scale(scaleX, scaleY);
  }

  resize(w: number, h: number) {
    this._stage.resize(w, h, true);
  }

  getEventDetail(event: IStoryEvent) {
    // 得到交互元素的详细信息
    let characterInfo;
    let character: ICharacter;
    this._story.getCharacterList().forEach(c => {
      const info = c.checkEvent(event);
      if (info) {
        characterInfo = info;
        character = c;
        return true;
      }
      return false;
    });
    return {
      character,
      characterInfo
    };
  }

  tickTo(t: number, render: boolean = true) {
    // 开启ticker，否则ticker那里不会执行，第一帧就掉了
    this._stage.ticker.start();
    this._stage.getTimeline().resume();
    this._stage.ticker.tickAt(t);
    render && this._stage.render();
  }

  getDpr(): number {
    return this._stage.dpr;
  }

  addGraphic(g: IGraphic): void {
    this._stage.defaultLayer.add(g);
  }

  removeGraphic(g: IGraphic): void {
    this._stage.defaultLayer.removeChild(g);
  }

  release() {
    this._stage.release();
  }
}
