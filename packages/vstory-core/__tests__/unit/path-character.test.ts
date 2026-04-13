import { createCanvas, createImageData, loadImage } from 'canvas';
import { CharacterType } from '../../src/constants/character';
import { Player } from '../../src/core/player';
import { Story } from '../../src/core/story';
import { registerCharacters } from '../../src/module/character';
import { registerGraphics } from '../../src/module/graphic';
import { initVR } from '../../src/module/vrender';

const pathString = 'M0,0 L120,0 L60,90 Z';

describe('PathCharacter', () => {
  beforeAll(() => {
    initVR('node', { createCanvas, createImageData, loadImage, Resvg: undefined });
    registerGraphics();
    registerCharacters();
  });

  it('should create a path component character and mount its path graphic', () => {
    const canvas = createCanvas(320, 240);
    const story = new Story(null, { canvas, width: 320, height: 240, background: 'white' });
    const player = new Player(story);
    story.init(player);

    story.addCharacter({
      type: CharacterType.PATH,
      id: 'path-character',
      zIndex: 1,
      position: {
        left: 20,
        top: 30,
        width: 180,
        height: 140
      },
      options: {
        padding: {
          left: 12,
          top: 18,
          right: 0,
          bottom: 0
        },
        graphic: {
          path: pathString,
          fill: '#f00',
          stroke: '#000',
          lineWidth: 2
        },
        text: {
          text: 'triangle',
          textAlign: 'center',
          textBaseline: 'middle'
        }
      }
    });

    story.canvas.tickTo(0);

    const character = story.getCharacterById('path-character') as any;
    const pathGraphic = character.getGraphicBySelector('path')[0];

    expect(character).toBeTruthy();
    expect(character.graphic.mainGraphic.type).toBe('path');
    expect(pathGraphic.attribute.path).toBe(pathString);
    expect(pathGraphic.attribute.x).toBe(12);
    expect(pathGraphic.attribute.y).toBe(18);
    expect(pathGraphic.AABBBounds.width()).toBeGreaterThan(0);
    expect(pathGraphic.AABBBounds.height()).toBeGreaterThan(0);

    story.release();
  });

  it('should preserve explicit zero offsets for path graphics', () => {
    const canvas = createCanvas(320, 240);
    const story = new Story(null, { canvas, width: 320, height: 240, background: 'white' });
    const player = new Player(story);
    story.init(player);

    story.addCharacter({
      type: CharacterType.PATH,
      id: 'path-character-zero-offset',
      zIndex: 1,
      position: {
        left: 20,
        top: 30,
        width: 180,
        height: 140
      },
      options: {
        padding: {
          left: 12,
          top: 18,
          right: 0,
          bottom: 0
        },
        graphic: {
          path: pathString,
          fill: '#f00',
          stroke: '#000',
          lineWidth: 2,
          x: 0,
          y: 0
        }
      }
    });

    story.canvas.tickTo(0);

    const character = story.getCharacterById('path-character-zero-offset') as any;
    const pathGraphic = character.getGraphicBySelector('path')[0];

    expect(pathGraphic.attribute.x).toBe(0);
    expect(pathGraphic.attribute.y).toBe(0);

    story.release();
  });
});
