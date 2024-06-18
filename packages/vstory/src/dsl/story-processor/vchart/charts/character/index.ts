import { characterAppearProcessor } from './characterAppear';
import { characterDisappearProcessor } from './characterDisappear';

export { characterDisappearProcessor } from './characterDisappear';
export { characterAppearProcessor } from './characterAppear';

export const characterProcessorMap = {
  appear: characterAppearProcessor,
  disappear: characterDisappearProcessor
};
