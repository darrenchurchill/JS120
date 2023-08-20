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

const readline = require("readline-sync");

class Card {
  /**
   *
   * @param {String} rank
   * @param {String} suit
   * @param {Boolean} faceUp
   */
  constructor(rank, suit, faceUp = true) {
    /** @type {String} */
    this.rank = rank;
    /** @type {String} */
    this.suit = suit;
    /** @type {Boolean} */
    this.isFaceUp = faceUp;
  }

  toString() {
    if (this.isFaceUp) return `${this.rank} of ${this.suit}`;
    return "Unknown card";
  }

  isHidden() {
    return !this.isFaceUp;
  }

  turnFaceUp() {
    this.isFaceUp = true;
  }

  turnFaceDown() {
    this.isFaceUp = false;
  }
}

class ValuedCard extends Card {
  // TODO: Remove this class and give all cards a default value?
  // If the Card class had a setValue/s(values) method, then any deck requiring
  // different values could modify them. Or allow the value in the constructor
  constructor(rank, suit, values) {
    super(rank, suit);
    /** @type {Array.<Number>} */
    this.values = values;
  }

  getMinValue() {
    return Math.min(...this.values);
  }

  getMaxValue() {
    return Math.max(...this.values);
  }
}

class Deck {
  static NUMERAL_RANKS = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  static FACE_RANKS = ["jack", "queen", "king"];
  static ALL_RANKS = Deck.NUMERAL_RANKS.concat(Deck.FACE_RANKS);
  static SUITS = ["clubs", "diamonds", "hearts", "spades"];

  constructor() {
    /** @type {Array.<Card>} */
    this.deck = [];

    for (let suit of Deck.SUITS) {
      for (let rank of Deck.ALL_RANKS) {
        this.deck.push(new Card(rank, suit));
      }
    }
  }

  shuffle() {
    let endIdx = this.deck.length;

    while (endIdx > 0) {
      let randIdx = Math.floor(Math.random() * endIdx);
      endIdx -= 1;

      [this.deck[randIdx], this.deck[endIdx]] = [
        this.deck[endIdx], this.deck[randIdx]
      ];
    }
  }

  returnCards(cards) {
    this.deck.push(...cards);
  }

  deal(isFaceUp = true) {
    let card = this.deck.pop();
    if (isFaceUp) card.turnFaceUp();
    else card.turnFaceDown();
    return card;
  }
}

class TwentyOneDeck extends Deck {
  static ACE_VALUES = [1, 11];

  constructor() {
    super();  // we overwrite the deck property, but call super() anyway
    /** @type {Array.<ValuedCard>} */
    this.deck = [];

    for (let suit of Deck.SUITS) {
      for (let rank of Deck.ALL_RANKS) {
        this.deck.push (new ValuedCard(rank, suit, this.valuesFromRank(rank)));
      }
    }
  }

  /**
   *
   * @param {String} rank the card rank to get the possible values for
   * @returns {Array<Number>} the card rank's values. A 1 or 2 element array
   */
  valuesFromRank(rank) {
    if (rank === Deck.NUMERAL_RANKS[0]) return TwentyOneDeck.ACE_VALUES.slice();

    let val = parseInt(rank, 10);
    if (val > 1 && val <= 10) return [val];

    if (Deck.FACE_RANKS.includes(rank)) return [10];

    throw new TypeError(`Unknown card rank: ${rank}`);
  }
}

class Participant {
  constructor(objectScore) {
    // What sort of state does a participant need?
    // Score? Hand? Amount of money available?
    // What else goes here? All the redundant behaviors from Player and Dealer?
    /** @type {Number} */
    this.objectScore = objectScore;
    /** @type {Array.<Card>} */
    this.hand = [];
  }

  addToHand(card) {
    this.hand.push(card);
  }

  getHand() {
    return this.hand.map((card) => card.toString()).join(", ");
  }

  stay() {
    // Do nothing
  }

  isBusted() {
    return this.score() > this.objectScore;
  }

  discardHand() {
    let discarded = this.hand;
    this.hand = [];
    return discarded;
  }

  score() {
    let scores = [0];  // there's always at least 1 possible score for a hand

    for (let card of this.hand) {
      let min = card.getMinValue();
      let max = card.getMaxValue();

      if (min === max) scores = scores.map((score) => score + min);
      else {
        scores = scores.map((score) => score + min).concat(
          scores.map((score) => score + max)
        );
      }
    }

    return scores.reduce((highest, score) => {
      if (score <= this.objectScore && score > highest) return score;
      return highest;
    });
  }
}

class Player extends Participant {
  /**
   * @param {Dealer} dealer
   */
  constructor(objectScore, dealer, initialDollars = 5) {
    // What sort of state does a player need?
    // Score? Hand? Amount of money available?
    super(objectScore);
    /** @type {Dealer} */
    this.dealer = dealer;
    this.winnings = initialDollars;
  }

  getCurWinnings() {
    return this.winnings;
  }

  isBroke() {
    return this.winnings === 0;
  }

  isRich() {
    return this.winnings >= 10;
  }

  wonGame(betSize = 1) {
    this.winnings += betSize;
  }

  lostGame(betSize = 1) {
    this.winnings -= betSize;
  }

  hit() {
    let isFaceUp = true;
    this.addToHand(this.dealer.deal(isFaceUp));
  }
}

class Dealer extends Participant {
  // Very similar to a Player; do we need this class?
  static TURN_SLEEP_DURATION = 1000;  // milliseconds

