import { ACustomAnimate, generatorPathEasingFunc } from '@visactor/vrender-core';
import type { EasingType } from '@visactor/vrender-core';

export class Bounce extends ACustomAnimate<any> {
  declare valid: boolean;

  private dy: number;
  private customEase: (x: number) => number;

  constructor(from: any, to: any, duration: number, easing: EasingType, params: { dy: number; customEase?: string }) {
    super(from, to, duration, easing, params);
    const {
      dy = 20,
      customEase = 'M0,0 C0,0 0.058,1 0.2,1 0.346,1 0.41,0 0.53,0 0.559,0 0.681,-0.002 0.702,0.011 0.788,0.065 0.774,0.212 0.853,0.212 0.928,0.212 1,0 1,0'
    } = params || {};
    this.dy = dy;
    this.customEase = generatorPathEasingFunc(customEase);
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
    const r = this.customEase(ratio);
    out.dy = -this.dy * r;
  }
}
