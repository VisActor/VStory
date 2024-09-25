/**
 * @description PopTip组件
 */
import type {
  ICircleGraphicAttribute,
  IPathGraphicAttribute,
  IGraphic,
  IGroupGraphicAttribute,
  IRect,
  IRectGraphicAttribute,
  ILineGraphicAttribute,
  IGroup,
  IGraphicAttribute
} from '@visactor/vrender';
import { createRect } from '@visactor/vrender';
import type { IAABBBounds, IAABBBoundsLike, IPointLike } from '@visactor/vutils';
import { AABBBounds, merge, normalizePadding, pi } from '@visactor/vutils';
import { AbstractComponent } from '@visactor/vrender-components';
import { transformPointWithMatrix } from '../../../util/space';
import { MinSize } from '../../../constants/attribute';
import { normalizeAngle } from '../../../util/math';
import { DRAG_ANCHOR_COLOR, SHAPE_SELECT_COLOR } from './constants';
import type { VRenderPointerEvent } from '../../../interface/type';
import type { IEditComponent } from '../../interface';
import { Edit } from '../../edit';
import { DragComponent } from './transform-drag';
import { StoryEvent } from '../../../story/interface';
import { transformDeltaWithStage, transformPointWithStage } from '../../../util/transform';
// import { EditorActionMode } from './enum';

type AnchorDirection = 'top' | 'bottom' | 'left-top' | 'left-bottom' | 'right' | 'left' | 'right-top' | 'right-bottom';

const fixedAngles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2, Math.PI * 2];
const maxAngleDifference = (3 / 180) * Math.PI; // 10 degrees

export type TransformAttributes = {
  padding?: number | [number, number, number, number];
  resizeBorder?: Partial<ILineGraphicAttribute>;
  cornerRect?: Partial<IRectGraphicAttribute>;
  rotateCircle?: Partial<ICircleGraphicAttribute>;
  rotatePath?: Partial<IPathGraphicAttribute> & { size: number };
  handlerLine?: Partial<ILineGraphicAttribute> & { size: number };
  shapeCircle?: Partial<ICircleGraphicAttribute>;
  move?: boolean;
  rotate?: boolean;
  resize?: boolean;
  reshape?: boolean;
  setCursor?: (c: string) => void;
  shapePoints?: IPointLike[];
  isShapePointAbsolute?: boolean;
  /**
   * 支持的锚点
   */
  enabledAnchors?: AnchorDirection[];
  // minSize
  minWidth?: number;
  minHeight?: number;
  proportionalScaling?: boolean;
} & IGroupGraphicAttribute;

export type IUpdateParams = {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  anchor: [number | string, number | string];
  // relative position of shape point
  shapePoints: IPointLike[];
  // text
  text?: string | string[];
};

const borderAnchors = ['top', 'bottom', 'left', 'right'];
const cornerAnchors = ['left-top', 'right-top', 'left-bottom', 'right-bottom'];

const anchorPositionMap: any = {
  top: [0, 0, 1, 0],
  bottom: [0, 1, 1, 1],
  left: [0, 0, 0, 1],
  right: [1, 0, 1, 1],

  'left-top': [0, 0],
  'right-top': [1, 0],
  'left-bottom': [0, 1],
  'right-bottom': [1, 1]
};

const anchorCursorMap: any = {
  'left-top': 'nwse-resize',
  top: 'ns-resize',
  'right-top': 'nesw-resize',
  left: 'ew-resize',
  right: 'ew-resize',
  'left-bottom': 'nesw-resize',
  bottom: 'ns-resize',
  'right-bottom': 'nwse-resize'
};

export interface ITransformControl extends IGroup {
  updateBoundsAndAngle: (b: IAABBBoundsLike, angle: number) => void;
  onActive: () => void;
  onUpdate: (cb: (data: IUpdateParams, event?: VRenderPointerEvent) => Partial<IUpdateParams> | false) => void;
  onEditorEnd: (cb: (event?: VRenderPointerEvent) => void) => void;
  onEditorStart: (cb: (event?: VRenderPointerEvent) => void) => void;
  onUnTransStart: (cb: (event: PointerEvent) => void) => void;
}

