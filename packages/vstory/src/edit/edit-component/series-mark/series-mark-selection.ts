import { SeriesMarkControl } from './../edit-control/series-mark-control/index';
import type { BaseMarkControl } from './../edit-control/series-mark-control/base';
import type { IEditOverActionInfo } from './../../interface';
import { createRect, IGroup } from '@visactor/vrender-core';
import type { IEditSelectionInfo } from '../../interface';
import { EditActionEnum, type IEditActionInfo, type IEditComponent } from '../../interface';

import { BaseSelection } from './../base-selection';

export class SeriesMarkSelection extends BaseSelection implements IEditComponent {
  readonly level = 4;
  editCharacterType = 'VChart';
  type = 'chart';

  protected declare _actionInfo: IEditSelectionInfo;

  //TODO series mark control
  // 根据不同的当前选中系列，加载对应的control
  protected _seriesMarkControl: BaseMarkControl;

  enableEditActionInfo(actionInfo: IEditActionInfo | IEditSelectionInfo) {
    const result = super.enableEditActionInfo(actionInfo);
    if (!result) {
      return result;
    }
    // 如果不是系列mark
    if ((actionInfo as IEditSelectionInfo).detail?.part !== 'seriesMark') {
      return false;
    }
    return true;
  }

  checkAction(actionInfo: IEditActionInfo | IEditSelectionInfo): boolean {
    // if (this.isEditing && actionInfo.type === EditActionEnum.singleSelection) {
    //   debugger;
    // }
    return super.checkAction(actionInfo);
  }

  activeLayoutComponent(): void {
    // 不创建
  }

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo, false);
    this.edit.emitter.emit('startEdit', {
      type: 'chartSelection',
      actionInfo,
      selection: this
    });
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.addEventListener('pointerdown', { level: 'mark' }, this.handlerChartClick);
    character.graphic.graphic.addEventListener('dblclick', { level: 'mark' }, this.handlerDoubleClick);

    // 添加编辑时框选效果
    this.addSelectedBorder();
  }

  endEdit() {
    if (!this._actionInfo) {
      return;
    }
    // @ts-ignore;
    const character = this._actionInfo.character;
    character.graphic.graphic.removeEventListener('pointerdown', { level: 'mark' }, this.handlerChartClick);
    character.graphic.graphic.removeEventListener('dblclick', { level: 'mark' }, this.handlerDoubleClick);
    super.endEdit();

    // 删除
    this.removeSelectedBorder();
  }

  addSelectedBorder() {
    //
  }
  removeSelectedBorder() {
    //
  }

  unLoadSeriesMarkControl() {
    if (this._seriesMarkControl) {
      this._seriesMarkControl.release();
      this._seriesMarkControl = null;
    }
  }
  loadSeriesMarkControl() {
    this.unLoadSeriesMarkControl();
    const markControlC = SeriesMarkControl[this._actionInfo.detail.modelInfo.model.type];
    if (!markControlC) {
      return;
    }
    this._seriesMarkControl = new markControlC(this.edit);
    this._seriesMarkControl.startWithActionInfo(this._actionInfo);
  }

  handlerChartClick = (e: any) => {
    //
  };

  handlerDoubleClick = (e: any) => {
    // TODO:双击进入下一层
  };

  checkOver?(action: IEditActionInfo): void {
    // action
    if (action.type === EditActionEnum.pointerOverCharacter && action.detail?.part === 'seriesMark') {
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
        this._overGraphic.removeAllChild();
        this._overGraphic.setAttribute('visible', false);
      }
    }
  }

  protected _showOverGraphic(action: IEditOverActionInfo) {
    console.warn('series _showOverGraphic', action);
    this._overGraphic.setAttribute('visible', true);
    const test = createRect({ x: 100, y: 100, width: 100, height: 100, fill: 'red' });
    this._overGraphic.add(test);
  }

  release(): void {
    this.unLoadSeriesMarkControl();
    this.endEdit();
    super.release();
  }
}
