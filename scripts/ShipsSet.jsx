import Ship from './Ship';
import Point from './Point';
class ShipsSet {
  /**
   * Represents a set of ships
   * @param {Array} ships
   */
  constructor () {
    this.shipsPlacement = new Array(10);
    this.ships = [];
    for (let i = 0; i < 10; i++) {
      this.shipsPlacement[i] = new Array(10);
      for (let j = 0; j < 10; j++) {
        this.shipsPlacement[i][j] = 0;
      }
    }
    // First we start from generating and placing the biggest ship - 4-decker
    let battleship = this.generateRandomShip(4);
    this.assignPlacement(battleship);
    // Generate two 3-deckers
    let cruisers = this.generateSeveralShips(2, 3);
    // Generate three 2-deckers
    let destroyers = this.generateSeveralShips(3, 2);
    // Generate four 1-deckers
    let submarines = this.generateSeveralShips(4, 1);
    this.ships = this.ships.concat(battleship, cruisers, destroyers, submarines);
  }

  generateRandomShip(size) {
    let directions = [new Point(0, 1), new Point(1, 0)];
    let ship;
    do {
      ship = new Ship (size, new Point(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)),
        directions[Math.round(Math.random())]);
    } while (!ship.isOnField());
    return ship;
  }

  generateSeveralShips(number, size) {
    let ships = new Array(number);
    for (let i = 0; i < number; i++) {
      do {
        ships[i] = this.generateRandomShip(size);
      } while (!this.spaceIsAvailable(ships[i]))
      this.assignPlacement(ships[i])
    }
    return ships;
  }

  spaceIsAvailable(ship) {
    let acceptable = true;
    ship.getCompartments().map((compartment)=>{
      if (this.shipsPlacement[compartment.x][compartment.y] !== 0) {
        acceptable = false;
        return acceptable;
      }
    });
    ship.getSurroundings().map((surroundingPoint)=>{
      if (this.shipsPlacement[surroundingPoint.x][surroundingPoint.y] == 1) {
        acceptable = false;
        return acceptable;
      }
    });
    return acceptable;
  }

  assignPlacement(ship) {
    ship.getCompartments().map((compartment)=>{
      this.shipsPlacement[compartment.x][compartment.y] = 1;
    });
    ship.getSurroundings().map((surroundingPoint)=>{
      this.shipsPlacement[surroundingPoint.x][surroundingPoint.y] = 2;
    });
  }
}

export default ShipsSet;