export class TransformControl extends AbstractComponent<Required<TransformAttributes>> implements ITransformControl {
  name = 'TransformControl';
  rectB: IAABBBounds;
  isDragging: boolean = false;
  dragOffsetX: number;
  dragOffsetY: number;
  dragStartAngle: number = 0;
  activeGraphic: IGraphic | null;
  horizontalResizble: number;
  verticalResizble: number;
  rotatable: number;
  reshapeState: number;
  rect: IRect;
  editBorder: IRect;
  // state: {
  //   actionMode: EditorActionMode;
  // };
  // 是否正在执行addChildUpdateBoundTag，避免循环调用
  runningAddChildUpdateBoundTag: boolean;

  updateCbs: Array<(data: IUpdateParams, event?: VRenderPointerEvent) => Partial<IUpdateParams> | false>;
  endEditCbs: Array<(event?: VRenderPointerEvent) => void>;
  editStartCbs: Array<(event?: VRenderPointerEvent) => void>;
  unTransStartCbs: Array<(event: PointerEvent) => void>;

  isEditor: boolean = false;

  _editorConfig: {
    move: boolean;
    rotate: boolean;
    resize: boolean;
    reshape: boolean;
  };

  minSize: { width: number; height: number } = { width: MinSize, height: MinSize };

  proportionalScaling: boolean = false;
  // 缩放前的属性
  _rectBeforeScale: IRectGraphicAttribute;
  // 缩放前的点击位置，用来进行等比缩放处理缩放比
  _eventPosBeforeScale: any;

  _setCursor: (c: string) => void = null;

  editComponent: IEditComponent;

  // drag
  _dragger: DragComponent;
  private _lastBoxInDrag: IRect;

  static defaultAttributes: Partial<TransformAttributes> = {
    // 去掉padding
    // padding: 2,
    resizeBorder: {
      stroke: SHAPE_SELECT_COLOR,
      lineWidth: 1
    },
    cornerRect: {
      fill: 'white',
      stroke: SHAPE_SELECT_COLOR,
      lineWidth: 1,
      width: 8,
      height: 8,
      cornerRadius: 2
    },
    rotateCircle: {
      fill: 'white',
      stroke: SHAPE_SELECT_COLOR,
      radius: 10
    },
    rotatePath: {
      fill: '#000000',
      size: 12,
      angle: Math.PI,
      // eslint-disable-next-line
      path: 'M202.403,95.22c0,46.312-33.237,85.002-77.109,93.484v25.663l-69.76-40l69.76-40v23.494 c27.176-7.87,47.109-32.964,47.109-62.642c0-35.962-29.258-65.22-65.22-65.22s-65.22,29.258-65.22,65.22 c0,9.686,2.068,19.001,6.148,27.688l-27.154,12.754c-5.968-12.707-8.994-26.313-8.994-40.441C11.964,42.716,54.68,0,107.184,0 S202.403,42.716,202.403,95.22z'
    },
    handlerLine: {
      stroke: SHAPE_SELECT_COLOR,
      lineWidth: 1,
      size: 24
    },
    shapeCircle: {
      fill: 'white',
      lineWidth: 1,
      radius: 4,
      stroke: DRAG_ANCHOR_COLOR,
      startAngle: 0,
      endAngle: Math.PI * 2
    }
  };

