import { BarBounce } from '../../src/customAnimates/bar-bounce';
import { BarLeap } from '../../src/customAnimates/bar-leap';
import { PieLeap } from '../../src/customAnimates/pie-leap';


describe('custom animates', () => {
  function bindMockTarget(animate: BarBounce | BarLeap) {
    const target = {
      attribute: { ...animate.getFromProps() },
      setAttributes(next: Record<string, any>) {
        Object.assign(this.attribute, next);
      },
      addUpdatePositionTag: jest.fn(),
      addUpdateShapeAndBoundsTag: jest.fn()
    };

    (animate as any).target = target;
    return target;
  }


  it('should not crash when BarBounce receives a null from rect', () => {
    const animate = new BarBounce(null, { x: 20, x1: 60, y: 10, y1: 110 }, 1000, 'linear' as any, {});
    const out: Record<string, any> = {};
    const target = bindMockTarget(animate);

    animate.onUpdate(false, 0.5, out);

    expect(animate.getFromProps()).toMatchObject({ y: 110, y1: 110, x: 20, x1: 60 });
    expect(animate.getEndProps()).toMatchObject({ y: 10, y1: 110, x: 20, x1: 60 });
    expect(Number.isFinite(out.y)).toBe(true);
    expect(Number.isFinite(out.y1)).toBe(true);
    expect(Number.isFinite(out.height)).toBe(true);
    expect(target.attribute).toMatchObject(out);
    expect(target.addUpdatePositionTag).toHaveBeenCalled();
    expect(target.addUpdateShapeAndBoundsTag).toHaveBeenCalled();
  });

  it('should collapse BarBounce start rect height for vertical bars', () => {
    const animate = new BarBounce(null, { x: 20, y: 10, y1: 110, width: 40 }, 1000, 'linear' as any, {});

    expect(animate.getFromProps()).toMatchObject({ x: 20, y: 110, y1: 110, width: 40, height: 0 });
  });

  it('should keep BarBounce in vertical mode when y1 is zero', () => {
    const animate = new BarBounce(
      { x: 20, x1: 60, y: -40, y1: 0 },
      { x: 20, x1: 60, y: -40, y1: 0 },
      1000,
      'linear' as any,
      {}
    );
    const out: Record<string, any> = {};

    animate.onUpdate(false, 0.5, out);

    expect(out.y).toBeDefined();
    expect(out.y1).toBeDefined();
    expect(out.height).toBeDefined();
    expect(out.x).toBeUndefined();
  });

  it('should keep BarBounce in horizontal mode after normalizing rect attrs', () => {
    const animate = new BarBounce(null, { x: 120, x1: 20, y: 40, height: 20 }, 1000, 'linear' as any, {});
    const out: Record<string, any> = {};
    const target = bindMockTarget(animate);

    animate.onUpdate(false, 0.5, out);

    expect(animate.getFromProps()).toMatchObject({ x: 20, x1: 20, y: 40, height: 20, width: 0 });
    expect(out.x).toBeDefined();
    expect(out.x1).toBeDefined();
    expect(out.width).toBeDefined();
    expect(out.y).toBeUndefined();
    expect(target.attribute).toMatchObject(out);
  });

  it('should handle BarLeap horizontal bars without x1', () => {
    const animate = new BarLeap(null, { x: 120, y: 40, width: 60, height: 20 }, 1000, 'linear' as any, {});
    const pathProxy = {
      clear: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      quadraticCurveTo: jest.fn()
    };

    (animate as any).computePath(0.5, (animate as any).fromCenter, (animate as any).toCenter, pathProxy);

    expect(pathProxy.clear).toHaveBeenCalled();
    expect(pathProxy.moveTo).toHaveBeenCalled();
  });

  it('should not crash when PieLeap receives a null from arc', () => {
    const animate = new PieLeap(null, { x: 40, y: 60, innerRadius: 20, outerRadius: 80 }, 1000, 'linear' as any, {});
    const out: Record<string, any> = {};

    animate.onUpdate(false, 0.5, out);

    expect(animate.getFromProps()).toMatchObject({ x: 540, y: -440, innerRadius: 20, outerRadius: 50 });
    expect(animate.getEndProps()).toMatchObject({ x: 40, y: 60, innerRadius: 20, outerRadius: 80 });
    expect(Number.isFinite(out.x)).toBe(true);
    expect(Number.isFinite(out.y)).toBe(true);
    expect(Number.isFinite(out.outerRadius)).toBe(true);
  });
});
