export { registerVChartAddAction } from './add';
export { registerVChartUpdateAction } from './update';
export { registerVChartVisibilityAction } from './visibility';
import { registerVChartAddAction } from './add';
import { registerVChartUpdateAction } from './update';
import { registerVChartVisibilityAction } from './visibility';
import { registerWaveScatterVisibilityAction } from './waveScatter/visibility';

export function registerVChartAction() {
  registerVChartAddAction();
  registerVChartUpdateAction();
  registerVChartVisibilityAction();
  registerWaveScatterVisibilityAction();
}
