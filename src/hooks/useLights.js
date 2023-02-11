import { useReducer, useEffect } from "react";
import useStorage from "hooks/useStorage";
import createToast from "utils/createToast";
import t from "utils/translate";

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
      setLights(mockedLights)
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

  function putState() {
    return Promise.resolve()
  }

  function reducer(oldState, newState) {
    if (newState.id) {
      const index = oldState.findIndex((light) => light.id === newState.id);
      return [...oldState.slice(0, index), Object.assign({}, oldState[index], newState), ...oldState.slice(index + 1)];
    } else {
      return mapLights(newState);
    }
  }

  return [lights, updateLight];
}

function mapLights(newState) {
  if (newState?.[0]?.error !== undefined) {
    createToast("danger", t("hue.lights.error").replace("{0}", newState?.[0]?.error?.description));
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

const mockedLights = {
  1: {
    state: {
      on: true,
      bri: 254,
      hue: 14987,
      sat: 141,
      effect: "none",
      xy: [0.4573, 0.41],
      ct: 366,
      alert: "select",
      colormode: "ct",
      mode: "homeautomation",
      reachable: true,
    },
    swupdate: { state: "noupdates", lastinstall: "2022-12-08T13:23:12" },
    type: "Extended color light",
    name: "Ceiling lamp",
    modelid: "LCT007",
    manufacturername: "Signify Netherlands B.V.",
    productname: "Hue color lamp",
    capabilities: {
      certified: true,
      control: {
        mindimlevel: 2000,
        maxlumen: 800,
        colorgamuttype: "B",
        colorgamut: [
          [0.675, 0.322],
          [0.409, 0.518],
          [0.167, 0.04],
        ],
        ct: { min: 153, max: 500 },
      },
      streaming: { renderer: true, proxy: true },
    },
    config: {
      archetype: "sultanbulb",
      function: "mixed",
      direction: "omnidirectional",
      startup: { mode: "safety", configured: true },
    },
    uniqueid: "00:00:00:00:00:00:00:00-00",
    swversion: "67.101.2",
  },
  2: {
    state: {
      on: true,
      bri: 254,
      hue: 14987,
      sat: 141,
      effect: "none",
      xy: [0.4573, 0.41],
      ct: 366,
      alert: "select",
      colormode: "ct",
      mode: "homeautomation",
      reachable: true,
    },
    swupdate: { state: "noupdates", lastinstall: "2022-12-08T13:23:12" },
    type: "Extended color light",
    name: "Table lamp",
    modelid: "LCT007",
    manufacturername: "Signify Netherlands B.V.",
    productname: "Hue color lamp",
    capabilities: {
      certified: true,
      control: {
        mindimlevel: 2000,
        maxlumen: 800,
        colorgamuttype: "B",
        colorgamut: [
          [0.675, 0.322],
          [0.409, 0.518],
          [0.167, 0.04],
        ],
        ct: { min: 153, max: 500 },
      },
      streaming: { renderer: true, proxy: true },
    },
    config: {
      archetype: "sultanbulb",
      function: "mixed",
      direction: "omnidirectional",
      startup: { mode: "safety", configured: true },
    },
    uniqueid: "00:00:00:00:00:00:00:00-01",
    swversion: "67.101.2",
  },
  3: {
    state: {
      on: false,
      bri: 254,
      hue: 14987,
      sat: 141,
      effect: "none",
      xy: [0.4573, 0.41],
      ct: 366,
      alert: "select",
      colormode: "ct",
      mode: "homeautomation",
      reachable: true,
    },
    swupdate: { state: "noupdates", lastinstall: "2022-12-08T13:23:12" },
    type: "Extended color light",
    name: "Ceiling lamp",
    modelid: "LCT007",
    manufacturername: "Signify Netherlands B.V.",
    productname: "Hue color lamp",
    capabilities: {
      certified: true,
      control: {
        mindimlevel: 2000,
        maxlumen: 800,
        colorgamuttype: "B",
        colorgamut: [
          [0.675, 0.322],
          [0.409, 0.518],
          [0.167, 0.04],
        ],
        ct: { min: 153, max: 500 },
      },
      streaming: { renderer: true, proxy: true },
    },
    config: {
      archetype: "sultanbulb",
      function: "mixed",
      direction: "omnidirectional",
      startup: { mode: "safety", configured: true },
    },
    uniqueid: "00:00:00:00:00:00:00:00-02",
    swversion: "67.101.2",
  },
};
