document.addEventListener('DOMContentLoaded', function () {
  const cookieConsent = document.getElementById('cookieConsent');

  if (!localStorage.getItem('cookiesAccepted')) {
    cookieConsent.style.display = 'block';

    document.body.classList.add('no-scroll');
  }

  function handleCookieConsent(accepted) {
    localStorage.setItem('cookiesAccepted', accepted ? 'true' : 'false');

    cookieConsent.style.display = 'none';

    document.body.classList.remove('no-scroll');
  }

  document
    .getElementById('acceptCookies')
    .addEventListener('click', function () {
      handleCookieConsent(true);
    });

  document
    .getElementById('declineCookies')
    .addEventListener('click', function () {
      handleCookieConsent(false);
    });
});
