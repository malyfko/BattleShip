import React from 'react';
import Cell from './Cell';
import Ship from './Ship';

class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells : [...(new Array(10)).keys()].map(()=>
        [...(new Array(10)).keys()].map(()=>
          ({coveredWithAShip: false,
            attempted: false}))
      )
    };
    this.cellAttempt = this.cellAttempt.bind(this);
  }

  cellAttempt(x, y, event) {
    let cells = this.state.cells.map((row)=>row.slice());
    cells[x][y].attempted = true;
    this.setState({cells})
  }

  generateShips(size, amount) {

  }

  placeShips() {

  }

  render() {
    let cells = this.state.cells.map((row, x)=>
      row.map((cell, y)=>
        <Cell {...cell} key={`${x}.${y}`}
              fieldType={this.props.fieldType}
              cellAttempt={this.cellAttempt.bind(this, x, y)}/>)
    )
    return (
      <div className={`field`}>
        {[].concat.apply([], cells)}
      </div>
    );
  }
}

GameField.propTypes = {
  fieldType: React.PropTypes.oneOf(['user','computer']).isRequired
};

export default GameField;