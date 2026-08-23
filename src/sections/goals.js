/**
 * sections/goals.js
 * Renders the workshop goals as a connected "path" list.
 */
import { GOAL_ITEMS, iconSvg } from "../constants/options.js";

export function renderGoals() {
  const wrap = document.getElementById("goalsPath");
  wrap.innerHTML = GOAL_ITEMS.map(
    (g) => `
    <div class="goal-row">
      <span class="goal-connector" aria-hidden="true"></span>
      <span class="goal-marker" aria-hidden="true">${iconSvg(g.icon)}</span>
      <div class="goal-content">
        <h3>${g.title}</h3>
        <p>${g.desc}</p>
      </div>
    </div>`
  ).join("");
}
