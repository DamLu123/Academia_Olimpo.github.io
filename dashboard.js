function mostrarSeccion(id){

const secciones =
document.querySelectorAll(".seccion");

secciones.forEach(seccion=>{

seccion.classList.add("oculto");

});

document
.getElementById(id)
.classList.remove("oculto");

const botones =
document.querySelectorAll(".sidebar li");

botones.forEach(btn=>{

btn.classList.remove("active");

});

event.target.classList.add("active");

}

function cerrarSesion(){

const salir = confirm(
"¿Deseas cerrar sesión?"
);

if(salir){

window.location.href =
"login.html";

}

}

let publicaciones =
JSON.parse(
localStorage.getItem("publicaciones")
) || [];

function abrirModal(){

document.getElementById("modal")
.style.display="flex";

}

function cerrarModal(){

document.getElementById("modal")
.style.display="none";

}

function guardarPublicacion(){

const titulo =
document.getElementById("titulo").value;

const descripcion =
document.getElementById("descripcion").value;

const fecha =
document.getElementById("fecha").value;

if(
titulo==="" ||
descripcion==="" ||
fecha===""){
alert("Completa todos los campos");
return;
}

publicaciones.push({
titulo,
descripcion,
fecha
});

localStorage.setItem(
"publicaciones",
JSON.stringify(publicaciones)
);

mostrarPublicaciones();

cerrarModal();

document.getElementById("titulo").value="";
document.getElementById("descripcion").value="";
document.getElementById("fecha").value="";

}

function mostrarPublicaciones(){

const tbody =
document.querySelector(
"#tablaContenido tbody"
);

tbody.innerHTML="";

publicaciones.forEach((p,index)=>{

tbody.innerHTML += `
<tr>

<td>${p.titulo}</td>

<td>${p.descripcion}</td>

<td>${p.fecha}</td>

<td>

<button
class="btn-eliminar"
onclick="eliminarPublicacion(${index})">

Eliminar

</button>

</td>

</tr>
`;

});

}

function eliminarPublicacion(index){

if(confirm("¿Eliminar publicación?")){

publicaciones.splice(index,1);

localStorage.setItem(
"publicaciones",
JSON.stringify(publicaciones)
);

mostrarPublicaciones();

}

}

let eventos =
JSON.parse(
localStorage.getItem("eventos")
) || [];

function abrirModalEvento(){

document.getElementById("modalEvento")
.style.display="flex";

}

function cerrarModalEvento(){

document.getElementById("modalEvento")
.style.display="none";

}

function guardarEvento(){

const fecha =
document.getElementById("fechaEvento").value;

const nombre =
document.getElementById("nombreEvento").value;

if(fecha === "" || nombre === ""){

alert("Completa todos los campos");
return;

}

eventos.push({
fecha,
nombre
});

localStorage.setItem(
"eventos",
JSON.stringify(eventos)
);

mostrarEventos();

cerrarModalEvento();

}

function mostrarEventos(){

const tbody =
document.querySelector(
"#tablaEventos tbody"
);

tbody.innerHTML="";

eventos.forEach((evento,index)=>{

tbody.innerHTML += `

<tr>

<td>${evento.fecha}</td>

<td>${evento.nombre}</td>

<td>

<button
class="btn-eliminar"
onclick="eliminarEvento(${index})">

Eliminar

</button>

</td>

</tr>

`;

});

}

function eliminarEvento(index){

eventos.splice(index,1);

localStorage.setItem(
"eventos",
JSON.stringify(eventos)
);

mostrarEventos();

}

mostrarEventos();