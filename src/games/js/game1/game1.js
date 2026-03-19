import './game1.ui.js';

const root = document.getElementById('game-root');
root.innerHTML = '<p>Juego 1 inicializado. (lógica mínima de ejemplo)</p>';

// Simula envío de resultado
import { addResult } from '../../common/js/storage.js';
document.addEventListener('visibilitychange', ()=>{
    if(document.hidden){
        addResult({userId:'child-01', game:'game1', level:1, score:50, date:new Date().toISOString()}).catch(()=>{});
    }
});
