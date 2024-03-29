const svSe = [
  "sv-se",
  new Map([
    ["common.loading", "Laddar..."],
    ["common.close", "Stäng"],
    ["common.settings", "Inställningar"],

    ["hue.ip", "IP-adress"],
    ["hue.api-key", "API-nyckel"],
    ["hue.generate-key", "Generera en nyckel genom att trycka på Hue bryggan, och inom 30s tryck "],
    [
      "hue.error.connect",
      "Kan inte ansluta till http://{0}, kontrollera IP:n till Hue bryggan och att enheterna är anslutna till samma nätverk",
    ],
    ["hue.lights.error", "Problem att hämta lampor, Hue bryggan svarade: '{0}'"],
    ["hue.sensors.error", "Problem att hämta sensorer, Hue bryggan svarade: '{0}'"],
    ["hue.rooms.error", "Problem att hämta rum, Hue bryggan svarade: '{0}'"],

    ["lights.turn-on-all", "Tänd"],
    ["lights.turn-off-all", "Släck"],

    ["floor-plan.warning.no-floor-plan", "Ingen planlösning konfigurerad"],
    ["form.error.custom.not-json", "Detta är inte giltig JSON data"],
    ["form.error.custom.not-array", "Data måste vara en array, '[ ]'"],
    ["form.error.custom.no-coordinates", "Objektet måste innehålla x och y värden"],
    ["form.error.custom.invalid-ip", "Inte en giltig IP-adress"],
    ["form.error.custom.coordinate-not-number", "Koordinaterna måste vara siffror"],
    ["form.error.html.rangeOverflow", "Värdet måste vara mellan 0-360"],
    ["scene.name.morning", "Morgon"],
    ["scene.name.forenoon", "Förmiddag"],
    ["scene.name.afternoon", "Eftermiddag"],
    ["scene.name.evening", "Kväll"],
    ["scene.name.night", "Natt"],
    ["scenes.schedule.running", "Ändrar lamporna till {0}"],
    ["scenes.warning.none-set", "Inga scener är konfigurerade"],

    ["settings.philips-hue", "Philips Hue"],
    ["settings.weather", "Väder"],
    ["settings.control-section", "Ignorerade lampor"],
    ["settings.control-section.ignored.desc", "Exkludera 'lampor' som inte ska slås på/av när rum tänds/släcks."],
    ["settings.scenes", "Ljusschema"],
    ["settings.scenes.schedule", "Schemalägg scener"],
    ["settings.scenes.automatic", "Följ dagsljuset"],
    ["settings.floor-plan", "Planlösning"],
    [
      "settings.floor-plan.instructions",
      `Datan måste vara en JSON array innehållandes objekt med x och y data, ex. [{ "x": 0, "y": 0 }, ...]`,
    ],
    ["settings.floor-plan.rotation", "Rotation"],
    ["settings.theme", "Tema"],
    ["settings.theme.light", "Ljust"],
    ["settings.theme.dark", "Mörkt"],
    ["settings.theme.system", "System"],
    ["settings.theme.night", "Mörkt tema under natten"],

    ["settings.temp-unit", "Temperaturenhet"],
    ["settings.import", "Importera inställningar"],
    ["settings.export", "Exportera inställningar"],

    ["toast.title.success", "Lyckad"],
    ["toast.title.info", "Info"],
    ["toast.title.warning", "Varning"],
    ["toast.title.danger", "Fel"],

    ["weather.now", "Nu"],
    ["weather.city-id", "Stads ID"],
    ["weather.api-key", "API-nyckel"],
    ["weather.register", "Besök {0} för att registrera en API-nyckel"],
    ["weather.error.service-message", "Problem med att hämta väderdata, servern svarade: '{0}'"],
    ["weather.error.connection", "Problem med att hämta väderdata, kontrollera internetanslutningen"],
  ]),
];

export default svSe;
