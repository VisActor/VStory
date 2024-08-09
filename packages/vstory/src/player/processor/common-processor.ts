import type { EasingType, IGraphic } from '@visactor/vrender-core';
import { canDoGraphicAnimation } from './component/utils';
import type { IMoveOutParams } from '../../dsl/story-processor/graphic/effect/disappear';
import type { ICharacter } from '../../story/character';
import type { IMoveParams } from './interface/appear-action';

export function moveOut(character: ICharacter, animation: IMoveParams, effect: string) {
  const graphic = getCharacterParentGraphic(character);
  _moveOut(graphic, animation as any);
}
export function _moveOut(graphic: IGraphic, params: IMoveParams) {
  if (!canDoGraphicAnimation(graphic, params)) {
    return false;
  }
  const { move = {} } = params;
  const to = move.pos ?? params.pos ?? 1;
  const duration = move.duration ?? params.duration;
  const easing = move.easing ?? params.easing;
  const isVariableSpeed = move.isVariableSpeed ?? true;

  // 图形宽高
  const width = Math.abs(graphic.AABBBounds.x2 - graphic.AABBBounds.x1);
  const height = Math.abs(graphic.AABBBounds.y2 - graphic.AABBBounds.y1);

  let toX = graphic.attribute.x;
  let toY = graphic.attribute.y;
  if (isVariableSpeed) {
    // 同时抵达边缘, 速度不同.
    switch (to) {
      case 'right':
        // 画布容器宽度
        toX = graphic.parent.width;
        break;
      case 'left':
        // 负的图形宽度
        toX = -width;
        break;
      case 'bottom':
        // 容器高度 + 图形高度
        toY = graphic.parent.height + height;
        break;
      case 'top':
        // 负的图形高度
        toY = -height;
        break;
    }
  } else {
    // 速度相同, 相对位置不变.
    const distance = Math.max(graphic.parent.width, graphic.parent.height);
    switch (to) {
      case 'right':
        toX += distance;
        break;
      case 'left':
        toX += -distance;
        break;
      case 'bottom':
        toY += distance;
        break;
      case 'top':
        toY += -distance;
        break;
    }
  }

  graphic
    .animate()
    .to({ x: toX, y: toY }, duration, easing as EasingType)
    // 最终不显示
    .onEnd(() => {
      graphic.setAttributes({ visible: false, visibleAll: false } as any);
    });
  return true;
}

export function moveIn(character: ICharacter, animation: IMoveParams, effect: string) {
  const graphic = getCharacterParentGraphic(character);
  _moveIn(graphic, animation as any);
}

function _moveIn(graphic: IGraphic, params: IMoveParams) {
  if (!canDoGraphicAnimation(graphic, params)) {
    return false;
  }

  const { move = {} } = params;
  const from = move.pos ?? params.pos ?? 1;
  const duration = move.duration ?? params.duration;
  const easing = move.easing ?? params.easing;
  const isVariableSpeed = move.isVariableSpeed ?? true;

  // 图形宽高
  const width = Math.abs(graphic.AABBBounds.x2 - graphic.AABBBounds.x1);
  const height = Math.abs(graphic.AABBBounds.y2 - graphic.AABBBounds.y1);

  let fromX = graphic.attribute.x;
  let fromY = graphic.attribute.y;
  if (isVariableSpeed) {
    // 同时从边缘进入, 速度不同, 同时抵达目标.
    switch (from) {
      case 'right':
        // 图形左边缘为起点
        fromX = graphic.parent.width;
        break;
      case 'left':
        // 图形右边缘为起点
        fromX = -width;
        break;
      case 'bottom':
        // 从下往上进入
        fromY = graphic.parent.height + height;
        break;
      case 'top':
        // 从上往下进入
        fromY = -height;
        break;
      case 'top-right':
        // 从右上进入 ↗️
        fromY = -height;
        fromX = graphic.parent.width;
        break;
      case 'top-left':
        // 从左上进入 ↖️
        fromY = -height;
        fromX = -width;
        break;
      case 'bottom-left':
        // 从左下进入 ↙️
        fromY = graphic.parent.height + height;
        fromX = -width;
        break;
      case 'bottom-right':
        // 从右下进入 ↘️
        fromY = graphic.parent.height + height;
        fromX = graphic.parent.width;
        break;
    }
  } else {
    // 速度相同, 相对位置不变, 但不同时出现.
    const distance = Math.max(graphic.parent.width, graphic.parent.height);
    switch (from) {
      case 'right':
        // 从右往左进入
        fromX += distance;
        break;
      case 'left':
        // 从左往右进入
        fromX += -distance;
        break;
      case 'bottom':
        // 从下往上进入
        fromY += distance;
        break;
      case 'top':
        // 从上往下进入
        fromY += -distance;
        break;
      case 'top-right':
        // 从右上进入 ↗️
        fromX += distance;
        fromY += -distance;
        break;
      case 'top-left':
        // 从左上进入 ↖️
        fromX += -distance;
        fromY += -distance;
        break;
      case 'bottom-left':
        // 从左下进入 ↙️
        fromY += distance;
        fromX += -distance;
        break;
      case 'bottom-right':
        // 从右下进入 ↘️
        fromX += distance;
        fromY += distance;
        break;
    }
  }

  graphic.animate().from({ x: fromX, y: fromY }, duration, easing as EasingType);
  return true;
}

export function getCharacterParentGraphic(character: ICharacter) {
  return character.getGraphicParent();
}

export function getCharacterGraphic(character: ICharacter) {
  return character.getGraphicParent().getChildren() as IGraphic[];
}

export function getCharacterByEffect(character: ICharacter, effect: 'move' | string) {
  // 图表仅操作父节点.
  // @ts-ignore
  if (character._graphic.type === 'chart') {
    return [getCharacterParentGraphic(character)];
  }
  // move效果, 一定是对parent的操作
  return effect === 'move' ? [getCharacterParentGraphic(character)] : getCharacterGraphic(character);
}
