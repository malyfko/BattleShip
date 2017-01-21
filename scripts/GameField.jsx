import React from 'react';
import Cell from './Cell';

class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  // static propTypes = {
  //   fieldType: React.PropTypes.oneOf(['user','computer'])
  // };

  render() {
    let cells = [...Array(100).keys()].map((i)=>
      <Cell attempted={false} coveredWithAShip={false} key={i}/>);
    console.log('cells', cells);
    return (
      <div className={`field`}>
        {cells}
      </div>
    );
  }
}

GameField.propTypes = {
  fieldType: React.PropTypes.oneOf(['user','computer'])
};

export default GameField;