  constructor(editComponent: IEditComponent, attributes: Partial<TransformAttributes>) {
    super(merge({ shadowRootIdx: 1 }, TransformControl.defaultAttributes, attributes));
    this.editComponent = editComponent;
    this._editorConfig = {
      move: attributes.move !== false,
      rotate: attributes.rotate !== false,
      resize: attributes.resize !== false,
      reshape: attributes.reshape !== false
    };
    // this.state = {
    //   actionMode: EditorActionMode.addTool
    // };
    this.rectB = new AABBBounds();
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.activeGraphic = null;
    this.horizontalResizble = 0;
    this.verticalResizble = 0;
    this.rotatable = 0;
    this.runningAddChildUpdateBoundTag = false;
    this.minSize.width = attributes.minWidth ?? MinSize;
    this.minSize.height = attributes.minHeight ?? MinSize;
    this.proportionalScaling = attributes.proportionalScaling === true;
    this._setCursor = attributes.setCursor;
    this.rect = createRect({
      fill: 'transparent',
      stroke: false,
      pickable: false
    });
    // this.rect.attachShadow();
    this.editBorder = createRect({
      fill: false,
      stroke: false
    });
    this.editBorder.attachShadow();
    this.add(this.rect);
    this.add(this.editBorder);
    this.editStartCbs = [];
    this.unTransStartCbs = [];
    this.updateCbs = [];
    this.endEditCbs = [];
  }

  addDrag() {
    if (!this.stage) {
      return;
    }
    this._dragger = new DragComponent(this.stage);
    this._dragger.dragHandler(this._dragElement);
    this._dragger.dragEndHandler(this._dragEnd);
    this._dragger.unDragEndHandler(this._unDragEnd);
    this._lastBoxInDrag = createRect({
      pickable: false,
      stroke: SHAPE_SELECT_COLOR,
      strokeOpacity: 0.4,
      visible: false
    });
  }

  protected _dragElement = (moveX: number, moveY: number) => {
    const stage = this.stage;
    if (!stage) {
      return;
    }
    this._lastBoxInDrag.setAttribute('visible', true);

    const layer = stage.defaultLayer;
    const p = transformDeltaWithStage(stage, { x: moveX, y: moveY }, layer.globalTransMatrix);
    this.moveBy(p.x, p.y);
  };
  private _dragEnd = () => {
    this._editorEnd();
  };
  private _unDragEnd = () => {
    this._editorEnd();
  };

  protected _editorEnd = () => {
    // this._endHandler(this._editorBox.getTransformAttribute());
    // this._editorBox.isEditor = false;
    // this._snapLineX.setAttributes({ visible: false });
    // this._snapLineY.setAttributes({ visible: false });

    // this._snapTargetBoxX.setAttributes({ visible: false });
    // this._snapTargetBoxY.setAttributes({ visible: false });

    this._lastBoxInDrag.setAttribute('visible', false);
    // this._opt.editorEvent.setCursorSyncToTriggerLayer();
  };

  updateBoundsAndAngle(bounds: IAABBBoundsLike, angle: number) {
    // set bounds
    this.rect.setAttributes({
      x: bounds.x1,
      y: bounds.y1,
      width: bounds.x2 - bounds.x1,
      height: bounds.y2 - bounds.y1
    });

    // set anchor
    const x = (this.attribute.x ?? 0) + (bounds.x1 + bounds.x2) / 2;
    const y = (this.attribute.y ?? 0) + (bounds.y1 + bounds.y2) / 2;
    this.setAttributes({ anchor: [x, y], angle });
  }

  onActive() {
    this.initEvent();
  }

  initEvent() {
    // cursor
    this.editBorder.addEventListener('mousemove', this.handleMouseMove);
    this.addEventListener('pointerout', this.handleMouseOut);

    // drag
    this.addEventListener('pointerdown', this.handleDragMouseDown);
    this.addDrag();

    this.stage.addEventListener('pointermove', this.handleDragMouseMove);
    this.stage.addEventListener('pointerup', this.handleDragMouseUp);
  }

  protected handleMouseMove = (e: any) => {
    if (e.pickParams) {
      const { shadowTarget } = e.pickParams;
      this.setCursor(shadowTarget.attribute.cursor);
    } else {
      this.setCursor();
    }
  };

  protected handleMouseOut = (e: any) => {
    this.setCursor();
  };

