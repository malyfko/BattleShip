import React from 'react';
import Ship from './Ship';

class Cell extends React.PureComponent {

  render () {
    if (this.props.attempted) {
      if (this.props.correspondingShip)
        return (
          <div className={`cell attempted hit ${this.props.borders}`}>X</div>
        )
      else
        return (
          <div className={`cell attempted missed ${this.props.borders}`}>&middot;</div>
        )
    }
    else if (this.props.fieldType === 'user')
      return (
        <div className={`cell ${this.props.borders}`}>&nbsp;</div>
      );
      else return (
        <div className={`cell ${this.props.activeField ? 'clickable' : ''}`}
             onClick={this.props.activeField ? this.props.cellAttempt : null}>&nbsp;</div>
      );
  }
}

Cell.propTypes = {
  correspondingShip: React.PropTypes.instanceOf(Ship),
  attempted: React.PropTypes.bool.isRequired,
  cellAttempt: React.PropTypes.func.isRequired,
  fieldType : React.PropTypes.oneOf(['user','computer']).isRequired,
  activeField: React.PropTypes.bool.isRequired
};

export default Cell;