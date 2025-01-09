import type { IStage } from '@visactor/vrender';

export class DragComponent {
  private _state: 'startDrag' | 'dragging' | 'stopDrag' | 'none' = 'none';
  private _pausing = false;
  get state() {
    return this._state;
  }
  set state(state: 'startDrag' | 'dragging' | 'stopDrag' | 'none') {
    this._state = state;
  }

  private _lastPosX: number;
  private _lastPosY: number;
  private _stage: IStage;
  // protected _container: HTMLElement;

  constructor(stage: IStage) {
    this._stage = stage;
    stage.addEventListener('pointermove', this.pointerMove, true);
    stage.addEventListener('pointerup', this.stopDrag, true);
  }

  protected _dragHandler: (moveX: number, moveY: number) => void;
  protected _dragEndHandler: () => void;
  protected _unDragEndHandler: () => void;

  pointerMove = (event: any) => {
    if (this._pausing) {
      return;
    }
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

  pauseDrag() {
    this._pausing = true;
  }
  resumeDrag() {
    this._pausing = false;
  }

  startDrag(event: any) {
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
    if (this._stage) {
      this._stage.removeEventListener('pointermove', this.pointerMove, true);
      this._stage.removeEventListener('pointerup', this.stopDrag, true);
      this._stage = null;
    }
    this._dragHandler = null;
    this._dragEndHandler = null;
  }
}
