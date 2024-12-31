import React, { createRef, useEffect } from 'react';
import { Player, Story } from '../../../../../vstory-core/src';
import { registerAllSelection } from '../../../../../vstory-editor/src';
import { Edit, registerAll } from '../../../../src';

registerAll();
registerAllSelection();

export const RectComponent = () => {
  const id = 'RectComponent';
  useEffect(() => {
    const container = document.getElementById(id);
    const canvas = document.createElement('canvas');
    container?.appendChild(canvas);

    const story = new Story(null, { canvas, width: 800, height: 500, background: 'pink' });
    const player = new Player(story);
    story.init(player);

    story.addCharacterWithAppear({
      type: 'Rect',
      id: 'bleed',
      zIndex: 1,
      position: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      locked: true,
      options: {
        graphic: {
          stroke: 'red',
          lineWidth: 4
        }
      }
    });
    // story.addCharacterWithAppear({
    //   type: 'Rect',
    //   id: 'title',
    //   zIndex: 1,
    //   position: {
    //     top: 100,
    //     left: 100,
    //     width: 200,
    //     height: 200
    //   },
    //   options: {
    //     graphic: {
    //       fill: 'red'
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
        width: 200,
        height: 200
      },
      options: {
        graphic: {
          fill: 'red'
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
      console.log('resize', msg);
    });

    return () => {
      story.release();
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} id={id}></div>;
};
