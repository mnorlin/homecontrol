import { useState, useEffect } from "react";
import useStorage from "./useStorage";
import createToast from "../utils/createToast";
import t from "../utils/translate";

export default function useWeather(refreshRate) {
  const [city] = useStorage("weather-city");
  const [key] = useStorage("weather-key");
  const [tempUnit] = useStorage("temp-unit");

  const [weatherNow, setWeatherNow] = useState({});
  const [weatherForecast, setWeatherForecast] = useState([]);

  useEffect(() => {
    fetchWeather();
    fetchForecast();

    const intervalId = setInterval(() => {
      fetchWeather();
      fetchForecast();
    }, refreshRate);

    function fetchWeather() {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${city}&APPID=${key}`
      )
        .then((response) => response.json())
        .then((data) => setWeatherNow(mapWeather(data)))
        .catch((error) =>
          createToast(
            "danger",
            t("weather.error.connection").replace("{0}", error),
            refreshRate - 1000
          )
        );
    }

    function fetchForecast() {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?id=${city}&APPID=${key}`
      )
        .then((response) => response.json())
        .then((data) =>
          setWeatherForecast(
            data.list ? data.list.map((forecast) => mapWeather(forecast)) : {}
          )
        )
        .catch((error) =>
          createToast(
            "danger",
            t("weather.error.connection").replace("{0}", error),
            refreshRate - 1000
          )
        );
    }

    function mapWeather(datapoint) {
      if (datapoint?.message) {
        createToast(
          "danger",
          t("weather.error.service-message").replace("{0}", datapoint.message),
          refreshRate - 1000
        );
        return {};
      }
      return {
        name: datapoint.weather[0].main,
        weatherId: datapoint.weather[0].id,
        temp: convertTemp(tempUnit, datapoint.main.temp).temp,
        tempUnit: convertTemp(tempUnit, datapoint.main.temp).unit,
        time: datapoint.dt,
      };
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshRate, city, key, tempUnit]);

  return { weatherNow, weatherForecast };
}

function convertTemp(unit, temp) {
  switch (unit) {
    case "c":
      return { temp: Math.round(temp - 273.15), unit: "°C" };
    case "f":
      return { temp: Math.round(temp * (9 / 5) - 459.67), unit: "°F" };
    default:
      return { temp: Math.round(temp), unit: "" };
  }
}