  protected handleDragMouseDown = (e: any) => {
    this.isEditor = true;
    this.editStartCbs.forEach(cb => cb(e));
    const layerPos = this.transformPoint(e.offset);
    if (!layerPos) {
      return;
    }

    this.dragOffsetX = layerPos.x;
    this.dragOffsetY = layerPos.y;

    const { shadowTarget } = e.pickParams || {};
    // 开启move
    if (shadowTarget && this.stage) {
      this.setActiveGraphic(shadowTarget);
      this._rectBeforeScale = { ...this.rect.attribute };
      this._eventPosBeforeScale = layerPos;
      this.isDragging = true;
      this.dragStartAngle = this.attribute.angle ?? 0;
    } else {
      this.unTransStartCbs.forEach(cb => cb(e));
      this._dragger.startDrag(e);
    }
  };

  protected handleDragMouseMove = (e: any) => {
    if (!this.isDragging) {
      return;
    }
    const layerPos = this.transformPoint(e.offset);
    if (!layerPos) {
      return;
    }

    const dx = layerPos.x - this.dragOffsetX;
    const dy = layerPos.y - this.dragOffsetY;

    if (dx === 0 && dy === 0) {
      return;
    }

    if (this.rotatable) {
      this.handleRotate(layerPos);
      this.dispatchUpdate(e);
    } else if (this.reshapeState) {
      this._handleReshape(dx, dy);
      this.dispatchUpdate(e);
    } else {
      this._handleScale(dx, dy, e);
      this.dispatchUpdate(e);
    }

    this.dragOffsetX = layerPos.x;
    this.dragOffsetY = layerPos.y;
  };

  protected handleDragMouseUp = (e: any) => {
    if (!this.isDragging) {
      return;
    }
    // this._editComponent.isEditing = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.setActiveGraphic(null);
    this.endEditCbs?.forEach(cb => cb(e));
    this.isEditor = false;
    this.isDragging = false;
  };

  protected setCursor(c?: string) {
    if (this.stage) {
      this.stage.setCursor(c);
      this._setCursor?.(c);
    }
  }

  protected setActiveGraphic(g: IGraphic | null) {
    this.activeGraphic = g;
    // 设置resize的方向
    let reset = true;
    if (g && g.name) {
      reset = false;
      const name = g.name;
      const dirList = name.split('-');
      const type = dirList.shift();
      if (type === 'scale') {
        if (dirList.length === 2) {
          this.horizontalResizble = dirList[0] === 'left' ? -1 : 1;
          this.verticalResizble = dirList[1] === 'top' ? -1 : 1;
        } else {
          const dir = dirList[0];
          const h = dir === 'left' || dir === 'right';
          this.horizontalResizble = h ? (dirList[0] === 'left' ? -1 : 1) : 0;
          this.verticalResizble = h ? 0 : dirList[0] === 'top' ? -1 : 1;
        }
        this.rotatable = 0;
      } else if (type === 'rotate') {
        this.rotatable = 1;
        this.horizontalResizble = 0;
        this.verticalResizble = 0;
      } else if (type === 'reshape') {
        this.reshapeState = Number.parseInt(dirList[0], 10) + 1;
        this.rotatable = 0;
        this.horizontalResizble = 0;
        this.verticalResizble = 0;
      } else {
        reset = true;
      }
    }
    if (reset) {
      this.horizontalResizble = 0;
      this.verticalResizble = 0;
      this.rotatable = 0;
      this.reshapeState = 0;
    }
  }

  // 非等比缩放
  protected handleScale(dx: number, dy: number) {
    const { anchor, x, y, width, height } = this._getRectWithOffset(dx, dy, this.rect.attribute).attribute;
    if (width < this.minSize.width) {
      return;
    }
    if (height < this.minSize.height) {
      return;
    }
    this.rect.setAttributes({
      width,
      height,
      x,
      y
    });
    this.setAttributes({
      anchor: anchor as [number | string, number | string]
    });
  }

