import type { IEditSelectionInfo } from '../interface';
import { EditActionEnum, type IEditActionInfo, type IEditComponent } from '../interface';
import type { Edit } from '../edit';
import type { ITransformControl, IUpdateParams } from './edit-control/transform-control';
import { TransformControl, type TransformAttributes } from './edit-control/transform-control';
import { throwError } from '../../util/common';
import type { VRenderPointerEvent } from '../../interface/type';
import type { ICharacter } from '../../story/character/runtime-interface';

export abstract class BaseSelection implements IEditComponent {
  declare readonly level: number;
  declare readonly editCharacterType: string;

  protected _actionInfo: IEditActionInfo;
  protected _isSelection = false;
  isEditing: boolean = false;
  protected _layoutComponent?: ITransformControl;
  protected _activeCharacter?: ICharacter | null;

  constructor(public readonly edit: Edit) {}
  declare type: string;

  editEnd(): void {
    this.isEditing = false;
    this._actionInfo = null;
    this.inActiveLayoutComponent();
    this._activeCharacter = null;
  }

  checkAction(actionInfo: IEditActionInfo | IEditSelectionInfo): boolean {
    if (this.isEditing) {
      return this.checkActionWhileEditing(actionInfo);
    }
    return this.checkActionWhileNoEditing(actionInfo);
  }

  enableEditCharacter(character: ICharacter) {
    return character.type === this.editCharacterType;
  }

  checkActionWhileEditing(actionInfo: IEditActionInfo | IEditSelectionInfo): boolean {
    if (actionInfo.type === EditActionEnum.unSelection) {
      return false;
    }
    if (actionInfo.type === EditActionEnum.unSelection) {
      return false;
    }
    if (actionInfo.type === EditActionEnum.singleSelection) {
      // 选中其他内容了，return false
      if (!this.enableEditCharacter(actionInfo.character)) {
        return false;
      } else if (actionInfo.character !== this._activeCharacter) {
        // 选中同类型其他元素
        // 先停止当前的
        this.editEnd();
        // 在开始新元素的编辑
        this.startEdit(actionInfo);
        return true;
      }
    }
    if (this.isEditing) {
      return true;
    }

    return true;
  }

  checkActionWhileNoEditing(actionInfo: IEditActionInfo | IEditSelectionInfo): boolean {
    if (actionInfo.type === EditActionEnum.singleSelection && this.enableEditCharacter(actionInfo.character)) {
      this.startEdit(actionInfo);
      // graphic
      return true;
    }

    return false;
  }

  getActiveCharacter() {
    return this._activeCharacter;
  }

  startEdit(actionInfo: IEditActionInfo) {
    this.isEditing = true;
    this._actionInfo = actionInfo;
    if (actionInfo && (actionInfo as IEditSelectionInfo).character) {
      this._activeCharacter = (actionInfo as IEditSelectionInfo).character;
    }
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

    component.onUpdate(this.handlerTransformChange.bind(this));
    return component;
  }

  protected _createLayoutComponent(attributes: Partial<TransformAttributes>): ITransformControl | undefined {
    return new TransformControl(this, attributes);
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
      return;
    }

    // this._layoutComponent.onInActive();
    // this.detachComponent(this._layoutComponent);
    // TODO 直接release
    this._layoutComponent.release();
    this._layoutComponent = null;
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

  protected handlerTransformChange(data: IUpdateParams, event?: VRenderPointerEvent): void {
    if (this._activeCharacter) {
      this._activeCharacter.setAttributes(data);
    }
  }
}
