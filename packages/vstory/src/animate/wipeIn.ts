// import { ACustomAnimate } from '@visactor/vrender';
// import type { EasingType, ILinearGradient } from '@visactor/vrender';

// export enum Direction {
//   LEFT_TO_RIGHT = 0,
//   RIGHT_TO_LEFT = 1,
//   TOP_TO_BOTTOM = 2,
//   BOTTOM_TO_TOP = 3
// }

// export class Wipe extends ACustomAnimate<any> {
//   declare direction: number;

//   constructor(
//     from: any,
//     to: any,
//     duration: number,
//     easing: EasingType,
//     params?: { direction?: number; fill?: boolean; stroke?: boolean }
//   ) {
//     super(from, to, duration, easing, params);
//     const { direction = Direction.LEFT_TO_RIGHT, fill = true, stroke = true } = params || {};
//     this.direction = direction;

//   }

//   getEndProps(): Record<string, any> {
//     return {
//     };
//   }

//   onBind(): void {

//   }

//   onEnd(): void {
//     return;
//   }

//   onUpdate(end: boolean, ratio: number, out: Record<string, any>): void {
//     console.log('onUpdate');

//     switch (this.direction) {
//       case Direction.RIGHT_TO_LEFT:
//         this.rightToLeft(end, ratio, out);
//         break;
//       case Direction.TOP_TO_BOTTOM:
//         this.topToBottom(end, ratio, out);
//         break;
//       case Direction.BOTTOM_TO_TOP:
//         this.bottomToTop(end, ratio, out);
//         break;
//       case Direction.STROKE:
//         this.strokePath(end, ratio, out);
//         break;
//       default:
//         this.leftToRight(end, ratio, out);
//         break;
//     }

//     if (end) {
//       out.fill = this.toFill;
//       out.stroke = this.toStroke;
//     } else {
//       if (this.fill && this.toFill) {
//         const toFillColor = this.toFill;
//         this.fillGradient.stops = [
//           { offset: 0, color: toFillColor },
//           { offset: ratio, color: toFillColor },
//           { offset: Math.min(1, ratio * 2), color: 'white' }
//         ];
//         out.fill = this.fillGradient;
//       }

//       if (this.stroke && this.toStroke) {
//         const toStrokeColor = this.toStroke;
//         this.strokeGradient.stops = [
//           { offset: 0, color: toStrokeColor },
//           { offset: ratio, color: toStrokeColor },
//           { offset: Math.min(1, ratio * 2), color: 'white' }
//         ];
//         out.stroke = this.strokeGradient;
//       }
//     }
//   }

// }
