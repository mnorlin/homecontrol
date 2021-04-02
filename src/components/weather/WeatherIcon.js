import React from "react";
import { ReactComponent as ClearDay } from "./icons/wi-day-sunny.svg";
import { ReactComponent as ClearNight } from "./icons/wi-night-clear.svg";
import { ReactComponent as FewCloudsDay } from "./icons/wi-day-sunny-overcast.svg";
import { ReactComponent as FewCloudsNight } from "./icons/wi-night-alt-partly-cloudy.svg";
import { ReactComponent as CloudyDay } from "./icons/wi-day-cloudy.svg";
import { ReactComponent as CloudyNight } from "./icons/wi-night-alt-cloudy.svg";
import { ReactComponent as Clouds } from "./icons/wi-cloud.svg";
import { ReactComponent as Showers } from "./icons/wi-showers.svg";
import { ReactComponent as Rain } from "./icons/wi-rain.svg";
import { ReactComponent as Thunder } from "./icons/wi-thunderstorm.svg";
import { ReactComponent as Snow } from "./icons/wi-snow.svg";
import { ReactComponent as Mist } from "./icons/wi-fog.svg";

export default function WeatherIcon({ icon }) {
  return <OpenWeatherIcon icon={icon} fill="currentColor" style={{ width: "3em", height: "3em" }} />;
}

function OpenWeatherIcon({ icon, ...props }) {
  switch (icon) {
    case "01d":
      return <ClearDay {...props} />;
    case "01n":
      return <ClearNight {...props} />;
    case "02d":
      return <FewCloudsDay {...props} />;
    case "02n":
      return <FewCloudsNight {...props} />;
    case "03d":
      return <CloudyDay {...props} />;
    case "03n":
      return <CloudyNight {...props} />;
    case "04d":
      return <Clouds {...props} />;
    case "04n":
      return <Clouds {...props} />;
    case "09d":
      return <Showers {...props} />;
    case "09n":
      return <Showers {...props} />;
    case "10d":
      return <Rain {...props} />;
    case "10n":
      return <Rain {...props} />;
    case "11d":
      return <Thunder {...props} />;
    case "11n":
      return <Thunder {...props} />;
    case "13d":
      return <Snow {...props} />;
    case "13n":
      return <Snow {...props} />;
    case "50d":
      return <Mist {...props} />;
    case "50n":
      return <Mist {...props} />;
    default:
      return <>{icon}</>;
  }
}
