export interface IBarRectAnimateProps {
  y?: number;
  y1?: number;
  x?: number;
  x1?: number;
  width?: number;
  height?: number;
  cornerRadius?: number;
}

export interface INormalizedBarRectAnimateProps extends IBarRectAnimateProps {
  y: number;
  y1: number;
  x: number;
  x1: number;
  width: number;
  height: number;
}

export function isVerticalBarRect(from?: IBarRectAnimateProps | null, to?: IBarRectAnimateProps | null) {
  return to?.y1 != null || from?.y1 != null;
}

export function normalizeBarRect(
  rect?: IBarRectAnimateProps | null,
  fallback?: IBarRectAnimateProps | null
): INormalizedBarRectAnimateProps {
  const source = rect ?? {};
  const ref = fallback ?? {};

  const x = source.x ?? ref.x ?? ref.x1 ?? 0;
  const y = source.y ?? ref.y ?? ref.y1 ?? 0;
  const x1 = source.x1 ?? ref.x1 ?? (source.width != null ? x + source.width : ref.width != null ? x + ref.width : x);
  const y1 =
    source.y1 ?? ref.y1 ?? (source.height != null ? y + source.height : ref.height != null ? y + ref.height : y);
  const width = source.width ?? ref.width ?? Math.abs(x1 - x);
  const height = source.height ?? ref.height ?? Math.abs(y1 - y);

  return {
    ...ref,
    ...source,
    x,
    y,
    x1,
    y1,
    width,
    height,
    cornerRadius: source.cornerRadius ?? ref.cornerRadius
  };
}

export function createCollapsedBarRect(rect: IBarRectAnimateProps, vertical: boolean): IBarRectAnimateProps {
  if (vertical) {
    return {
      x: rect.x,
      x1: rect.x1,
      width: rect.width,
      cornerRadius: rect.cornerRadius,
      y: rect.y1 ?? rect.y ?? 0,
      y1: rect.y1 ?? rect.y ?? 0
    };
  }

  return {
    y: rect.y,
    y1: rect.y1,
    height: rect.height,
    cornerRadius: rect.cornerRadius,
    x: rect.x1 ?? rect.x ?? 0,
    x1: rect.x1 ?? rect.x ?? 0
  };
}
