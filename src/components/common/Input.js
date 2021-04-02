import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import t from "utils/translate";

export default function Input({
  label,
  icon,
  value,
  onChange,
  validator = async () => [],
  onValid,
  actionButton,
  disabled,
  ...props
}) {
  const [errors, setErrors] = useState({ custom: [], html: [] });
  const [event, setEvent] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const inputEl = useRef(null);

  function onInput(e) {
    setEvent(null);
    onChange?.(e);

    const htmlErrors = validateHtml(e);

    validator(e)
      .then((response) => {
        setErrors({ custom: response, html: htmlErrors });
        setEvent(e);
      })
      .catch((unexpectedError) => {
        setErrors({ custom: unexpectedError, html: htmlErrors });
        setEvent(e);
      });
  }

  function validateHtml(e) {
    const htmlErrors = [];
    const validity = e.target.validity;

    for (let type in validity) {
      if (validity[type] && type !== "valid") {
        htmlErrors.push(type);
      }
    }
    return htmlErrors;
  }

  useEffect(() => {
    setFeedback(
      <div className={`invalid-tooltip ${errors.html.length + errors.custom.length > 0 && "d-block"}`}>
        {errors.html.map((error) => (
          <div key={error}>{t(`form.error.html.${error}`)}</div>
        ))}
        {errors.custom.map((error) => (
          <div key={error}>{t(`form.error.custom.${error}`)}</div>
        ))}
      </div>
    );

    if (event && inputEl.current) {
      if (errors.html.length + errors.custom.length > 0) {
        inputEl.current.classList.remove("is-valid");
        inputEl.current.classList.add("is-invalid");
      } else {
        inputEl.current.classList.add("is-valid");
        inputEl.current.classList.remove("is-invalid");
        onValid?.(event);
      }
    }
  }, [value, errors, event]); // eslint-disable-line

  const prefix = icon ? icon : label ? <label className="input-group-text">{label}</label> : null;

  return (
    <div className={`position-relative mb-2 ${disabled && "disabled"}`}>
      <div className={`input-group input-group-sm`}>
        {prefix}
        <input
          disabled={disabled}
          ref={inputEl}
          onChange={onInput}
          className="form-control"
          value={value || ""}
          {...props}
        />
        {actionButton}
      </div>
      {feedback}
    </div>
  );
}
