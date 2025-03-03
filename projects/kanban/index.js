const btnAddTodoElement = document.getElementById("btnAddTodo");
const modalElement = document.getElementById("modal");
const modalContainer = document.getElementById("modalContainer");
const btnAddDoingElement = document.getElementById("btnAddDoing");
const btnAddDoneElement = document.getElementById("btnAddDone");
const btnCloseElement = document.getElementById("btnClose");

// openCloseModal
function openCloseModal() {
  modalElement.classList.toggle("hidden");
}

function attachDraggClass(target) {
  target.addEventListener("dragstart", () => {
    // console.log("added to", target);
    target.classList.add("flying");
  });
  target.addEventListener("dragend", () => {
    target.classList.remove("flying");
  });
}

btnAddTodoElement.addEventListener("click", openCloseModal);
btnAddDoingElement.addEventListener("click", openCloseModal);
btnAddDoneElement.addEventListener("click", openCloseModal);
btnCloseElement.addEventListener("click", openCloseModal);

modalContainer.addEventListener("click", (event) => {
  event.stopPropagation();
});
modalElement.addEventListener("click", openCloseModal);

// Adding draggable to all predifined items
const allItemsElement = document.getElementsByClassName("item");

for (let item of allItemsElement) {
  //   console.log(item);
  item.setAttribute("draggable", true);
}

// add flying class to dragging element
[].forEach.call(allItemsElement, attachDraggClass);

// detect hover on effect
const allItemContainersElement = document.querySelectorAll(".itemContainer");
// console.log(allItemContainersElement);
allItemContainersElement.forEach(function (itemContainer) {
  itemContainer.addEventListener("dragover", function (event) {
    event.preventDefault(); // Allow dropping
  });
  itemContainer.addEventListener("drop", function () {
    const flayingElement = document.querySelector(".flying");
    // console.log(flayingElement);
    // console.log(itemContainer);
    itemContainer.appendChild(flayingElement);
  });
});
