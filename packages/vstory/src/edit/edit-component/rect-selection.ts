import type { IEditSelectionInfo } from '../interface';
import { EditActionEnum, type IEditActionInfo, type IEditComponent } from '../interface';
import type { Edit } from '../edit';
import { BaseSelection } from './base-selection';
import type { TransformAttributes, ITransformControl, IUpdateParams } from './edit-control/transform-control';
import { TransformControl } from './edit-control/transform-control';
import type { VRenderPointerEvent } from '../../interface/type';
import { RichTextTransformControl } from './edit-control/richtext-transform-control';

export class RectSelection extends BaseSelection implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'rect';

  constructor(public readonly edit: Edit) {
    super(edit);
  }

  protected _createLayoutComponent(attributes: Partial<TransformAttributes>): ITransformControl {
    return new RichTextTransformControl(this, attributes);
  }

  editEnd(): void {
    super.editEnd();
    return;
  }
  checkAction(actionInfo: IEditSelectionInfo): boolean {
    if (this.isEditing) {
      return this.checkActionWhileEditing(actionInfo);
    }
    return this.checkActionWhileNoEditing(actionInfo);
  }

  checkActionWhileEditing(actionInfo: IEditSelectionInfo): boolean {
    // 点到其他内容了，return false
    if (actionInfo.type === EditActionEnum.singleSelection && actionInfo.detail.graphicType !== this.type) {
      return false;
    }

    if (actionInfo.event.type === 'pointerdown') {
      if (!actionInfo.event.target || (actionInfo.event.target as any).parent !== this._layoutComponent) {
        return false;
      }
    }
    return true;
  }

  protected handlerTransformChange(data: IUpdateParams, event?: VRenderPointerEvent): void {
    if (this._activeCharacter) {
      this._activeCharacter.setAttributes(data);
    }
  }

  checkActionWhileNoEditing(actionInfo: IEditSelectionInfo): boolean {
    if (actionInfo.type === EditActionEnum.singleSelection && actionInfo.detail.graphicType === this.type) {
      this.startEdit(actionInfo);
      // graphic
      return true;
    }

    return false;
  }
}
