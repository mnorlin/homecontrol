import React from "react";
import WeatherIcon from "./WeatherIcon";
export default function WeatherItem({ title, icon, temp }) {
  return (
    <div className="d-flex flex-column">
      <div className="text-muted">{title}</div>
      <WeatherIcon icon={icon} className="my-2" />
      {temp}
    </div>
  );
}
