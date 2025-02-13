document.addEventListener("DOMContentLoaded", () => {
    const profileLink = document.getElementById("profileLink");
    if (!profileLink) return;

    const token = localStorage.getItem("token");

    if (token) {
        profileLink.href = "/profile"; // 🔹 Si está logueado, va a perfil
    } else {
        profileLink.href = "/register"; // 🔹 Si no está logueado, va a registro
    }
});
document.getElementById('cartButton').addEventListener('click', () => {
    const cartMenu = document.getElementById('cartMenu');
    // Toggle para mostrar u ocultar el menú desplegable
    cartMenu.classList.toggle('hidden');
  });