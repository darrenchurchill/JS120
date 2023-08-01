/**
 * JS120 Lesson 1
 * Assignment 8 Practice Problems
 * Objects and Factories
 *
 * We'll develop a factory function for objects that represent books.
 * To start, books will look something like the examples below:
 *
 * Attributes
 *   Title: Mythos
 *   Author: Stephen Fry
 *
 * Behavior:
 *   Get Description
 *
 * -----------------------------
 * Attributes
 *   Title: Me Talk Pretty One Day
 *   Author: David Sedaris
 *
 * Behavior:
 *   Get Description
 *
 * -----------------------------
 * Attributes
 *  Title: Aunts aren't Gentlemen
 *  Author: PG Wodehouse
 *
 *  Behavior:
 *    Get Description
 */

let book1 = {
  title: "Mythos",
  author: "Stephen Fry",

  getDescription() {
    return `${this.title} was written by ${this.author}.`;
  },
};

let book2 = {
  title: "Me Talk Pretty One Day",
  author: "David Sedaris",

  getDescription() {
    return `${this.title} was written by ${this.author}.`;
  },
};

let book3 = {
  title: "Aunts aren't Gentlemen",
  author: "PG Wodehouse",

  getDescription() {
    return `${this.title} was written by ${this.author}.`;
  },
};

console.log(book1.getDescription());
console.log(book2.getDescription());
console.log(book3.getDescription());
