import { merge } from '@visactor/vutils';
import { SHAPE_SELECT_COLOR } from './const';
import { DRAG_ANCHOR_COLOR } from './selection/edit-control/constants';
import type { ControllerAttributes } from './selection/edit-control/transform-control';

export interface RichTextControlAttributes {
  placeholder: string;
  placeholderColor: string;
  keepHeightWhileEmpty: boolean;
  boundsStrokeWhenInput: string;
  syncPlaceholderToTextConfig: boolean;
  stopPropagation: boolean;
}
export class Theme {
  layoutTransformerControl: ControllerAttributes;
  richTextControl: RichTextControlAttributes;

  constructor() {
    this.layoutTransformerControl = {
      // 去掉padding
      // padding: 2,
      resizeBorder: {
        stroke: SHAPE_SELECT_COLOR,
        lineWidth: 1
      },
      cornerRect: {
        fill: 'white',
        stroke: SHAPE_SELECT_COLOR,
        lineWidth: 1,
        width: 8,
        height: 8,
        cornerRadius: 2
      },
      rotateCircle: {
        fill: 'white',
        stroke: SHAPE_SELECT_COLOR,
        radius: 10
      },
      rotatePath: {
        fill: '#000000',
        size: 10,
        angle: Math.PI,
        // eslint-disable-next-line
        symbolType:
          'M95.403.22c0 46.312-33.237 85.002-77.109 93.484v25.663l-69.76-40 69.76-40v23.494C45.47 54.991 65.403 29.897 65.403.219c0-35.962-29.258-65.22-65.22-65.22s-65.22 29.258-65.22 65.22c0 9.686 2.068 19.001 6.148 27.688l-27.154 12.754C-92.011 27.954-95.037 14.348-95.037.22-95.036-52.284-52.32-95 .184-95S95.403-52.284 95.403.22z'
      },
      handlerLine: {
        stroke: SHAPE_SELECT_COLOR,
        lineWidth: 1,
        size: 24
      },
      shapeCircle: {
        fill: 'white',
        lineWidth: 1,
        radius: 4,
        stroke: DRAG_ANCHOR_COLOR,
        startAngle: 0,
        endAngle: Math.PI * 2
      }
    };
    this.richTextControl = {
      placeholder: '请输入文本',
      placeholderColor: '#b088ff',
      keepHeightWhileEmpty: true,
      boundsStrokeWhenInput: '#8249f3',
      syncPlaceholderToTextConfig: false,
      stopPropagation: true
    };
  }

  setLayoutTransformerControlTheme(theme: Partial<ControllerAttributes>) {
    merge(this.layoutTransformerControl, theme);
  }

  setRichTextControlTheme(theme: Partial<RichTextControlAttributes>) {
    merge(this.richTextControl, theme);
  }
}
