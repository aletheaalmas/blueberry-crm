function getAmmountARR(annualRevenueInUSD) {
  const amountARR =
    lead.annualRevenueInUSD != null
      ? formatNumberInUSD(lead.annualRevenueInUSD.toString())
      : "N/A";
  return amountARR;
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
