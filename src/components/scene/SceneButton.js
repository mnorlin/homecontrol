import React from "react";
import { Button } from "react-bootstrap-v5";
import SceneIcon from "./SceneIcon";

export default function SceneButton({ name, icon, onClick }) {
  return (
    <Button variant="none" className="scene-button p-0 mx-1" onClick={onClick}>
      <SceneIcon icon={icon} className="rounded img-fluid" />
    </Button>
  );
}
