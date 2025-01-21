import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAllSelection, SnapshotPlugin } from '../../../../../vstory-editor/src';
import { Edit, registerAll } from '../../../../src';

registerAll();
registerAllSelection();

export const ComponentsEdit = () => {
  const id = 'ComponentsEdit';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, {
      canvas,
      width: 1000,
      height: 600,
      layerBackground: 'white',
      background: 'pink',
      // scaleX: 0.5,
      // scaleY: 0.5,
      layerViewBox: { x1: 100, y1: 100, x2: 900, y2: 500 }
    });
    const player = new Player(story);
    story.init(player);

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
    story.addCharacterWithAppear({
      type: 'Image',
      id: 'image',
      zIndex: 10,
      position: {
        top: 300,
        left: 200,
        width: 80,
        height: 60
      },
      options: {
        graphic: {
          stroke: false,
          image: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/screenshot-20240715-204217.png'
          // size: 100
        }
      }
    });
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

    player.play(-1);

    let selectedCharacter: any = null;
    const edit = new Edit(story as any);
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
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
