const initialName = dataLeads.map((lead) => {
  const firstInitial = lead.firstName[0];
  const lastInitial = lead.lastName[0];
  return (firstInitial + lastInitial).toUpperCase();
});

function renderLeadDetails(lead) {
  return html`<div
      id="lead-name-profpic"
      class="flex items-center space-x-3 mb-4"
    >
      <div
        class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium"
      >
        M
      </div>
      <div>
        <h2 id="lead-full-name" class="text-lg font-semibold text-gray-800">
          v ${lead.lastName} ${lead.firstName}
        </h2>
      </div>
    </div>
    <span id="lead-code" class="text-sm text-gray-500">${lead.code}</span>
    <span
      id="lead-status"
      class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
    >
      ${lead.status}
    </span>

    <div id="lead-details" class="space-y-6 text-sm text-gray-700">
      <div id="personal-detals">
        <h3 class="font-semibold text-gray-800 mb-2">Person</h3>
        <div class="space-y-1">
          <p id="lead-salutation">
            <span class="text-gray-500">Salutation:</span> ${lead.salutation}
          </p>
          <p id="lead-first-name">
            <span class="text-gray-500">First Name:</span> ${lead.firstName}
          </p>
          <p id="lead-last-name">
            <span class="text-gray-500">Last Name:</span> ${lead.lastName}
          </p>
          <p id="lead-gender">
            <span class="text-gray-500">Gender:</span> ${lead.gender}
          </p>
          <p id="lead-email">
            <span class="text-gray-500">Email:</span> ${lead.email ?? "N/A"}
          </p>
          <p id="lead-phone">
            <span class="text-gray-500">Phone:</span> ${lead.phone ?? "N/A"}
          </p>
        </div>
      </div>
      <div id="company-details">
        <h3 class="font-semibold text-gray-800 mb-2">Company</h3>
        <div class="space-y-1">
          <p id="lead-organization">
            <span class="text-gray-500">Organization:</span>
            ${lead.organization ?? "N/A"}
          </p>
          <p><span class="text-gray-500">Job Title:</span> Add Job Title...</p>
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
          <p><span class="text-gray-500">Lead Owner:</span> Administrator</p>
        </div>
      </div>
    </div>`;
}
