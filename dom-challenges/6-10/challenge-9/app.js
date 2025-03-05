/**
 * Write your challenge solution here
 */

const toogleBtn = document.querySelector(".toggle-btn");
const panel = document.querySelector(".panel");
const content = document.querySelector(".content");
const menuItems = document.querySelectorAll(".menu-item");
const closeBtnElement = document.querySelector(".close-btn");

toogleBtn.addEventListener("click", function (event) {
  !panel.classList.contains("active") ? panel.classList.add("active") : null;

  event.stopPropagation();
});

content.addEventListener("click", function () {
  panel.classList.remove("active");
});

menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    alert(item.textContent);
  });
});

closeBtnElement.addEventListener("click", function () {
  panel.classList.remove("active");
});
