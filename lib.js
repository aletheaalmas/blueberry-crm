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
    employeesCountRange: "51-200",
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
    employeesCountRange: "11-50",
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
    employeesCountRange: "201-500",
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
    employeesCountRange: "501-1000",
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
    employeesCountRange: "11-50",
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
    employeesCountRange: "1-10",
    annualRevenueInUSD: 500000,
    industry: null,
    status: "New",
    assignedTo: null,
    contactedAt: null,
  },
];

let dataLeads = loadFromStorage();

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

function getAmountARR(annualRevenueInUSD) {
  const amountARR =
    lead.annualRevenueInUSD != null
      ? formatNumberInUSD(lead.annualRevenueInUSD.toString())
      : "N/A";
  return amountARR;
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

function getInitial(firstName, lastName) {
  const first = firstName?.[0] ?? "";
  const last = lastName?.[0] ?? "";
  return (first + last).toUpperCasse() || "N/A";
}

function getFullName(lead) {
  return `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim();
}

function getStatusColor(status) {
  switch (status) {
    case "New":
      return "bg-stone-200";
      break;
    case "Contacted":
      return "bg-yellow-200";
      break;
    case "Qualified":
      return "bg-indigo-200";
      break;
    case "Nurtured":
      return "bg-green-200";
      break;
    case "Junk":
      return "bg-red-200";
      break;
    default:
      return "";
      break;
  }
}

function fixWebsiteURL(text) {
  if (!text) {
    return null;
  }

  if (!text.includes("http")) {
    return `https://${text}`;

    return text;
  }
}
