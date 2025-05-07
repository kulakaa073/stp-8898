import Accordion from 'accordion-js';

document.addEventListener('DOMContentLoaded', () => {
  const according = document.querySelector('[data-accordion="true"]');
  if (according) {
    new Accordion(according, {
      collapse: true,
      duration: 400,
      showMultiple: false,
    });
  } else {
    console.error("Елемент з класом '.faq-acc-container' не знайдено!");
  }
});
