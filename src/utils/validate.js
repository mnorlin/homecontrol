export default function validate(e, validator) {
  if (!e.target.value) {
    return [];
  }

  if (!e.target.valid) {
    return "";
  }

  if (validator) {
    const errorMessage = validator(e.target.value);
  }

  let isValid = true;

  if (!e.target.valid) {
    isValid = false;
  }

  if (isValid) {
  } else {
    e.target.classList.remove("is-valid");
    e.target.classList.add("is-invalid");
  }

  if (typeof validator === "function" && validator(e.target.value)) {
    e.target.classList.remove("is-valid");
    e.target.classList.add("is-invalid");
  } else {
    e.target.classList.remove("is-invalid");
    e.target.classList.add("is-valid");
  }
}
