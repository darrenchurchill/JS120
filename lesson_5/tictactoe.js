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

  size() {
    return Object.keys(this.squares).length;
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
    this.numWins = 0;
  }

  getMarker() {
    return this.marker;
  }

  getNumWins() {
    return this.numWins;
  }

  wonGame() {
    this.numWins += 1;
  }

  reset() {
    this.numWins = 0;
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

  constructor(numGamesPerMatch = 3) {
    this.matchLength = numGamesPerMatch;
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    // orchestrate game play
    let isFirstMatch = true;

    while (true) {
      this.playMatch(isFirstMatch);
      if (!this.shouldPlayAgain()) break;
      this.resetMatch();
      isFirstMatch = false;
    }

    this.displayGoodByeMessage();
  }

  playMatch(isFirstMatch) {
    let isFirstGame = isFirstMatch;

    while (true) {
      this.playRound(isFirstGame);
      if (this.hasMatchWinner()) break;
      this.waitForInput();
      this.resetRound();
      isFirstGame = false;
    }

    this.displayMatchResults();
  }

  playRound(isFirstGame) {
    if (isFirstGame) {
      this.displayWelcome();
    } else {
      this.displayGameBoard();
    }

    while (true) {
      this.humanMoves();
      if (this.gameRoundOver()) break;

      this.computerMoves();
      if (this.gameRoundOver()) break;

      this.displayGameBoard();
    }

    this.displayRoundResults();
  }

  resetRound() {
    this.clearScreen();
    this.board = new Board();
  }

  resetMatch() {
    this.human.reset();
    this.computer.reset();
    this.resetRound();  // ensure the round is reset
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
    this.displayMatchScore();
    this.board.display();
  }

  displayGameBoard() {
    this.clearScreen();
    console.log("");
    this.displayMatchScore();
    this.board.display();
  }

  displayMatchScore() {
    console.log(
      "Match Score - ",
      `Human: ${this.human.getNumWins()} `,
      `Computer: ${this.computer.getNumWins()}`
    );
  }

  displayRoundResults() {
    // show the results of this game (win, lose, tie)
    this.clearScreen();

    let winner = this.getRoundWinner();

    if (winner === this.human) {
      this.human.wonGame();
      console.log("You won! Congratulations!");
    } else if (winner === this.computer) {
      this.computer.wonGame();
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }

    this.displayMatchScore();
    this.board.display();
  }

  displayMatchResults() {
    let winner = this.getMatchWinner();

    if (winner === this.human) {
      console.log("You won the match!!!!");
    } else if (winner === this.computer) {
      console.log("Computer won the match!!!");
    }
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

    // offensive move
    let choice = this.getWinningMoveFor(this.computer);
    if (choice === null) {
      // defensive move
      choice = this.getWinningMoveFor(this.human);
    }

    if (choice === null) {
      // choose center square, if it's available
      choice = Math.ceil(this.board.size() / 2).toString();
    }

    // random move
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

  waitForInput() {
    readline.keyInPause("Press any key to continue");
  }

  gameRoundOver() {
    return this.board.isFull() || this.hasRoundWinner();
  }

  getRoundWinner() {
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

  hasRoundWinner() {
    return this.getRoundWinner() !== null;
  }

  getMatchWinner() {
    if (this.human.getNumWins() >= this.matchLength) return this.human;
    if (this.computer.getNumWins() >= this.matchLength) return this.computer;
    return null;
  }

  hasMatchWinner() {
    return this.getMatchWinner() !== null;
  }
}

let game = new TTTGame();
game.play();