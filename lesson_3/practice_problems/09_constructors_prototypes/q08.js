/**
 * JS120 Lesson 3
 * Practice Problems: Assignment 9: Constructors and Prototypes
 * Question 7
 *
 * Since a constructor is just a function, you can call it without the `new`
 * operator. However, that can lead to unexpected results and errors, especially
 * for inexperienced programmers. Write a constructor function that you can use
 * with or without the `new` operator. The function should return the same
 * result with either form. Use the code below to check your solution:
 */

function User(first, last) {
  if (this === global) {
    return new User(first, last);
  }
  this.name = `${first} ${last}`;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe