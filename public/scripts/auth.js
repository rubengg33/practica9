import { handleLogin, handleRegister } from "/scripts/authHandlers.js"; // Nuevo archivo donde definimos las funciones

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  if (form.getAttribute("onsubmit")?.includes("handleLogin")) {
    form.addEventListener("submit", handleLogin);
  } else if (form.getAttribute("onsubmit")?.includes("handleRegister")) {
    form.addEventListener("submit", handleRegister);
  }
});
