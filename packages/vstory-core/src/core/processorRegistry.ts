import type { IActionProcessorItem } from '../interface/action-processor';

export interface IProcessorRegistry {
  registerProcessor: (characterType: string, processor: Record<string, any>) => void;
  getProcessor: (characterType: string, action: string) => IActionProcessorItem;
  getProcessors: (characterType: string) => Record<string, IActionProcessorItem>;
}

export class ProcessorRegistry {
  private _processorMap: Map<string, Record<string, IActionProcessorItem>> = new Map();
  registerProcessor(characterType: string, processor: Record<string, IActionProcessorItem>) {
    if (!this._processorMap.has(characterType)) {
      this._processorMap.set(characterType, {});
    }
    const processorMap = this._processorMap.get(characterType);
    for (const key in processor) {
      processorMap[key] = processor[key];
    }
  }
  getProcessor(characterType: string, action: string) {
    if (!this._processorMap.has(characterType)) {
      return null;
    }
    const processorMap = this._processorMap.get(characterType);
    if (!processorMap[action]) {
      return null;
    }
    return processorMap[action];
  }
  getProcessors(characterType: string) {
    if (!this._processorMap.has(characterType)) {
      return null;
    }
    const processorMap = this._processorMap.get(characterType);
    return processorMap;
  }
}

export const globalProcessorRegistry = new ProcessorRegistry();
