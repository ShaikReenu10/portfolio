/* 
   script.js
   Responsive Portfolio Website - S. Reenu
*/

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Dark/Light Theme Switcher
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');
  
  // Set theme based on saved preference or default to dark
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    // Save preference to localStorage
    if (document.body.classList.contains('light-theme')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });

  // ==========================================
  // 2. Mobile Navbar Menu Toggle
  // ==========================================
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close mobile menu when clicking on nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  // ==========================================
  // 3. Hero Auto-Typing Animation
  // ==========================================
  const typedTextSpan = document.getElementById('typed-text');
  const textArray = ['Computer Science Student', 'Python Developer', 'Web Developer', 'Software Enthusiast'];
  const typingSpeed = 100;
  const erasingSpeed = 60;
  const newTextDelay = 2000; // Delay between typing cycles
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingSpeed + 500);
    }
  }

  // Start typing animation
  if (textArray.length) setTimeout(type, 1000);

  // ==========================================
  // 4. Scroll Fade-In Observer & Skill Bars
  // ==========================================
  const fadeSections = document.querySelectorAll('.fade-in-section');
  const skillProgressBars = document.querySelectorAll('.skill-progress');

  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px'
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, observerOptions);

  fadeSections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Animate skill bars when visible
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          bar.style.width = bar.getAttribute('data-width');
        });
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  // ==========================================
  // 5. Active Link Highlighting on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section, .section');
  
  window.addEventListener('scroll', () => {
    let currentActive = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        currentActive = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === currentActive) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 6. Contact Form Validation & Submission
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Reset status
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    // Field checks
    if (!name || !email || !subject || !message) {
      showFormStatus('Please fill in all fields.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showFormStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate successful API call
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      showFormStatus('Thank you, Reenu! Your message has been sent successfully.', 'success');
      contactForm.reset();
      
      // Floating label reset helper: trigger blur on all fields
      contactForm.querySelectorAll('.form-input').forEach(input => {
        input.dispatchEvent(new Event('blur'));
      });
    }, 1500);
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showFormStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.classList.add(type);
  }
});