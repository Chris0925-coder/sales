const carousel = document.querySelector(".carousel-inner");
const closeBtn = document.querySelector('.close');
const showImages = document.getElementsByClassName('images-content');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');

closeBtn.addEventListener('click', () => {
    modal.classList.toggle('show');
})

function images() {
    carousel.addEventListener('click', (e) => {

        if(e.target.tagName === 'IMG') {
            let element = e.srcElement.attributes[0].nodeValue;

            let filename = element.split("img");
            // console.log(filename);
            let ext = filename[1].split('.')[0];
            // console.log(ext[0],ext[1]);
            // modalContent.innerHTML = e.srcElement.outerHTML;
            modalContent.innerHTML =`<img src="../public/img/hr${ext}.jpg" alt="${ext}" loading="lazy">`;
            modal.classList.toggle('show');
        }    
    })
}

images();