import Ship from '../scripts/Ship.jsx';
import Point from '../scripts/Point.jsx';
var assert = require('chai').assert;
describe('Ship', function() {
  describe('#getSurroundings()', function() {
    it ('should return correct surroundings', function () {
      var ship = new Ship(4, new Point(1, 0), new Point(1, 0));
      var surroundings = ship.getSurroundings();
      var surroundingsString = surroundings.map(function (surroundingPoint) {
        return surroundingPoint.toString();
      });
      assert.include(surroundingsString, new Point(0, 0).toString(), 'contains point (0, 0)');
      assert.include(surroundingsString, new Point(2, 1).toString(), 'contains point (2, 1)');
      assert.notInclude(surroundingsString, new Point(1, 0).toString(), 'doesn`t contain point (1, 0)');
      assert.notInclude(surroundingsString, new Point(4, 0).toString(), 'doesn`t contain point (4, 0)');
      assert.notInclude(surroundingsString, new Point(3, -1).toString(), 'doesn`t contain point (3, -1)');
    });
  });
});
