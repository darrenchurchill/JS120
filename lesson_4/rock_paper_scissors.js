/**
 * JS120 Lesson 4
 * Assignment: Rock Paper Scissors
 *
 * An Object-Oriented Rock Paper Scissors game
 *
 * Rewritten using Constructors and Prototypes, instead of factory functions.
 */

const readline = require("readline-sync");

class Player {
  constructor() {
    this.move = null;
    this.moveHistory = {};
    this.score = 0;
  }

  makeMove(move) {
    this.move = move;
  }

  addMoveToHistory() {
    let moveName = this.move.getName();
    if (!this.moveHistory[moveName]) this.moveHistory[moveName] = 0;
    this.moveHistory[moveName] += 1;
  }

  wonRound() {
    this.score += 1;
  }

  resetScore() {
    this.score = 0;
  }
}

// eslint-disable-next-line max-lines-per-function
class Human extends Player {
  constructor() {
    super();
  }

  choose(choices) {
    let choice;
    let choiceNames = choices.getChoiceNames();

    while (true) {
      console.log("Please make a choice:");
      console.log(`Choices: ${choiceNames.join(", ")}`);

      choice = readline.question();
      if (choiceNames.includes(choice)) break;
      console.log("Sorry, invalid choice.");
    }

    this.makeMove(choices.getChoiceByName(choice));
  }

  displayMoveHistory() {
    console.log("Your moves:", this.moveHistory);
  }
}

class Computer extends Player {
  constructor() {
    super();
  }

  choose(choices, opponentHistory) {
    const choiceNames = this.getChoiceNames(choices, opponentHistory);
    let randomIndex = Math.floor(Math.random() * choiceNames.length);
    this.makeMove(choices.getChoiceByName(choiceNames[randomIndex]));
  }

  getChoiceNames(choices, opponentHistory) {
    if (Object.keys(opponentHistory).length === 0) {
      return choices.getChoiceNames();
    }

    let result = [];

    for (let [choiceName, choiceCount] of Object.entries(opponentHistory)) {
      let choice = choices.getChoiceByName(choiceName);
      let winningChoices = choice.losesAgainst.flatMap((winningChoice) => {
        return Array(choiceCount).fill(winningChoice.getName());
      });
      result.push(...winningChoices);
    }

    return result;
  }

  displayMoveHistory() {
    console.log("Computer moves:", this.moveHistory);
  }
}

class GameChoice {
  constructor(name) {
    this.name = name;
    this.winsAgainst = null;
    this.losesAgainst = null;
  }

  getName() {
    return this.name;
  }

  setWinsAgainst(others) {
    this.winsAgainst = others;
  }

  setLosesAgainst(others) {
    this.losesAgainst = others;
  }

  doesWinAgainst(other) {
    return this.winsAgainst.includes(other);
  }
}

class GameChoices {
  // eslint-disable-next-line max-lines-per-function, max-statements
  constructor() {
    let rock = new GameChoice("rock");
    let paper = new GameChoice("paper");
    let scissors = new GameChoice("scissors");
    let spock = new GameChoice("spock");
    let lizard = new GameChoice("lizard");

    rock.setWinsAgainst([scissors, lizard]);
    paper.setWinsAgainst([rock, spock]);
    scissors.setWinsAgainst([paper, lizard]);
    spock.setWinsAgainst([rock, scissors]);
    lizard.setWinsAgainst([paper, spock]);

    rock.setLosesAgainst([paper, spock]);
    paper.setLosesAgainst([scissors, lizard]);
    scissors.setLosesAgainst([rock, spock]);
    spock.setLosesAgainst([paper, lizard]);
    lizard.setLosesAgainst([rock, scissors]);

    this.choices = {
      rock,
      paper,
      scissors,
      spock,
      lizard
    };
  }

  getChoiceByName(choiceName) {
    return this.choices[choiceName];
  }

  getChoiceNames() {
    return Object.keys(this.choices);
  }
}

class RPSGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
    this.choices = new GameChoices();
    this.winningScore = 5;
  }

  displayWelcomeMessage() {
    console.log(
      `Welcome! First to ${this.winningScore} wins the game!`
    );
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing. Goodbye!");
  }

  displayScore() {
    console.log(`Current score: You: ${this.human.score} Computer: ${this.computer.score}`);
  }

  displayBreak() {
    console.log("------");
  }

  displayRoundWinner() {
    console.log(`You chose: ${this.human.move.getName()}`);
    console.log(`The computer chose: ${this.computer.move.getName()}`);

    let roundWinner = this.getRoundWinner();

    if (roundWinner === this.human) {
      console.log("You win this round!");
    } else if (roundWinner === this.computer) {
      console.log("Computer wins this round!");
    } else {
      console.log("It's a tie.");
    }
  }

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
  }

  getRoundWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if (humanMove.doesWinAgainst(computerMove)) {
      this.human.wonRound();
      return this.human;
    }

    if (computerMove.doesWinAgainst(humanMove)) {
      this.computer.wonRound();
      return this.computer;
    }

    return null;
  }

  getGameWinner() {
    if (this.human.score === this.winningScore) return this.human;
    if (this.computer.score === this.winningScore) return this.computer;
    return null;
  }

  resetGame() {
    this.human.resetScore();
    this.computer.resetScore();
  }

  playAgain() {
    console.log("Would you like to play again? (y/n)");
    let answer = readline.question();
    return answer.toLowerCase()[0] === "y";
  }

  playRound() {
    this.displayScore();
    this.human.displayMoveHistory();
    this.computer.displayMoveHistory();
    this.human.choose(this.choices);
    this.computer.choose(this.choices, this.human.moveHistory);
    this.human.addMoveToHistory();
    this.computer.addMoveToHistory();
    this.displayRoundWinner();
    this.displayBreak();
  }

  playGameLoop() {
    while (true) {
      this.playRound();
      if (this.getGameWinner() !== null) {
        this.displayGameWinner();
        if (!this.playAgain()) return;
        this.resetGame();
      }
    }
  }

  play() {
    this.displayWelcomeMessage();
    this.playGameLoop();
    this.displayGoodbyeMessage();
  }
}

const game = new RPSGame();
game.play();
