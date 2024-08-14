const advantages = document.querySelector('.advantages');

if (advantages) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const square = entry.target.querySelector('.advantages__content');

      if (entry.isIntersecting) {
        square.classList.add('animate');
        return;
      }
    });
  });

  observer.observe(document.querySelector('.advantages'));
}

const reviews = document.querySelector('.reviews');

if (reviews) {
  const reviewsSwiper = new Swiper('.reviews .swiper', {
    slidesPerView: 1,
    spaceBetween: 12,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1.5,
      },
      992: {
        slidesPerView: 2,
      },
    },
    navigation: {
      nextEl: '.reviews .reviews__controls-next',
      prevEl: '.reviews .reviews__controls-prev',
    },
  });
}

const mainNav = document.querySelector('.main-nav');
const mainNavCloseButton = document.querySelector('.main-nav__close');
const headeBurgerButton = document.querySelector('.header__burger-button');

if (mainNav && mainNavCloseButton && headeBurgerButton) {
  headeBurgerButton.addEventListener('click', () => {
    mainNav.classList.remove('hidden');
    mainNav.classList.add('visible');
    document.body.classList.add('hidden');
  });

  mainNav.addEventListener('click', (event) => {
    const isMainNav = event.target === event.currentTarget;
    const isCloseButton = event.target === mainNavCloseButton;
    const isMainNavMenuLink = event.target.classList.contains('main-nav__menu-item-link');
    const isLoginButton = event.target.classList.contains('main-nav__login-button');

    if (isMainNav || isCloseButton || isMainNavMenuLink || isLoginButton) {
      mainNav.classList.remove('visible');
      mainNav.classList.add('hidden');
      document.body.classList.remove('hidden');
    }
  });
}

const preloader = document.querySelector('.preloader');

if (preloader) {
  setTimeout(() => {
    preloader.classList.remove('visible');
    preloader.classList.add('hidden');
  }, 3000);
}
