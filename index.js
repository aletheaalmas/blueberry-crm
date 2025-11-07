let dataLeads = [
  {
    id: 132,
    code: "CRM-LEAD-2025-001",
    salutation: "Mr.",
    firstName: "Haoming",
    lastName: "Shen",
    email: "shenhaoming@jinda.com",
    phone: "+86-123-456-7890",
    gender: "Male",
    organization: "Jinda Group",
    websiteUrl: "https://jinda.com",
    noOfEmployees: "51-200",
    annualRevenueInUSD: 1000000,
    industry: "Retail",
    status: "New",
    assignedTo: null,
    contactedAt: null,
  },
  {
    id: 245,
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
    assignedTo: "User 1",
    contactedAt: new Date("2025-02-02"),
  },
  {
    id: 367,
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
    contactedAt: new Date("2025-03-03"),
  },
  {
    id: 412,
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
    status: "Nurtured",
    assignedTo: null,
    contactedAt: new Date("2025-04-04"),
  },
  {
    id: 534,
    code: "CRM-LEAD-2025-005",
    salutation: "Mr.",
    firstName: null,
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
    contactedAt: new Date("2025-05-05"),
  },
  {
    id: 486,
    code: "CRM-LEAD-2025-006",
    salutation: "Ms.",
    firstName: "Yan",
    lastName: "Zhang",
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
    contactedAt: null,
  },
];

function showLead(lead) {
  const amountARR = !lead.annualRevenueInUSD
    ? "N/A"
    : formatNumberInUSD(lead.annualRevenueInUSD.toString());

  console.log(` 
    ID              : ${lead.id}
    Code            : ${lead.code}
    Status          : ${lead.status}
    Name            : ${lead.salutation} ${lead.lastName} ${lead.firstName} 
    Email           : ${lead.email ?? "N/A"}
    Phone           : ${lead.phone ?? "N/A"}
    Gender          : ${lead.gender}
    Organization    : ${lead.organization ?? "N/A"}
    Website URL     : ${lead.websiteUrl ?? "N/A"} 
    ARR (USD)       : ${amountARR}
    Industry        : ${lead.industry ?? "N/A"}  
    Assigned To     : ${lead.assignedTo ?? "N/A"}

`);
}

function showAllLeads(leads) {
  leads.forEach((lead) => showLead(lead));
}

function showLeadsByStatus(leads, status) {
  const filteredLeads = leads.filter((lead) => lead.status === status);
  showAllLeads(filteredLeads);
}

function formatNumberInUSD(number) {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

  return formattedNumber;
}

function searchLeads(leads, query) {
  const q = query.toLowerCase();

  const foundLeads = leads.filter((lead) => {
    if (
      (lead.firstName && lead.firstName.toLowerCase().includes(q)) ||
      (lead.lastName && lead.lastName.toLowerCase().includes(q)) ||
      (lead.email && lead.email.toLowerCase().includes(q)) ||
      (lead.organization && lead.organization.toLowerCase().includes(q))
    ) {
      return lead;
    }
  });

  return foundLeads;
}

function generateId(items) {
  const newId = items[items.length - 1].id + 1;
  return newId;
}

function generateCode(items) {
  const lastCode = items[items.length - 1].code;

  let lastCodeAsArray = lastCode.split("-");
  lastCodeAsArray[2] = new Date().getFullYear().toString();

  const newCodePadded = (parseInt(lastCodeAsArray[3]) + 1)
    .toString()
    .padStart(3, "0");

  lastCodeAsArray[3] = newCodePadded;
  const newCode = lastCodeAsArray.join("-");

  return newCode;
}

function createLead(leads, leadBody) {
  const {
    salutation,
    firstName,
    lastName,
    email,
    phone,
    gender,
    organization,
    websiteUrl,
    noOfEmployees,
    annualRevenueInUSD,
    industry,
  } = leadBody;

  const id = generateId(leads);
  const code = generateCode(leads);
  const status = "New";
  const assignedTo = null;

  const newLead = {
    id,
    code,
    status,
    salutation,
    firstName,
    lastName,
    email,
    phone,
    gender,
    organization,
    websiteUrl,
    noOfEmployees,
    annualRevenueInUSD,
    industry,
    assignedTo,
  };

  const updatedLeads = [...leads, newLead];
  dataLeads = updatedLeads;

  return updatedLeads;
}

function deleteLead(leads, id) {
  const deletedLead = leads.filter((lead) => {
    if (lead.id == id) {
      return false;
    } else {
      return true;
    }
  });
  return deletedLead;
}

function deleteLeads(leads, idsToDelete) {
  const deletedLeads = leads.filter((lead) => {
    if (idsToDelete.includes(lead.id)) {
      return false;
    } else {
      return true;
    }
  });

  return deletedLeads;
}

function updateLead(leads, id, leadBody) {
  const {
    code,
    status,
    salutation,
    firstName,
    lastName,
    email,
    phone,
    gender,
    organization,
    websiteUrl,
    noOfEmployees,
    annualRevenueInUSD,
    industry,
    assignedTo,
  } = leadBody;

  const updatedLead = leads.map((lead) => {
    if (lead.id === id) {
      return {
        ...lead,
        code,
        status,
        salutation,
        firstName,
        lastName,
        email,
        phone,
        gender,
        organization,
        websiteUrl,
        noOfEmployees,
        annualRevenueInUSD,
        industry,
        assignedTo,
      };
    } else {
      return lead;
    }
  });

  return updatedLead;
}
// TODO: use map to update only the specified id

function alertFirstNameMissing() {}

function alertEmailMissing() {}

function alertEmailNotValid() {}

function calculateAge() {}

function moveLeadToTrash() {}

function assignLeadToUser() {}

function unassignLead() {}

function changeStatus(leads, id, newStatus) {} // "Contacted" / "Nurtured" / "Canceled"

// ------------------------------------------------------
createLead(dataLeads, {
  salutation: "Mr.",
  firstName: "Li",
  lastName: "Pengbo",
  phone: "+86-888-888-888",
  gender: "Male",
  organization: "HuangFeng Crossfit",
  websiteUrl: "https://huangfeng.com",
  noOfEmployees: "11-50",
  industry: "Sport",
});

// showLeadsByStatus(dataLeads, "New");

// generateCode(dataLeads);

deleteLead(dataLeads, 245);
