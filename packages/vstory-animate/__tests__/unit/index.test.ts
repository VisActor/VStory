import { BarBounce } from '../../src/customAnimates/bar-bounce';
import { BarLeap } from '../../src/customAnimates/bar-leap';

describe('custom bar animates', () => {
  it('should not crash when BarBounce receives a null from rect', () => {
    const animate = new BarBounce(null, { x: 20, x1: 60, y: 10, y1: 110 }, 1000, 'linear' as any, {});
    const out: Record<string, any> = {};

    animate.onUpdate(false, 0.5, out);

    expect(animate.getFromProps()).toMatchObject({ y: 110, y1: 110, x: 20, x1: 60 });
    expect(animate.getEndProps()).toMatchObject({ y: 10, y1: 110, x: 20, x1: 60 });
    expect(Number.isFinite(out.y)).toBe(true);
    expect(Number.isFinite(out.y1)).toBe(true);
  });

  it('should not keep a synthesized height on the collapsed BarBounce start rect', () => {
    const animate = new BarBounce(null, { x: 20, y: 10, y1: 110, width: 40 }, 1000, 'linear' as any, {});

    expect(animate.getFromProps()).toMatchObject({ x: 20, y: 110, y1: 110, width: 40 });
    expect(animate.getFromProps()).not.toHaveProperty('height');
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
    expect(out.x).toBeUndefined();
  });

  it('should keep BarBounce in horizontal mode after normalizing rect attrs', () => {
    const animate = new BarBounce(null, { x: 120, x1: 20, y: 40, height: 20 }, 1000, 'linear' as any, {});
    const out: Record<string, any> = {};

    animate.onUpdate(false, 0.5, out);

    expect(out.x).toBeDefined();
    expect(out.x1).toBeDefined();
    expect(out.y).toBeUndefined();
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
});
