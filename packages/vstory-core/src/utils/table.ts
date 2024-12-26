export function getTableTypeFromSpec(spec: any): 'ListTable' | 'PivotTable' | 'PivotChart' {
  if (!spec.indicators) {
    return 'ListTable';
  }
  // 如果有图表
  if (spec.indicators.some((i: { chartSpec: object }) => !!i.chartSpec)) {
    return 'PivotChart';
  }
  return 'PivotTable';
}
