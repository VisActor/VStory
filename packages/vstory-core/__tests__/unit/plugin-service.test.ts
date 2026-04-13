import { createCanvas, createImageData, loadImage } from 'canvas';
import { Player } from '../../src/core/player';
import { Story } from '../../src/core/story';
import type { IPlugin, IPluginService } from '../../src/interface/plugin-service';
import { initVR } from '../../src/module/vrender';

class TestPlugin implements IPlugin {
  name = 'TestPlugin';
  activeEvent: 'onRegister' = 'onRegister';
  activatedStory: Story | null = null;
  deactivated = false;

  activate(context: IPluginService): void {
    this.activatedStory = context.story as Story;
  }

  deactivate(): void {
    this.deactivated = true;
  }
}

describe('PluginService', () => {
  beforeAll(() => {
    initVR('node', { createCanvas, createImageData, loadImage, Resvg: undefined });
  });

  it('should provide story context for plugins registered after story creation', () => {
    const canvas = createCanvas(320, 240);
    const story = new Story(null, { canvas, width: 320, height: 240, background: 'white' });
    const player = new Player(story);
    story.init(player);

    const plugin = new TestPlugin();
    story.pluginService.register(plugin);

    expect(plugin.activatedStory).toBe(story);

    story.release();

    expect(plugin.deactivated).toBe(true);
  });
});
