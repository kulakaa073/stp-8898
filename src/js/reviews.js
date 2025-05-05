document.addEventListener('DOMContentLoaded', function () {
  loadScript(
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
    loadCSS
  );
});

function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

function loadCSS() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
  document.head.appendChild(link);

  setTimeout(initReviews, 100);
}

function initReviews() {
  const reviewsUrl = 'https://portfolio-js.b.goit.study/api/reviews';
  const reviewsList = document.querySelector('.reviews-list');
  let reviewsLoaded = false;

  const reviewsSwiper = new Swiper('.reviews-swiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    direction: 'horizontal',
    loop: true,
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      768: { slidesPerView: 1 },
      1200: { slidesPerView: 2 },
    },
  });

  async function getReviews() {
    try {
      const response = await fetch(reviewsUrl);
      if (!response.ok) throw new Error('Server error');
      return await response.json();
    } catch (error) {
      console.error('Failed to load reviews:', error);
      return null;
    }
  }

  function renderReviews(reviews) {
    const markup = reviews
      .map(({ id, author: name, review: text, stars }) => {
        const starsMarkup = Array(+stars)
          .fill()
          .map(
            () => `
          <svg class="star-icon" width="24" height="24">
            <use href="./img/sprite.svg#icon-star"></use>
          </svg>
        `
          )
          .join('');

        return `
        <li class="swiper-slide reviews-item" data-id="${id}">
          <div class="reviews-stars">${starsMarkup}</div>
          <div class="reviews-username">${name}</div>
          <p class="reviews-text">${text}</p>
        </li>`;
      })
      .join('');

    reviewsList.innerHTML = markup;
    reviewsSwiper.update();
  }

  const observer = new IntersectionObserver(
    async (entries, observer) => {
      const [entry] = entries;
      if (entry.isIntersecting && !reviewsLoaded) {
        reviewsLoaded = true;
        const reviews = await getReviews();
        if (reviews) renderReviews(reviews);
        observer.unobserve(entry.target);
      }
    },
    { root: null, threshold: 0.3 }
  );

  const reviewsSection = document.querySelector('#reviews');
  observer.observe(reviewsSection);
}
