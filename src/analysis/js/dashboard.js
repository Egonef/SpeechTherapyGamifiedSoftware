import { getAllResults } from '../../common/js/storage.js';
import { renderLineChart } from './charts.js';

const ctx = document.getElementById('chart').getContext('2d');

async function loadAndRender(){
    let results = [];
    try{
        results = await getAllResults();
    }catch(e){
        console.warn('IndexedDB no disponible o vacío, intentando fixtures');
    }

    if(!results || results.length===0){
        if(window.SAMPLE_RESULTS && Array.isArray(window.SAMPLE_RESULTS)){
            results = window.SAMPLE_RESULTS;
        } else {
            // final fallback: empty
            results = [];
        }
    }

    const labels = results.map(r => new Date(r.date).toLocaleString());
    const data = results.map(r => r.score || 0);
    renderLineChart(ctx, {labels, data});
}

document.getElementById('btn-refresh').addEventListener('click', loadAndRender);
loadAndRender();
