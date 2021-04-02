const enUs = [
  "en-us",
  new Map([
    ["common.loading", "Loading..."],
    ["common.close", "Close"],
    ["common.settings", "Settings"],

    ["hue.ip", "Bridge IP"],
    ["hue.api-key", "API key"],
    ["hue.generate-key", "Generate a key by pressing the button on the Hue Bridge, and within 30s press "],
    [
      "hue.error.connect",
      "Can't connect to http://{0}, verify the IP to the Hue Bridge and that the devices are connected to the same network",
    ],
    ["hue.lights.error", "Error fetching lights, Hue bridge returned: '{0}'"],
    ["hue.sensors.error", "Error fetching sensors, Hue bridge returned: '{0}'"],
    ["hue.rooms.error", "Error fetching rooms, Hue bridge returned: '{0}'"],

    ["lights.turn-on-all", "Turn on"],
    ["lights.turn-off-all", "Turn off"],

    ["floor-plan.warning.no-floor-plan", "No floor plan configured"],
    ["form.error.custom.not-json", "This is not valid JSON data"],
    ["form.error.custom.not-array", "Data must be an array, eg. '[ ]'"],
    ["form.error.custom.no-coordinates", "Object must contain x and y properties"],
    ["form.error.custom.coordinate-not-number", "Coordinate must be a number"],
    ["form.error.html.rangeOverflow", "Value must be between 0-360"],
    ["scene.name.morning", "Morning"],
    ["scene.name.forenoon", "Forenoon"],
    ["scene.name.afternoon", "Afternoon"],
    ["scene.name.evening", "Evening"],
    ["scene.name.night", "Night"],
    ["scenes.schedule.running", "Changing lights to {0}"],
    ["scenes.warning.none-set", "No scenes are configured"],

    ["settings.philips-hue", "Philips Hue"],
    ["settings.weather", "Weather"],
    ["settings.control-section", "Ignored lights"],
    [
      "settings.control-section.ignored.desc",
      "Exclude 'lights' that should not be turned on/off when rooms are turned on/off.",
    ],
    ["settings.scenes", "Light Schedule"],
    ["settings.scenes.automatic", "Follow daylight"],
    ["settings.floor-plan", "Floor plan"],
    [
      "settings.floor-plan.instructions",
      `Data must be a JSON array containing objects with x & y properties, eg. [{ "x": 0, "y": 0 }, ...]`,
    ],
    ["settings.floor-plan.rotation", "Rotation"],
    ["settings.theme", "Theme"],
    ["settings.theme.light", "Light"],
    ["settings.theme.dark", "Dark"],
    ["settings.theme.system", "System"],
    ["settings.theme.night", "Dark theme during night"],

    ["settings.temp-unit", "Temperature unit"],
    ["settings.import", "Import settings"],
    ["settings.export", "export settings"],

    ["toast.title.success", "Success"],
    ["toast.title.info", "Info"],
    ["toast.title.warning", "Warning"],
    ["toast.title.danger", "Error"],

    ["weather.now", "Now"],
    ["weather.city-id", "City ID"],
    ["weather.api-key", "API key"],
    ["weather.register", "Visit {0} to register an API key"],
    ["weather.error.service-message", "Error fetching weather data, server responded: '{0}'"],
    ["weather.error.connection", "Error fetching weather data, check your internet connection"],
  ]),
];

export default enUs;
