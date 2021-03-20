import React from "react";

export default function SelectionInput({ name, value, options, onChange }) {
  const emptySelect = value ? <></> : <option className="form-control"></option>;
  return (
    <div className="mb-3 input-group input-group-sm">
      <span className="input-group-text">{name}</span>
      <select className="form-control form-select" value={value || undefined} onChange={onChange}>
        {emptySelect}
        {options.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.value}
          </option>
        ))}
      </select>
    </div>
  );
}
