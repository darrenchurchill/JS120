/**
 * JS120 Lesson 4
 * Practice Problems: Assignment 8: Code Reuse with Mixins
 * Question 2
 *
 * Ben and Alyssa are working on a vehicle management system. Thus far, they
 * have created classes named `Auto` and `Motorcycle` to represent automobiles
 * and motorcycles. After they noticed that the information and calculations
 * performed was common to both vehicle types, they decided to break out the
 * commonality into a separate class named `WheeledVehicle`. Their code
 * initially contains the `WheeledVehicle`, `Auto`, and `Motorcycle` class
 * definitions.
 *
 * Their boss now wants them to incorporate a new type of vehicle: a
 * `Catamaran`.
 *
 * This new class doesn't fit well with our existing class hierarchy: Catamarans
 * don't have tires, and aren't wheeled vehicles. However, we still want to
 * share the code for tracking fuel efficiency and range. Modify the class
 * definitions and move code into a mix-in, as needed, to share code between the
 * `Catamaran` and the wheeled vehicle classes.
 */

class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }

  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
}

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}

class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic
    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }
}