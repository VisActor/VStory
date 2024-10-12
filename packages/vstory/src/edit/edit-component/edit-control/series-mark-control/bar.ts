import { Bounds, type IPointLike } from '@visactor/vutils';
import type { IGroup, IGroupGraphicAttribute, IRect, IRectGraphicAttribute } from '@visactor/vrender-core';
import { createGroup, createRect } from '@visactor/vrender-core';
import { EditEditingState, MaxAxisPaddingOuter, PickGraphicAttribute } from '../../../const';
import type { Edit } from '../../../edit';
import type { IEditSelectionInfo } from '../../../interface';
import { BaseMarkControl } from './base';
import { SHAPE_HOVER_COLOR } from '../constants';
import type { ICartesianSeries } from '@visactor/vchart';
import { getChartRenderMatrix, getVChartFromCharacter } from '../../../utils/chart';
import type { BandScale } from '@visactor/vscale';
import { transformPointWithMatrix } from '../../../utils/space';
import type { StoryEvent } from '../../../../story/interface';
import { computeScalePadding } from '../../../utils/scale';

const handlerSize = 9;
const handlerLength = 40;
const handlerLengthMaxPercent = 0.6;

const defaultHandleAttribute: IRectGraphicAttribute = {
  visible: true,
  pickable: false,
  cornerRadius: 10,
  fill: SHAPE_HOVER_COLOR,
  x: 0,
  y: 50
};

const defaultEditGroupAttribute: IGroupGraphicAttribute = {
  pickable: true,
  visible: true,
  zIndex: 10,
  boundsPadding: 4,
  x: 0,
  y: 0,
  height: 100
};

export class BarMarkControl extends BaseMarkControl {
  private _startGroup: IGroup;
  private _endGroup: IGroup;
  private _startHandle: IRect;
  private _endHandle: IRect;
  private _barBorder: IRect;

  private _dragInfo: {
    startPos: IPointLike;
    series: any;
    axis: any;
    fields: string[];
    rawScale: BandScale[];
    tempScale: BandScale[];
    handle: 'start' | 'end';
    currentPadding: number;
    hasChange: boolean;
  } = {
    startPos: { x: 0, y: 0 },
    series: null,
    axis: null,
    fields: [],
    rawScale: [],
    tempScale: [],
    handle: 'start',
    currentPadding: 0,
    hasChange: false
  };

  private _editState: 'over' | 'start' | 'dragging' | 'none' = 'none';

  private _currentEditorData: any;
  private _currentEditorDimensionField: string;
  private _currentEditorDimensionValue: string;

  constructor(edit: Edit) {
    super(edit);
    this._initEditGraphic();
  }

  private _initEditGraphic() {
    // border
    this._barBorder = createRect({
      ...PickGraphicAttribute,
      visible: false
    });
    this._graphicGroup.add(this._barBorder);

    this._startGroup = createGroup({ ...defaultEditGroupAttribute });
    this._startHandle = createRect({
      ...defaultHandleAttribute
    });
    this._graphicGroup.add(this._startGroup);
    this._startGroup.add(this._startHandle);
    this._endGroup = createGroup({ ...defaultEditGroupAttribute });
    this._endHandle = createRect({
      ...defaultHandleAttribute
    });
    this._graphicGroup.add(this._endGroup);
    this._endGroup.add(this._endHandle);

    [this._startGroup, this._endGroup].forEach(h => {
      h.addEventListener('pointerdown', (e: StoryEvent) => {
        this._onResizeStart(h, e);
      });

      h.addEventListener('pointerover', (e: StoryEvent) => {
        this._showHandleGraphic();
      });
      h.addEventListener('pointerout', (e: StoryEvent) => {
        if (this._editState === 'dragging') {
          return;
        }
        this._hideHandleGraphic();
        this._hideBorderGraphic();
      });
    });
  }

  startWithActionInfo(actionInfo: IEditSelectionInfo) {
    super.startWithActionInfo(actionInfo);
    // 设置绘图变换矩阵
    // const matrix = getChartRenderMatrix(actionInfo.character.graphic.graphic);
    const chart = actionInfo.character.graphic.graphic;
    const matrix = chart.transMatrix.clone();
    this._graphicGroup.setAttributes({ postMatrix: matrix });

    this._setCurrentEditData(actionInfo);
    this._setEditGraphic();
  }

  private _setEditGraphic() {
    this._setBorderAttribute();
    this._setHandleAttribute();

    this._graphicGroup.setAttribute('visible', true);
    this._graphicGroup.showAll();
    this._hideBorderGraphic();
  }

