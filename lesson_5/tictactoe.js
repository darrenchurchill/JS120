/**
 * JS120 Lesson 5
 * tictactoe.js
 *
 * Tic Tac Toe
 *
 * Object-Oriented Tic Tac Toe with Classes
 *
 * A command-line tic tac toe game against the computer
 */

let readline = require("readline-sync");

class Utils {
  /**
   * Return an array's string representation, joining elements with the
   * delimiter string, and inserting the lastWord before the final element.
   * @param {Array} array the array of elements
   * @param {string} delimiter the delimiter string
   * @param {string} lastWord the last word to insert (ex: `'or'` or `'and'`)
   * @returns {string} the joined string
   */
  static joinOr(array, delimiter = ", ", lastWord = "or") {
    if (array.length <= 1) return `${array.join(delimiter)}`;
    if (array.length === 2) return `${array[0]} ${lastWord} ${array[1]}`;

    let firstSlice = array.slice(0, array.length - 1).join(delimiter);
    let lastElem = array[array.length - 1];

    return (
      `${firstSlice}${delimiter}${lastWord ? `${lastWord} ` : "" }${lastElem}`
    );
  }
}

class Square {
  static EMPTY_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.EMPTY_SQUARE) {
    this.marker = marker;
  }

  toString() {
    return this.marker;
  }

  getMarker() {
    return this.marker;
  }

  setMarker(marker) {
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.EMPTY_SQUARE;
  }
}

class Board {
  constructor() {
    /**
     * @type {Object.<number, Square>}
     */
    this.squares = {};

    for (let count = 1; count <= 9; count++) {
      this.squares[count] = new Square();
    }
  }

  display() {
    // display the board, including its current state
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares[1]}  |  ${this.squares[2]}  |  ${this.squares[3]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares[4]}  |  ${this.squares[5]}  |  ${this.squares[6]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares[7]}  |  ${this.squares[8]}  |  ${this.squares[9]}`);
    console.log("     |     |");
    console.log("");
  }

  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  countSquaresFor(player, sqNums) {
    return sqNums.filter(
      (sqNum) => this.squares[sqNum].getMarker() === player.getMarker()
    ).length;
  }

  unusedSquares() {
    return Object.keys(this.squares).filter(
      (key) => this.squares[key].isUnused()
    );
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER);
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER);
  }
}

class TTTGame {
  static WINNING_LINES = [
    ["1", "2", "3"],  // horizontal rows
    ["4", "5", "6"],
    ["7", "8", "9"],

    ["1", "4", "7"],  // vertical columns
    ["2", "5", "8"],
    ["3", "6", "9"],

    ["1", "5", "9"],  // diagonals
    ["3", "5", "7"]
  ];

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    // orchestrate game play
    let isFirstGame = true;

    while (true) {
      this.playRound(isFirstGame);
      if (!this.shouldPlayAgain()) break;
      this.reset();
      isFirstGame = false;
    }

    this.displayGoodByeMessage();
  }

  playRound(isFirstGame) {
    if (isFirstGame) {
      this.displayWelcome();
    } else {
      this.displayGameBoard();
    }

    while (true) {
      this.humanMoves();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      this.displayGameBoard();
    }

    this.displayResults();
  }

  reset() {
    this.clearScreen();
    this.board = new Board();
  }

  displayWelcomeMessage() {
    console.log("Welcome to Tic Tac Toe!");
  }

  displayGoodByeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayWelcome() {
    this.clearScreen();
    this.displayWelcomeMessage();
    this.board.display();
  }

  displayGameBoard() {
    this.clearScreen();
    console.log("");
    this.board.display();
  }

  displayResults() {
    // show the results of this game (win, lose, tie)
    this.clearScreen();

    let winner = this.getWinner();

    if (winner === this.human) {
      console.log("You won! Congratulations!");
    } else if (winner === this.computer) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }

    this.board.display();
  }

  clearScreen() {
    console.clear();
  }

  humanMoves() {
    let validChoices = this.board.unusedSquares();
    let choice = this.promptHuman(
      `Choose a square (${Utils.joinOr(validChoices)}): `,
      validChoices
    );

    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();

    let choice = this.getWinningMoveFor(this.computer);
    if (choice !== null) {
      this.board.markSquareAt(choice, this.computer.getMarker());
      return;
    }
    choice = this.getWinningMoveFor(this.human);
    if (choice !== null) {
      this.board.markSquareAt(choice, this.computer.getMarker());
      return;
    }

    while (!validChoices.includes(choice)) {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    }

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  getWinningMoveFor(player) {
    let emptySquares = this.board.unusedSquares();

    for (let line of TTTGame.WINNING_LINES) {
      if (this.board.countSquaresFor(player, line) === line.length - 1) {
        let square = line.filter((sqNum) => emptySquares.includes(sqNum))[0];
        if (square !== undefined) return square;
      }
    }

    return null;
  }

  shouldPlayAgain() {
    return this.promptPlayAgain() === "y";
  }

  promptPlayAgain() {
    let validChoices = ["y", "n"];
    return this.promptHuman(
      `Would you like to play again? (${Utils.joinOr(validChoices)}): `,
      validChoices,
      true
    );
  }

  promptHuman(prompt, validChoices, ignoreCase = false) {
    while (true) {
      let choice = readline.question(prompt);
      if (ignoreCase) choice = choice.toLowerCase();

      if (validChoices.includes(choice)) return choice;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }
  }

  gameOver() {
    return this.board.isFull() || this.hasWinner();
  }

  getWinner() {
    for (let line of TTTGame.WINNING_LINES) {
      if (this.board.countSquaresFor(this.human, line) === line.length) {
        return this.human;
      }
      if (this.board.countSquaresFor(this.computer, line) === line.length) {
        return this.computer;
      }
    }

    return null;
  }

  hasWinner() {
    return this.getWinner() !== null;
  }
}

let game = new TTTGame();
game.play();