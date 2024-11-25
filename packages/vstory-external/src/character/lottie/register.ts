import { StoryFactory } from '@visactor/vstory-core';
import { LottieCharacter } from './lottie-character';
import { container } from '@visactor/vrender-core';
import { lottieCanvasPickModule, lottieModule } from '@visactor/vrender-kits';

export function registerLottie() {
  container.load(lottieModule);
  container.load(lottieCanvasPickModule);
  StoryFactory.registerCharacter(LottieCharacter.type, LottieCharacter);
}
