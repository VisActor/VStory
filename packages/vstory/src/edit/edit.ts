import type { StoryEvent } from '../story/interface/runtime-interface';
import type { Story } from './../story/story';
import { EditAction } from './edit-action';
import { EventEmitter } from '@visactor/vutils';
import {
  EditActionEnum,
  type IEditActionInfo,
  type IEditComponent,
  type IEditComponentConstructor,
  type IEditMessage
} from './interface';
import type { IGroup, IGraphic } from '@visactor/vrender';
import { createGroup } from '@visactor/vrender';
import { SeriesMarkMode } from './const';

export class Edit {
  readonly editAction: EditAction;
  readonly emitter: EventEmitter;

  protected static componentConstructorMap: { [key: string]: IEditComponentConstructor } = {};

  static registerEditComponent(key: string, cpt: IEditComponentConstructor) {
    Edit.componentConstructorMap[key] = cpt;
  }

  protected _componentMap: { [key: string]: IEditComponent } = {};
  protected _componentList: IEditComponent[];

  protected _currentComponent: IEditComponent;
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
    this.emitter = new EventEmitter();
    this.editAction = new EditAction(story);
    this.editAction.emitter.on('dispatchAction', this.onAction.bind(this));
    this.story.canvas.getStage().addEventListener('*', this.onStoryEvent.bind(this) as any);
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

    this._overGraphicGroup = createGroup({});
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
    this._componentMap = {};
    Object.keys(Edit.componentConstructorMap).forEach(key => {
      this._componentMap[key] = new Edit.componentConstructorMap[key](this);
    });
    this._componentList = Object.values(this._componentMap)
      .sort((a, b) => a.level - b.level)
      .reverse();
  }

  onStoryEvent(event: StoryEvent, type: string) {
    // 如果交互到编辑元素忽略
    if (event.path.find(g => g === this._editGroup || g === this._overGraphicGroup)) {
      // 具体判断是否编辑到交互元素，如果pick到group，就不算
      const pathTarget = event.path[event.path.length - 1];
      if (!pathTarget.isContainer || pathTarget.attribute?.pickable === true) {
        return;
      }
    }
    this.editAction.onStoryEvent(event, type);
  }

  // TODO: over不能正确的分发到全部selection
  onAction(actionInfo: IEditActionInfo) {
    // over
    if (
      actionInfo.type === EditActionEnum.pointerOverCharacter ||
      actionInfo.type === EditActionEnum.pointerOutCharacter
    ) {
      this._componentList.forEach(c => c.checkOver?.(actionInfo));
      return;
    }

    // 选中
    if (this._currentComponent) {
      // 优先上一次的编辑组件
      if (this._currentComponent.checkAction(actionInfo)) {
        return;
      } else if (actionInfo.type === EditActionEnum.unSelection) {
        this.stopEdit();
      }
    }
    for (let i = 0; i < this._componentList.length; i++) {
      const cpt = this._componentList[i];
      if (cpt.checkAction(actionInfo)) {
        this.stopEdit();
        cpt.startEdit(actionInfo);
        this._currentComponent = cpt;
        return;
      }
    }
  }

  startEdit(msg: IEditMessage) {
    this.dispatchEditAction('startEdit', msg);
  }
  endEdit(msg: IEditMessage) {
    this.dispatchEditAction('endEdit', msg);
  }

  dispatchEditAction(type: string, msg: IEditMessage) {
    this.emitter.emit(type, msg);
  }

  triggerEditWithEvent(event: StoryEvent) {
    return;
  }

  triggerEditWithComponent(type: string, actionInfo: IEditActionInfo) {
    return;
  }

  stopEdit() {
    this._currentComponent?.endEdit();
    this._currentComponent = null;
  }

  release() {
    this.story.canvas?.getStage?.().removeEventListener('*', this.onStoryEvent as any);
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
}