  private _setBorderAttribute() {
    const currentEditorElements = this._getAllElementInDimension();
    if (currentEditorElements.length) {
      // const matrix = getChartToGlobalMatrix(this._actionInfo.character as CharacterChart, this.edit);
      // 重新设置border属性
      const bounds = new Bounds();
      currentEditorElements.forEach(e => {
        bounds.union(e.graphicItem.globalAABBBounds);
      });
      // bounds = transformBoundsWithMatrix(matrix, bounds) as unknown as Bounds;
      this._barBorder.setAttributes({
        x: bounds.x1,
        x1: bounds.x2,
        y: bounds.y1,
        y1: bounds.y2
      });
    }
  }

  private _setHandleAttribute() {
    const pickGraphic = this._barBorder;
    const currentDirection = this._actionInfo.detail.modelInfo.model.direction;
    const sizeH = pickGraphic.attribute.height ?? pickGraphic.attribute.y1 - pickGraphic.attribute.y;
    const sizeW = pickGraphic.attribute.width ?? pickGraphic.attribute.x1 - pickGraphic.attribute.x;
    if (currentDirection === 'vertical') {
      const handlerLengthTemp = Math.min(handlerLength, Math.abs(sizeH * handlerLengthMaxPercent));
      this._startGroup.setAttributes({
        x: pickGraphic.attribute.x - handlerSize * 0.5,
        y: pickGraphic.attribute.y,
        height: sizeH,
        width: handlerSize,
        cursor: 'col-resize'
      });
      this._startHandle.setAttributes({
        y: sizeH / 2 - handlerLengthTemp / 2,
        x: 0,
        width: handlerSize,
        height: handlerLengthTemp
      });
      this._endGroup.setAttributes({
        x: pickGraphic.attribute.x + sizeW - handlerSize * 0.5,
        y: pickGraphic.attribute.y,
        height: sizeH,
        width: handlerSize,
        cursor: 'col-resize'
      });
      this._endHandle.setAttributes({
        y: sizeH / 2 - handlerLengthTemp / 2,
        x: 0,
        width: handlerSize,
        height: handlerLengthTemp
      });
    } else {
      const handlerLengthTemp = Math.min(handlerLength, Math.abs(sizeW * handlerLengthMaxPercent));
      this._startGroup.setAttributes({
        x: pickGraphic.attribute.x,
        y: pickGraphic.attribute.y - handlerSize * 0.5,
        width: sizeW,
        height: handlerSize,
        cursor: 'row-resize'
      });
      this._startHandle.setAttributes({
        x: sizeW / 2 - handlerLengthTemp / 2,
        y: 0,
        width: handlerLengthTemp,
        height: handlerSize
      });
      this._endGroup.setAttributes({
        x: pickGraphic.attribute.x,
        y: pickGraphic.attribute.y + sizeH - handlerSize * 0.5,
        width: sizeW,
        height: handlerSize,
        cursor: 'row-resize'
      });
      this._endHandle.setAttributes({
        x: sizeW / 2 - handlerLengthTemp / 2,
        y: 0,
        width: handlerLengthTemp,
        height: handlerSize
      });
    }
  }

  onMarkPointOver(actionInfo: IEditSelectionInfo) {
    super.onMarkPointOver(actionInfo);
    this._setCurrentEditData(actionInfo);
    this._setEditGraphic();
  }

  onMarkPointOut(actionInfo: IEditSelectionInfo) {
    super.onMarkPointOut(actionInfo);
    this._hideBorderGraphic();
    this._hideHandleGraphic();
  }

  private _setCurrentEditData(actionInfo: IEditSelectionInfo) {
    this._currentEditorData = actionInfo.detail.modelInfo.datum[0];
    this._currentEditorDimensionField = this._actionInfo.detail.modelInfo.model.getDimensionField()[0];
    this._currentEditorDimensionValue = this._currentEditorData[this._currentEditorDimensionField];
  }

  private _showHandleGraphic() {
    this._startHandle.setAttributes({ visible: true });
    this._endHandle.setAttributes({ visible: true });
  }

  private _hideHandleGraphic() {
    if (this._editState === 'dragging') {
      return;
    }
    this._startHandle.setAttributes({ visible: false });
    this._endHandle.setAttributes({ visible: false });
  }

  private _hideBorderGraphic() {
    if (this._editState === 'dragging') {
      return;
    }
    this._barBorder.setAttributes({ visible: false });
  }

