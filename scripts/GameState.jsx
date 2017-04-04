import ShipsSet from './ShipsSet';

class GameState {
  constructor() {
    this.state = {
      startGame : false,
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
      }
    };
    this.callbacks = [];
    this.switchPlayer = this.switchPlayer.bind(this);
    this.makeRandomShoot = this.makeRandomShoot.bind(this);
    this.placeShips(this.state.cells.user);
    this.placeShips(this.state.cells.computer);
  }

  startGame() {
    let players = [`user`, `computer`];
    this.state.startGame = true;
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
  }

  placeShips(cells) {
    let ships = new ShipsSet();
    ships.ships.map((ship) => {
      ship.getCompartments().map((compartment) => {
        cells[compartment.x][compartment.y].correspondingShip = ship;
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