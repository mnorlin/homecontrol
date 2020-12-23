import React from "react";
import SwitchInput from "./common/SwitchInput";
import Loader from "./common/Loader";

export default function ControlSection({ rooms, updateLight }) {
  if (rooms.length === 0) {
    return (
      <div className="mt-4">
        <Loader />
      </div>
    );
  }

  function getRoomTemp(room) {
    return room.sensors
      .filter((sensors) => sensors.type === "ZLLTemperature")
      .map((sensor) => sensor.temp + sensor.tempUnit);
  }

  const hasFloorPlan = rooms.find((room) => room.walls?.length > 0);

  return (
    <div id="control-section" className={`control-section mt-4 ${hasFloorPlan ? "collapse" : "collapse show"}`}>
      {rooms.map((room) => (
        <div key={room.id} className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            {room.name}
            {getRoomTemp(room)
              ? getRoomTemp(room).map((info, index) => (
                  <span key={index} className="ms-2 badge bg-secondary">
                    {info}
                  </span>
                ))
              : undefined}
          </div>
          <ul className="list-group list-group-flush">
            {room.lights.map((light) => (
              <li key={light.id} className="list-group-item">
                <SwitchInput
                  name={light.name.replace(room.name, "")}
                  checked={light.reachable ? light.on : false}
                  disabled={!light.reachable}
                  onChange={() => updateLight(light.id, { on: !light.on })}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
