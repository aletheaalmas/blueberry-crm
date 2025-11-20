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

const createLeadFormElement = document.getElementById("create-form");


createLeadFormElement.addEventListener("submit", (event) => {
  event.preventDefault();
console.log("create");
});

// subscribeFormElement.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const formData = new FormData(subscribeFormElement);

//   const subscribeData = {
//     salutation: formData.get("salutation-option"),
//     firstName: formData.get("first-name-input"),
//     lastName: formData.get("last-name-input"),
//     email: formData.get("email-input"),
//     phone: formData.get("phone-input"),
//     organization: formData.get("organiation-input"),
//     jobTitle: formData.get("job-title-input"),
//     websiteUrl: formData.get("website-input"),
//     industry: formData.get("industry-option"),
//     annualRevenueInUSD: formData.get("arr-input"),
//     noOfEmployees: formData.get("employees-option"),
//     status: formData.get("status-option"),
//     assignedTo: formData.get("lead-owner-option"),
//   };

//   console.log(subscribeData);
// });

// ------------------------------------------------------
