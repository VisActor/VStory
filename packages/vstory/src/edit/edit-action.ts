import type { RichTextEditPlugin } from '@visactor/vrender';
import type { IGraphic } from '@visactor/vrender';
import type { ICharacter, ICharacterPickInfo } from './../story/character/runtime-interface';
import type { BoxSelection } from './edit-component/box-selection';
import { EventEmitter, isArray } from '@visactor/vutils';
import { PickEventType } from './const';
import type { Story } from '../story/story';
import type { ContinuousActionType, IEditActionInfo, IEditOverActionInfo } from './interface';
import { EditActionEnum } from './interface';
import type { StoryEvent } from '../story/interface/runtime-interface';

const IgnoreEvent: { [key: string]: boolean } = {
  mousemove: true,
  mouseout: true,
  mouseover: true
};

const PointerOverEvent: { [key: string]: boolean } = {
  pointerover: true,
  pointerout: true,
  pointermove: true
};

const IgnoreEnds = 'capture';

export class EditAction {
  readonly emitter: EventEmitter = new EventEmitter();

  protected _actionInProgress: ContinuousActionType = null;
  get actionInProgress() {
    return this._actionInProgress;
  }

  protected _boxSelection: BoxSelection;

  constructor(public readonly story: Story) {
    this.richTextPluginEvent();
  }

  lastOverGraphic: {
    characterInfo: ICharacterPickInfo;
    character: ICharacter;
    detailTarget: IGraphic;
  } = null;

  richTextPluginEvent() {
    const plugin = this.story.canvas
      .getStage()
      .pluginService.findPluginsByName('RichTextEditPlugin')[0] as RichTextEditPlugin;
    plugin.registerUpdateListener((type, p) => {
      this.emitter.emit(EditActionEnum.richTextPluginEdit, { type, p });
    });
  }

  onStoryEvent(event: StoryEvent, type: string) {
    if ((IgnoreEvent as any)[type]) {
      return;
    }
    if (type.endsWith(IgnoreEnds)) {
      return;
    }

    this.processOverEvent(event, type);

    // TODO: hack detailPath会被正常删除后，删除这个hack代码
    if (event.detailPath) {
      if (event.path[event.path.length - 1] !== event.detailPath[event.path.length - 1]) {
        delete event.detailPath;
      }
    }

    // 非选中逻辑
    if (!(PickEventType as any)[type]) {
      return this.dispatchAction({
        type: type,
        event
      });
    }

    // 选中逻辑才添加交互元素信息。得到交互元素
    const { characterInfo, character } = this.story.canvas.getEventDetail(event);
    // 单选
    if (type === 'click' && character) {
      type = EditActionEnum.singleSelection;
    } else if (type === 'pointerdown' && !character) {
      // 取消选中
      type = EditActionEnum.unSelection;
    }
    // if (type === EditActionEnum.singleSelection) {
    //   debugger;
    // }
    this.dispatchAction({
      type: type,
      characterId: character?.id,
      character: character,
      event,
      detail: characterInfo
    });
  }

  // graphic over out
  processOverEvent(event: StoryEvent, type: string) {
    if (!PointerOverEvent[type]) {
      return;
    }
    const { characterInfo, character } = this.story.canvas.getEventDetail(event);
    let detailTarget = event.path[event.path.length - 1];
    const detailPath = event.detailPath;
    // 如果存在详细path
    if (detailPath) {
      const detailTargetList = detailPath[detailPath.length - 1];
      if (isArray(detailTargetList)) {
        detailTarget = detailTargetList[detailTargetList.length - 1];
      }
    }
    let actionType = null;
    // 外层 over 必然触发 over
    if (type === 'pointerover') {
      if (character) {
        actionType = EditActionEnum.pointerOverCharacter;
      }
    }
    // 外层 out 必然触发out
    else if (type === 'pointerout') {
      if (
        this.lastOverGraphic &&
        character &&
        character === this.lastOverGraphic.character &&
        detailTarget &&
        detailTarget === this.lastOverGraphic.detailTarget
      ) {
        actionType = EditActionEnum.pointerOutCharacter;
      }
    } else {
      // 外层move,同时没有lastOver，不需要继续判定
      if (!this.lastOverGraphic) {
        return;
      }
      // 如果不是同一个 character out
      if (character !== this.lastOverGraphic.character) {
        actionType = EditActionEnum.pointerOutCharacter;
        // 如果是同一个元素，但是不是同一个target
      } else if (detailTarget !== this.lastOverGraphic.detailTarget) {
        // 先抛出离开
        this.dispatchAction({
          type: EditActionEnum.pointerOutCharacter,
          characterId: this.lastOverGraphic.character?.id,
          character: this.lastOverGraphic.character,
          event,
          detail: this.lastOverGraphic.characterInfo
          // nextAction: {
          //   actionType: EditActionEnum.pointerOverCharacter,
          //   characterId: character?.id,
          //   character: character,
          //   event,
          //   detail: characterInfo
          // }
        } as IEditOverActionInfo);
        actionType = EditActionEnum.pointerOverCharacter;
      } else {
        // 是同一个元素，并且是同一个target
        return;
      }
    }
    if (!actionType) {
      return;
    }
    this.dispatchAction({
      type: actionType,
      characterId: character?.id,
      character: character,
      event,
      detail: characterInfo
    });
    if (actionType === EditActionEnum.pointerOverCharacter) {
      this.lastOverGraphic = { characterInfo, character, detailTarget };
    } else if (actionType === EditActionEnum.pointerOutCharacter) {
      this.lastOverGraphic = null;
    }
  }

  dispatchAction(action: IEditActionInfo) {
    this.emitter.emit('dispatchAction', action);
  }
}
