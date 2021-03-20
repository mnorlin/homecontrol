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
    fetchGroups();
    function fetchGroups() {
      fetch(`http://${ip}/api/${username}/groups`)
        .then((response) => response.json())
        .then((data) => setRooms(mapRooms(data, floorPlan)))
        .catch((error) => createToast("danger", t("hue.error.connect").replace("{0}", ip).replace("{1}", error)));
    }
  }, [ip, username, floorPlan]);

  return rooms;
}

function mapRooms(groups, settings) {
  if (groups?.[0]?.error !== undefined) {
    createToast("danger", t("hue.rooms.error").replace("{0}", groups?.[0]?.error?.description), null);
    return [];
  }
  return Object.entries(groups)
    .filter(([id, group]) => group.type === "Room")
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
