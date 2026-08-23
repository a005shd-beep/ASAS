/**
 * config/config.js
 * ------------------------------------------------------------
 * Centralized runtime configuration, read from Vite environment
 * variables (.env / .env.production). Nothing in the rest of the
 * app should read import.meta.env directly — everything goes
 * through this module, so a future admin dashboard project can
 * point at the same backend by reusing this same file.
 * ------------------------------------------------------------
 * Copy .env.example to .env and fill in real values before
 * deploying. Do not hard-code the backend domain anywhere else.
 */

const env = import.meta.env;

export const CONFIG = {
  API_BASE_URL: env.VITE_API_BASE_URL || "https://api.example.com",
  GOOGLE_MAPS_URL: env.VITE_GOOGLE_MAPS_URL || "https://maps.app.goo.gl/xGmfpKbavvLKMVYM7?g_st=ic",
  LOGO_URL: env.VITE_LOGO_URL || "", // اتركه فارغًا لاستخدام الشعار البديل النصي

  // معلومات الورشة — تُعرض فقط إذا كانت القيمة موجودة، لا قيم وهمية
  WORKSHOP_DATE: env.VITE_WORKSHOP_DATE || null,
  WORKSHOP_TIME: env.VITE_WORKSHOP_TIME || null,
  WORKSHOP_DURATION: env.VITE_WORKSHOP_DURATION || null,
  WORKSHOP_LOCATION: env.VITE_WORKSHOP_LOCATION || null,
};

export const REGISTRATION_ENDPOINT =
  CONFIG.API_BASE_URL.replace(/\/$/, "") + "/api/registrations";
