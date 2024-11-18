// import { merge } from '@visactor/vutils';
// import type { IVChart } from '@visactor/vchart';
// import type { IChartCharacterRuntime } from '../interface/runtime';
// import type { ICharacterChart } from '../interface/character-chart';

// export class ScatterBarRuntime implements IChartCharacterRuntime {
//   type = 'ScatterBar';

//   protected declare _character: ICharacterChart;

//   constructor(character: ICharacterChart) {
//     this._character = character;
//   }

//   applyConfigToAttribute(): void {
//     const rawAttribute = this._character.getAttribute();
//     const { spec } = rawAttribute;
//     const config = this._character.config as any;
//     const {
//       xField,
//       yField
//     } = config.options;
//     merge(spec, {
//       xField,
//       yField,
//     });
//   }

//   afterInitialize(vchart: IVChart) {
//     // console.log('aaaaaaaaaa');
//     return;
//   }
// }
