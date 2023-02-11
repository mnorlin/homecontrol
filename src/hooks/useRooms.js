import { useState, useEffect } from "react";
import useStorage from "hooks/useStorage";
import createToast from "utils/createToast";
import t from "utils/translate";

export default function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [ip] = useStorage("hue-ip");
  const [username] = useStorage("hue-username");
  const [floorPlan] = useStorage("floor-plan", true);

  useEffect(() => {
    setRooms(mapRooms(mockedRooms, floorPlan))
  }, [ip, username, floorPlan]);

  return rooms;
}

function mapRooms(groups, settings) {
  if (groups?.[0]?.error !== undefined) {
    createToast("danger", t("hue.rooms.error").replace("{0}", groups?.[0]?.error?.description), null);
    return [];
  }
  return Object.entries(groups)
    .filter(([id, group]) => group.type === "Room") // eslint-disable-line
    .map(([id, group]) => {
      const walls = settings?.find((room) => room.id === id)?.walls;
      return {
        id: id,
        name: group.name,
        lights: group.lights,
        walls: walls || [],
        sensors: group.sensors,
      };
    })
    .sort(sortByName);
}

function sortByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}


const mockedRooms = {
  1: {
    name: "Room 1",
    lights: ["1", "2"],
    sensors: [],
    type: "Room",
    state: { all_on: true, any_on: true },
    recycle: false,
    action: {
      on: true,
      bri: 254,
      hue: 8417,
      sat: 140,
      effect: "none",
      xy: [0.4573, 0.41],
      ct: 366,
      alert: "select",
      colormode: "ct",
    },
  },
  2: {
    name: "Room 2",
    lights: ["3"],
    sensors: ["23"],
    type: "Room",
    state: { all_on: false, any_on: false },
    recycle: false,
    action: {
      on: false,
      bri: 254,
      hue: 8417,
      sat: 140,
      effect: "none",
      xy: [0.4573, 0.41],
      ct: 366,
      alert: "select",
      colormode: "ct",
    },
  },
};
