import React from "react";

export default function WeatherItem({ title, iconId, temp }) {
  return (
    <>
      <h1>{title}</h1>
      <span className={`wi wi-owm-${iconId}`} />
      {temp}
    </>
  );
}
