import React, { useEffect, useCallback } from "react";
import SceneButton from "./SceneButton";
import useStorage from "../../hooks/useStorage";
import createToast from "../../utils/createToast";
import t from "../../utils/translate";
import { normalizeToBulb } from "../../utils/colorUtils";
import defaultStates from "../../config/scenes";
import TimeInput from "../common/TimeInput";

export function Scenes({ lights, updateLight }) {
  const [scenes, saveScenes] = useStorage("hue-scenes", true);

  if (scenes.length === 0) {
    saveScenes(defaultStates);
  }

  const onColorSwitchClick = useCallback(
    (sceneId, transitiontime = 10) => {
      const newState = scenes.find((scene) => scene.id === sceneId).state;

      lights.forEach((light) => {
        const transformedState = normalizeToBulb(
          light.model,
          newState.hue,
          newState.sat,
          newState.bri
        );

        updateLight(
          light.id,
          { ...transformedState, transitiontime },
          !light.on
        );
      });
    },
    [lights, scenes, updateLight]
  );

  useEffect(() => {
    const timeoutIds = [];
    for (const scene of scenes) {
      if (!scene.schedule || !scene.schedule.time) {
        break;
      }
      const schedule = scene.schedule;
      const timeLeft = getTimeUntilHour(schedule.time);

      const timeoutId = setTimeout(() => {
        createToast(
          "info",
          t("scenes.schedule.running").replace("{0}", t(scene.name)),
          300 * 1000
        );
        onColorSwitchClick(scene.id, 3000);
      }, timeLeft);
      timeoutIds.push(timeoutId);
    }

    return () => {
      for (const timeoutId of timeoutIds) {
        clearTimeout(timeoutId);
      }
    };
  }, [scenes, onColorSwitchClick]);

  return (
    <div className="scene-section">
      <div className="card">
        <div className="card-body d-flex justify-content-around">
          {scenes.map((scene) => (
            <SceneButton
              key={scene.id}
              name={scene.name}
              icon={scene.icon}
              onClick={() => onColorSwitchClick(scene.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ScenesSettings() {
  const [scenes, saveScenes] = useStorage("hue-scenes", true);

  if (!scenes) {
    return <></>;
  }

  function saveSceneSchedule(id, time) {
    const index = scenes.findIndex((scene) => scene.id === id);
    const scene = scenes[index];

    scene.schedule.time = time;

    saveScenes([
      ...scenes.slice(0, index),
      Object.assign({}, scenes[index], scene),
      ...scenes.slice(index + 1),
    ]);
  }

  return scenes.map((scene) => (
    <TimeInput
      key={scene.id}
      name={t(scene.name)}
      icon={scene.icon}
      value={scene.schedule.time}
      onChange={(e) => saveSceneSchedule(scene.id, e.target.value)}
    />
  ));
}

function getTimeUntilHour(time) {
  const t = new Date();
  t.setHours(time.split(":")[0]);
  t.setMinutes(time.split(":")[1]);
  t.setSeconds(0);
  t.setMilliseconds(0);

  const timeLeft = t.getTime() - new Date().getTime();

  return timeLeft > 0 ? timeLeft : timeLeft + 1000 * 60 * 60 * 24; // If time has passed, add 1 day
}
