import React, { useState } from "react";
import MenuGroup from "components/common/MenuGroup";
import { Modal, Button } from "react-bootstrap-v5";
import t from "utils/translate";

export default function Settings({ children }) {
  const [show, setShow] = useState(false);

  function onClose() {
    window.location.reload();
  }

  const handleClose = () => window.location.reload();
  const handleShow = () => setShow(true);

  return (
    <div className="text-center">
      <Button variant="link" onClick={handleShow}>
        <i className="bi bi-sliders me-2"></i>
        {t("common.settings")}
      </Button>

      <Modal show={show} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>{t("common.settings")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form noValidate className="my-4">
            {React.Children.map(children, (child) => (
              <MenuGroup groupName={child.props.title}>{child}</MenuGroup>
            ))}
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={onClose}>{t("common.close")}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
