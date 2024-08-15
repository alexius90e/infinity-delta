// advantages

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

// reviews

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

// main-nav

const mainNav = document.querySelector('.main-nav');
const mainNavCloseButton = document.querySelector('.main-nav__close');
const headeBurgerButton = document.querySelector('.header__burger-button');

function showMainNav() {
  if (mainNav) {
    mainNav.classList.remove('hidden');
    mainNav.classList.add('visible');
    document.body.classList.add('hidden-md');
  }
}

function hideMainNav() {
  if (mainNav) {
    mainNav.classList.remove('visible');
    mainNav.classList.add('hidden');
    document.body.classList.remove('hidden-md');
  }
}

if (mainNav && mainNavCloseButton && headeBurgerButton) {
  headeBurgerButton.addEventListener('click', () => {
    showMainNav();
  });

  mainNav.addEventListener('click', (event) => {
    const isMainNav = event.target === event.currentTarget;
    const isCloseButton = event.target === mainNavCloseButton;
    const isMainNavMenuLink = event.target.classList.contains('main-nav__menu-item-link');
    const isLoginButton = event.target.classList.contains('main-nav__login-button');

    if (isMainNav || isCloseButton || isMainNavMenuLink || isLoginButton) {
      hideMainNav();
    }
  });
}

// preloader

const preloader = document.querySelector('.preloader');

if (preloader) {
  setTimeout(() => {
    preloader.classList.remove('visible');
    preloader.classList.add('hidden');
  }, 3000);
}

// modal

function showModal(modalElem) {
  if (modalElem) {
    hideMainNav();
    modalElem.classList.remove('hidden');
    modalElem.classList.add('visible');
    document.body.classList.add('hidden');
  }
}

function hideModal(modalElem) {
  if (modalElem) {
    modalElem.classList.remove('visible');
    modalElem.classList.add('hidden');
    document.body.classList.remove('hidden');
  }
}

const modals = document.querySelectorAll('.modal');

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    const isModal = event.target === event.currentTarget;
    const isCloseButton = event.target.classList.contains('modal__close');
    if (isModal || isCloseButton) {
      hideModal(event.currentTarget);
    }
  });
});

const loginButtons = document.querySelectorAll('.login');
const loginModal = document.querySelector('.login-modal');

loginButtons.forEach((loginButton) => {
  loginButton.addEventListener('click', () => {
    if (loginModal) showModal(loginModal);
  });
});

const bookButtons = document.querySelectorAll('.book');
const bookModal = document.querySelector('.book-modal');

bookButtons.forEach((bookButton) => {
  bookButton.addEventListener('click', () => {
    if (bookModal) showModal(bookModal);
  });
});

const callButtons = document.querySelectorAll('.call');
const callModal = document.querySelector('.call-modal');

callButtons.forEach((callButton) => {
  callButton.addEventListener('click', () => {
    if (callModal) showModal(callModal);
  });
});

// main-controls

const mainControlsTogglerButton = document.querySelector('.main-controls__toggler-button');
const mainControls = document.querySelector('.main-controls');
const mainControlsButtons = document.querySelector('.main-controls__buttons');

if (mainControlsTogglerButton && mainControls && mainControlsButtons) {
  mainControlsTogglerButton.addEventListener('click', () => {
    mainControls.classList.add('visible');
  });

  mainControls.addEventListener('click', (event) => {
    const isMainControls = event.target === event.currentTarget;
    if (isMainControls) mainControls.classList.remove('visible');
  });

  mainControlsButtons.addEventListener('click', (event) => {
    console.log(mainControlsButtons)
    mainControls.classList.remove('visible');
  });
  
}
