let slideIndex = 0;
showSlides(slideIndex);

// Función para cambiar de diapositiva
function moveSlide(n) {
    showSlides(slideIndex += n);
}

// Función para mostrar la diapositiva actual
function showSlides(n) {
    let slides = document.getElementsByClassName("carousel-item");
    
    // Ajusta el índice si es mayor que el número de diapositivas
    if (n >= slides.length) { slideIndex = 0 }
    
    // Ajusta el índice si es menor que 0
    if (n < 0) { slideIndex = slides.length - 1 }
    
    // Oculta todas las diapositivas y luego muestra la actual
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(${-slideIndex * 100}%)`;
    }
}
