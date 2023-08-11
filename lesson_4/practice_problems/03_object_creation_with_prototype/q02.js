/**
 * JS120 Lesson 4
 * Practice Problems: Assignment 3: Object Creation with Prototypes
 * Question 2
 *
 * Use the OLOO pattern to create an object prototype that we can use to create
 * pet objects. The prototype should let us create and use pets as in the code
 * below:
 */

let petPrototype = {
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },

  sleep() {
    console.log("I am sleeping");
  },

  wake() {
    console.log("I am awake");
  },
};

function createPet(animal, name) {
  return Object.create(petPrototype).init(animal, name);
}

let pudding = createPet("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = createPet("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake