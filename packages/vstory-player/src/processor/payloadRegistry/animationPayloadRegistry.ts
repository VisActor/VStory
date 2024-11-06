// interface IAnimationPayloadItem {
//   effect: string;
//   duration?: number;
//   easing?: string;
//   oneByOne?: boolean;
//   loop?: boolean;
// }

// export class AnimationPayloadRegistry {
//   private _payloadMap: Map<string, Record<string, any>> = new Map();

//   registerPayload(name: string, payload: Record<string, any>) {
//     if (!this._payloadMap.has(characterType)) {
//       this._payloadMap.set(characterType, {});
//     }
//     const payloadMap = this._payloadMap.get(characterType);
//     for (const key in payload) {
//       payloadMap[key] = payload[key];
//     }
//   }
//   getPayload(characterType: string, action: string) {
//     if (!this._payloadMap.has(characterType)) {
//       return null;
//     }
//     const payloadMap = this._payloadMap.get(characterType);
//     if (!payloadMap[action]) {
//       return null;
//     }
//     return payloadMap[action];
//   }
//   getPayloads(characterType: string) {
//     if (!this._payloadMap.has(characterType)) {
//       return null;
//     }
//     const payloadMap = this._payloadMap.get(characterType);
//     return payloadMap;
//   }
// }

// export const globalAnimationPayloadRegistry = new AnimationPayloadRegistry();
