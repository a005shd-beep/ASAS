/**
 * main.js — application entry point.
 * Loaded as a <script type="module"> from index.html. Only
 * responsible for wiring the sections together on DOMContentLoaded;
 * all real logic lives in the modules under config/, constants/,
 * services/, validation/, components/ and sections/.
 */
import "./styles/main.css";

import { renderWorkshopInfo } from "./sections/workshopInfo.js";
import { renderGoals } from "./sections/goals.js";
import { initRegistrationForm } from "./sections/registrationForm.js";
import { applyHeaderFooterConfig, bindSmoothScroll } from "./sections/header.js";

document.addEventListener("DOMContentLoaded", () => {
  renderWorkshopInfo();
  renderGoals();
  initRegistrationForm();
  applyHeaderFooterConfig();
  bindSmoothScroll();
});
