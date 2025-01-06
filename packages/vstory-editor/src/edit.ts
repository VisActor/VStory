import { EditAction } from './edit-action';
import { EventEmitter } from '@visactor/vutils';
import type { ILayoutLine } from './interface';
import {
  type IEditActionInfo,
  type IEditSelection,
  type IEditSelectionConstructor,
  type IEditMessage
} from './interface';
import type { IGroup, IGraphic } from '@visactor/vrender';
import { createGroup } from '@visactor/vrender';
import { EditActionEnum, SeriesMarkMode } from './const';
import type { ICharacter, IStoryEvent, Story } from '@visactor/vstory-core';

export class Edit extends EventEmitter {
  readonly editAction: EditAction;

  protected static selectionConstructorMap: { [key: string]: IEditSelectionConstructor } = {};

  static registerEditSelection(key: string, cpt: IEditSelectionConstructor) {
    Edit.selectionConstructorMap[key] = cpt;
  }

  protected _selectionMap: { [key: string]: IEditSelection } = {};
  protected _selectionList: IEditSelection[];

  protected _currentSelection: IEditSelection;
  protected _overGraphicGroup: IGroup;

  protected _editGroup: IGroup;

  // 提供给组件一个编辑的全局状态，组件可以读取/设置。
  // 比如当前的chart元素选中层级，全部/数据组/单个 这个状态在标签，系列mark 中共同使用
  private _editGlobalState: { [key: string]: any } = {
    seriesMarkMode: SeriesMarkMode.all
  };
  get editGlobalState(): { [key: string]: any } {
    return this._editGlobalState;
  }

  setEditGlobalState(key: string, value: any) {
    this._editGlobalState[key] = value;
  }

  constructor(public readonly story: Story) {
    super();
    this.editAction = new EditAction(story);
    this.editAction.on('dispatchAction', this.onAction);
    this.story.canvas.getStage().addEventListener('*', this.onStoryEvent);
    this._initEditGroup();
    this._initComponent();
  }

  _initEditGroup() {
    this._editGroup = createGroup({});
    this._editGroup.name = 'edit_group';
    const editLayer = this.story.canvas.getStage().createLayer();
    const defaultLayerAttr = this.story.canvas.getStage().defaultLayer.attribute;
    editLayer.setAttributes({
      width: defaultLayerAttr.width,
      height: defaultLayerAttr.height,
      x: defaultLayerAttr.x,
      y: defaultLayerAttr.y,
      scaleX: defaultLayerAttr.scaleX,
      scaleY: defaultLayerAttr.scaleY,
      clip: false
    });
    editLayer.clipInViewBox = false;
    editLayer.add(this._editGroup);

    this._overGraphicGroup = createGroup({ pickable: false });
    this._overGraphicGroup.name = 'over_group';
    editLayer.add(this._overGraphicGroup);
  }

  getEditGroup() {
    return this._editGroup;
  }

  getStage() {
    return this._editGroup.stage;
  }

  protected _initComponent() {
    this._selectionMap = {};
    Object.keys(Edit.selectionConstructorMap).forEach(key => {
      this._selectionMap[key] = new Edit.selectionConstructorMap[key](this);
    });
    this._selectionList = Object.values(this._selectionMap)
      .sort((a, b) => a.level - b.level)
      .reverse();
  }

  onStoryEvent = (event: IStoryEvent, type: string) => {
    // 如果交互到编辑元素忽略
    if (event.path.find((g: any) => g === this._editGroup || g === this._overGraphicGroup)) {
      // 具体判断是否编辑到交互元素，如果pick到group，就不算
      const pathTarget = event.path[event.path.length - 1];
      if (!pathTarget.isContainer || pathTarget.attribute?.pickable === true) {
        return;
      }
    }
    this.editAction.onStoryEvent(event, type);
  };

  // TODO: over不能正确的分发到全部selection
  onAction = (actionInfo: IEditActionInfo) => {
    // over
    if (
      actionInfo.type === EditActionEnum.pointerOverCharacter ||
      actionInfo.type === EditActionEnum.pointerOutCharacter
    ) {
      this._selectionList.forEach(c => c.checkOver?.(actionInfo));
      return;
    }

    // 选中
    if (this._currentSelection) {
      // 优先上一次的编辑组件
      if (this._currentSelection.checkAction(actionInfo)) {
        return;
      }
    }
    for (let i = 0; i < this._selectionList.length; i++) {
      const cpt = this._selectionList[i];
      if (cpt.checkAction(actionInfo)) {
        // this.stopEdit();
        // cpt.startEdit(actionInfo);
        this._currentSelection = cpt;
        return;
      }
    }
  };

  selectCharacter(id: string) {
    this.editAction.dispatchAction({
      type: EditActionEnum.singleSelection,
      characterId: id,
      character: this.story.getCharacterById(id),
      event: null,
      detail: null
    });
  }

  emitStartEdit(msg: IEditMessage) {
    this.dispatchEditAction('startEdit', msg);
  }
  emitEndEdit(msg: IEditMessage) {
    this.dispatchEditAction('endEdit', msg);
  }

  dispatchEditAction(type: string, msg: IEditMessage) {
    this.emit(type, msg);
  }

  triggerEditWithEvent(event: IStoryEvent) {
    return;
  }

  triggerEditWithComponent(type: string, actionInfo: IEditActionInfo) {
    return;
  }

  stopEdit() {
    this._currentSelection?.endEdit();
    this._currentSelection = null;
  }

  release() {
    this.story.canvas?.getStage?.().removeEventListener('*', this.onStoryEvent as any);
    this.editAction.release();
  }

  showOverGraphic(graphic: IGraphic, clearOther: boolean = true) {
    if (clearOther) {
      this._overGraphicGroup.removeAllChild();
    }
    this._overGraphicGroup.add(graphic);
  }

  clearOverGraphic() {
    this._overGraphicGroup.removeAllChild();
  }

  getLayoutLineInLayer(ignoreIdList: string[]): ILayoutLine[] {
    const result: ILayoutLine[] = [];
    const characterList = this.story.getCharacterList();
    characterList.forEach(c => {
      if (ignoreIdList.includes(c.id)) {
        return;
      }
      result.push(...c.getLayoutGuideLine());
    });
    return result;
  }
}
