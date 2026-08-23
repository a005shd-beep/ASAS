/**
 * sections/registrationForm.js
 * Wires up the registration form: renders the dynamic option
 * groups, validates on submit, calls registrationService, and
 * drives the loading / success / error UI states.
 */
import { INTEREST_OPTIONS, PROJECT_OPTIONS, LANGUAGE_OPTIONS, HOW_DID_YOU_HEAR_OPTIONS, FRIENDLY_MESSAGES } from "../constants/options.js";
import { renderCheckboxGroup, getCheckedValues } from "../components/checkboxGroup.js";
import { validateRegistration, mapBackendErrorToField } from "../validation/registrationValidation.js";
import { registrationService } from "../services/registrationService.js";

function renderSelectOptions() {
  const select = document.getElementById("f-how");
  HOW_DID_YOU_HEAR_OPTIONS.forEach((opt) => {
    const o = document.createElement("option");
    o.value = opt.value;
    o.textContent = opt.label;
    select.appendChild(o);
  });
}

function clearFieldError(key) {
  const input = document.getElementById(`f-${key.replace(/_/g, "-")}`);
  if (input) input.classList.remove("invalid");
  const errEl = document.getElementById(`err-${key}`) || document.getElementById(`err-${key.replace(/_/g, "-")}`);
  if (errEl) {
    errEl.classList.remove("show");
    errEl.querySelector("span").textContent = "";
  }
}

function showFieldError(key, message) {
  const input = document.getElementById(`f-${key.replace(/_/g, "-")}`);
  if (input) input.classList.add("invalid");
  const errEl = document.getElementById(`err-${key}`) || document.getElementById(`err-${key.replace(/_/g, "-")}`);
  if (errEl) {
    errEl.classList.add("show");
    errEl.querySelector("span").textContent = message;
  }
}

function hideFormAlert() {
  document.getElementById("formAlert").classList.remove("show");
}
function showFormAlert(message) {
  document.getElementById("formAlertText").textContent = message;
  document.getElementById("formAlert").classList.add("show");
}

function clearAllErrors() {
  ["name", "email", "phone", "university", "interests", "major", "quiz_projects", "quiz_languages", "how_did_you_hear"].forEach(
    clearFieldError
  );
  hideFormAlert();
}

function collectFormData() {
  const form = document.getElementById("registrationForm");
  const data = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    university: form.university.value.trim(),
    interests: getCheckedValues("group-interests"),
  };

  const email = form.email.value.trim();
  if (email) data.email = email;

  const major = form.major.value.trim();
  if (major) data.major = major;

  const quizProjects = getCheckedValues("group-projects");
  if (quizProjects.length) data.quiz_projects = quizProjects;

  const quizLanguages = getCheckedValues("group-languages");
  if (quizLanguages.length) data.quiz_languages = quizLanguages;

  const howHeard = form.how_did_you_hear.value;
  if (howHeard) data.how_did_you_hear = howHeard;

  return data;
}

function showSuccessState() {
  document.getElementById("registrationForm").classList.add("hidden");
  document.getElementById("successState").classList.remove("hidden");
  const progress = document.querySelector(".reg-progress");
  if (progress) progress.style.display = "none";
  document.getElementById("successState").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function handleSubmit(e) {
  e.preventDefault();
  clearAllErrors();

  const submitBtn = document.getElementById("submitBtn");
  if (submitBtn.classList.contains("loading")) return;

  const data = collectFormData();
  const { valid, errors } = validateRegistration(data);

  if (!valid) {
    Object.keys(errors).forEach((key) => showFieldError(key, errors[key]));
    const firstKey = Object.keys(errors)[0];
    const firstEl = document.getElementById(`f-${firstKey.replace(/_/g, "-")}`) || document.getElementById("group-interests");
    if (firstEl) firstEl.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  submitBtn.disabled = true;
  submitBtn.classList.add("loading");
  submitBtn.querySelector(".btn-submit-label").textContent = "جاري إرسال التسجيل...";

  try {
    await registrationService.submitRegistration(data);
    showSuccessState();
  } catch (err) {
    if (err.message === "validation_error") {
      const field = mapBackendErrorToField(err.detail);
      if (field && FRIENDLY_MESSAGES[field]) {
        showFieldError(field, FRIENDLY_MESSAGES[field]);
        const el = document.getElementById(`f-${field.replace(/_/g, "-")}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        showFormAlert("يرجى مراجعة البيانات المدخلة والمحاولة مرة أخرى.");
      }
      console.error("Registration validation error:", err.detail);
    } else if (err.message === "network_error") {
      showFormAlert("تعذر الاتصال بالخادم. يرجى التحقق من الاتصال بالإنترنت والمحاولة مرة أخرى.");
      console.error("Network error:", err.cause);
    } else {
      showFormAlert("حدث خطأ أثناء إرسال التسجيل. يرجى المحاولة مرة أخرى.");
      console.error("Unexpected registration error:", err);
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
    submitBtn.querySelector(".btn-submit-label").textContent = "إرسال التسجيل";
  }
}

export function initRegistrationForm() {
  renderCheckboxGroup("group-interests", "interests", INTEREST_OPTIONS, () => clearFieldError("interests"));
  renderCheckboxGroup("group-projects", "quiz_projects", PROJECT_OPTIONS);
  renderCheckboxGroup("group-languages", "quiz_languages", LANGUAGE_OPTIONS);
  renderSelectOptions();

  document.getElementById("registrationForm").addEventListener("submit", handleSubmit);

  ["name", "email", "phone", "university", "major"].forEach((key) => {
    const el = document.getElementById(`f-${key.replace(/_/g, "-")}`);
    if (el) el.addEventListener("input", () => clearFieldError(key));
  });

  const howSelect = document.getElementById("f-how");
  if (howSelect) howSelect.addEventListener("change", () => clearFieldError("how_did_you_hear"));
}
