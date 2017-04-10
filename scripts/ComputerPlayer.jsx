import gameState from './GameState';

class ComputerPlayer {
  constructor() {
    gameState.callbacks.push(this.onStateChanged);
  }

  onStateChanged(state) {
    if (state.gameStatus === `on` && state.shootingTurn === `computer`) {
      setTimeout(gameState.makeRandomShoot, 1000);
    }
  }
}

export default new ComputerPlayer();