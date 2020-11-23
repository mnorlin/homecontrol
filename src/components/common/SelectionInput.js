import React from "react";

export default function SelectionInput({ name, value, options, onChange }) {
  const emptySelect = value ? (
    <></>
  ) : (
    <option className="form-control" defaultValue></option>
  );
  return (
    <div className="input-group input-group-sm">
      <span className="input-group-text">{name}</span>
      <select className="form-control form-select" onChange={onChange}>
        {emptySelect}
        {options.map((opt) => (
          <option
            defaultValue={value === opt.key}
            key={opt.key}
            value={opt.key}
          >
            {opt.value}
          </option>
        ))}
      </select>
    </div>
  );
}
