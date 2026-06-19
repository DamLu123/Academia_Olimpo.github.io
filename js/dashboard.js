function mostrarSeccion(id, event){

const secciones =
document.querySelectorAll(".seccion");

secciones.forEach(seccion=>{
seccion.classList.add("oculto");
});

document.getElementById(id)
.classList.remove("oculto");

const botones =
document.querySelectorAll(".sidebar li");

botones.forEach(btn=>{
btn.classList.remove("active");
});

// ✔ ahora sí es seguro
if(event){
    event.target.classList.add("active");
}

if(id === "historial"){
    mostrarHistorial();
}

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

const titulo = document.getElementById("titulo").value;
const descripcion = document.getElementById("descripcion").value;
const fecha = document.getElementById("fecha").value;
const archivo = document.getElementById("archivo").files[0];
const plataforma = document.getElementById("plataforma").value;

let hoy = new Date().toISOString().split("T")[0];
let estado = (fecha > hoy) ? "Pendiente" : "Publicado";

if(titulo === "" || descripcion === "" || fecha === ""){
    alert("Completa todos los campos");
    return;
}

publicaciones.push({
    titulo,
    descripcion,
    fecha,
    plataforma,
    estado,
    archivo: archivo ? archivo.name : "Sin archivo",
    urlArchivo: archivo ? URL.createObjectURL(archivo) : null,
    tipoArchivo: archivo?.type || null
});

localStorage.setItem("publicaciones", JSON.stringify(publicaciones));

mostrarPublicaciones();
cerrarModal();

// limpiar formulario
document.getElementById("titulo").value = "";
document.getElementById("descripcion").value = "";
document.getElementById("fecha").value = "";
document.getElementById("archivo").value = "";

}


function mostrarPublicaciones(){

const tbody =
document.querySelector("#tablaContenido tbody");

tbody.innerHTML = "";

publicaciones.forEach((p, index) => {

tbody.innerHTML += `
<tr>

<td>${p.titulo}</td>

<td>${p.descripcion}</td>

<td>
    ${renderArchivo(p)}
</td>

<td>${p.plataforma}</td>

<td>${p.estado}</td>

<td>${p.fecha}</td>

<td>
    <button class="btn-eliminar"
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

function mostrarHistorial() {

    const contenedor = document.getElementById("contenedorHistorial");
    contenedor.innerHTML = "";

    let hoy = new Date().toISOString().split("T")[0];

    publicaciones.forEach((p) => {

       if (new Date(p.fecha) > new Date(hoy)) return;

        let autor = "Director";
        let alcance = Math.floor(Math.random() * 5000) + 100;
        let plataforma = p.plataforma;

        contenedor.innerHTML += `
            <div class="card-historial">

                <h3>${p.titulo}</h3>

                <p class="meta"> Autor: ${autor}</p>
                <p class="meta"> Fecha: ${p.fecha}</p>
                <p class="meta"> Alcance: ${alcance} visualizaciones</p>
                <p class="meta"> Plataforma: ${plataforma}</p>
                <p class="meta"> Archivo: ${renderArchivo(p)}</p>

            </div>
        `;
    });
}

window.onload = function(){
    mostrarPublicaciones();
};

function renderArchivo(p){

if(!p.urlArchivo) return "Sin archivo";

if(p.tipoArchivo?.startsWith("image/")){
    return `<img src="${p.urlArchivo}" width="80">`;
}

if(p.tipoArchivo?.startsWith("video/")){
    return `<video width="120" controls src="${p.urlArchivo}"></video>`;
}

return `<a href="${p.urlArchivo}" target="_blank">Ver archivo</a>`;
}