// storage.js - pequeña capa para persistencia con IndexedDB
const DB_NAME = 'tfg_db';
const DB_VERSION = 1;
const STORE_RESULTS = 'results';

function openDB(){
    return new Promise((resolve, reject)=>{
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = ()=>{
            const db = req.result;
            if(!db.objectStoreNames.contains(STORE_RESULTS)){
                db.createObjectStore(STORE_RESULTS, {keyPath:'id', autoIncrement:true});
            }
        };
        req.onsuccess = ()=>resolve(req.result);
        req.onerror = ()=>reject(req.error);
    });
}

export async function addResult(obj){
    const db = await openDB();
    return new Promise((resolve,reject)=>{
        const tx = db.transaction(STORE_RESULTS,'readwrite');
        const store = tx.objectStore(STORE_RESULTS);
        const r = store.add(obj);
        r.onsuccess = ()=>resolve(r.result);
        r.onerror = ()=>reject(r.error);
    });
}

export async function getAllResults(){
    const db = await openDB();
    return new Promise((resolve,reject)=>{
        const tx = db.transaction(STORE_RESULTS,'readonly');
        const store = tx.objectStore(STORE_RESULTS);
        const r = store.getAll();
        r.onsuccess = ()=>resolve(r.result);
        r.onerror = ()=>reject(r.error);
    });
}

export async function clearResults(){
    const db = await openDB();
    return new Promise((resolve,reject)=>{
        const tx = db.transaction(STORE_RESULTS,'readwrite');
        const store = tx.objectStore(STORE_RESULTS);
        const r = store.clear();
        r.onsuccess = ()=>resolve();
        r.onerror = ()=>reject(r.error);
    });
}
