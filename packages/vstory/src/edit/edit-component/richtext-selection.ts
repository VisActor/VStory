import type { IEditSelectionInfo } from '../interface';
import { EditActionEnum, type IEditActionInfo, type IEditComponent } from '../interface';
import { StoryEvent } from '../../story/interface/runtime-interface';
import type { Edit } from '../edit';
import { BaseSelection } from './base-selection';
import type { TransformAttributes, ITransformControl } from './edit-control/transform-control';
import { RichTextTransformControl } from './edit-control/richtext-transform-control';

export class RichTextSelection extends BaseSelection implements IEditComponent {
  readonly level = 3;
  readonly type: string = 'richtext';

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
  checkAction(actionInfo: IEditSelectionInfo | IEditActionInfo): boolean {
    if (this.isEditing) {
      return this.checkActionWhileEditing(actionInfo);
    }
    return this.checkActionWhileNoEditing(actionInfo);
  }

  checkActionWhileEditing(actionInfo: IEditSelectionInfo | IEditActionInfo): boolean {
    // 点到其他内容了，return false
    if (
      actionInfo.type === EditActionEnum.singleSelection &&
      (actionInfo as IEditSelectionInfo).detail.graphicType !== this.type
    ) {
      return false;
    }

    if (actionInfo.event.type === 'pointerdown') {
      if (!actionInfo.event.target || (actionInfo.event.target as any).parent !== this._layoutComponent) {
        return false;
      }
    }
    return true;
  }

  checkActionWhileNoEditing(actionInfo: IEditSelectionInfo | IEditActionInfo): boolean {
    if (
      actionInfo.type === EditActionEnum.singleSelection &&
      (actionInfo as IEditSelectionInfo).detail.graphicType === this.type
    ) {
      this.startEdit(actionInfo);
      // graphic
      return true;
    }

    return false;
  }

  startEdit(actionInfo: IEditActionInfo) {
    super.startEdit(actionInfo);
    this.edit.startEdit({
      type: 'boxSelection',
      actionInfo: this._actionInfo,
      updateCharacter: (params: any) => {
        // nothing 不支持任何修改
      }
    });
  }
}
