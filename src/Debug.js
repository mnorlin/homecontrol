import React from "react";

export default function Debug({ lights, sensors, rooms, weatherProps }) {
  const browser = {};
  browser["language"] = window.navigator.language;
  browser["languages"] = window.navigator.languages;
  browser["userAgent"] = window.navigator.userAgent;

  const secrets = ["hue-username", "weather-city", "weather-key"];
  const config = {};
  Object.keys(localStorage).forEach(function (key) {
    const data = secrets.includes(key) ? "*****" : localStorage.getItem(key);
    config[key] = data.charAt(0) === "[" ? JSON.parse(data) : data;
  });

  const data = {};
  data["lights"] = lights;
  data["sensors"] = sensors;
  data["rooms"] = rooms;
  data["weather"] = weatherProps;

  return (
    <div className="container">
      <h1>Debug mode</h1>

      <div className="card my-4">
        <h2 className="card-header h5">Browser</h2>
        <pre className="card-body">{JSON.stringify(browser, null, 2)}</pre>
      </div>

      <div className="card my-4">
        <h2 className="card-header h5">Config</h2>
        <pre className="card-body">{JSON.stringify(config, null, 2)}</pre>
      </div>

      <div className="card my-4">
        <h2 className="card-header h5">Data</h2>
        <pre className="card-body">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
