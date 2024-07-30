import type { ICharacter } from '../../story/character';
import type { IAction, IStory } from '../../story/interface';
import { IActionsLink } from '../../story/interface';
import { logger } from '../../util/output';
import type { IActionProcessor, IActionProcessorItem } from './interface/action-processor';

export type IProcessorMap = Record<string, Record<string, IActionProcessorItem>>;

export interface IProcessorReturnType {
  totalTime: number;
  revertActionParams?: {
    action: string;
    payload: Record<string, any>;
  };
}

export class ActionProcessor implements IActionProcessor {
  protected _processorMap: Map<string, Record<string, IActionProcessorItem>>;

  private static _instance: ActionProcessor = null;
  protected _story: IStory;

  constructor(story: IStory, processorMap?: IProcessorMap) {
    if (!ActionProcessor._instance) {
      this.init(story, processorMap);
      ActionProcessor._instance = this;
    }
    return ActionProcessor._instance;
  }

  protected init(story: IStory, processorMap?: IProcessorMap) {
    this._processorMap = new Map();
    if (processorMap) {
      for (const key in processorMap) {
        logger('info', `register ${key} processor.`); // TODO: remove log
        this.registerProcessor(key, processorMap[key]);
      }
    }
    this._story = story;
  }

  /**
   * 添加Action，根据Action中的characterId添加对应的characterActions实例
   * @param action
   */
  getActInfo(
    characterId: string,
    action: IAction
  ): {
    startTime: number;
    duration: number;
  } | null {
    const character = this._story.getCharactersById(characterId);
    if (!character) {
      logger('error', `获取character失败，请检查 ${characterId} 是否绑定到一个合法的character`);
      return null;
    }

    const processor = this.getProcessor(character.spec.type, action.action);

    return processor.getStartTimeAndDuration(action);

    // characterActions.forEach(action => {
    //   const processor = this.getProcessor(character.spec.type, action.action);
    // });
  }

  /**
   *
   * @param name 操作对象名称
   * @param processors 操作对象支持的 processor
   * @returns boolean 注册是否成功
   */
  registerProcessor(name: string, processors: Record<string, IActionProcessorItem>) {
    if (!this._processorMap) {
      return false;
    }
    // 重复注册，目前直接替代
    this._processorMap.set(name, processors);
    return true;
  }

  getProcessorList(name: string) {
    return this._processorMap && this._processorMap.get(name);
  }

  getProcessor(name: string, actionName: string) {
    return this._processorMap && this._processorMap.get(name)?.[actionName];
  }

  /**
   * Execute action
   * @param name
   * @param actionName
   * @param actionParams
   * @returns IProcessorReturnType
   */
  doAction(name: string, actionName: string, character: ICharacter, actionSpec: IAction): void {
    const processor = this.getProcessor(name, actionName);
    if (processor) {
      // eslint-disable-next-line no-console
      logger('info', `Execute action => ${actionName}, character => ${name}`); // TODO: remove log
      const actionResult = processor.run(character, actionSpec);
      // eslint-disable-next-line no-console
      logger('info', `Action Executed:`, actionResult); // TODO: remove log
      return actionResult;
    }
    // eslint-disable-next-line no-console
    logger('error', `Action not found: character => ${name}, action => ${actionName} `); // TODO: remove log
    return undefined;
  }

  release() {
    ActionProcessor._instance = null;

    if (this._processorMap) {
      this._processorMap.clear();
      this._processorMap = null;
    }
  }
}
