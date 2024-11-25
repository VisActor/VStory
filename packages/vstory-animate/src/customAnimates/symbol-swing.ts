import { ACustomAnimate, createLine, generatorPathEasingFunc } from '@visactor/vrender-core';

const swingEaseStr =
  'M 0 0 C 0.078 0.204 0.05 0.291 0.152 0.363 C 0.291 0.295 0.236 -0.224 0.334 -0.24 C 0.486 -0.224 0.48 0.202 0.566 0.217 C 0.696 0.183 0.622 -0.113 0.751 -0.138 C 0.873 -0.09 0.798 0.085 0.903 0.109 C 0.989 0.097 0.983 0.049 1 0';
const swingEase = generatorPathEasingFunc(swingEaseStr);

export class SymbolSwing extends ACustomAnimate<{ x?: number; y?: number }> {
  static label: string = 'symbol-swing';

  static delayPerTime: number = 50;
  static enterPerTime: number = 300;

  declare valid: boolean;
  declare delta: number;
  declare showLine: boolean;

  constructor(
    from: { x?: number; y?: number },
    to: { x?: number; y?: number },
    duration: number,
    easing: any,
    params: any
  ) {
    super(from, to, duration, easing, params);
    this.delta = params.delta ?? 10;
    this.showLine = params.showLine ?? true;
  }

  getEndProps(): Record<string, any> {
    return this.to;
  }

  getFromProps(): void | Record<string, any> {
    return this.from;
  }

  onBind(): void {
    this.target && this.target.setAttributes({ ...this.from, y: this.target.attribute._layoutHeight });
    if (this.showLine) {
      const shadowRoot = this.target.attachShadow();
      shadowRoot.add(createLine({ lineDash: [3, 3], curveType: 'basis' }));
    }
  }

  onUpdate(end: boolean, ratio: number, out: Record<string, any>): void {
    // if (!this.throw(ratio, out)) {
    //   this.bounce(ratio, out);
    // }
    this.grow(ratio, out);
    this.swing(ratio, out);
  }
  onEnd(): void {
    this.target.setAttributes(this.to);
    this.swing(1, this.to);
  }

  grow(ratio: number, out: Record<string, any>) {
    ratio = Math.min(ratio * 1.5, 1);
    const { _layoutHeight } = this.target.attribute;
    out.y = _layoutHeight - (_layoutHeight - this.to.y!) * ratio;
    out.x = this.to.x!;
  }

  swing(ratio: number, out: Record<string, any>) {
    ratio = swingEase(ratio);
    const deltaX = this.delta * ratio;
    out.x += deltaX;

    const { _layoutHeight, fill } = this.target.attribute;

    const shadowRoot = this.target.shadowRoot;
    if (shadowRoot) {
      const line = shadowRoot.children[0];
      const height = _layoutHeight - out.y!;
      line.setAttributes({
        stroke: fill,
        points: [
          { x: 0, y: 0 },
          { x: -deltaX, y: height / 2 },
          // { x: -deltaX, y: height / 3 * 2 },
          { x: -deltaX, y: height }
        ]
      });
    }
  }
}
