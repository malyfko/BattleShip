import '../styles/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import GameField from './GameField';
import gameState from './GameState';
import './ComputerPlayer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
        {this.state.startGame ?
          <ReactCSSTransitionGroup
            transitionName="notification"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeave={false}>
            <div
              className="notification"
              key={this.state.shootingTurn}>{`${this.state.shootingTurn} is shooting`}</div>
          </ReactCSSTransitionGroup>
          : <button onClick={this.chooseFirstShooter}>Start game</button>
          }
        <div className="wrapper">
          <GameField fieldType={`user`}
                     cells={this.state.cells.user}/>
          <GameField fieldType={`computer`}
                     cells={this.state.cells.computer}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App/> , document.getElementById('app'));