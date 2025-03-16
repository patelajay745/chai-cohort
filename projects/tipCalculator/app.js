const calculateElement = document.getElementById("calculate");
const percentageElement = document.getElementById("percentage");
const peopleElement = document.getElementById("people");
const totalTipElement = document.getElementById("totalTip");
const tipPerPersonElement = document.getElementById("tipPerPerson");
const amountElement = document.getElementById("amount");

calculateElement.addEventListener("click", function () {
  const amount = parseFloat(amountElement.value.trim());
  const percentage = parseFloat(percentageElement.value.trim());
  const people = parseInt(peopleElement.value.trim());

  if (!amount || isNaN(amount)) return;

  const totalTip = amount * (percentage / 100);

  console.log(totalTip);

  totalTipElement.textContent = `Total Tip: $${totalTip.toFixed(2)}`;
  tipPerPersonElement.textContent = `Tip per person: $${(
    totalTip / people
  ).toFixed(2)}`;
});
