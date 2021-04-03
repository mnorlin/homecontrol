import React from "react";
import t from "utils/translate";
import { ButtonGroup, Button } from "react-bootstrap-v5";
import { LightbulbFill, LightbulbOffFill } from "react-bootstrap-icons";

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
    <div className="button-section my-3 text-center">
      <ButtonGroup>
        <Button size="lg" variant="primary" disabled={!isLoaded} onClick={turnOnAll}>
          <LightbulbFill className="bi me-2" />
          {t("lights.turn-on-all")}
        </Button>

        <Button size="lg" variant="outline-secondary" disabled={!isLoaded} onClick={turnOffAll}>
          <LightbulbOffFill className="bi me-2" />
          {t("lights.turn-off-all")}
        </Button>
      </ButtonGroup>
    </div>
  );
}
