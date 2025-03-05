/**
 * Write your challenge solution here
 */

const btnToOpenClose = document.querySelectorAll(".accordion-button");
const allAccordionItem = document.querySelectorAll(".accordion-item");

console.log(btnToOpenClose);

btnToOpenClose.forEach((button) => {
  button.addEventListener("click", function () {
    // console.log(button.parentElement);
    const accordionItem = button.parentElement;

    if (accordionItem.classList.contains("active")) {
      accordionItem.classList.remove("active");
      return;
    }

    allAccordionItem.forEach((item) => {
      item.classList.remove("active");
    });

    accordionItem.classList.add("active");
  });
});
