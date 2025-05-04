const openBtnEl = document.querySelector('[data-action="open"]');
const closeBtnEl = document.querySelector('[data-action="close"]');
const mobileMenuEl = document.querySelector('[data-visible]');

openBtnEl.addEventListener('click', e => {
  mobileMenuEl.dataset.visible = 'open';
});

closeBtnEl.addEventListener('click', e => {
  mobileMenuEl.dataset.visible = 'close';
});

// Can be too many listeners, nah
/* closeBtnEl.forEach(el =>
  el.addEventListener('click', e => {
    mobileMenuEl.dataset.visible = 'close';
  })
); */

mobileMenuEl.addEventListener('click', e => {
  if (e.target && e.target.tagName === 'A')
    mobileMenuEl.dataset.visible = 'close';
});
