import '../styles/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import GameField from './GameField';

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      startGame: false,
      shootingTurn : null
    };
    this.startGame = this.startGame.bind(this);
    this.chooseFirstShooter = this.chooseFirstShooter.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
  }

  startGame() {

  }

  chooseFirstShooter() {
    let players = [`user`, `computer`];
    this.setState({
      shootingTurn: players[Math.round(Math.random())],
      startGame: true
    })
  }

  switchPlayer() {
    console.log(`switch player called`);
    console.log(`this.state.shootingTurn in App`, this.state.shootingTurn);
    if (this.state.shootingTurn === `user`)
      this.setState({
        shootingTurn: `computer`
      });
    else
      this.setState({
        shootingTurn: `user`
      });
  }

  render() {
    return (
      <div id="game">
        <div className="wrapper">
          <GameField fieldType={`user`}
                     shootingTurn={this.state.shootingTurn}
                     switchPlayer={this.switchPlayer}/>
          <GameField fieldType={`computer`}
                     shootingTurn={this.state.shootingTurn}
                     switchPlayer={this.switchPlayer}/>
        </div>
        {this.state.startGame ? null :
          <button onClick={this.chooseFirstShooter}>Start game</button>}
      </div>
    );
  }
}

ReactDOM.render(
  <App/> , document.getElementById('app'));