type ScaleComputeInfo = {
  total: number;
  bandWidthCount: number;
  paddingCount: number;
};

export function computeScalePadding(
  infoA: ScaleComputeInfo,
  infoB: ScaleComputeInfo,
  min?: number,
  max?: number
): number | false {
  // 首先，如果成等比，那么就无法计算，
  if (infoA.bandWidthCount / infoA.paddingCount === infoB.bandWidthCount / infoB.paddingCount) {
    return false;
  }
  // 先消元 padding
  const BAScale = infoA.paddingCount / infoB.paddingCount;
  const tempB = { ...infoB };
  tempB.total *= BAScale;
  tempB.bandWidthCount *= BAScale;
  const tempA = { ...infoA };
  tempA.total -= tempB.total;
  tempA.bandWidthCount -= tempB.bandWidthCount;
  const bandWidth = tempA.total / tempA.bandWidthCount;
  if (bandWidth < 0) {
    // 错误的编辑信息可以算出负的柱宽度，认为是不合法的操作，直接返回
    return false;
  }
  const paddingSize = (infoA.total - bandWidth * infoA.bandWidthCount) / infoA.paddingCount;

  return Math.min(Math.max(paddingSize / (bandWidth + paddingSize), min ?? 0.01), max ?? 1);
}
