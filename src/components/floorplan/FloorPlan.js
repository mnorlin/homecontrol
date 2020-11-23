import React, { useState, useEffect } from "react";
import { getRedPixelValue } from "./canvasUtils";
import { adaptRooms } from "./roomUtils";
import Room from "./Room";
import createToast from "../../utils/createToast";
import t from "../../utils/translate";
import TextInput from "../common/TextInput";
import NumberInput from "../common/NumberInput";
import useStorage from "../../hooks/useStorage";
import useRooms from "../../hooks/useRooms";

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
    const isOn = getRedPixelValue(e, FLOOR_PLAN, FLOOR_PLAN_WRAPPER) === "255";

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
      walls={
        adaptedRoomWalls.find((roomParams) => roomParams.id === room.id).walls
      }
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
          opacity: loaded ? "1" : "0.1",
          height: `${CANVAS_HEIGHT}px`,
          width: `${CANVAS_WIDTH}px`,
          transform: rotation ? `rotate(${rotation}rad)` : undefined,
        }}
      >
        <canvas
          onClick={onHouseClick}
          id={FLOOR_PLAN_HITBOX}
          height={`${CANVAS_HEIGHT}`}
          width={`${CANVAS_WIDTH}`}
        />

        <canvas
          id={FLOOR_PLAN}
          height={`${CANVAS_HEIGHT}`}
          width={`${CANVAS_WIDTH}`}
        />
        {roomComponents}
      </div>
    </div>
  );
}

export function FloorPlanSettings() {
  const rooms = useRooms();

  const [rotation, saveRotation] = useStorage("floor-plan-rotation");

  const [floorPlan, saveFloorPlan] = useStorage("floor-plan", true);
  const [walls, setWalls] = useState();

  useEffect(() => {
    const walls = rooms.map((room) => ({
      id: room.id,
      walls: JSON.stringify(floorPlan.find((f) => f.id === room.id)?.walls),
    }));

    setWalls(walls);
  }, [rooms, floorPlan]);

  if (!rooms) {
    return <></>;
  }

  function saveRoom(e, id) {
    if (!e.target.value || !validator(e.target.value)) {
      const index = floorPlan.findIndex((room) => room.id === id);

      saveFloorPlan([
        ...floorPlan.slice(0, index),
        Object.assign({}, floorPlan[index], {
          id,
          walls: e.target.value ? JSON.parse(e.target.value) : undefined,
        }),
        ...floorPlan.slice(index + 1),
      ]);
    }

    const index = walls.findIndex((room) => room.id === id);

    setWalls([
      ...walls.slice(0, index),
      Object.assign({}, walls[index], { id, walls: e.target.value }),
      ...walls.slice(index + 1),
    ]);
  }
  function validator(value) {
    try {
      const data = JSON.parse(value);
      if (!Array.isArray(data)) {
        return "not-array";
      }
    } catch {
      return "not-json";
    }
  }

  return (
    <>
      <NumberInput
        name={t("settings.floor-plan.rotation")}
        value={Math.round((rotation / (2 * Math.PI)) * 360 || 0).toString()}
        min={0}
        max={360}
        onChange={(e) => saveRotation((e.target.value / 360) * 2 * Math.PI)}
      />
      <hr />
      {rooms.map((room) => (
        <TextInput
          key={room.id}
          name={room.name}
          value={walls.find((w) => w.id === room.id)?.walls}
          onChange={(e) => saveRoom(e, room.id)}
          validator={validator}
        />
      ))}
    </>
  );
}
