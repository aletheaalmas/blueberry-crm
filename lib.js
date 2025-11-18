function saveToStorage(leads) {
  localStorage.setItem("leads", JSON.stringify(leads));
}

function loadFromStorage() {
  const leads = JSON.parse(localStorage.getItem("leads"));

  if (!leads || leads.length <= 0) {
    saveToStorage(initialDataLeads);
    return initialDataLeads;
  }
  return leads;
}

function getAmmountARR(annualRevenueInUSD) {
  const amountARR =
    lead.annualRevenueInUSD != null
      ? formatNumberInUSD(lead.annualRevenueInUSD.toString())
      : "N/A";
  return amountARR;
}

function formatNumberInUSD(number) {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);

  return formattedNumber;
}



function getInitial(firstName, lastName) {
  const first = firstName?.[0] ?? "";
  const last = lastName?.[0] ?? "";
  return (first + last).toUpperCasse() || "N/A";
}

function getFullName(lead) {
  return `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim();
}

function getStatusColor(status) {
  switch (status) {
    case "New":
      return "bg-stone-600";
      break;
    case "Contacted":
      return "bg-yellow-600";
      break;
    case "Qualified":
      return "bg-indigo-600";
      break;
    case "Nurtured":
      return "bg-green-600";
      break;
    case "Junk":
      return "bg-red-600";
      break;
    default:
      return "";
      break;
  }
}
