// import { IActionSpec, ICharacter } from "@visactor/vstory-core";
// import { ActionProcessorItem } from "../../processor-item";
// import { getPayload } from "./utils";

// export class CommonBounceActionProcessor extends ActionProcessorItem {
//   name: 'bounce';

//   constructor() {
//     super();
//   }

//   getStartTimeAndDuration(action: IActionSpec): { startTime: number; duration: number } {
//     const { startTime: globalStartTime = 0 } = action;
//     const { startTime = 0, duration = 0 } = getPayload(action).animation ?? ({} as any);

//     const st = globalStartTime + startTime;
//     const d = duration;
//     return {
//       startTime: st,
//       duration: d
//     };
//   }

//   run(character: ICharacter, actionSpec: IComponentBounceAction): void {
//     const payload = getPayload(actionSpec);
//     const { animation = {} } = payload;
//     bounce(character, animation as any, payload);
//   }
// }
