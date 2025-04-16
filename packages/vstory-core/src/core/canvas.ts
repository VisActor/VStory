import type { ICanvasLike, IGraphic, ILayer, IStage } from '@visactor/vrender-core';
import { createStage, vglobal, ManualTicker } from '@visactor/vrender';
import type { IStoryCanvas } from '../interface/canvas';
import type { IStory } from '../interface/story';
import type { IStoryEvent } from '../interface/event';
import type { ICharacter, ILayoutLine } from '../interface/character';
import type { IAABBBoundsLike } from '@visactor/vutils';
import { isValidNumber } from '@visactor/vutils';
import { getLayoutLine } from '../utils/layout';

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

  protected _layerClip: boolean = true;

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
      layerViewBox?: IAABBBoundsLike;
      scaleX?: number | 'auto';
      scaleY?: number | 'auto';
      pluginList?: string[];
      layerClip?: boolean;
    }
  ) {
    this._story = story;
    this._container = params.container;
    this._canvas = params.canvas as any;
    this._layerClip = params.layerClip ?? true;

    const {
      canvas,
      width: _w,
      height: _h,
      background = 'transparent',
      layerBackground = 'transparent',
      dpr = params.dpr ?? vglobal.devicePixelRatio,
      layerViewBox,
      scaleX: _sx = 1,
      scaleY: _sy = 1,
      pluginList = params.pluginList ?? []
    } = params;
    const { scaleX, scaleY, width, height } = this.getScale(_w, _h, _sx, _sy);

    this._container && this._initCanvasByContainer(width, height, dpr, background, pluginList);
    params.canvas && this._initCanvasByCanvas(canvas, width ?? 500, height ?? 500, dpr, background, pluginList);

    // this._stage.background = background;
    this._stage.defaultLayer.setAttributes({ background: layerBackground });
    const viewBox = layerViewBox || { x1: 0, y1: 0, x2: width, y2: height };
    this._stage.defaultLayer.setAttributes({
      x: viewBox.x1,
      y: viewBox.y1,
      width: (viewBox.x2 - viewBox.x1) / scaleX,
      height: (viewBox.y2 - viewBox.y1) / scaleY,
      clip: this._layerClip
    });
    this._stage.defaultLayer.scale(scaleX, scaleY);
  }

  protected _initCanvasByContainer(
    width: number,
    height: number,
    dpr: number,
    background: string,
    pluginList: string[]
  ) {
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
      background,
      pluginList
    );
    // @ts-ignore
    this._stage = stage;
  }

  protected _initCanvasByCanvas(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    dpr: number,
    background: string,
    pluginList: string[]
  ) {
    const stage = this._initCanvas(canvas, width, height, dpr, background, pluginList);
    this._canvas = canvas as any;
    // @ts-ignore
    this._stage = stage;
  }

  protected _initCanvas(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    dpr: number,
    background: string,
    pluginList: string[]
  ) {
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
      pluginList: pluginList ?? ['RichTextEditPlugin'],
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

  resize(w: number, h: number, scale?: { scaleX: number; scaleY: number }) {
    this._stage.resize(w, h, true);
    let scaleX = 1;
    let scaleY = 1;
    if (scale) {
      scaleX = scale.scaleX;
      scaleY = scale.scaleY;
    }
    this._stage.forEachChildren((layer: ILayer) => {
      layer.setAttributes({
        x: 0,
        y: 0,
        width: w / scaleX,
        height: h / scaleY,
        scaleX,
        scaleY
      });
    });
  }

  setLayerViewBox(viewBox: IAABBBoundsLike) {
    this._stage.defaultLayer.setAttributes({
      x: viewBox.x1,
      y: viewBox.y1,
      width: viewBox.x2 - viewBox.x1,
      height: viewBox.y2 - viewBox.y1,
      clip: this._layerClip
    });
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

  getLayoutGuideLine(): ILayoutLine[] {
    const layer = this._stage.defaultLayer;
    const bounds = layer.AABBBounds.clone();
    bounds.transformWithMatrix(layer.transMatrix.getInverse());

    return getLayoutLine(bounds, {
      id: this._stage.id
    });
  }

  release() {
    this._stage.release();
  }
}
