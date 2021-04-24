import { useState, useEffect } from "react";
import useStorage from "./useStorage";
import createToast from "utils/createToast";
import t from "utils/translate";

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
      if (city && key) {
        fetchWeather();
        fetchForecast();
      }
    }, refreshRate);

    function fetchWeather() {
      setWeatherNow(mapWeather(mockedWeather))
    }

    function fetchForecast() {
      setWeatherForecast(mockedForecast.list.map((forecast) => mapWeather(forecast)));
    }

    function mapWeather(datapoint) {
      if (datapoint?.message) {
        createToast("danger", t("weather.error.service-message").replace("{0}", datapoint.message), refreshRate - 1000);
        return {};
      }
      return {
        name: datapoint.weather[0].main,
        weatherId: datapoint.weather[0].id,
        icon: datapoint.weather[0].icon,
        temp: convertTemp(tempUnit, datapoint.main.temp).temp,
        tempUnit: convertTemp(tempUnit, datapoint.main.temp).unit,
        time: datapoint.dt,
        sunrise: new Date(datapoint.sys.sunrise * 1000),
        sunset: new Date(datapoint.sys.sunset * 1000),
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

const mockedWeather = {"coord":{"lon":-74.006,"lat":40.7143},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":280.51,"feels_like":277.68,"temp_min":278.55,"temp_max":282.19,"pressure":1025,"humidity":39},"visibility":10000,"wind":{"speed":4.47,"deg":295,"gust":7.15},"clouds":{"all":0},"dt":1676141492,"sys":{"type":2,"id":2008101,"country":"US","sunrise":1676116529,"sunset":1676154312},"timezone":-18000,"id":5128581,"name":"New York","cod":200};

const mockedForecast = {
  cod: "200",
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1676149200,
      main: {
        temp: 280.53,
        feels_like: 278.22,
        temp_min: 280.53,
        temp_max: 280.6,
        pressure: 1025,
        sea_level: 1025,
        grnd_level: 1024,
        humidity: 37,
        temp_kf: -0.07,
      },
      weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
      clouds: { all: 0 },
      wind: { speed: 3.47, deg: 317, gust: 4.36 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "d" },
      dt_txt: "2023-02-11 21:00:00",
    },
    {
      dt: 1676160000,
      main: {
        temp: 279.81,
        feels_like: 278.58,
        temp_min: 279.47,
        temp_max: 279.81,
        pressure: 1026,
        sea_level: 1026,
        grnd_level: 1025,
        humidity: 39,
        temp_kf: 0.34,
      },
      weather: [{ id: 801, main: "Clouds", description: "few clouds", icon: "02n" }],
      clouds: { all: 21 },
      wind: { speed: 1.87, deg: 325, gust: 3.18 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2023-02-12 00:00:00",
    },
    {
      dt: 1676170800,
      main: {
        temp: 278.33,
        feels_like: 278.33,
        temp_min: 278.33,
        temp_max: 278.33,
        pressure: 1026,
        sea_level: 1026,
        grnd_level: 1025,
        humidity: 44,
        temp_kf: 0,
      },
      weather: [{ id: 803, main: "Clouds", description: "broken clouds", icon: "04n" }],
      clouds: { all: 67 },
      wind: { speed: 1.11, deg: 269, gust: 1.47 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2023-02-12 03:00:00",
    },
    {
      dt: 1676181600,
      main: {
        temp: 277.56,
        feels_like: 275.7,
        temp_min: 277.56,
        temp_max: 277.56,
        pressure: 1023,
        sea_level: 1023,
        grnd_level: 1023,
        humidity: 48,
        temp_kf: 0,
      },
      weather: [{ id: 803, main: "Clouds", description: "broken clouds", icon: "04n" }],
      clouds: { all: 83 },
      wind: { speed: 2.13, deg: 231, gust: 4.16 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2023-02-12 06:00:00",
    },
    {
      dt: 1676192400,
      main: {
        temp: 277.27,
        feels_like: 275.16,
        temp_min: 277.27,
        temp_max: 277.27,
        pressure: 1022,
        sea_level: 1022,
        grnd_level: 1022,
        humidity: 51,
        temp_kf: 0,
      },
      weather: [{ id: 804, main: "Clouds", description: "overcast clouds", icon: "04n" }],
      clouds: { all: 100 },
      wind: { speed: 2.33, deg: 230, gust: 5.66 },
      visibility: 10000,
      pop: 0,
      sys: { pod: "n" },
      dt_txt: "2023-02-12 09:00:00",
    },
  ],
  city: {
    id: 5128581,
    name: "New York",
    coord: { lat: 40.7143, lon: -74.006 },
    country: "US",
    population: 0,
    timezone: -18000,
    sunrise: 1676116529,
    sunset: 1676154312,
  },
};
