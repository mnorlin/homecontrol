import React from "react";
export default function MenuGroup({ groupName, children }) {
  return (
    <div className="card card-body mb-4">
      <fieldset>
        <legend>{groupName}</legend>
        <hr />
        {children}
      </fieldset>
    </div>
  );
}
