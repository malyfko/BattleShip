import Point from './Point';
class Ship {
  /**
   * Represents a ship
   * @param {int} size
   * @param {Point} anchor
   * @param {Point} direction
   */
  constructor(size, anchor, direction){
    this.size = size;
    this.anchor = anchor; 
    this.direction = direction;
  }

  getCompartments() {
    let compartments = [this.anchor];
    for (let i = 1; i < this.size; i++) {
      compartments.push(compartments[compartments.length - 1].add(this.direction));
    }
    return compartments;
  }

  getSurroundings() {
    let ship = this.getCompartments(),
        surroundings = [],  surroundingsString = [],
        surroundPoints = [new Point(-1, -1), new Point(-1, 0), new Point(-1, 1),
                          new Point(0, -1), new Point(0, 1),
                          new Point(1, -1), new Point(1, 0), new Point(1 ,1)],
    shipString = ship.map(function (compartment) {
      return compartment.toString();
    });
    ship.map(function (compartment) {
      surroundPoints.map((surPoint)=>{
        let p = compartment.add(surPoint);
        if (surroundingsString.indexOf(p.toString()) === -1 && shipString.indexOf(p.toString()) === -1 && p.isOnField()) {
          surroundingsString.push((p).toString());
          surroundings.push(p);
        }
      })
    });
     return surroundings;
  }

  isOnField() {
    let acceptable = true;
    this.getCompartments().map((compartment)=> {
      if (!compartment.isOnField())
        acceptable = false;
        return acceptable;
    });
    this.getSurroundings().map((surPoint)=>{
      if (!surPoint.isOnField())
        acceptable = false;
      return acceptable;
    });
    return acceptable
  }
}

export default Ship;