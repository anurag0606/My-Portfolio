// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Sticky Navigation
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.padding = "0.5rem 0";
    navbar.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.padding = "1rem 0";
    navbar.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)";
  }
});

// Project Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (
        filterValue === "all" ||
        card.getAttribute("data-category") === filterValue
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Form Submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Here you would typically send the form data to a server
  // For this example, we'll just log it to the console
  console.log({
    name,
    email,
    subject,
    message,
  });

  // Show success message (in a real application)
  alert("Thank you for your message! I will get back to you soon.");

  // Reset form
  contactForm.reset();
});

// GSAP Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 70 }, // Offset for navbar height
        ease: "power2.out",
      });
    }
  });
});

// Animation on scroll (simple implementation)
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".skill-card, .project-card, .about-image"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Set initial styles for animation
document
  .querySelectorAll(".skill-card, .project-card, .about-image")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

// Run animation on scroll
window.addEventListener("scroll", animateOnScroll);
// Run once on page load
window.addEventListener("load", animateOnScroll);

// Dark Mode Toggle
document
  .getElementById("darkModeToggle")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    // Optionally, toggle icon between moon/sun
    const icon = this.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });

// GSAP Loader Animation
window.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const logo = document.querySelector(".loader-logo");

  // Animate logo in
  gsap.to(logo, {
    opacity: 1,
    scale: 1.2,
    duration: 0.8,
    ease: "power2.out",
    yoyo: true,
    repeat: 1,
    repeatDelay: 0.3,
    onComplete: () => {
      // Fade out loader
      gsap.to(loader, {
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        onComplete: () => {
          loader.style.display = "none";
        },
      });
    },
  });
});

// Animate skill bars on page load
window.addEventListener("load", () => {
  document.querySelectorAll('.progress').forEach(bar => {
    const percent = bar.getAttribute('data-percent');
    gsap.fromTo(bar, 
      { width: "0%" }, 
      { width: percent + "%", duration: 1.2, ease: "power2.out" }
    );
  });
});

// Image zoom functionality
function createImageModal() {
  // Create modal element if it doesn't exist
  let modal = document.querySelector('.modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);
  }

  // Add click event to all project images
  document.querySelectorAll('.project-img img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      const modalContent = document.createElement('div');
      modalContent.className = 'modal-wrapper';
      
      const closeButton = document.createElement('button');
      closeButton.className = 'modal-close';
      closeButton.innerHTML = '&times;';
      
      const modalImg = document.createElement('img');
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      modalImg.className = 'modal-content';
      
      modalContent.appendChild(closeButton);
      modalContent.appendChild(modalImg);
      modal.innerHTML = '';
      modal.appendChild(modalContent);
      modal.classList.add('active');

      // Close button event listener
      closeButton.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    });
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

// Initialize image zoom functionality
window.addEventListener('load', createImageModal);