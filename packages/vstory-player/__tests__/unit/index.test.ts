import { VChartVisibilityActionProcessor } from '../../src/processor/chart/visibility';

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
      forEachChildren: cb => cb(childRect, 0)
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

    processor.commonSeriesAppear({}, series, 'appear', createPayload(), true);

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

    processor.commonSeriesAppear({}, series, 'appear', createPayload(), true);

    expect(product.executeAnimation).toHaveBeenCalledWith({ type: 'growHeightIn' });
    expect(product.getFinalAttribute()).toEqual(product.attribute);
  });
});
