// Vinovam Main Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  // Smooth Scrolling for Internal Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Simple Form Submission Handler
  const form = document.getElementById('ai-discovery-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      
      btn.innerText = 'Sending Request...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      setTimeout(() => {
        alert('Thank you! Your AI Discovery Session request has been received. Our team will contact you shortly.');
        form.reset();
        btn.innerText = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
      }, 1200);
    });
  }

  // Header Scroll Shadow Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      navbar.style.padding = '12px 0';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.padding = '18px 0';
    }
  });
});

