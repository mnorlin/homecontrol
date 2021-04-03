import React, { useState } from "react";
import MenuGroup from "components/common/MenuGroup";
import { Modal, Button, Accordion } from "react-bootstrap-v5";
import { DownloadButton, Import } from "hooks/useStorage";
import t from "utils/translate";
import { Sliders, CloudDownload } from "react-bootstrap-icons";

export default function Settings({ children }) {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  function onClose() {
    window.location.reload();
  }

  const handleClose = () => window.location.reload();
  const handleShow = () => setShow(true);

  return (
    <div className="text-center">
      <Button variant="link" onClick={handleShow}>
        <Sliders className="bi me-2" />
        {t("common.settings")}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("common.settings")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form noValidate className="my-4">
            <Accordion onSelect={(e) => setSelectedId(e)}>
              {React.Children.map(children, (child) => (
                <MenuGroup groupName={child.props.title} selectedId={selectedId} id={child.props.title}>
                  {child}
                </MenuGroup>
              ))}
            </Accordion>
          </form>
          <Import />
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <DownloadButton variant="link">
            <CloudDownload className="bi me-2" />
            {t("settings.export")}
          </DownloadButton>

          <Button variant="outline-secondary" onClick={onClose}>
            {t("common.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
