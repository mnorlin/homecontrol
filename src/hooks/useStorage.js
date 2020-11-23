import { useReducer } from "react";

export default function useStorage(name, isJson) {
  const storedValue = localStorage.getItem(name);
  const [value, saveValue] = useReducer(
    isJson ? jsonReducer : reducer,
    isJson
      ? storedValue
        ? JSON.parse(storedValue)
        : []
      : localStorage.getItem(name)
  );

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

  return [value, saveValue];
}
