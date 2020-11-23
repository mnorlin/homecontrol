import { useState, useEffect } from "react";

export default function Room({
  id,
  walls,
  lights,
  visualCanvas,
  hitboxCanvas,
}) {
  const [lightsOn, setLightsOn] = useState(false);
  const [reachable, setReachable] = useState(false);

  // Check if room should be marked as on
  useEffect(() => {
    let onCount = 0;
    let reachableCount = 0;
    lights.forEach((light) => {
      if (light.on) {
        onCount++;
      }

      if (light.reachable) {
        reachableCount++;
      }
    });

    onCount > 0 ? setLightsOn(true) : setLightsOn(false);
    reachableCount > 0 ? setReachable(true) : setReachable(false);
  }, [lights, lightsOn, reachable]);

  // Draw on light change
  useEffect(() => {
    function draw(target, boundries, fillStyle) {
      if (boundries.length === 0) {
        return;
      }
      const canvas = document.getElementById(target);
      const ctx = canvas.getContext("2d");

      ctx.lineWidth = 7;
      ctx.lineCap = "round";
      ctx.fillStyle = fillStyle;

      ctx.beginPath();

      ctx.moveTo(boundries[0].x, boundries[0].y);

      boundries.forEach((point) => {
        point.transparent && !fillStyle
          ? ctx.moveTo(point.x, point.y)
          : ctx.lineTo(point.x, point.y);
      });

      fillStyle ? ctx.fill() : ctx.stroke();
    }

    let roomColor = "rgb(255, 240, 240)";
    if (reachable) {
      roomColor = lightsOn ? "rgb(255, 255, 255)" : "rgb(230, 230, 230)";
    }
    draw(visualCanvas, walls, roomColor);
    draw(visualCanvas, walls);
    draw(hitboxCanvas, walls, `rgb(${reachable ? id : 0},0,0)`);
  }, [id, walls, lightsOn, reachable, visualCanvas, hitboxCanvas]);

  return null;
}
