const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let index = 0;
let autoSlideInterval;

// Crear puntos de navegación
slideElements.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlider() {
    slides.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function goToSlide(i) {
    index = i;
    updateSlider();
    // resetAutoSlide();
}

function nextSlide() {
    index = (index + 1) % slideElements.length;
    updateSlider();
}

function prevSlideFunc() {
    index = (index - 1 + slideElements.length) % slideElements.length;
    updateSlider();
}

// function startAutoSlide() {
//     autoSlideInterval = setInterval(nextSlide, 3000);
// }

// function resetAutoSlide() {
//     clearInterval(autoSlideInterval);
    // startAutoSlide();
// }

// Eventos
// nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
// prevBtn.addEventListener('click', () => { prevSlideFunc(); resetAutoSlide(); });

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlideFunc);

// Soporte táctil para móviles
let startX = 0;
slides.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slides.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    
    if (endX - startX > 50) prevSlideFunc();
});

// Iniciar
// startAutoSlide();