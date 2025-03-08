const btnAddTodoElement = document.getElementById("btnAddTodo");
const modalElement = document.getElementById("modal");
const modalContainer = document.getElementById("modalContainer");
const btnAddDoingElement = document.getElementById("btnAddDoing");
const btnAddDoneElement = document.getElementById("btnAddDone");
const btnCloseElement = document.getElementById("btnClose");
const btnSubmitElement = document.getElementById("btnSubmit");
const btnCancel = document.getElementById("btnCancel");
const todoBoard = document.getElementById("itemContainer-todo");
const doingBoard = document.getElementById("itemContainer-doing");
const doneBoard = document.getElementById("itemContainer-done");
const btnEditElement = document.querySelectorAll(".btnEdit");
const btnDeleteElement = document.querySelectorAll(".btnDelete");
const inputDescriptionElement = document.getElementById("inputDescription");
const inputNameElement = document.getElementById("inputName");
const todoCounterElement = document.getElementById("todoCounter");
const doingCounterElement = document.getElementById("doingCounter");
const doneCounterElement = document.getElementById("doneCounter");
const mainDiv = document.getElementById("main");
const addBoardElement = document.getElementById("addboard");
const descDivOfModalElement = document.getElementById("descDivOfModal");

let selectedBoard = null;
let idToEditItem;
let idToEditBoard;

let data = loadDataFromLocalStorage();

let boards = loadBoardFromLocalStorage();

// let data = [
//   {
//     id: 1,
//     title: "Task 1",
//     description: "This is description",
//     board: "todo",
//   },
//   {
//     id: 2,
//     title: "Task 2",
//     description: "This is description",
//     board: "doing",
//   },
//   {
//     id: 3,
//     title: "Task 3",
//     description: "This is description",
//     board: "todo",
//   },
//   {
//     id: 4,
//     title: "Task 4",
//     description: "This is description",
//     board: "doing",
//   },
//   {
//     id: 5,
//     title: "Task 5",
//     description: "This is description",
//     board: "done",
//   },
//   {
//     id: 6,
//     title: "Task 6",
//     description: "This is description",
//     board: "done",
//   },
//   {
//     id: 7,
//     title: "Task 7",
//     description: "This is description",
//     board: "todo",
//   },
// ];

document.addEventListener("DOMContentLoaded", loadData);

