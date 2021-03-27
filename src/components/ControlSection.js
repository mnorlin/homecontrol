import React from "react";
import SwitchInput from "components/common/SwitchInput";
import Loader from "components/common/Loader";
import useStorage from "hooks/useStorage";
import t from "utils/translate";

export function ControlSection({ rooms, updateLight, controlRef }) {
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

  return (
    <div className="mt-4">
      {rooms.map((room) => (
        <div key={room.id} className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            {room.name}
            {getRoomTemp(room)
              ? getRoomTemp(room).map((info, index) => (
                  <span key={index} className="ms-2 badge bg-light text-dark">
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

export function ControlSectionSettings({ rooms }) {
  const [ignored, setIgnored] = useStorage("lights-ignored", true); // TODO: use this setting

  function updateIgnored(id, ignore) {
    console.log(id, ignore);
    const newIgnore = Array.from(new Set(ignored));
    ignore ? setIgnored(newIgnore.concat(id)) : setIgnored(newIgnore.filter((ignore) => ignore !== id));
  }

  const switches = rooms.map((room, i) => (
    <div key={room.id}>
      {room.lights.map((light) => (
        <div key={light.id} className="my-2">
          <SwitchInput
            name={`${room.name} - ${light.name.replace(room.name, "")}`}
            checked={ignored.includes(light.id)}
            onChange={(e) => updateIgnored(light.id, e.target.checked)}
          />
        </div>
      ))}
      <hr />
    </div>
  ));

  return (
    <>
      {switches}
      <small className="text-muted">{t("settings.control-section.ignored.desc")}</small>
    </>
  );
}
