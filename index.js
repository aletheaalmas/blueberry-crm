const leads = [
  {
    id: 1,
    code: "CRM-LEAD-2025-001",
    salutation: "Mr.",
    firstName: "Haoming",
    lastName: "Shen",
    email: "shenhaoming@jinda.com",
    phone: "+86-123-456-7890",
    gender: "Male",
    organization: "Jinda",
    websiteUrl: "https://jinda.com",
    noOfEmployees: "51-200",
    annualRevenueInUSD: 1000000,
    industry: "Retail",
    status: "New",
    assignedTo: null,
  },
  {
    id: 2,
    code: "CRM-LEAD-2025-002",
    salutation: "Ms.",
    firstName: "Yan",
    lastName: "Xu",
    email: "xuyan@yanyifang.com",
    phone: "+86-666-666-666",
    gender: "Female",
    organization: "Yanyifang",
    websiteUrl: null,
    noOfEmployees: "11-50",
    annualRevenueInUSD: 0,
    industry: "Manufacturing",
    status: "Contacted",
    assignedTo: null,
  },
  {
    id: 3,
    code: "CRM-LEAD-2025-003",
    salutation: "Mr.",
    firstName: "Wei",
    lastName: "Zhang",
    email: null,
    phone: "+86-123-456-7892",
    gender: "Male",
    organization: "Tianlong Corp",
    websiteUrl: "https://www.tianlongcorp.com",
    noOfEmployees: "201-500",
    annualRevenueInUSD: 5000000,
    industry: "Technology",
    status: "Qualified",
    assignedTo: "User 2",
  },
  {
    id: 4,
    code: "CRM-LEAD-2025-004",
    salutation: "Mrs.",
    firstName: "Meili",
    lastName: "Wang",
    email: "wangmeili@capitalgroup.com",
    phone: "+86-123-456-7893",
    gender: "Female",
    organization: "Capital Investment Group",
    websiteUrl: "https://www.capitalgroup.com",
    noOfEmployees: "501-1000",
    annualRevenueInUSD: 15000000,
    industry: "Finance",
    status: "Nurture",
    assignedTo: null,
  },
  {
    id: 5,
    code: "CRM-LEAD-2025-005",
    salutation: "Mr.",
    firstName: "Jian",
    lastName: "Li",
    email: "lijian@supplier.com",
    phone: "+86-123-456-7894",
    gender: "Male",
    organization: "Precision Parts Co.",
    websiteUrl: "https://www.precisionparts.com",
    noOfEmployees: "11-50",
    annualRevenueInUSD: 1200000,
    industry: "Manufacturing",
    status: "Contacted",
    assignedTo: "User 2",
  },
  {
    id: 6,
    code: "CRM-LEAD-2025-006",
    salutation: "Ms.",
    firstName: "Yan",
    lastName: "Chen",
    email: "chenyan@newventure.com",
    phone: null,
    gender: "Female",
    organization: "New Venture Tech",
    websiteUrl: "https://www.newventuretech.com",
    noOfEmployees: "1-10",
    annualRevenueInUSD: 500000,
    industry: null,
    status: "New",
    assignedTo: null,
  },
];

console.log("Initial Leads Data:");
for (let i = 0; i < leads.length; i++) {
  console.log(`
    ID: ${leads[i].id}
    Lead ID: ${leads[i].leadId}
    Name: ${leads[i].salutation} ${leads[i].firstName} ${leads[i].lastName}
    Email: ${leads[i].email ? leads[i].email : "N/A"}
    Phone: ${leads[i].phone ? leads[i].phone : "N/A"}
    Gender: ${leads[i].gender}
    Organization: ${leads[i].organization ? leads[i].organization : "N/A"}
    Website: ${leads[i].website ? leads[i].website : "N/A"}
    Annual Revenue: ${leads[i].annualRevenue ? leads[i].annualRevenue : "N/A"}
    Industry: ${leads[i].industry ? leads[i].industry : "N/A"}
    Status: ${leads[i].status}
    Assigned To: ${leads[i].assignedTo}
    `);
}

// Example:table format
console.table(leads);

// Example: Gender greeting
for (let i = 0; i < leads.length; i++) {
  if (leads[i].gender == "Female") {
    console.log(
      "Hi Ms. " +
        leads[i].firstName +
        " " +
        leads[i].lastName +
        " we have a special offer for you!"
    );
  }
}

// Example: Item sold and its price calculation
const soldItem = "Full Package 1";
console.log("Sold Item:", soldItem);

let totalPrice = 0;
const prices = [100, 200, 300];
for (let i = 0; i < prices.length; i++) {
  totalPrice += prices[i];
}

console.log("Total Price:", totalPrice);

const currency = "USD";
console.log("Currency:", currency);

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

if (totalPackagePrice > 500) {
  console.log(
    "The total price for",
    soldItems,
    "is",
    totalPackagePrice,
    "so it's eligible for a discount."
  );
} else {
  console.log(
    "total price for",
    soldItems,
    "is",
    totalPackagePrice,
    "so it's not eligible for a discount."
  );
}
