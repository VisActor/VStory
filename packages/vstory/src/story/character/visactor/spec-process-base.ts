import type { IChartCharacterConfig } from '../dsl-interface';
import { EventEmitter, cloneDeep } from '@visactor/vutils';
import type {
  IDataTempTransform,
  IDataTempTransformConstructor,
  ISpecProcess,
  ICharacterVisactor,
  IUpdateAttributeOption,
  IVisactorTemp
} from './interface';

export abstract class SpecProcessBase implements ISpecProcess {
  // 编辑器config 存储和加载都是这个数据结构
  // 保证结构可序列化。
  protected _characterConfig: IChartCharacterConfig;
  protected _onConfigReadyCall: () => void = null;
  // vTableSpec 只作为临时转换结果，传递给vTable，不会存储。
  protected _visSpec: any;

  protected _dataTempTransform: IDataTempTransform;
  get dataTempTransform() {
    return this._dataTempTransform;
  }

  protected _character: ICharacterVisactor = null;

  emitter: EventEmitter = new EventEmitter();

  constructor(character: ICharacterVisactor, DataTempClass: IDataTempTransformConstructor, call: () => void) {
    this._character = character;
    this._dataTempTransform = new DataTempClass({
      character,
      specProcess: this
    });
    this._onConfigReadyCall = call;
    this._dataTempTransform.emitter.on('specReady', this.transformSpec);
    this._dataTempTransform.emitter.on('tempUpdate', this._tempUpdateSuccess);
    this._dataTempTransform.emitter.on('dataUpdate', this._dataUpdateSuccess);
  }

  // transform spec 的过程
  protected abstract _mergeConfig(): void;

  getVisSpec() {
    return this._visSpec;
  }

  getCharacterConfig() {
    return this._characterConfig;
  }

  protected _dataUpdateSuccess = (option: IUpdateAttributeOption) => {
    this.emitter.emit('beforeTempChange');
    this._characterConfig.options.data = this._dataTempTransform.dataParser.getSave();
    this.emitter.emit('afterDataChange');
  };
  protected _tempUpdateSuccess = (
    option: IUpdateAttributeOption,
    transParams: { currentTemp: IVisactorTemp; nextTemp: IVisactorTemp }
  ) => {
    const willPushHistory = option?.triggerHistory !== false;
    this.emitter.emit('beforeTempChange', willPushHistory, transParams);
    this._characterConfig.type = this._dataTempTransform.specTemp.type;
    this.emitter.emit('afterTempChange', transParams);
  };
  protected _dataTempUpdateSuccess = (
    option: IUpdateAttributeOption,
    transParams: { currentTemp: IVisactorTemp; nextTemp: IVisactorTemp }
  ) => {
    const willPushHistory = option?.triggerHistory !== false;
    this.emitter.emit('beforeTempChange', willPushHistory, transParams);
    this._characterConfig.options.data = this._dataTempTransform.dataParser.getSave();
    this._characterConfig.type = this._dataTempTransform.specTemp.type;
    this.emitter.emit('afterTempChange', transParams);
  };

  protected transformSpec = () => {
    this._visSpec = this._dataTempTransform.getBaseSpec();
    this._mergeConfig();
    this._onConfigReadyCall();
  };

  release() {
    this._onConfigReadyCall = null;
    this._dataTempTransform.release();
    this._dataTempTransform = null;
    this._characterConfig = null;
    this._visSpec = null;
    this._character = null;
  }

  // 得到模版类型
  getCharacterType() {
    return this._characterConfig.type;
  }
}