// openCloseModal
function openCloseModal(
  board = "",
  actionType = "open",
  type = "",
  editBoardId = ""
) {
  selectedBoard = board;
  modalElement.classList.toggle("hidden");
  if (actionType === "close") {
    inputDescriptionElement.value = "";
    inputNameElement.value = "";
    idToEditItem = null;
    idToEditBoard = null;

    console.log("reached to close");
    return;
  } else {
    if (idToEditItem) {
      const modalTitle = document.getElementById("modalTitle");
      modalTitle.textContent = "Edit task";
      btnSubmit.textContent = "Save";
      descDivOfModalElement.classList.remove("hidden");
      descDivOfModalElement.classList.add("flex");
      loadTaskIntoModal(idToEditItem);
    } else if (editBoardId && type === "editBoard") {
      idToEditBoard = editBoardId;
      const modalTitle = document.getElementById("modalTitle");
      modalTitle.textContent = "Update Board";
      btnSubmit.textContent = "Update Board";
      descDivOfModalElement.classList.remove("flex");
      descDivOfModalElement.classList.add("hidden");
      loadBoardIntoModal(idToEditBoard);
    } else if (type === "newBoard") {
      const modalTitle = document.getElementById("modalTitle");
      modalTitle.textContent = "Add new Board";
      btnSubmit.textContent = "Create Board";
      descDivOfModalElement.classList.remove("flex");
      descDivOfModalElement.classList.add("hidden");
    } else {
      const modalTitle = document.getElementById("modalTitle");
      modalTitle.textContent = "Add task";
      btnSubmit.textContent = "Create";
      descDivOfModalElement.classList.remove("hidden");
      descDivOfModalElement.classList.add("flex");
    }
  }
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

btnCloseElement.addEventListener("click", () => openCloseModal(null, "close"));
btnCancel.addEventListener("click", () => openCloseModal(null, "close"));

modalContainer.addEventListener("click", (event) => {
  event.stopPropagation();
});
modalElement.addEventListener("click", () => openCloseModal(null, "close"));

// Adding draggable to all predifined items
const allItemsElement = document.getElementsByClassName("item");

// add flying class to dragging element
[].forEach.call(allItemsElement, attachDraggClass);

// detect hover on effect
let allItemContainersElement;

// adding new item
btnSubmitElement.addEventListener("click", () => {
  if (btnSubmitElement.textContent.trim() === "Create Board") {
    createNewBoard();
    openCloseModal(null, "close");
    return;
  }

  if (btnSubmitElement.textContent.trim() === "Update Board") {
    // console.log("clicked to edit board");

    const newName = inputNameElement.value.trim();

    updateBoard(idToEditBoard, newName);

    // idToEditBoard reset it here
    idToEditBoard = "";
    return;
  }

  idToEditItem ? updateItem() : createNewItem();
});

function updateBoard(idToEditBoard, newName) {
  boards = boards.map((board) => {
    if (board.id === Number(idToEditBoard)) {
      return {
        ...board,
        name: newName,
      };
    }

    return board;
  });

  loadData();
  saveDataToDataStorage();
  openCloseModal(null, "close");
}

function updateItem() {
  const title = inputNameElement.value;
  const description = inputDescriptionElement.value;

  data = data.map((item) => {
    if (item.id === idToEditItem) {
      return {
        ...item,
        title,
        description,
      };
    }
    return item;
  });

  idToEditItem = "";
  loadData();
  saveDataToDataStorage();
  openCloseModal(null, "close");
}

function createNewItem() {
  const title = inputNameElement.value;
  const description = inputDescriptionElement.value;
  const id = randomId(1000000, 9999999);

  data = [...data, { id, title, description, board: selectedBoard }];

  loadData();
  saveDataToDataStorage();
  updateCounter();

  openCloseModal(null, "close");
}

function getboardElement() {
  if (!selectedBoard) return;
  switch (selectedBoard) {
    case "todo":
      return todoBoard;
    case "doing":
      return doingBoard;
    case "done":
      return doneBoard;
  }
}

// Edit items
btnEditElement.forEach((editButton) => addEditButtonListner);

// delete items
btnDeleteElement.forEach((deleteButton) => addDeleteButtonListner);

function addEditButtonListner(target) {
  target.addEventListener("click", function () {
    const parentElement = target.parentElement.parentElement;
    const hiddenSpan = parentElement.querySelector("span.hidden");

    if (parentElement.dataset.boardId) {
      const boardId = parentElement.dataset.boardId
        .toString()
        .trim()
        .split("-")[1];

      if (boardId) {
        openCloseModal(null, "open", "editBoard", boardId);
        return;
      }
    }

    if (hiddenSpan) idToEditItem = Number(hiddenSpan.textContent.trim());
    openCloseModal(null, "open");
  });
}

function addDeleteButtonListner(target) {
  target.addEventListener("click", function () {
    const parentElement = target.parentElement.parentElement;
    const hiddenSpan = parentElement.querySelector("span.hidden");

    if (parentElement.dataset.boardId) {
      const boardId = parentElement.dataset.boardId
        .toString()
        .trim()
        .split("-")[1];

      if (boardId) {
        boards = boards.filter((board) => Number(board.id) !== Number(boardId));
        data = data.filter((item) => Number(item.board) !== Number(boardId));
      }

      console.log(boards);
      console.log(data);

      loadData();
      saveDataToDataStorage();
      updateCounter();

      return;
    }

    data = data.filter(
      (item) => item.id !== Number(hiddenSpan.textContent.trim())
    );

    loadData();
    saveDataToDataStorage();
    updateCounter();

    // console.log(target.parentElement.parentElement.textContent.trim());
  });
}

// creating child div element
function createButtonDiv() {
  // Create the child div
  const childDiv = document.createElement("div");
  childDiv.classList.add("absolute", "right-1", "-top-3", "flex", "gap-2");

  // Create the Edit button
  const editButton = document.createElement("button");
  editButton.classList.add(
    "text-green-900",
    "text-xs",
    "w-5",
    "h-5",
    "rounded-l",
    "btnEdit"
  );

  // Create the Edit SVG
  const editSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  editSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  editSvg.setAttribute("fill", "none");
  editSvg.setAttribute("viewBox", "0 0 24 24");
  editSvg.setAttribute("stroke-width", "1.5");
  editSvg.setAttribute("stroke", "currentColor");
  editSvg.classList.add("size-6");

  const editPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  editPath.setAttribute("stroke-linecap", "round");
  editPath.setAttribute("stroke-linejoin", "round");
  editPath.setAttribute(
    "d",
    "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
  );

  editSvg.appendChild(editPath);
  addEditButtonListner(editButton);
  editButton.appendChild(editSvg);

  // Create the Delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add(
    "text-red-900",
    "text-xs",
    "w-5",
    "h-5",
    "rounded-l",
    "btnDelete"
  );

  // Create the Delete SVG
  const deleteSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  deleteSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  deleteSvg.setAttribute("fill", "none");
  deleteSvg.setAttribute("viewBox", "0 0 24 24");
  deleteSvg.setAttribute("stroke-width", "1.5");
  deleteSvg.setAttribute("stroke", "currentColor");
  deleteSvg.classList.add("size-6");

  const deletePath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  deletePath.setAttribute("stroke-linecap", "round");
  deletePath.setAttribute("stroke-linejoin", "round");
  deletePath.setAttribute(
    "d",
    "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
  );

  deleteSvg.appendChild(deletePath);
  addDeleteButtonListner(deleteButton);
  deleteButton.appendChild(deleteSvg);

  // Append buttons to childDiv
  childDiv.appendChild(editButton);
  childDiv.appendChild(deleteButton);

  // Return the child div so it can be appended to a parent
  return childDiv;
}

