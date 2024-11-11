import { ACustomAnimate, createLine } from '@visactor/vrender-core';

export class SymbolThrow extends ACustomAnimate<{ x?: number; y?: number }> {
  static label: string = 'symbol-throw';

  static delayPerTime: number = 50;
  static enterPerTime: number = 300;

  declare valid: boolean;

  constructor(
    from: { x?: number; y?: number },
    to: { x?: number; y?: number },
    duration: number,
    easing: any,
    params: any
  ) {
    const f = {
      y: 0,
      x: params.width
    };

    super(f, to, duration, easing, params);
  }

  getEndProps(): Record<string, any> {
    return this.to;
  }

  getFromProps(): void | Record<string, any> {
    return this.from;
  }

  onBind(): void {
    this.target && this.target.setAttributes(this.from);
    const shadowRoot = this.target.attachShadow();
    shadowRoot.add(createLine({ lineDash: [3, 3] }));
  }

  static getPowIn(pow: number) {
    return function (t: number) {
      return Math.pow(t, pow);
    };
  }

  static cubicIn = SymbolThrow.getPowIn(3);

  onUpdate(end: boolean, ratio: number, out: Record<string, any>): void {
    if (!this.throw(ratio, out)) {
      this.bounce(ratio, out);
    }
  }
  onEnd(): void {
    this.target.setAttributes(this.to);
    this.bounce(1, {});
  }

  throw(ratio: number, out: Record<string, any>) {
    ratio = Math.min(ratio * 2, 1);
    const { _layoutHeight } = this.target.attribute;
    const ratioY = SymbolThrow.cubicIn(ratio);
    const x = this.from.x! + (this.to.x! - this.from.x!) * ratio;
    const y = this.from.y! + (_layoutHeight! - this.from.y!) * ratioY;
    out.x = x;
    out.y = y;
    return ratio < 1;
  }

  bounce(ratio: number, out: Record<string, any>) {
    ratio = Math.max((ratio - 0.5) * 2, 0);
    const { _layoutHeight, fill } = this.target.attribute;
    out.y = _layoutHeight - (_layoutHeight - this.to.y!) * ratio;
    const shadowRoot = this.target.shadowRoot;
    const line = shadowRoot.children[0];
    const height = _layoutHeight - out.y!;
    line.setAttributes({
      stroke: fill,
      points: [
        { x: 0, y: 0 },
        { x: 0, y: height }
      ]
    });
  }
}
