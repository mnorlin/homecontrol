import React from "react";

export default function TimeInput({
  name,
  icon,
  value,
  onChange,
  actionButton,
}) {
  const title = icon ? (
    <img src={`/state_icons/${icon}`} alt={name} />
  ) : (
    <span className="input-group-text">{name}</span>
  );

  return (
    <div className="input-group input-group-sm">
      {title}
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
