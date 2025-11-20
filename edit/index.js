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
   <section
          id="right-content"
          class="w-[340px] bg-white border rounded-2xl shadow-sm p-5"
        >
          <div
            id="right-content-header"
            class="flex items-center justify-between mb-5"
          ></div>

          <div id="lead-name-profpic" class="flex items-center space-x-3 mb-4">
            <div
              class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium"
            >
              M
            </div>
            <div>
              <h2
                id="lead-full-name"
                class="text-lg font-semibold text-gray-800"
              >
                Ms Zhao Lusi
              </h2>
            </div>
          </div>
          <span id="lead-code" class="text-sm text-gray-500"
            >CRM-LEAD-2025-00004</span
          >
          <span
            id="lead-status"
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
          >
            Contacted
          </span>

          <div id="lead-details" class="space-y-6 text-sm text-gray-700">
            <div id="personal-detals">
              <h3 class="font-semibold text-gray-800 mb-2">Person</h3>
              <div class="space-y-1">
                <p id="lead-salutation">
                  <span class="text-gray-500">Salutation:</span> Ms
                </p>
                <p id="lead-first-name">
                  <span class="text-gray-500">First Name:</span> Zhao
                </p>
                <p id="lead-last-name">
                  <span class="text-gray-500">Last Name:</span> Lusi
                </p>
                <p id="lead-gender">
                  <span class="text-gray-500">Gender:</span> Female
                </p>
                <p id="lead-email">
                  <span class="text-gray-500">Email:</span> zhaolusi@gmail.com
                </p>
                <p id="lead-phone">
                  <span class="text-gray-500">Phone:</span> 67890-345678
                </p>
              </div>
            </div>
            <div id="company-details">
              <h3 class="font-semibold text-gray-800 mb-2">Company</h3>
              <div class="space-y-1">
                <p id="lead-organization">
                  <span class="text-gray-500">Organization:</span> Jinda
                </p>
                <p>
                  <span class="text-gray-500">Job Title:</span> Add Job Title...
                </p>
                <p id="lead-website">
                  <span class="text-gray-500">Website:</span>
                  <a
                    href="https://weblusi.com"
                    class="text-indigo-600 hover:underline"
                    >weblusi.com</a
                  >
                </p>
                <p id="lead-industry">
                  <span class="text-gray-500">Industry:</span> Service
                </p>

                <p id="lead-arr">
                  <span class="text-gray-500">Annual Revenue:</span> ....
                </p>
                <p>
                  <span class="text-gray-500">Lead Owner:</span> Administrator
                </p>
              </div>
            </div>
          </div>
        </section>
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
    noOfEmployees,
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
