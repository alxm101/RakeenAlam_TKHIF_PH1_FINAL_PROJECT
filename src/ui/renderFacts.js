// This shows the fact or joke in a card format
export function renderFact({ source, text }) {
  const container = document.getElementById("factContainer");
  container.innerHTML = `
    <div class="fact-card">
      <h3>${source}</h3>
      <p>${text}</p>
    </div>
  `;
}
