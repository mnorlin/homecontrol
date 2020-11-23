import { useReducer, useEffect } from "react";
import useStorage from "../hooks/useStorage";
import createToast from "../utils/createToast";
import t from "../utils/translate";

export default function useLights(refreshRate) {
  const [lights, setLights] = useReducer(reducer, []);
  const [ip] = useStorage("hue-ip");
  const [username] = useStorage("hue-username");

  useEffect(() => {
    fetchLights();

    const intervalId = setInterval(() => {
      fetchLights();
    }, refreshRate);

    function fetchLights() {
      fetch(`http://${ip}/api/${username}/lights`)
        .then((response) => response.json())
        .then((lightStates) => setLights(lightStates))
        .catch((error) =>
          createToast(
            "danger",
            t("hue.error.connect").replace("{0}", ip).replace("{1}", error),
            refreshRate - 1000
          )
        );
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshRate, ip, username]);

  function updateLight(id, lightState, updateOffLights = false) {
    if (updateOffLights) {
      putState(id, { ...lightState, on: true, transitiontime: 100 })
        .then(setTimeout(() => putState(id, { on: false }, 10)))
        .then(setLights({ id, ...lightState }));
    } else {
      putState(id, lightState).then(setLights({ id, ...lightState }));
    }
  }

  function putState(id, state) {
    return fetch(`http://${ip}/api/${username}/lights/${id}/state`, {
      method: "PUT",
      body: JSON.stringify(state),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
  }

  function reducer(oldState, newState) {
    if (newState.id) {
      const index = oldState.findIndex((light) => light.id === newState.id);
      return [
        ...oldState.slice(0, index),
        Object.assign({}, oldState[index], newState),
        ...oldState.slice(index + 1),
      ];
    } else {
      return mapLights(newState);
    }
  }

  return [lights, updateLight];
}

function mapLights(newState) {
  if (newState?.[0]?.error !== undefined) {
    createToast(
      "danger",
      t("hue.lights.error").replace("{0}", newState?.[0]?.error?.description)
    );
    return [];
  }

  return Object.entries(newState).map(([id, light]) => ({
    id: id,
    name: light.name,
    model: light.modelid,
    type: light.config.archetype,
    on: light.state.on,
    bri: light.state.bri,
    hue: light.state.hue,
    sat: light.state.sat,
    reachable: light.state.reachable,
  }));
}
