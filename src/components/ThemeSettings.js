import React, { useState, useEffect } from "react";
import useStorage from "hooks/useStorage";
import t from "utils/translate";

const watcher = window.matchMedia("(prefers-color-scheme: dark)");

export default function ThemeSettings({ rooms }) {
  const [theme, saveTheme] = useStorage("theme");

  useEffect(() => {
    setTheme(theme);
  }, [theme]); // eslint-disable-line

  function handleChange(e) {
    const value = e.target.value;
    saveTheme(value);
    setTheme(value);
  }

  return (
    <>
      <ThemeSelector onChange={handleChange} selected={theme} id="light" name={t("settings.theme.light")} />
      <ThemeSelector onChange={handleChange} selected={theme} id="dark" name={t("settings.theme.dark")} />
      <ThemeSelector onChange={handleChange} selected={theme} id="system" name={t("settings.theme.system")} />
    </>
  );
}

function ThemeSelector({ id, name, onChange, selected }) {
  return (
    <div className="form-check">
      <input
        onChange={onChange}
        checked={selected === id}
        className="form-check-input"
        type="radio"
        name="theme"
        id={`theme-${id}-radio`}
        value={id}
      />
      <label className="form-check-label" htmlFor={`theme-${id}-radio`}>
        {name}
      </label>
    </div>
  );
}

export function setTheme(id) {
  watcher.removeEventListener("change", onSchemeChange);

  switch (id) {
    case "light":
      setLight();
      break;
    case "dark":
      setDark();
      break;
    default:
      setSystem();
  }
}

function setLight() {
  document.documentElement.classList = "";
  document.documentElement.classList.add(`theme-light`);
}

function setDark() {
  document.documentElement.classList = "";
  document.documentElement.classList.add(`theme-dark`);
}

function setSystem() {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setDark();
  } else {
    setLight();
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    const newColorScheme = e.matches ? "dark" : "light";
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onSchemeChange);
}

function onSchemeChange(e) {
  e.matches ? setDark() : setLight();
}
