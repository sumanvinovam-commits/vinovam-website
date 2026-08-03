// ==========================================================
// VINOVAM TECHNOLOGIES - MAIN INTERACTIVE SCRIPT
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------
  // 1. Smooth Scrolling for Navigation & Anchor Links
  // --------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Offset for fixed navbar
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --------------------------------------------------------
  // 2. Web3Forms AJAX Form Submission Handler
  // --------------------------------------------------------
  const form = document.getElementById('ai-discovery-form');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;
      
      // Visual state: Loading
      submitBtn.innerText = 'Sending Request...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.style.cursor = 'not-allowed';

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action || 'https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        const result = await response.json();

        if (response.status === 200 && result.success) {
          // Success Response
          alert('Thank you! Your AI Discovery Session request has been received. Our team will contact you shortly.');
          form.reset();
        } else {
          // Failure Response from API
          alert('Submission error: ' + (result.message || 'Unable to process your request at this time. Please try again.'));
        }
      } catch (error) {
        // Network / Connection Error
        console.error('Form submission error:', error);
        alert('Network error. Please check your internet connection and try again.');
      } finally {
        // Reset Button State
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
      }
    });
  }

  // --------------------------------------------------------
  // 3. Navbar Scroll Elevation & Dynamic Styling
  // --------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
      navbar.style.padding = '12px 0';
      navbar.style.background = 'rgba(7, 17, 31, 0.95)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.padding = '18px 0';
      navbar.style.background = 'rgba(7, 17, 31, 0.8)';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger check on initial load

  // --------------------------------------------------------
  // 4. Highlight Active Navigation Section on Scroll
  // --------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar nav a');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

});
