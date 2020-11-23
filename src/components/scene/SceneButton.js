import React from "react";

export default function SceneButton({ name, icon, onClick }) {
  return (
    <button onClick={onClick}>
      <img src={`state_icons/${icon}`} alt={name} />
    </button>
  );
}
