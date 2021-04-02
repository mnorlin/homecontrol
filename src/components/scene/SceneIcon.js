import React from "react";
import { ReactComponent as Morning } from "./morning.svg";
import { ReactComponent as Forenoon } from "./forenoon.svg";
import { ReactComponent as Afternoon } from "./afternoon.svg";
import { ReactComponent as Evening } from "./evening.svg";
import { ReactComponent as Night } from "./night.svg";
import { ReactComponent as Default } from "./default.svg";

export default function SceneIcon({ icon, ...props }) {
  switch (icon) {
    case "morning":
      return <Morning {...props} />;
    case "forenoon":
      return <Forenoon {...props} />;
    case "afternoon":
      return <Afternoon {...props} />;
    case "evening":
      return <Evening {...props} />;
    case "night":
      return <Night {...props} />;
    default:
      return <Default {...props} />;
  }
}
