import type { ITicker, ITimeline } from '@visactor/vrender-core';
import { DefaultTimeline, ManualTicker } from '@visactor/vrender-core';
import type { ICharacterPickInfo, IStoryEvent } from '../../interface/event';
import { CharacterBase } from '../character-base';
import type { ITableGraphicAttribute } from './graphic/vtable-graphic';
import { VTableGraphic } from './graphic/vtable-graphic';
import type { ICharacterConfig, ICharacterInitOption } from '../../interface/dsl/dsl';
import type { ITableCharacterConfig } from '../../interface/dsl/table';
import { getLayoutFromWidget } from '../../utils/layout';
import type { ITableCharacterRuntime, IUpdateConfigParams } from './interface/runtime';
import { TableConfigProcess } from './table-config-process';
import type { ICharacterTable, IVTable } from './interface/character-table';
import { CommonSpecRuntimeInstance } from './runtime/common-spec';
import { CommonLayoutRuntimeInstance } from '../common/runtime/common-layout';
import { TableTypeRuntimeInstance } from './runtime/table-type';
import { CellStyleRuntimeInstance } from './runtime/cell-style';
import { ColWidthRuntimeInstance } from './runtime/col-width';
import { RowHeightRuntimeInstance } from './runtime/row-height';

export class CharacterTable<T extends ITableGraphicAttribute>
  extends CharacterBase<ITableGraphicAttribute>
  implements ICharacterTable
{
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
    const table = true;
    // 是否包含panel, >0为包含
    const includePanel = 1;

    return {
      table,
      panel: includePanel > 0
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

  protected _initRuntime(): void {
    this._runtime.push(
      CommonLayoutRuntimeInstance as any,
      TableTypeRuntimeInstance,
      CommonSpecRuntimeInstance,
      CellStyleRuntimeInstance,
      ColWidthRuntimeInstance,
      RowHeightRuntimeInstance
    );
  }
  protected _clearRuntime(): void {
    this._runtime.length = 0;
  }

  protected getViewBoxFromSpec() {
    const layout = getLayoutFromWidget(this._config.position);
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
      spec: this._config.options.spec,
      dpr: this._canvas.getDpr(),
      autoRender: false,
      width: 500,
      height: 500,
      interactive: false,
      panel: {},
      ticker: this._ticker,
      zIndex: this._config.zIndex ?? 0,
      chartOption: {
        disableTriggerEvent: true,
        disableDirtyBounds: true,
        mode: 'desktop-browser'
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
