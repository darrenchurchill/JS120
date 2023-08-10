/**
 * JS120 Lesson 3
 * Practice Problems: Assignment 6: Object Orientation
 * Question 6
 *
 * Recreate the `scissors` and `drill` objects using our `createProduct` factory
 * function, along with two or three more products of your choosing.
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
let broom = createProduct(2, "Broom", 2, 10);
let saw = createProduct(3, "Saw", 4, 40);

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
broom.describe();
saw.describe();