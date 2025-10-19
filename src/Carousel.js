class Carousel {
  constructor(containerId, interval = 5000) {
    this.container = document.getElementById(containerId);
    this.slidesContainer = this.container.querySelector(".carousel-slides");
    this.slides = Array.from(
      this.container.querySelectorAll(".carousel-slide"),
    );
    this.prevBtn = this.container.querySelector(".prev");
    this.nextBtn = this.container.querySelector(".next");
    this.dotsContainer = this.container.querySelector(".carousel-dots");

    this.currentIndex = 0;
    this.interval = interval;
    this.timer = null;

    this.createDots();
    this.showSlide(this.currentIndex);
    this.attachEventListeners();
    this.startAutoSlide();
  }

  createDots() {
    this.dotsContainer.innerHTML = "";
    this.slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => this.showSlide(index));
      this.dotsContainer.appendChild(dot);
    });
  }

  showSlide(index) {
    if (index < 0) index = this.slides.length - 1;
    if (index >= this.slides.length) index = 0;
    this.currentIndex = index;

    const offset = -index * 100; // Move slides horizontally
    this.slidesContainer.style.transform = `translateX(${offset}%)`;

    // Update dots
    const dots = this.dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) =>
      dot.classList.toggle("active", i === this.currentIndex),
    );

    // Reset timer when user interacts
    this.restartAutoSlide();
  }

  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }

  attachEventListeners() {
    this.nextBtn.addEventListener("click", () => this.nextSlide());
    this.prevBtn.addEventListener("click", () => this.prevSlide());
  }

  startAutoSlide() {
    this.timer = setInterval(() => this.nextSlide(), this.interval);
  }

  restartAutoSlide() {
    clearInterval(this.timer);
    this.startAutoSlide();
  }
}

export default Carousel;
