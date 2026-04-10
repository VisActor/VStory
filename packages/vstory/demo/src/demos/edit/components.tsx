import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAllSelection, SnapshotPlugin } from '../../../../../vstory-editor/src';
import { Edit, registerAll } from '../../../../src';

registerAll();
registerAllSelection();

const editorPath = 'M60,0 L120,60 L60,120 L0,60 Z';

export const ComponentsEdit = () => {
  const id = 'ComponentsEdit';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const scaleX = 0.7;
    const scaleY = 0.7;
    const story = new Story(null, {
      canvas,
      width: 1000 * scaleX,
      height: 600 * scaleY,
      // layerBackground: 'white',
      background: 'pink',
      scaleX,
      scaleY
    });
    const player = new Player(story);
    story.init(player);

    window.addEventListener('resize', () => {
      const scaleX = 1000 / container!.clientWidth;
      const scaleY = scaleX;
      story.canvas.resize(container!.clientWidth / 2, container!.clientHeight / 2, { scaleX, scaleY });
    });

    // story.addCharacterWithAppear({
    //   type: 'Shape',
    //   id: 'star',
    //   zIndex: 10,
    //   position: {
    //     top: 100,
    //     left: 100,
    //     width: 80,
    //     height: 60
    //   },
    //   options: {
    //     graphic: {
    //       stroke: false,
    //       fill: 'pink',
    //       symbolType: 'star'
    //       // size: 100
    //     }
    //   }
    // });
    // story.addCharacterWithAppear({
    //   type: 'Image',
    //   id: 'image',
    //   zIndex: 10,
    //   position: {
    //     top: 300,
    //     left: 200,
    //     width: 80,
    //     height: 60
    //   },
    //   options: {
    //     graphic: {
    //       stroke: false,
    //       image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/screenshot-20240715-204217.png'
    //       // size: 100
    //     }
    //   }
    // });
    story.addCharacterWithAppear({
      type: 'Rect',
      id: 'title',
      zIndex: 1,
      position: {
        top: 100,
        left: 100,
        width: 60,
        height: 60
      },
      options: {
        graphic: {
          fill: 'red'
        },
        text: {
          text: 'hello world',
          fontSize: 30,
          fill: 'blue'
        }
      }
    });

    story.addCharacterWithAppear({
      type: 'Path',
      id: 'path-edit',
      zIndex: 2,
      position: {
        top: 220,
        left: 260,
        width: 160,
        height: 160
      },
      options: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        },
        graphic: {
          path: editorPath,
          fill: '#f59e0b',
          stroke: '#7c2d12',
          lineWidth: 4
        },
        text: {
          text: 'path',
          textAlign: 'center',
          textBaseline: 'middle',
          fill: '#ffffff',
          fontSize: 24,
          fontWeight: 'bold'
        }
      }
    });

    player.play(-1);

    let selectedCharacter: any = null;
    const edit = new Edit(story as any);
    edit.theme.setLayoutTransformerControlTheme({
      handlerLine: { size: 13 },
      rotateCircle: { radius: 8 },
      rotatePath: { size: 8 }
    });
    edit.on('startEdit', msg => {
      selectedCharacter = msg.actionInfo.character;
      if (msg.type === 'commonEdit' && msg.actionInfo.character) {
        msg.updateCharacter({ options: { graphic: { fill: 'green' } } });
        player.play();
      }
    });
    edit.on('endEdit', msg => {
      selectedCharacter = null;
    });
    edit.on('resize', msg => {
      // console.log('resize', msg);
    });

    story.pluginService.register(new SnapshotPlugin());

    return () => {
      edit.release();
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
