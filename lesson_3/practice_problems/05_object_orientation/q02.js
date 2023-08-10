/**
 * JS120 Lesson 3
 * Practice Problems: Assignment 6: Object Orientation
 * Question 2
 *
 * Our new organization also makes it easier to write functions dealing with the
 * products, because we can now take advantage of conventions in the objects'
 * data. Create a function that takes one of our product objects as an argument,
 * and sets the object's price to a non-negative number of our choosing, passed
 * in as a second argument. If the new price is negative, alert the user that
 * the new price is invalid.
 */

let scissors = {
  id: 0,
  name: "Scissors",
  stock: 8,
  price: 10,
};

let drill = {
  id: 1,
  name: "Cordless Drill",
  stock: 15,
  price: 45,
};

function setPrice(product, price) {
  if (typeof price !== "number") throw new TypeError("Price must be a number");
  if (price < 0) throw new TypeError("Price must be >= 0");

  product.price = price;
}

try {
  setPrice(scissors, 'price');
} catch (err) {
  if (!(err instanceof TypeError)) throw err;
  console.warn(err.message);
}

try {
  setPrice(drill, -1);
} catch (err) {
  if (!(err instanceof TypeError)) throw err;
  console.warn(err.message);
}

setPrice(scissors, 5);
setPrice(drill, 50);

console.log(scissors);
console.log(drill);