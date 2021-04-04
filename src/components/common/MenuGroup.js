import React from "react";
import { Accordion, useAccordionToggle } from "react-bootstrap-v5";

// TODO: Cleanup when react-bootstrap has better Bootstrap 5 support
export default function MenuGroup({ groupName, children, id, selectedId }) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <CustomToggle selectedId={selectedId} eventKey={id}>
          {groupName}
        </CustomToggle>
      </h2>
      <Accordion.Collapse className="accordion-collapse" eventKey={id}>
        <div className="accordion-body">{children}</div>
      </Accordion.Collapse>
    </div>
  );
}
function CustomToggle({ children, eventKey, selectedId }) {
  const decoratedOnClick = useAccordionToggle(eventKey, (e) => {
    e.preventDefault();
  });

  return (
    <button className={`accordion-button ${selectedId !== eventKey && "collapsed"}`} onClick={decoratedOnClick}>
      {children}
    </button>
  );
}