  // 缩放
  private _handleScale(dx: number, dy: number, e: any) {
    if (this.proportionalScaling) {
      this._handleScaleProportional(dx, dy, e);
    } else {
      this.handleScale(dx, dy);
    }
  }

  private transformPoint(point: IPointLike) {
    const stage = this.stage;
    if (!stage) {
      return;
    }
    // this._editComponent.isEditing = true;
    return transformPointWithStage(stage, point, this.layer.globalTransMatrix);
  }

  // 等比缩放
  private _handleScaleProportional(dx: number, dy: number, e: any) {
    const layerPos = this.transformPoint(e.offset);
    if (!layerPos) {
      return;
    }
    const { attribute, temp } = this._getRectWithOffset(
      layerPos.x - this._eventPosBeforeScale.x,
      layerPos.y - this._eventPosBeforeScale.y,
      this._rectBeforeScale
    );

    const maxScale = Math.max(
      attribute.width / this._rectBeforeScale.width,
      attribute.height / this._rectBeforeScale.height
    );
    const finalWidth = this._rectBeforeScale.width * maxScale;
    const finalHeight = this._rectBeforeScale.height * maxScale;
    if (finalWidth < this.minSize.width) {
      return;
    }
    if (finalHeight < this.minSize.height) {
      return;
    }
    let nextP2 = temp.nextP2;
    const nextP1 = temp.nextP1;

    const angle = this.getAngle();
    // console.log('_handleScaleProportional', nextP1, nextP2, angle, this.verticalResizble, this.horizontalResizble);

    // v 1 h 1
    // 拖动的右下角 不需要改变
    if (this.verticalResizble > 0 && this.horizontalResizble > 0) {
      nextP2 = this._getRectP2(nextP1, { width: finalWidth, height: finalHeight }, angle);
    }
    // 1 h -1
    // 拖动的左下角 以右上角为基准
    else if (this.verticalResizble > 0 && this.horizontalResizble < 0) {
      const lockPos = {
        // 锁定角位置
        x: nextP1.x + attribute.width * Math.cos(angle),
        y: nextP1.y + attribute.width * Math.sin(angle)
      };
      // final下的 p1 与 p2
      nextP1.x = lockPos.x - finalWidth * Math.cos(angle);
      nextP1.y = lockPos.y - finalWidth * Math.sin(angle);
      nextP2 = this._getRectP2(nextP1, { width: finalWidth, height: finalHeight }, angle);
    }
    // -1 h 1
    // 拖动的右上角 以左下角为基准
    if (this.verticalResizble < 0 && this.horizontalResizble > 0) {
      const lockPos = {
        // 锁定角位置
        x: nextP1.x - attribute.height * Math.sin(angle),
        y: nextP1.y + attribute.height * Math.cos(angle)
      };
      // final下的 p1 与 p2
      (nextP1.x = lockPos.x + finalHeight * Math.sin(angle)), (nextP1.y = lockPos.y - finalHeight * Math.cos(angle));
      nextP2 = this._getRectP2(nextP1, { width: finalWidth, height: finalHeight }, angle);
    }
    // -1 h 1
    // 拖动的左上角 以右下角为基准
    if (this.verticalResizble < 0 && this.horizontalResizble < 0) {
      // p2 锁定 ，计算 p1
      nextP1.x = nextP2.x - Math.cos(angle) * finalWidth + Math.sin(angle) * finalHeight;
      nextP1.y = nextP2.y - Math.sin(angle) * finalWidth - Math.cos(angle) * finalHeight;
    }

    const center = {
      x: (nextP1.x + nextP2.x) / 2,
      y: (nextP1.y + nextP2.y) / 2
    };
    this.rect.setAttributes({
      width: finalWidth,
      height: finalHeight,
      x: center.x - finalWidth / 2,
      y: center.y - finalHeight / 2
    });
    this.setAttributes({
      anchor: [center.x, center.y]
    });
  }

