const main = document.querySelector("body");
const carousel = document.querySelector(".carousel-inner");
const closeBtn = document.querySelector('.close');
const showImages = document.getElementsByClassName('images-content');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

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



function cli(e) {
    // console.log(e.target.tagName)
    if(e.target.tagName === "A" || e.target.tagName === "P" || e.target.tagName === "BUTTON") {
        console.log(e.target.tagName === "BUTTON")
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
closeBtn.addEventListener('click', () => {
    modal.classList.toggle('show');
})


function images() {
    carousel.addEventListener('click', (e) => {
        // e.preventDefault();
        // console.log(e.srcElement.attributes[0].nodeValue)

        let element = e.srcElement.attributes[0].nodeValue;

        let filename = element.split("img");
        // console.log(filename);
        if(e.target.tagName === 'IMG') {
            // modalContent.innerHTML = e.srcElement.outerHTML;
            modalContent.innerHTML =`<img src="public/img/hr${filename[1]}" alt="${filename[1]}" loading="lazy">`;
            modal.classList.toggle('show');
        }    
    })
}

images();
main.addEventListener('click', cli);

count();
