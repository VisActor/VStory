import { EditEditingState, SeriesMarkMode } from './../../const';
import { Logger } from './../../../util/logger';
import type { IEditOverActionInfo } from './../../interface';
import type { IGroup, IGraphic } from '@visactor/vrender-core';
import { createGroup } from '@visactor/vrender-core';
import type { IEditSelectionInfo } from '../../interface';
import { EditActionEnum, type IEditActionInfo, type IEditComponent } from '../../interface';

import { BaseSelection } from './../base-selection';
import { cloneEditGraphic } from '../../utils/graphic';
import { SHAPE_OVER_COLOR, SHAPE_SELECT_COLOR } from '../../const';
import type { Edit } from '../../edit';
import { getKeyValueMapWithScaleMap, getSeriesKeyField, getSeriesKeyScalesMap } from '../../utils/chart';
import { getMarkStyleId } from '../../../story/character/chart/runtime/utils';
import type { Label as VChartLabelComponent } from '@visactor/vchart/esm/component/label/label';
import type { ISeries } from '@visactor/vchart';
import { findLabelGraphic } from '../../../story/utils/render';

export class SeriesLabelSelection extends BaseSelection implements IEditComponent {
  readonly level = 4;
  editCharacterType = 'VChart';
  type = 'chart';

  protected declare _actionInfo: IEditSelectionInfo;

  protected _selectGraphic: IGroup;

  constructor(public readonly edit: Edit) {
    super(edit);
    this._initSelectGraphic();
  }

  protected _initSelectGraphic() {
    this._selectGraphic = createGroup({ pickable: false, visible: false });
    this.edit.getEditGroup().add(this._selectGraphic);
  }

  enableEditActionInfo(actionInfo: IEditActionInfo | IEditSelectionInfo) {
    const result = super.enableEditActionInfo(actionInfo);
    if (!result) {
      return result;
    }
    // 如果不是系列mark
    if ((actionInfo as IEditSelectionInfo).detail?.part !== 'label') {
      return false;
    }
    return true;
  }

  checkActionWhileEditing(actionInfo: IEditActionInfo | IEditSelectionInfo): boolean {
    const result = super.checkActionWhileEditing(actionInfo);
    if (actionInfo.type === EditActionEnum.singleSelection && result === true) {
      this._checkChangeSeriesMark(actionInfo as IEditSelectionInfo);
    }
    if (result === false) {
      if (
        actionInfo.type === EditActionEnum.unSelection ||
        (actionInfo.type === EditActionEnum.singleSelection &&
          (actionInfo as IEditSelectionInfo).detail?.part !== 'seriesMark' &&
          // TODO: 支持标签编辑后 打开注释
          (actionInfo as IEditSelectionInfo).detail?.part !== 'label')
      ) {
        this.edit.setEditGlobalState('seriesMarkMode', SeriesMarkMode.all);
      }
    }
    return result;
  }

  protected _checkChangeSeriesMark(actionInfo: IEditSelectionInfo) {
    // 检测是否选中另一组 mark
    Logger.debug('series mark checkChangeSeriesMark');
    if (actionInfo.detail.graphic === this._actionInfo.detail.graphic) {
      // 同一个图形，必然是不用切换的
      return;
    }
    // 全选下 同一个系列类型 + mark名称 不用切换
    if (this.edit.editGlobalState.seriesMarkMode === SeriesMarkMode.all) {
      if (
        actionInfo.detail.modelInfo.model.type === this._actionInfo.detail.modelInfo.model.type &&
        actionInfo.detail.modelInfo.model.name === this._actionInfo.detail.modelInfo.model.name
      ) {
        return;
      }
    }
    // 数据组选中下 同series + 数据key 不用切换
    if (this.edit.editGlobalState.seriesMarkMode === SeriesMarkMode.all) {
      const seriesField = this._actionInfo.detail.modelInfo.series.getSeriesField();
      if (
        actionInfo.detail.modelInfo.model === this._actionInfo.detail.modelInfo.model &&
        actionInfo.detail.modelInfo.datum[seriesField] === this._actionInfo.detail.modelInfo.datum[seriesField]
      ) {
        return;
      }
    }
    // 单选下 只有同一个图形 才不用切换，顶部已经判定，到这里就是必须切换了

    // 开始切换
    // 先发送一次编辑结束
    this.endEdit();
    // 再开启一次编辑
    this.startEdit(actionInfo);
  }

  activeLayoutComponent(): void {
    // 不创建
  }