function loadData() {
  mainDiv.innerHTML = "";

  boards.map((board) => {
    const boardDiv = createBoardDiv(board.name, board.id);
    mainDiv.appendChild(boardDiv);
  });

  data.map(({ id, title, description, board }) => {
    // console.log(board);
    const boardElement = document.getElementById(`itemContainer-${board}`);
    // console.log(boardElement);
    showItemCard(id, title, description, boardElement);
  });

  findAllContainer();

  updateCounter();
}

//Show item card
function showItemCard(id, title, description, parentElement) {
  const newItem = document.createElement("div");
  newItem.setAttribute("draggable", true);
  newItem.classList.add(
    "bg-[#E6E5E6]",
    "p-4",
    "rounded-lg",
    "shadow-lg",
    "border-1",
    "cursor-pointer",
    "item",
    `border-gray-50`,
    "relative",
    "flex",
    "flex-col"
  );

  const descriptionElement = document.createElement("span");
  descriptionElement.classList.add(
    "text-xs",
    "text-[#9D9EA3]",
    "item-desciption"
  );

  descriptionElement.textContent = description;

  //creting div for buttons
  const childDiv = createButtonDiv();

  newItem.appendChild(childDiv);

  const isSpan = document.createElement("span");
  isSpan.classList.add("hidden");
  //   console.log(id);
  isSpan.textContent = String(id).trim();

  const textDiv = document.createElement("div");
  textDiv.textContent = title;
  newItem.appendChild(textDiv);
  newItem.appendChild(isSpan);
  newItem.appendChild(descriptionElement);
  //   add description here

  // adding dragstart and dragEnd listner
  attachDraggClass(newItem);

  const currentBoard = parentElement;
  currentBoard.appendChild(newItem);
}

