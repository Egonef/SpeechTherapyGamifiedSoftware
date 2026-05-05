

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
            <img src="${animal.image}" alt="${animal.name}" id="animal1" >
            <img src="${animal2.image}" alt="${animal2.name}" id="animal2">
        </div>
        <div class="audio-controls">
            <button id="play-audio" class="play-audio">🔊</button>
            <button id="record-audio" class="record-audio">🎤</button>
            <button id="next-animal" class="next-animal">➡️</button>
        </div>
    </div>`;

    let animalNumber = Math.floor(Math.random() * (2 - 1 + 1) + 1); //Genenrmaos un numero aleatorio entre 1 y 2
    if (animalNumber === 1) {
        document.getElementById('play-audio').onclick = () => {
            const audio = new Audio(animal.audio);
            audio.play();
        };

        document.getElementById('animal1').onclick = () => {
            alert("¡Correcto! Has seleccionado el animal correcto.");
            let randomIndex1 = Math.floor(Math.random() * animalVector.length);
            let randomIndex2 = Math.floor(Math.random() * animalVector.length);

            if (randomIndex1 === randomIndex2) {
                randomIndex2 = (randomIndex2 + 1) % animalVector.length;
            }
            mostrarAnimal(randomIndex1, randomIndex2);
        };

        document.getElementById('animal2').onclick = () => {
            alert("¡Incorrecto! Inténtalo de nuevo.");
        };

    } else {
        document.getElementById('play-audio').onclick = () => {
            const audio = new Audio(animal2.audio);
            audio.play();
        };
    }

    }

    // Mostrar el primer animal al iniciar
    mostrarAnimal(randomIndex1,randomIndex2);
}










