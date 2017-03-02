class Point {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  subtract(that) {
    return new Point (this.x - that.x, this.y - that.y);
  }

  add(that) {
    return new Point (this.x + that.x, this.y + that.y);
  }

  equal(that) {
    return (this.x === that.x && this.y === that.y);
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }

  isOnField() {
    return (this.x >= 0 && this.x < 10 && this.y >= 0 && this.y < 10);
  }
}

export default Point;