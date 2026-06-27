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
container.innerHTML = `
    <div class="animal-card">
        <div class="animal-image-wrapper">
            <img src="${animal.image}" alt="${animal.name}" class="animal-image">
        </div>
        <div class="audio-controls">
            <button id="play-audio" class="play-audio">Play</button>
            <button id="record-audio" class="record-audio">Grabar</button>
            <button id="stop-recording" class="stop-recording" disabled>Parar</button>
            <button id="play-recording" class="play-recording" disabled>▶Escuchar</button>
            <button id="next-animal" class="next-animal">Sig</button>
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

    let mediaRecorder;
let audioChunks = [];
let audioUrl = null;

const recordBtn = document.getElementById('record-audio');
const stopBtn = document.getElementById('stop-recording');
const playRecBtn = document.getElementById('play-recording');

recordBtn.onclick = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            audioUrl = URL.createObjectURL(audioBlob);
            playRecBtn.disabled = false;
        };
        mediaRecorder.start();
        recordBtn.disabled = true;
        stopBtn.disabled = false;
        playRecBtn.disabled = true;
    } catch (err) {
        alert('No se pudo acceder al micrófono');
        console.error(err);
    }
};

stopBtn.onclick = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        recordBtn.disabled = false;
        stopBtn.disabled = true;
    }
};

playRecBtn.onclick = () => {
    if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
    }
};

    }

    // Mostrar el primer animal al iniciar
    mostrarAnimal(randomIndex);
}










