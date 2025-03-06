const btnSubmit = document.getElementById("btnSubmit");
const ageElement = document.getElementById("age");
const heightElement = document.getElementById("height");
const weightElement = document.getElementById("weight");
const genderElement = document.getElementById("gender");
const resultElement = document.getElementById("result");

btnSubmit.addEventListener("click", function () {
  const weight = Number(weightElement.value);
  const height = Number(heightElement.value);
  const age = Number(ageElement.value);

  if (!age) {
    resultElement.classList.add("text-red-500");
    resultElement.textContent = `Please Enter Age`;
    return;
  }

  if (!weight) {
    resultElement.classList.add("text-red-500");
    resultElement.textContent = `Please Enter Weight`;
    return;
  }

  if (!height) {
    resultElement.classList.add("text-red-500");
    resultElement.textContent = `Please Enter Height`;
    return;
  }

  if (genderElement.value === "select") {
    resultElement.classList.add("text-red-500");
    resultElement.textContent = `Please Select Gender`;
    return;
  }
  const heightInMeter = height / 100;
  const bmi = weight / (heightInMeter * heightInMeter);

  console.log(bmi);
  resultElement.textContent = `Your BMI is ${bmi.toFixed(2)}`;
});
