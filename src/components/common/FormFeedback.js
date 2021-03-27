import React, { useState, useEffect } from "react";
import t from "utils/translate";

// TODO: useRef instead of classList
export default function FormFeedback({ id, validator, event, onValid }) {
  const [errors, setErrors] = useState();

  function validate(e, validator = async () => []) {
    const htmlErrors = validateHtml(e);
    validator(e)
      .then((response) => {
        setErrors({ custom: response, html: htmlErrors });
      })
      .catch((unexpectedError) => {
        setErrors({ html: htmlErrors, custom: unexpectedError });
      });
  }

  useEffect(() => {
    if (event) {
      validate(event, validator);
    }
  }, [event]); // eslint-disable-line

  console.log(errors?.html, errors?.custom);

  if (!errors) {
    return null;
  }

  let displayClass = "d-none"; // TODO: Make bootstrap do this, bug in beta3?
  if (errors.html.length + errors.custom.length === 0) {
    event.target.classList.add("is-valid");
    event.target.classList.remove("is-invalid");
    onValid?.(event);
  } else {
    event.target.classList.remove("is-valid");
    event.target.classList.add("is-invalid");
    displayClass = "d-block";
  }

  return (
    <div id={id} className={`invalid-tooltip ${displayClass}`}>
      {errors.html.map((error) => (
        <div key={error}>{t(`form.error.html.${error}`)}</div>
      ))}
      {errors.custom.map((error) => (
        <div key={error}>{t(`form.error.custom.${error}`)}</div>
      ))}
    </div>
  );
}

function validateHtml(e) {
  const errors = [];
  const validity = e.target.validity;

  for (let type in validity) {
    if (validity[type] && type !== "valid") {
      errors.push(type);
    }
  }
  return errors;
}
