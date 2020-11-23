import { useState, useEffect } from "react";
import useStorage from "../hooks/useStorage";
import createToast from "../utils/createToast";
import t from "../utils/translate";

export default function useSensors(refreshRate) {
  const [sensors, setSensors] = useState([]);
  const [ip] = useStorage("hue-ip");
  const [username] = useStorage("hue-username");
  const [tempUnit] = useStorage("temp-unit");

  useEffect(() => {
    fetchSensors();

    const intervalId = setInterval(() => {
      fetchSensors();
    }, refreshRate);

    function fetchSensors() {
      fetch(`http://${ip}/api/${username}/sensors`)
        .then((response) => response.json())
        .then((data) => setSensors(mapSensor(data)))
        .catch((error) =>
          createToast(
            "danger",
            t("hue.error.connect").replace("{0}", ip).replace("{1}", error),
            15 * 1000
          )
        );
    }

    function mapSensor(sensors) {
      if (sensors?.[0]?.error !== undefined) {
        createToast(
          "danger",
          t("hue.sensors.error").replace(
            "{0}",
            sensors?.[0]?.error?.description
          )
        );
        return [];
      }
      return Object.entries(sensors).map(([id, sensor]) => ({
        id: id,
        name: sensor.name,
        type: sensor.type,
        temp: convertTemp(tempUnit, sensor.state.temperature).temp,
        tempUnit: convertTemp(tempUnit, sensor.state.temperature).unit,
      }));
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshRate, ip, username, tempUnit]);

  return sensors;
}

function convertTemp(unit, temp) {
  switch (unit) {
    case "c":
      return { temp: Math.round(temp / 10) / 10, unit: "°C" };
    case "f":
      return {
        temp: Math.round(((temp / 100) * (9 / 5) + 32) * 10) / 10,
        unit: "°F",
      };
    case "k":
      return { temp: Math.round((temp / 100 + 273.15) * 10) / 10, unit: "K" };
    default:
      return { temp: Math.round(temp), unit: "" };
  }
}
