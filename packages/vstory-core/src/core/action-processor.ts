import type { IProcessorRegistry } from './processorRegistry';
import { globalProcessorRegistry } from './processorRegistry';
import type { IActionProcessor, IActionProcessorItem } from '../interface/action-processor';
import type { ICharacter } from '../interface/character';
import { ICharacterTree } from '../interface/character-tree';
import type { IActionSpec } from '../interface/dsl/dsl';
import type { IStory } from '../interface/story';

export type IProcessorMap = Record<string, Record<string, IActionProcessorItem>>;

export interface IProcessorReturnType {
  totalTime: number;
  revertActionParams?: {
    action: string;
    payload: Record<string, any>;
  };
}

export class ActionProcessor implements IActionProcessor {
  protected _processorRegistry: IProcessorRegistry;

  protected _story: IStory;

  constructor(story: IStory, processorRegistry: IProcessorRegistry = globalProcessorRegistry) {
    this._processorRegistry = processorRegistry;
    this._story = story;
  }

  /**
   * 添加Action，根据Action中的characterId添加对应的characterActions实例
   * @param action
   */
  getActInfo(
    characterId: string,
    action: IActionSpec
  ): {
    startTime: number;
    duration: number;
  } | null {
    const character = this._story.getCharacterById(characterId);
    if (!character) {
      console.error(`获取character失败，请检查 ${characterId} 是否存在`);
      return null;
    }
    const processor = this.getProcessor(character.config.type, action.action);

    if (!processor) {
      console.error(`获取processor失败，请检查 ${character.config.type} 是否支持 ${action.action}`);
      return null;
    }
    return processor.getStartTimeAndDuration(action, character);
  }

  getProcessorList(name: string): IActionProcessorItem[] {
    return Object.values(this._processorRegistry.getProcessors(name));
  }

  getProcessor(name: string, actionName: string): IActionProcessorItem {
    return this._processorRegistry.getProcessor(name, actionName);
  }

  /**
   * Execute action
   * @param name
   * @param actionName
   * @param actionParams
   * @returns IProcessorReturnType
   */
  doAction(name: string, actionName: string, character: ICharacter, actionSpec: IActionSpec): void {
    const processor = this.getProcessor(name, actionName);
    if (processor) {
      const actionResult = processor.run(character, actionSpec);
      return actionResult;
    }
    // eslint-disable-next-line no-console
    console.error(`Action not found: character => ${name}, action => ${actionName} `);
    return undefined;
  }

  release() {
    this._processorRegistry = null;
    this._story = null;
  }
}
