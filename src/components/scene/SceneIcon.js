import React from "react";
import { ReactComponent as Morning } from "./morning.svg";
import { ReactComponent as Forenoon } from "./forenoon.svg";
import { ReactComponent as Afternoon } from "./afternoon.svg";
import { ReactComponent as Evening } from "./evening.svg";
import { ReactComponent as Night } from "./night.svg";

export default function SceneIcon({ icon, ...props }) {
  switch (icon) {
    case "morning.svg":
      return <Morning {...props} />;
    case "forenoon.svg":
      return <Forenoon {...props} />;
    case "afternoon.svg":
      return <Afternoon {...props} />;
    case "evening.svg":
      return <Evening {...props} />;
    case "night.svg":
      return <Night {...props} />;
    default:
      return null;
  }
}
