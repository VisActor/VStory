import { Generator, vglobal } from '@visactor/vrender-core';
import type { IReleaseable } from '@visactor/vstory-core';
import { isArray } from '@visactor/vutils';

type ICharacterSnapShotItem = {
  id: number;
  timestamp: number;
  characterId: string;
  diffConfig: any;
};

type ISnapShotItem = {
  id: number;
  timestamp: number;
  snapshots: ICharacterSnapShotItem[];
};

type ISnapShotOptions = {
  threshold?: number;
};

export class SnapshotManager implements IReleaseable {
  protected _snapshots: ISnapShotItem[] = [];
  protected pointer: number = 0;
  protected threshold: number;
  protected _tempCharacterSnapshotList: ICharacterSnapShotItem[] = [];

  constructor(options?: ISnapShotOptions) {
    this.threshold = options?.threshold ?? 50;
  }

  pushSnapshot(snapshot: ICharacterSnapShotItem | ICharacterSnapShotItem[]) {
    if (!isArray(snapshot)) {
      snapshot = [snapshot];
    }
    this._snapshots.length = this.pointer;
    this._snapshots.push({
      id: Generator.GenAutoIncrementId(),
      timestamp: Date.now(),
      snapshots: snapshot
    });
    if (this._snapshots.length > this.threshold) {
      this._snapshots.shift();
    }
    this.pointer++;
  }

  pushSnapshotNextTick(snapshot: ICharacterSnapShotItem | ICharacterSnapShotItem[]) {
    if (!isArray(snapshot)) {
      snapshot = [snapshot];
    }
    this._tempCharacterSnapshotList.push(...snapshot);
    vglobal.getRequestAnimationFrame()(() => {
      this.pushSnapshot(this._tempCharacterSnapshotList);
      this._tempCharacterSnapshotList = [];
    });
  }

  popSnapshot() {
    return this._snapshots.pop();
  }

  release() {
    this._snapshots = [];
  }
}
