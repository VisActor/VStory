export const isMatch = (obj: any, source: any) => {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (!obj.hasOwnProperty(key) || obj[key] !== source[key]) {
        return false;
      }
    }
  }
  return true;
};
