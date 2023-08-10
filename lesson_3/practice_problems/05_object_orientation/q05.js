/**
 * JS120 Lesson 3
 * Practice Problems: Assignment 6: Object Orientation
 * Question 5
 *
 * This solution has brought us closer to our object-oriented ideal, but has
 * also introduced some inefficiency, insofar as our `setPrice` and `describe`
 * methods are duplicated in each object, and we will have to type out this code
 * for each new object we want to create. One solution to this problem is to
 * stop manually creating each object, and instead use a factory function to
 * generate them. Create a new function `createProduct` which takes arguments
 * for `id`, `name`, `stock`, and `price` and also adds `setPrice` and
 * `describe` to the new object.
 */

function createProduct(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,

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
}

let scissors = createProduct(0, "Scissors", 8, 10);
let drill = createProduct(1, "Cordless Drill", 15, 45);

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