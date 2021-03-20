import React from "react";
import TextInput from "components/common/TextInput";
import useStorage from "hooks/useStorage";
import { Button } from "react-bootstrap-v5";
import t from "utils/translate";

const linkIcon = (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    className="bi bi-link"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
    <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
  </svg>
);

export function HueSettings() {
  const [ip, saveIp] = useStorage("hue-ip");
  const [username, saveUsername] = useStorage("hue-username");

  function getNewToken() {
    const payLoad = {
      devicetype: "homecontrol",
    };
    fetch(`http://${ip}/api`, {
      method: "POST",
      body: JSON.stringify(payLoad),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((res) => saveUsername(res[0]?.success?.username));
  }
  return (
    <>
      <TextInput name={t("hue.ip")} value={ip || ""} onChange={(e) => saveIp(e.target.value)} />
      <TextInput
        name={t("hue.api-key")}
        value={username || ""}
        onChange={(e) => saveUsername(e.target.value)}
        actionButton={
          <Button onClick={getNewToken} variant="outline-primary">
            <i className="bi bi-link"></i>
          </Button>
        }
      />
      <small className="text-muted">
        {`${t("hue.generate-key")} `} {linkIcon}
      </small>
    </>
  );
}
