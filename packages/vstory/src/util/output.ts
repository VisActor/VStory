const styles: Record<string, string> = {
  warn: 'color: orange;',
  error: 'color: red;',
  info: 'color: blue;'
};

// 定义输出函数
export function logger(type: string, ...args: any) {
  // eslint-disable-next-line no-console
  console.log(`%c[${type.toUpperCase()}] ${args}`, styles[type]);
}
