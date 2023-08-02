/**
 * JS120 Lesson 1
 * Assignment: Rock Paper Scissors
 *
 * An Object-Oriented Rock Paper Scissors game
 */

const readline = require("readline-sync");

// eslint-disable-next-line max-lines-per-function
function createPlayer(playerType) {
  return {
    // possible state: player name?
    playerType,
    move: null,

    choose() {
      if (this.isHuman()) {
        let choice;

        while (true) {
          console.log("Please choose rock, paper, or scissors:");
          choice = readline.question();
          if (["rock", "paper", "scissors"].includes(choice)) break;
          console.log("Sorry, invalid choice.");
        }
        this.move = choice;
      } else {
        const choices = ["rock", "paper", "scissors"];
        let randomIndex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
      }
    },

    isHuman() {
      return this.playerType === "human";
    },
  };
}

const RPSGame = {
  human: createPlayer("human"),
  computer: createPlayer("computer"),

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === "rock" && computerMove === "scissors") ||
        (humanMove === "paper" && computerMove === "rock") ||
        (humanMove === "scissors" && computerMove === "paper")) {
      console.log("You win!");
    } else if ((humanMove === "rock" && computerMove === "paper") ||
               (humanMove === "paper" && computerMove === "scissors") ||
               (humanMove === "scissors" && computerMove === "rock")) {
      console.log("Computer wins!");
    } else {
      console.log("It's a tie.");
    }
  },

  play() {
    this.displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    this.displayWinner();
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
