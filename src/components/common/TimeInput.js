import React from "react";

export default function TimeInput({ name, value, onChange, actionButton }) {
  return (
    <div className="input-group input-group-sm">
      <span className="input-group-text">{name}</span>
      <input
        onChange={onChange}
        type="time"
        className="form-control"
        value={value || ""}
      />
      {actionButton}
    </div>
  );
}
