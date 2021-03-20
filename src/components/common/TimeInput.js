import React from "react";

export default function TimeInput({ name, icon, value, onChange, actionButton }) {
  const title = icon ? (
    <img className="rounded-1" style={{ width: "2.5rem", height: "2.5rem" }} src={`/state_icons/${icon}`} alt={name} />
  ) : (
    <span className="input-group-text">{name}</span>
  );

  return (
    <div className="mb-3 input-group input-group-sm">
      {title}
      <input onChange={onChange} type="time" className="form-control" value={value || ""} />
      {actionButton}
    </div>
  );
}
