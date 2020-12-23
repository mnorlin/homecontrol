import React from "react";

export default function ToggleButton({ children, idToToggle }) {
  return (
    <div className="text-center toggle-button my-0">
      <div data-bs-toggle="collapse" data-bs-target={`#${idToToggle}`} aria-controls={idToToggle} aria-expanded="false">
        {children}
      </div>
    </div>
  );
}
