import React from 'react';

class Cell extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    if (this.props.fieldType == 'user')
      return (
        <div className="cell">U</div>
      )
    else if (this.props.attempted) //this.props.fieldType == 'computer'
      return (
        <div className="cell">X</div>
      )
    else return (
      <div className="cell clickable" onClick={this.props.cellAttempt}>O</div>
    );
  }
}

Cell.propTypes = {
  coveredWithAShip: React.PropTypes.bool.isRequired,
  attempted: React.PropTypes.bool.isRequired,
  cellAttempt: React.PropTypes.func.isRequired,
  fieldType : React.PropTypes.oneOf(['user','computer']).isRequired
};

export default Cell;