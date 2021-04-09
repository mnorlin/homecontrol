import React from "react";
import SceneIcon from "./SceneIcon";

export default function SceneButton({ name, icon, ...props }) {
  return (
    <button className={`scene-button scene-button-${name}`} {...props}>
      <SceneIcon icon={icon} style={{ border: icon ? null : "none" }} className={`img-fluid`} />
    </button>
  );
}