  constructor(objectScore, stayScore) {
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards?
    super(objectScore);
    this.stayScore = stayScore;
    this.deck = new TwentyOneDeck();
  }

  hit() {
    let isFaceUp = true;
    this.addToHand(this.deal(isFaceUp));
  }

  isHandHidden() {
    return this.hand.some((card) => card.isHidden());
  }

  reveal() {
    this.hand.forEach((card) => card.turnFaceUp());
  }

  sleep() {
    const date = Date.now();
    while (true) {
      let curDate = Date.now();
      if (curDate - date > Dealer.TURN_SLEEP_DURATION) return;
    }
  }

  returnCardsToDeck(cards) {
    this.deck.returnCards(cards);
  }

  deal(isFaceUp = true) {
    return this.deck.deal(isFaceUp);
  }

  shuffle() {
    this.deck.shuffle();
  }
}

class TwentyOneGame {
  static OBJECT_SCORE = 21;
  static DEALER_STAY_SCORE = 17;

  constructor() {
    this.dealer = new Dealer(
      TwentyOneGame.OBJECT_SCORE,
      TwentyOneGame.DEALER_STAY_SCORE
    );
    this.player = new Player(TwentyOneGame.OBJECT_SCORE, this.dealer);
    this.shouldDisplayWelcome = true;
  }

  start() {
    this.play();
    this.displayGoodbyeMessage();
  }

  play() {
    while (true) {
      this.dealer.shuffle();
      this.dealCards();
      this.playerTurn();
      this.dealerTurn();
      this.displayResult();

      if (this.player.isBroke()) {
        console.log("You're out of money!");
        return;
      }
      if (this.player.isRich()) {
        console.log("You're rich! Quit while you're ahead.");
        return;
      }
      if (!this.shouldPlayAgain()) return;

      this.returnCardsToDeck();
    }
  }

  returnCardsToDeck() {
    this.dealer.returnCardsToDeck(this.player.discardHand());
    this.dealer.returnCardsToDeck(this.dealer.discardHand());
  }

  dealCards() {
    let isFaceUp = true;
    this.player.addToHand(this.dealer.deal(isFaceUp));
    this.dealer.addToHand(this.dealer.deal(!isFaceUp));

    this.player.addToHand(this.dealer.deal(isFaceUp));
    this.dealer.addToHand(this.dealer.deal(isFaceUp));
  }

  showCards() {
    this.clearScreen();
    this.displayTitleMessage();
    console.log("Your hand:");
    console.log(this.player.getHand());
    console.log(`Your score: ${this.player.score()}`);
    console.log("");
    console.log("Dealer's hand:");
    console.log(this.dealer.getHand());
    if (!this.dealer.isHandHidden()) {
      console.log(`Dealer's score: ${this.dealer.score()}`);
    } else {
      console.log("");
    }
  }

  clearScreen() {
    console.clear();
  }

  playerTurn() {
    while (true) {
      this.showCards();
      let choice = this.promptPlayerChoice();
      this.clearScreen();
      if (choice === "s") {
        this.player.stay();
        return;
      }
      if (choice === "h") this.player.hit();
      if (this.player.isBusted()) return;
    }
  }

  promptPlayer(msg, choices) {
    let choice;

    while (true) {
      choice = readline.question(msg).toLowerCase();
      if (choices.includes(choice)) return choice;
      console.log("That isn't a valid choice.");
    }
  }

  shouldPlayAgain() {
    return this.promptPlayAgain() === "y";
  }

  promptPlayAgain() {
    return this.promptPlayer("Play again? (y, n) ", ["y", "n"]);
  }

  promptPlayerChoice() {
    console.log("");
    return this.promptPlayer("(h)it or (s)tay? ", ["h", "s"]);
  }

  dealerTurn() {
    if (this.player.isBusted()) return;
    this.dealer.reveal();

    while (true) {
      this.showCards();
      if (this.dealer.score() >= TwentyOneGame.DEALER_STAY_SCORE) {
        this.dealer.stay();
        return;
      }
      this.dealer.hit();
      this.dealer.sleep();
    }
  }

  displayTitleMessage() {
    if (this.shouldDisplayWelcome) {
      this.displayWelcomeMessage();
      this.shouldDisplayWelcome = false;
    } else {
      console.log("Twenty-One");
    }
    console.log(`Your current winnings: $${this.player.getCurWinnings()}\n`);
  }

  displayWelcomeMessage() {
    console.log("Welcome to Twenty-One!");
  }

  displayGoodbyeMessage() {
    console.log("Goodbye! Thank you for playing.\n");
  }

  // eslint-disable-next-line max-lines-per-function, max-statements
  displayResult() {
    let playerScore = this.player.score();
    let dealerScore = this.dealer.score();
    let msg = "";

    if (this.player.isBusted()) {
      msg = "Sorry, you busted!";
      this.player.lostGame();
    } else if (this.dealer.isBusted()) {
      msg = "Dealer busts! You win";
      this.player.wonGame();
    } else if (playerScore === dealerScore) {
      msg = "It's a tie.";
    } else if (playerScore > dealerScore) {
      msg = "You win!";
      this.player.wonGame();
    } else {
      msg = "Dealer wins.";
      this.player.lostGame();
    }

    this.showCards();
    console.log("");
    console.log(msg);
  }
}

let game = new TwentyOneGame();
game.start();