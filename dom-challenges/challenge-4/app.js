/**
 * Write your challenge solution here
 */

// taskInput
const taskInputElement = document.getElementById("taskInput");
// addButton
const addButtonElement = document.getElementById("addButton");
// taskList
const taskListElement = document.getElementById("taskList");
// empty-list
const emptyListElement = document.getElementsByClassName("empty-list")[0];
// totalTasks
const totalTasksElement = document.getElementById("totalTasks");
// completedTasks
const completedTasksElement = document.getElementById("completedTasks");

let totalTask = 0;
let completedTask = 0;

function addTask(text) {
  const newLi = document.createElement("li");
  newLi.className = "task-item";

  //checkbox
  const checkboxElement = document.createElement("input");
  checkboxElement.type = "checkbox";
  checkboxElement.addEventListener("change", () => {
    if (checkboxElement.checked) {
      updateCompletedCount("increment");
      newLi.classList.add("completed");
    } else {
      updateCompletedCount("decrement");
      newLi.classList.remove("completed");
    }
  });

  // div
  const divElement = document.createElement("div");
  divElement.classList = "task-text";
  divElement.textContent = text;
  // button
  const buttonElement = document.createElement("button");
  buttonElement.classList = "delete-button";
  buttonElement.textContent = "Delete";
  buttonElement.addEventListener("click", () => {
    taskListElement.removeChild(newLi);
    updateTaskCount("decrement");
    if (checkboxElement.checked) updateCompletedCount("decrement");
  });

  //adding child to li
  newLi.appendChild(checkboxElement);
  newLi.appendChild(divElement);
  newLi.appendChild(buttonElement);

  taskListElement.appendChild(newLi);
}

function updateTaskCount(operation) {
  operation === "increment" ? totalTask++ : totalTask--;

  totalTask
    ? emptyListElement.remove()
    : taskListElement.appendChild(emptyListElement);

  totalTasksElement.textContent = `Total tasks: ${totalTask}`;
}

function updateCompletedCount(operation) {
  operation === "increment" ? completedTask++ : completedTask--;
  completedTasksElement.textContent = `Completed: ${completedTask}`;
}

addButtonElement.addEventListener("click", () => {
  const inputText = taskInputElement.value;
  if (inputText) {
    addTask(inputText);
    updateTaskCount("increment");
    taskInputElement.value = "";
  }
});
