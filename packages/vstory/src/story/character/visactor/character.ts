/* eslint-disable no-console */
import type { ICharacterConfig } from 'src/story/character/dsl-interface';
import { CharacterBase } from '../base/base';
import type { ISpecProcess, ICharacterVisactor } from './interface';
import type { ICharacterInitOption } from '../runtime-interface';
import type { IChartCharacterRuntime } from '../chart/runtime/interface';
import { getLayoutFromWidget } from '../../utils/layout';

export abstract class CharacterVisactor extends CharacterBase implements ICharacterVisactor {
  protected declare _specProcess: ISpecProcess;
  get specProcess() {
    return this._specProcess;
  }
  get dataTempTransform() {
    return this._specProcess.dataTempTransform;
  }

  get chartType() {
    return this._specProcess.dataTempTransform.specTemp?.getType();
  }

  get tempType() {
    return this._specProcess.dataTempTransform.specTemp?.type;
  }

  protected _runtime: IChartCharacterRuntime[] = [];

  constructor(spec: ICharacterConfig, option: ICharacterInitOption) {
    super(spec, option);
    this._initSpecProcess();
  }

  protected _initRuntime(): void {
    return;
  }

  clearConfig(opt: { clearCurrent: false | { [key: string]: any } }) {
    // do nothing
  }

  clearCharacter(): void {
    this._graphic.release();
  }

  protected _initSpecProcess(): void {
    return;
  }

  onConfigReady = (config?: any) => {
    if (!(config && config.options)) {
      return;
    }
    console.log('onConfigReady !');
    this._runtime.forEach(r => r.onConfigReady?.());
    this._specProcess.dataTempTransform.specTemp?.standardizedSpec(this._specProcess.getVisSpec(), { character: this });
    this._updateVisactorSpec();
    this._afterRender();
  };

  protected _afterRender(): void {
    return;
  }

  protected abstract _updateVisactorSpec(): void;

  show(): void {
    this._graphic.show();
  }
  hide(): void {
    this._graphic.hide();
  }

  getGraphicParent() {
    // TODO 这里不对，但是历史逻辑是这样的，后续要改成真正的parent
    return this._graphic.graphic;
  }

  getViewBoxFromSpec() {
    const layout = getLayoutFromWidget(this._config.position);
    const viewBox = {
      x1: layout.x,
      x2: layout.x + layout.width,
      y1: layout.y,
      y2: layout.y + layout.height
    };
    return { layout, viewBox };
  }

  getLayoutBounds() {
    const { viewBox } = this.getViewBoxFromSpec();
    return viewBox;
  }

  tickTo(t: number): void {
    return;
  }

  release() {
    this._specProcess.release();
    this._graphic?.parent?.removeChild(this._graphic);
    this._specProcess = this._graphic = null;
  }
}