  private _handleReshape(dx: number, dy: number) {
    const { width, height } = this.rect.attribute;
    const { shapePoints } = this.attribute;
    const angle = this.getAngle();
    const _dx = dx;
    const _dy = dy;
    dx = Math.cos(angle) * _dx + Math.sin(angle) * _dy;
    dy = Math.cos(angle + pi / 2) * _dx + Math.sin(angle + pi / 2) * _dy;
    if (!this.attribute.isShapePointAbsolute) {
      dx /= width;
      dy /= height;
    }
    const nextShapePoints = shapePoints.map((shapePoint, i) => {
      return i + 1 === this.reshapeState ? { x: shapePoint.x + dx, y: shapePoint.y + dy } : shapePoint;
    });
    this.setAttributes({
      shapePoints: nextShapePoints
    });
  }

  private _getRectWithOffset(dx: number, dy: number, lastAttribute: IRectGraphicAttribute) {
    // 投影得到旋转前的dx和dy
    const angle = this.getAngle();
    const _dx = dx;
    const _dy = dy;
    dx = Math.cos(angle) * _dx + Math.sin(angle) * _dy;
    dy = Math.cos(angle + pi / 2) * _dx + Math.sin(angle + pi / 2) * _dy;

    dx *= this.horizontalResizble;
    dy *= this.verticalResizble;

    const { x, y, width, height } = lastAttribute;

    const m = this.transMatrix;
    // 原始的x和y位置
    const nextP1 = {
      x: m.a * x + m.c * y + m.e,
      y: m.b * x + m.d * y + m.f
    };
    const nextP2 = {
      x: m.a * (x + width) + m.c * (y + height) + m.e,
      y: m.b * (x + width) + m.d * (y + height) + m.f
    };
    if (this.horizontalResizble < 0) {
      nextP1.x -= Math.cos(angle) * dx;
      nextP1.y -= Math.sin(angle) * dx;
    } else if (this.horizontalResizble > 0) {
      nextP2.x += Math.cos(angle) * dx;
      nextP2.y += Math.sin(angle) * dx;
    }

    if (this.verticalResizble < 0) {
      nextP1.x -= Math.cos(angle + pi / 2) * dy;
      nextP1.y -= Math.sin(angle + pi / 2) * dy;
    } else if (this.verticalResizble > 0) {
      nextP2.x += Math.cos(angle + pi / 2) * dy;
      nextP2.y += Math.sin(angle + pi / 2) * dy;
    }

    const center = {
      x: (nextP1.x + nextP2.x) / 2,
      y: (nextP1.y + nextP2.y) / 2
    };

    const tw = width + dx;
    const th = height + dy;

    // 返回属性计算结果+当前计算过程的重要变量
    return {
      attribute: {
        width: tw,
        height: th,
        x: center.x - tw / 2,
        y: center.y - th / 2,
        anchor: [center.x, center.y]
      },
      temp: {
        nextP1,
        nextP2,
        dx,
        dy
      }
    };
  }

  private _getRectP2(p1: { x: number; y: number }, size: { width: number; height: number }, angle: number) {
    return {
      x: p1.x + Math.cos(angle) * size.width - Math.sin(angle) * size.height,
      y: p1.y + Math.sin(angle) * size.width + Math.cos(angle) * size.height
    };
  }

  protected handleRotate(currentPoint: { x: number; y: number }) {
    const originB = this.rectB;
    const cx = (originB.x1 + originB.x2) / 2;
    const cy = (originB.y1 + originB.y2) / 2;

    const vectorDrag = { x: this._eventPosBeforeScale.x - cx, y: this._eventPosBeforeScale.y - cy };
    const vectorCurrent = { x: currentPoint.x - cx, y: currentPoint.y - cy };
    const dot = vectorDrag.x * vectorCurrent.x + vectorDrag.y * vectorCurrent.y;
    const modDrag = Math.sqrt(vectorDrag.x ** 2 + vectorDrag.y ** 2);
    const modCurrent = Math.sqrt(vectorCurrent.x ** 2 + vectorCurrent.y ** 2);
    const cosAngle = dot / (modDrag * modCurrent);
    const cross = vectorDrag.x * vectorCurrent.y - vectorDrag.y * vectorCurrent.x;
    const delta = cross < 0 ? Math.PI * 2 - Math.acos(cosAngle) : Math.acos(cosAngle);

    this.setAttributes({
      angle: this.fixAngle(this.dragStartAngle + delta),
      anchor: [cx, cy]
    });
  }

