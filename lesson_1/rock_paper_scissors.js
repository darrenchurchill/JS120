/**
 * JS120 Lesson 1
 * Assignment: Rock Paper Scissors
 *
 * An Object-Oriented Rock Paper Scissors game
 */

const readline = require("readline-sync");

// eslint-disable-next-line max-lines-per-function
function createPlayer() {
  return {
    move: null,
    moveHistory: {},
    score: 0,

    makeMove(move) {
      this.move = move;
    },

    addMoveToHistory() {
      let moveName = this.move.getName();
      if (!this.moveHistory[moveName]) this.moveHistory[moveName] = 0;
      this.moveHistory[moveName] += 1;
    },

    wonRound() {
      this.score += 1;
    },

    resetScore() {
      this.score = 0;
    },
  };
}

// eslint-disable-next-line max-lines-per-function
function createHuman() {
  let player = createPlayer();

  let human = {
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
    },

    displayMoveHistory() {
      console.log("Your moves:", this.moveHistory);
    },
  };

  return Object.assign(player, human);
}

// eslint-disable-next-line max-lines-per-function
function createComputer() {
  let player = createPlayer();

  let computer = {
    choose(choices, opponentHistory) {
      const choiceNames = this.getChoiceNames(choices, opponentHistory);
      let randomIndex = Math.floor(Math.random() * choiceNames.length);
      this.makeMove(choices.getChoiceByName(choiceNames[randomIndex]));
    },

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
    },

    displayMoveHistory() {
      console.log("Computer moves:", this.moveHistory);
    },
  };

  return Object.assign(player, computer);
}

function createGameChoice(name) {
  return {
    name,
    winsAgainst: null,
    losesAgainst: null,

    getName() {
      return this.name;
    },

    setWinsAgainst(others) {
      this.winsAgainst = others;
    },

    setLosesAgainst(others) {
      this.losesAgainst = others;
    },

    doesWinAgainst(other) {
      return this.winsAgainst.includes(other);
    }
  };
}

// eslint-disable-next-line max-lines-per-function, max-statements
function createGameChoices() {
  let rock = createGameChoice("rock");
  let paper = createGameChoice("paper");
  let scissors = createGameChoice("scissors");
  let spock = createGameChoice("spock");
  let lizard = createGameChoice("lizard");

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

  return {
    choices: {
      rock,
      paper,
      scissors,
      spock,
      lizard
    },

    getChoiceByName(choiceName) {
      return this.choices[choiceName];
    },

    getChoiceNames() {
      return Object.keys(this.choices);
    },
  };
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  choices: createGameChoices(),
  winningScore: 5,

  displayWelcomeMessage() {
    console.log(
      `Welcome! First to ${this.winningScore} wins the game!`
    );
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing. Goodbye!");
  },

  displayScore() {
    console.log(`Current score: You: ${this.human.score} Computer: ${this.computer.score}`);
  },

  displayBreak() {
    console.log("------");
  },

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

    if (humanMove.doesWinAgainst(computerMove)) {
      this.human.wonRound();
      return this.human;
    }

    if (computerMove.doesWinAgainst(humanMove)) {
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
    this.human.displayMoveHistory();
    this.computer.displayMoveHistory();
    this.human.choose(this.choices);
    this.computer.choose(this.choices, this.human.moveHistory);
    this.human.addMoveToHistory();
    this.computer.addMoveToHistory();
    this.displayRoundWinner();
    this.displayBreak();
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
