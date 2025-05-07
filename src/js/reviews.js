import Swiper from 'swiper';
import { Keyboard, Navigation } from 'swiper/modules';
import 'swiper/css';

const swiperEl = document.querySelector('[data-swiper="swiper"]');
const swiperBtnPrevEl = document.querySelector('[data-swiper="btn-prev"]');
const swiperBtnNextEl = document.querySelector('[data-swiper="btn-next"]');

const reviewsSwiper = new Swiper(swiperEl, {
  modules: [Navigation, Keyboard],
  slidesPerView: 'auto',
  spaceBetween: 5,
  direction: 'horizontal',
  autoResize: false,
  visibilityFullFit: true,
  navigation: {
    nextEl: swiperBtnNextEl,
    prevEl: swiperBtnPrevEl,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  breakpoints: {
    1200: {
      spaceBetween: 20,
    },
  },
});
