import React from 'react';
import Cell from './Cell';
import ShipsSet from './ShipsSet';

class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [...(new Array(10)).keys()].map(() =>
        [...(new Array(10)).keys()].map(() =>
          ({
            correspondingShip: null,
            attempted: false
          }))
      )
    };
    this.cellAttempt = this.cellAttempt.bind(this);
    this.makeRandomShoot = this.makeRandomShoot.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.fieldType === 'computer') {
      console.log('props', this.props);
      console.log('nextProps', nextProps);
    }
    return this.state !== nextState || this.props.shootingTurn !== nextProps.shootingTurn;
  }

  cellAttempt(x, y, event) {
    let cells = this.state.cells.map((row) => row.slice());
    cells[x][y].attempted = true;
    if (cells[x][y].correspondingShip) {
      cells[x][y].correspondingShip.shipWasAttempted();
      if (cells[x][y].correspondingShip.destroyed) {
        cells[x][y].correspondingShip.getSurroundings().map((surPoint) => {
          cells[surPoint.x][surPoint.y].attempted = true;
        });
      }
    }
    this.setState({cells})
    if (!cells[x][y].correspondingShip)
      this.props.switchPlayer();
  }

  makeRandomShoot() {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    while (this.state.cells[x][y].attempted)
    console.log('x:', x + 1, ', y:', y + 1);
    this.cellAttempt(x, y);
  }

  componentWillMount() {
    let ships = new ShipsSet(),
      cells = this.state.cells.map((row) => row.slice());
    ships.ships.map((ship) => {
      ship.getCompartments().map((compartment) => {
        cells[compartment.x][compartment.y].correspondingShip = ship;
      })
    })
    this.setState({cells});
  }

  componentDidUpdate() {
    console.log(`componentDidUpdate called on ${this.props.fieldType} field`);
    console.log(`!!!`, this.props.fieldType);
    console.log('!!!shootingTurn', this.props.shootingTurn);
    if (this.props.shootingTurn === `computer` && this.props.fieldType === `user`) {
      setTimeout(this.makeRandomShoot, 1000);
      console.log(`computer did shoot`);
    }
  }

  render() {
    let cells = this.state.cells.map((row, x) =>
      row.map((cell, y) =>
        (<Cell {...cell} key={`${x}.${y}`}
               fieldType={this.props.fieldType}
               correspondingShip={cell.correspondingShip}
               cellAttempt={this.cellAttempt.bind(this, x, y)}/>))
    );
    return (
      <div className={`field`}>
        {[].concat.apply([], cells)}
      </div>
    );
  }
}

GameField.propTypes = {
  fieldType: React.PropTypes.oneOf(['user', 'computer']).isRequired
};

export default GameField;