// random id genertar
function randomId(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function saveDataToDataStorage() {
  localStorage.setItem("newTasks", JSON.stringify(data));
  localStorage.setItem("boards", JSON.stringify(boards));
}

function loadDataFromLocalStorage() {
  const storedTasks = localStorage.getItem("newTasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function updateCounter() {
  boards.map((board) => {
    const boardCounter = document.getElementById(`${board.id}-Counter`);

    const count = data.filter(
      (item) => Number(board.id) === Number(item.board)
    ).length;

    boardCounter.textContent = count;
  });
}

function loadTaskIntoModal(taskId) {
  //   console.log("type of taskId", taskId);
  // console.log("type of taskId", taskId)
  const task = data.find((t) => t.id === Number(taskId));

  if (task) {
    inputNameElement.value = task.title;
    inputDescriptionElement.value = task.description;
  }
}

function loadBoardIntoModal(boardId) {
  const board = boards.find((b) => b.id === Number(boardId));

  if (board) {
    inputNameElement.value = board.name;
  }
}

//load board
function loadBoardFromLocalStorage() {
  const storedBoards = localStorage.getItem("boards");
  return storedBoards
    ? JSON.parse(storedBoards)
    : [
        { id: 1, name: "Todo" },
        { id: 2, name: "Doing" },
        { id: 3, name: "Done" },
      ];
}

//save boards to local storage
function storeBoardFromLocalStorage() {
  localStorage.setItem("boards", JSON.stringify(boards));
}

//create board
function createBoardDiv(boardName, id = null) {
  // main div
  const boardDiv = document.createElement("div");
  boardDiv.className =
    "bg-[#DCDDE0] w-96 rounded-lg flex flex-col p-4 gap-2 relative";

  //for adding editing and deleting button div
  const childDiv = createButtonDiv();

  //don't show edit and delete button to default 3 boards
  if (id > 3) boardDiv.appendChild(childDiv);

  if (!id) {
    id = randomId(1000000, 9999999);
  }
  // Add hidden ID
  const uniqueId = `board-${id}`;
  boardDiv.dataset.boardId = uniqueId;

  //header
  const headerDiv = document.createElement("div");
  headerDiv.id = "items-header";
  headerDiv.className = "font-semibold flex gap-2 items-center";

  const circleDiv = document.createElement("div");
  circleDiv.className = "rounded-full p-2 border-2 border-[#bdf3a3]";

  const titleDiv = document.createElement("div");
  titleDiv.textContent = boardName;

  const counterDiv = document.createElement("div");
  counterDiv.id = `${id}-Counter`;
  counterDiv.className =
    "text-gray-500 h-6 w-6 rounded-full bg-gray-300 p-1 flex items-center justify-center";
  counterDiv.textContent = "0";

  headerDiv.appendChild(circleDiv);
  headerDiv.appendChild(titleDiv);
  headerDiv.appendChild(counterDiv);

  //  main board container
  const mainContainer = document.createElement("div");
  mainContainer.id = `itemContainer-${id}`;
  mainContainer.className =
    "mb-auto h-10 flex-1 flex flex-col gap-4 ml-1 itemContainer";

  // footer
  const footerDiv = document.createElement("div");
  footerDiv.id = "items-footer";
  footerDiv.className = "h-10 flex text-[#9D9EA3] justify-end ";

  const addSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  addSvg.setAttribute("fill", "none");
  addSvg.setAttribute("viewBox", "0 0 24 24");
  addSvg.setAttribute("stroke-width", "1.5");
  addSvg.setAttribute("stroke", "currentColor");
  addSvg.classList.add("size-10");

  const addPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  addPath.setAttribute("stroke-linecap", "round");
  addPath.setAttribute("stroke-linejoin", "round");
  addPath.setAttribute("d", "M12 4.5v15m7.5-7.5h-15");

  addSvg.appendChild(addPath);

  // addButton.appendChild(document.createTextNode("Add item"));

  addSvg.addEventListener("click", function () {
    openCloseModal(id);
  });

  footerDiv.appendChild(addSvg);

  // append all child
  boardDiv.appendChild(headerDiv);
  boardDiv.appendChild(mainContainer);
  boardDiv.appendChild(footerDiv);

  return boardDiv;
}

// find all item-containers
function findAllContainer() {
  allItemContainersElement = document.querySelectorAll(".itemContainer");
  allItemContainersElement.forEach(function (itemContainer) {
    itemContainer.addEventListener("dragover", function (event) {
      event.preventDefault(); // Allow dropping
    });
    itemContainer.addEventListener("drop", function () {
      const flayingElement = document.querySelector(".flying");
      const hiddenSpan = flayingElement.querySelector("span.hidden");
      // console.log(hiddenSpan.textContent);
      // console.log(flayingElement);
      // console.log(itemContainer.id.split("-")[1]);

      const currentBoard = itemContainer.id.split("-")[1];

      data = data.map((item) => {
        if (item.id === Number(hiddenSpan.textContent.trim())) {
          return {
            ...item,
            board: currentBoard,
          };
        }
        return item;
      });
      saveDataToDataStorage();
      updateCounter();

      itemContainer.appendChild(flayingElement);
    });
  });
}

addBoardElement.addEventListener("click", function () {
  openCloseModal("", "open", "newBoard");
});

function createNewBoard() {
  const nameForBoard = inputNameElement.value.trim();

  // { id: 3, name: "Done" },

  const randomIdForBoard = randomId(10000, 99999);

  boards = [...boards, { id: randomIdForBoard, name: nameForBoard }];

  saveDataToDataStorage();
  loadData();
}
