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

const captions = [
  "Momen pertama",
  "Hari bahagia",
  "Senyum dan doa",
  "Langkah berdua",
  "Cinta yang merona",
  "Kebersamaan keluarga",
  "Satu hati satu janji",
  "Cahaya resepsi",
  "Harum kebahagiaan",
  "Momen hangat",
  "Syukur bersama",
  "Kasih yang menyatu",
  "Cerita indah",
  "Kenangan tak terlupa",
  "Akhir yang sempurna",
];

const slidesContainer = document.getElementById("slides");
const dotsContainer = document.getElementById("dots");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const toggleButton = document.getElementById("toggle");
const captionTitle = document.getElementById("caption-title");
const captionText = document.getElementById("caption-text");

let currentIndex = 0;
let autoPlay = false;
let intervalId = null;

function createSlide(src, index) {
  const slide = document.createElement("div");
  slide.className = "slide";
  slide.dataset.index = index;
  slide.innerHTML = `<img src="${src}" alt="Slide ${index + 1}" />`;
  return slide;
}

function createDot(index) {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.title = `Slide ${index + 1}`;
  dot.addEventListener("click", () => {
    showSlide(index);
    setAutoPlay(false);
  });
  return dot;
}

function setupSlides() {
  imageFiles.forEach((src, index) => {
    slidesContainer.appendChild(createSlide(src, index));
    dotsContainer.appendChild(createDot(index));
  });
}

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  currentIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, i) =>
    slide.classList.toggle("active", i === currentIndex),
  );
  dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
  captionTitle.textContent = `BB Resepsi — Slide ${currentIndex + 1}`;
  captionText.textContent = captions[currentIndex] || "Galeri foto resepsi";
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function setAutoPlay(enabled) {
  autoPlay = enabled;
  toggleButton.textContent = autoPlay ? "Stop Otomatis" : "Putar Otomatis";
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (autoPlay) {
    intervalId = setInterval(nextSlide, 5200);
  }
}

prevButton.addEventListener("click", () => {
  prevSlide();
  setAutoPlay(false);
});
nextButton.addEventListener("click", () => {
  nextSlide();
  setAutoPlay(false);
});
toggleButton.addEventListener("click", () => setAutoPlay(!autoPlay));

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextSlide();
  if (event.key === "ArrowLeft") prevSlide();
  if (event.key.toLowerCase() === " ") {
    event.preventDefault();
    setAutoPlay(!autoPlay);
  }
});

setupSlides();
showSlide(0);
