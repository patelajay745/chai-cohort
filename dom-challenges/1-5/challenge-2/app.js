/**
 * Write your challenge solution here
 */

function ChangeColorTo(color) {
  document.getElementById("mainHeading").style.color = color;
}

document
  .getElementById("redButton")
  .addEventListener("click", () => ChangeColorTo("red"));

document
  .getElementById("greenButton")
  .addEventListener("click", () => ChangeColorTo("green"));

document
  .getElementById("blueButton")
  .addEventListener("click", () => ChangeColorTo("blue"));

document
  .getElementById("purpleButton")
  .addEventListener("click", () => ChangeColorTo("purple"));

document
  .getElementById("resetButton")
  .addEventListener("click", () => ChangeColorTo("black"));
