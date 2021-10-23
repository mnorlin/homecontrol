import React from "react";
import Input from "components/common/Input";
import useStorage from "hooks/useStorage";
import { Button } from "react-bootstrap";
import t from "utils/translate";
import { Link } from "react-bootstrap-icons";

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
            <Link className="bi" />
          </Button>
        }
      />
      <small className="text-muted">
        {`${t("hue.generate-key")} `} <Link className="bi" />
      </small>
    </>
  );
}
