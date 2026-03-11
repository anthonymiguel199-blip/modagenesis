// 1. Efeito de Scroll na Logo
const logo = document.getElementById('logo');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const logoScale = Math.max(0.72, 1 - scrollY * 0.0012);
  const logoTranslateY = Math.min(scrollY * 0.18, 30);
  const logoOpacity = Math.max(0.82, 1 - scrollY * 0.001);
  
  logo.style.transform = `translateY(-${logoTranslateY}px) scale(${logoScale})`;
  logo.style.opacity = logoOpacity;
});

// 2. Lógica do Carrossel
let currentSlide = 0;
const totalSlides = 3;
const track = document.getElementById('carousel-track');
const dots = document.querySelectorAll('.carousel-dot');
const currentCounter = document.getElementById('current-slide-counter');
const carouselContainer = document.getElementById('carousel-container');

function updateCarousel() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      // Mudei para Azul Claro (sky-400) e brilho azul
      dot.className = "carousel-dot h-2.5 rounded-full transition-all duration-300 w-8 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]";
    } else {
      // Mudei o cinza para combinar com o fundo azul escuro (slate-600)
      dot.className = "carousel-dot h-2.5 rounded-full transition-all duration-300 w-2.5 bg-slate-600 hover:bg-slate-400";
    }
  });

  currentCounter.innerText = String(currentSlide + 1).padStart(2, '0');
}

function nextSlide() {
  currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
  updateCarousel();
}

function prevSlide() {
  currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
  updateCarousel();
}

// 3. Autoplay (Rodar sozinho)
let autoPlayInterval = setInterval(nextSlide, 11000);

carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
carouselContainer.addEventListener('mouseleave', () => {
  autoPlayInterval = setInterval(nextSlide, 11000);
});

// 4. Suporte a toque/arraste no celular
let touchStartX = 0;
let touchEndX = 0;

carouselContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

carouselContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const distance = touchStartX - touchEndX;
  
  if (distance > 50) nextSlide(); 
  if (distance < -50) prevSlide(); 
});

// 5. Cliques nos botões e bolinhas
document.getElementById('next-btn').addEventListener('click', nextSlide);
document.getElementById('prev-btn').addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateCarousel();
  });
});