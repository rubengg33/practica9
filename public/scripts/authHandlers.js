export const handleRegister = async (event) => {
    event.preventDefault();
    console.log("Formulario enviado");
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
  
    const API_KEY = "AIzaSyAFZJ63l3c1xErKyYnzC12_EP1xkJCuW4Y"; 
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });
  
      const data = await response.json();
  
      if (data.idToken) {
        localStorage.setItem("token", data.idToken);
        alert("Registro exitoso");
        window.location.href = "/profile"; 
      } else {
        alert("Error: " + data.error.message);
      }
    } catch (error) {
      console.error("Error al registrar", error);
    }
  };
  
  export const handleLogin = async (event) => {
    event.preventDefault();
    console.log("Login enviado"); // Para depuración
  
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
  
    const API_KEY = "AIzaSyAFZJ63l3c1xErKyYnzC12_EP1xkJCuW4Y"; 
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });
  
      const data = await response.json();
  
      if (data.idToken) {
        localStorage.setItem("token", data.idToken);
        alert("Inicio de sesión exitoso");
        window.location.href = "/profile";
      } else {
        alert("Error: " + data.error.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };
  