import React from "react";
import Loader from "components/common/Loader";
import WeatherItem from "./WeatherItem";
import TextInput from "components/common/TextInput";
import SelectionInput from "components/common/SelectionInput";
import useStorage from "hooks/useStorage";
import t from "utils/translate";

export function Weather({ weatherNow, weatherForecast }) {
  if (!(weatherNow.name && weatherForecast.length > 0)) {
    return (
      <div className="mt-3">
        <Loader />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-between text-center p-3">
      <div>
        <WeatherItem
          title={t("weather.now")}
          iconId={weatherNow.weatherId}
          temp={weatherNow.temp + weatherNow.tempUnit}
        />
      </div>

      {weatherForecast.slice(0, 4).map((datapoint) => (
        <div key={datapoint.time}>
          <WeatherItem
            title={unixTimeToHour(datapoint.time)}
            iconId={datapoint.weatherId}
            temp={datapoint.temp + weatherNow.tempUnit}
          />
        </div>
      ))}
    </div>
  );
}

export function WeatherSettings() {
  const [tempUnit, saveTempUnit] = useStorage("temp-unit");
  const [city, saveCity] = useStorage("weather-city");
  const [key, saveKey] = useStorage("weather-key");

  return (
    <>
      <SelectionInput
        name={t("settings.temp-unit")}
        options={[
          { key: "k", value: "Kelvin" },
          { key: "c", value: "Celsius" },
          { key: "f", value: "Farenheit" },
        ]}
        value={tempUnit}
        onChange={(e) => saveTempUnit(e.target.value)}
      />
      <TextInput name={t("weather.city-id")} value={city} onChange={(e) => saveCity(e.target.value)} />
      <TextInput name={t("weather.api-key")} value={key} onChange={(e) => saveKey(e.target.value)} />
      <div className="form-text">
        {t("weather.register").split("{0}")[0]}
        <a className="text-muted" rel="noopener noreferrer" target="_blank" href="https://openweathermap.org/api">
          https://openweathermap.org/api
        </a>
        {t("weather.register").split("{0}")[1]}
      </div>
    </>
  );
}

function unixTimeToHour(timestamp) {
  const date = new Date(timestamp * 1000);

  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}
