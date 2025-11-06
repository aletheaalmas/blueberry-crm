let dataContacts = [
  {
    id: 184,
    code: "CRM-CONTACT-2025-001",
    name: "Bitna",
    email: "bitna@email.com",
    country: "Indonesia",
    organization: "Mixue",
    status: "New",
    salary: null,
  },
  {
    id: 839,
    code: "CRM-CONTACT-2025-002",
    name: "Kijong",
    email: "kijong@email.com",
    country: "Korea",
    organization: null,
    status: "Qualified",
    salary: 10000,
  },
  {
    id: 840,
    code: "CRM-CONTACT-2025-003",
    name: "Ali",
    email: "ali@email.com",
    country: "Qatar",
    organization: "Bytedance",
    status: "Contacted",
    salary: 12000,
  },
  {
    id: 103,
    code: "CRM-CONTACT-2025-004",
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
    Status: ${contact.status}
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
    if (contact.name !== null) {
      if (contact.name.toLowerCase().includes(q)) {
        return contact;
      }
    }
  });

  return searchedContacts;
}

function generateId(items) {
  const newId = items[items.length - 1].id + 1;

  return newId;
}

function generateCode(items) {
  const lastCode = items[items.length - 1].code;

  const lastCodeAsArray = lastCode.split("-");
  lastCodeAsArray[2] = new Date().getFullYear().toString();

  const newCodePadded = (parseInt(lastCodeAsArray[3]) + 1)
    .toString()
    .padStart(3, "0");

  lastCodeAsArray[3] = newCodePadded;
  const newCode = lastCodeAsArray.join("-");
  return newCode;
}

function addContact(id, name, email, country, organization) {
  const id = generateId;

  const newContact = {
    name: name,
    email: email,
    country: country,
    organization: organization,
  };

  console.log(newContact);
}

// showContact(dataContacts[1]);
// showAllContacts(dataContacts);
// showContactsByStatus(dataContacts, "New");
// searchContact(dataContacts, "sarah");
// const testCode = generateCode(dataContacts);
// console.log(testCode);
addContact("Ale", "ale@email.com", "China", "IRT")