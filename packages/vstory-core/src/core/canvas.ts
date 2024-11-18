import type { ICanvasLike, IGraphic, IStage } from '@visactor/vrender-core';
import { createStage, ManualTicker, vglobal } from '@visactor/vrender-core';
import type { IStoryCanvas } from '../interface/canvas';
import type { IStory } from '../interface/story';
import type { IStoryEvent } from '../interface/event';
import type { ICharacter } from '../interface/character';

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
      scaleX?: number;
      scaleY?: number;
    }
  ) {
    this._story = story;
    this._container = params.container;

    const {
      canvas,
      width = 500,
      height = 500,
      background = 'transparent',
      layerBackground = 'transparent',
      dpr = vglobal.devicePixelRatio,
      scaleX = 1,
      scaleY = 1
    } = params;
    this._container && this._initCanvasByContainer(dpr);
    params.canvas && this._initCanvasByCanvas(canvas, width, height, dpr);

    this._stage.background = background;
    this._stage.defaultLayer.setAttributes({ background: layerBackground });

    this._stage.defaultLayer.scale(scaleX, scaleY);
  }

  protected _initCanvasByContainer(dpr: number) {
    const container = this._container;
    if (!container) {
      return;
    }
    const canvas = document.createElement('canvas');
    // canvas.style.position = 'absolute';
    canvas.id = `_visactor_story_canvas_${this._story.id}`;
    this._canvas = canvas as any;
    container.appendChild(canvas);
    const stage = this._initCanvas(canvas, container.clientWidth, container.clientHeight, dpr);
    // @ts-ignore
    this._stage = stage;
  }

  protected _initCanvasByCanvas(canvas: HTMLCanvasElement, width: number, height: number, dpr: number) {
    const stage = this._initCanvas(canvas, width, height, dpr);
    this._canvas = canvas as any;
    // @ts-ignore
    this._stage = stage;
  }

  protected _initCanvas(canvas: HTMLCanvasElement, width: number, height: number, dpr: number) {
    const stage = createStage({
      canvas: canvas,
      width,
      height,
      dpr,
      canvasControled: true,

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

  resize(w: number, h: number) {
    this._stage.resize(w, h, true);
  }

  getEventDetail(event: IStoryEvent) {
    // 得到交互元素的详细信息
    let characterInfo;
    let character: ICharacter;
    this._story.getCharacterList().forEach(character => {
      const info = character.checkEvent(event);
      if (info) {
        characterInfo = info;
        character = character;
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
