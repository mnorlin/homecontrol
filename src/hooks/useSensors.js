import { useState, useEffect } from "react";
import useStorage from "./useStorage";
import createToast from "utils/createToast";
import t from "utils/translate";

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
      setSensors(mapSensor(mockedSensors))
    }

    function mapSensor(sensors) {
      if (sensors?.[0]?.error !== undefined) {
        createToast("danger", t("hue.sensors.error").replace("{0}", sensors?.[0]?.error?.description));
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


const mockedSensors = {
  23: {
    state: { temperature: 2100, lastupdated: "none" },
    swupdate: { state: "noupdates", lastinstall: "2019-04-07T07:54:57" },
    config: {
      on: false,
      battery: 0,
      reachable: false,
      alert: "none",
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: "Hue temperature sensor 1",
    type: "ZLLTemperature",
    modelid: "SML001",
    manufacturername: "Signify Netherlands B.V.",
    productname: "Hue temperature sensor",
    swversion: "6.1.1.27575",
    uniqueid: "00:17:88:01:03:28:f0:ab-02-0402",
    capabilities: { certified: true, primary: false },
  },
};
