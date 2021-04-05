import React, { useEffect, useCallback } from "react";
import SceneButton from "./SceneButton";
import useStorage from "hooks/useStorage";
import createToast from "utils/createToast";
import t from "utils/translate";
import { normalizeToBulb } from "utils/colorUtils";
import { getTimeUntilHour, calculateSchedule } from "utils/timeUtils";
import Input from "components/common/Input";
import SceneIcon from "./SceneIcon";
import SwitchInput from "components/common/SwitchInput";

export function Scenes({ lights, updateLight, sunrise, sunset }) {
  const [savedScenes] = useStorage("hue-scenes", true);
  const [scenesDaylight] = useStorage("hue-scenes-daylight", true);
  const [scheduleOn] = useStorage("hue-scenes-schedule", true);

  let scenes = savedScenes;
  if (scenes.length === 5 && scenesDaylight) {
    const newTimes = calculateSchedule(sunrise, sunset);
    scenes = savedScenes.map((s, i) => Object.assign({}, s, { schedule: { time: newTimes[i] } }));
  }

  const onColorSwitchClick = useCallback(
    (sceneName, transitiontime = 10) => {
      const newState = scenes.find((scene) => scene.name === sceneName).state;

      lights.forEach((light) => {
        const transformedState = normalizeToBulb(light.model, newState.hue, newState.sat, newState.bri);

        updateLight(light.id, { ...transformedState, transitiontime }, !light.on);
      });
    },
    [lights, scenes, updateLight]
  );

  useEffect(() => {
    const timeoutIds = [];
    for (const scene of scenes) {
      if (!scheduleOn || !scene.schedule?.time) {
        break;
      }

      const timeLeft = getTimeUntilHour(scene.schedule.time);

      const timeoutId = setTimeout(() => {
        createToast("info", t("scenes.schedule.running").replace("{0}", t(scene.name)), 300 * 1000);
        onColorSwitchClick(scene.name, 3000);
      }, timeLeft);
      timeoutIds.push(timeoutId);
    }

    return () => {
      for (const timeoutId of timeoutIds) {
        clearTimeout(timeoutId);
      }
    };
  }, [scheduleOn, scenes, onColorSwitchClick]);

  if (scenes.length === 0) {
    return null;
  }

  return (
    <div className="card mt-3">
      <div className="card-body p-3">
        <div className="btn-group">
          {scenes.map((scene) => (
            <SceneButton
              disabled={lights.length === 0}
              key={scene.name}
              name={scene.name}
              icon={scene.icon}
              onClick={() => onColorSwitchClick(scene.name)}
              style={{ fill: scene.color ? scene.color : `var(--scene-${scene.icon}-bg)` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScenesSettings({ sunrise, sunset }) {
  const [scenes, saveScenes] = useStorage("hue-scenes", true);
  const [scenesDaylight, saveScenesDaylight] = useStorage("hue-scenes-daylight", true);
  const [scheduleOn, saveScheduleOn] = useStorage("hue-scenes-schedule", true);

  if (!scenes) {
    return <></>;
  }

  function saveSceneSchedule(name, time) {
    const index = scenes.findIndex((scene) => scene.name === name);
    const scene = scenes[index];

    scene.schedule.time = time;

    saveScenes([...scenes.slice(0, index), Object.assign({}, scenes[index], scene), ...scenes.slice(index + 1)]);
  }

  const daylightValues = calculateSchedule(sunrise, sunset);

  const sceneInputs = scenes.map((scene, i) => (
    <Input
      disabled={!scheduleOn || (scenesDaylight && sunrise && sunset)}
      key={scene.name}
      icon={
        <SceneIcon
          className="rounded-1"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            fill: scene.color ? scene.color : `var(--scene-${scene.icon}-bg)`,
            color: "white",
          }}
          icon={scene.icon}
          alt={t(scene.name)}
        />
      }
      type="time"
      value={scenesDaylight ? daylightValues[i] : scene.schedule.time}
      onChange={(e) => saveSceneSchedule(scene.name, e.target.value)}
    />
  ));

  return (
    <>
      <SwitchInput
        name={t("settings.scenes.schedule")}
        checked={scheduleOn}
        onChange={() => saveScheduleOn(!scheduleOn)}
        className="my-3"
      />
      <div className={!scheduleOn && "d-none"}>
        <SwitchInput
          disabled={!scheduleOn || !sunrise || !sunset}
          name={t("settings.scenes.automatic")}
          checked={sunrise && sunset && scenesDaylight}
          onChange={() => saveScenesDaylight(!scenesDaylight)}
          className="my-3"
        />
        {sceneInputs}
      </div>
    </>
  );
}
