import { registerCharacter } from './story';

registerCharacter();

export * from './story';
export * from './edit';
export * from './story/utils/vchart-pick';
export * from './story/utils/chart';
export * from './story/utils/layout';
export * from './story/interface/index';
export * from './story/character';
export * from './template/unit';
export * from './edit/edit-component';
export { RichTextEditPlugin } from '@visactor/vrender-core';
