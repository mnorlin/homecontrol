import React from "react";
import { Button } from "react-bootstrap-v5";

export default function SceneButton({ name, icon, onClick }) {
  return (
    <Button variant="none" className="p-0 mx-1" onClick={onClick}>
      <img className="img-fluid rounded" src={`state_icons/${icon}`} alt={name} />
    </Button>
  );
}
