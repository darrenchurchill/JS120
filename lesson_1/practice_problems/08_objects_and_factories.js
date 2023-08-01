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

function book(title, author) {
  return {
    title: title,
    author: author,

    getDescription() {
      return `${this.title} was written by ${this.author}.`;
    },
  };
}

let book1 = book("Mythos", "Stephen Fry");
let book2 = book("Me Talk Pretty One Day", "David Sedaris");
let book3 = book("Aunts aren't Gentlemen", "PG Wodehouse");

console.log(book1.getDescription());
console.log(book2.getDescription());
console.log(book3.getDescription());
