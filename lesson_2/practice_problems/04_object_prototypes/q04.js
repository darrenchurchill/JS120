/**
 * JS120 Lesson 2
 * Practice Problems: Assignment 4: Object Prototypes
 * Question 4
 *
 * As we saw in problem 2, the following code creates a new property in the
 * `baz` object instead of assigning the property in the prototype object.
 *
 * ```js
 * let qux = { foo: 1 };
 * let baz = Object.create(qux);
 * baz.foo = 2;
 * ```
 *
 * Write a function that searches the prototype chain of an object for a given
 * property and assigns it a new value. If the property does not exist in any of
 * the prototype objects, the function should do nothing.
 */

function assignProperty(obj, prop, val) {
  let proto = obj;
  while (proto !== null) {
    if (proto.hasOwnProperty(prop)) {
      proto[prop] = val;
      return;
    }
    proto = Object.getPrototypeOf(proto);
  }
}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooA, "bar", 3);
console.log(fooA.bar);
console.log(fooC.bar);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false
