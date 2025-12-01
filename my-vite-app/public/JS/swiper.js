document.addEventListener('DOMContentLoaded', function () {
  let swiper = null;

  function initOrDestroySwiper() {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (isMobile && !swiper) {
      // Инициализация для мобильных
      swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 24,
        centeredSlides: false,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    } else if (!isMobile && swiper) {
      // Уничтожение для планшетов и десктопов
      swiper.destroy(true, true);
      swiper = null;
    }
  }

  // Запускаем при загрузке
  initOrDestroySwiper();

  // Запускаем при изменении размера окна
  window.addEventListener('resize', initOrDestroySwiper);
});
