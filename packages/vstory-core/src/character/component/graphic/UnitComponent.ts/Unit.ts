import type { ComponentOptions } from '@visactor/vrender-components';
import { AbstractComponent } from '@visactor/vrender-components';
import type { IUnitGraphicAttributes, IUnitItemAttributes } from './interface';
import { merge } from '@visactor/vutils';
import type { ISymbol } from '@visactor/vrender-core';
import { allParamsEqualTo } from '../../../../utils/equal';

interface IGridConfig {
  rows: number;
  cols: number;
  unitWidth: number;
  unitHeight: number;
  offsetX: number;
  offsetY: number;
}

export class Unit extends AbstractComponent<Required<IUnitGraphicAttributes>> {
  name = 'unit';

  static defaultAttributes: Partial<IUnitGraphicAttributes> = {
    width: 100,
    height: 100,
    gap: [0.5, 0.5],
    aspect: 1,
    direction: 'horizontal',
    padding: {
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    },
    count: 250,
    units: []
  };

  duration: number;

  constructor(attributes: IUnitGraphicAttributes, options?: ComponentOptions) {
    super(options?.skipDefault ? attributes : merge({}, Unit.defaultAttributes, attributes));
  }

  protected render(): void {
    const gridConfig = this._calculateGrid(this.attribute as IUnitGraphicAttributes);

    const { rows, cols, unitWidth, unitHeight, offsetX, offsetY } = gridConfig;
    const { count, units, padding, gap, direction } = this.attribute;
    const startX = padding.left + unitWidth / 2;
    const startY = padding.top + unitHeight / 2;
    const isHorizontal = direction === 'horizontal';

    for (let i = 0; i < count; i++) {
      const col = isHorizontal ? Math.floor(i / rows) : i % cols;
      const row = isHorizontal ? i % rows : Math.floor(i / cols);
      const dx =
        startX +
        col * (unitWidth + gap[0] * unitWidth + offsetX) +
        (isHorizontal && cols <= 1 ? offsetX : 0) +
        (!isHorizontal && rows <= 1 ? offsetX : 0);
      const dy =
        startY +
        row * (unitHeight + gap[1] * unitHeight + offsetY) +
        (!isHorizontal && rows <= 1 ? offsetY : 0) +
        (isHorizontal && cols <= 1 ? offsetY : 0);

      const name = `unit-${i}`;
      // 执行update动画
      if (this.duration) {
        const graphic = this.getChildByName(name) as ISymbol;
        if (graphic) {
          // 属性有diff，走动画去更新
          const nextAttrs = {
            ...(this.getUnitStyle(i, units, count) || {}),
            dx,
            dy,
            size: Math.max(unitWidth, unitHeight)
          };
          if (!allParamsEqualTo(nextAttrs, graphic.attribute)) {
            graphic.animate().to(nextAttrs, this.duration, 'linear');
          }
        } else {
          // 入场执行另外的入场动画
          this.createOrUpdateChild(
            name,
            { ...(this.getUnitStyle(i, units, count) || {}), dx, dy, size: Math.max(unitWidth, unitHeight) },
            'symbol'
          );
        }
      } else {
        // 不执行动画
        this.createOrUpdateChild(
          name,
          { ...(this.getUnitStyle(i, units, count) || {}), dx, dy, size: Math.max(unitWidth, unitHeight) },
          'symbol'
        );
      }
    }
  }

  protected getUnitStyle(
    index: number,
    units: IUnitItemAttributes[],
    count: number
  ): IUnitItemAttributes['style'] | void {
    const unit =
      units.find(item => {
        const range = [...item.range];
        if (range[0] == null) {
          range[0] = 0;
        }
        if (range[1] == null) {
          range[1] = count - 1;
        }
        return range[0] <= index && range[1] >= index;
      }) || units[0];

    return unit && unit.style;
  }

