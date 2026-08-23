/**
 * services/registrationService.js
 * ------------------------------------------------------------
 * Sole owner of the network call to POST /api/registrations.
 * UI code never calls fetch directly — it calls this service.
 * This means a future, separate admin-dashboard project can
 * import this exact file (or a copy of it) to talk to the same
 * backend without re-implementing the integration.
 *
 * Errors are thrown as Error objects with a `message` code:
 *   - "network_error"    -> request never reached the server
 *   - "validation_error" -> HTTP 422, `.detail` holds FastAPI's error list
 *   - "server_error"     -> any other non-2xx response, `.status` set
 */

import { REGISTRATION_ENDPOINT } from "../config/config.js";

export const registrationService = {
  /**
   * @param {object} payload - matches registration-fields-reference.md exactly
   * @returns {Promise<any>}
   */
  async submitRegistration(payload) {
    let response;
    try {
      response = await fetch(REGISTRATION_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (networkErr) {
      const err = new Error("network_error");
      err.cause = networkErr;
      throw err;
    }

    if (response.status === 422) {
      let body = null;
      try {
        body = await response.json();
      } catch (_e) {
        /* ignore parse errors */
      }
      const err = new Error("validation_error");
      err.detail = body && body.detail ? body.detail : null;
      throw err;
    }

    if (!response.ok) {
      const err = new Error("server_error");
      err.status = response.status;
      throw err;
    }

    try {
      return await response.json();
    } catch (_e) {
      return null;
    }
  },
};
