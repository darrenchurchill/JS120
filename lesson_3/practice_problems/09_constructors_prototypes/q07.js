/**
 * JS120 Lesson 3
 * Practice Problems: Assignment 9: Constructors and Prototypes
 * Question 7
 *
 * In this problem, we'll ask you to create a new instance of an object, without
 * having direct access to the constructor function:
 */

let ninjaA;

{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

// create a `ninjaB` object here; don't change anything else
let ninjaB = new ninjaA.constructor();

console.log(ninjaA.constructor === ninjaB.constructor); // => true
