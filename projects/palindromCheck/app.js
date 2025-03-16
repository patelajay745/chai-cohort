const submitButton = document.getElementById("submitButton");
const inputText = document.getElementById("inputText");
const resultText = document.getElementById("resultText");

submitButton.addEventListener("click", function () {
  const re = /[^a-z1-9]/g;
  const originalText = inputText.value;
  const text = inputText.value.toLocaleLowerCase().replace(re, "");
  console.log(text);
  const reversedText = text.split("").reverse().join("");
  console.log(reversedText);

  if (reversedText === text) {
    resultText.classList.add("text-green-500");
    resultText.textContent = `${originalText} is palindrom string`;
  } else {
    resultText.classList.add("text-red-500");
    resultText.textContent = `${originalText} is not palindrom string`;
  }
});
