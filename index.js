function renderLead(lead) {
  const fullName = getFullName(lead);
  const statusColor = getStatusColor(lead.status);

  return `<tr class="border-b border-gray-200 hover:bg-gray-50">
    <td class="whitespace-nowrap px-5 py-2 font-medium">
      <div class="flex items-center gap-2">
        <img
          class="size-6 rounded-full"
          src="https://api.dicebear.com/9.x/initials/svg?seed=${fullName}&radius=50&size=32&backgroundColor=b6e3f4,ffd5dc,c0aede,d1d4f9,ffdfbf"
          alt="${fullName}"
        />
        <span> ${lead.salutation ?? ""} ${fullName} </span>
      </div>
    </td>
    <td class="whitespace-nowrap px-5 py-2">${lead.organization ?? "-"}</td>
    <td class="whitespace-nowrap px-5 py-2">${lead.jobTitle ?? "-"}</td>
    <td class="px-5 py-2">
      <span class="flex items-center text-gray-600">
        <span class="w-2 h-2 rounded-full mr-2 ${statusColor}"></span>
        <span>${lead.status}</span>
      </span>
    </td>
    <td class="px-5 py-2 whitespace-nowrap ">
      <div class="flex items-center space-x-2 gap-1"><img src="/assets/icons/phone.svg" alt="View" width="15" height="15"/>${
        lead.phone ?? "-"
      }</div>
      <div class="flex items-center space-x-2 gap-1"><img src="/assets/icons/mail.svg" alt="View" width="15" height="15"/>${
        lead.email ?? "-"
      }</div>
    </td>
    <td class="px-5 py-2 whitespace-nowrap">
  <div class="flex items-center space-x-2">
    <div class="w-6 h-6 rounded-full bg-gray-300">
      <img
        class="size-6 rounded-full"
        src="https://api.dicebear.com/9.x/lorelei/svg?seed=${
          lead.assignedTo
        }&radius=50&size=32&backgroundColor=b6e3f4,ffd5dc,c0aede,d1d4f9,ffdfbf"
        alt="${lead.assignedTo || "Administrator"}"
      />
    </div>
    <span>${lead.assignedTo ?? "Administrator"}</span>
  </div>
</td>
    <td class="px-5 py-2 whitespace-nowrap">
      <div class="flex items-center gap-2">
        <a href="lead/?id=${lead.id}" class="text-gray-500 hover:text-gray-700">
          <img src="/assets/icons/eye.svg" alt="View" width="15" height="15" />
        </a>
        <a href="edit/?id=${lead.id}" class="text-gray-500 hover:text-gray-700">
          <img src="/assets/icons/edit.svg" alt="Edit" width="15" height="15" />
        </a>
        <button
          class="cursor-pointer text-gray-500 hover:text-gray-700"
          onclick="deleteLead(dataLeads, ${lead.id})"
        >
          <img
            src="/assets/icons/bin.svg"
            alt="Delete"
            width="15"
            height="15"
          />
        </button>
      </div>
    </td>
  </tr> `;
}

function renderAllLeads(leads) {
  const leadsTableBodyElement = document.getElementById("leads-table-body");
  const filteredLeads = searchLeads(leads);
  const leadsTableRowElement = filteredLeads
    .map((lead) => renderLead(lead))
    .join("");
  leadsTableBodyElement.innerHTML = leadsTableRowElement;
}

function searchLeads(leads) {
  const searchValue = window.location.search; //'?q=keyword'
  const searchParams = new URLSearchParams(searchValue);
  const q = searchParams.get("q"); //keyword

  if (!q) return leads;

  const foundLeads = leads.filter((lead) => {
    if (
      (lead.firstName && lead.firstName.toLowerCase().includes(q)) ||
      (lead.lastName && lead.lastName.toLowerCase().includes(q)) ||
      (lead.email && lead.email.toLowerCase().includes(q)) ||
      (lead.organization && lead.organization.toLowerCase().includes(q))
    ) {
      return lead;
    }
  });

  return foundLeads;
}

// ------------------------------------------------------

renderAllLeads(dataLeads);
