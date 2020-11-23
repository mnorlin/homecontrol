import translations from "../config/translations.js";

export default function t(key) {
  const lang = navigator.language.toLowerCase();

  const langMap = translations.get(lang) || translations.get("en-us");

  return langMap.get(key) || key;
}
