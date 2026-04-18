

import { animals } from "./data/lista.js";

export default function vocabularioII() {

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
    <div class="animal-card">
        <div class="animal-image-wrapper">
            <img src="${animal.image}" alt="${animal.name}" class="animal-image">
            <img src="${animal2.image}" alt="${animal2.name}" class="animal-image">
        </div>
        <div class="audio-controls">
            <button id="play-audio" class="play-audio">🔊</button>
            <button id="record-audio" class="record-audio">🎤</button>
            <button id="next-animal" class="next-animal">➡️</button>
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










