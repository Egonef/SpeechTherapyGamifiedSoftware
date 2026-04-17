/** Dinámica de VOCABULARIO */

// Hacemos una funcion para la dinamica de vocabulario, en concreto animales. tendremos que iterar por las imagenes de animales , mostrandolas una a una  de manera aleatoria, tambien habra un icono de audio donde se escuchara el sonid ocorrespondiente con la footo del animal , tambien abra una flecha para pasar al siguiente animal

import { animals } from "./data/lista.js";

function vocabulario() {

//Generamos un vector de animales dinámico  para iterar por ellos

const animalVector = animals.map(animal => ({
        name: animal,
        image: `./assets/images/${animal}.png`,
        audio: `./assets/audio/${animal}.m4a`
}));

let randomIndex = Math.floor(Math.random() * animalVector.length);

function mostrarAnimal(index) {
        const animal = animalVector[index];
        const container = document.getElementById('game-container');
        container.innerHTML = `
                <img src="${animal.image}" alt="${animal.name}" style="max-width:200px;">
                <button id="play-audio">🔊 Escuchar sonido</button>
                <button id="next-animal">➡️ Siguiente</button>
        `;

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
export default vocabulario;







