/**
 * Write your challenge solution here
 */

const digitalClockElement = document.querySelector(".digital-clock");
const dateElement = document.querySelector(".date");
const clock = document.querySelector(".clock");
const secondElement = document.querySelector(".second");
const minuteElement = document.querySelector(".minute");
const hourElement = document.querySelector(".hour");

console.log(minuteElement);

for (let i = 1; i <= 12; i++) {
  const number = document.createElement("div");
  number.className = "number";
  number.style.setProperty("--rotation", `${i * 30}deg`);
  number.innerHTML = `<span>${i}</span>`;
  clock.appendChild(number);
}

function updateClock() {
  setInterval(function () {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minuts = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");

    const options = {
      month: "long",
      weekday: "long",
      day: "2-digit",
      year: "numeric",
    };
    const todayDate = currentTime.toLocaleDateString("en-US", options);

    const secondsDeg = (currentTime.getSeconds() / 60) * 360;
    const minutesDeg =
      ((currentTime.getMinutes() + currentTime.getSeconds() / 60) / 60) * 360;
    const hoursDeg =
      (((currentTime.getHours() % 12) + currentTime.getMinutes() / 60) / 12) *
      360;

    // console.log(secondsDeg);
    // console.log(minutesDeg);
    // console.log(hoursDeg);

    secondElement.style.transform = `translateX(-50%) rotate(${secondsDeg}deg)`;
    minuteElement.style.transform = `translateX(-50%) rotate(${minutesDeg}deg)`;
    hourElement.style.transform = `translateX(-50%) rotate(${hoursDeg}deg)`;

    digitalClockElement.textContent = `${hours}:${minuts}:${seconds}`;
    dateElement.textContent = todayDate;
  }, 1000);
}

updateClock();
