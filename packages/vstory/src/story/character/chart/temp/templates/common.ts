import { array } from '@visactor/vutils';
import type { DataInfo, StandardData } from '../../data/interface';

export function getDimensions(info: DataInfo) {
  const ordinalFields: string[] = [];
  const linearFields: string[] = [];
  Object.keys(info).forEach(key => {
    if (key.startsWith('VGRAMMAR_') || key.startsWith('__VCHART_')) {
      return;
    }
    if (info[key].type === 'linear') {
      linearFields.length === 0 && linearFields.push(key);
    } else if (info[key].type === 'ordinal') {
      ordinalFields.push(key);
    }
  });

  return {
    ordinalFields,
    linearFields
  };
}

export function getSeriesLabelSpec(direction: 'horizontal' | 'vertical', visible = true) {
  return {
    visible,
    position: direction === 'vertical' ? 'end' : 'start',
    label: {
      style: {
        lineHeight: '100%',
        lineWidth: 1,
        stroke: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold'
      },
      space: 10
    }
  };
}

export function getTotalLabelSpec(visible: boolean) {
  return {
    visible,
    position: 'top',
    overlap: false,
    clampForce: false,
    formatConfig: {
      fixed: 0,
      content: 'value'
    },
    style: {
      lineHeight: '100%',
      lineWidth: 1,
      fill: '#1F2329',
      stroke: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold'
    }
  };
}
