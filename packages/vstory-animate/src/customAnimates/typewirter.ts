import { ACustomAnimate, createLine, getTextBounds, registerShadowRootGraphic } from '@visactor/vrender';
import type { EasingType, IGraphic, IRichText, IRichTextCharacter, ITextGraphicAttribute } from '@visactor/vrender';
import { clone, cloneDeep, isArray } from '@visactor/vutils';
import { Easing } from '@visactor/vrender';
registerShadowRootGraphic();

type ITypeWriterParams = {
  text: string;
  effect: 'default' | 'blur' | 'scale';
  blur: number;
  scale: number;
  delta: number;
};

export class TypeWriter extends ACustomAnimate<{ text: string }> {
  declare valid: boolean;
  declare target: IRichText;
  declare targetTextConfig: IRichTextCharacter[];
  declare originTextConfig: IRichTextCharacter[];

  constructor(
    from: { text: string },
    to: { text: string },
    duration: number,
    easing: EasingType,
    params: ITypeWriterParams
  ) {
    super(from, to, duration, easing, params || {});
  }

  getEndProps(): Record<string, any> {
    if (this.valid === false) {
      return {};
    }
    return {
      text: this.to
    };
  }

  onBind(): void {
    this.targetTextConfig = [];
    (this.target.attribute.textConfig || []).forEach(config => {
      if (!(config as any).text) {
        this.targetTextConfig.push(config);
      } else {
        Array.from((config as any).text).forEach(str => {
          this.targetTextConfig.push({
            ...config,
            text: str,
            _opacity: (config as any).opacity
          } as any);
        });
      }
    });
    this.originTextConfig = cloneDeep(this.target.attribute.textConfig || []);
  }

  onEnd(): void {
    this.target.setAttributes({ textConfig: this.originTextConfig });
    return;
  }

  onUpdate(end: boolean, ratio: number, out: Record<string, any>): void {
    if (this.valid === false) {
      return;
    }
    const delta = this.params.delta ?? 0.3;
    const totalLength = this.targetTextConfig.length;
    const delayStep = (1 - delta) / (totalLength - 1);

    for (let i = 0; i < this.targetTextConfig.length; i++) {
      const config = this.targetTextConfig[i];
      const opacity = (config as any)._opacity ?? 1;
      const delay = i * delayStep;
      if (ratio > delay) {
        (config as any).opacity = opacity;
      } else {
        (config as any).opacity = 0;
      }
    }
    const { effect = 'default' } = this.params;
    if (effect === 'default') {
      this.onUpdateDefault(ratio, delta, this.params.characterEasing);
    } else if (effect === 'blur') {
      this.onUpdateBlur(ratio, delta, this.params.characterEasing);
    } else if (effect === 'scale') {
      this.onUpdateScale(ratio, delta, this.params.characterEasing);
    }
  }

  onUpdateDefault(ratio: number, delta: number, easing: string = 'linear') {
    const nextTextConfig = [...this.targetTextConfig];

    this.target.setAttributes({
      textConfig: nextTextConfig
    });
  }

  onUpdateBlur(ratio: number, delta: number, easing: string = 'linear') {
    const totalLength = this.targetTextConfig.length;
    const delayStep = (1 - delta) / (totalLength - 1);

    // TODO 后续使用blur代替，暂时基于opacity实现
    const easingFunc = (Easing as any)[easing] ?? Easing.linear;
    for (let i = 0; i < this.targetTextConfig.length; i++) {
      const config = this.targetTextConfig[i];
      const opacity = (config as any)._opacity ?? 1;
      const delay = i * delayStep;
      if (ratio > delay) {
        (config as any).opacity = opacity * easingFunc(Math.min((ratio - delay) / delta, 1));
      } else {
        (config as any).opacity = 0;
      }
    }

    const nextTextConfig = [...this.targetTextConfig];

    this.target.setAttributes({
      textConfig: nextTextConfig
    });
  }
  onUpdateFadeUp(ratio: number, delta: number, easing: string = 'linear') {
    const totalLength = this.targetTextConfig.length;
    const delayStep = (1 - delta) / (totalLength - 1);

    // TODO 暂不支持
    const deltaY = this.params.dy ?? 20;
    const easingFunc = (Easing as any)[easing] ?? Easing.linear;
    for (let i = 0; i < this.targetTextConfig.length; i++) {
      const config = this.targetTextConfig[i];
      const opacity = (config as any)._opacity ?? 1;
      const delay = i * delayStep;
      if (ratio > delay) {
        (config as any).opacity = opacity * easingFunc(Math.min((ratio - delay) / delta, 1));
      } else {
        (config as any).opacity = 0;
      }
    }

    const nextTextConfig = [...this.targetTextConfig];

    this.target.setAttributes({
      textConfig: nextTextConfig
    });
  }
  onUpdateScale(ratio: number, delta: number, easing: string = 'linear') {
    const totalLength = this.targetTextConfig.length;
    const delayStep = (1 - delta) / (totalLength - 1);

    // blur
    const easingFunc = (Easing as any)[easing] ?? Easing.linear;
    for (let i = 0; i < this.targetTextConfig.length; i++) {
      const config = this.targetTextConfig[i];
      const fontSize = (config as any)._fontSize ?? this.target.attribute.fontSize ?? 12;
      (config as any)._fontSize = fontSize;
      const delay = i * delayStep;
      if (ratio > delay) {
        (config as any).fontSize = fontSize * easingFunc(Math.min((ratio - delay) / delta, 1));
      }
    }

    const nextTextConfig = [...this.targetTextConfig];

    this.target.setAttributes({
      textConfig: nextTextConfig
    });
  }
}
