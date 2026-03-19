// audio.js - utilidades para reproducir sonidos (placeholder)
export function playSound(url){
    const a = new Audio(url);
    a.play().catch(()=>{});
}
