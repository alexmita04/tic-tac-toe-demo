const gameboard = document.querySelector(".gameboard");
const cells = gameboard.querySelectorAll(".cell");
const heading = document.querySelector("h1");
const colorText = document.querySelector(".player-color");

const createPlayer = function (color, name) {
  this.color = color;
  this.name = name;
};

const bluePlayer = new createPlayer("#8ecae6", "Blue");
const redPlayer = new createPlayer("#ef233c", "Red");

const game = (function () {
  let curentPlayer = 1;
  let gameOver = false;

  const gameMatrix = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  function tickBox(a, b) {
    if (gameOver) return;
    if (gameMatrix[a][b] !== "0" && gameMatrix[a][b] !== "X") {
      gameMatrix[a][b] = curentPlayer === 1 ? "X" : "0";
    } else {
      console.log("the cell is already assigned");
    }
  }

  function printGameMatrix() {
    // for (let i = 0; i < 3; i++) {
    //   for (let j = 0; j < 3; j++) console.log(gameMatrix[i][j]);
    //   console.log("\n");
    // }
    console.log(gameMatrix);
  }

  function showGameMatrixOnScreen() {
    let counter = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameMatrix[i][j] !== null)
          cells[counter].textContent = gameMatrix[i][j];
        else cells[counter].textContent = "";
        counter++;
      }
    }
  }

  function checkWinner() {
    let win;
    for (let i = 0; i < 3; i++) {
      win = true;
      for (let j = 1; j < 3; j++) {
        if (gameMatrix[i][j] !== gameMatrix[i][0] || gameMatrix[i][j] === null)
          win = false;
      }
      if (win) {
        gameOver = true;
        return true;
      }
    }

    // for (let i = 0; i < 3; i++) {
    //   win = true;
    //   for (let j = 1; j < 3; j++) {
    //     if (gameMatrix[j][i] !== gameMatrix[0][i] || gameMatrix[i][j] === null)
    //       win = false;
    //   }
    //   if (win) {
    //     console.log("win");
    //     return true;
    //   }
    // }

    for (let i = 0; i < 3; i++) {
      win = true;
      for (let j = 1; j < 3; j++) {
        if (gameMatrix[j][i] !== gameMatrix[0][i] || gameMatrix[j][i] === null)
          win = false;
      }
      if (win) {
        gameOver = true;
        return true;
      }
    }

    win = true;
    for (let i = 1; i < 3; i++)
      if (gameMatrix[i][i] !== gameMatrix[0][0] || gameMatrix[i][i] === null)
        win = false;
    if (win) {
      gameOver = true;
      return true;
    }

    win = true;
    if (
      gameMatrix[2][0] !== gameMatrix[0][2] ||
      gameMatrix[1][1] !== gameMatrix[0][2] ||
      gameMatrix[2][0] === null ||
      gameMatrix[1][1] === null ||
      gameMatrix[0][2] === null
    ) {
      win = false;
    }
    if (win) {
      gameOver = true;
      return true;
    }

    if (curentPlayer === 1) curentPlayer = 2;
    else curentPlayer = 1;

    return false;
  }

  return {
    checkWinner,
    getCurrentPlayer: () => curentPlayer,
    printGameMatrix,
    tickBox,
    showGameMatrixOnScreen,
  };
})();

function printColor() {
  let player;
  if (game.getCurrentPlayer() === 1) player = bluePlayer;
  else player = redPlayer;
  document.documentElement.style.setProperty("--main", player.color);
  colorText.textContent = player.name;
}

game.showGameMatrixOnScreen();

gameboard.addEventListener("click", (e) => {
  if (e.target.dataset.loc) {
    game.tickBox(e.target.dataset.loc[0], e.target.dataset.loc[1]);
    game.showGameMatrixOnScreen();
    if (game.checkWinner()) {
      heading.textContent = `${
        game.getCurrentPlayer() === 1 ? "Blue" : "Red"
      } player wins`;
      gameboard.disabled = true;
    } else {
      printColor();
    }
  }
});
