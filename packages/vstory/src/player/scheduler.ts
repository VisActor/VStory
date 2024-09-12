import { cloneDeep, isNumber, isString } from '@visactor/vutils';
import type { IActionSpec, IActSpec, ISceneSpec } from '../story/interface';
import { IStory } from '../story/interface';
import type { IActionProcessor } from './processor/interface/action-processor';
import type { IScheduler } from './interface/scheduler';

interface IActInfo {
  startTime: number;
  duration: number;
  id: string;
  sceneInfoList: ISceneInfo[];
}
interface ISceneInfo {
  startTime: number;
  duration: number;
  id: string;
  actionList: IActionItem[];
}

export interface IActionItem {
  startTime: number;
  duration: number;
  actionSpec: IActionSpec;
  characterId: string;
}

class ActionItem implements IActionItem {
  startTime: number;
  duration: number;
  actionSpec: IActionSpec;
  characterId: string;

  constructor(st: number, d: number, as: IActionSpec, ci: string) {
    this.startTime = st;
    this.duration = d;
    this.actionSpec = as;
    this.characterId = ci;
  }
}

export class Scheduler implements IScheduler {
  protected _actionProcessor: IActionProcessor;
  protected _actsInfo: IActInfo[];
  protected _runnedAct: Set<IActionItem>;
  protected _actSpec: IActSpec[];

  constructor(actionProcessor: IActionProcessor) {
    this._actionProcessor = actionProcessor;
    this._runnedAct = new Set();
    this._actSpec = [
      {
        id: 'defaultAct',
        scenes: [
          {
            id: 'defaultScene',
            actions: []
          }
        ]
      }
    ];
  }

  init(acts: IActSpec[]) {
    // 重新设置所有属性
    this.clearState();
    this._actsInfo = [];
    this._runnedAct.clear();

    this.initActs(acts);
    this._actSpec = cloneDeep(acts);
  }

  addAction(sceneId: string, characterId: string, actions: IActionSpec[]) {
    const scene = sceneId ? this.findScene(sceneId) : this.getScenes()[0];
    if (!scene) {
      return;
    }
    scene.actions.push({
      characterId,
      characterActions: actions
    });
    this.init(this._actSpec);
  }

  removeCharacterActions(characterId: string) {
    for (let i = 0; i < this._actSpec.length; i++) {
      for (let j = 0; j < this._actSpec[i].scenes.length; j++) {
        const scene = this._actSpec[i].scenes[j];
        scene.actions = scene.actions.filter(a => a.characterId !== characterId);
      }
    }
    this.init(this._actSpec);
  }

  clearState(): void {
    this._runnedAct.clear();
  }

  getTotalTime(): number {
    if (!this._actsInfo) {
      return 0;
    }
    return this._actsInfo.reduce((t, actInfo) => Math.max(t, actInfo.startTime + actInfo.duration), 0);
  }

  findActByTime(t: number) {
    if (!this._actsInfo) {
      return {
        actInfo: null,
        t: 0
      };
    }
    // 规范化t
    const totalTime = this.getTotalTime();
    if (totalTime <= 0) {
      return {
        actInfo: this._actsInfo[0],
        t: 0
      };
    }
    for (let i = 0; i < this._actsInfo.length; i++) {
      const actInfo = this._actsInfo[i];
      if (actInfo.startTime <= t && actInfo.startTime + actInfo.duration > t) {
        return {
          actInfo: actInfo,
          t: t - actInfo.startTime
        };
      }
    }
    return {
      actInfo: this._actsInfo[this._actsInfo.length - 1],
      t: t - this._actsInfo[this._actsInfo.length - 1].startTime
    };
  }

