function getAmountARR(annualRevenueInUSD) {
  const amountARR =
    annualRevenueInUSD != null
      ? formatNumberInUSD(annualRevenueInUSD.toString())
      : "N/A";

  return amountARR;
}