  startEdit(actionInfo: IEditSelectionInfo) {
    Logger.debug('series mark startEdit');
    super.startEdit(actionInfo, false);
    // 设置绘图变换矩阵
    const chart = this._actionInfo.character.graphic.graphic;
    const matrix = chart.transMatrix.clone();
    // const matrix = getChartRenderMatrix(this._actionInfo.character.graphic.graphic);
    this._selectGraphic.setAttributes({ postMatrix: matrix });
    this._overGraphic.setAttributes({ postMatrix: matrix });

    const seriesMarkInfo: {
      selectMode: string;
      markName?: string;
      datumMatch?: { [key: string]: number };
      itemKeys?: string[];
      markStyleId?: string;
      seriesMatch?: { specIndex?: number; userId?: string; type?: string };
    } = { selectMode: this.edit.editGlobalState.seriesMarkMode };
    seriesMarkInfo.markName = 'label';
    seriesMarkInfo.seriesMatch = {
      // 默认全系列可选
      // type: actionInfo.detail.modelInfo.model.type
    };
    // single + group
    if (this.edit.editGlobalState.seriesMarkMode !== SeriesMarkMode.all) {
      const series = this._getLabelSeriesInfo(actionInfo as IEditSelectionInfo);
      actionInfo.detail.modelInfo.series = series;
      seriesMarkInfo.markName = 'label';
      seriesMarkInfo.seriesMatch = {
        type: series.type,
        specIndex: series.getSpecIndex(),
        userId: series.userId as string
      };
      seriesMarkInfo.datumMatch = this._getSeriesGroupMatchMatch(actionInfo as IEditSelectionInfo);
    }

    // single
    if (this.edit.editGlobalState.seriesMarkMode === SeriesMarkMode.single) {
      const { itemKeys, datumMatch } = this._getSingleDatumMatch(actionInfo as IEditSelectionInfo);
      seriesMarkInfo.datumMatch = datumMatch;
      seriesMarkInfo.itemKeys = itemKeys;
      seriesMarkInfo.markStyleId = getMarkStyleId(seriesMarkInfo.markName, itemKeys, datumMatch);
    }
    actionInfo = { ...actionInfo, seriesMarkInfo } as any;
    this.edit.emitter.emit('startEdit', {
      type: 'labelMarkSelection',
      actionInfo,
      selection: this
    });
    this._actionInfo = actionInfo;
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.vchart.on('pointerdown', { level: 'model', type: 'label' }, this.handlerChartClick);
    character.graphic.graphic.vchart.on('dblclick', { level: 'model', type: 'label' }, this.handlerDoubleClick);

    // 添加编辑时框选效果
    this.addSelectedBorder();
  }

  private _getLabelSeriesInfo(actionInfo: IEditSelectionInfo): ISeries {
    const labelGraphic = actionInfo.detail.graphic;
    const labelVChartComponent = actionInfo.detail.modelInfo.model as VChartLabelComponent;
    const labelVRenderComponent = labelVChartComponent.getMarks().find(m => {
      let temp = labelGraphic;
      while (temp) {
        if (temp === m.getProduct().graphicItem) {
          return true;
        }
        temp = temp.parent;
      }
      return false;
    });
    if (!labelVRenderComponent) {
      console.error('没有找到对应的labelVRenderComponent');
    }
    // @ts-ignore
    const info = labelVChartComponent._labelComponentMap.get(labelVRenderComponent)();
    if (!info) {
      console.error('没有找到对应的info');
    }
    // @ts-ignore
    return info.series;
  }

  endEdit() {
    Logger.debug('series mark endEdit');
    if (!this._actionInfo) {
      return;
    }
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.vchart.off('pointerdown', this.handlerChartClick);
    character.graphic.graphic.vchart.off('dblclick', this.handlerDoubleClick);
    super.endEdit();

    // 删除
    this.removeSelectedBorder();
  }

  addSelectedBorder() {
    this.removeSelectedBorder();
    this._selectGraphic.setAttribute('visible', true);
    this._addPickGraphic(this._actionInfo, this._selectGraphic, { stroke: SHAPE_SELECT_COLOR });
  }
  removeSelectedBorder() {
    if (this._selectGraphic.attribute.visible) {
      this._selectGraphic.removeAllChild();
      this._selectGraphic.setAttribute('visible', false);
    }
  }

  handlerChartClick = (e: any) => {
    //
  };

  handlerDoubleClick = (e: any) => {
    if (this.edit.editGlobalState.seriesMarkMode === SeriesMarkMode.single) {
      return;
    }

    if (this.edit.editGlobalState.seriesMarkMode === SeriesMarkMode.all) {
      this.edit.setEditGlobalState('seriesMarkMode', SeriesMarkMode.seriesGroup);
    } else if (this.edit.editGlobalState.seriesMarkMode === SeriesMarkMode.seriesGroup) {
      this.edit.setEditGlobalState('seriesMarkMode', SeriesMarkMode.single);
    }
    const actionInfo = this._actionInfo;
    this.endEdit();
    this.startEdit(actionInfo);
    this._showOverGraphic(actionInfo);
  };

