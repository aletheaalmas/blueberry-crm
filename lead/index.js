let dataLeads = loadFromStorage();

function getLead(leads) {
  const searchValue = window.location.search;
  const searchParam = new URLSearchParams(searchValue);
  const id = Number(searchParam.get("id"));

  const lead = dataLeads.find((lead) => lead.id === id);

  return lead;
}

function renderLeadDetails(leads) {
  const leadDetailsElement = document.getElementById("lead-details");

  const lead = getLead(leads);

  if (!lead) {
    leadDetailsElement.innerHTML = `<p>Lead not found</p>`;
    return null;
  }

  const fullName = getFullName(lead);
  const statusColor = getStatusColor(lead.status);
  const amountARR = !lead.annualRevenueInUSD
    ? "N/A"
    : formatNumberInUSD(lead.annualRevenueInUSD.toString());

  leadDetailsElement.innerHTML = ` <div
    class="w-full max-w-xl mx-auto bg-white rounded-xl border shadow px-8 py-6"
  >
    <div
      class="flex flex-col sm:flex-row items-center sm:justify-between mb-6 gap-4"
    >
      <div class="flex items-center space-x-4">
        <img
          class="size-16 rounded-full"
          src="https://api.dicebear.com/9.x/initials/svg?seed=${fullName}&radius=50&size=32&"
          alt="${fullName}"
        />
        <div>
          <h2 id="lead-full-name" class="text-xl font-semibold text-gray-800">
            ${lead.firstName ?? ""} ${lead.lastName ?? ""}
          </h2>
          <span id="lead-code" class="block text-xs text-gray-400 mt-1">
            ${lead.code}
          </span>
        </div>
      </div>
      <span
        id="lead-status"
        class="${statusColor} text-white inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0"
      >
        ${lead.status ?? "N/A"}
      </span>
      </div>

      <div class="grid grid-rows-2 gap-8">
        <div id="personal-details">
          <h3
            class="font-semibold text-gray-800 mb-2 uppercase tracking-wide text-sm"
          >
            Person
          </h3>
          <div class="grid grid-cols-1 gap-y-2 max-w-xs">
            <div class="grid grid-cols-2 items-center">
              <span class="text-gray-500">Salutation</span>
              <span id="lead-salutation">${lead.salutation ?? "N/A"}</span>
            </div>
            <div class="grid grid-cols-2 items-center">
              <span class="text-gray-500">First Name</span>
              <span id="lead-first-name">${lead.firstName ?? "N/A"}</span>
            </div>
            <div class="grid grid-cols-2 items-center">
              <span class="text-gray-500">Last Name</span>
              <span id="lead-last-name">${lead.lastName ?? "N/A"}</span>
            </div>
            <div class="grid grid-cols-2 items-center">
              <span class="text-gray-500">Gender</span>
              <span id="lead-gender">${lead.gender ?? "N/A"}</span>
            </div>
            <div class="grid grid-cols-2 items-center">
              <span class="text-gray-500">Email</span>
              <span id="lead-email">${lead.email ?? "N/A"}</span>
            </div>
            <div class="grid grid-cols-2 items-center">
              <span class="text-gray-500">Phone</span>
              <span id="lead-phone">${lead.phone ?? "N/A"}</span>
            </div>
          </div>
          </div>
          <div id="company-details">
            <h3
              class="font-semibold text-gray-800 mb-2 uppercase tracking-wide text-sm"
            >
              Company
            </h3>
            <div class="grid grid-cols-2 gap-y-2 max-w-xs">
              <span class="text-gray-500">Organization</span>
              <span id="lead-organization">${lead.organization ?? "N/A"}</span>
              <span class="text-gray-500">Job Title</span>
              <span id="lead-job-title">${lead.jobTitle ?? "N/A"}</span>
              <span class="text-gray-500">Website</span>
              <span id="lead-website"
                >${
                  lead.websiteUrl
                    ? `<a href="${lead.websiteUrl}" class="text-indigo-600 hover:underline" target="_blank" rel="noopener">${lead.websiteUrl}</a>`
                    : "N/A"
                }</span
              >
              <span class="text-gray-500">Industry</span>
            <span id="lead-industry">${lead.industry ?? "N/A"}</span>
            <span class="text-gray-500">Annual Revenue</span>
            <span id="lead-arr">${amountARR}</span>
            <span class="text-gray-500">Lead Owner</span>
            <span id="lead-owner">${lead.assignedTo ?? "N/A"}</span>
          </div>
            </div>
          </div>
        </div>
     `;
}

renderLeadDetails(dataLeads);

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
