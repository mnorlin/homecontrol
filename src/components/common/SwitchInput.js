import React from "react";

export default function Switch({ name, checked, disabled, onChange }) {
  return (
    <div className="form-check form-switch">
      <label className="form-check-label">
        <input
          className="form-check-input"
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        {name}
      </label>
    </div>
  );
}
