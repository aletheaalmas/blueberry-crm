const assignees = ["Administrator", "User 1", "User 2"];
const statuses = ["New", "Contacted", "Qualified", "Nurtured", "Junk"];
const salutations = ["Mr", "Ms", "Mrs.", "Dr"];
const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Service",
  "Retail",
  "Manufacture",
];
const employeeRanges = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];
const genders = ["", "Male", "Female"];

function renderLeadDetails(leads) {
  const leadDetailsElement = document.getElementById("lead-details");
  const editFormElement = document.getElementById("edit-form");

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

  editFormElement.innerHTML = `
    <section class="bg-white rounded-2xl shadow-sm p-6">
    <div>
        <a href="/"
          ><img src="/assets/icons/arrow-left.svg" alt="View" width="20" height="15"
        /></a>
      </div>
      <div class="flex flex-col lg:flex-row lg:items-start justify-between mb-6 gap-4">
        <div>
          <h1 class="text-xl font-semibold text-gray-800 whitespace-nowrap">
            <a href="/">Leads /</a>
            <span id="lead-name" class="text-indigo-600 ">
              ${lead.salutation} ${fullName}
            </span>
          </h1>
          <span id="lead-code" class="block text-xs text-gray-400 mt-1 4">
            ${lead.code}
          </span>
        </div>
        <div class="flex gap-2">
          <span class="bg-indigo-200 text-white inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium">
            <div class="w-6 h-6 rounded-full bg-indigo-200">
              <img
                class="size-6 rounded-full"
                src="https://api.dicebear.com/9.x/lorelei/svg?seed=${
                  lead.assignedTo ?? "Administrator"
                }&radius=50&size=32&backgroundColor=b6e3f4,ffd5dc,c0aede,d1d4f9,ffdfbf"
                alt="${lead.assignedTo ?? "Administrator"}"
              />
            </div>
            <select name="assigned-to" class="bg-indigo-200 text-gray-500 border-none focus:outline-none">
              ${assignees
                .map((assignee) => {
                  return `<option value="${assignee}" ${
                    assignee === (lead.assignedTo ?? "Administrator")
                      ? "selected"
                      : ""
                  }>
                  ${assignee}
                </option>`;
                })
                .join("")}
            </select>
          </span>
          <span class="${statusColor} text-white inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium">
            <select name="status" class="${statusColor} text-gray-500 border-none focus:outline-none">
              ${statuses
                .map((status) => {
                  return `<option value="${status}" ${
                    status === lead.status ? "selected" : ""
                  }>
                  ${status}
                </option>`;
                })
                .join("")}
            </select>
          </span>
        </div>
      </div>
      
      <div id="left-content-data" class="space-y-8">
        <section id="person-detail">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-medium text-gray-700">Person</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm text-gray-500 mb-1">Salutation</label>
              <select name="salutation" class="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                ${salutations
                  .map(
                    (sal) =>
                      `<option value="${sal}" ${
                        sal === lead.salutation ? "selected" : ""
                      }>${sal}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">
                First Name<span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="first-name"
                value="${lead.firstName ?? ""}"
                class="whitespace-nowrap w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
                required
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Last Name</label>
              <input
                type="text"
                name="last-name"
                value="${lead.lastName ?? ""}"
                class="whitespace-nowrap w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Gender</label>
              <select name="gender" class="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                ${genders
                  .map(
                    (gender) =>
                      `<option value="${gender}" ${
                        lead.gender === gender ? "selected" : ""
                      }>${gender}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value="${lead.email ?? ""}"
                class="whitespace-nowrap w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value="${lead.phone ?? ""}"
                class="whitespace-nowrap w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
          </div>
          <div
                id="no-phone-no-email-notification"
                class="text-red-500"
              ></div>
       
        </section>

        <section id="organization-details">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-medium text-gray-700">Details</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm text-gray-500 mb-1">Organization</label>
              <input
                type="text"
                name="organization"
                value="${lead.organization ?? ""}"
                class="whitespace-nowrap w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Job Title</label>
              <input
                type="text"
                name="job-title"
                value="${lead.jobTitle ?? ""}"
                class="whitespace-nowrap w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Website</label>
              <input
                type="text"
                name="website-url"
                value="${lead.websiteUrl ?? ""}"
                class="whitespace-nowrap w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Industry</label>
              <select name="industry" class="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                <option value="">Select Industry</option>
                ${industries
                  .map(
                    (ind) =>
                      `<option value="${ind}" ${
                        ind === lead.industry ? "selected" : ""
                      }>${ind}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">Annual Revenue</label>
              <input
                type="text"
                name="arr"
                value="${lead.annualRevenueInUSD ?? ""}"
                class="whitespace-nowrap w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-500 mb-1">No. of Employees</label>
              <select name="employees-count-range" class="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                ${employeeRanges
                  .map(
                    (range) =>
                      `<option value="${range}" ${
                        lead.employeesCountRange === range ? "selected" : ""
                      }>${range}</option>`
                  )
                  .join("")}
              </select>
            </div>
          </div>
           
      </div>
      
      <div class="flex mt-6 gap-2">
        <button
          type="submit"
          class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </section>
  `;

  setupFormEventListener();
}

function setupFormEventListener() {
  const editFormElement = document.getElementById("edit-form");

  if (editFormElement) {
    editFormElement.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(editFormElement);

      const noPhoneNoEmailNotificationElement = document.getElementById(
        "no-phone-no-email-notification"
      );

      const email = formData.get("email")?.trim();
      const phone = formData.get("phone")?.trim();
      if (!email && !phone) {
        noPhoneNoEmailNotificationElement.innerHTML = `<p class="text-red-500">Must input phone or email</p>`;
        return;
      }

      const leadId = getLeadId();

      const updatedLeadData = {
        salutation: formData.get("salutation"),
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        gender: formData.get("gender"),
        organization: formData.get("organization"),
        jobTitle: formData.get("job-title"),
        websiteUrl: formData.get("website-url"),
        industry: formData.get("industry"),
        annualRevenueInUSD: formData.get("arr"),
        employeesCountRange: formData.get("employees-count-range"),
        status: formData.get("status"),
        assignedTo: formData.get("assigned-to"),
      };

      updateLead(dataLeads, leadId, updatedLeadData);
      window.location.href = "/";
    });
  }
}

function updateLead(leads, id, leadBody) {
  const updatedLeads = leads.map((lead) => {
    if (lead.id !== id) return lead;

    return {
      ...lead,
      status: leadBody.status ?? lead.status,
      salutation: leadBody.salutation ?? lead.salutation,
      firstName: leadBody.firstName ?? lead.firstName,
      lastName: leadBody.lastName ?? lead.lastName,
      email: leadBody.email ?? lead.email,
      phone: leadBody.phone ?? lead.phone,
      gender: leadBody.gender ?? lead.gender,
      organization: leadBody.organization ?? lead.organization,
      jobTitle: leadBody.jobTitle ?? lead.jobTitle,
      websiteUrl: fixWebsiteURL(leadBody.websiteUrl) ?? lead.websiteUrl,
      employeesCountRange:
        leadBody.employeesCountRange ?? lead.employeesCountRange,
      annualRevenueInUSD: leadBody.annualRevenueInUSD
        ? parseFloat(leadBody.annualRevenueInUSD)
        : lead.annualRevenueInUSD,
      industry: leadBody.industry ?? lead.industry,
      assignedTo: leadBody.assignedTo ?? lead.assignedTo,
    };
  });

  dataLeads = updatedLeads;
  saveToStorage(dataLeads);
}

renderLeadDetails(dataLeads);