  private fixAngle(angle: number) {
    angle = normalizeAngle(angle);
    for (const fixedAngle of fixedAngles) {
      if (angle >= fixedAngle - maxAngleDifference && angle <= fixedAngle + maxAngleDifference) {
        return fixedAngle;
      }
    }
    return angle;
  }

  getAngle(): number {
    if (!this.attribute.postMatrix) {
      return this.attribute.angle ?? 0;
    }
    const m = this.transMatrix;
    return Math.atan2(m.b, m.a);
  }

  protected render() {
    const {
      resizeBorder,
      padding,
      cornerRect,
      rotateCircle,
      rotatePath,
      handlerLine,
      shapeCircle,
      enabledAnchors = ['top', 'bottom', 'left-top', 'left-bottom', 'right', 'left', 'right-top', 'right-bottom'],
      shapePoints = [],
      isShapePointAbsolute
    } = this.attribute as TransformAttributes;

    const root = this.editBorder.shadowRoot;
    if (!root || this.count === 1) {
      return;
    }

    const parsedPadding = normalizePadding(padding as any);
    const { x = 0, y = 0, width: w = 0, height: h = 0 } = this.rect.attribute;
    this.rectB.setValue(x, y, x + w, y + h);

    const minX = x - parsedPadding[3];
    const minY = y - parsedPadding[0];
    const width = w + parsedPadding[1] + parsedPadding[3];
    const height = h + parsedPadding[0] + parsedPadding[2];

    borderAnchors.forEach((anchor, i) => {
      const enableResize = this._editorConfig.resize && enabledAnchors.includes(anchor as AnchorDirection);
      const item = anchorPositionMap[anchor];
      const cursor = enableResize ? anchorCursorMap[anchor] : 'default';
      root.createOrUpdateChild(
        enableResize ? `scale-${anchor}` : `stroke-line-${anchor}`,
        {
          x: minX,
          y: minY,
          points: [
            { x: item[0] * width, y: item[1] * height },
            { x: item[2] * width, y: item[3] * height }
          ],
          cursor,
          ...resizeBorder
        },
        'line'
      );
    });

    if (this._editorConfig.rotate) {
      // 添加顶部
      root.createOrUpdateChild(
        'top-handler-line',
        {
          x: minX + width / 2,
          y: minY,
          points: [
            { x: 0, y: 0 },
            { x: 0, y: -handlerLine.size }
          ],
          ...handlerLine
        },
        'line'
      );
      root.createOrUpdateChild(
        `rotate-all`,
        {
          x: minX + width / 2,
          y: minY - handlerLine.size - rotateCircle.radius,
          cursor: 'grab',
          ...rotateCircle
        },
        'circle'
      );
      root.createOrUpdateChild(
        `path-rotate`,
        {
          pickable: false,
          x: minX + width / 2 + rotatePath.size / 2,
          y: minY - handlerLine.size + rotatePath.size / 2 - rotateCircle.radius,
          scaleX: rotatePath.size / 200,
          scaleY: rotatePath.size / 200,
          cursor: 'grab',
          dx: 0.5,
          dy: -0.5,
          ...rotatePath
        },
        'path'
      );
    }

    // 添加锚点
    if (this._editorConfig.resize) {
      enabledAnchors.forEach((anchor: string) => {
        if (!cornerAnchors.includes(anchor)) {
          return;
        }
        const item = anchorPositionMap[anchor];
        const cursor = anchorCursorMap[anchor];
        root.createOrUpdateChild(
          `scale-${anchor}`,
          {
            x: minX + item[0] * width - cornerRect.width! / 2,
            y: minY + item[1] * height - cornerRect.height! / 2,
            cursor,
            ...cornerRect
          },
          'rect'
        );
      });
    }

    if (this._editorConfig.reshape) {
      const shapePointsChildren = root.children.filter((child: any) => child.name.startsWith('reshape'));
      if (shapePointsChildren.length !== shapePoints.length) {
        shapePointsChildren.forEach((child: any) => root.removeChild(child));
      }
      shapePoints.forEach((point, i) => {
        root.createOrUpdateChild(
          `reshape-${i}`,
          {
            x: isShapePointAbsolute ? point.x : point.x * w + x,
            y: isShapePointAbsolute ? point.y : point.y * h + y,
            cursor: 'move',
            ...shapeCircle
          },
          'circle'
        );
      });
    }
  }

