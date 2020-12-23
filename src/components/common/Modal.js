import React from "react";
import t from "../../utils/translate";

export function Modal({ title, children, onClose, btnText }) {
  return (
    <div
      className="modal fade"
      id="settingsModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="settingsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="h5 modal-title" id="settingsModalLabel">
              {title}
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label={t("common.close")}></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button onClick={onClose} type="button" className="btn btn-primary">
              {btnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalButton({ children }) {
  return (
    <div className="text-center my-3">
      <button type="button" className="my-auto btn btn-link" data-bs-toggle="modal" data-bs-target="#settingsModal">
        {children}
      </button>
    </div>
  );
}
