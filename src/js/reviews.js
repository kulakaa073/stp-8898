import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import Swiper from 'swiper';
import { Keyboard, Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', function () {
  loadScript(
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
    loadIziToast
  );
});

function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

function loadIziToast() {
  const iziScript = document.createElement('script');
  iziScript.src =
    'https://cdn.jsdelivr.net/npm/izitoast/dist/js/iziToast.min.js';
  iziScript.onload = loadCss;
  document.head.appendChild(iziScript);
}

function loadCss() {
  const swiperLink = document.createElement('link');
  swiperLink.rel = 'stylesheet';
  swiperLink.href =
    'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
  document.head.appendChild(swiperLink);

  const iziLink = document.createElement('link');
  iziLink.rel = 'stylesheet';
  iziLink.href =
    'https://cdn.jsdelivr.net/npm/izitoast/dist/css/iziToast.min.css';
  document.head.appendChild(iziLink);

  setTimeout(initReviews, 100);
}

function initReviews() {
  const reviewsUrl = 'https://portfolio-js.b.goit.study/api/reviews';
  const reviewsList = document.querySelector('.reviews-list');
  const reviewsSection = document.querySelector('#reviews');
  let reviewsLoaded = false;

  const reviewsSwiper = new Swiper('.reviews-swiper', {
    modules: [Navigation, Keyboard],
    slidesPerView: 1,
    spaceBetween: 16,
    direction: 'horizontal',
    loop: false,
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
    },
    on: {
      slideChange: function () {
        const prevButton = document.querySelector('.swiper-btn-prev');
        const nextButton = document.querySelector('.swiper-btn-next');

        if (reviewsSwiper.isBeginning) {
          prevButton.classList.add('swiper-button-disabled');
          prevButton.classList.remove('swiper-button-active');
          nextButton.classList.remove('swiper-button-disabled');
          nextButton.classList.add('swiper-button-active');
        } else if (reviewsSwiper.isEnd) {
          nextButton.classList.add('swiper-button-disabled');
          nextButton.classList.remove('swiper-button-active');
          prevButton.classList.remove('swiper-button-disabled');
          prevButton.classList.add('swiper-button-active');
        } else {
          prevButton.classList.remove('swiper-button-disabled');
          prevButton.classList.add('swiper-button-active');
          nextButton.classList.remove('swiper-button-disabled');
          nextButton.classList.add('swiper-button-active');
        }
      },
      init: function () {
        const prevButton = document.querySelector('.swiper-btn-prev');
        const nextButton = document.querySelector('.swiper-btn-next');

        if (reviewsSwiper.isBeginning) {
          prevButton.classList.add('swiper-button-disabled');
          prevButton.classList.remove('swiper-button-active');
        }
      },
    },
  });

  async function getReviews() {
    try {
      const response = await fetch(reviewsUrl);
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      showError();
      showFallback();
      return null;
    }
  }

  function renderReviews(reviews) {
    if (!reviews || reviews.length === 0) {
      showFallback();
      return;
    }

    const markup = reviews
      .map(({ id, author, review, stars }) => {
        const numStars = Math.min(Math.max(parseInt(stars) || 0, 0), 5);

        const starsMarkup = Array(numStars)
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
          <div class="reviews-username">${author}</div>
          <p class="reviews-text">${review}</p>
        </li>`;
      })
      .join('');

    reviewsList.innerHTML = markup;
    reviewsSwiper.update();
  }

  function showFallback() {
    reviewsList.innerHTML = `<li class="swiper-slide reviews-placeholder">Not found</li>`;
    reviewsSwiper.update();
  }

  function showError() {
    if (window.iziToast) {
      iziToast.error({
        title: 'Error',
        message: 'Failed to load reviews',
        position: 'topRight',
      });
    } else {
      console.error('Failed to load reviews');
    }
  }

  const observer = new IntersectionObserver(
    async (entries, observer) => {
      const [entry] = entries;
      if (entry.isIntersecting && !reviewsLoaded) {
        reviewsLoaded = true;
        const reviews = await getReviews();
        if (reviews) {
          renderReviews(reviews);
        }
        observer.unobserve(entry.target);
      }
    },
    {
      root: null,
      threshold: 0.3,
    }
  );

  observer.observe(reviewsSection);
}
