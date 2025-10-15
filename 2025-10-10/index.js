// Example: Gender greeting
// for (let index = 0; index < leads.length; index++) {
//   const lead = leads[index];

//   if (lead.gender == "Female") {
//     console.log(
//       `Hi ${lead.salutation} ${lead.firstName} ${lead.lastName} we have a special offer for you!`
//     );
//   } else {
//     console.log(
//       `Hi ${lead.salutation} ${lead.firstName} ${lead.lastName} have a good day!`
//     );
//   }
// }

let totalPrice = 0;

const prices = [100, 200, 300];

for (let index = 0; index < prices.length; index++) {
  const price = prices[index];

  totalPrice += price;
}

console.log("Total Price:", totalPrice);

// Example: Items sold and their prices
const soldItems = [
  "Service Package 1",
  "Service Package 2",
  "Service Package 3",
];
console.log("Sold Items:", soldItems);

let package1Price = 100;
let package2Price = 200;
let package3Price = 300;
let totalPackagePrice = package1Price + package2Price + package3Price;
console.log("Total Package Price:", totalPackagePrice);

const soldItemsString = soldItems.join(", ");

if (totalPackagePrice > 500) {
  console.log(
    `The total price for ${soldItemsString} is ${totalPackagePrice}, so it's eligible for a discount.`
  );
} else {
  console.log(
    `total price for ${soldItemsString} is ${totalPackagePrice} so it's not eligible for a discount.`
  );
}
