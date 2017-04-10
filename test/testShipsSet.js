import ShipsSet from '../scripts/ShipsSet';
var assert = require('chai').assert;
describe ('ShipsSet', function () {
  describe('#generateRandomShip()', function () {
    it('', function() {
      let ship = ShipsSet.generateRandomShip(4);
      assert.equal(ship.size, 4);
      assert.isTrue(ship.isOnField())
    })
  });
});