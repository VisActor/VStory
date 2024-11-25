import type { IActionSpec, ICharacter } from '@visactor/vstory-core';
import { globalProcessorRegistry } from '@visactor/vstory-core';
import type { IGraphic } from '@visactor/vrender-core';
import {
  ACTION_TYPE,
  CommonBounceActionProcessor,
  CommonMoveToActionProcessor,
  CommonScaleToActionProcessor,
  CommonStyleActionProcessor,
  CommonVisibilityActionProcessor,
  getCharacterByEffect
} from '@visactor/vstory-player';
import { LOTTIE } from '../../character/lottie/constant';

function runLottieAnimate(character: ICharacter, effect: string) {
  const graphics = getCharacterByEffect(character, effect) as IGraphic[];
  graphics.forEach((graphic: any) => _runLottieAnimate(graphic));
}

function _runLottieAnimate(graphic: IGraphic) {
  if (graphic && graphic.type !== 'text' && graphic.type !== 'richtext') {
    if (graphic.lottieInstance) {
      graphic.lottieInstance.stop();
      graphic.lottieInstance.play();
    }
  }
}

export class LottieVisibilityActionProcessor extends CommonVisibilityActionProcessor {
  name: string = 'appearOrDisAppear';
  constructor() {
    super();
  }

  run(character: ICharacter, actionSpec: IActionSpec): void {
    super.run(character, actionSpec);
    runLottieAnimate(character, actionSpec.action);
  }
}

export function registerLottieVisibilityAction() {
  globalProcessorRegistry.registerProcessor(LOTTIE, {
    [ACTION_TYPE.APPEAR]: new LottieVisibilityActionProcessor(),
    [ACTION_TYPE.DISAPPEAR]: new LottieVisibilityActionProcessor(),
    [ACTION_TYPE.STYLE]: new CommonStyleActionProcessor(),
    [ACTION_TYPE.MOVETO]: new CommonMoveToActionProcessor(),
    [ACTION_TYPE.SCALETO]: new CommonScaleToActionProcessor(),
    [ACTION_TYPE.BOUNCE]: new CommonBounceActionProcessor()
  });
}
