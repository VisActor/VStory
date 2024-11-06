import type { EasingType } from '@visactor/vrender';
import { ACustomAnimate, generatorPathEasingFunc } from '@visactor/vrender';

export const pieLeap1Str =
  'M0,0 C0,0.301 0.256,1.032 0.607,1.033 0.763,1.033 0.752,0.983 0.86,0.983 0.978,0.983 0.972,1 1,1';
export const pieLeap2Str =
  'M0,0 C0.331,0 0.047,-0.001 0.4,0 0.554,0 0.623,0.988 0.704,1.05 0.777,1.106 0.826,0.966 0.885,0.966 0.968,0.966 0.986,1 1,1';

const pieLeap1 = generatorPathEasingFunc(pieLeap1Str);
const pieLeap2 = generatorPathEasingFunc(pieLeap2Str);

export class PieLeap extends ACustomAnimate<{ y: number; x: number; innerRadius: number; outerRadius: number }> {
  static label: string = 'pie-leap';
  static delayPerTime: number = 50;
  static enterPerTime: number = 300;

  declare valid: boolean;

  constructor(
    from: { y: number; x: number; innerRadius: number; outerRadius: number },
    to: { y: number; x: number; innerRadius: number; outerRadius: number },
    duration: number,
    easing: EasingType,
    params: any
  ) {
    const f = {
      y: from.y - 500,
      x: from.x + 500,
      innerRadius: from.innerRadius,
      outerRadius: (from.innerRadius + from.outerRadius) / 2
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
    this.target.setAttributes(this.from);
  }

  onEnd(): void {
    this.target.pathProxy = null;
  }

  onUpdate(end: boolean, ratio: number, out: Record<string, any>): void {
    // 位置
    out.x = this.from.x + pieLeap1(ratio) * (this.to.x - this.from.x);
    out.y = this.from.y + pieLeap1(ratio) * (this.to.y - this.from.y);
    out.outerRadius = this.from.outerRadius + pieLeap2(ratio) * (this.to.outerRadius - this.from.outerRadius);
    // this.computePath(bounce1(ratio), this.fromCenter, this.toCenter, this.target.pathProxy);
    // if (this.vertical) {
    //   out.y = this.to.y + bounce2(ratio) * 100;
    // } else {
    //   // out.x1 = this.to.x1! + bounce2(ratio) * 100;
    // }
    // const cornerRadius = this.to.cornerRadius || 0;
    // out.cornerRadius = cornerRadius;
    // const centerX = this.to;
    // out.y = from.y! + (to.y! - from.y!) * r1;
    // const r1 = bounce1(ratio);
    // const r2 = bounce2(ratio);
    // // const
    // if (from.y1) {
    //   out.y = from.y! + (to.y! - from.y!) * r1;
    //   const height = to.y1! - to.y!;
    //   const dh = height * r2;
    //   out.y1 = Math.min(out.y + dh, this.to.y1!);
    // } else {
    //   out.x = from.x! + (to.x! - from.x!) * r1;
    //   const width = to.x! - to.x1!;
    //   const dw = width * r2;
    //   out.x1 = Math.max(out.x - dw, this.to.x1!);
    // }

    // out.y1 = from.y1 + (to.y1 - from.y1) * r;
  }
}
