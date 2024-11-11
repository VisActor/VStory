// import VChart from '@visactor/vchart';
// import { ACustomAnimate, EasingType } from '@visactor/vrender-core';

// export class WaveAnimate extends ACustomAnimate<{ x?: number, y?: number }> {
//   static label: string = 'wave-animate';

//   static delayPerTime: number = 50;
//   static enterPerTime: number = 300;

//   declare valid: boolean;

//   constructor(
//     from: { x?: number, y?: number },
//     to: { x?: number, y?: number },
//     duration: number,
//     easing: EasingType,
//     params: any
//   ) {
//     const f = {
//       y: 0,
//       x: params.width,
//     };

//     super(f, {y: from.y, x: from.x}, duration, easing, params);
//   }

//   onUpdate(end: boolean, ratio: number, out: Record<string, any>): void {
//     out.textureRatio = ratio;
//   }
// }

// interface IProps {
//   data: {city: string, temperature: number}[];
// }

// function waterDrop(ctx: any, size: number, topX: number, topY: number) {
//     ctx.beginPath();
//     const centerX = topX;
//     const centerY = topY - size / 2;
//     ctx.moveTo(centerX, centerY);
//     ctx.quadraticCurveTo(centerX + size / 2, centerY + size, centerX, centerY + size);
//     ctx.quadraticCurveTo(centerX - size / 2, centerY + size, centerX, centerY);
// }

// export const createWaveScatterSpec = () => {
//   const spec: any =  {
//     type: 'circlePacking',
//     categoryField: 'city',
//     valueField: 'temperature',
//     drill: true,
//     layoutPadding: 5,
//     label: {
//       style: {
//         fontSize: 16,
//         visible: (d: any) => {
//           return d.depth === 0;
//         },
//         text: (d: any) => {
//           return [
//             d.city,
//             `${d.temperature}℃`
//           ];
//         },
//       }
//     },
//     animationAppear: {
//       circlePacking: {
//         channel: ['x', 'y'],
//         custom: WaveAnimate,
//         easing: 'linear',
//         duration: 1000,
//         customParameters: () => ({
//           width: 800,
//           height: 500,
//         }),
//         loop: true
//       },
//     },
//     circlePacking: {
//       customShape: (data: any, attrs: any, path: any) => {
//         waterDrop(path, attrs.outerRadius * 2, 0, 0);
//         return path;
//       },
//       style: {
//         fill: 'linear-gradient(180deg, #0099ff11 100%, #0099ff33 0%)',
//         fillOpacity: (datum: any, _: any) => {
//           return datum.temperature / 40;
//         },
//         // texture: 'wave',
//         // stroke: 'black',
//         texture: 'wave',
//         textureColor: '#0099ff',
//         textureOptions: (datum: any) => {
//           return {
//             amplitude: 6,
//             frequency: 2,
//             percent: datum.temperature / 80,
//           }
//         },
//       }
//     },
//     animationEnter: {
//       easing: 'cubicInOut'
//     },
//     animationExit: {
//       easing: 'cubicInOut'
//     },
//     animationUpdate: {
//       easing: 'cubicInOut'
//     }
//   };
// }

// export const createWaveScatter = (domId: string, data: any) => {

//   const vchart = new VChart(spec, { dom: domId });
//   vchart.renderSync();

//   return vchart;
// }
