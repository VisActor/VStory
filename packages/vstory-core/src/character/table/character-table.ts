import type { IGroup, ITicker, ITimeline } from '@visactor/vrender-core';
import { DefaultTimeline, ManualTicker } from '@visactor/vrender-core';
import type { ICharacterPickInfo, IStoryEvent } from '../../interface/event';
import { CharacterBase } from '../character-base';
import type { ITableGraphicAttribute } from './graphic/vtable-graphic';
import { VTableGraphic } from './graphic/vtable-graphic';
import type { ICharacterConfig, ICharacterInitOption, IUpdateConfigParams } from '../../interface/dsl/dsl';
import type { ITableCharacterConfig } from '../../interface/dsl/table';
import { getLayoutFromWidget } from '../../utils/layout';
import type { ITableCharacterRuntime } from './interface/runtime';
import { TableConfigProcess } from './table-config-process';
import type { ICharacterTable, IVTable } from './interface/character-table';
import { isArray } from '@visactor/vutils';

export class CharacterTable<T extends ITableGraphicAttribute>
  extends CharacterBase<ITableGraphicAttribute>
  implements ICharacterTable
{
  static type = 'Table';

  visActorType: 'table' | 'component' | 'table' | 'common' = 'table';
  protected declare _graphic: VTableGraphic;
  protected declare _config: ITableCharacterConfig;

  // 临时记录 vtable 对象。在第一次执行 afterInitializeTable 后赋值， 在 beforeVRenderDraw 中使用
  // 不临时记录的话，第一次 beforeVRenderDraw 时，graphic 对象还未执行完初始化，当前对象的 _graphic 为 null
  protected _vtable: IVTable;

  protected _ticker: ITicker;
  protected _timeline: ITimeline;
  protected _runtime: ITableCharacterRuntime[] = [];

  constructor(config: ICharacterConfig, option: ICharacterInitOption) {
    super(config, option);
    this._timeline = new DefaultTimeline();
    this._ticker = new ManualTicker([this._timeline]);
    this.configProcess = new TableConfigProcess(this);
  }

  get config() {
    return this._config;
  }

  tickTo(t: number): void {
    this._graphic.vTableStage.ticker.tickAt && this._graphic.vTableStage.ticker.tickAt(t);
  }

  getGraphicBySelector(selector: string | string[]) {
    let table = false;
    let panel = false;
    if (isArray(selector)) {
      selector.forEach(s => {
        const data = this._getGraphicBySelector(s);
        table = table || data.table;
        panel = panel || data.panel;
      });
      return {
        table,
        panel
      };
    }
    return this._getGraphicBySelector(selector);
  }

  _getGraphicBySelector(selector: string) {
    const vtable = this._graphic.vTable;
    let table = false;
    // 是否包含panel, >0为包含
    let includePanel = 1;
    const rowHeader = vtable.scenegraph.rowHeaderGroup;
    const colHeader = vtable.scenegraph.colHeaderGroup;
    const bodyGroup = vtable.scenegraph.bodyGroup;

    let out: any = {
      rowHeader,
      colHeader,
      bodyGroup
    };

    const selectorList = selector.split(' ');
    selectorList.forEach(subSelector => {
      if (subSelector === '*') {
        table = true;
      } else if (/:not\(([^)]+)\)/.test(subSelector)) {
        const match = /:not\(([^)]+)\)/.exec(subSelector)[1];
        out = this.selectByType(out, match, false);
        if (match === 'panel') {
          includePanel = -Infinity; // 如果被排除，那么一定不包含了
        }
      } else {
        out = this.selectByType(out, subSelector);
        if (subSelector === 'panel') {
          includePanel = Infinity; // 如果有正选，那么选中才算
        } else {
          includePanel--;
        }
      }
    });

    return {
      table,
      panel: includePanel > 0,
      ...out
    };
  }

  protected selectByType(
    data: { rowHeader: IGroup; colHeader: IGroup; bodyGroup: IGroup },
    name: string,
    match: boolean = true
  ) {
    return {
      rowHeader: (name === 'rowHeader') === match ? data.rowHeader : null,
      colHeader: (name === 'colHeader') === match ? data.colHeader : null,
      bodyGroup: (name === 'body') === match ? data.bodyGroup : null
    };
  }

  checkEvent(event: IStoryEvent): false | ICharacterPickInfo {
    if (!(event.detailPath ?? event.path).some(g => g === this._graphic)) {
      return false;
    }
    // 点击到图表的空白区域
    if (this._graphic.pointInViewBox((event as any).canvasX, (event as any).canvasY)) {
      return {
        part: 'null',
        graphic: null,
        modelInfo: null,
        graphicType: 'null'
      };
    }
    return false;
  }

  _initGraphic() {
    this.applyConfigToAttribute(this._config, this._config);
    const attribute = this.getAttribute();

    this._graphic = new VTableGraphic(attribute);

    this.canvas.addGraphic(this._graphic);
    // 完成spec设置
    this._runtime.forEach(r => r.afterInitialize?.(this, this._graphic.vTable));
  }

  protected _setAttributes(attr: T): void {
    super._setAttributes(attr);
    // 完成spec更新也需要调用 afterInitialize
    this._runtime.forEach(r => r.afterInitialize?.(this, this._graphic.vTable));
  }

  protected _clearRuntime(): void {
    this._runtime.length = 0;
  }

  protected getViewBoxFromSpec() {
    const layout = getLayoutFromWidget(this._config.position, this);
    const viewBox = {
      x1: layout.x,
      x2: layout.x + layout.width,
      y1: layout.y,
      y2: layout.y + layout.height
    };
    return { layout, viewBox };
  }

  protected applyConfigToAttribute(diffConfig: IUpdateConfigParams, config: IUpdateConfigParams): void {
    this._attribute = this.getDefaultAttribute() as any;
    this._runtime.forEach(r => r.applyConfigToAttribute?.(this));
  }

  getDefaultAttribute(): Partial<ITableGraphicAttribute> {
    return {
      spec: Object.assign({}, this._config.options.spec, {
        records: (this._config.options.spec?.records ?? []).slice()
      }),
      dpr: this._canvas.getDpr(),
      autoRender: false,
      width: 500,
      height: 500,
      interactive: false,
      panel: {},
      ticker: this._ticker,
      zIndex: this._config.zIndex ?? 0,
      mode: this._story.option.mode,
      modeParams: this._story.option.modeParams,
      chartOption: {
        disableTriggerEvent: true,
        disableDirtyBounds: true
      }
    };
  }

  protected _clearGraphic(): void {
    super._clearGraphic();
    this._vtable = null;
  }

  getRuntimeConfig() {
    return this;
  }
}
