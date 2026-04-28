import { getAllResults } from '../../common/js/storage.js';
import { renderLineChart } from './charts.js';




export function showMainDashboard(){
    console.log('Mostrando dashboard principal');

    document.getElementById('analysisContent').classList.remove('hidden');
    document.getElementById('dataTable').classList.add('hidden');
}

export function showDataTable(){
    console.log('Mostrando dashboard principal');

    document.getElementById('analysisContent').classList.add('hidden');
    document.getElementById('dataTable').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('overviewBtn').addEventListener('click', showMainDashboard);
    document.getElementById('dataTableBtn').addEventListener('click', showDataTable);
});