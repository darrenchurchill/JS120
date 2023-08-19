/**
 * JS120 Lesson 5
 * twentyone.js
 *
 * Twenty-One
 *
 * Object-Oriented Twenty-One with Classes
 *
 * A command-line game of Twenty-One (simplified BlackJack)
 */

class Card {
  constructor() {
    // STUB
    // What sort of state does a card need?
    // Rank? Suit? Points?
  }
}

class Deck {
  constructor() {
    // STUB
    // What sort of state does a deck need?
    // 52 cards?
    // We need some data structure to keep track of cards:
    // - Array, Object, something else?
  }

  deal() {
    // STUB
    // does the dealer or the deck deal cards?
  }
}

class Participant {
  constructor() {
    // STUB
    // What sort of state does a participant need?
    // Score? Hand? Amount of money available?
    // What else goes here? All the redundant behaviors from Player and Dealer?
  }
}

class Player extends Participant {
  constructor() {
    // STUB
    // What sort of state does a player need?
    // Score? Hand? Amount of money available?
  }

  hit() {
    // STUB
  }

  stay() {
    // STUB
  }

  isBusted() {
    // STUB
  }

  score() {
    // STUB
  }
}

class Dealer extends Participant {
  // Very similar to a Player; do we need this class?

  constructor() {
    // STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards?
  }

  hit() {
    // STUB
  }

  stay() {
    // STUB
  }

  isBusted() {
    // STUB
  }

  score() {
    // STUB
  }

  hide() {
    // STUB
  }

  reveal() {
    // STUB
  }

  deal() {
    // STUB
    // Does the dealer or the deck deal cards?
  }
}

class TwentyOneGame {
  constructor() {
    // STUB
    // What sort of state does the game need?
    // A deck? Two participants?
  }

  start() {
    // SPIKE
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
  }

  dealCards() {
    // STUB
  }

  showCards() {
    // STUB
  }

  playerTurn() {
    // STUB
  }

  dealerTurn() {
    // STUB
  }

  displayWelcomeMessage() {
    console.log("Welcome to Twenty-One!\n");
  }

  displayGoodbyeMessage() {
    console.log("Goodbye! Thank you for playing.\n");
  }

  displayResult() {
    // STUB
  }
}

let game = new TwentyOneGame();
game.start();