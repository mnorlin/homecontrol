import React, { useState, useEffect } from "react";
import useLights from "hooks/useLights";
import useRooms from "hooks/useRooms";
import useWeather from "hooks/useWeather";
import useSensors from "hooks/useSensors";

import { Collapse } from "react-bootstrap-v5";

import Debug from "./Debug";
import { Weather, WeatherSettings } from "components/weather/Weather";
import { Scenes, ScenesSettings } from "components/scene/Scenes";
import ControlSection from "components/ControlSection";
import SummarySection from "components/SummarySection";
import { FloorPlan, FloorPlanSettings } from "components/floorplan/FloorPlan";
import ButtonSection from "components/ButtonSection";
import { HueSettings } from "components/HueSettings";
import Settings from "components/Settings";
import t from "utils/translate";

export default function App() {
  const url = new URL(window.location.href);

  const [collapseState, setCollapseState] = useState(false);

  if (url.searchParams.get("reset")) {
    localStorage.clear();
    window.location.href = window.location.href.split("?")[0];
  }

  const [lights, updateLight] = useLights(1000 * 10); // Update every 10sec
  const sensors = useSensors(1000 * 60); // Update every 1min
  const weatherProps = useWeather(1000 * 60 * 30); // Update every 30min
  const rooms = mapToRooms(useRooms(), lights, sensors);

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
      <Scenes lights={lights} updateLight={updateLight} />
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
      <FloorPlan updateLight={updateLight} rooms={rooms} />
      <ButtonSection lights={lights} updateLight={updateLight} />
      <Settings>
        <HueSettings title={t("settings.philips-hue")} />
        <WeatherSettings title={t("settings.weather")} />
        <ScenesSettings title={t("settings.scenes")} />
        <FloorPlanSettings title={t("settings.floor-plan")} />
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
