import React from "react";
import MenuGroup from "./common/MenuGroup";
import { Modal, ModalButton } from "./common/Modal";
import t from "../utils/translate";

export default function Settings({ children }) {
  function onClose() {
    window.location.reload();
  }

  return (
    <>
      <ModalButton>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-sliders me-2"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
          />
        </svg>
        {t("common.settings")}
      </ModalButton>

      <Modal title={t("common.settings")} onClose={onClose} btnText={t("common.close")}>
        <form noValidate className="my-4">
          {React.Children.map(children, (child) => (
            <MenuGroup groupName={child.props.title}>{child}</MenuGroup>
          ))}
        </form>
      </Modal>
    </>
  );
}
