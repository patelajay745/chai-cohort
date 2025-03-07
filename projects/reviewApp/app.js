let givenRating;

function getRating() {
  const stars = document.querySelectorAll(".star");
  const ratingValue = document.getElementById("ratingValue");
  let selectedRating = 0;

  stars.forEach((star) => {
    star.addEventListener("mouseover", () => {
      resetStars();
      const value = parseInt(star.getAttribute("data-value"));
      highlightStars(value);
    });

    star.addEventListener("click", () => {
      selectedRating = parseInt(star.getAttribute("data-value"));
      givenRating = selectedRating;
    });

    star.addEventListener("mouseleave", () => {
      resetStars();
      if (selectedRating > 0) {
        highlightStars(selectedRating);
      }
    });
  });

  function highlightStars(count) {
    for (let i = 0; i < count; i++) {
      stars[i].classList.add("hovered");
    }
  }

  function resetStars() {
    stars.forEach((star) => star.classList.remove("hovered"));
  }
}

getRating();

// let reviews = [
//   {
//     name: "Avi patel",
//     rating: 4,
//     text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, nemo perspiciatis quod laboriosam, maiores consequuntur magnam autem ipsam minima, ab minus. Labore cumque cupiditate harum itaque. Debitis unde a pariatur dolor enim! Fuga saepe iste aperiam neque sed distinctio explicabo eos molestias assumenda, soluta repudiandae eligendi, voluptas velit porro dolorem.",
//   },
// ];

let reviews = loadDataFromLocalStorage();

const showReviewDiv = document.getElementById("showReview");
const btnSubmit = document.getElementById("btnSubmit");
showReviews();

btnSubmit.addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const reviewText = document.getElementById("review").value.trim();

  if (!name) {
    return;
  }

  if (!reviewText) {
    return;
  }

  const review = {
    name,
    rating: givenRating,
    text: reviewText,
  };

  addReview(review);
  saveDataToDataStorage();
});

function addReview({ name, rating, text }) {
  reviews = [...reviews, { name, rating, text }];
  showReviews();
}

function showReviews() {
  showReviewDiv.innerHTML = "";
  reviews.map((review) => {
    const reviewDiv = createReviewDiv(review);
    showReviewDiv.appendChild(reviewDiv);
  });
}

function createReviewDiv({ name, rating, text }) {
  // main div container
  const reviewDiv = document.createElement("div");
  reviewDiv.className =
    "shadow-l border-1 border-[#c8c8c8] p-4 rounded-xl gap-2";

  // label
  const nameLabel = document.createElement("label");
  nameLabel.className = "text-2xl font-bold";
  nameLabel.textContent = name;
  reviewDiv.appendChild(nameLabel);

  // Create star rating div
  const starDiv = document.createElement("div");
  starDiv.className = "text-sm text-gray-400";
  starDiv.id = "starDisplay";

  // Add stars based on rating (assuming rating is a number 1-5)
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.textContent = "★";
    if (i <= rating) {
      star.classList.add("active");
    }
    starDiv.appendChild(star);
  }
  reviewDiv.appendChild(starDiv);

  //review text
  const textLabel = document.createElement("label");
  textLabel.className = "text-xl text-[#818181]";
  textLabel.textContent = text;
  reviewDiv.appendChild(textLabel);

  return reviewDiv;
}

function loadDataFromLocalStorage() {
  const storedReviews = localStorage.getItem("reviews");
  return storedReviews ? JSON.parse(storedReviews) : [];
}

function saveDataToDataStorage() {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}
