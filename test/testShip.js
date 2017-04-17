import { assert } from 'chai';
import Ship from '../scripts/Ship';
import Point from '../scripts/Point';

describe('Ship', () => {
  describe('#getSurroundings()', () => {
    it('should return correct surroundings', () => {
      const ship = new Ship(4, new Point(1, 0), new Point(1, 0));
      const surroundings = ship.getSurroundings();
      const surroundingsString = surroundings.map(surroundingPoint => surroundingPoint.toString());
      assert.include(surroundingsString, new Point(0, 0).toString(), 'contains point (0, 0)');
      assert.include(surroundingsString, new Point(2, 1).toString(), 'contains point (2, 1)');
      assert.notInclude(surroundingsString, new Point(1, 0).toString(), 'doesn`t contain point (1, 0)');
      assert.notInclude(surroundingsString, new Point(4, 0).toString(), 'doesn`t contain point (4, 0)');
      assert.notInclude(surroundingsString, new Point(3, -1).toString(), 'doesn`t contain point (3, -1)');
    });
  });
  describe('#isOnField()', () => {
    it('should check if ship is on the field', () => {
      const ship1 = new Ship(4, new Point(0, 0), new Point(-1, 0));
      assert.isFalse(ship1.isOnField());
      const ship2 = new Ship(3, new Point(2, 3), new Point(0, 1));
      assert.isTrue(ship2.isOnField());
    });
  });
});