  private _onResizeStart(h: IGroup, e: StoryEvent) {
    // 当前选择数据已不存在
    if (!this._actionInfo) {
      return;
    }
    const series = this._actionInfo.detail.modelInfo.model as ICartesianSeries;
    const vchart = getVChartFromCharacter(this._actionInfo.character);
    const axis = vchart
      .getChart()
      .getAllComponents()
      .find(c => {
        if (c.specKey !== 'axes') {
          return false;
        }
        if (c.type !== 'cartesianAxis-band') {
          return false;
        }
        if (
          series.direction === 'vertical' &&
          // @ts-ignore
          c.layoutOrient !== 'top' &&
          // @ts-ignore
          c.layoutOrient !== 'bottom'
        ) {
          return false;
        }
        if (
          series.direction === 'horizontal' &&
          // @ts-ignore
          c.layoutOrient !== 'left' &&
          // @ts-ignore
          c.layoutOrient !== 'right'
        ) {
          return false;
        }
        return true;
      });
    if (!axis) {
      return;
    }
    this._barBorder.setAttributes({ visible: true });
    this._editState = 'dragging';
    this.edit.setEditGlobalState(EditEditingState.continuingEditing, true);
    // drag 使用的临时数据
    // @ts-ignore
    this._dragInfo.handle = h === this._startGroup ? 'start' : 'end';
    const layerPos = transformPointWithMatrix(this._graphicGroup.globalTransMatrix, e.canvas);
    this._dragInfo.startPos.x = layerPos.x;
    this._dragInfo.startPos.y = layerPos.y;
    this._dragInfo.series = series;
    this._dragInfo.axis = axis;
    this._dragInfo.rawScale = [];
    this._dragInfo.tempScale = [];
    this._dragInfo.hasChange = false;
    const fields = series.direction === 'vertical' ? series.fieldX : series.fieldY;
    this._dragInfo.fields = fields;
    const axisHelper = series.direction === 'vertical' ? series.getXAxisHelper() : series.getYAxisHelper();
    fields.forEach((f, i) => {
      this._dragInfo.rawScale.push(axisHelper.getScale(i) as BandScale);
      this._dragInfo.tempScale.push(this._dragInfo.rawScale[i].clone() as BandScale);
    });
    this._dragInfo.currentPadding = this._dragInfo.rawScale[0].paddingInner();
    this.edit.getStage().addEventListener('pointermove', this._handleMove as any);
    window.addEventListener('pointerup', this._handleUp, true);
  }

  private _handleMove = (e: StoryEvent) => {
    const layerPos = transformPointWithMatrix(this._graphicGroup.globalTransMatrix, e.canvas);
    const dx = layerPos.x - this._dragInfo.startPos.x;
    const dy = layerPos.y - this._dragInfo.startPos.y;

    // 计算
    // 第一层
    const scale = this._dragInfo.rawScale[0];
    // const scale2 = this._dragInfo.rawScale[1];
    // @ts-ignore
    const index = scale._index.get(`${this._currentEditorData[this._dragInfo.fields[0]]}`) - 1;
    const temp = this._getDragTempValue(scale, null, index);
    const bandWidthCount = temp.bandWidthCount;
    let currentValue = temp.currentValue;
    currentValue += this._dragInfo.series.direction === 'vertical' ? dx : dy;
    const padding = computeScalePadding(
      {
        total: Math.abs(scale.range()[0] - scale.range()[1]),
        bandWidthCount: scale.domain().length,
        paddingCount: scale.domain().length + 1
      },
      {
        total: currentValue,
        bandWidthCount,
        paddingCount: index + 1
      },
      0,
      MaxAxisPaddingOuter
    );
    if (padding === false) {
      return;
    }
    this._dragInfo.hasChange = true;
    // set temp scale
    this._dragInfo.tempScale[0].paddingInner(padding);
    this._dragInfo.tempScale[0].paddingOuter(padding);
    // scale2 && this._dragInfo.tempScale[1].range([0, this._dragInfo.tempScale[0].bandwidth()]);
    // 得到当前值
    const { currentValue: tempCurrentValue } = this._getDragTempValue(this._dragInfo.tempScale[0], null, index);
    currentValue = tempCurrentValue;
    const region = this._dragInfo.series.getRegion();
    const regionGraphic = region.getGroupMark().getProduct().elements[0];
    const regionLayoutMeta = {
      x: regionGraphic.graphicItem.globalAABBBounds.x1,
      y: regionGraphic.graphicItem.globalAABBBounds.y1
    };
    currentValue += this._dragInfo.series.direction === 'vertical' ? regionLayoutMeta.x : regionLayoutMeta.y;
    // 计算位置
    let start = currentValue;
    let end = currentValue;
    if (this._dragInfo.handle === 'start') {
      end = currentValue + this._dragInfo.tempScale[0].bandwidth();
    } else {
      start = currentValue - this._dragInfo.tempScale[0].bandwidth();
    }
    // const matrix = getChartToGlobalMatrix(this._actionInfo.character as CharacterChart, this.edit);
    if (this._dragInfo.series.direction === 'vertical') {
      // start = transformPointWithMatrix(matrix, { x: start, y: 0 }).x;
      // end = transformPointWithMatrix(matrix, { x: end, y: 0 }).x;
      // console.log(`start = `, start - handlerSize * 0.5, 'end = ', end - handlerSize * 0.5);
      this._startGroup.setAttributes({
        x: start - handlerSize * 0.5
      });
      this._endGroup.setAttributes({
        x: end - handlerSize * 0.5
      });
      this._barBorder.setAttributes({
        x: start,
        x1: end
      });
    } else {
      // start = transformPointWithMatrix(matrix, { x: 0, y: start }).y;
      // end = transformPointWithMatrix(matrix, { x: 0, y: end }).y;
      this._startGroup.setAttributes({
        y: start - handlerSize * 0.5
      });
      this._endGroup.setAttributes({
        y: end - handlerSize * 0.5
      });
      this._barBorder.setAttributes({
        y: start,
        y1: end
      });
    }

    this._dragInfo.currentPadding = padding;
  };

