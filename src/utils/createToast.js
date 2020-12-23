import { Toast } from "bootstrap";
import { v4 as uuidv4 } from "uuid";
import t from "../utils/translate";

export default function createToast(type, message, delay = 10000) {
  addEventListener();
  if (isUnique(type, message)) {
    const event = new CustomEvent("toast", {
      detail: { type, message, delay },
    });
    document.dispatchEvent(event);
  } else {
    console.debug(`Duplicate toast messages: [${type}] ${message}`);
  }
}

function isUnique(type, message) {
  const toastElList = [].slice.call(document.querySelectorAll(".toast"));
  for (const toastEl of toastElList) {
    if (Number(toastEl.dataset.hash) === hashCode(type + message)) {
      return false;
    }
  }

  return true;
}

function addEventListener() {
  const toastListener = (e) => {
    const toastEl = addToDOM(e.detail.type, e.detail.message);

    const toast = new Toast(toastEl, {
      autohide: e.detail.delay ? true : false,
      delay: e.detail.delay || 10000,
    });
    toast.show();
    if (e.detail.delay) {
      toastEl.addEventListener("hidden.bs.toast", function () {
        toastEl.remove();
      });
    }
  };

  if (!document.body.getAttribute("data-toasted")) {
    document.body.setAttribute("data-toasted", true);
    document.addEventListener("toast", toastListener);
  }
}

function addToDOM(type, message) {
  const title = t(`toast.title.${type}`);

  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");
  toast.setAttribute("data-id", uuidv4());
  toast.setAttribute("data-hash", hashCode(type + message));

  const toastHeader = document.createElement("div");
  toastHeader.classList.add("toast-header");

  const toastType = document.createElement("div");
  toastType.classList.add("me-2", "rounded", "toast-type", `bg-${type}`);

  const toastTitle = document.createElement("strong");
  toastTitle.classList.add("me-auto");
  toastTitle.innerText = title;

  const closeButton = document.createElement("button");
  closeButton.setAttribute("type", "button");
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("data-bs-dismiss", "toast");
  closeButton.setAttribute("aria-label", "Close");

  const toastBody = document.createElement("div");
  toastBody.classList.add("toast-body");
  toastBody.innerText = message;

  toastHeader.appendChild(toastType);
  toastHeader.appendChild(toastTitle);
  toastHeader.appendChild(closeButton);

  toast.appendChild(toastHeader);
  toast.appendChild(toastBody);

  document.getElementById("toast-section").appendChild(toast);

  return toast;
}

function hashCode(string) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}
