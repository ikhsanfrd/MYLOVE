// Romantic Website JavaScript

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  createFloatingHearts();
  initCountdown();
  initCarousel();
  initSmoothScroll();
});

// Create floating hearts animation
function createFloatingHearts() {
  const heartsContainer = document.getElementById("hearts");
  const heartSymbols = [
    "❤️",
    "💕",
    "💖",
    "💗",
    "💓",
    "💘",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🤎",
    "🖤",
  ];

  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    // Random position
    heart.style.left = Math.random() * 100 + "%";

    // Random size
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + "px";

    // Random animation duration
    const duration = Math.random() * 5 + 5;
    heart.style.animationDuration = duration + "s";

    // Random delay
    heart.style.animationDelay = Math.random() * 5 + "s";

    heartsContainer.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }

  // Create initial hearts
  for (let i = 0; i < 15; i++) {
    setTimeout(createHeart, i * 300);
  }

  // Keep creating hearts
  setInterval(createHeart, 800);
}

// Initialize countdown timer
function initCountdown() {
  // Set your start date here (when you two got together)
  const startDate = new Date("2022-10-14T00:00:00");

  function updateCountdown() {
    const now = new Date();
    const diff = now - startDate;

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update DOM
    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }

  // Initial update
  updateCountdown();

  // Update every second
  setInterval(updateCountdown, 1000);
}

// Initialize carousel functionality
function initCarousel() {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("carouselDots");

  let currentIndex = 0;
  const slides = track.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "carousel-dot" + (index === 0 ? " active" : "");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".carousel-dot");

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Button events
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto-play
  let autoPlay = setInterval(nextSlide, 4000);

  // Pause on hover
  track.addEventListener("mouseenter", () => clearInterval(autoPlay));
  track.addEventListener("mouseleave", () => {
    autoPlay = setInterval(nextSlide, 4000);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });
}

// Initialize smooth scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Add romantic greeting on load
function showGreeting() {
  const hour = new Date().getHours();
  let greeting = "";

  if (hour < 12) {
    greeting = "Good morning, my love! ☀️";
  } else if (hour < 18) {
    greeting = "Good afternoon, beautiful! 🌸";
  } else {
    greeting = "Good evening, my sweetheart! 🌙";
  }

  // Create greeting notification
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ffecd2, #fcb69f);
        padding: 20px 30px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(231, 76, 155, 0.3);
        z-index: 1000;
        font-family: 'Dancing Script', cursive;
        font-size: 1.5rem;
        color: #e74b9b;
        animation: slideIn 0.5s ease-out;
    `;
  notification.textContent = greeting;

  // Add animation keyframes if not exists
  if (!document.getElementById("greeting-styles")) {
    const style = document.createElement("style");
    style.id = "greeting-styles";
    style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideIn 0.5s ease-out reverse";
    setTimeout(() => notification.remove(), 500);
  }, 5000);
}

// Call greeting on load
setTimeout(showGreeting, 1000);

// Add interactive love reactions
document
  .querySelectorAll(".carousel-slide, .message-card, .countdown-item")
  .forEach((element) => {
    element.addEventListener("click", function () {
      this.style.transform = "scale(1.02)";
      setTimeout(() => {
        this.style.transform = "";
      }, 200);
    });
  });

console.log("💕 Romantic website loaded successfully! 💕");
