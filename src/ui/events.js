import { getAllCarMakes, getRandomFact } from "../api/factService.js";
import { renderFact } from "./renderFacts.js"; // not used right now

// Fill the dropdown with car brand names
export async function populateMakeDropdown() {
  const select = document.getElementById("makeSelect");
  select.innerHTML = `<option>Loading makes...</option>`;

  const makes = await getAllCarMakes();

  if (makes.length === 0) {
    select.innerHTML = `<option>Failed to load makes</option>`;
    return;
  }

  select.innerHTML = makes
    .map(make => `<option value="${make.Make_Name}">${make.Make_Name}</option>`)
    .join("");
}

// Set up the "Show Fact" button and modal interactions
export function setupFactButton() {
  const button = document.getElementById("factBtn");
  const modal = document.getElementById("modalOverlay");
  const modalText = document.getElementById("modalText");
  const modalClose = document.getElementById("modalClose");
  const voteFunny = document.getElementById("voteFunny");
  const voteBad = document.getElementById("voteBad");
  const voteResponse = document.getElementById("voteResponse");

  // When the button is clicked, show the modal and fetch a fact or joke
  button.addEventListener("click", async () => {
    modalText.innerHTML = "<p>Loading...</p>";
    voteResponse.textContent = ""; // clear old feedback
    modal.classList.add("show");
    modal.classList.remove("hidden");

    try {
      const fact = await getRandomFact();
      modalText.innerHTML = `
        <h3>${fact.source}</h3>
        <p>${fact.text}</p>
      `;
    } catch (err) {
      modalText.innerHTML = `<p class="error">Failed to load fact.</p>`;
    }
  });

  // Close modal when "X" is clicked
  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.classList.add("hidden");
      voteResponse.textContent = "";
    }, 300);
  });

  // Close modal if you click outside of it
  modal.addEventListener("click", (e) => {
    if (e.target.id === "modalOverlay") {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.classList.add("hidden");
        voteResponse.textContent = "";
      }, 300);
    }
  });

  // Vote buttons for feedback
  voteFunny.addEventListener("click", () => {
    voteResponse.textContent = "Glad you liked it! 😄";
  });

  voteBad.addEventListener("click", () => {
    voteResponse.textContent = "We'll try better next time... 😬";
  });
}
