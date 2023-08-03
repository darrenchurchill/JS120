/**
 * JS120 Lesson 1
 * Assignment: Rock Paper Scissors
 *
 * An Object-Oriented Rock Paper Scissors game
 */

const readline = require("readline-sync");

function createPlayer() {
  return {
    move: null,
    score: 0,

    wonRound() {
      this.score += 1;
    },

    resetScore() {
      this.score = 0;
    },
  };
}

function createHuman() {
  let player = createPlayer();

  let human = {
    choose() {
      let choice;

      while (true) {
        console.log("Please choose rock, paper, or scissors:");
        choice = readline.question();
        if (["rock", "paper", "scissors"].includes(choice)) break;
        console.log("Sorry, invalid choice.");
      }
      this.move = choice;
    },
  };

  return Object.assign(player, human);
}

function createComputer() {
  let player = createPlayer();

  let computer = {
    choose() {
      const choices = ["rock", "paper", "scissors"];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(player, computer);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  winningScore: 5,

  displayWelcomeMessage() {
    console.log(
      `Welcome to Rock, Paper, Scissors! First to ${this.winningScore} wins the game!`
    );
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
  },

  displayScore() {
    console.log(`Current score: You: ${this.human.score} Computer: ${this.computer.score}`);
  },

  displayRoundWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    let roundWinner = this.getRoundWinner();

    if (roundWinner === this.human) {
      console.log("You win this round!");
    } else if (roundWinner === this.computer) {
      console.log("Computer wins this round!");
    } else {
      console.log("It's a tie.");
    }
  },

  displayGameWinner() {
    let winner = this.getGameWinner();
    if (winner !== null) {
      this.displayScore();
    }

    if (winner === this.human) {
      console.log("You win!");
    } else if (winner === this.computer) {
      console.log("Computer wins!");
    }
  },

  getRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if ((humanMove === "rock" && computerMove === "scissors") ||
        (humanMove === "paper" && computerMove === "rock") ||
        (humanMove === "scissors" && computerMove === "paper")) {
      this.human.wonRound();
      return this.human;
    }

    if ((humanMove === "rock" && computerMove === "paper") ||
        (humanMove === "paper" && computerMove === "scissors") ||
        (humanMove === "scissors" && computerMove === "rock")) {
      this.computer.wonRound();
      return this.computer;
    }

    return null;
  },

  getGameWinner() {
    if (this.human.score === this.winningScore) return this.human;
    if (this.computer.score === this.winningScore) return this.computer;
    return null;
  },

  resetGame() {
    this.human.resetScore();
    this.computer.resetScore();
  },

  playAgain() {
    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === "y";
  },

  playRound() {
    this.displayScore();
    this.human.choose();
    this.computer.choose();
    this.displayRoundWinner();
  },

  playGameLoop() {
    while (true) {
      this.playRound();
      if (this.getGameWinner() !== null) {
        this.displayGameWinner();
        if (!this.playAgain()) return;
        this.resetGame();
      }
    }
  },

  play() {
    this.displayWelcomeMessage();
    this.playGameLoop();
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
