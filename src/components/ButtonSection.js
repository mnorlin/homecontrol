import React from "react";
import t from "../utils/translate";

export default function ButtonSection({ lights, updateLight }) {
  function turnOnAll() {
    lights.forEach((light) => {
      updateLight(light.id, { on: true });
    });
  }

  function turnOffAll() {
    lights.forEach((light) => {
      updateLight(light.id, { on: false });
    });
  }

  const isLoaded = lights.length > 0;

  return (
    <div className="button-section d-flex">
      <div className="btn-group my-3 mx-auto">
        <button
          disabled={!isLoaded}
          onClick={turnOnAll}
          className="btn btn-lg btn-light"
        >
          {t("lights.turn-on-all")}
        </button>

        <button
          disabled={!isLoaded}
          onClick={turnOffAll}
          className="btn btn-lg btn-secondary"
        >
          {t("lights.turn-off-all")}
        </button>
      </div>
    </div>
  );
}
