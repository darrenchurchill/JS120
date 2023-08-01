/**
 * JS120 Lesson 1
 * Assignment: Rock Paper Scissors
 *
 * An Object-Oriented Rock Paper Scissors game
 */

function createPlayer() {
  return {
    // possible state: player name?
    // possible state: player's current move?

    choose() {
      // not yet implemented
    },
  };
}

const RPSGame = {
  human: createPlayer(),
  computer: createPlayer(),

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },

  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors. Goodbye!");
  },

  play() {
    this.displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    displayWinner();
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
