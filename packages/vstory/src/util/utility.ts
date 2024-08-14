import { isArray, maxInArray } from '@visactor/vutils';
import type { ISceneSpec, IActionSpec } from '../story/interface';
import { logger } from './output';

function getActionEndTime(action: IActionSpec) {
  const { startTime = 0, payload = {} } = action;
  const { duration = 0 } = payload.animation ?? {};
  return startTime + duration;
}

function getActionsEndTime(actions: IActionSpec[]) {
  let endTime = 0;

  for (const action of actions) {
    const actionEndTime = getActionEndTime(action);
    if (actionEndTime > endTime) {
      endTime = actionEndTime;
    }
  }

  return endTime;
}

export function getSceneEndTime(scene: ISceneSpec): number {
  if (!scene || !scene.actions || scene.actions.length === 0) {
    return 0;
  }
  const { delay = 0 } = scene;
  let endTime = 0;

  for (const action of scene.actions) {
    for (const characterActions of action.characterActions) {
      const actionEndTime = getActionEndTime(characterActions);
      if (actionEndTime > endTime) {
        endTime = actionEndTime;
      }
    }
  }

  return endTime + delay;
}

export function at(startTime: number, characterId: string, action: IActionSpec, scene: ISceneSpec) {
  const characterAction = {
    ...action,
    startTime
  };
  if (!scene.actions) {
    scene.actions = [];
  }

  scene.actions.push({
    characterId,
    characterActions: [characterAction]
  });
}

export function after(
  targetCharacterId: string,
  characterId: string,
  action: IActionSpec,
  scene: ISceneSpec,
  delay = 0
) {
  const targetCharacter = scene.actions?.filter(
    action =>
      action.characterId === targetCharacterId ||
      (isArray(action.characterId) && action.characterId.includes(targetCharacterId))
  );

  if (!targetCharacter || targetCharacter.length === 0) {
    logger('warn', `Target character ${targetCharacterId} not found in scene`);
  }
  const targetEndTime = maxInArray(targetCharacter.map(action => getActionsEndTime(action.characterActions)));
  at(targetEndTime + delay, characterId, action, scene);
}
