const main = document.querySelector("body");
const ahora = new Date();

const opciones = {
    timeZone: "America/Panama",
    dateStyle: 'full',
    timeStyle: 'long',
    hour12: false, 
  };

  const formatoConZona = new Intl.DateTimeFormat("es-PA", opciones).format(ahora);
  
const url = `https://visits-christian-guardias-projects.vercel.app/count`;    
const dominio = window.location.origin;

function count() {
    let analyticsData = {
        id: 7,
        count: 1,
        domain: dominio,
        date: `última vista: ${formatoConZona}`,
        clicks: 0,
    };

    navigator.sendBeacon(url, JSON.stringify(analyticsData));  
};



function cli() {    
    if(event.target.tagName === "A" || event.target.tagName === "P" || event.target.tagName === "BUTTON") {

        let analyticsData = {
            id: 7,
            count: 0,
            domain: dominio,
            date: `última vista: ${formatoConZona}`,
            clicks: 1,
        };
        navigator.sendBeacon(url, JSON.stringify(analyticsData));
    }
}

main.addEventListener('click', cli);

count();
