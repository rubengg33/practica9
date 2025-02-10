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