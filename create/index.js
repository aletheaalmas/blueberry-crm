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

function fixWebsiteURL(text) {
  if (!text) {
    return null;
  }

  if (!text.includes("http")) {
    return `https://${text}`;

    return text;
  }
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
    employeesCountRange,
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
    websiteUrl: fixWebsiteUrl(websiteUrl),
    employeesCountRange,
    annualRevenueInUSD,
    industry,
    assignedTo,
  };

  const updatedLeads = [...leads, newLead];
  dataLeads = updatedLeads;

  saveToStorage(dataLeads);
}

const createLeadFormElement = document.getElementById("create-form");

createLeadFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(createLeadFormElement);

  const newLeadData = {
    salutation: formData.get("salutation"),
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    organization: formData.get("organization"),
    jobTitle: formData.get("job-title"),
    websiteUrl: formData.get("website"),
    industry: formData.get("industry"),
    annualRevenueInUSD: formData.get("arr"),
    employeesCountRange: formData.get("employees-count-range"),
    status: formData.get("status"),
    assignedTo: formData.get("lead-owner"),
  };

  createLead(dataLeads, newLeadData);
});

// ------------------------------------------------------
