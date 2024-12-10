import { Encoder } from './encode';
import type { IStory } from '@visactor/vstory-core/es/interface/story';

export async function encodeToVideo(millsecond: number, fps: number, story: IStory): Promise<any> {
  const encode = new Encoder();

  const frameNum = (millsecond / 1000) * fps;
  const deltaT = 1000 / fps;
  story.player.tickTo(0);
  const canvas = story.canvas.getStage().window.getContext().canvas;
  const objUrl = await encode.exportVideo(frameNum, fps, canvas.width, canvas.height, async i => {
    const t = deltaT * i;
    story.player.tickTo(t);
    return new Promise((resolve, reject) => {
      canvas.nativeCanvas.toBlob((blob: any) => {
        if (blob) {
          resolve(blob);
        } else {
          reject('no blob');
        }
      }, `image/png`);
    });
  });

  return objUrl;
}
