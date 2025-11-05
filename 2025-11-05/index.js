let dataContacts = [
  {
    id: 184,
    name: "Bitna",
    email: "bitna@email.com",
    country: "Indonesia",
    organization: "Mixue",
    status: "New",
    salary: null,
  },
  {
    id: 839,
    name: "Kijong",
    email: "kijong@email.com",
    country: "Korea",
    organization: null,
    status: "Qualified",
    salary: 10000,
  },
  {
    id: 840,
    name: "Ali",
    email: "ali@email.com",
    country: "Qatar",
    organization: "Bytedance",
    status: "Contacted",
    salary: 12000,
  },
  {
    id: 103,
    name: "Sarah",
    email: null,
    country: "Indonesia",
    organization: "BYD",
    status: "New",
    salary: 15000,
  },
];

function showContact(contact) {
  console.log(`
    Id: ${contact.id}
    Name: ${contact.name}
    Email: ${contact.email ?? "N/A"}
    Contry: ${contact.country ?? "N/A"}
    Organization: ${contact.organization ?? "N/A"}
    Salary:  ${formatNumberInCNY(contact.salary) ?? "N/A"}
    `);
}

function showAllContacts(contacts) {
  contacts.forEach((contact) => {
    showContact(contact);
  });
}

function showContactsByStatus(contacts, status) {
  const filteredContacts = contacts.filter(
    (contact) => contact.status === status
  );
  showAllContacts(filteredContacts);
}

function formatNumberInCNY(number) {
  const formattedNumber = new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
  }).format(number);

  return formattedNumber;
}

function searchContact(contacts, query) {
  const q = query.toLowerCase();

  const searchedContacts = contacts.filter((contact) => {
    if (contact.name && contact.name.toLowerCase().includes(q)) {
      return contact;
    }
    if (contact.email && contact.email.toLowerCase().includes(q)) {
      return contact;
    }
    if (contact.country && contact.country.toLowerCase().includes(q)) {
      return contact;
    }
    if (
      contact.organization &&
      contact.organization.toLowerCase().includes(q)
    ) {
      return contact;
    }
  });

  return searchedContacts;
}

// showContact(dataContacts[1]);
// showAllContacts(dataContacts);
// showContactsByStatus(dataContacts, "New");

