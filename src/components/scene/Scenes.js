import React, { useEffect, useCallback } from "react";
import SceneButton from "./SceneButton";
import useStorage from "hooks/useStorage";
import createToast from "utils/createToast";
import t from "utils/translate";
import { normalizeToBulb } from "utils/colorUtils";
import { getTimeUntilHour } from "utils/timeUtils";
import defaultStates from "config/scenes";
import Input from "components/common/Input";
import SceneIcon from "./SceneIcon";

export function Scenes({ lights, updateLight }) {
  const [scenes, saveScenes] = useStorage("hue-scenes", true);

  useEffect(() => {
    if (scenes.length === 0) {
      saveScenes(defaultStates);
    }
  }, [scenes]); // eslint-disable-line

  const onColorSwitchClick = useCallback(
    (sceneId, transitiontime = 10) => {
      const newState = scenes.find((scene) => scene.id === sceneId).state;

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
      if (!scene.schedule || !scene.schedule.time) {
        break;
      }
      const schedule = scene.schedule;
      const timeLeft = getTimeUntilHour(schedule.time);

      const timeoutId = setTimeout(() => {
        createToast("info", t("scenes.schedule.running").replace("{0}", t(scene.name)), 300 * 1000);
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
    <div className="card">
      <div className="card-body p-3">
        <div className="btn-group">
          {scenes.map((scene, i) => (
            <SceneButton
              disabled={lights.length === 0}
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

    saveScenes([...scenes.slice(0, index), Object.assign({}, scenes[index], scene), ...scenes.slice(index + 1)]);
  }

  return scenes.map((scene) => (
    <Input
      key={scene.id}
      icon={
        <SceneIcon
          className="rounded-1"
          style={{ width: "2.5rem", height: "2.5rem" }}
          icon={scene.icon}
          alt={t(scene.name)}
        />
      }
      value={scene.schedule.time}
      onChange={(e) => saveSceneSchedule(scene.id, e.target.value)}
    />
  ));
}
