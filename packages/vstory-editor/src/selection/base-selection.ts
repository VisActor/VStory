import type { IGroup } from '@visactor/vrender-core';
import { createGroup, vglobal } from '@visactor/vrender-core';
import type { IEditActionInfo, IEditSelection, IEditSelectionInfo } from '../interface';
import type { ICharacter } from '@visactor/vstory-core';
import { EditActionEnum, EditEditingState } from '../const';
import type { Edit } from '../edit';
import type { ITransformController, ControllerAttributes, IUpdateParams } from './edit-control/transform-control';
import { TransformController } from './edit-control/transform-control';
import type { IHoverController } from './edit-control/hover-control';
import { HoverController } from './edit-control/hover-control';

export abstract class BaseSelection implements IEditSelection {
  declare readonly level: number;
  declare readonly type: string;
  readonly supportedCharacterType: string[] = [];

  protected _overGraphic: IGroup;
  protected _actionInfo: IEditActionInfo | null;
  protected _activeCharacter: ICharacter | null;
  protected _layoutController: ITransformController | null;
  protected _hoverController: IHoverController | null;

  isEditing: boolean = false;
  declare clickCount: number;
  protected readonly dblclickTime: number = 300;

  get activeCharacter() {
    return this._activeCharacter;
  }

  constructor(public readonly edit: Edit) {
    this._activeCharacter = null;
    this._actionInfo = null;
    this._layoutController = null;
    this._hoverController = null;
    this._initOverGraphic();
  }

  checkAction(actionInfo: IEditActionInfo): boolean {
    if (this.isEditing) {
      return this.checkActionWhileEditing(actionInfo);
    }
    return this.checkActionWhileNoEditing(actionInfo);
  }
  checkOver(actionInfo: IEditActionInfo | IEditSelectionInfo) {
    if (!this.isActionInfoSupported(actionInfo)) {
      return;
    }
    if (actionInfo.type === EditActionEnum.pointerOverCharacter) {
      this.activeHoverController(actionInfo.character);
    } else if (actionInfo.type === EditActionEnum.pointerOutCharacter) {
      this.inActiveHoverController();
    }
  }
  startEdit(actionInfo: IEditActionInfo, emitEvent: boolean = true) {
    if (this.isEditing) {
      return;
    }
    this.isEditing = true;
    this._actionInfo = actionInfo;
    if (actionInfo && actionInfo.character) {
      this._activeCharacter = actionInfo.character;
    }
    this.activeLayoutController();

    emitEvent &&
      this.edit.emitStartEdit({
        type: this.type,
        actionInfo,
        selection: this
      });
  }

  endEdit(emitEvent: boolean = true) {
    if (!this.isEditing) {
      return;
    }
    this.isEditing = false;
    const actionInfo = this._actionInfo;
    this._actionInfo = null;
    this._activeCharacter = null;
    this.inActiveLayoutController();

    emitEvent &&
      this.edit.emitEndEdit({
        type: this.type,
        actionInfo,
        selection: this
      });
  }
  protected keyDown = (event: any) => {
    if (!(this._layoutController && event)) {
      return;
    }
    if (event.shiftKey || event.key === 'Shift') {
      this._layoutController.defaultProportionalScaling = this._layoutController.proportionalScaling;
      this._layoutController.proportionalScaling = true;
    }
  };
  protected keyUp = (event: any) => {
    if (!(this._layoutController && event)) {
      return;
    }
    if (event.shiftKey || event.key === 'Shift') {
      this._layoutController.proportionalScaling = this._layoutController.defaultProportionalScaling;
    }
  };

  protected activeLayoutController() {
    // 关闭hover的控件
    this.inActiveHoverController();

    if (!this._layoutController) {
      this._layoutController = this.createLayoutController();
    }
    if (!this._layoutController) {
      return;
    }
    this.attachController(this._layoutController);
    this._layoutController.onActive();
    this.updateController();
    vglobal.addEventListener('keydown', this.keyDown);
    vglobal.addEventListener('keyup', this.keyUp);
  }
  protected inActiveLayoutController() {
    if (!this._layoutController) {
      return;
    }

    this.detachController();

    this.edit.setEditGlobalState(EditEditingState.continuingEditing, false);
    vglobal.removeEventListener('keydown', this.keyDown);
    vglobal.removeEventListener('keyup', this.keyUp);
  }

  protected activeHoverController(character: ICharacter) {
    if (this.isEditing) {
      return;
    }
    if (!this._hoverController) {
      this._hoverController = this.createHoverController(character);
    }
    this.attachController(this._hoverController);
  }

  protected inActiveHoverController() {
    if (!this._hoverController) {
      return;
    }

    this.detachController();
  }

