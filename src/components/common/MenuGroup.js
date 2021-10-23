import React from "react";
import { Accordion } from "react-bootstrap";

export default function MenuGroup({ groupName, children, id }) {
  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header>{groupName}</Accordion.Header>
      <Accordion.Collapse className="accordion-collapse" eventKey={id}>
        <div className="accordion-body">{children}</div>
      </Accordion.Collapse>
    </Accordion.Item>
  );
}
