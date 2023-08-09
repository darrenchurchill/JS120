/**
 * JS120 Lesson 3
 * Practice Problems: Assignment 4: Factory Functions
 * Question 4
 *
 * Now we can build a factory function to create payments. The function can take
 * an object argument in one of 3 forms:
 *
 * - Payment for one service, e.g., { internet: 1000 } or { phone: 1000 }.
 * - Payment for both services, e.g., { internet: 2000, phone: 1000 }.
 * - Payment with just an amount property, e.g., { amount: 2000 }.
 *
 * The function should return an object that has the amount paid for each
 * service and a `total` method that returns the payment total. If the `amount`
 * property is not present in the argument, it should return the sum of the
 * phone and internet service charges; if the `amount` property is present,
 * return the value of that property.
 */

function createPayment(services) {
  return Object.assign(
    {
      total() {
        let total = 0;
        if (this.amount !== undefined) total += this.amount;
        else {
          if (this.phone !== undefined) total += this.phone;
          if (this.internet !== undefined) total += this.internet;
        }
        return total;
      },
    },
    services
  );
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000