import { container, ContainerModule, GraphicRender, PickServiceInterceptor } from '@visactor/vrender-core';
import { ChartRender, VChartRender } from '../character/chart/graphic/vchart-graphic-render';
import { VChartPicker } from '../character/chart/graphic/vchart-graphic-picker';
import { CanvasPickerContribution } from '@visactor/vrender-kits';
import { VChartPickServiceInterceptorContribution } from '../character/chart/graphic/picker-interceptor';
import { ComponentGroupRender } from '../character/component/graphic/GroupComponent/component-group-graphic-render';

export function registerGraphics() {
  registerVChartGraphic();
}

let _registered = false;
export function registerVChartGraphic() {
  if (_registered) {
    return;
  }
  _registered = true;
  const module = new ContainerModule(bind => {
    // vchart渲染器注入
    bind(VChartRender).toSelf().inSingletonScope();
    bind(ChartRender).toService(VChartRender);
    bind(GraphicRender).toService(ChartRender);

    bind(VChartPicker).toSelf().inSingletonScope();
    bind(CanvasPickerContribution).toService(VChartPicker);
    bind(VChartPickServiceInterceptorContribution).toSelf().inSingletonScope();
    bind(PickServiceInterceptor).toService(VChartPickServiceInterceptorContribution);

    // component渲染器注入
    bind(ComponentGroupRender).toSelf().inSingletonScope();
    bind(GraphicRender).toService(ComponentGroupRender);
  });

  container.load(module);
}
