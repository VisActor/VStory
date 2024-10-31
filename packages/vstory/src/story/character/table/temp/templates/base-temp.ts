import type { ITableTemp } from '../interface';
import type { CharacterTable } from '../../character';
import type { DataInfo, StandardData } from '../../../visactor/interface';

export abstract class BaseTemp implements ITableTemp {
  type: string;
  abstract getSpec(data: StandardData, ctx: { character: CharacterTable }, opt?: any): any;
  abstract checkDataEnable(data: StandardData, info: DataInfo, opt?: any): boolean;
  clear() {
    // do nothing
  }

  getType() {
    return this.type;
  }

  afterInitialize(ctx: { character: CharacterTable }) {
    // do nothing
    return;
  }

  standardizedSpec(spec: any, ctx: { character: CharacterTable }) {
    // do nothing
    return;
  }
}
