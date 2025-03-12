const colorInput = document.getElementById("inputColor");
const pickedColorCode = document.getElementById("pickedColor");
const pickedColorCopyBtn = document.getElementById("pickedColorBtn");
const complementryColorDiv = document.getElementById("complementryColorDiv");
const complementryColorCode = document.getElementById("complementryColorText");
const complementryColorCopyBtn = document.getElementById("complCopyBtn");
const favoriteContainer = document.getElementById("favoriteContainer");
const favoriteitems = document.getElementById("favoriteitems");
const complSaveBtn = document.getElementById("complSaveBtn");
const pickedSaveBtn = document.getElementById("pickedSaveBtn");

let favColor = loadFavColor();
updateFavDiv();

colorInput.addEventListener("input", function () {
  if (colorInput.value.trim() === "") return;
  const selectedColor = colorInput.value.trim().slice(1);
  pickedColorCode.textContent = `#${selectedColor}`;
  const selectedColotNumber = parseInt(selectedColor, 16);

  const complementColorNumber = (0xffffff ^ selectedColotNumber)
    .toString(16)
    .padStart(6, "0");

  complementryColorDiv.style.backgroundColor = `#${complementColorNumber}`;
  complementryColorCode.textContent = `#${complementColorNumber}`;
});

complementryColorCopyBtn.addEventListener("click", () =>
  copyColor(complementryColorCode)
);

pickedColorCopyBtn.addEventListener("click", () => copyColor(pickedColorCode));

function copyColor(copyTextElement) {
  const colorCode = copyTextElement.textContent.trim().slice(1);
  navigator.clipboard
    .writeText(colorCode)
    .then(() => {
      copyTextElement.classList.add("bg-gray-400");
      showToast("success", "Copied!");

      setTimeout(function () {
        copyTextElement.classList.remove("bg-gray-400");
      }, 2000);
    })
    .catch((err) => {
      console.error("Copy failed", err);
    });
}

function showToast(type = "success", message = "") {
  const toast = document.getElementById(`toast-${type}`);
  if (!toast) return;

  const msgEl = toast.querySelector(".ms-3");
  if (msgEl && message) {
    msgEl.textContent = message;
  }

  toast.classList.remove("hidden", "opacity-0");
  toast.classList.add("opacity-100", "transition-opacity", "duration-300");

  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 300);
  }, 2000);
}

pickedSaveBtn.addEventListener("click", function () {
  const color = pickedColorCode.textContent.trim().slice(1);
  addToFav(color);
});

complSaveBtn.addEventListener("click", function () {
  const color = complementryColorCode.textContent.trim().slice(1);
  addToFav(color);
});

function loadFavColor() {
  const favColor = localStorage.getItem("myColor");
  return favColor ? JSON.parse(favColor) : [];
}

function saveFavColor() {
  localStorage.setItem("myColor", JSON.stringify(favColor));
}

function addToFav(color) {
  if (favColor.includes(color)) return;

  favColor = [...favColor, color];

  updateFavDiv();
  saveFavColor();
}

function removeFromFav(colorTobeRemoved) {
  favColor = favColor.filter((color) => color !== colorTobeRemoved);
  saveFavColor();
}

function updateFavDiv() {
  favoriteitems.innerHTML = "";

  favColor.map((color) => showColorDiv(color));

  favColor
    ? favoriteContainer.classList.remove("hidden")
    : favoriteContainer.classList.add("hidden");
}

function showColorDiv(color) {
  const colorDiv = document.createElement("div");
  colorDiv.id = `color-${color}`;
  colorDiv.classList.add("w-10", "h-10", "rounded-lg", "relative");
  colorDiv.style.background = `#${color}`;

  colorDiv.addEventListener("click", function () {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        colorDiv.classList.add("border-gray-400", "border-2");
        showToast("success", "Copied!");

        setTimeout(function () {
          colorDiv.classList.remove("border-gray-400");
          colorDiv.classList.remove("border-2");
        }, 2000);
      })
      .catch((err) => {
        console.error("Copy failed", err);
      });
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add(
    "absolute",
    "-top-1",
    "-right-1",
    "bg-white",
    "text-black",
    "rounded-full",
    "w-4",
    "h-4",
    "flex",
    "items-center",
    "justify-center",
    "text-xs",
    "leading-none",
    "shadow-sm",
    "hover:bg-red-500",
    "hover:text-white"
  );
  deleteButton.textContent = "x";

  deleteButton.addEventListener("click", function (e) {
    e.stopPropagation();
    removeFromFav();
    deleteButton.parentElement.remove();
  });

  colorDiv.appendChild(deleteButton);

  favoriteitems.appendChild(colorDiv);
}
