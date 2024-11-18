import type { EasingType } from '@visactor/vrender';
import { ACustomAnimate, generatorPathEasingFunc } from '@visactor/vrender';

export const barBounce1Str =
  'M0,0 C0.126,0.382 0.06,0.254 0.105,0.467 0.159,0.729 0.3,1.173 0.38,1.173 0.476,1.173 0.512,0.909 0.578,0.9 0.632,0.892 0.685,1.084 0.735,1.085 0.784,1.085 0.843,0.966 0.887,0.966 0.94,0.966 0.984,1 1,1';
export const barBounce2Str =
  'M0,0 C0.126,0.382 0.185,0.598 0.262,0.801 0.307,0.919 0.396,1.089 0.476,1.089 0.572,1.089 0.622,0.936 0.688,0.927 0.742,0.919 0.778,1.036 0.828,1.038 0.877,1.038 0.882,0.972 0.926,0.972 0.979,0.972 0.984,1 1,1';

const barBounce1 = generatorPathEasingFunc(barBounce1Str);
const barBounce2 = generatorPathEasingFunc(barBounce2Str);

export class BarBounce extends ACustomAnimate<{ y?: number; y1?: number; x?: number; x1?: number }> {
  static label: string = 'bar-bounce';

  static delayPerTime: number = 50;
  static enterPerTime: number = 300;

  declare valid: boolean;

  constructor(
    from: { y?: number; y1?: number; x?: number; x1?: number },
    to: { y?: number; y1?: number; x?: number; x1?: number },
    duration: number,
    easing: EasingType,
    params: any
  ) {
    const f = {
      y: from.y1,
      y1: from.y1,
      x: from.x1,
      x1: from.x1
    };
    super(f, { y: from.y, y1: from.y1, x: from.x, x1: from.x1 }, duration, easing, params);
  }

  getEndProps(): Record<string, any> {
    return this.to;
  }

  getFromProps(): void | Record<string, any> {
    return this.from;
  }

  onBind(): void {
    this.target && this.target.setAttributes(this.from);
  }

  onUpdate(end: boolean, ratio: number, out: Record<string, any>): void {
    const from = this.from;
    const to = this.to;
    const r1 = barBounce1!(ratio);
    const r2 = barBounce2!(ratio);
    // const
    if (from.y1) {
      out.y = from.y! + (to.y! - from.y!) * r1;
      const height = to.y1! - to.y!;
      const dh = height * r2;
      out.y1 = Math.min(out.y + dh, this.to.y1!);
    } else {
      out.x = from.x! + (to.x! - from.x!) * r1;
      const width = to.x! - to.x1!;
      const dw = width * r2;
      out.x1 = Math.max(out.x - dw, this.to.x1!);
    }

    // out.y1 = from.y1 + (to.y1 - from.y1) * r;
  }
}
