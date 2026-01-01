// Romantic Website JavaScript

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  createFloatingHearts();
  initCountdown();
  initPhotoUpload();
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

// Initialize photo upload functionality
function initPhotoUpload() {
  const photoPlaceholders = document.querySelectorAll(".photo-placeholder");

  photoPlaceholders.forEach((placeholder, index) => {
    // Create file input
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    fileInput.id = `photo-upload-${index + 1}`;

    // Create upload button
    const uploadBtn = document.createElement("button");
    uploadBtn.className = "upload-btn";
    uploadBtn.textContent = "📷 Add Photo";
    uploadBtn.onclick = (e) => {
      e.stopPropagation();
      fileInput.click();
    };

    placeholder.appendChild(fileInput);
    placeholder.appendChild(uploadBtn);

    // Handle file selection
    fileInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          // Remove existing content
          placeholder.innerHTML = "";

          // Create image element
          const img = document.createElement("img");
          img.src = event.target.result;
          img.alt = `Photo ${index + 1}`;
          placeholder.appendChild(img);

          // Save to localStorage
          savePhotoToStorage(index + 1, event.target.result);
        };
        reader.readAsDataURL(file);
      }
    });

    // Click to upload
    placeholder.addEventListener("click", () => {
      fileInput.click();
    });
  });

  // Load saved photos
  loadSavedPhotos();
}

// Save photo to localStorage
function savePhotoToStorage(photoNumber, dataUrl) {
  try {
    localStorage.setItem(`romantic-photo-${photoNumber}`, dataUrl);
  } catch (e) {
    console.log("Photo too large to save locally");
  }
}

// Load saved photos from localStorage
function loadSavedPhotos() {
  const photoPlaceholders = document.querySelectorAll(".photo-placeholder");

  photoPlaceholders.forEach((placeholder, index) => {
    const savedPhoto = localStorage.getItem(`romantic-photo-${index + 1}`);
    if (savedPhoto) {
      placeholder.innerHTML = "";
      const img = document.createElement("img");
      img.src = savedPhoto;
      img.alt = `Photo ${index + 1}`;
      placeholder.appendChild(img);
    }
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

// Add mouse trail effect
let mouseTrail = [];
document.addEventListener("mousemove", function (e) {
  mouseTrail.push({
    x: e.clientX,
    y: e.clientY,
    time: Date.now(),
  });

  // Keep only recent positions
  if (mouseTrail.length > 20) {
    mouseTrail.shift();
  }
});

// Add some interactive love reactions
document
  .querySelectorAll(".photo-frame, .message-card, .countdown-item")
  .forEach((element) => {
    element.addEventListener("click", function () {
      this.style.transform = "scale(1.05)";
      setTimeout(() => {
        this.style.transform = "";
      }, 200);
    });
  });

console.log("💕 Romantic website loaded successfully! 💕");
