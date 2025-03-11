const startButton = document.getElementById("startButton");
const timeInput = document.getElementById("timeInput");
const notificationElement = document.getElementById("countdownDisplay");

let timerId;

function stopTimer() {
  clearInterval(timerId);
  timeInput.classList.remove("disabel");
  startButton.textContent = "Start";
}

startButton.addEventListener("click", function () {
  if (this.textContent === "Stop") {
    stopTimer();
    notificationElement.textContent = "";
  }

  const userSeconds = timeInput.value.toString().trim();
  if (!userSeconds) {
    return;
  }

  clearInterval(timerId);
  startTimer(userSeconds);
  timeInput.value = "";
});

timeInput.focus(function () {
  const regex = /^\d+$/;
  if (!regex.test($(this).value)) {
    $(this).value = "";
  }
});

timeInput.addEventListener("input", function () {
  const value = Number(this.value.trim());
  if (value < 0) {
    this.value = "";
  }
});

function startTimer(seconds) {
  notificationElement.innerHTML = "";
  let count = Number(seconds);
  timeInput.classList.add("disabel");
  startButton.textContent = "Stop";
  notificationElement.textContent = `Time remaining ${count
    .toString()
    .padStart(2, "0")} seconds`;

  timerId = setInterval(function () {
    count -= 1;
    notificationElement.textContent = `Time remaining ${count
      .toString()
      .padStart(2, "0")} seconds`;

    if (Number(count) <= 0) {
      clearInterval(timerId);
      notificationElement.textContent = "Time up ⏰";
      notificationElement.classList.toggle("text-green-500");
      stopTimer();
    }
  }, 1000);
}
