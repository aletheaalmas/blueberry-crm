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
  const fullName = getFullName(lead);
  const statusColor = getStatusColor(lead.status);

  return `<tr class="border-b hover:bg-gray-50">
    <td class="flex content-between gap-2 px-6 py-3 text-gray-500">
      <a
        href="lead/?id=${lead.id}"
        class="text-left font medium text-black hover:text-indigo-600"
      >
        <img
          src="/assets/icons/list-ul.svg"
          alt="View"
          width="15"
          height="15"
        />
      </a>
      <a
      >
        <img
          src="/assets/icons/bin.svg"
          alt="View"
          width="15"
          height="15"
        />
      </a>
    </td>
    <td class="whitespace-nowrap px-6 py-3 font-medium">
      <div class="flex items-center gap-2">
        <img
          class="size-6 rounded-full"
          src="https://api.dicebear.com/9.x/initials/svg?seed=${fullName}&radius=50&size=32&backgroundColor=b6e3f4,ffd5dc,c0aede,d1d4f9,ffdfbf"
          alt="${fullName}"
        />
        <span> ${lead.salutation ?? ""} ${fullName} </span>
      </div>
    </td>
    <td class="whitespace-nowrap px-6 py-3">${lead.organization ?? "N/A"}</td>
    <td class="whitespace-nowrap px-6 py-3">${lead.jobTitle ?? "N/A"}</td>
    <td class="px-6 py-3">
      <span class="flex items-center text-gray-600">
        <span class="w-2 h-2 rounded-full mr-2 ${statusColor}"></span>
        <span>${lead.status}</span>
      </span>
    </td>
    <td class="px-6 py-3">${lead.email ?? "N/A"}</td>
    <td class="px-6 py-3 whitespace-nowrap ">${lead.phone ?? "N/A"}</td>
    <td class="px-6 py-3 flex items-center space-x-2">
      <div class="w-6 h-6 rounded-full bg-gray-300"></div>
      <span>${lead.assignedTo ?? "Administrator"}</span>
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

function searchLeads(leads) {
  const searchValue = window.location.search; //'?q=keyword'
  const searchParams = new URLSearchParams(searchValue);
  const q = searchParams.get("q"); //keyword

  if (!q) return leads;

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