  checkOver?(action: IEditActionInfo | IEditSelectionInfo): void {
    // action
    if (
      action.type === EditActionEnum.pointerOverCharacter &&
      (action as IEditSelectionInfo).detail?.part === 'label'
    ) {
      // 设置绘图变换矩阵
      // const matrix = getChartRenderMatrix((action as IEditSelectionInfo).character.graphic.graphic);
      const chart = (action as IEditSelectionInfo).character.graphic.graphic;
      const matrix = chart.transMatrix.clone();
      this._overGraphic.setAttributes({ postMatrix: matrix });
      // show over graphic
      this._showOverGraphic(action as IEditOverActionInfo);
    }
    if (action.type === EditActionEnum.pointerOutCharacter) {
      // 前提：如果当前over在展示
      // TODO:系列mark补充over展示逻辑
      // 删除的几种情况：
      // 1 全选状态下，seriesType是否一致
      // 2 分组选中下，是否是同一组
      // 3 单个选中下，是否是同一个
      if (this._overGraphic.attribute.visible) {
        this.edit.clearOverGraphic();
        this._overGraphic.removeAllChild();
        this._overGraphic.setAttribute('visible', false);
      }
    }
  }

  protected _showOverGraphic(action: IEditOverActionInfo) {
    if (this.edit.editGlobalState[EditEditingState.continuingEditing] === true) {
      return;
    }
    action.detail.modelInfo.series = this._getLabelSeriesInfo(action);
    this._overGraphic.removeAllChild();
    this._overGraphic.setAttribute('visible', true);
    this._addPickGraphic(action, this._overGraphic, { stroke: SHAPE_OVER_COLOR });
    this.edit.showOverGraphic(this._overGraphic);
  }

  protected _getChartItemInSeriesMark(action: IEditOverActionInfo): IGraphic[] {
    if (this.edit.editGlobalState.seriesMarkMode === SeriesMarkMode.all) {
      return this._getAllSeriesLabel(action);
    }
    if (this.edit.editGlobalState.seriesMarkMode === SeriesMarkMode.seriesGroup) {
      const labelVChartComponent = action.detail.modelInfo.model as VChartLabelComponent;
      // 匹配系列
      const labelVRenderComponent = labelVChartComponent.getMarks().find(m => {
        // @ts-ignore
        const info = labelVChartComponent._labelComponentMap.get(m)();
        return info.series === action.detail.modelInfo.series;
      });
      if (!labelVRenderComponent) {
        console.error('labelVChartComponent is null');
        return [];
      }
      const labelGraphic: IGraphic[] = [];
      // 系列标签
      findLabelGraphic(labelVRenderComponent.getProduct().graphicItem, labelGraphic);

      const seriesField = action.detail.modelInfo.series.getSeriesField();
      const seriesValue = action.detail.modelInfo.datum[seriesField];
      return labelGraphic.filter((l: IGraphic) => l.attribute.data[seriesField] === seriesValue);
    }
    if (this.edit.editGlobalState.seriesMarkMode === SeriesMarkMode.single) {
      return [action.detail.graphic];
    }
    return [];
  }

  private _getAllSeriesLabel(action: IEditOverActionInfo): IGraphic[] {
    const labelVChartComponent = action.detail.modelInfo.model as VChartLabelComponent;
    const labelGraphic: IGraphic[] = [];
    // 全部标签
    labelVChartComponent.getMarks().forEach(m => {
      findLabelGraphic(m.getProduct().graphicItem, labelGraphic);
    });

    return labelGraphic;
  }

  protected _addPickGraphic(action: IEditOverActionInfo, parent: IGroup, attr?: any) {
    const itemList = this._getChartItemInSeriesMark(action);
    // const matrix = getChartToGlobalMatrix(action.character as CharacterChart, this.edit);
    itemList.forEach((item: IGraphic) => {
      const graphic = cloneEditGraphic(item, null, { ...(attr ?? {}) });
      parent.add(graphic);
    });
  }

  private _getSingleDatumMatch(actionInfo: IEditSelectionInfo) {
    const itemKeys = getSeriesKeyField(actionInfo.detail.modelInfo.series);
    const keyScaleMap = getSeriesKeyScalesMap(actionInfo.detail.modelInfo.series);
    return {
      datumMatch: getKeyValueMapWithScaleMap(itemKeys, keyScaleMap, actionInfo.detail.modelInfo.datum),
      itemKeys,
      keyScaleMap
    };
  }
  private _getSeriesGroupMatchMatch(actionInfo: IEditSelectionInfo) {
    const series = actionInfo.detail.modelInfo.series;
    const seriesField = series.getSeriesField();
    const seriesValue = actionInfo.detail.modelInfo.datum[seriesField];

    return {
      [seriesField]: seriesValue
    };
  }

  release(): void {
    this.endEdit();
    super.release();
  }
}
