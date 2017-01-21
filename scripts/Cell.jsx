import React from 'react';

class Cell extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="cell">O</div>
    );
  }
}

Cell.propTypes = {
  coveredWithAShip: React.PropTypes.bool.isRequired,
  attempted: React.PropTypes.bool.isRequired
};

export default Cell;