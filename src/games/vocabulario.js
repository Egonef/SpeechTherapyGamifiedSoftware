/** Dinámica de VOCABULARIO */

// Hacemos una funcion para la dinamica de vocabulario, en concreto animales. tendremos que iterar por las imagenes de animales , mostrandolas una a una  de manera aleatoria, tambien habra un icono de audio donde se escuchara el sonid ocorrespondiente con la footo del animal , tambien abra una flecha para pasar al siguiente animal

import { animals } from "./data/lista.js";

export default function vocabulario() {

//Generamos un vector de animales dinámico  para iterar por ellos

const animalVector = animals.map(animal => ({
        name: animal,
        image: `./assets/animales/${animal}.png`,
        audio: `./sounds/animales/${animal}.m4a`
}));

let randomIndex = Math.floor(Math.random() * animalVector.length);

function mostrarAnimal(index) {
        const animal = animalVector[index];
        const container = document.getElementById('game-container');
container.innerHTML = `<div class="animal-card">
    <div class="animal-image-wrapper">
        <img src="${animal.image}" alt="${animal.name}" class="animal-image">
    </div>
    <div class="audio-controls">
        <button id="play-audio" class="play-audio">🔊 Escuchar sonido</button>
        <button id="next-animal" class="next-animal">➡️ Siguiente</button>
    </div>
</div>`;


        document.getElementById('play-audio').onclick = () => {
            const audio = new Audio(animal.audio);
            audio.play();
        };

        document.getElementById('next-animal').onclick = () => {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * animalVector.length);
            } while (nextIndex === index); // Evita repetir el mismo animal
            mostrarAnimal(nextIndex);
        };
    }

    // Mostrar el primer animal al iniciar
    mostrarAnimal(randomIndex);
}

// Exporta la función para usarla en tu app principal








