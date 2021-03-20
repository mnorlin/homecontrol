import React from "react";

export default function WeatherItem({ title, iconId, temp }) {
  return (
    <div className="d-flex flex-column">
      <div className="text-muted">{title}</div>
      <span className={`my-2 wi wi-owm-${iconId}`} />
      {temp}
    </div>
  );
}
