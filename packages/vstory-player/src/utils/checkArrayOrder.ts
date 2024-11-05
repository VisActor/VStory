export function checkArrayOrder(arr: any[], field: string) {
  if (!arr) {
    return 1;
  }
  let isAscending = true;
  let isDescending = true;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i][field] > arr[i + 1][field]) {
      isAscending = false;
    }
    if (arr[i][field] < arr[i + 1][field]) {
      isDescending = false;
    }
  }

  if (isAscending) {
    return 1;
  }
  if (isDescending) {
    return -1;
  }
}
