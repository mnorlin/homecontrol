import React from "react";
import { Button } from "react-bootstrap-v5";
import SceneIcon from "./SceneIcon";

export default function SceneButton({ name, icon, style, ...props }) {
  return (
    <Button variant="none" className="scene-button p-0" {...props}>
      <SceneIcon icon={icon} style={style} className="img-fluid" />
    </Button>
  );
}
