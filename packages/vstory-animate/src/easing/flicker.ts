export function flicker(t: number, n: number) {
  const step = 1 / n;
  let flag = 1;
  while (t > step) {
    t -= step;
    flag *= -1;
  }
  const v = (flag * t) / step;
  return v > 0 ? v : 1 + v;
}

export function flicker1(t: number) {
  return flicker(t, 3);
}
export function flicker2(t: number) {
  return flicker(t, 3);
}
export function flicker3(t: number) {
  return flicker(t, 3);
}
export function flicker4(t: number) {
  return flicker(t, 3);
}
export function flicker5(t: number) {
  return flicker(t, 5);
}
export function flicker6(t: number) {
  return flicker(t, 5);
}
export function flicker7(t: number) {
  return flicker(t, 5);
}
export function flicker8(t: number) {
  return flicker(t, 5);
}
export function flicker9(t: number) {
  return flicker(t, 5);
}
export function flicker10(t: number) {
  return flicker(t, 5);
}
