
export let locale = 'es';
let dict = {};

function interp(str, vars){
    if(!vars) return str;
    return Object.keys(vars).reduce((s,k)=> s.replace(new RegExp(`{{${k}}}`,'g'), vars[k]), str);
}

async function loadLocale(loc){
    try{
        const base = new URL('../../locales/', import.meta.url);
        const res = await fetch(new URL(`${loc}.json`, base));
        if(!res.ok) throw new Error('no locale');
        dict = await res.json();
        locale = loc;
    }catch(e){
        console.warn('No se pudo cargar locale', loc, e);
        dict = {};
    }
}

export function t(key, vars){
    const parts = key.split('.');
    let v = dict;
    for(const p of parts){ 
        if(v && p in v) v = v[p]; 
        else { v = key; break; } 
    }
    if(typeof v === 'string') return interp(v, vars);
    return key;
}

export function applyDOM(){
    document.querySelectorAll('[data-intl]').forEach(el=>{
        const key = el.dataset.intl;
        const txt = t(key);
        el.textContent = txt;
    });
    
    document.querySelectorAll('[data-intl-attr]').forEach(el=>{
        const map = el.dataset.intlAttr.split(';').map(s=>s.trim()).filter(Boolean);
        for(const pair of map){
            const [attr,key] = pair.split(':').map(s=>s.trim());
            if(attr && key){ el.setAttribute(attr, t(key)); }
        }
    });
}

export async function initIntl(preferred){
    console.log('Preferred locale:', preferred);
    const stored = localStorage.getItem('lang');
    const nav = navigator.language ? navigator.language.slice(0,2) : 'es';
    const pick = preferred || stored || nav || 'es';
    await loadLocale(pick);
    (function(global){
        const DEFAULT_LOCALE = 'es';
        let currentLocale = DEFAULT_LOCALE;
        let currentTranslations = {};

        function interpolate(str, variables){
            if(!variables) return str;
            return Object.keys(variables).reduce((accumulator,key) => accumulator.replace(new RegExp(`{{${key}}}`,'g'), variables[key]), str);
        }

        function loadTranslationsFromWindow(localeCode){
            const localesContainer = global.LOCALES || {};
            const catalog = localesContainer[localeCode] || null;
            if(catalog && typeof catalog === 'object'){
                currentTranslations = catalog;
                currentLocale = localeCode;
                return true;
            }
            return false;
        }

        function translate(key, variables){
            const parts = key.split('.');
            let node = currentTranslations;
            for(const part of parts){
                if(node && (part in node)) node = node[part];
                else { node = null; break; }
            }
            if(typeof node === 'string') return interpolate(node, variables);
            return key;
        }

        function applyTranslationsToDOM(){
            document.querySelectorAll('[data-intl]').forEach(element => {
                const key = element.getAttribute('data-intl');
                element.textContent = translate(key);
            });

            document.querySelectorAll('[data-intl-attr]').forEach(element => {
                const raw = element.getAttribute('data-intl-attr') || '';
                const mappings = raw.split(';').map(s => s.trim()).filter(Boolean);
                for(const mapping of mappings){
                    const parts = mapping.split(':').map(s => s.trim());
                    const attr = parts[0];
                    const key = parts[1];
                    if(attr && key){ element.setAttribute(attr, translate(key)); }
                }
            });
        }

        function determinePreferredLocale(provided){
            const stored = localStorage.getItem('lang');
            const navigatorLocale = (navigator.language || navigator.userLanguage || '').slice(0,2) || DEFAULT_LOCALE;
            return provided || stored || navigatorLocale || DEFAULT_LOCALE;
        }

        function initializeIntl(preferredLocale){
            return new Promise(resolve => {
                const pick = determinePreferredLocale(preferredLocale);
                const loaded = loadTranslationsFromWindow(pick);
                if(!loaded){
                    loadTranslationsFromWindow(DEFAULT_LOCALE);
                }
                try{ localStorage.setItem('lang', currentLocale); }catch(e){}
                applyTranslationsToDOM();
                resolve(currentLocale);
            });
        }

        function changeLocale(newLocale){
            const loaded = loadTranslationsFromWindow(newLocale);
            if(loaded){
                try{ localStorage.setItem('lang', currentLocale); }catch(e){}
                applyTranslationsToDOM();
            }
        }

        function getCurrentLocale(){ return currentLocale; }

        global.intl = {
            initializeIntl: initializeIntl,
            translate: translate,
            applyTranslationsToDOM: applyTranslationsToDOM,
            changeLocale: changeLocale,
            getCurrentLocale: getCurrentLocale
        };
        
    })(window);
}
