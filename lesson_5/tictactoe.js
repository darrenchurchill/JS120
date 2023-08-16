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

  setMarker(marker) {
    this.marker = marker;
  }
}

class Board {
  constructor() {
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
}

class Row {
  constructor() {
    // STUB
    // We need some way to identify a row of 3 squares
  }
}

class Marker {
  constructor() {
    // STUB
    // A marker is something that represents a player's "piece" on the board.
  }
}

class Player {
  constructor() {
    // STUB
    // maybe a "marker" to keep track of this player's symbol (i.e., "X" or "O")
  }

  mark() {
    // STUB
    // We need a way to mark the board with this player's marker.
    // How do we access the board?
  }

  play() {
    // STUB
    // We need a way for each player to play the game.
    // Do we need access to the board?
  }
}

class Human extends Player {
  constructor() {
    super();
  }
}

class Computer extends Player {
  constructor() {
    super();
  }
}

class TTTGame {
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    // orchestrate game play
    this.displayWelcomeMessage();

    while (true) {
      this.board.display();

      this.humanMoves();
      this.board.display();
      if (this.gameOver()) break;

      this.computerMoves();
      if (this.gameOver()) break;

      break; // execute loop just once for now
    }

    this.displayResults();
    this.displayGoodByeMessage();
  }

  displayWelcomeMessage() {
    console.log("Welcome to Tic Tac Toe!");
  }

  displayGoodByeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    // STUB
    // show the results of this game (win, lose, tie)
  }

  humanMoves() {
    let choice;

    while (true) {
      choice = readline.questionInt("Choose a square between 1 and 9: ");
      if (choice >= 1 && choice <= 9) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, Square.HUMAN_MARKER);
  }

  computerMoves() {
    console.log("computer moves");
  }

  gameOver() {
    // STUB
    return false;
  }
}

let game = new TTTGame();
game.play();