function renderLead(lead) {
  const fullName = getFullName(lead);
  const statusColor = getStatusColor(lead.status);

  return `<tr class="border-b border-gray-200 hover:bg-gray-50">
    <td class="flex content-between gap-2 px-3 py-3 text-gray-500">
      <a
        href="lead/?id=${lead.id}"
      >
        <img
          src="/assets/icons/eye.svg"
          alt="View"
          width="15"
          height="15"
        />
      </a>
      <a href="edit/?id=${lead.id}">
        <img src="/assets/icons/edit.svg" alt="View" width="15" height="15" />
      </a>
      <button onclick="deleteLead(dataLeads, ${lead.id})">
        <img src="/assets/icons/bin.svg" alt="View" width="15" height="15" />
      </button>
      
    </td>
    <td class="whitespace-nowrap px-6 py-3 font-medium">
      <div class="flex items-center gap-2">
        <img
          class="size-6 rounded-full"
          src="https://api.dicebear.com/9.x/initials/svg?seed=${fullName}&radius=50&size=32&backgroundColor=b6e3f4,ffd5dc,c0aede,d1d4f9,ffdfbf"
          alt="${fullName}"
        />
        <span> ${lead.salutation ?? ""} ${fullName} </span>
      </div>
    </td>
    <td class="whitespace-nowrap px-6 py-3">${lead.organization ?? "N/A"}</td>
    <td class="whitespace-nowrap px-6 py-3">${lead.jobTitle ?? "N/A"}</td>
    <td class="px-6 py-3">
      <span class="flex items-center text-gray-600">
        <span class="w-2 h-2 rounded-full mr-2 ${statusColor}"></span>
        <span>${lead.status}</span>
      </span>
    </td>
    <td class="px-6 py-3">${lead.email ?? "N/A"}</td>
    <td class="px-6 py-3 whitespace-nowrap ">${lead.phone ?? "N/A"}</td>
    <td class="px-6 py-3 flex items-center space-x-2">
      <div class="w-6 h-6 rounded-full bg-gray-300">
      <img
          class="size-6 rounded-full"
          src="https://api.dicebear.com/9.x/lorelei/svg?seed=${
            lead.assignedTo
          }&radius=50&size=32&backgroundColor=b6e3f4,ffd5dc,c0aede,d1d4f9,ffdfbf"
          alt="${lead.assigned}"
        /></div>
      <span>${lead.assignedTo ?? "Administrator"}</span>
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

function deleteLead(leads, id) {
  const updatedLeads = leads.filter((lead) => lead.id !== id);

  dataLeads = updatedLeads;
  saveToStorage(dataLeads);
  renderAllLeads(dataLeads);
}

function deleteLeads(leads, ids) {
  const updatedLeads = leads.filter((lead) => ids.includes(lead.id));
  dataLeads = updatedLeads;
  saveToStorage(dataLeads);
}

// ------------------------------------------------------

renderAllLeads(dataLeads);
