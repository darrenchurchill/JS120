/**
 * JS120 Lesson 3
 * Practice Problems: Assignment 9: Constructors and Prototypes
 * Question 3
 *
 * Write a constructor function called `Circle` that takes a `radius` as an
 * argument. You should be able to call an `area` method on any objects created
 * by the constructor to get the circle's area.
 */

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.PI * (this.radius ** 2);
};

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty('area')); // => false