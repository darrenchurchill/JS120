/**
 * JS120 Lesson 3
 * Practice Problems: Assignment 6: Object Orientation
 * Question 3
 *
 * It would also be useful to have the ability to output descriptions of our
 * product objects.
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

function describeProduct(product) {
  console.log(`Name: ${product.name}`);
  console.log(`ID: ${product.id}`);
  console.log(`Price: $${product.price}`);
  console.log(`Stock: ${product.stock}`);
}

describeProduct(scissors);
// => Name: Scissors
// => ID: 0
// => Price: $10
// => Stock: 8

describeProduct(drill);
// => Name: Cordless Drill
// => ID: 1
// => Price: $45
// => Stock: 15