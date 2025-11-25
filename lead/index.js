function getLead(leads) {
  const searchValue = window.location.search;
  const searchParam = new URLSearchParams(searchValue);
  const id = Number(searchParam.get("id"));

  const lead = leads.find((lead) => lead.id === id);

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

  leadDetailsElement.innerHTML = `
    <div class="w-full max-w-xl mx-auto bg-white rounded-xl shadow px-8 py-6">
      <div>
        <a href="/"
          ><img src="/assets/icons/arrow-left.svg" alt="View" width="20" height="15"
        /></a>
      </div>
      <div
        class="flex flex-col sm:flex-row items-center sm:justify-between mb-6 gap-4"
      >
        <div class="flex items-center space-x-4">
          <a href="/"
            ><img
              class="size-16 rounded-full"
              src="https://api.dicebear.com/9.x/initials/svg?seed=${fullName}&radius=50&size=32&backgroundColor=b6e3f4,ffd5dc,c0aede,d1d4f9,ffdfbf"
              alt="${fullName}"
          /></a>
          <div>
            <span id="lead-code" class="block text-xs text-gray-400 mt-1">
              ${lead.code}
            </span>
            <h2
              id="lead-full-name"
              class="text-2xl font-semibold text-gray-800"
            >
              ${lead.firstName ?? ""} ${lead.lastName ?? ""}
            </h2>
            <div class="flex item-centre gap-2">
              <a
                class="mt-2 border border-gray-200 bg-gray-50 p-1 rounded"
                href="../edit/?id=${lead.id}"
              >
                <img
                  src="/assets/icons/edit.svg"
                  alt="View"
                  width="15"
                  height="15"
                />
              </a>
              <button
                class="mt-2 border border-gray-200 bg-gray-50 p-1 rounded cursor-pointer"
                onclick="deleteLead(dataLeads, ${lead.id})"
              >
                <img
                  src="/assets/icons/bin.svg"
                  alt="View"
                  width="15"
                  height="15"
                />
              </button>
            </div>
          </div>
        </div>
        <div>
          <span
            id="assigned-to"
            class="bg-gray-300 text-gray-400 inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium mt-2 sm:mt-0"
          >
            ${lead.assignedTo ?? "Administrator"}
          </span>
          <span
            id="lead-status"
            class="${statusColor} text-gray-400 inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium mt-2 sm:mt-0"
          >
            ${lead.status ?? "N/A"}
          </span>
        </div>
      </div>
      <div class="grid grid-rows-2 gap-6">
        <div id="personal-details">
          <h3
            class="font-semibold text-gray-800 mb-2 uppercase tracking-wide text-sm"
          >
            Person
          </h3>
          <div class="grid grid-cols-1 gap-y-2 max-w-xs">
            <div class="grid grid-cols-2 items-center">
              <span class="text-gray-500">Salutation</span>
              <span>${lead.salutation ?? "N/A"}</span>
            </div>
            <div class="grid grid-cols-2 items-center">
              <span class="text-gray-500">First Name</span>
              <span>${lead.firstName ?? "N/A"}</span>
            </div>
            <div class="grid grid-cols-2 items-center">
              <span class="text-gray-500">Last Name</span>
              <span>${lead.lastName ?? "N/A"}</span>
            </div>
            <div class="grid grid-cols-2 items-center">
              <span class="text-gray-500">Gender</span>
              <span>${lead.gender ?? "N/A"}</span>
            </div>
            <div class="grid grid-cols-2 items-center">
              <span class="text-gray-500">Email</span>
              <span>${lead.email ?? "N/A"}</span>
            </div>
            <div class="grid grid-cols-2 items-center">
              <span class="text-gray-500">Phone</span>
              <span>${lead.phone ?? "N/A"}</span>
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
            <span>${lead.organization ?? "N/A"}</span>
            <span class="text-gray-500">Job Title</span>
            <span>${lead.jobTitle ?? "N/A"}</span>
            <span class="text-gray-500">Website</span>
            <span
              >${
                lead.websiteUrl
                  ? `<a href="${lead.websiteUrl}" class="text-indigo-600 hover:underline" target="_blank" rel="noopener">${lead.websiteUrl}</a>`
                  : "N/A"
              }</span
            >
            <span class="text-gray-500">Industry</span>
            <span>${lead.industry ?? "N/A"}</span>
            <span class="text-gray-500">Annual Revenue</span>
            <span>${amountARR}</span>
            <span class="text-gray-500">No. of Employees</span>
            <span>${lead.employeesCountRange}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

renderLeadDetails(dataLeads);

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
    employeesCountRange,
    annualRevenueInUSD,
    industry,
    assignedTo,
  } = leadBody;

  const updatedLead = leads.map((lead) => {
    if (lead.id !== id) return lead;

    return {
      ...lead,
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
      employeesCountRange,
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

window.deleteLead = deleteLead;
window.dataLeads = dataLeads;
