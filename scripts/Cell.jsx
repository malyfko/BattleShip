import React from 'react';
import Ship from './Ship';

class Cell extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    if (this.props.attempted) {
      if (this.props.correspondingShip)
        return (
          <div className="cell">X</div>
        )
      else
        return (
          <div className="cell">&middot;</div>
        )
    }
    else if (this.props.fieldType == 'user')
      return (
        <div className="cell">&nbsp;</div>
      );
      else return (
        <div className="cell clickable" onClick={this.props.cellAttempt}>&nbsp;</div>
      );
  }
}

Cell.propTypes = {
  correspondingShip: React.PropTypes.instanceOf(Ship),
  attempted: React.PropTypes.bool.isRequired,
  cellAttempt: React.PropTypes.func.isRequired,
  fieldType : React.PropTypes.oneOf(['user','computer']).isRequired
};

export default Cell;