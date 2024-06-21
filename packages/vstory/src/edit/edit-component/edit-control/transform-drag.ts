import type { IStage } from '@visactor/vrender';

export class DragComponent {
  private _state: 'startDrag' | 'dragging' | 'stopDrag' | 'none' = 'none';
  get state() {
    return this._state;
  }
  set state(state: 'startDrag' | 'dragging' | 'stopDrag' | 'none') {
    this._state = state;
  }

  private _lastPosX: number;
  private _lastPosY: number;
  // protected _container: HTMLElement;

  constructor(stage: IStage) {
    stage.addEventListener('pointermove', this.pointerMove, true);
    stage.addEventListener('pointerup', this.stopDrag, true);
  }

  protected _dragHandler: (moveX: number, moveY: number) => void;
  protected _dragEndHandler: () => void;
  protected _unDragEndHandler: () => void;

  pointerMove = (event: PointerEvent) => {
    if (!(this._state === 'startDrag' || this._state === 'dragging')) {
      return;
    }
    if (this._state !== 'dragging') {
      this._state = 'dragging';
    }
    this._dragHandler?.(event.clientX - this._lastPosX, event.clientY - this._lastPosY);
    this._lastPosX = event.clientX;
    this._lastPosY = event.clientY;
  };

  dragHandler(handler: (moveX: number, moveY: number) => void) {
    this._dragHandler = handler;
  }
  dragEndHandler(handler: () => void) {
    this._dragEndHandler = handler;
  }
  unDragEndHandler(handler: () => void) {
    this._unDragEndHandler = handler;
  }

  startDrag(event: PointerEvent) {
    this._state = 'startDrag';
    this._lastPosX = event.clientX;
    this._lastPosY = event.clientY;
  }

  stopDrag = (event: PointerEvent) => {
    if (this._state !== 'dragging' && this._state !== 'startDrag') {
      this._unDragEndHandler?.();
      return;
    }
    // const lastState = this._state;
    this._state = 'stopDrag';
    // if (lastState !== 'dragging') {
    //   return;
    // }
    this._state = 'stopDrag';
    this._dragEndHandler?.();
  };

  release() {
    window.removeEventListener('pointermove', this.pointerMove, true);
    window.removeEventListener('pointerup', this.stopDrag, true);
    this._dragHandler = null;
    this._dragEndHandler = null;
  }
}
