const cells = document.querySelector(".game");

class Game {
  #state;
  #size = 3;
  #currentPlayer = 1;

  constructor(game) {
    this.game = game;
    this.cells = this.game.querySelectorAll(".cell");
    this.emptyBoard();
  }

  printBoard() {
    for (let row of this.#state) {
      console.log(row);
    }
  }

  emptyBoard() {
    this.#state = [];

    for (let i = 0; i < this.#size; i++) {
      this.#state[i] = [];
      for (let j = 0; j < this.#size; j++) {
        this.#state[i][j] = "";
      }
    }
    this.renderBoard();
  }

  checkWin(sign) {
    for (let row of this.#state) {
      if (row.filter((cell) => cell === sign).length === this.#size) {
        return true;
      }
    }

    let won = true;
    for (let i = 0; i < this.#size; i++) {
      if (this.#state[i][i] !== sign) {
        won = false;
      }
    }

    if (won) return true;

    won = true;
    for (let i = 0; i < this.#size; i++) {
      if (this.#state[i][this.#size - i - 1] !== sign) {
        won = false;
      }
    }

    if (won) return true;

    for (let i = 0; i < this.#size; i++) {
      won = true;
      for (let j = 0; j < this.#size; j++) {
        if (this.#state[j][i] !== sign) {
          won = false;
        }
      }

      if (won) return true;
    }

    return false;
  }

  renderBoard() {
    for (let cell of this.cells) {
      const { row, column } = cell.dataset;
      const mark = this.#state[row - 1][column - 1];
      cell.textContent = mark;
      cell.dataset.mark = mark;
    }
  }

  renderWin(mark) {
    const player = document.querySelector(".player");
    const reseter = document.querySelector(".reseter");
    const button = document.querySelector("button");

    reseter.classList.remove("hidden");
    player.textContent = mark;
    button.addEventListener("click", () => {
      this.emptyBoard();
      reseter.classList.add("hidden");
    });
  }

  markCell(row, column) {
    const mark = this.#currentPlayer === 1 ? "X" : "O";
    if (this.#state[column - 1][row - 1] !== "") {
      return;
    }
    this.#state[column - 1][row - 1] = mark;
    this.#currentPlayer = (this.#currentPlayer + 1) % 2;
    if (this.checkWin(mark)) this.renderWin(mark);
    this.renderBoard();
  }
}

const game = new Game(cells);

cells.addEventListener("click", (e) => {
  if (e.target.getAttribute("class") !== "cell") {
    return;
  }

  game.markCell(e.target.dataset.column, e.target.dataset.row);
});
