import React from "react";
import { ReactComponent as Sun } from "./sun.svg";
import { ReactComponent as Moon } from "./moon.svg";
import { ReactComponent as Empty } from "./empty.svg";

export default function SceneIcon({ icon, ...props }) {
  switch (icon) {
    case "sun":
      return <Sun {...props} />;
    case "moon":
      return <Moon {...props} />;
    default:
      return <Empty {...props} />;
  }
}
