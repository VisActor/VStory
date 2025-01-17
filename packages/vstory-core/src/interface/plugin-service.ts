import type { Releaseable } from '@visactor/vrender-core';
import type { IStory } from './story';

export interface IPluginService extends Releaseable {
  register: (plugin: IPlugin) => void;
  unRegister: (plugin: IPlugin) => void;
  active: (story: IStory, params: { pluginList?: IPlugin[] }) => void;
  actived: boolean;
  story: IStory;
  findPluginsByName: (name: string) => IPlugin[];
}

export interface IPlugin {
  name: string;
  activeEvent: 'onStartupFinished' | 'onRegister';
  activate: (context: IPluginService) => void;
  deactivate: (context: IPluginService) => void;
}
