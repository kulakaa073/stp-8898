// Save window height for styles use
document.addEventListener('DOMContentLoaded', () => {
  function setWindowHeight() {
    document.documentElement.style.setProperty(
      '--window-height',
      `${window.innerHeight}`
    );
  }

  window.addEventListener('resize', setWindowHeight);
  setWindowHeight();
});

// Add scroll dataset so we can change style on scroll
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header.dataset.scrolled = 'true';
    } else {
      delete header.dataset.scrolled;
    }
  });
});

// Adjust scroll amount for anchor links, so header wont hide section titles
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[data-link="anchor"]');
  const burgerMenuEl = document.querySelector('[data-visible]');
  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offset = window.innerWidth < 1200 ? 20 : 70;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });
});
