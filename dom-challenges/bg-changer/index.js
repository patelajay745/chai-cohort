// userInput
//btnCreate
// groundForbtn

const userInputElement = document.getElementById("userInput");
const btnCreateElement = document.getElementById("btnCreate");
const groundForbtnElement = document.getElementById("groundForbtn");

btnCreateElement.addEventListener("click", () => {
  const color = userInputElement.value;
  console.log(color);
  if (!userInputElement.value) {
    console.log("Please enter hash code");
    return;
  }

  const createBtn = document.createElement("button");
  const userInput = userInputElement.value;
  createBtn.classList.add(
    "p-8",
    "px-12",
    "ml-4",
    "rounded-lg",
    "border-1",
    `bg-[#${color}]`
  );

  createBtn.classList.add(`bg-[#${userInput}]`);

  const setColor = makeColorSetter(color);

  createBtn.addEventListener("click", setColor);

  groundForbtnElement.appendChild(createBtn);

  userInputElement.value = "";
});

function makeColorSetter(color) {
  return function () {
    document.body.className = "";
    document.body.classList.add(`bg-[#${color}]`);
  };
}

// function createButton(){
//     const btnColor

//     const

//     return
// }
