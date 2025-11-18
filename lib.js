function getAmmountARR(annualRevenueInUSD) {
  const amountARR =
    lead.annualRevenueInUSD != null
      ? formatNumberInUSD(lead.annualRevenueInUSD.toString())
      : "N/A";
  return amountARR;
}
