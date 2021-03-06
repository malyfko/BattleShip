import { assert } from 'chai';
import Point from '../scripts/Point';

describe('Point', () => {
  describe('#add()', () => {
    it('should not modify point when (0, 0) added', () => {
      const point = new Point(2, 5);
      assert.deepEqual(point, point.add(new Point(0, 0)));
    });
    it('should correctly add negative points', () => {
      const point = new Point(4, 1);
      assert.deepEqual(new Point(3, -1), point.add(new Point(-1, -2)));
    });
  });
});
