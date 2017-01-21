import '../styles/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import GameField from './GameField';

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      startGame: false
    };
    this.startGame = this.startGame.bind(this);
  }

  startGame() {

  }


  render() {
    return (
      <div className="wrapper">
        <GameField fieldType={`user`}/>
        <GameField fieldType={`computer`}/>
      </div>
    );
  }
}

ReactDOM.render(
  <App/> , document.getElementById('app'));