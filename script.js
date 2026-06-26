const imageFiles = [
  "images/JHO_0265.webp",
  "images/JHO_0267.webp",
  "images/JHO_0269.webp",
  "images/JHO_0270.webp",
  "images/JHO_0271.webp",
  "images/JHO_0272.webp",
  "images/JHO_0273.webp",
  "images/JHO_0274.webp",
  "images/JHO_0275.webp",
  "images/JHO_0276.webp",
  "images/JHO_0277.webp",
  "images/JHO_0278.webp",
  "images/JHO_0279.webp",
  "images/JHO_0280.webp",
  "images/JHO_0281.webp",
];

const slidesContainer = document.getElementById("slides");
const thumbsContainer = document.getElementById("dots");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const fullscreenButton = document.getElementById("fullscreen");
const currentSlideEl = document.getElementById("current-slide");
const totalSlidesEl = document.getElementById("total-slides");
const hero = document.getElementById("hero");

let currentIndex = 0;

function createSlide(src, index) {
  const slide = document.createElement("div");
  slide.className = "slide";
  slide.dataset.index = index;
  slide.innerHTML = `<img src="${src}" alt="Foto ${index + 1}" />`;
  return slide;
}

function createThumbnail(src, index) {
  const thumb = document.createElement("button");
  thumb.className = "thumbnail";
  thumb.type = "button";
  thumb.title = `Foto ${index + 1}`;
  thumb.innerHTML = `<img src="${src}" alt="Foto ${index + 1}" />`;
  thumb.addEventListener("click", () => showSlide(index));
  return thumb;
}

function setupSlides() {
  imageFiles.forEach((src, index) => {
    slidesContainer.appendChild(createSlide(src, index));
    thumbsContainer.appendChild(createThumbnail(src, index));
  });
}

function updateCounter(total, current) {
  totalSlidesEl.textContent = total;
  currentSlideEl.textContent = current + 1;
}

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const thumbs = document.querySelectorAll(".thumbnail");
  currentIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentIndex);
  });

  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === currentIndex);
    if (i === currentIndex) {
      thumb.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  });

  updateCounter(slides.length, currentIndex);
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
    fullscreenButton.textContent = "Fullscreen";
    return;
  }
  if (hero.requestFullscreen) {
    hero.requestFullscreen().catch(() => {});
    fullscreenButton.textContent = "Keluar Fullscreen";
  }
}

prevButton.addEventListener("click", prevSlide);
nextButton.addEventListener("click", nextSlide);
fullscreenButton.addEventListener("click", toggleFullscreen);

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextSlide();
  if (event.key === "ArrowLeft") prevSlide();
});

setupSlides();
showSlide(0);
