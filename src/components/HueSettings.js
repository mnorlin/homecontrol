import React from "react";
import Input from "components/common/Input";
import useStorage from "hooks/useStorage";
import { Button } from "react-bootstrap-v5";
import t from "utils/translate";

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
      <Input label={t("hue.ip")} value={ip} onChange={(e) => saveIp(e.target.value)} />
      <Input
        label={t("hue.api-key")}
        value={username}
        onChange={(e) => saveUsername(e.target.value)}
        actionButton={
          <Button onClick={getNewToken} variant="primary">
            <i className="bi bi-link"></i>
          </Button>
        }
      />
      <small className="text-muted">
        {`${t("hue.generate-key")} `} <i className="bi bi-link"></i>
      </small>
    </>
  );
}
