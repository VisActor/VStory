import type { EasingType } from '@visactor/vrender';
import { ACustomAnimate, CustomPath2D, generatorPathEasingFunc } from '@visactor/vrender';
import type { IPointLike } from '@visactor/vutils';

export const barLeap1Str = 'M0,0 C0.083,0.163 0.179,1 0.6,1 0.814,1 0.898,1 1,1';
export const barLeap2Str = 'M0,0 C0.27,0 0.179,0 0.6,0 0.632,0 0.782,-0.132 0.818,-0.132 0.868,-0.132 0.972,0 1,0';

const barLeap1 = generatorPathEasingFunc(barLeap1Str);
const barLeap2 = generatorPathEasingFunc(barLeap2Str);

export class BarLeap extends ACustomAnimate<{
  y: number;
  y1?: number;
  x: number;
  x1?: number;
  width?: number;
  height?: number;
  cornerRadius?: number;
}> {
  static label: string = 'bar-leap';
  static delayPerTime: number = 100;
  static enterPerTime: number = 500;

  declare valid: boolean;

  protected fromCenter: IPointLike;
  protected toCenter: IPointLike;

  protected vertical: boolean;

  constructor(
    from: { y: number; y1?: number; x: number; x1?: number; width?: number; height?: number },
    to: { y: number; y1?: number; x: number; x1?: number; width?: number; height?: number },
    duration: number,
    easing: EasingType,
    params: any
  ) {
    super({ ...from, cornerRadius: 0 }, to, duration, easing, params);
    this.vertical = to.y1 != null;
    const centerX = to.x1 != null ? (to.x + to.x1) / 2 : to.x + to.width! / 2;
    const centerY = to.y1 != null ? (to.y + to.y1) / 2 : to.y + to.height! / 2;
    this.toCenter = { x: centerX - to.x, y: centerY - to.y };
    if (this.vertical) {
      this.fromCenter = { x: centerX + 200 - to.x, y: centerY - 600 - to.y };
    } else {
      this.fromCenter = { x: centerX + 600 - to.x, y: centerY - 200 - to.y };
    }
  }

  computePath(percent: number, fromCenter: IPointLike, toCenter: IPointLike, pathProxy: CustomPath2D) {
    const center = {
      x: fromCenter.x + (toCenter.x - fromCenter.x) * percent,
      y: fromCenter.y + (toCenter.y - fromCenter.y) * percent
    };
    // console.log(center);
    pathProxy.clear();
    if (this.vertical) {
      const width = this.to.width!;
      const height = this.to.y1! - this.to.y;
      const halfH = height / 2;
      const halfW = width / 2;

      // const leftTop = {x: center.x - halfW, y: center.y - halfH};
      // const rightBottom = { x: leftTop.x + width, y: leftTop.y + height };
      // pathProxy.moveTo(leftTop.x, leftTop.y);
      // pathProxy.lineTo(rightBottom.x, leftTop.y);
      // pathProxy.lineTo(rightBottom.x, rightBottom.y);
      // pathProxy.lineTo(leftTop.x, rightBottom.y);
      // pathProxy.lineTo(leftTop.x, leftTop.y);

      const angle = ((1 - percent) * Math.PI) / 3;
      const vec1 = { x: Math.sin(angle) * halfH, y: Math.cos(angle) * halfH };
      const ptm = { x: center.x + vec1.x, y: center.y - vec1.y };
      const pbm = { x: center.x - vec1.x, y: center.y + vec1.y };
      const vec2 = { x: Math.cos(angle) * halfW, y: Math.sin(angle) * halfW };
      const plt = { x: ptm.x - vec2.x, y: ptm.y - vec2.y };
      const prt = { x: ptm.x + vec2.x, y: ptm.y + vec2.y };
      const plb = { x: pbm.x - vec2.x, y: pbm.y - vec2.y };
      const prb = { x: pbm.x + vec2.x, y: pbm.y + vec2.y };

      const lqp = { x: plb.x + (plt.x - plb.x) / 4, y: (plb.y + plt.y) / 2 };
      const rqp = { x: prb.x + (prt.x - prb.x) / 4, y: (prb.y + prt.y) / 2 };

      pathProxy.moveTo(plt.x, plt.y);
      pathProxy.lineTo(prt.x, prt.y);
      pathProxy.quadraticCurveTo(rqp.x, rqp.y, prb.x, prb.y);
      pathProxy.lineTo(plb.x, plb.y);
      pathProxy.quadraticCurveTo(lqp.x, lqp.y, plt.x, plt.y);
    } else {
      const width = this.to.x - this.to.x1!;
      const height = this.to.height!;
      const halfH = height / 2;
      const halfW = width / 2;

      const angle = ((1 - percent) * Math.PI) / 3;
      const vec1 = { x: Math.cos(angle) * halfW, y: Math.sin(angle) * halfW };
      const ptm = { x: center.x + vec1.x, y: center.y - vec1.y };
      const pbm = { x: center.x - vec1.x, y: center.y + vec1.y };
      const vec2 = { x: Math.sin(angle) * halfH, y: Math.cos(angle) * halfH };
      const plt = { x: ptm.x - vec2.x, y: ptm.y - vec2.y };
      const prt = { x: ptm.x + vec2.x, y: ptm.y + vec2.y };
      const plb = { x: pbm.x - vec2.x, y: pbm.y - vec2.y };
      const prb = { x: pbm.x + vec2.x, y: pbm.y + vec2.y };

      const lqp = { x: (plb.x + plt.x) / 2, y: plb.y - (plb.y - plt.y) / 4 };
      const rqp = { x: (prb.x + prt.x) / 2, y: prb.y - (prb.y - prt.y) / 4 };

      pathProxy.moveTo(plt.x, plt.y);
      pathProxy.lineTo(prt.x, prt.y);
      pathProxy.quadraticCurveTo(rqp.x, rqp.y, prb.x, prb.y);
      pathProxy.lineTo(plb.x, plb.y);
      pathProxy.quadraticCurveTo(lqp.x, lqp.y, plt.x, plt.y);
    }
  }

  getEndProps(): Record<string, any> {
    return this.to;
  }

  getFromProps(): void | Record<string, any> {
    return this.from;
  }

  onEnd(): void {
    this.target.pathProxy = null;
  }

  onBind(): void {
    this.target.pathProxy = new CustomPath2D();
    this.target.pathProxy.rect(0, 0, 0, 0);
    this.target && this.target.setAttributes(this.from);
  }

  onUpdate(end: boolean, ratio: number, out: Record<string, any>): void {
    this.computePath(barLeap1!(ratio), this.fromCenter, this.toCenter, this.target.pathProxy);
    if (this.vertical) {
      out.y = this.to.y + barLeap2!(ratio) * 100;
    } else {
      // out.x1 = this.to.x1! + bounce2(ratio) * 100;
    }
  }
}
