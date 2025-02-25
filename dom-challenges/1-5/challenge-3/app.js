/**
 * Write your challenge solution here
 */

// nameDisplay
// jobDisplay
//ageDisplay
// bioDisplay

// nameInput
document.getElementById("nameInput").addEventListener("input", () => {
  document.getElementById("nameDisplay").textContent =
    document.getElementById("nameInput").value;
});
// jobInput
document.getElementById("jobInput").addEventListener("input", () => {
  document.getElementById("jobDisplay").textContent =
    document.getElementById("jobInput").value;
});
// ageInput
document.getElementById("ageInput").addEventListener("input", () => {
  document.getElementById("ageDisplay").textContent =
    document.getElementById("ageInput").value;
});
// bioInput
document.getElementById("bioInput").addEventListener("input", () => {
  document.getElementById("bioDisplay").textContent =
    document.getElementById("bioInput").value;
});
//
