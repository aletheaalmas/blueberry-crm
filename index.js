const initialDataLeads = [
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
    jobTitle: "CEO",
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
    jobTitle: "CEO",
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
    jobTitle: "CEO",
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
    jobTitle: "CEO",
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
    jobTitle: "CEO",
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
    jobTitle: "CEO",
    websiteUrl: "https://www.newventuretech.com",
    noOfEmployees: "1-10",
    annualRevenueInUSD: 500000,
    industry: null,
    status: "New",
    assignedTo: null,
    contactedAt: null,
  },
];

let dataLeads = loadFromStorage();

function renderLead(lead) {
  return `<tr class="border-b hover:bg-gray-50">
    <td class="px-6 py-3 font-medium">
      ${lead.salutation} ${lead.lastName} ${lead.firstName}
    </td>
    <td class="px-6 py-3">${lead.organization ?? "N/A"}</td>
    <td class="px-6 py-3">${lead.jobTitle ?? "N/A"}</td>
    <td class="px-6 py-3">
      <span class="flex items-center text-gray-600"
        ><span class="w-2 h-2 rounded-full bg-gray-400 mr-2"></span
        >${lead.status}</span
      >
    </td>
    <td class="px-6 py-3">${lead.email ?? "N/A"}</td>
    <td class="px-6 py-3">${lead.phone ?? "N/A"}</td>
    <td class="px-6 py-3 flex items-center space-x-2">
      <div class="w-6 h-6 rounded-full bg-gray-300"></div>
      <span>${lead.assignedTo ?? "Administrator"}</span>
    </td>
      <td class="px-6 py-3 text-gray-500">
      <a href="/lead/?id=${
        lead.id
      }" class="px-6 py-3 text-left font-medium text-black hover:text-indigo-600">View</a>
    </td>
  </tr> `;
}

function renderAllLeads(leads) {
  const leadsTableBodyElement = document.getElementById("leads-table-body");

  const filteredLeads = searchLeads(leads);

  const leadsTableRowElement = filteredLeads
    .map((lead) => renderLead(lead))
    .join("");

  leadsTableBodyElement.innerHTML = leadsTableRowElement;
}

function renderLeadsByStatus(leads, status) {
  const filteredLeads = leads.filter((lead) => lead.status === status);
  renderAllLeads(filteredLeads);
}

function formatNumberInUSD(number) {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

  return formattedNumber;
}

function searchLeads(leads) {
  const searchValue = window.location.search; // '?q=keyword'
  const searchParams = new URLSearchParams(searchValue);
  const q = searchParams.get("q").toLowerCase(); // keyword

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
    jobTitle,
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
    jobTitle,
    websiteUrl,
    noOfEmployees,
    annualRevenueInUSD,
    industry,
    assignedTo,
  };

  const updatedLeads = [...leads, newLead];

  dataLeads = updatedLeads;

  saveToStorage(dataLeads);
}

function deleteLead(leads, id) {
  const updatedLeads = leads.filter((lead) => lead.id !== id);

  dataLeads = updatedLeads;
}

function deleteLeads(leads, ids) {
  const updatedLeads = leads.filter((lead) => ids.includes(lead.id));

  dataLeads = updatedLeads;

  saveToStorage(dataLeads);
}

function updateLead(leads, id, leadBody) {
  const {
    status,
    salutation,
    firstName,
    lastName,
    email,
    phone,
    gender,
    organization,
    jobTitle,
    websiteUrl,
    noOfEmployees,
    annualRevenueInUSD,
    industry,
    assignedTo,
  } = leadBody;

  const updatedLead = leads.map((lead) => {
    if (lead.id !== id) return lead;

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
      jobTitle,
      websiteUrl,
      noOfEmployees,
      annualRevenueInUSD,
      industry,
      assignedTo,
    };
  });

  dataLeads = updatedLead;

  saveToStorage(dataLeads);
}

function changeStatus(leads, id, newStatus) {
  const updatedStatus = leads.map((lead) => {
    if (lead.id === id) {
      return {
        ...lead,
        status: newStatus,
      };
    }
    return lead;
  });

  dataLeads = updatedStatus;

  saveToStorage(dataLeads);
}

function saveToStorage(leads) {
  localStorage.setItem("leads", JSON.stringify(leads));
}

function loadFromStorage() {
  const leads = JSON.parse(localStorage.getItem("leads"));

  if (!leads || leads.length <= 0) {
    saveToStorage(initialDataLeads);
    return initialDataLeads;
  }

  return leads;
}

// ------------------------------------------------------
// createLead(dataLeads, {
//   salutation: "Mr.",
//   firstName: "Li",
//   lastName: "Pengbo",
//   phone: "+86-888-888-888",
//   gender: "Male",
//   organization: "HuangFeng Crossfit",
//   jobTitle: "CEO",
//   websiteUrl: "https://huangfeng.com",
//   noOfEmployees: "11-50",
//   industry: "Sport",
// });

// renderLeadsByStatus(dataLeads, "New");

// generateCode(dataLeads);

// changeStatus(dataLeads, 487, "Contacted");

renderAllLeads(dataLeads);
