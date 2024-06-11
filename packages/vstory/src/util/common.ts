let uid = -1;

export function CreateUID() {
  return ++uid;
}

export function throwError(msg: string) {
  throw new Error(msg);
}
