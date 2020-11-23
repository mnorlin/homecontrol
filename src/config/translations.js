const translations = new Map([
  [
    "en-us",
    new Map([
      ["common.loading", "Loading..."],
      ["common.close", "Close"],
      ["common.settings", "Settings"],

      ["hue.ip", "Bridge IP"],
      ["hue.api-key", "API key"],
      [
        "hue.generate-key",
        "Generate a key by pressing the button on the Hue Bridge, and within 30s press ",
      ],
      [
        "hue.error.connect",
        "Can't connect to http://{0}, verify the IP to the Hue Bridge and that the devices are connected to the same network",
      ],
      ["hue.lights.error", "Error fetching lights, Hue bridge returned: '{0}'"],
      [
        "hue.sensors.error",
        "Error fetching sensors, Hue bridge returned: '{0}'",
      ],
      ["hue.rooms.error", "Error fetching rooms, Hue bridge returned: '{0}'"],

      ["lights.turn-on-all", "Turn lights on"],
      ["lights.turn-off-all", "Turn lights off"],

      ["floor-plan.warning.no-floor-plan", "No floor plan configured"],

      ["scene.name.morning", "Morning"],
      ["scene.name.forenoon", "Forenoon"],
      ["scene.name.afternoon", "Afternoon"],
      ["scene.name.evening", "Evening"],
      ["scene.name.night", "Night"],
      ["scenes.schedule.running", "Changing lights to {0}"],
      ["scenes.warning.none-set", "No scenes are configured"],

      ["settings.philips-hue", "Philips Hue"],
      ["settings.weather", "Weather"],
      ["settings.scenes", "Light Schedule"],
      ["settings.floor-plan", "Floor plan"],
      ["settings.floor-plan.rotation", "Rotation [deg]"],
      ["settings.temp-unit", "Temperature unit"],

      ["toast.title.success", "Success"],
      ["toast.title.info", "Info"],
      ["toast.title.warning", "Warning"],
      ["toast.title.danger", "Error"],

      ["weather.now", "Now"],
      ["weather.city-id", "City ID"],
      ["weather.api-key", "API key"],
      ["weather.register", "Visit {0} to register an API key"],
      [
        "weather.error.service-message",
        "Error fetching weather data, server responded: '{0}'",
      ],
      [
        "weather.error.connection",
        "Error fetching weather data, check your internet connection",
      ],
    ]),
  ],
  [
    "sv-se",
    new Map([
      ["common.loading", "Laddar..."],
      ["common.close", "Stäng"],
      ["common.settings", "Inställningar"],

      ["hue.ip", "IP-adress"],
      ["hue.api-key", "API-nyckel"],
      [
        "hue.generate-key",
        "Generera en nyckel genom att trycka på Hue bryggan, och inom 30s tryck ",
      ],
      [
        "hue.error.connect",
        "Kan inte ansluta till http://{0}, kontrollera IP:n till Hue bryggan och att enheterna är anslutna till samma nätverk",
      ],
      [
        "hue.lights.error",
        "Problem att hämta lampor, Hue bryggan svarade: '{0}'",
      ],
      [
        "hue.sensors.error",
        "Problem att hämta sensorer, Hue bryggan svarade: '{0}'",
      ],
      ["hue.rooms.error", "Problem att hämta rum, Hue bryggan svarade: '{0}'"],

      ["lights.turn-on-all", "Tänd lamporna"],
      ["lights.turn-off-all", "Släck lamporna"],

      ["floor-plan.warning.no-floor-plan", "Ingen planlösning konfigurerad"],

      ["scene.name.morning", "Morgon"],
      ["scene.name.forenoon", "Förmiddag"],
      ["scene.name.afternoon", "Eftermiddag"],
      ["scene.name.evening", "Kväll"],
      ["scene.name.night", "Natt"],
      ["scenes.schedule.running", "Ändrar lamporna till {0}"],
      ["scenes.warning.none-set", "Inga scener är konfigurerade"],

      ["settings.philips-hue", "Philips Hue"],
      ["settings.weather", "Väder"],
      ["settings.scenes", "Ljusschema"],
      ["settings.floor-plan", "Planlösning"],
      ["settings.floor-plan.rotation", "Rotation [deg]"],
      ["settings.temp-unit", "Temperaturenhet"],

      ["toast.title.success", "Lyckad"],
      ["toast.title.info", "Info"],
      ["toast.title.warning", "Varning"],
      ["toast.title.danger", "Fel"],

      ["weather.now", "Nu"],
      ["weather.city-id", "Stads ID"],
      ["weather.api-key", "API-nyckel"],
      ["weather.register", "Besök {0} för att registrera en API-nyckel"],
      [
        "weather.error.service-message",
        "Problem med att hämta väderdata, servern svarade: '{0}'",
      ],
      [
        "weather.error.connection",
        "Problem med att hämta väderdata, kontrollera internetanslutningen",
      ],
    ]),
  ],
]);

export default translations;
