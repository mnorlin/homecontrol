export function debugLights(lights) {
  console.table(
    lights.reduce((result, light) => {
      result[light.id] = { ...light };
      delete result[light.id].id;
      return result;
    }, {})
  );
}
