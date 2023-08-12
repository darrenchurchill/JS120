/**
 * JS120 Lesson 4
 * Practice Problems: Assignment 6: Subtyping with Classes
 * Question 2
 *
 * Let's practice creating a class hierarchy.
 *
 * Create a class named `Greeting` that has a single method named `greet`. The
 * method should take a single string argument, and it should print that
 * argument to the console.
 *
 * Now, create two more classes that inherit from `Greeting`: one named `Hello`,
 * and the other `Goodbye`. The `Hello` class should have a `hi` method that
 * takes no arguments and logs `"Hello"`. The `Goodbye` class should have a
 * `bye` method that logs `"Goodbye"`. Use the `Greet` method from the
 * `Greeting` class when implementing `Hello` and `Goodbye`; don't call
 * `console.log` from either `Hello` or `Goodbye`.
 */

class Greeting {
  constructor() {}

  greet(msg) {
    console.log(msg);
  }
}

class Hello extends Greeting {
  constructor() {
    super();
  }

  hi() {
    this.greet("Hello");
  }
}

class Goodbye extends Greeting {
  constructor() {
    super();
  }

  bye() {
    this.greet("Goodbye");
  }
}

let hello = new Hello();
let goodbye = new Goodbye();

hello.hi();
goodbye.bye();