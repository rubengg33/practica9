const API_KEY = "AIzaSyAFZJ63l3c1xErKyYnzC12_EP1xkJCuW4Y"; // Reemplázalo con tu API Key de Firebase
const DATABASE_URL = "https://practica9-32729-default-rtdb.europe-west1.firebasedatabase.app/"; // Reemplázalo con tu URL de Firebase

// Referencias al DOM
const profileImage = document.getElementById("profileImage");
const uploadImage = document.getElementById("uploadImage");
const userEmail = document.getElementById("userEmail");

// ✅ Recuperar el token del usuario desde localStorage
const token = localStorage.getItem("token");

if (!token) {
  console.warn("No hay token en localStorage. Redirigiendo al login...");
  window.location.href = "/login";
}

// ✅ Obtener datos del usuario con la API REST de Firebase
async function getUserData() {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      }
    );

    const data = await response.json();

    if (data.users && data.users.length > 0) {
      const user = data.users[0];
      userEmail.textContent = `Correo: ${user.email}`;

      const userId = user.localId; // 🔥 Guardar el localId del usuario
      localStorage.setItem("firebaseUserId", userId);

      // 🔥 Obtener imagen desde Firebase Database
      await getProfileImageFromFirebase(userId);
    } else {
      console.warn("Token inválido o usuario no encontrado. Cerrando sesión...");
      logout();
    }
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    logout();
  }
}

// ✅ Función para obtener la imagen de Firebase Realtime Database
async function getProfileImageFromFirebase(userId) {
  try {
    const response = await fetch(`${DATABASE_URL}/users/${userId}.json`);
    const userData = await response.json();

    if (userData && userData.foto_perfil) {
      profileImage.src = userData.foto_perfil;
      localStorage.setItem(`profileImage-${userId}`, userData.foto_perfil);
    }
  } catch (error) {
    console.error("Error al obtener la imagen de perfil:", error);
  }
}

// ✅ Subir imagen de perfil y guardarla en Firebase
uploadImage.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function () {
    const base64Image = reader.result;
    const userId = localStorage.getItem("firebaseUserId");

    if (!userId) return console.error("No se encontró userId");

    // 🔥 Guardar la imagen en Firebase Database
    await fetch(`${DATABASE_URL}/users/${userId}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ foto_perfil: base64Image }),
    });

    // 🔥 Mostrar la imagen actualizada
    profileImage.src = base64Image;
    localStorage.setItem(`profileImage-${userId}`, base64Image);
  };
  reader.readAsDataURL(file);
});

// ✅ Cerrar sesión correctamente
function logout() {
  console.log("Cerrando sesión...");
  localStorage.removeItem("token");
  localStorage.removeItem("firebaseUserId");
  window.location.href = "/login";
}

// ✅ Llamar a la función al cargar la página
getUserData();

// ✅ Asignar logout al `window` para que el botón lo encuentre
window.logout = logout;