  /**
   * 入场动画
   * @param animateConfig
   */
  appearAnimate(animateConfig: { duration?: number; easing?: string }) {
    // TODO 后续支持特殊入场效果
    const { duration = 1000, easing = 'linear' } = animateConfig;
    this.forEachChildren((g: ISymbol) => {
      g.setAttributes({ opacity: 0 });
      g.animate().to({ opacity: 1 }, duration, easing as any);
    });
    return;
  }

  styleAnimate(attrs: any, duration?: number, easing?: string) {
    this.duration = duration || 0;
    this.setAttributes(attrs);
    this.duration = 0;
  }

  protected _calculateMinPrimaryCount(
    primaryLength: number,
    secondaryLength: number,
    aspect: number,
    gap: [number, number],
    count: number
  ): number {
    const a = Math.pow(secondaryLength * (1 + gap[1]), 2);
    const b = gap[0] * aspect * primaryLength - secondaryLength * gap[1];
    const c = -count * primaryLength * aspect * (1 + gap[0]) * (1 + gap[1]);
    const delta = Math.sqrt(b * b - 4 * a * c);
    return Math.ceil((-b + delta) / (2 * a));
  }

  protected _convergeGrid(
    minPrimaryCount: number,
    count: number,
    primaryLength: number,
    secondaryLength: number,
    aspect: number,
    gap: [number, number]
  ) {
    let primaryCount = minPrimaryCount;
    let unitPrimarySize;
    let unitSecondarySize;
    let secondaryCount;
    let totalWidth;

    do {
      unitPrimarySize = primaryLength / (primaryCount * (1 + gap[1]) - gap[1]);
      unitSecondarySize = aspect * unitPrimarySize;
      secondaryCount = Math.ceil(count / primaryCount);
      totalWidth = secondaryCount * unitSecondarySize + (secondaryCount - 1) * gap[0] * unitSecondarySize;
    } while (totalWidth > secondaryLength && primaryCount++);

    return { primaryCount, secondaryCount, unitPrimarySize, unitSecondarySize };
  }

  protected _calculateGrid(attributes: IUnitGraphicAttributes): IGridConfig {
    const { width, height, padding, count, gap, aspect, direction } = attributes;
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;

    const isHorizontal = direction === 'horizontal';
    const primaryLength = isHorizontal ? innerHeight : innerWidth;
    const secondaryLength = isHorizontal ? innerWidth : innerHeight;
    const adjustedAspect = isHorizontal ? aspect : 1 / aspect;
    const adjustedGap: [number, number] = isHorizontal ? gap : [gap[1], gap[0]];

    const minPrimaryCount = this._calculateMinPrimaryCount(
      primaryLength,
      secondaryLength,
      adjustedAspect,
      adjustedGap,
      count
    );
    const { primaryCount, secondaryCount, unitPrimarySize, unitSecondarySize } = this._convergeGrid(
      minPrimaryCount,
      count,
      primaryLength,
      secondaryLength,
      adjustedAspect,
      adjustedGap
    );

    const offset =
      (secondaryLength -
        secondaryCount * unitSecondarySize -
        (secondaryCount - 1) * adjustedGap[0] * unitSecondarySize) /
      (secondaryCount - 1);

    let primaryOffset;
    if (secondaryCount <= 1) {
      if (count <= 1) {
        primaryOffset = (primaryLength - unitPrimarySize) / 2;
      } else {
        primaryOffset =
          (primaryLength - count * unitPrimarySize - (count - 1) * unitPrimarySize * adjustedGap[1]) / (count - 1);
      }
    } else {
      primaryOffset = 0;
    }
    const secondaryOffset = secondaryCount <= 1 ? (secondaryLength - unitSecondarySize) / 2 : offset;

    return isHorizontal
      ? {
          rows: primaryCount,
          cols: secondaryCount,
          unitWidth: unitSecondarySize,
          unitHeight: unitPrimarySize,
          offsetX: secondaryOffset,
          offsetY: primaryOffset
        }
      : {
          rows: secondaryCount,
          cols: primaryCount,
          unitWidth: unitPrimarySize,
          unitHeight: unitSecondarySize,
          offsetX: primaryOffset,
          offsetY: secondaryOffset
        };
  }
}
