
let dataLeads = loadFromStorage();

const searchInput = document.getElementById("search-input");


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
