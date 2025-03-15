let qoute;
async function getQuote() {
  const qouteElement = document.getElementById("qoute");
  const author = document.getElementById("author");
  try {
    qouteElement.textContent = "Please Wait...";
    author.textContent = "loading...";
    const res = await fetch(
      "https://api.freeapi.app/api/v1/public/quotes/quote/random"
    );
    const data = await res.json();
    qoute = `${data.data.content} - ${data.data.author}`;
    qouteElement.textContent = `${data.data.content} `;
    author.textContent = `- ${data.data.author} `;
  } catch (error) {}
}

getQuote();

const newQoute = document.getElementById("newQoute");
const share = document.getElementById("share");

newQoute.addEventListener("click", getQuote);
share.addEventListener("click", function () {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    qoute
  )}`;
  window.open(url, "_blank");
});
