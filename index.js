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

function showAllLeads() {
  console.log(`Currently we have ${leads.length} leads. Here is the details:`);

  leads.forEach((lead) => showLead(lead));
}

function showLeadsByStatus(status) {
  let filteredLeads = leads.filter((lead) => lead.status === status);

  console.log(
    `Currently we have ${filteredLeads.length} leads with status '${status}'. Here is the details:`
  );

  filteredLeads.forEach((lead) => showLead(lead));
}

function showLead(lead) {
  console.log(` 
    Code            : ${lead.code}
    Status          : ${lead.status}
    Name            : ${lead.salutation} ${lead.lastName} ${lead.firstName} 
    Email           : ${lead.email ?? "N/A"}
    Phone           : ${lead.phone ?? "N/A"}
    Gender          : ${lead.gender}
    Organization    : ${lead.organization ?? "N/A"}
    Website URL     : ${lead.websiteUrl ?? "N/A"} 
    ARR (USD)       : ${formatNumberInUSD(lead.annualRevenueInUSD) ?? "N/A"}
    Industry        : ${lead.industry ?? "N/A"}  
    Assigned To     : ${lead.assignedTo ?? "N/A"}

`);
}

function formatNumberInUSD(number) {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

  return formattedNumber;
}

function searchLeads() {}

function createLead() {}

function updateLead() {}

function alertFirstNameMissing() {}

function alertEmailMissing() {}

function alertEmailNotValid() {}

function calculateAge() {}

function moveLeadToTrash() {}

function assignLeadToUser() {}

function unassignLead() {}

// ------------------------------------------------------

showAllLeads();
// showLeadsByStatus("New");
