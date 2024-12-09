import { IStory } from '@visactor/vstory-core';
import { encodeToVideo } from '../../../../vstory-player/src/encode';

export function exportVideo(story: IStory) {
  const btn = document.createElement('button');
  btn.innerText = '导出mp4';
  document.body.appendChild(btn);
  btn.addEventListener('click', () => {
    encodeToVideo(3000, 30, story)
      .then(objUrl => {
        const video = document.createElement('video');
        (video as any).muted = 'muted';
        video.controls = true;
        video.src = objUrl;
        video.play();
        document.body.appendChild(video);
      })
      .catch(err => {
        console.log(err);
      });
  });
}
