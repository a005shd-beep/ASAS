/**
 * sections/header.js
 * Applies runtime config to the header/footer: the Google Maps
 * link and an optional logo image. Never fabricates a maps URL —
 * if GOOGLE_MAPS_URL isn't configured, the buttons are disabled
 * instead of pointing somewhere wrong.
 */
import { CONFIG } from "../config/config.js";

export function applyHeaderFooterConfig() {
  const mapsLinks = [document.getElementById("mapsBtnHeader"), document.getElementById("mapsBtnFooter")];

  if (CONFIG.GOOGLE_MAPS_URL) {
    mapsLinks.forEach((el) => {
      if (el) el.href = CONFIG.GOOGLE_MAPS_URL;
    });
  } else {
    mapsLinks.forEach((el) => {
      if (!el) return;
      el.removeAttribute("href");
      el.style.opacity = "0.45";
      el.style.pointerEvents = "none";
      el.setAttribute("aria-disabled", "true");
      el.title = "لم يتم تعيين رابط الخريطة بعد";
    });
  }

  if (CONFIG.LOGO_URL) {
    document.querySelectorAll("#logoSlot, .footer-brand .brand-logo").forEach((slot) => {
      slot.innerHTML = `<img src="${CONFIG.LOGO_URL}" alt="شعار أساس للتقنية">`;
    });
  }
}

export function bindSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
