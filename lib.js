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

function getAmountARR(annualRevenueInUSD) {
  const amountARR =
    annualRevenueInUSD != null
      ? formatNumberInUSD(annualRevenueInUSD.toString())
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
