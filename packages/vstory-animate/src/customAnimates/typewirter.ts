import { ACustomAnimate, createLine, getTextBounds, registerShadowRootGraphic } from '@visactor/vrender';
import type { IGraphic, IRichText, IRichTextCharacter, ITextGraphicAttribute } from '@visactor/vrender';
import { clone, cloneDeep, isArray } from '@visactor/vutils';
registerShadowRootGraphic();
export class TypeWriter extends ACustomAnimate<{ text: string }> {
  declare valid: boolean;
  declare target: IRichText;
  declare targetTextConfig: IRichTextCharacter[];

  getEndProps(): Record<string, any> {
    if (this.valid === false) {
      return {};
    }
    return {
      text: this.to
    };
  }

  onBind(): void {
    const root = this.target.attachShadow();
    const fontSize = this.target.getComputedAttribute('fontSize');
    this.target.attribute.textConfig;
    const line = createLine({
      x: 0,
      y: 0,
      dy: -fontSize / 2,
      points: [
        { x: 0, y: 0 },
        { x: 0, y: fontSize }
      ],
      stroke: 'black',
      // TODO 有bug，不展示
      opacity: 0,
      lineWidth: 1
    });
    root.add(line);
    this.targetTextConfig = cloneDeep(this.target.attribute.textConfig || []);
  }

  onEnd(): void {
    this.target.detachShadow();
    return;
  }

  onUpdate(end: boolean, ratio: number, out: Record<string, any>): void {
    if (this.valid === false) {
      return;
    }
    // update text
    // const { textConfig = [] } = this.target.attribute;
    const totalLength = this.targetTextConfig.reduce(
      (a, b) => (a + (b as any).text ? (b as any).text.toString().length : 1),
      0
    );
    const nextLength = totalLength * ratio;
    const nextTextConfig: IRichTextCharacter[] = [];
    let curLen = 0;
    this.targetTextConfig.forEach(config => {
      if (curLen >= nextLength) {
        return;
      }
      const len = (config as any).text ? (config as any).text.toString().length : 1;
      if (curLen + len < nextLength) {
        nextTextConfig.push(config);
        curLen += len;
      } else {
        nextTextConfig.push({
          ...config,
          text: (config as any).text.substr(0, nextLength - curLen)
        });
        curLen = nextLength;
      }
    });
    this.target.setAttributes({
      textConfig: nextTextConfig
    });

    const cache = this.target.getFrameCache();
    if (!(cache.lines && cache.lines.length)) {
      return;
    }
    const lastLine = cache.lines[cache.lines.length - 1];
    const x = cache.left + lastLine.left + lastLine.actualWidth;
    const y = cache.top + lastLine.top;
    const h = lastLine.paragraphs?.[lastLine.paragraphs.length - 1]?.fontSize || lastLine.height;
    const line = this.target.shadowRoot?.at(0) as IGraphic;

    // console.log(x, y, h, line);
    // const attr = { ...this.target.attribute, ...out };
    // const width = getTextBounds(attr).width();
    // const { textAlign } = attr as ITextGraphicAttribute;
    // let x = width;
    let dx = 0;
    if (lastLine.textAlign === 'center') {
      dx = -lastLine.actualWidth / 2;
    } else if (lastLine.textAlign === 'right') {
      dx = -lastLine.actualWidth;
    }

    line.setAttributes({
      x: x + dx,
      y,
      points: [
        { x: 0, y: 0 },
        { x: 0, y: h }
      ]
    } as any);
  }
}
