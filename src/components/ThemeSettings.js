import React, { useEffect } from "react";
import useStorage from "hooks/useStorage";
import t from "utils/translate";
import { getTimeUntilHour } from "utils/timeUtils";

const watcher = window.matchMedia("(prefers-color-scheme: dark)");

export default function ThemeSettings() {
  const [theme, saveTheme] = useStorage("theme");
  const setTheme = useTheme();

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
      <ThemeSelector onChange={handleChange} selected={theme} id="night" name={t("settings.theme.night")} />
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

export function useTheme() {
  const [scenes] = useStorage("hue-scenes", true);
  const [savedTheme] = useStorage("theme");

  return (theme = savedTheme) => {
    watcher.removeEventListener?.("change", onSchemeChange); // Make it work in old browsers

    switch (theme) {
      case "light":
        setLight();
        break;
      case "dark":
        setDark();
        break;
      case "night":
        setNight(
          scenes.find((s) => s.name === "scene.name.night").schedule.time,
          scenes.find((s) => s.name === "scene.name.morning").schedule.time
        );
        break;
      default:
        setSystem();
    }
  };
}

function setLight() {
  document.documentElement.classList = "";
  document.documentElement.classList.add(`theme-light`);
}

function setDark() {
  document.documentElement.classList = "";
  document.documentElement.classList.add(`theme-dark`);
}

function setNight(timeStart, timeEnd) {
  if (timeEnd && timeStart) {
    const beginIn = getTimeUntilHour(timeStart);
    const endIn = getTimeUntilHour(timeEnd);

    /* 
      No need to clear the timers, as every time the settings change,
      we refresh the page, and setTheme() is only called
      in App.js on first render.
    */

    if (beginIn > endIn) {
      setDark();
    } else {
      setLight();
    }

    setTimeout(() => {
      setDark();
      setInterval(() => {
        setDark();
      }, 1000 * 60 * 60 * 24);
    }, beginIn);

    setTimeout(() => {
      setInterval(() => {
        setLight();
      }, 1000 * 60 * 60 * 24);

      setLight();
    }, endIn);
  }
}

function setSystem() {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    setDark();
  } else {
    setLight();
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", onSchemeChange);
}

function onSchemeChange(e) {
  e.matches ? setDark() : setLight();
}
