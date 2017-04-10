import ShipsSet from './ShipsSet';

class GameState {
  constructor() {
    this.state = {
      gameStatus : null,
      shootingTurn : null,
      cells: {
        user : [...(new Array(10)).keys()].map(() =>
          [...(new Array(10)).keys()].map(() =>
            ({
              correspondingShip: null,
              attempted: false
            }))
        ),
        computer : [...(new Array(10)).keys()].map(() =>
          [...(new Array(10)).keys()].map(() =>
            ({
              correspondingShip: null,
              attempted: false
            }))
        )
      },
      shipsSets: {
        user: null,
        computer: null
      }
    };
    this.callbacks = [];
    this.switchPlayer = this.switchPlayer.bind(this);
    this.makeRandomShoot = this.makeRandomShoot.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
    this.placeShips(`user`);
    this.placeShips(`computer`);
  }

  startGame() {
    let players = [`user`, `computer`];
    this.state.gameStatus = `on`;
    this.state.shootingTurn = players[Math.round(Math.random())];
    this.onStateChanged();
  }

  switchPlayer() {
    if (this.state.shootingTurn === `user`)
      this.state.shootingTurn = `computer`;
    else
      this.state.shootingTurn = `user`;
    this.onStateChanged()
  }

  cellAttempt(x, y, fieldType) {
    let cells = this.state.cells[fieldType];
    cells[x][y].attempted = true;
    if (cells[x][y].correspondingShip) {
      cells[x][y].correspondingShip.shipWasAttempted();
      if (cells[x][y].correspondingShip.destroyed) {
        cells[x][y].correspondingShip.getSurroundings().map((surPoint) => {
          cells[surPoint.x][surPoint.y].attempted = true;
        });
      }
    }
    if (!cells[x][y].correspondingShip)
      this.switchPlayer();
    else
      this.onStateChanged();
    this.isGameOver(fieldType);
  }

  isGameOver(fieldType) {
    let ships = this.state.shipsSets[fieldType].ships;
    for (let ship in ships) {
      if (ships.hasOwnProperty(ship) && !ships[ship].destroyed)
        return false;
    }
    this.state.gameStatus = `${fieldType === 'user' ? 'computer' : 'user'} won`;
    this.onStateChanged();
    return true;
  }

  placeShips(player) {
    let ships = new ShipsSet();
    this.state.shipsSets[player] = ships;
    ships.ships.map((ship) => {
      ship.getCompartments().map((compartment) => {
        this.state.cells[player][compartment.x][compartment.y].correspondingShip = ship;
      })
    })
  }

  makeRandomShoot() {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }
    while (this.state.cells.user[x][y].attempted)
    this.cellAttempt(x, y, `user`);
  }

  onStateChanged() {
    this.callbacks.map((callback)=>{
      callback(this.state);
    });
  }
}

export default new GameState();