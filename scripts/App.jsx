import '../styles/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import GameField from './GameField';
import gameState from './GameState';
import './ComputerPlayer';


class App extends React.Component{
  constructor() {
    super();
    this.chooseFirstShooter = this.chooseFirstShooter.bind(this);
    this.onStateChanged = this.onStateChanged.bind(this);
    gameState.callbacks.push(this.onStateChanged);
    this.state = gameState.state;
  }

  onStateChanged(state) {
    this.setState(state);
  }

  chooseFirstShooter() {
    gameState.startGame();
  }

  render() {
    return (
      <div id="game">
        <div className="wrapper">
          <GameField fieldType={`user`}
                     cells={this.state.cells.user}/>
          <GameField fieldType={`computer`}
                     cells={this.state.cells.computer}/>
        </div>
        {this.state.startGame ? null :
          <button onClick={this.chooseFirstShooter}>Start game</button>}
      </div>
    );
  }
}

ReactDOM.render(
  <App/> , document.getElementById('app'));