import { isNumber } from '@visactor/vutils';
import type { IAction, IActSpec, ISceneSpec } from '../story/interface';
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
  actionSpec: IAction;
  characterId: string;
}

class ActionItem implements IActionItem {
  startTime: number;
  duration: number;
  actionSpec: IAction;
  characterId: string;

  constructor(st: number, d: number, as: IAction, ci: string) {
    this.startTime = st;
    this.duration = d;
    this.actionSpec = as;
    this.characterId = ci;
  }
}

export class Scheduler implements IScheduler {
  protected _actionProcessor: IActionProcessor;
  protected _actsInfo: IActInfo[];

  constructor(actionProcessor: IActionProcessor) {
    this._actionProcessor = actionProcessor;
  }

  // static formatTimeInAction(time: number, action: IActInfo): number {
  //   const { duration } = action;
  //   if (time < startTime) {
  //     return time;
  //   }
  //   if (startTime + duration <= 0) {
  //     return time;
  //   }
  //   while (time > startTime + duration) {
  //     time -= startTime + duration;
  //   }
  //   return time;
  // }

  findActByTime(t: number) {
    // 规范化t
    const totalTime = this._actsInfo.reduce((t, actInfo) => Math.max(t, actInfo.startTime + actInfo.duration), 0);
    if (totalTime <= 0) {
      return {
        actInfo: this._actsInfo[0],
        t: 0
      };
    }
    while (t > totalTime) {
      t -= totalTime;
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
    }
    // const formatFromTime = Scheduler.formatTimeInAction(fromTime, toAct);
    // const formatToTime = Scheduler.formatTimeInAction(toTime, toAct);

    const actions: IActionItem[] = [];
    toAct.sceneInfoList.forEach(sceneInfo => {
      const { startTime: sceneStartTime } = sceneInfo;
      sceneInfo.actionList.forEach(actionInfo => {
        const startTime = sceneStartTime + actionInfo.startTime;
        if (startTime >= formatFromTime && startTime < formatToTime) {
          actions.push(actionInfo);
        }
      });
    });

    return actions;
  }

  initActs(acts: IActSpec[]) {
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
      const sceneInfo = this._getSceneInfo(scene, sceneStartTime);
      sceneStartTime = sceneInfo.startTime + (scene.delay ?? 0) + sceneInfo.duration;
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
        const info = this._actionProcessor.getActInfo(action.characterId, ca);
        if (!info) {
          return;
        }
        const item = new ActionItem(info.startTime, info.duration, ca, action.characterId);

        character_st = Math.max(Math.min(item.startTime, character_st), 0);
        character_et = Math.max(item.startTime + item.duration, character_et);
        actionList.push(item);
      });

      scene_st = !actIdx ? character_st : Math.max(Math.min(character_st, scene_st), 0);
      scene_et = !actIdx ? character_et : Math.max(character_et, scene_et);
    });

    const sceneInfo: ISceneInfo = {
      startTime: sceneStartTime + scene_st,
      duration: sceneStartTime + scene_et - scene_st,
      id: scene.id,
      actionList
    };

    return sceneInfo;
  }
}
