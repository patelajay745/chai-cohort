const startButton = document.getElementById("startButton");
const timeInput = document.getElementById("timeInput");
const notificationElement = document.getElementById("countdownDisplay");
const pauseButton = document.getElementById("pauseButton");
const stopButton = document.getElementById("stopButton");
const timerDiv = document.getElementById("timerDiv");

let timerId;
let count;

function pause(id) {
  clearInterval(id);
}

function resume() {
  startTimer(count);
}

function stopTimer() {
  clearInterval(timerId);
  stopButton.classList.add("disable");
  pauseButton.classList.add("disable");
  stopButton.textContent = "Clear";
}

pauseButton.addEventListener("click", () => {
  if (!count) {
    return;
  }

  if (pauseButton.textContent.trim() === "Pause") {
    pauseButton.textContent = "Resume";
    pause(timerId);
  } else {
    pauseButton.textContent = "Pause";
    resume();
  }
});

stopButton.addEventListener("click", function () {
  stopTimer();
  toggleTimerDiv();
});

startButton.addEventListener("click", function () {
  const userSeconds = timeInput.value.toString().trim();
  if (!userSeconds) {
    return;
  }

  clearInterval(timerId);
  startTimer(userSeconds);
  timeInput.value = "";

  toggleTimerDiv("Show");
});

function toggleTimerDiv(type = "Hide") {
  if (type === "Show") {
    timerDiv.classList.remove("hidden");
  } else {
    timerDiv.classList.add("hidden");
  }
}

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
  count = Number(seconds);
  timeInput.classList.add("disabel");
  stopButton.textContent = "Stop";
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

  return timerId;
}
