import { isString } from '@visactor/vutils';

export default class CommonStore<T extends { type: string }> {
  private _store: { [key: string]: T } = {};
  get(key: string) {
    return this._store[key];
  }

  register(key: string, v: T): void;
  register(v: T): void;
  register(keyOrValue: string | T, v?: T): void {
    let key: string = keyOrValue as string;
    if (!isString(keyOrValue)) {
      key = keyOrValue.type;
      v = keyOrValue;
    }

    if (this._store[key]) {
      console.warn(`${key} already exists in ${this.constructor.name}, will be overwritten`);
    }
    this._store[key] = v;
  }

  getList(enableMap: { [key: string]: boolean }, keyList: string[] = []) {
    const result: T[] = [];
    const enableKeyMap: { [key: string]: boolean } = {};
    // 先处理 keyList 中的 key
    keyList.forEach(key => {
      // 如果 keyList 中的 key 在 enableMap 中设置为 false 不添加
      if (enableMap[key] !== false && this._store[key]) {
        result.push(this._store[key]);
        enableKeyMap[key] = true;
      }
    });
    // 再处理 enableMap 中的 key
    Object.keys(enableMap).forEach(key => {
      if (enableMap[key] && this._store[key] && !enableKeyMap[key]) {
        result.push(this._store[key]);
      }
    });
    return result;
  }

  getKeyList(enableMap: { [key: string]: boolean }, keyList: string[] = []) {
    const enableKeyMap: { [key: string]: boolean } = {};
    // 先处理 keyList 中的 key
    keyList.forEach(key => {
      // 如果 keyList 中的 key 在 enableMap 中设置为 false 不添加
      if (enableMap[key] !== false && this._store[key]) {
        enableKeyMap[key] = true;
      }
    });
    // 再处理 enableMap 中的 key
    Object.keys(enableMap).forEach(key => {
      if (enableMap[key] && !enableKeyMap[key]) {
        enableKeyMap[key] = true;
      }
    });
    return Object.keys(enableMap);
  }
}
