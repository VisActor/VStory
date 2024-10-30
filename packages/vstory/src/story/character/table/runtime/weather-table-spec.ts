import { merge } from '@visactor/vutils';
import type { CharacterTable } from '../character';
import type { ITableCharacterRuntime } from './interface';
import { WeatherBox } from '@visactor/vrender-components';
import { themes } from '@visactor/vtable';
import { text } from 'stream/consumers';
import type { ITableCharacterConfig, IWeatherTableCharacterConfig } from '../../dsl-interface';

type IDataType = {
  city: string;
  date: string;
  rain: number;
  wind: number;
  snow: number;
}[];

export class WeatherTableRuntime implements ITableCharacterRuntime {
  type = 'CommonSpec';

  protected declare _character: CharacterTable;

  constructor(character: CharacterTable) {
    this._character = character;
  }

  onConfigReady() {
    const rawSpec = this._character.specProcess.getVisSpec();
    const options = this._character.specProcess.getCharacterConfig().options as IWeatherTableCharacterConfig['options'];
    if (!options) {
      return;
    }
    if (options.data) {
      const { records, columns } = this.parseData(options.data, options);
      merge(rawSpec, {
        records,
        columns,
        defaultHeaderRowHeight: 30,
        heightMode: 'adaptive',
        padding: options.padding,
        theme: themes.DEFAULT.extends({
          underlayBackgroundColor: 'transparent',
          headerStyle: {
            bgColor: 'transparent',
            borderLineWidth: 0
          },
          frameStyle: {
            borderLineWidth: 0
          }
        })
      });
    }
  }

  parseData(data: IDataType, options: IWeatherTableCharacterConfig['options']) {
    const dateSet = new Set();
    const citySet = new Set();
    data.forEach(d => {
      dateSet.add(d.date);
      citySet.add(d.city);
    });
    const dateKeys = Array.from(dateSet.values());
    const records: any = Array.from(citySet.values()).map(item => {
      const out: any = {
        city: item
      };
      dateKeys.forEach(date => {
        const datum = data.find(d => d.city === item && d.date === date);
        if (datum) {
          out[date as any] = {
            rain: datum.rain,
            wind: datum.wind,
            snow: datum.snow
          };
        }
      });
      return out;
    });

    // TODO 后续放到runtime中
    const customLayout = (key: string) => (args: any) => {
      const { table, row, col, rect } = args;
      const record = table.getCellOriginRecord(col, row);
      const { height, width } = rect ?? table.getCellRect(col, row);

      const value = record[key];
      // TODO WeatherBox自执行，会重复绘制，每次执行的时候需要重新调用player的渲染
      const weatherBox = new WeatherBox({
        width: width,
        height: height,
        rainRatio: value.rain,
        snowRatio: value.snow,
        windRatio: value.wind,
        rainCountThreshold: 9,
        snowCountThreshold: 6,
        stroke: 'white',
        lineWidth: 2
      });

      // container.add(weatherBox as any);
      return {
        rootContainer: weatherBox,
        renderDefault: false
      };
    };

    const columns: any = [
      {
        field: 'city',
        title: '',
        width: 'auto',
        style: {
          borderLineWidth: 0,
          padding: 0,
          textAlign: 'left',
          bgColor: 'transparent',
          color: 'green',
          ...(options.leftTitleStyle || {})
        }
      },
      ...dateKeys.map(date => {
        return {
          field: date,
          title: date,
          width: 60,
          height: 100,
          style: {
            borderLineWidth: 0
          },
          headerStyle: {
            padding: 0,
            color: 'red',
            ...(options.topTitleStyle || {})
          },
          customLayout: customLayout(date as any)
        };
      })
    ];

    return {
      records,
      columns
    };
  }
}
