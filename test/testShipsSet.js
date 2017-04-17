import { assert } from 'chai';
import ShipsSet from '../scripts/ShipsSet';

describe('ShipsSet', () => {
  describe('#generateRandomShip()', () => {
    it('', () => {
      const ship = ShipsSet.generateRandomShip(4);
      assert.equal(ship.size, 4);
      assert.isTrue(ship.isOnField());
    });
  });
});
