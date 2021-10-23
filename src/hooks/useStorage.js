import React, { useReducer, useState, useEffect } from "react";
import Input from "components/common/Input";
import { Button } from "react-bootstrap";
import { CloudUpload } from "react-bootstrap-icons";
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

  return [value, saveValue, updateValue];
}

export function DownloadButton({ onClick, ...props }) {
  function download() {
    const data = {};
    Object.entries(localStorage).forEach(([key, value]) => {
      data[key] = value.charAt(0) === "[" ? JSON.parse(value) : value;
    });

    const toSave = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const tmpNode = document.createElement("a");
    tmpNode.setAttribute("href", toSave);
    tmpNode.setAttribute("download", "home-control-data.json");
    tmpNode.click();
    tmpNode.remove();
    onClick?.();
  }
  return <Button onClick={download} {...props} />;
}

export function Import() {
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
      console.log("saving", key);
      localStorage.setItem(key, typeof value === "object" ? JSON.stringify(value) : value);
    });
  }

  return (
    <Input
      type="file"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label={
        <>
          <CloudUpload className="bi me-2" />
          {t("settings.import")}
        </>
      }
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
