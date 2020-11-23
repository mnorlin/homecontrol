import React from "react";
import t from "../../utils/translate";

export default function FormFeedback({ id, validator, node }) {
  const errors = validateHtml(node);

  let custom = [];
  if (node.value) {
    custom = validateCustom(node.value, validator);
  }

  if (errors.length + custom.length === 0) {
    node.classList.add("is-valid");
    node.classList.remove("is-invalid");
  } else {
    node.classList.remove("is-valid");
    node.classList.add("is-invalid");
  }

  return (
    <div id={id} className="invalid-tooltip">
      {errors.map((error) => (
        <div key={error}>{t(`form.error.html.${error}`)}</div>
      ))}
      {custom.map((error) => (
        <div key={error}>{t(`form.error.custom.${error}`)}</div>
      ))}
    </div>
  );
}

function validateCustom(value, validator = () => []) {
  const errors = validator(value) || [];

  return Array.isArray(errors) ? errors : [errors];
}

function validateHtml(node) {
  const errors = [];
  const validity = node.validity;

  for (let type in validity) {
    if (validity[type] && type !== "valid") {
      errors.push(type);
    }
  }

  return errors;
}
