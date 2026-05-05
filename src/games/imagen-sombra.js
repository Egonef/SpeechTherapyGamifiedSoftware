
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
            <img src="${animal.image}" alt="${animal.name}" id="animal1" class="animal-image2" draggable="false">
        </div>
        <div class="animal-sombra">
            <div class="drop" data-correct="false" style="background-color: black; width: 350px; height: 250px; mask-image: url('${animal2.image}'); -webkit-mask-image: url('${animal2.image}'); mask-size: 350px; -webkit-mask-size: 350px; "></div>
            <div class="drop" data-correct="true" style="background-color: black; width: 350px; height: 250px; mask-image: url('${animal.image}'); -webkit-mask-image: url('${animal.image}'); mask-size: 350px; -webkit-mask-size: 350px;"></div>
            <div class="drop" data-correct="false" style="background-color: black; width: 350px; height: 250px; mask-image: url('${animal2.image}'); -webkit-mask-image: url('${animal2.image}'); mask-size: 350px; -webkit-mask-size: 350px;"></div>
            <div class="drop" data-correct="false" style="background-color: black; width: 350px; height: 250px; mask-image: url('${animal2.image}'); -webkit-mask-image: url('${animal2.image}'); mask-size: 350px; -webkit-mask-size: 350px;"></div>
        </div>
    </div>`;


    
    const draggable = document.getElementById("animal1");
    let offsetX, offsetY, isDragging = false;

    draggable.addEventListener('mousedown', (e) => {
        isDragging = true;
        draggable.style.position = 'absolute';
        draggable.style.zIndex = 1000;
        offsetX = e.clientX - draggable.getBoundingClientRect().left;
        offsetY = e.clientY - draggable.getBoundingClientRect().top;
        draggable.style.cursor = 'grabbing';
        draggable.style.width = '300px'
    });

    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        draggable.style.left = (e.clientX - 100) + 'px';
        console.log(e.clientX);
        console.log(e.clientY);
        draggable.style.top = (e.clientY - 100) + 'px';
        draggable.style.width = '300px';
    });
        
    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        draggable.style.cursor = 'grab';

        // Verifica si está sobre alguna silueta
        const drops = document.querySelectorAll('.drop');
        let dropped = false;
        drops.forEach(dropZone => {
            const rect = dropZone.getBoundingClientRect();
            const x = e.clientX, y = e.clientY;
            if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
                dropped = true;
                const isCorrect = dropZone.getAttribute('data-correct') === 'true';
                if (isCorrect) {
                    alert('¡Correcto!');
                    
                } else {
                    alert('Intenta de nuevo');
                    draggable.style.left = '';
                    draggable.style.top = '';
                    draggable.style.position = 'relative';
                    draggable.style.zIndex = '';
                }
            }
        });
        // Opcional: regresa la imagen a su sitio si no se soltó sobre ninguna silueta
        if (!dropped) {
            draggable.style.left = '';
            draggable.style.top = '';
            draggable.style.position = 'relative';
            draggable.style.zIndex = '';
        }
    });
    

    }

    // Mostrar el primer animal al iniciar
    mostrarAnimal(randomIndex1,randomIndex2);
}










