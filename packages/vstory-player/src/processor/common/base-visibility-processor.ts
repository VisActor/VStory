import type { IGraphic } from '@visactor/vrender-core';

export abstract class BaseVisibility {
  protected getGraphics(graphic: IGraphic, cb: (graphic: IGraphic) => void) {
    if (graphic.isContainer) {
      graphic.forEachChildren((g: any) => {
        cb(g);
      });
    } else {
      cb(graphic);
    }
  }

  run(graphic: IGraphic, params: any, appear: boolean) {
    this.getGraphics(graphic, (g: IGraphic) => {
      this._run(g, params, appear);
    });
    return true;
  }

  setInitAttributes(graphic: IGraphic, params: any, appear: boolean) {
    this.getGraphics(graphic, (g: IGraphic) => {
      this._setInitAttributes(g, params, appear);
    });
  }

  protected abstract _setInitAttributes(graphic: IGraphic, params: any, appear: boolean): void;
  protected abstract _run(graphic: IGraphic, params: any, appear: boolean): void;
}
