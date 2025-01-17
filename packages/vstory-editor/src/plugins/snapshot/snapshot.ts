import { Generator } from '@visactor/vrender-core';
import type { ICharacter, IPlugin, IPluginService } from '@visactor/vstory-core';
import { Events, SetConfigMode } from '@visactor/vstory-core';
import { SnapshotManager } from './SnapshotManager';
import { clone } from '@visactor/vutils';

export class SnapshotPlugin implements IPlugin {
  name: 'SnapshotPlugin' = 'SnapshotPlugin';
  activeEvent: 'onRegister' = 'onRegister';
  pluginService: IPluginService;
  _uid: number = Generator.GenAutoIncrementId();
  key: string = this.name + this._uid;
  snapShotManager: SnapshotManager;
  tempCharacterSet: Map<string, { timer: number; config: any }> = new Map();
  debounceTime: number = 100;

  onBeforeSetConfig = (_params: { config: any; character: ICharacter; params: any }) => {
    const { config, character, params = {} } = _params;
    const { mode } = params;
    if (mode === SetConfigMode.animate) {
      return;
    }
    let tempConfig;
    const data = this.tempCharacterSet.get(character.id);
    if (data) {
      clearTimeout(data.timer);
      tempConfig = data.config;
    } else {
      tempConfig = clone(character.config);
    }
    this.tempCharacterSet.set(character.id, {
      config: tempConfig,
      timer: setTimeout(() => {
        this.tempCharacterSet.delete(id);
        this.snapShotManager.pushSnapshot({
          id: Generator.GenAutoIncrementId(),
          timestamp: Date.now(),
          characterId: id,
          diffConfig: config
        });
      }, this.debounceTime) as any
    });
    const id = character.id;
  };

  onAfterSetConfig = (_params: { config: any; character: ICharacter; params: any }) => {
    // const { config, character, params={} } = _params;
    // const { mode } = params;
    // if (mode === SetConfigMode.animate) {
    //   return;
    // }
    // // const diffConfig = diff
    // // diff
    // this.snapShotManager.pushSnapshotNextTick({
    //   id: Generator.GenAutoIncrementId(),
    //   timestamp: Date.now(),
    //   characterId: character.id,
    //   diffConfig: config
    // });
    // this.tempConfig = null;
    return;
  };

  activate(context: IPluginService): void {
    this.pluginService = context;
    this.snapShotManager = new SnapshotManager();
    this.pluginService.story.on(Events.BEFORE_SET_CONFIG, this.onBeforeSetConfig);
    this.pluginService.story.on(Events.AFTER_SET_CONFIG, this.onAfterSetConfig);
  }

  deactivate(context: IPluginService): void {
    this.pluginService.story.off(Events.BEFORE_SET_CONFIG, this.onBeforeSetConfig);
    this.pluginService.story.off(Events.AFTER_SET_CONFIG, this.onAfterSetConfig);
    this.snapShotManager.release();
    this.snapShotManager = null;
  }
}
