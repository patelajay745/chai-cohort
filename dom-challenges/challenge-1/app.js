/**
 * Write your challenge solution here
 */

function ToggelText() {
  if (document.getElementById("toggleButton").innerText === "Turn On") {
    document.getElementById("toggleButton").innerText = "Turn Off";
    document.getElementById("status").textContent = "Status: On";
  } else {
    document.getElementById("toggleButton").innerText = "Turn On";
    document.getElementById("status").textContent = "Status: Off";
  }
}

document.getElementById("toggleButton").addEventListener("click", () => {
  console.log("clicked");
  document.getElementById("bulb").classList.toggle("off");
  ToggelText();
});
