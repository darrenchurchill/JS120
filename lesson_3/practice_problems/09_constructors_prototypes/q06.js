/**
 * JS120 Lesson 3
 * Practice Problems: Assignment 9: Constructors and Prototypes
 * Question 6
 *
 * Implement the method described in the comments below.
 */

function Ninja() {
  this.swung = false;
}

// Add a swing method to the Ninja prototype which
// modifies `swung` and returns the calling object
Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
};

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);      // logs `true`
console.log(ninjaB.swing().swung);      // logs `true`