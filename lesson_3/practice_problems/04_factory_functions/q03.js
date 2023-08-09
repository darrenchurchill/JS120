/**
 * JS120 Lesson 3
 * Practice Problems: Assignment 4: Factory Functions
 * Question 3
 *
 * To process multiple invoices, we need a factory method that we can use to
 * create invoices. The requirements for the factory function are as follows:
 *
 * 1. It returns an invoice object, with `phone` and `internet` properties, and
 *    a `total` method.
 * 2. The default value for the phone service is 3000, and the internet service
 *    is 5500 (in cents, of course1).
 * 3. The function takes an argument whose attributes override the default
 *    values.
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

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000