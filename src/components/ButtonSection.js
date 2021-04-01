import React from "react";
import t from "utils/translate";
import { ButtonGroup, Button } from "react-bootstrap-v5";

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
          <i className="bi bi-lightbulb-fill me-2"></i>
          {t("lights.turn-on-all")}
        </Button>

        <Button size="lg" variant="secondary" disabled={!isLoaded} onClick={turnOffAll}>
          <i className="bi bi-lightbulb-off-fill me-2"></i>

          {t("lights.turn-off-all")}
        </Button>
      </ButtonGroup>
    </div>
  );
}
