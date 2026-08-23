/**
 * components/checkboxGroup.js
 * A reusable "checkbox group" renderer used for interests,
 * quiz_projects and quiz_languages. Handles the None-is-exclusive
 * rule declaratively via `option.isExclusive`.
 *
 * @param {string} containerId
 * @param {string} name
 * @param {{value:string,label:string,isExclusive?:boolean}[]} options
 * @param {() => void} [onChange]
 */
export function renderCheckboxGroup(containerId, name, options, onChange) {
  const container = document.getElementById(containerId);
  container.innerHTML = options
    .map((opt, idx) => {
      const id = `${name}-${idx}`;
      return `
      <div class="check-item${opt.isExclusive ? " none-option" : ""}" data-value="${opt.value}">
        <input type="checkbox" id="${id}" name="${name}" value="${opt.value}" ${opt.isExclusive ? 'data-exclusive="true"' : ""}>
        <label for="${id}">${opt.label}</label>
      </div>`;
    })
    .join("");

  container.querySelectorAll("input[type=checkbox]").forEach((cb) => {
    cb.addEventListener("change", () => {
      const item = cb.closest(".check-item");
      item.classList.toggle("checked", cb.checked);

      if (cb.checked) {
        const isExclusive = cb.dataset.exclusive === "true";
        const allBoxes = Array.from(container.querySelectorAll("input[type=checkbox]"));
        if (isExclusive) {
          allBoxes.forEach((other) => {
            if (other !== cb && other.checked) {
              other.checked = false;
              other.closest(".check-item").classList.remove("checked");
            }
          });
        } else {
          const exclusiveBox = allBoxes.find((o) => o.dataset.exclusive === "true");
          if (exclusiveBox && exclusiveBox.checked) {
            exclusiveBox.checked = false;
            exclusiveBox.closest(".check-item").classList.remove("checked");
          }
        }
      }

      if (typeof onChange === "function") onChange();
    });
  });
}

export function getCheckedValues(containerId) {
  return Array.from(
    document.querySelectorAll(`#${containerId} input[type=checkbox]:checked`)
  ).map((el) => el.value);
}
