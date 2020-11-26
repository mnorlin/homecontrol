import React, { useState, useEffect } from "react";
import FormFeedback from "./FormFeedback";
import { v4 as uuidv4 } from "uuid";

export default function TextInput({
  name,
  value,
  onChange,
  validator,
  actionButton,
}) {
  const [feedback, setFeedback] = useState();
  const [validationId, setValidationId] = useState();

  useEffect(() => {
    setValidationId(uuidv4());
  }, []);

  function onInput(e) {
    onChange(e);

    setFeedback(
      <FormFeedback id={validationId} validator={validator} node={e.target} />
    );
  }

  return (
    <>
      <div
        className={`input-group input-group-sm ${
          feedback ? "has-validation" : ""
        }`}
      >
        <span className="input-group-text">{name}</span>
        <input
          aria-describedby={feedback ? validationId : undefined}
          onChange={onInput}
          type="text"
          className="form-control"
          value={value || ""}
        />
        {actionButton}
        {feedback}
      </div>
    </>
  );
}
