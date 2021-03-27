import React, { useReducer, useState, useEffect } from "react";
import Input from "components/common/Input";
import { Button } from "react-bootstrap-v5";
import t from "utils/translate";

export default function useStorage(name, isJson) {
  const storedValue = localStorage.getItem(name);
  const [reducerValue, saveValue] = useReducer(
    isJson ? jsonReducer : reducer,
    isJson ? (storedValue ? JSON.parse(storedValue) : []) : localStorage.getItem(name)
  );

  const [value, updateValue] = useState(reducerValue);

  useEffect(() => {
    updateValue(reducerValue);
  }, [reducerValue]);

  function reducer(oldValue, newValue) {
    if (newValue === undefined || newValue === null) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, newValue);
    }
    return newValue;
  }

  function jsonReducer(oldValue, newValue) {
    if (newValue === undefined || newValue === null) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, JSON.stringify(newValue));
    }
    return newValue;
  }

  return [value, saveValue, storedValue, updateValue];
}

export function DownloadButton({ onClick, ...props }) {
  function download() {
    const data = {};
    Object.entries(localStorage).forEach(([key, value]) => {
      data[key] = value;
    });

    const toSave = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const tmpNode = document.createElement("a");
    tmpNode.setAttribute("href", toSave);
    tmpNode.setAttribute("download", "home-control-data.json");
    //document.body.appendChild(downloadAnchorNode); // required for firefox
    tmpNode.click();
    tmpNode.remove();
    onClick?.();
  }
  return <Button onClick={download} {...props} />;
}

export function Import() {
  const [feedback, setFeedback] = useState(null);
  const [value, setValue] = useState(null);

  function onValid(e) {
    parseJsonFile(e.target.files[0])
      .then((data) => {
        save(data);
      })
      .catch(() => {
        console.error("Something went wrong when saving");
      });
  }

  function save(data) {
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }

  return (
    <Input
      type="file"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label={t("settings.import")}
      validator={validate}
      onValid={onValid}
    />
  );
}

function parseJsonFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = onFinished;
    reader.readAsText(file);

    function onFinished(e) {
      try {
        resolve(JSON.parse(e.target.result));
      } catch (e) {
        reject();
      }
    }
  });
}

function validate(e) {
  return new Promise((resolve, reject) => {
    parseJsonFile(e.target.files[0])
      .then(() => {
        resolve([]);
      })
      .catch(() => reject(["not-json"]));
  });
}
