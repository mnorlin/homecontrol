// https://css-tricks.com/converting-color-spaces-in-javascript/
export function HSLToRGB(h, s, l) {
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return "rgb(" + r + "," + g + "," + b + ")";
}

export function getRedIn8bit(color) {
  if (color.includes("#")) {
    const redHex = color.trim().substring(1, 3);
    return parseInt(redHex, 16).toString();
  }

  if (color.includes("rgb")) {
    return color.split("(")[1].split(",");
  }

  if (color === "grey") {
    return "128"; // For some reason I get "grey" instead of #808080 on iOS devices from getPropertyValue()
  }
}

/*
export function bulbColor(hue, sat) {
  const hueDeg = (hue / 65535) * 360;
  //const satPercentage = (sat / 254) * 100;

  return `hsl(${hueDeg}, 100%, 50%)`;
}
*/

export function bulbBrightnessColor(bri) {
  const briPercentage = (bri / 254) * 255;

  return `rgb(${briPercentage}, ${briPercentage}, ${briPercentage})`;
}

export function normalizeFromBulb(model, hue, sat, bri) {
  let newHue = hue;
  if (model === "LCT001" || model === "LCT007") {
    newHue -= parseInt(6000 * (1 - hue / 65535));
  }
  return { hue: newHue, sat, bri };
}

export function normalizeToBulb(model, hue, sat, bri) {
  let newHue = hue;
  if ((model === "LCT001" || model === "LCT007") && hue < 40000) {
    newHue += parseInt(6000 / (1 - hue / 65535));
  }

  return { hue: newHue, sat, bri };
}
