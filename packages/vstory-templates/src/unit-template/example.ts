export async function loadExampleData() {
  const data = await fetch(
    'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/vstory/compressed-gun-death-data.json'
  ).then(res => res.json());
  return data;
}

export function decompressData(compressedData: {
  data: Array<[number, number, number]>;
  valueList: any[];
  arrayList: string[];
}): {
  year: number;
  intent: string;
  sex: string;
  age: number;
  race: string;
}[] {
  const { data, valueList, arrayList } = compressedData;
  const parsedData = data
    .map(d => {
      const first3Item = arrayList[d[0]].split(',').map(item => parseInt(item, 10));
      return [...first3Item, d[1], d[2]].map(idx => valueList[idx]);
    })
    .map(list => ({
      year: list[0],
      intent: list[1],
      sex: list[2],
      age: list[3],
      race: list[4]
    }));
  return parsedData;
}
