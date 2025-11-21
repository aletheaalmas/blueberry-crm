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
    <section class="flex-1 bg-white rounded-2xl shadow-sm border p-6">
      <div
        class="flex flex-col sm:flex-row items-center sm:justify-between mb-6 gap-4"
      >
        <div>
          <h1 class="text-xl font-semibold text-gray-800">
            Leads /
            <span id="lead-name" class="text-indigo-600"
              >${lead.salutation} ${fullName}</span
            >
          </h1>
          <span id="lead-code" class="block text-xs text-gray-400 mt-1 mb-6">
            ${lead.code}
          </span>
        </div>
        <div class="flex gap-2">
          <span
            id="lead-owner"
            class="bg-indigo-200 text-white inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium mt-2 sm:mt-0"
            ><div class="w-6 h-6 rounded-full bg-indigo-200">
              <img
                class="size-6 rounded-full"
                src="https://api.dicebear.com/9.x/lorelei/svg?seed=${
                  lead.assignedTo
                }&radius=50&size=32&backgroundColor=b6e3f4,ffd5dc,c0aede,d1d4f9,ffdfbf"
                alt="${lead.assigned}"
              />
            </div>
            <select class="bg-indigo-200 text-gray-500">
              <option selected>${lead.assignedTo ?? "Administrator"}</option>
              <option value="Administrator">Administrator</option>
              <option value="User 1">User 1</option>
              <option value="User 2">User 2</option>
            </select>
          </span>
          <span
            id="lead-status"
            class="${statusColor} text-white inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium mt-2 sm:mt-0"
          >
            <select class="${statusColor} text-gray-500">
              <option selected>${lead.status}</option>
              <option value="New" class="bg-stone-200 ">New</option>
              <option value="Contacted" class="bg-yellow-200">Contacted</option>
             <option value="Qualified" class="bg-indigo-200">Qualified</option>
              <option value="Nurtured" class="bg-green-200">Nurtured</option>
              
              <option value="Junk" class="bg-red-200">Junk</option>
            </select>
          </span>
        </div>
      </div>
      <div id="left-content-data" class="space-y-8">
        <section id="person-detail">
          <div
            id="left-content-person-header"
            class="flex items-center justify-between mb-4"
          >
            <h2 class="text-lg font-medium text-gray-700">Person</h2>
          </div>

          <div
            id="left-content-person-form"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div id="left-salutation">
              <label class="block text-sm text-gray-500 mb-1">Salutation</label>

              <select
                class="w-full border rounded-lg px-3 py-2 bg-gray-50 appearance-none text-gray-500"
              >
                <option selected>${lead.salutation}</option>
                <option value="Mr">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Dr.">Dr.</option>
              </select>
            </div>
            <div id="left-first-name">
              <label class="block text-sm text-gray-500 mb-1"
                >First Name<span class="text-red-500">*</span></label
              >
              <input
                type="text"
                placeholder="${lead.firstName ?? ""}"
                class="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="${lead.lastName ?? ""}"
                class="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="text"
                placeholder="${lead.gender ?? ""}"
                class="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                placeholder="${lead.email ?? ""}"
                class="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Phone</label>
              <input
                type="text"
                placeholder="${lead.phone ?? ""}"
                class="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
          </div>
        </section>

        <section id="organization-details">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-medium text-gray-700">Details</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm text-gray-500 mb-1"
                >Organization</label
              >
              <input
                type="text"
                placeholder="${lead.organization ?? ""}"
                class="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Job Title</label>
              <input
                type="text"
                placeholder="${lead.jobTitle ?? ""}"
                class="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Website</label>
              <input
                type="text"
                placeholder="${lead.websiteUrl ?? ""}"
                class="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Industry</label>

              <select
                class="w-full border rounded-lg px-3 py-2 bg-gray-50 appearance-none text-gray-500"
              >
                <option selected>${lead.industry}</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Service">Service</option>
                <option value="Retail">Retail</option>
                <option value="Manufacture">Manufacture</option>
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1"
                >Annual Revenue</label
              >
              <input
                type="text"
                placeholder="${amountARR ?? ""}"
                class="w-full border rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1"
                >No. of Employeesy</label
              >

              <select
                class="w-full border rounded-lg px-3 py-2 bg-gray-50 appearance-none text-gray-500"
              >
                <option selected>${lead.employeesCountRange}</option>

                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="501-1000">501-1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>
          </div>
        </section>
      </div>
      <div id="submit-button" class="flex mt-6">
              <button
                type="submit"
                class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Edit Lead
              </button>
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
    employeesCountRange: formData.get("employees"),
    status: formData.get("status"),
    assignedTo: formData.get("lead-owner"),
  };

  createLead(dataLeads, newLeadData);
});

const editLeadFormElement = document.getElementById("edit-form");
console.log(editLeadFormElement);
