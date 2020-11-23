import React from "react";
import t from "../../utils/translate";

export default function Loader({ small }) {
  return (
    <div className="text-center">
      <div
        className={`m-1 spinner-border ${small ? "spinner-border-sm" : ""}`}
        role="status"
      >
        <span className="visually-hidden">{t("common.loading")}</span>
      </div>
    </div>
  );
}
