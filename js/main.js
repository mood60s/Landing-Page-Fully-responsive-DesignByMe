document.addEventListener("DOMContentLoaded", () => {
  // Update footer year once
  const yearEl = document.getElementById('year');
  if (yearEl && !yearEl.dataset.set) {
    const currentYear = new Date().getFullYear();
    yearEl.textContent = currentYear;
    yearEl.setAttribute('datetime', currentYear);
    yearEl.dataset.set = "true"; // mark as set
  }

  // Debounce function to optimize scroll performance
  function debounce(func, delay = 50) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  // Scroll-triggered effects
  function handleScroll() {
    const header = document.querySelector(".header");
    if (header) header.classList.toggle("active", window.scrollY > 50);

    const landingContainer = document.querySelector("main .landing .container");
    if (landingContainer) {
      const rect = landingContainer.getBoundingClientRect();
      if (rect.top <= window.innerHeight - 100) {
        landingContainer.classList.add("show");
      }
    }

    const elements = document.querySelectorAll(
      ".cheat-hack .text h2, .cheat-hack .text p, .cheat-hack video"
    );
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("animate");
      }
    });
  }

  // Smooth scroll event listener using requestAnimationFrame
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // On load scroll effects
  window.addEventListener("load", handleScroll);

  // Auto Typewriter Effect
  const typeTarget = document.getElementById("auto-write");
  const typeText = "created With Mood60S";
  let typeIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typeTarget) return;

    typeTarget.textContent = typeText.substring(0, typeIndex);
    typeIndex += isDeleting ? -1 : 1;

    if (!isDeleting && typeIndex > typeText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    } else if (isDeleting && typeIndex === 0) {
      isDeleting = false;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
  typeEffect();

  // Testimonials Slider
  const slides = document.querySelectorAll(".testimonial-slide");
  let currentTestimonial = 0;

  function showTestimonial(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) slide.classList.add("active");
    });
  }

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial - 1 + slides.length) % slides.length;
      showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial + 1) % slides.length;
      showTestimonial(currentTestimonial);
    });
  }

  // Show first testimonial on load
  showTestimonial(currentTestimonial);

  // Pop-up Logic
  function popup() {
    const pop = document.querySelector(".pop-up");
    const closeBtn = document.querySelector(".pop-up .close");

    if (!pop || !closeBtn) return;

    // Show pop-up only if viewport width >= 1000px
    if (window.innerWidth >= 1000) {
      setTimeout(() => {
        pop.style.display = "block";
      }, 10000);

      closeBtn.addEventListener("click", () => {
        pop.style.display = "none";
      });
    }
  }

  popup();
});
