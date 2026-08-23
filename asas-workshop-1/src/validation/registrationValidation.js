/**
 * validation/registrationValidation.js
 * ------------------------------------------------------------
 * Pure, framework-free client-side validation that mirrors the
 * backend contract described in registration-fields-reference.md
 * exactly. No network calls happen here — this only decides
 * whether collected form data is safe to send.
 */

const PHONE_PATTERN = /^\+?[0-9 ()\-]{7,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {object} data - collected registration payload
 * @returns {{ valid: boolean, errors: Record<string,string> }}
 */
export function validateRegistration(data) {
  const errors = {};

  const name = (data.name || "").trim();
  if (!name) errors.name = "يرجى إدخال الاسم.";
  else if (name.length < 2 || name.length > 100) errors.name = "الاسم يجب أن يكون بين 2 و100 حرف.";

  const email = (data.email || "").trim();
  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = "يرجى إدخال بريد إلكتروني صحيح.";
  }

  const phone = (data.phone || "").trim();
  if (!phone) errors.phone = "يرجى إدخال رقم الهاتف.";
  else if (phone.length < 7 || phone.length > 20 || !PHONE_PATTERN.test(phone)) {
    errors.phone = "يرجى التأكد من رقم الهاتف (بين 7 و20 حرفًا، أرقام فقط مع إمكانية +/-/() ).";
  }

  const university = (data.university || "").trim();
  if (!university) errors.university = "يرجى إدخال جهة الدراسة / الجامعة.";
  else if (university.length < 2 || university.length > 150) errors.university = "هذا الحقل يجب أن يكون بين 2 و150 حرف.";

  if (!Array.isArray(data.interests) || data.interests.length === 0) {
    errors.interests = "يرجى اختيار مجال تقني واحد على الأقل.";
  } else if (new Set(data.interests).size !== data.interests.length) {
    errors.interests = "لا يمكن تكرار نفس المجال.";
  }

  if (data.major && data.major.length > 100) errors.major = "التخصص يجب ألا يتجاوز 100 حرف.";

  if (Array.isArray(data.quiz_projects) && data.quiz_projects.includes("None") && data.quiz_projects.length > 1) {
    errors.quiz_projects = 'لا يمكن اختيار "لا شيء من ذلك" مع خيارات أخرى.';
  }
  if (Array.isArray(data.quiz_languages) && data.quiz_languages.includes("None") && data.quiz_languages.length > 1) {
    errors.quiz_languages = 'لا يمكن اختيار "لا شيء من ذلك" مع خيارات أخرى.';
  }

  if (!data.how_did_you_hear) {
    errors.how_did_you_hear = "يرجى اختيار كيف تعرفت على الورشة.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Maps a FastAPI 422 error detail array to the first offending
 * field name so the UI can highlight the right input.
 * @param {any} detail
 * @returns {string|null}
 */
export function mapBackendErrorToField(detail) {
  if (!Array.isArray(detail)) return null;
  const fieldNames = [
    "name", "email", "phone", "university", "interests",
    "major", "quiz_projects", "quiz_languages", "how_did_you_hear",
  ];
  for (const d of detail) {
    const loc = d.loc || [];
    const field = loc.find((l) => fieldNames.includes(l));
    if (field) return field;
  }
  return null;
}
