import React from "react";

export default function Switch({ name, checked, disabled, onChange, className }) {
  return (
    <div className={`form-check form-switch  ${className}`}>
      <label className="form-check-label">
        <input className="form-check-input" type="checkbox" checked={checked} disabled={disabled} onChange={onChange} />
        {name}
      </label>
    </div>
  );
}
