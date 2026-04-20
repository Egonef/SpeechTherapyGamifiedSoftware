
import { animals } from "./data/lista.js";

export default function imagenSombra() {

//Generamos un vector de animales dinámico  para iterar por ellos

const animalVector = animals.map(animal => ({
        name: animal,
        image: `./assets/animales/${animal}.png`,
        audio: `./sounds/animales/${animal}.m4a`
}));

let randomIndex1 = Math.floor(Math.random() * animalVector.length);
let randomIndex2 = Math.floor(Math.random() * animalVector.length);

if (randomIndex1 === randomIndex2) {
    randomIndex2 = (randomIndex2 + 1) % animalVector.length;
}


function mostrarAnimal(index1, index2) {
    const animal = animalVector[index1];
    const animal2 = animalVector[index2];
    
    const container = document.getElementById('game-container');
container.innerHTML = `
    <div class="containerIS">
        <div class="animalDragContainer">
            <img src="${animal.image}" alt="${animal.name}" id="animal1" class="animal-image2">
        </div>
        <div class="animal-sombra">
            <div style="background-color: black; width: 400px; height: 300px; mask-image: url('${animal2.image}'); -webkit-mask-image: url('${animal2.image}'); mask-size: cover; -webkit-mask-size: cover;"></div>
            <div style="background-color: black; width: 400px; height: 300px; mask-image: url('${animal2.image}'); -webkit-mask-image: url('${animal2.image}'); mask-size: cover; -webkit-mask-size: cover;"></div>
            <div style="background-color: black; width: 400px; height: 300px; mask-image: url('${animal2.image}'); -webkit-mask-image: url('${animal2.image}'); mask-size: cover; -webkit-mask-size: cover;"></div>
            <div style="background-color: black; width: 400px; height: 300px; mask-image: url('${animal2.image}'); -webkit-mask-image: url('${animal2.image}'); mask-size: cover; -webkit-mask-size: cover;"></div>
        </div>
    </div>`;

    

    }

    // Mostrar el primer animal al iniciar
    mostrarAnimal(randomIndex1,randomIndex2);
}










