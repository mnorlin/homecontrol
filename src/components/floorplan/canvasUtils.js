import { matrix, multiply } from "mathjs";

export function getRedPixelValue(e, canvasId, canvasWrapperId) {
  const canvasWrapper = document.getElementById(canvasWrapperId);
  const ctx = document.getElementById(canvasId).getContext("2d");

  let mousePos = getMousePos(e, canvasWrapper);
  mousePos = compensateRotation(mousePos, canvasWrapper);
  mousePos = compensateScaling(mousePos, canvasWrapper);
  //console.log(`${mousePos.x}, ${mousePos.y}`);

  const pixel = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;

  return pixel[0].toString();
}

function getMousePos(e, canvasWrapper) {
  return {
    x: parseInt(e.clientX - canvasWrapper.getBoundingClientRect().left),
    y: parseInt(e.clientY - canvasWrapper.getBoundingClientRect().top),
  };
}

function compensateRotation(mousePos, canvasWrapper) {
  let angle = canvasWrapper.style.transform?.split("rotate(")?.[1]?.split("deg")?.[0] / 360;

  if (angle === undefined) {
    const matrixString = window.getComputedStyle(canvasWrapper, null).getPropertyValue("transform");

    const ta = matrixString.split("(")[1].split(")")[0].split(", ");

    angle = Math.acos(ta[0]);
  }

  const rotationMatrix = matrix([
    [Math.cos(angle), Math.sin(angle)],
    [-Math.sin(angle), Math.cos(angle)],
  ]);

  const cx = canvasWrapper.getBoundingClientRect().width / 2;
  const cy = canvasWrapper.getBoundingClientRect().height / 2;

  const positionArray = multiply(rotationMatrix, [mousePos.x - cx, mousePos.y - cy]);

  return {
    x: positionArray.get([0]) + canvasWrapper.clientWidth / 2,
    y: positionArray.get([1]) + canvasWrapper.clientHeight / 2,
  };
}

function compensateScaling(mousePos, canvasWrapper) {
  const cssScaling = canvasWrapper.style.width.replace("px", "") / canvasWrapper.clientWidth;

  return {
    x: cssScaling * parseInt(mousePos.x),
    y: cssScaling * parseInt(mousePos.y),
  };
}