  moveBy(dx: number, dy: number): this {
    const { x, y, width, height } = this.rect.attribute;
    this.rect.setAttributes({
      width: width,
      height: height,
      x: x + dx,
      y: y + dy
    });
    this.setAttributes({
      anchor: [x + dx + width / 2, y + dy + height / 2]
    });
    this.dispatchUpdate();
    return this;
  }

  dispatchUpdate(e?: any) {
    const out = this.getTransformAttribute();
    this.updateCbs.forEach(cb => {
      const data = cb(out, e);
      if (data) {
        const { x, y, width, height, anchor, angle, shapePoints } = data;
        Number.isFinite(x) && this.rect.setAttribute('x', x);
        Number.isFinite(y) && this.rect.setAttribute('y', y);
        Number.isFinite(width) && this.rect.setAttribute('width', width);
        Number.isFinite(height) && this.rect.setAttribute('height', height);
        anchor && this.setAttribute('anchor', anchor);
        Number.isFinite(angle) && this.setAttribute('angle', angle);
        shapePoints && this.setAttribute('shapePoints', shapePoints);
      }
    });
  }

  onUpdate(cb: (data: IUpdateParams, event?: VRenderPointerEvent) => Partial<IUpdateParams> | false) {
    this.updateCbs.push(cb);
  }

  onEditorEnd(cb: (event?: VRenderPointerEvent) => void) {
    this.endEditCbs.push(cb);
  }
  onEditorStart(cb: (event?: VRenderPointerEvent) => void) {
    this.editStartCbs.push(cb);
  }
  onUnTransStart(cb: (event: PointerEvent) => void) {
    this.unTransStartCbs.push(cb);
  }

  addChildUpdateBoundTag() {
    super.addChildUpdateBoundTag();

    // 如果wrap内的内容bounds变化，那就需要重新调用render
    if (this.runningAddChildUpdateBoundTag) {
      return;
    }
    this.runningAddChildUpdateBoundTag = true;

    this.render();

    this.runningAddChildUpdateBoundTag = false;
  }

  getTransformAttribute() {
    const { x, y, width, height } = this.rect.attribute;
    const { angle, anchor, shapePoints } = this.attribute;
    return {
      x,
      y,
      width,
      height,
      angle,
      anchor,
      shapePoints
    };
  }

  releaseEvent() {
    this.editBorder.removeEventListener('mousemove', this.handleMouseMove);
    if (this.stage) {
      this.stage.removeEventListener('pointermove', this.handleDragMouseMove);
      this.stage.removeEventListener('pointerup', this.handleDragMouseUp);
    }
    this.removeEventListener('pointerout', this.handleMouseOut);
    this.removeEventListener('pointerdown', this.handleDragMouseDown);
  }

  releaseDragger() {
    if (!this._dragger) {
      return;
    }
    this._dragger.release();
  }

  private _isRelease = false;
  release(): void {
    this._isRelease = true;
    // event
    this.releaseEvent();

    this.parent.removeChild(this);
    this.editBorder = null;
    this.updateCbs = [];
    this.endEditCbs = [];
    this.unTransStartCbs = [];
    super.release();
  }
}
