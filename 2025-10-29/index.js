let dataLeads = [
  {
    id: 1,
    code: "lead123",
    name: "Jeruk",
    country: "Indonesia",
    phone: "62-8888888",
    amount: 1000,
  },
  {
    id: 2,
    code: "lead456",
    name: "Apel",
    country: "Indonesia",
    phone: null,
    amount: 2500,
  },
  {
    id: 3,
    code: "lead789",
    name: "Mangga",
    country: null,
    phone: "62-8888888",
    amount: 13000,
  },
];

function showLead(lead) {
  console.log(`
	id: ${lead.id}
	code: ${lead.code}
	name: ${lead.name}
	country: ${lead.country ?? "N/A"}
	phone: ${lead.phone ?? "N/A"}
  amount: ${numberFormatInCNY(lead.amount)}
`);
}

function showAllLeads(leads) {
  leads.forEach((lead) => showLead(lead));
}

function showAllLeadsByStatus(leads, status) {
  const filteredLeads = leads.filter((lead) => lead.status === status);
  showAllLeads(filteredLeads);
}

function showAllLeadsByCountry(leads, country) {
  const filteredCountry = leads.filter((lead) => lead.country === country);
  showAllLeads(filteredCountry);
}

function formatNumberInUSD(number) {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

  return formattedNumber;
}

function searchLeads(leads, query) {
  const q = query.toLowerCase();

  const searchedLeads = leads.filter((lead) => {
    if (lead.name.toLowerCase().includes(q)) return showLead;
    if (lead.email.toLowerCase().includes(q)) return showLead;
    if (lead.country.toLowerCase().includes(q)) return showLead;
    else return null;
  });

  return searchedLeads;
}

searchLeads(dataLeads, "apel");