  /**
   * 获取某个时间区间的所有Action，toTime实际上是当前时间，fromTime是上一次的时间
   * 避免跳帧
   * @param fromTime 上一次的时间
   * @param toTime 当前时间
   */
  getActionsInRange(fromTime: number, toTime: number) {
    // 先找到目前是在哪个幕中
    const { actInfo: fromAct, t: formatFromTime } = this.findActByTime(fromTime);
    const { actInfo: toAct, t: formatToTime } = this.findActByTime(toTime);
    if (fromAct !== toAct) {
      // TODO 跳帧了
    } else if (!(fromAct && toAct)) {
      return [];
    }
    // const formatFromTime = Scheduler.formatTimeInAction(fromTime, toAct);
    // const formatToTime = Scheduler.formatTimeInAction(toTime, toAct);

    const actions: IActionItem[] = [];
    toAct.sceneInfoList.forEach(sceneInfo => {
      const { startTime: sceneStartTime } = sceneInfo;
      sceneInfo.actionList.forEach(actionInfo => {
        const startTime = sceneStartTime + actionInfo.startTime;
        if (startTime <= formatToTime) {
          if (!this._runnedAct.has(actionInfo)) {
            this._runnedAct.add(actionInfo);
            actions.push(actionInfo);
          }
        }
      });
    });
    // actions.length && console.log('找到', fromTime, toTime, actions);
    return actions;
  }

  protected initActs(acts: IActSpec[]) {
    // act与act之间是串联的
    let startTime = 0;
    this._actsInfo = acts.map(act => {
      const actInfo = this._getActInfo(act, startTime);
      startTime += actInfo.duration;
      return actInfo;
    });
  }

  protected _getActInfo(act: IActSpec, actStartTime: number): IActInfo {
    let sceneStartTime = 0;
    const sceneInfoList = act.scenes.map(scene => {
      const sceneInfo = this._getSceneInfo(scene, sceneStartTime + (scene.delay ?? 0));
      sceneStartTime = sceneInfo.startTime + sceneInfo.duration;
      return sceneInfo;
    });
    const startTime = sceneInfoList.reduce((st, info) => Math.min(info.startTime, st), 0);
    const endTime = sceneInfoList.reduce((et, info) => Math.max(info.startTime + info.duration, et), 0);
    return {
      startTime: actStartTime,
      duration: startTime + endTime - startTime,
      id: act.id,
      sceneInfoList
    };
  }

  protected _getSceneInfo(scene: ISceneSpec, sceneStartTime: number): ISceneInfo {
    let scene_st = 0;
    let scene_et = 0;
    const actionList: IActionItem[] = [];
    scene.actions.forEach((action, actIdx) => {
      let character_st = Infinity;
      let character_et = -Infinity;
      action.characterActions.forEach(ca => {
        const characterIdList = isString(action.characterId) ? [action.characterId] : action.characterId;
        characterIdList.forEach(characterId => {
          const info = this._actionProcessor.getActInfo(characterId, ca);
          if (!info) {
            return;
          }
          const item = new ActionItem(info.startTime, info.duration, ca, characterId);

          character_st = Math.max(Math.min(item.startTime, character_st), 0);
          character_et = Math.max(item.startTime + item.duration, character_et);
          actionList.push(item);
        });
      });

      scene_st = !actIdx ? character_st : Math.max(Math.min(character_st, scene_st), 0);
      scene_et = !actIdx ? character_et : Math.max(character_et, scene_et);
    });

    const sceneInfo: ISceneInfo = {
      startTime: sceneStartTime,
      duration: scene_et,
      id: scene.id,
      actionList
    };

    return sceneInfo;
  }

  findScene(id: string): ISceneSpec | null {
    for (let i = 0; i < this._actSpec.length; i++) {
      const act = this._actSpec[i];
      for (let j = 0; j < act.scenes.length; j++) {
        const scene = act.scenes[j];
        if (scene.id === id) {
          return scene;
        }
      }
    }
    return null;
  }

  getScenes(): ISceneSpec[] {
    if (!this._actSpec) {
      return [];
    }
    const scenes: ISceneSpec[] = [];
    for (let i = 0; i < this._actSpec.length; i++) {
      const act = this._actSpec[i];
      scenes.push(...act.scenes);
    }
    return scenes;
  }

  toDSL(): IActSpec[] {
    return this._actSpec;
  }
}
