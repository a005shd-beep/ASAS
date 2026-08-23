/**
 * sections/workshopInfo.js
 * Renders the "معلومات الورشة" cards only for values that are
 * actually configured — never invents a date, time, duration or
 * location that wasn't provided.
 */
import { CONFIG } from "../config/config.js";
import { iconSvg } from "../constants/options.js";

export function renderWorkshopInfo() {
  const items = [
    { key: "WORKSHOP_DATE", label: "التاريخ", icon: "calendar" },
    { key: "WORKSHOP_TIME", label: "الوقت", icon: "clock" },
    { key: "WORKSHOP_DURATION", label: "المدة", icon: "hourglass" },
    { key: "WORKSHOP_LOCATION", label: "المكان", icon: "pin" },
  ].filter((i) => CONFIG[i.key]);

  if (items.length === 0) return;

  const grid = document.getElementById("workshopInfoGrid");
  grid.innerHTML = items
    .map(
      (i) => `
    <div class="info-card">
      <span class="info-icon">${iconSvg(i.icon)}</span>
      <div class="info-label">${i.label}</div>
      <div class="info-value">${CONFIG[i.key]}</div>
    </div>`
    )
    .join("");
  document.getElementById("workshopInfoSection").style.display = "block";
}
