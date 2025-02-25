/**
 * Write your challenge solution here
 */
// Image data
const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Beautiful Mountain Landscape",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Ocean Sunset View",
  },
  {
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Autumn Forest Path",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Urban City Skyline",
  },
];

let currentImageIndex = 0;
let refreshIntervalId;

const carouselCaptionElement = document.getElementById("caption");
const prevButtonElement = document.getElementById("prevButton");
const nextButtonElement = document.getElementById("nextButton");
const carouselTrackElement = document.getElementById("carouselTrack");
const autoPlayButtonElement = document.getElementById("autoPlayButton");
const timerDisplayElement = document.getElementById("timerDisplay");
let imageDiv;

addImageDiv();

function addImageDiv() {
  imageDiv = document.createElement("div");
  imageDiv.classList = "carousel-slide ";
  imageDiv.style.backgroundImage = `url(${images[currentImageIndex].url})`;
  carouselTrackElement.appendChild(imageDiv);

  changeCaption(currentImageIndex);
}

function changeImage(index) {
  imageDiv.style.backgroundImage = `url(${images[index].url})`;
}

function changeCaption(index) {
  carouselCaptionElement.textContent = images[index].caption;
}

prevButtonElement.addEventListener("click", () => {
  currentImageIndex = showPrevImage(currentImageIndex);
});

nextButtonElement.addEventListener("click", () => {
  currentImageIndex = showNextImage(currentImageIndex);
});

autoPlayButtonElement.addEventListener("click", () => {
  if (autoPlayButtonElement.textContent == "Stop Auto Play") {
    autoPlayButtonElement.textContent = "Start Auto Play";
    stopTimer();
  } else {
    startTimer(currentImageIndex);
    autoPlayButtonElement.textContent = "Stop Auto Play";
  }
});

function showPrevImage(currentImageIndex) {
  if (currentImageIndex === 0) {
    currentImageIndex = images.length;
  }

  currentImageIndex--;
  changeImage(currentImageIndex);
  changeCaption(currentImageIndex);
  return currentImageIndex;
}

function showNextImage(currentImageIndex) {
  if (currentImageIndex === images.length - 1) {
    currentImageIndex = -1;
  }

  currentImageIndex++;
  changeImage(currentImageIndex);
  changeCaption(currentImageIndex);
  return currentImageIndex;
}

function stopTimer() {
  clearInterval(refreshIntervalId);
  timerDisplayElement.textContent = " ";
}

function startTimer(currentImageIndex) {
  let currentTime = 5;
  timerDisplayElement.textContent = currentTime;

  refreshIntervalId = setInterval(() => {
    if (currentTime == 0) {
      currentImageIndex = showNextImage(currentImageIndex);
      currentTime = 6;
    }

    currentTime--;
    timerDisplayElement.textContent = currentTime;
  }, 1000);
}
