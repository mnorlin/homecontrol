import React from "react";

export default function ToggleButton({ children, idToToggle }) {
  return (
    <div className="text-center toggle-button my-0">
      <div
        data-toggle="collapse"
        data-target={`#${idToToggle}`}
        aria-controls={idToToggle}
      >
        {children}
      </div>
    </div>
  );
}
