import Swiper from 'swiper';
import { Keyboard, Navigation } from 'swiper/modules';
import 'swiper/css';

const reviewsSwiper = new Swiper('.reviews-swiper', {
  modules: [Navigation, Keyboard],
  slidesPerView: 1,
  spaceBetween: 5,
  direction: 'horizontal',
  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  breakpoints: {
    1200: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
  },
});
