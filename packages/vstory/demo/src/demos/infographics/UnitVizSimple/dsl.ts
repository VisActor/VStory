import { ICharacterSpec } from '../../../../../src/story/character';
import { IActionsLink } from '../../../../../src/story/interface';
import { UnitNode, input, unitTrees } from './read-api';

function generateShapes(
  unitData: UnitNode[],
  characters: ICharacterSpec[],
  actions: IActionsLink[],
  startX: number,
  startY: number,
  numRows: number,
  numCols: number,
  unitHeight: number,
  unitWidth: number,
  gap: [number, number],
  offsetWidth: number,
  defaultColor: string,
  sceneNumber: number
) {
  for (let unitNode of unitData) {
    const children = unitNode.children;
    let color = unitNode.style?.fill;
    color = color ? color : defaultColor;
    if (!children) {
      for (let i = 0; i < unitNode.count; i++) {
        const numCharacters = characters.length;
        const col = Math.floor(numCharacters / numRows);
        const row = numCharacters - col * numRows;
        const id = `scene-${sceneNumber}:circle-${col}-${row}`;
        characters.push({
          type: 'ShapeComponent',
          id: id,
          zIndex: 3 + sceneNumber,
          position: {
            top: startY + row * (unitHeight + gap[1] * unitHeight),
            left: startX + col * (unitWidth + gap[0] * unitWidth + offsetWidth),
            width: unitWidth,
            height: unitHeight
          },
          options: {
            graphic: {
              symbolType: input.unit.style.svg,
              stroke: false,
              size: unitHeight,
              fill: color
            }
          }
        });
        actions.push({
          characterId: id,
          characterActions: [
            {
              startTime:
                Math.floor(Math.random() * input.scene[sceneNumber].animationDuration) +
                1 +
                input.scene[sceneNumber].sceneDuration * sceneNumber,
              duration: 0,
              action: 'appear',
              payload: {
                animation: {
                  duration: input.scene[sceneNumber].animationDuration / 2,
                  easing: 'linear',
                  effect: 'fade'
                }
              }
            }
          ]
        });
      }
    } else {
      generateShapes(
        children,
        characters,
        actions,
        startX,
        startY,
        numRows,
        numCols,
        unitHeight,
        unitWidth,
        gap,
        offsetWidth,
        color,
        sceneNumber
      );
    }
  }
}

function calNumCharacters(unitData: UnitNode[]): number {
  let numCharacters = 0;
  for (let unitNode of unitData) {
    const children = unitNode.children;
    if (!children) {
      numCharacters += unitNode.count;
    } else {
      numCharacters += calNumCharacters(children);
    }
  }
  return numCharacters;
}

function calLayout(
  numRowsLowerBound: number,
  count: number,
  h: number,
  w: number,
  gap: [number, number],
  aspect: number
) {
  let numRows = numRowsLowerBound;
  let numCols;
  let unitHeight;
  let unitWidth;
  let totalWidth;
  do {
    unitHeight = h / (numRows * (1 + gap[1]) - gap[1]);
    unitWidth = aspect * unitHeight;
    numCols = Math.ceil(count / numRows);
    totalWidth = numCols * unitWidth + (numCols - 1) * gap[0] * unitWidth;
  } while (totalWidth > w && numRows++);
  return {
    numRows,
    numCols,
    unitHeight,
    unitWidth
  };
}

function calNumRowsLowerBound(w: number, h: number, aspect: number, gap: [number, number], count: number): number {
  const a = Math.pow(w * (1 + gap[1]), 2);
  const b = gap[0] * aspect * h - w * gap[1];
  const c = -count * h * aspect * (1 + gap[0]) * (1 + gap[1]);
  const delta = Math.sqrt(b * b - 4 * a * c);
  return Math.ceil((-b + delta) / (2 * a));
}

function getAspectRatio(pathData: string) {
  // Create an SVG path element to use for calculation
  let svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  svgPath.setAttribute('d', pathData);

  // Append to an SVG element to get the bounding box
  let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.appendChild(svgPath);
  document.body.appendChild(svg); // Temporary add to document to get the bounding box

  // Get bounding box
  let bbox = svgPath.getBBox();
  document.body.removeChild(svg); // Remove temporary SVG element

  // Calculate aspect ratio
  let width = bbox.width;
  let height = bbox.height;
  return width / height;
}

export function createUnitViz(unitData: UnitNode[], sceneNumber: number) {
  const numCharacters = calNumCharacters(unitData);
  const characters: ICharacterSpec[] = [];
  const actions: IActionsLink[] = [];

  const {
    layout: { width, height, titleHeight, vizPadding },
    unit: {
      style: {
        gap: [gapX, gapY],
        svg
      }
    }
  } = input;
  const gap: [number, number] = [gapX, gapY];
  const vizWidth = width - 2 * vizPadding.x;
  const vizHeight = height - titleHeight - 2 * vizPadding.y;
  const aspect = getAspectRatio(svg);

  const numRowsLowerBound = calNumRowsLowerBound(vizWidth, vizHeight, aspect, gap, numCharacters);
  const { numRows, numCols, unitHeight, unitWidth } = calLayout(
    numRowsLowerBound,
    numCharacters,
    vizHeight,
    vizWidth,
    gap,
    aspect
  );
  console.log('numRows: ', numRows);
  console.log('numCols: ', numCols);
  const offsetWidth = (vizWidth - numCols * unitWidth - (numCols - 1) * gap[0] * unitWidth) / (numCols - 1);
  const startX = vizPadding.x;
  const startY = titleHeight + vizPadding.y;

  generateShapes(
    unitData,
    characters,
    actions,
    startX,
    startY,
    numRows,
    numCols,
    unitHeight,
    unitWidth,
    gap,
    offsetWidth,
    'white',
    sceneNumber
  );

  return { characters, actions };
}
