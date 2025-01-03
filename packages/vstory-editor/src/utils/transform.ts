import type { IStage } from '@visactor/vrender-core';
import type { IMatrix, IPointLike } from '@visactor/vutils';

export function transformDeltaWithStage(
  stage: IStage,
  point: IPointLike,
  subMatrix?: IMatrix
): { x: number; y: number } {
  const stageMatrix = stage.window.getViewBoxTransform();
  const matrix = stageMatrix
    .clone()
    .multiply(
      subMatrix?.a ?? 1,
      subMatrix?.b ?? 0,
      subMatrix?.c ?? 0,
      subMatrix?.d ?? 1,
      subMatrix?.e ?? 0,
      subMatrix?.f ?? 0
    );
  const p0 = { x: 0, y: 0 };
  const p1 = point;

  const out1 = { x: 0, y: 0 };
  const out2 = { x: 0, y: 0 };

  matrix.transformPoint(p0, out1);
  matrix.transformPoint(p1, out2);
  return {
    x: out2.x - out1.x,
    y: out2.y - out1.y
  };
}

export function transformPointWithStage(
  stage: IStage,
  point: IPointLike,
  subMatrix?: IMatrix
): { x: number; y: number } {
  const stageMatrix = stage.window.getViewBoxTransform();
  const matrix = stageMatrix
    .clone()
    .multiply(
      subMatrix?.a ?? 1,
      subMatrix?.b ?? 0,
      subMatrix?.c ?? 0,
      subMatrix?.d ?? 1,
      subMatrix?.e ?? 0,
      subMatrix?.f ?? 0
    );

  const out = { x: 0, y: 0 };
  matrix.transformPoint(point, out);
  return out;
}
