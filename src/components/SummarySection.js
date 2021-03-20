import React, { useState, useEffect } from "react";
import Loader from "components/common/Loader";

export default function SummarySection({ sensors, lights, onClickCallback }) {
  const [temperature, setTemperature] = useState();
  const [powerConsumption, setPowerConsumption] = useState();

  useEffect(() => {
    const temp = meanTemp(sensors);

    if (temp) {
      setTemperature(meanTemp(sensors));
    }

    const power = calcPowerConsumption(lights);
    setPowerConsumption(power);
  }, [sensors, lights]);

  if (lights.length === 0) {
    return (
      <div className="mt-3">
        <Loader />
      </div>
    );
  }
  return (
    <div style={{ cursor: "pointer" }} onClick={onClickCallback}>
      <h1 className="h4 text-center mt-4 mb-0">
        <span className="me-4 badge bg-secondary">{temperature}</span>
        <span className="badge bg-secondary">{`${powerConsumption} W`}</span>
      </h1>
    </div>
  );
}

function calcPowerConsumption(lights) {
  const power = lights.reduce(
    (acc, light) => acc + lightWattage(light, getPowerModel(light.type)),
    1 // 1W Bridge
  );

  return Math.round(power);
}

function meanTemp(sensors) {
  const unit = sensors ? sensors.find((sensor) => sensor.type === "ZLLTemperature")?.tempUnit : "";

  const meanValue =
    sensors.filter((sensor) => sensor.type === "ZLLTemperature").reduce((acc, sensor) => acc + sensor.temp, 0) /
    sensors.filter((sensor) => sensor.type === "ZLLTemperature").length;

  if (isNaN(meanValue)) {
    return undefined;
  }

  return meanValue + unit;
}

// Idle: https://github.com/tvwerkhoven/hue-power-tracker
function lightWattage(light, calcPower) {
  if (!light.reachable) {
    return 0;
  }

  if (light.type === "plug") {
    return 0;
  }

  if (!light.on) {
    switch (light.type) {
      case "sultanbulb":
        return 0.3;
      case "candlebulb":
        return 0.3;
      case "huelightstrip":
        return 0.1;
      default:
        return 0.3;
    }
  }

  return calcPower(light.bri / 254);
}

function getPowerModel(lightType) {
  switch (lightType) {
    case "sultanbulb":
      return (frac) => (frac > 0.5 ? 14 * frac - 5 : frac * 2 + 1);
    case "candlebulb":
      return (frac) => (frac > 0.5 ? 9 * frac - 2.5 : frac * 2 + 1);
    case "huelightstrip":
      return (frac) => (frac > 0.5 ? 30 * frac - 10 : frac * 8 + 1);
    default:
      return (frac) => (frac > 0.5 ? 14 * frac - 5 : frac * 2 + 1); // Sultanbulb
  }
}

/*
Ipad 2W
Bridge 1W

sultanbulb
100% 9W
75% 5W
50% 2W

candlebulb
100% 6.5W

huelightstrip
100% 20W
75% 12W
50% 5W
*/
