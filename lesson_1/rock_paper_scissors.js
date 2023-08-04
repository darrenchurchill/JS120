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

      this.move = choices.getChoiceByName(choice);
    },
  };

  return Object.assign(player, human);
}

function createComputer() {
  let player = createPlayer();

  let computer = {
    choose(choices) {
      const choiceNames = choices.getChoiceNames();
      let randomIndex = Math.floor(Math.random() * choiceNames.length);
      this.move = choices.getChoiceByName(choiceNames[randomIndex]);
    },
  };

  return Object.assign(player, computer);
}

function createGameChoice(name) {
  return {
    name,
    beatsChoices: null,

    getName() {
      return this.name;
    },

    setBeatsChoices(others) {
      this.beatsChoices = others;
    },

    beatsOtherChoice(other) {
      return this.beatsChoices.includes(other);
    }
  };
}

// eslint-disable-next-line max-lines-per-function
function createGameChoices() {
  let rock = createGameChoice("rock");
  let paper = createGameChoice("paper");
  let scissors = createGameChoice("scissors");
  let spock = createGameChoice("spock");
  let lizard = createGameChoice("lizard");

  rock.setBeatsChoices([scissors, lizard]);
  paper.setBeatsChoices([rock, spock]);
  scissors.setBeatsChoices([paper, lizard]);
  spock.setBeatsChoices([rock, scissors]);
  lizard.setBeatsChoices([paper, spock]);

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

    if (humanMove.beatsOtherChoice(computerMove)) {
      this.human.wonRound();
      return this.human;
    }

    if (computerMove.beatsOtherChoice(humanMove)) {
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
    this.human.choose(this.choices);
    this.computer.choose(this.choices);
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
