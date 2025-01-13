import type { IComponentCharacterRuntime, ICharacterComponent } from '@visactor/vstory-core';
import { BaseRuntime, RuntimeStore } from '@visactor/vstory-core';
// import loading1 from './lottie-files/loading1'
import { loading1 } from './lottie-file/loading1';
import { loading2 } from './lottie-file/loading2';
import { loading3 } from './lottie-file/loading3';

const builtinLottieMap: Record<string, any> = {
  loading1,
  loading2,
  loading3
};

export class LottieRuntime extends BaseRuntime implements IComponentCharacterRuntime {
  type = 'Lottie';
  applyConfigToAttribute(character: ICharacterComponent): void {
    super.applyConfigToAttribute(character);
    const rawAttribute = character.getAttribute();

    const { data } = rawAttribute.graphic;
    // 放一个默认的lottie
    const builtData = builtinLottieMap[data];
    if (builtData) {
      rawAttribute.graphic.data = builtData;
    }
    // TODO 目前VRender有问题，必须配置fill才能绘制
    rawAttribute.graphic.fill = true;
  }
}

export const LottieRuntimeInstance = new LottieRuntime();
RuntimeStore.register(LottieRuntimeInstance);
