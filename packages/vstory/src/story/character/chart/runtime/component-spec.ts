import { merge, isValid } from '@visactor/vutils';
import type { IComponentConfig } from '../../dsl-interface';
import type { CharacterChart } from '../character';
import type { IChartCharacterRuntime } from './interface';
import { ChartSpecMatch } from './utils';

export class ComponentSpecRuntime implements IChartCharacterRuntime {
  type = 'ComponentSpec';

  protected declare _character: CharacterChart;

  constructor(character: CharacterChart) {
    this._character = character;
  }

  onSpecReady() {
    const rawSpec = this._character.specProcess.getVisSpec();
    const options = this._character.specProcess.getCharacterConfig().options;
    if (!options) {
      return;
    }
    // const componentSpec = options.componentSpec;
    // componentSpec?.forEach(cSpec => {
    //   if (cSpec.specKey === 'axes') {
    //     this._mergeAxesSpec(rawSpec, cSpec);
    //   } else {
    //     this._mergeComponentSpec(rawSpec, cSpec, cSpec.specKey);
    //   }
    // });
  }

  protected _mergeAxesSpec(rawSpec: any, componentSpec: IComponentConfig) {
    this._mergeComponentSpec(
      rawSpec,
      componentSpec,
      'axes',
      (a: any, index: number, _componentSpec: IComponentConfig) => {
        return a.orient === componentSpec.matchInfo.orient;
      }
    );
  }

  protected _mergeComponentSpec(
    rawSpec: any,
    componentSpec: IComponentConfig,
    key: string,
    additionalMatch?: (rawComponentSpec: any, index: number, componentSpec: IComponentConfig) => boolean
  ) {
    if (!rawSpec[key]) {
      rawSpec[key] = [];
    }
    const s = rawSpec[key].find((a: any, index: number) => {
      if (ChartSpecMatch(a, index, componentSpec.matchInfo)) {
        return true;
      }
      if (additionalMatch) {
        return additionalMatch(a, index, componentSpec);
      }
      return false;
    });
    if (s) {
      merge(s, componentSpec.spec);
    } else {
      rawSpec[key].push(componentSpec.spec);
    }
  }

  afterInitializeChart() {
    //
  }
  afterVRenderDraw() {
    //
  }
}
