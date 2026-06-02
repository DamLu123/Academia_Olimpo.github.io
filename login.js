const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",(e)=>{

e.preventDefault();

const usuario =
document.getElementById("usuario").value;

const password =
document.getElementById("password").value;

if(usuario === "director" &&
password === "olimpo2026"){

alert("Bienvenido");

window.location.href="dashboard.html";

}else{

alert("Usuario o contraseña incorrectos");

}

});

}

const registroForm =
document.getElementById("registroForm");

if(registroForm){

registroForm.addEventListener("submit",(e)=>{

e.preventDefault();

const pass1 =
document.getElementById("nuevaPassword").value;

const pass2 =
document.getElementById("confirmarPassword").value;

if(pass1 !== pass2){

alert("Las contraseñas no coinciden");
return;

}

alert("Cuenta creada correctamente");

window.location.href="login.html";

});

}