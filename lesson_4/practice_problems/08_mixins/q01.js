/**
 * JS120 Lesson 4
 * Practice Problems: Assignment 8: Code Reuse with Mixins
 * Question 1
 *
 * If we have a `Car` class and a `Truck` class, how can you use the `Speed`
 * object as a mix-in to make them `goFast`? How can you check whether your
 * `Car` or `Truck` can now go fast?
 */

const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}
Object.assign(Car.prototype, Speed);

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}
Object.assign(Truck.prototype, Speed);

let car = new Car();
let truck = new Truck();

console.log("goFast" in car);
console.log("goFast" in truck);

car.goFast();
truck.goFast();