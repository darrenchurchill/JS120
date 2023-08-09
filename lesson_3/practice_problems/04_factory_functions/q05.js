/**
 * JS120 Lesson 3
 * Practice Problems: Assignment 4: Factory Functions
 * Question 5
 *
 * Update the `createInvoice` function so that it can add payment(s) to
 * invoices.
 */

function createInvoice(services) {
  return Object.assign(
    {
      phone: 3000,
      internet: 5500,
      total() {
        return this.phone + this.internet;
      },
    },
    services
  );
}

function createPayment(services) {
  return Object.assign(
    {
      phone: 0,
      internet: 0,
      total() {
        return this.amount || (this.phone + this.internet);
      },
    },
    services
  );
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
invoice.amountDue();       // this should return 0