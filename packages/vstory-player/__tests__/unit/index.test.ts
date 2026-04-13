import { VChartVisibilityActionProcessor } from '../../src/processor/chart/visibility';

jest.mock('@visactor/vstory-core', () => ({
  globalProcessorRegistry: { registerProcessor: jest.fn() },
  CharacterType: {}
}));

jest.mock('@visactor/vstory-animate', () => ({}));

function createPayload() {
  return {
    animation: {
      effect: 'grow',
      duration: 800,
      easing: 'linear',
      oneByOne: false,
      loop: false
    }
  };
}

describe('VChartVisibilityActionProcessor', () => {
  it('should patch rect children final attrs before executing appear animations', () => {
    const childRect = {
      type: 'rect',
      attribute: { x: 10, y: 20, y1: 60, width: 16 },
      getFinalAttribute: jest.fn(() => undefined)
    };
    const product = {
      type: 'group',
      setAttribute: jest.fn(),
      executeAnimation: jest.fn(),
      forEachChildren: (cb: any) => cb(childRect, 0)
    };
    const mark = {
      type: 'rect',
      getProduct: () => product
    };
    const series = {
      getMarksWithoutRoot: () => [mark]
    };
    const processor = new VChartVisibilityActionProcessor();

    jest.spyOn(processor, 'getMarkAnimateConfig').mockReturnValue({ type: 'growHeightIn' });

    (processor as any).commonSeriesAppear({}, series, 'appear', createPayload(), true);

    expect(product.setAttribute).toHaveBeenCalledWith('visibleAll', true);
    expect(product.executeAnimation).toHaveBeenCalledWith({ type: 'growHeightIn' });
    expect(childRect.getFinalAttribute()).toEqual(childRect.attribute);
  });

  it('should patch a standalone rect product when final attrs are missing', () => {
    const product = {
      type: 'rect',
      attribute: { x: 12, y: 18, y1: 42, width: 20 },
      getFinalAttribute: jest.fn(() => undefined),
      setAttribute: jest.fn(),
      executeAnimation: jest.fn()
    };
    const mark = {
      type: 'rect',
      getProduct: () => product
    };
    const series = {
      getMarksWithoutRoot: () => [mark]
    };
    const processor = new VChartVisibilityActionProcessor();

    jest.spyOn(processor, 'getMarkAnimateConfig').mockReturnValue({ type: 'growHeightIn' });

    (processor as any).commonSeriesAppear({}, series, 'appear', createPayload(), true);

    expect(product.executeAnimation).toHaveBeenCalledWith({ type: 'growHeightIn' });
    expect(product.getFinalAttribute()).toEqual(product.attribute);
  });

  it('should patch line graphic final attrs to prevent growPoints crash', () => {
    const childLine = {
      type: 'line',
      attribute: {
        points: [
          { x: 0, y: 100 },
          { x: 50, y: 50 },
          { x: 100, y: 80 }
        ]
      },
      getFinalAttribute: jest.fn(() => undefined)
    };
    const product = {
      type: 'group',
      setAttribute: jest.fn(),
      executeAnimation: jest.fn(),
      forEachChildren: (cb: any) => cb(childLine, 0)
    };
    const mark = {
      type: 'line',
      getProduct: () => product
    };
    const series = {
      getMarksWithoutRoot: () => [mark]
    };
    const processor = new VChartVisibilityActionProcessor();

    jest.spyOn(processor, 'getMarkAnimateConfig').mockReturnValue({ type: 'growPointsYIn' });

    (processor as any).commonSeriesAppear({}, series, 'appear', createPayload(), true);

    expect(product.executeAnimation).toHaveBeenCalledWith({ type: 'growPointsYIn' });
    // After patching, getFinalAttribute should fall back to attribute (which has points)
    const finalAttr = childLine.getFinalAttribute();
    expect(finalAttr).toEqual(childLine.attribute);
    expect(finalAttr.points).toBeDefined();
    expect(finalAttr.points).toHaveLength(3);
  });
});
