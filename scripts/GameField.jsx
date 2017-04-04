import React from 'react';
import equal from 'deep-equal';
import Cell from './Cell';
import ShipsSet from './ShipsSet';
import gameState from './GameState';

class GameField extends React.Component {

  render() {
    let cells = this.props.cells.map((row, x) =>
      row.map((cell, y) =>
        (<Cell {...cell} key={`${x}.${y}`}
               fieldType={this.props.fieldType}
               correspondingShip={cell.correspondingShip}
               cellAttempt={gameState.cellAttempt.bind(gameState, x, y, this.props.fieldType)}/>))
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