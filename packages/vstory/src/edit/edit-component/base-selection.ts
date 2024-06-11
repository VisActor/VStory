import type { IEditSelectionInfo } from '../interface';
import { EditActionEnum, type IEditActionInfo, type IEditComponent } from '../interface';
import { StoryEvent } from '../../story/interface/runtime-interface';
import type { Edit } from '../edit';
import type { AbstractComponent } from '@visactor/vrender-components';
import type { ITransformControl } from './edit-control/transform-control';
import { TransformControl, type TransformAttributes } from './edit-control/transform-control';
import { throwError } from '../../util/common';

export abstract class BaseSelection implements IEditComponent {
  declare readonly level: number;

  protected _actionInfo: IEditActionInfo;
  protected _isSelection = false;
  isEditing: boolean = false;
  protected _layoutComponent?: ITransformControl;

  constructor(public readonly edit: Edit) {}
  editEnd(): void {
    this.isEditing = false;
    this._actionInfo = null;
    this.inActiveLayoutComponent();
  }
  abstract checkAction(actionInfo: IEditSelectionInfo): boolean;

  startEdit(actionInfo: IEditActionInfo) {
    this.isEditing = true;
    this._actionInfo = actionInfo;
    this.activeLayoutComponent();
  }

  createLayoutComponent(): ITransformControl | undefined {
    const component = this._createLayoutComponent({
      angle: 0,
      enabledAnchors: ['top', 'bottom', 'left', 'right', 'left-bottom', 'left-top', 'right-bottom', 'right-top'],
      minHeight: 10,
      minWidth: 10,
      proportionalScaling: false,
      childrenPickable: true,
      pickable: true,
      move: true,
      rotate: true,
      resize: true,
      setCursor: c => {
        this.edit.story.canvas.getStage().setCursor(c);
        return;
      }
    });

    return component;
  }

  protected _createLayoutComponent(attributes: Partial<TransformAttributes>): ITransformControl | undefined {
    return new TransformControl(attributes);
  }

  activeLayoutComponent() {
    if (!this._layoutComponent) {
      this._layoutComponent = this.createLayoutComponent();
    }
    if (!this._layoutComponent) {
      return;
    }
    this.attachComponent(this._layoutComponent);
    this._layoutComponent.onActive();
    this.updateComponent();
  }

  inActiveLayoutComponent() {
    if (!this._layoutComponent) {
      this._layoutComponent = this.createLayoutComponent();
    }
    if (!this._layoutComponent) {
      return;
    }

    this._layoutComponent.onInActive();
    this.detachComponent(this._layoutComponent);
  }

  updateComponent() {
    const actionInfo = this._actionInfo as IEditSelectionInfo;
    if (!(actionInfo && actionInfo.character)) {
      return;
    }
    this._layoutComponent.updateSubBounds(actionInfo.character.getGraphicParent().AABBBounds);
  }

  attachComponent(layoutComponent: ITransformControl) {
    const g = this.edit.getEditGroup();
    if (layoutComponent.parent === g) {
      throwError('【attachComponent】未知错误，不应该走到这里');
    }
    g.appendChild(layoutComponent);
  }
  detachComponent(layoutComponent: ITransformControl) {
    const g = this.edit.getEditGroup();
    g.removeChild(layoutComponent);
  }
}
