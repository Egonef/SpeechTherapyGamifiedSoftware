const burbujasContainer = document.getElementById("burbujas");
const caldero = document.getElementById("caldero");

let fase = 1;

// SVGs (cambia por tus rutas reales)
const burbujasFase1 = [
  "assets/b.svg",
  "assets/b.svg",
  "assets/b.svg",
  "assets/b.svg"
];

const burbujasFase2 = [
  "assets/b.svg",
  "assets/b.svg",
  "assets/b.svg",
  "assets/b.svg"
];

const textosFase1 = ["VOCABULARIO", "IMAGEN-SOMBRA", "VOCABULARIO II", "PARTE-TODO"];
const iconos = [
    ["assets/jirafa.svg", "assets/elefante.svg","assets/whale.svg"], ["assets/jirafa.svg", "assets/elefante.svg", "assets/elefante.svg"], ["assets/jirafa.svg", "assets/elefante.svg", "assets/elefante.svg"],  ["assets/jirafa.svg", "assets/elefante.svg", "assets/elefante.svg"]

];

let burbujaSeleccionadaF1= null;
let burbujaSeleccionadaF2= null;

// Crear burbujas //Estas burbujas las podria poner en el HTML 
function crearBurbujas(lista, textos) {
  burbujasContainer.innerHTML = "";

  lista.forEach((ruta, index) => {
    const div = document.createElement("div");
    div.classList.add("burbuja", `pos${index + 1}`);

    const img = document.createElement("img");
    img.src = ruta;

    const texto = document.createElement("span");
    texto.classList.add("texto-burbuja");
    texto.innerText = textos[index];

    div.appendChild(img);
    div.appendChild(texto);

    div.addEventListener("click", () => { burbujaSeleccionadaF1 = index + 1; 
      crearBurbujasFase2(burbujasFase2, iconos)
    } );
    


    burbujasContainer.appendChild(div);
  });
}

function crearBurbujasFase2(lista, iconos) {
  burbujasContainer.innerHTML = "";

  lista.forEach((ruta, index) => {
    const div = document.createElement("div");
    div.classList.add("burbuja", `pos${index + 1}`);

    // Imagen de fondo de la burbuja
    const img = document.createElement("img");
    img.src = ruta;
    div.appendChild(img);

    // Contenedor relativo para los iconos
    const filaIconos = document.createElement("div");
    filaIconos.classList.add("fila-iconos");
    filaIconos.style.position = "absolute";
    filaIconos.style.top = "0";
    filaIconos.style.left = "0";
    filaIconos.style.width = "100%";
    filaIconos.style.height = "100%";

    iconos[index].forEach((iconoRuta, i) => {
      const icono = document.createElement("img");
      icono.src = iconoRuta;
      icono.classList.add("icono-burbuja", `icono${i+1}`);
      filaIconos.appendChild(icono);
    });

    div.appendChild(filaIconos);
    div.addEventListener("click", () => manejarClick(burbujaSeleccionadaF1));
    burbujasContainer.appendChild(div);
  });
}


// Manejo de clics
function manejarClick(burbujaSeleccionadaF1) {

  switch (burbujaSeleccionadaF1) {
    case 1:
      alert("Has seleccionado VOCABULARIO");
      
      burbujasContainer.innerHTML = "";
      caldero.style.display = "none";
      break;
    case 2:
      alert("Has seleccionado IMAGEN-SOMBRA");
      burbujasContainer.innerHTML = "";
      caldero.style.display = "none";
      break;
    case 3:
      alert("Has seleccionado VOCABULARIO II");
      burbujasContainer.innerHTML = "";
      caldero.style.display = "none";
      break;
    case 4:
      alert("Has seleccionado PARTE-TODO");
      burbujasContainer.innerHTML = "";
      caldero.style.display = "none";
      break;
  }


}

// Iniciar juego
crearBurbujas(burbujasFase1, textosFase1);