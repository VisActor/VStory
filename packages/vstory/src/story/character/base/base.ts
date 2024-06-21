import { isValid, merge } from '@visactor/vutils';
import type { ICharacterInitOption, ICharacterPickInfo } from '../runtime-interface';
import type { ICharacter, ICharacterSpec } from '..';
import type { IGroup } from '@visactor/vrender';
import type { StoryEvent } from '../../interface';

export abstract class CharacterBase implements ICharacter {
  readonly id: string;
  protected _spec: ICharacterSpec;
  get spec() {
    return this._spec;
  }

  protected _option: ICharacterInitOption;
  get option() {
    return this._option;
  }

  constructor(spec: ICharacterSpec, option: ICharacterInitOption) {
    this.id = spec.id;
    this._spec = spec;
    this._option = option;
  }
  updateSpec(spec: Omit<Partial<ICharacterSpec>, 'id' | 'type'>): void {
    if (spec.position) {
      this._spec.position = spec.position;
    }
    if (isValid(spec.zIndex)) {
      this._spec.zIndex = spec.zIndex;
    }
    if (spec.options) {
      this._spec.options = merge(this._spec.options ?? {}, spec.options);
    }
  }

  setAttributes(attr: Record<string, any>) {
    throw new Error('请重载setAttributes函数');
  }

  tickTo(t: number): void {
    throw new Error('Method not implemented.');
  }

  init() {
    this._initRuntime();
    this._parserSpec();
    this._initGraphics();
  }

  reset() {
    this.clearCharacter();
    this.init();
  }

  protected abstract _initRuntime(): void;
  protected abstract _parserSpec(): void;
  protected abstract _initGraphics(): void;

  abstract show(): void;
  abstract hide(): void;

  getPositionData() {
    return;
  }

  abstract getGraphicParent(): IGroup;

  abstract clearCharacter(): void;

  abstract checkEvent(event: StoryEvent): false | ICharacterPickInfo;
}