  private _getDragTempValue(scale: BandScale, scale2: BandScale, index: number) {
    let bandWidthCount = index;
    let currentValue = scale.scale(this._currentEditorData[this._dragInfo.fields[0]]);
    if (this._dragInfo.handle === 'start') {
      if (scale2) {
        bandWidthCount +=
          // @ts-ignore
          (scale2._index.get(`${this._currentEditorData[this._dragInfo.fields[1]]}`) - 1) / scale2.domain().length;
        currentValue += scale2.scale(this._currentEditorData[this._dragInfo.fields[1]]);
      }
    } else {
      if (scale2) {
        bandWidthCount +=
          // @ts-ignore
          scale2._index.get(`${this._currentEditorData[this._dragInfo.fields[1]]}`) / scale2.domain().length;
        currentValue += scale2.scale(this._currentEditorData[this._dragInfo.fields[1]]) + scale2.bandwidth();
      } else {
        bandWidthCount += 1;
        currentValue += scale.bandwidth();
      }
    }

    return {
      bandWidthCount,
      currentValue
    };
  }

  private _handleUp = (e: StoryEvent) => {
    this._barBorder.setAttributes({ visible: false });
    this._editState = 'none';
    this.edit.setEditGlobalState(EditEditingState.continuingEditing, false);
    this.edit.getStage().removeEventListener('pointermove', this._handleMove as any);
    window.removeEventListener('pointerup', this._handleUp, true);
    if (this._dragInfo.hasChange) {
      // TODO  设置对应的轴 padding
      // 这里的 setConfig 方法需要是增量设置
      this._actionInfo.character.setConfig({
        option: {
          axes: [
            {
              userId: this._dragInfo.axis.userId,
              specIndex: this._dragInfo.axis.getSpecIndex(),
              spec: {
                paddingInner: [this._dragInfo.currentPadding, 0],
                paddingOuter: [this._dragInfo.currentPadding, 0]
              }
            }
          ]
        }
      });

      //  更新属性
      this._dragInfo.series = null;
      this._dragInfo.axis = null;
      this._dragInfo.rawScale = [];
      this._dragInfo.tempScale = [];
      this._dragInfo.hasChange = false;
    }
  };

  private _getAllElementInDimension() {
    const marks: any[] = [];
    this._actionInfo.character.graphic.graphic.vchart
      .getChart()
      .getAllSeries()
      .forEach((s: ICartesianSeries) => {
        const dimensionField = (s.direction === 'vertical' ? s.fieldX : s.fieldY)[0];
        if (this._currentEditorDimensionField !== dimensionField) {
          return;
        }
        const bar = s.getMarkInName('bar');
        if (!bar) {
          return;
        }
        bar.getProduct().elements.forEach(e => {
          if (e.data[0][dimensionField] === this._currentEditorDimensionValue) {
            marks.push(e);
          }
        });
      });
    return marks;
  }

  release(): void {
    [this._startGroup, this._endGroup].forEach(g => {
      g.removeAllListeners('pointerdown');
      g.removeAllListeners('pointerover');
      g.removeAllListeners('pointerout');
    });
    super.release();

    this._startGroup = this._endGroup = this._startHandle = this._endHandle = this._barBorder = null;
  }
}
