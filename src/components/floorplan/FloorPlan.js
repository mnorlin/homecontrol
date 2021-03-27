import React, { useState, useEffect } from "react";
import { getRedPixelValue } from "./canvasUtils";
import { adaptRooms } from "./roomUtils";
import Room from "./Room";
import createToast from "utils/createToast";
import t from "utils/translate";
import { getRedIn8bit } from "utils/colorUtils";
import Input from "components/common/Input";
import useStorage from "hooks/useStorage";
import useRooms from "hooks/useRooms";

const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 2000;

const FLOOR_PLAN_WRAPPER = "floor-plan-wrapper";
const FLOOR_PLAN_HITBOX = "floor-plan-hitbox";
const FLOOR_PLAN = "floor-plan";

export function FloorPlan({ rooms, updateLight }) {
  const [rotation] = useStorage("floor-plan-rotation");
  const loaded = rooms.length > 0;
  const roomWalls = rooms.map((room) => {
    return {
      id: room.id,
      walls: room.walls,
    };
  });

  const adaptedRoomWalls = adaptRooms(roomWalls, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (loaded && rooms.find((room) => room.walls.length > 0) === undefined) {
    createToast("warning", t("floor-plan.warning.no-floor-plan"), null);
    return <></>;
  }

  function onHouseClick(e) {
    const roomId = getRedPixelValue(e, FLOOR_PLAN_HITBOX, FLOOR_PLAN_WRAPPER);
    const isOn =
      getRedPixelValue(e, FLOOR_PLAN, FLOOR_PLAN_WRAPPER) === getRedPixelValueFromCssVariable("--floor-plan-active");

    rooms
      .filter((room) => room.id === roomId)
      .forEach((room) => {
        room.lights.forEach((light) => {
          updateLight(light.id, { on: !isOn });
        });
      });
  }

  const roomComponents = rooms.map((room) => (
    <Room
      key={room.id}
      id={room.id}
      walls={adaptedRoomWalls.find((roomParams) => roomParams.id === room.id).walls}
      lights={room.lights}
      visualCanvas={FLOOR_PLAN}
      hitboxCanvas={FLOOR_PLAN_HITBOX}
    />
  ));

  /*
   * <div id="FLOOR_PLAN_WRAPPER">
   *   <div id="FLOOR_PLAN_HITBOX" /> // Hidden canvas, exact copy of FLOOR_PLAN, but each room is filled with a unique color, used to pinpoint where a user clicks.
   *   <div id="FLOOR_PLAN" /> // The canvas that shows the floor map
   * </div>
   */
  return (
    <div className="floor-plan-section">
      <div
        id={`${FLOOR_PLAN_WRAPPER}`}
        style={{
          height: `${CANVAS_HEIGHT}px`,
          display: loaded ? "block" : "none",
          width: `${CANVAS_WIDTH}px`,
          transform: rotation ? `rotate(${rotation}deg)` : undefined,
        }}
      >
        <canvas onClick={onHouseClick} id={FLOOR_PLAN_HITBOX} height={`${CANVAS_HEIGHT}`} width={`${CANVAS_WIDTH}`} />

        <canvas id={FLOOR_PLAN} height={`${CANVAS_HEIGHT}`} width={`${CANVAS_WIDTH}`} />
        {roomComponents}
      </div>
    </div>
  );
}

export function FloorPlanSettings() {
  const rooms = useRooms();
  const [walls, setWalls] = useState([]);

  const [rotation, saveRotation, updateRotation] = useStorage("floor-plan-rotation");

  const [floorPlan, saveFloorPlan] = useStorage("floor-plan", true);

  useEffect(() => {
    const tmp = [];
    floorPlan.map((r) => {
      tmp.push({ id: r.id, walls: JSON.stringify(r.walls) });
    });
    setWalls(tmp);
  }, [floorPlan]);

  if (!rooms) {
    return <></>;
  }

  function saveRoom(e, id, fnc, parseJson) {
    const index = floorPlan.findIndex((room) => room.id === id);

    const data = e.target.value && parseJson ? JSON.parse(e.target.value) : e.target.value;

    fnc([
      ...floorPlan.slice(0, index),
      Object.assign({}, floorPlan[index], {
        id,
        walls: data,
      }),
      ...floorPlan.slice(index + 1),
    ]);
  }

  async function validator(e) {
    let data;
    try {
      data = JSON.parse(e.target.value);
    } catch {
      return ["not-json"];
    }

    if (!Array.isArray(data)) {
      return ["not-array"];
    }

    if (data.length === 0) {
      return ["no-coordinates"];
    }

    for (const coordinate of data) {
      if (coordinate.x === undefined || coordinate.y === undefined) {
        return ["no-coordinates"];
      }

      if (isNaN(coordinate.x) || isNaN(coordinate.y)) {
        return ["coordinate-not-number"];
      }
    }

    return [];
  }
  return (
    <>
      <Input
        label={t("settings.floor-plan.rotation")}
        value={rotation}
        type="number"
        min={0}
        max={360}
        onChange={(e) => updateRotation(e.target.value)}
        onValid={(e) => saveRotation(e.target.value)}
      />
      <hr />
      {rooms.map((room) => (
        <Input
          key={room.id}
          label={room.name}
          value={walls?.find((r) => r.id === room.id)?.walls}
          onChange={(e) => saveRoom(e, room.id, setWalls, false)}
          onValid={(e) => saveRoom(e, room.id, saveFloorPlan, true)}
          validator={validator}
        />
      ))}
      <small className="text-muted d-block">{t("settings.floor-plan.instructions")}</small>
    </>
  );
}

function getRedPixelValueFromCssVariable(name) {
  const color = getComputedStyle(document.documentElement).getPropertyValue(name);
  return getRedIn8bit(color);
}
