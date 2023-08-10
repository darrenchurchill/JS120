/**
 * JS120 Lesson 3
 * Practice Problems: Assignment 6: Object Orientation
 * Question 4
 *
 * We want our code to take an object-oriented approach to keeping track of the
 * products, and although the functions we just wrote work fine, since they are
 * manipulating data in the objects, we should place them in the objects
 * themselves. Rewrite the code such that the functions `describeProduct` and
 * `setProductPrice` become methods `describe` and `setPrice` on both our
 * `scissors` and `drill` objects.
 */

let scissors = {
  id: 0,
  name: "Scissors",
  stock: 8,
  price: 10,

  describe() {
    console.log(`Name: ${this.name}`);
    console.log(`ID: ${this.id}`);
    console.log(`Price: $${this.price}`);
    console.log(`Stock: ${this.stock}`);
  },

  setPrice(price) {
    if (typeof price !== "number") throw new TypeError("Price must be a number");
    if (price < 0) throw new TypeError("Price must be >= 0");

    this.price = price;
  },
};

let drill = {
  id: 1,
  name: "Cordless Drill",
  stock: 15,
  price: 45,

  describe() {
    console.log(`Name: ${this.name}`);
    console.log(`ID: ${this.id}`);
    console.log(`Price: $${this.price}`);
    console.log(`Stock: ${this.stock}`);
  },

  setPrice(price) {
    if (typeof price !== "number") throw new TypeError("Price must be a number");
    if (price < 0) throw new TypeError("Price must be >= 0");

    this.price = price;
  },
};

try {
  scissors.setPrice('price');
} catch (err) {
  if (!(err instanceof TypeError)) throw err;
  console.warn(err.message);
}

try {
  drill.setPrice(-1);
} catch (err) {
  if (!(err instanceof TypeError)) throw err;
  console.warn(err.message);
}

scissors.setPrice(5);
drill.setPrice(50);

console.log(scissors);
console.log(drill);

scissors.describe();
drill.describe();