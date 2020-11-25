const sceneButtons = [
  {
    id: 1,
    name: "scene.name.morning",
    icon: "morning.svg",
    state: { bri: 254, hue: 41432, sat: 75 },
    schedule: {
      time: "05:00",
    },
  },
  {
    id: 2,
    name: "scene.name.forenoon",
    icon: "forenoon.svg",
    state: { bri: 254, hue: 39391, sat: 14 },
    schedule: {
      time: "08:00",
    },
  },
  {
    id: 3,
    name: "scene.name.afternoon",
    icon: "afternoon.svg",
    state: { bri: 254, hue: 8595, sat: 121 },
    schedule: {
      time: "12:00",
    },
  },
  {
    id: 4,
    name: "scene.name.evening",
    icon: "evening.svg",
    state: { bri: 254, hue: 7688, sat: 199 },
    schedule: {
      time: "18:00",
    },
  },
  {
    id: 5,
    name: "scene.name.night",
    icon: "night.svg",
    state: { bri: 144, hue: 7688, sat: 199 },
    schedule: {
      time: "21:00",
    },
  },
];

export default sceneButtons;
