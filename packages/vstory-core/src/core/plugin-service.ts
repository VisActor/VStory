import type { IPlugin, IPluginService } from '../interface/plugin-service';
import type { IStory } from '../interface/story';

export class DefaultPluginService implements IPluginService {
  declare onStartupFinishedPlugin: IPlugin[];
  declare onRegisterPlugin: IPlugin[];
  declare story: IStory;
  declare actived: boolean;

  constructor() {
    this.onStartupFinishedPlugin = [];
    this.onRegisterPlugin = [];
    this.actived = false;
  }

  active(story: IStory, params: { pluginList?: IPlugin[] }) {
    this.story = story;
    this.actived = true;

    // 启动插件
    const { pluginList } = params;
    pluginList &&
      pluginList.forEach(p => {
        this.register(p);
      });
  }

  findPluginsByName(name: string): IPlugin[] {
    const arr: IPlugin[] = [];
    this.onStartupFinishedPlugin.forEach(plugin => {
      if (plugin.name === name) {
        arr.push(plugin);
      }
    });
    this.onRegisterPlugin.forEach(plugin => {
      if (plugin.name === name) {
        arr.push(plugin);
      }
    });
    return arr;
  }

  register(plugin: IPlugin) {
    if (plugin.activeEvent === 'onStartupFinished') {
      this.onStartupFinishedPlugin.push(plugin);
    } else if (plugin.activeEvent === 'onRegister') {
      this.onRegisterPlugin.push(plugin);
      plugin.activate(this);
    }
  }
  unRegister(plugin: IPlugin) {
    if (plugin.activeEvent === 'onStartupFinished') {
      this.onStartupFinishedPlugin.splice(this.onStartupFinishedPlugin.indexOf(plugin), 1);
    } else if (plugin.activeEvent === 'onRegister') {
      this.onRegisterPlugin.splice(this.onStartupFinishedPlugin.indexOf(plugin), 1);
    }
    plugin.deactivate(this);
  }

  release(...params: any): void {
    this.onStartupFinishedPlugin.forEach(plugin => {
      plugin.deactivate(this);
    });
    this.onStartupFinishedPlugin = [];
    this.onRegisterPlugin.forEach(plugin => {
      plugin.deactivate(this);
    });
    this.onRegisterPlugin = [];
  }
}
