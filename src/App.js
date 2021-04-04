import React, { useState, useEffect } from "react";
import useLights from "hooks/useLights";
import useRooms from "hooks/useRooms";
import useWeather from "hooks/useWeather";
import useSensors from "hooks/useSensors";
import useStorage from "hooks/useStorage";

import { Collapse } from "react-bootstrap-v5";

import Debug from "./Debug";
import { Weather, WeatherSettings } from "components/weather/Weather";
import { Scenes, ScenesSettings } from "components/scene/Scenes";
import { ControlSection, ControlSectionSettings } from "components/ControlSection";
import ThemeSettings, { useTheme } from "components/ThemeSettings";
import SummarySection from "components/SummarySection";
import { FloorPlan, FloorPlanSettings } from "components/floorplan/FloorPlan";
import ButtonSection from "components/ButtonSection";
import { HueSettings } from "components/HueSettings";
import Settings from "components/Settings";
import t from "utils/translate";

import defaultSettings from "default-settings.json";

export default function App() {
  const url = new URL(window.location.href);
  if (url.searchParams.get("reset")) {
    localStorage.clear();
    window.location.href = window.location.href.split("?")[0];
  }

  useEffect(() => {
    if (!localStorage.getItem("floor-plan")) {
      localStorage.setItem("floor-plan", "[]");
      Object.entries(defaultSettings).forEach(([key, value]) => {
        localStorage.setItem(key, typeof value === "object" ? JSON.stringify(value) : value);
      });
      location.reload();
    }
  }, []); // eslint-disable-line

  const setTheme = useTheme();
  useEffect(() => {
    setTheme();
  }, []); // eslint-disable-line

  const [collapseState, setCollapseState] = useState(false);

  const [lights, updateLight] = useLights(1000 * 10); // Update every 10sec
  const sensors = useSensors(1000 * 60); // Update every 1min
  const weatherProps = useWeather(1000 * 60 * 30); // Update every 30min
  const rooms = mapToRooms(useRooms(), lights, sensors);

  const [ignoreList] = useStorage("lights-ignored", true);
  const lightsIgnored = lights.filter((light) => !ignoreList.includes(light.id));
  const roomsIgnored = mapToRooms(useRooms(), lightsIgnored, sensors);

  useEffect(() => {
    const hasFloorPlan = rooms.find((room) => room.walls?.length > 0);
    setCollapseState(!hasFloorPlan);
  }, [rooms.length]); // eslint-disable-line

  if (url.searchParams.get("debug")) {
    return <Debug {...{ lights, sensors, weatherProps, rooms }} />;
  }

  return (
    <div className="container">
      <Weather {...weatherProps} />
      <Scenes
        sunrise={weatherProps.weatherNow.sunrise}
        sunset={weatherProps.weatherNow.sunset}
        lights={lightsIgnored}
        updateLight={updateLight}
      />
      <SummarySection
        lights={lights}
        sensors={sensors}
        onClickCallback={() => {
          setCollapseState(!collapseState);
        }}
      />
      <Collapse in={collapseState}>
        <div>
          <ControlSection updateLight={updateLight} rooms={rooms} />
        </div>
      </Collapse>
      <FloorPlan updateLight={updateLight} rooms={roomsIgnored} />
      <ButtonSection lights={lightsIgnored} updateLight={updateLight} />
      <Settings>
        <WeatherSettings title={t("settings.weather")} />
        <HueSettings title={t("settings.philips-hue")} />
        <ControlSectionSettings rooms={rooms} title={t("settings.control-section")} />
        <ScenesSettings
          sunrise={weatherProps.weatherNow.sunrise}
          sunset={weatherProps.weatherNow.sunset}
          title={t("settings.scenes")}
        />
        <FloorPlanSettings title={t("settings.floor-plan")} />
        <ThemeSettings title={t("settings.theme")} />
      </Settings>
    </div>
  );
}

function mapToRooms(rooms, lights, sensors) {
  const sensorMap = rooms.map((room) =>
    Object.assign({}, room, {
      sensors: [].concat(sensors.filter((sensor) => room.sensors.includes(sensor.id))),
    })
  );

  const lightAndSensorMap = sensorMap.map((room) =>
    Object.assign({}, room, {
      lights: [].concat(lights.filter((light) => room.lights.includes(light.id))),
    })
  );

  return lightAndSensorMap;
}