  protected attachController(layoutController: IGroup) {
    const g = this.edit.getEditGroup();
    if (layoutController.parent === g) {
      throw new Error('【attachController】未知错误，不应该走到这里');
    }
    g.appendChild(layoutController);
  }
  protected detachController() {
    if (this._layoutController) {
      this._layoutController.release();
      this._layoutController = null;
    }
    if (this._hoverController) {
      this._hoverController.release();
      this._hoverController = null;
    }
  }
  protected updateController(): void {
    const actionInfo = this._actionInfo as IEditSelectionInfo;
    const activeCharacter = this._activeCharacter;
    if (!(actionInfo && actionInfo.character && activeCharacter)) {
      return;
    }
    const component = actionInfo.character.graphic;
    const graphic = component.mainGraphic;
    const bounds = graphic.AABBBounds.clone();
    const { angle, x, y } = component.attribute;
    bounds.translate(x, y);
    this._layoutController.updateBoundsAndAngle(bounds, angle);
    return;
  }

  protected createLayoutController(): ITransformController | undefined {
    const controller = this._createLayoutController({
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
      setCursor: (c: any) => {
        this.edit.story.canvas.getStage().setCursor(c);
        return;
      }
    });

    controller.onEditorStart(() => {
      this.edit.clearOverGraphic();
      this.edit.setEditGlobalState(EditEditingState.continuingEditing, true);
    });
    controller.onEditorEnd(() => {
      this.edit.setEditGlobalState(EditEditingState.continuingEditing, false);
    });
    controller.onUpdate(this.handlerControlChange);
    return controller;
  }

  protected createHoverController(character: ICharacter): IHoverController | undefined {
    const bounds = character.graphic.AABBBounds;
    const controller = new HoverController(this, {
      x: bounds.x1,
      y: bounds.y1,
      width: bounds.width(),
      height: bounds.height()
    }) as any;
    return controller;
  }

  protected _createLayoutController(attributes: Partial<ControllerAttributes>): ITransformController {
    return new TransformController(this, attributes) as any;
  }

  protected handlerControlChange = (data: IUpdateParams) => {
    if (this._activeCharacter) {
      this.edit.emit('resize', {
        position: data,
        character: this._activeCharacter
      });
      this._activeCharacter.setConfig({
        position: {
          top: data.y,
          left: data.x,
          width: data.width,
          height: data.height,
          anchor: data.anchor as any,
          angle: data.angle
        }
      });
    }
    return false as const;
  };

  protected _initOverGraphic() {
    this._overGraphic = createGroup({ pickable: false, visible: false });
  }

  protected isCharacterSupported(character: ICharacter): boolean {
    return this.supportedCharacterType.includes(character.type);
  }

  protected isActionInfoSupported(actionInfo: IEditActionInfo): boolean {
    return this.isCharacterSupported(actionInfo.character);
  }

  // 编辑状态下处理actionInfo
  protected checkActionWhileEditing(actionInfo: IEditActionInfo): boolean {
    // 取消选择，返回false
    if (actionInfo.type === EditActionEnum.unSelection) {
      this.endEdit();
      return false;
    }
    if (actionInfo.type === EditActionEnum.singleSelection) {
      // this.checkDblClickAction(actionInfo);
      // 使用到其他的Selection了，return false
      if (!this.isActionInfoSupported(actionInfo)) {
        this.endEdit();
        return false;
      } else if (actionInfo.character !== this._activeCharacter) {
        // 选中同类型其他元素
        // 先停止当前的
        this.endEdit();
        // 再移动到新元素上去
        this.startEdit(actionInfo);
        return true;
      }
      // 还是是当前元素，return true
      return true;
    }
    return false;
  }

  // protected checkDblClickAction(actionInfo: IEditActionInfo) {
  //   if (!this.clickCount) {
  //     this.clickCount = 1;
  //   } else {
  //     this.clickCount++;
  //   }
  //   if (this.clickCount > 1) {
  //     this._checkDblClickAction(actionInfo);
  //     this.clickCount = 0;
  //     // 暂时不用clearTimeout，猜测不会点的那么快
  //   }
  //   setTimeout(() => {
  //     this.clickCount = 0;
  //   }, this.dblclickTime);
  // }
  // protected _checkDblClickAction(actionInfo: IEditActionInfo) {
  //   return;
  // }
  // 非编辑状态下处理actionInfo
  protected checkActionWhileNoEditing(actionInfo: IEditActionInfo): boolean {
    if (actionInfo.type === EditActionEnum.singleSelection && this.isActionInfoSupported(actionInfo)) {
      this.startEdit(actionInfo);
      return true;
    }
    return false;
  }
}
