import React from 'react';
import Cell from './Cell';
import gameState from './GameState';

class GameField extends React.Component {

  render() {
    let cells = this.props.cells.map((row, x) =>
      row.map((cell, y) => {
      let borders = '';
      if (cell.correspondingShip) {
        if (x !== 0 && !this.props.cells[x - 1][y].correspondingShip)
          borders += 'top ';
        if (y !== 9 && !this.props.cells[x][y + 1].correspondingShip)
          borders += 'right ';
        if (x !== 9 && !this.props.cells[x + 1][y].correspondingShip)
          borders += 'bottom ';
        if (y !== 0 && !this.props.cells[x][y - 1].correspondingShip)
          borders += 'left ';
      }
        return (<Cell {...cell} key={`${x}.${y}`}
                fieldType={this.props.fieldType}
                correspondingShip={cell.correspondingShip}
                borders={this.props.fieldType === `user` && gameState.state.gameStatus ? borders.trim() : null}
                activeField={gameState.state.gameStatus === `on` && gameState.state.shootingTurn === `user` && this.props.fieldType === `computer`}
                cellAttempt={gameState.cellAttempt.bind(gameState, x, y, this.props.fieldType)}/>)})
    );
    return (
      <div className={`field`}>
        {[].concat.apply([], cells)}
      </div>
    );
  }
}

GameField.propTypes = {
  fieldType: React.PropTypes.oneOf(['user', 'computer']).isRequired,
  cells: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.object)).isRequired
};

export default GameField;