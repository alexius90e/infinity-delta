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
    console.log(mainControlsButtons);
    mainControls.classList.remove('visible');
  });
}

// custom date input

const customDateInputs = document.querySelectorAll('.custom-date-input');

customDateInputs.forEach((customDateInput) => {
  const inputElem = customDateInput.querySelector('.custom-date-input input');
  const fasadeElem = customDateInput.querySelector('.custom-date-input__fasade');
  const calendarElem = customDateInput.querySelector('.custom-date-input__panel-calendar');
  const monthElem = customDateInput.querySelector('.custom-date-input__panel-controls-month');
  const prevButtonElem = customDateInput.querySelector('.custom-date-input__panel-controls-prev');
  const nextButtonElem = customDateInput.querySelector('.custom-date-input__panel-controls-next');
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  let newMonth = currentMonth;
  let newDate = currentDate;
  let activeDate = null;

  function initCalendar() {
    const firstDayOfMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    const firstDayOfMonthIndex = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
    const daysInMonth = 32 - new Date(newDate.getFullYear(), newDate.getMonth(), 32).getDate();
    calendarElem.innerHTML = null;
    new Array(firstDayOfMonthIndex - 1).fill(null).forEach(() => {
      const emptyElem = document.createElement('div');
      calendarElem.append(emptyElem);
    });
    new Array(daysInMonth).fill(null).forEach((_, index) => {
      const dayElem = document.createElement('div');
      const dayElemDate = new Date(newDate.getFullYear(), newDate.getMonth(), index + 1);
      dayElem.classList.add('custom-date-input__panel-calendar-item');
      if (activeDate) {
        if (activeDate.toDateString() === dayElemDate.toDateString()) {
          dayElem.classList.add('active');
        }
      } else {
        if (currentDate.toDateString() === dayElemDate.toDateString()) {
          dayElem.classList.add('active');
        }
      }
      dayElem.dataset.date = dayElemDate.toDateString();
      dayElem.innerText = index + 1;
      calendarElem.append(dayElem);
    });
  }

  function initPanel() {
    const newMonthName = newDate.toLocaleString('default', { month: 'long' });
    monthElem.innerHTML = newMonthName;
    initCalendar();
    const day = activeDate !== null ? activeDate : currentDate;
    const yearStr = day.getFullYear();
    const monthStr = day.getMonth() < 10 ? `0${day.getMonth() + 1}` : `${day.getMonth() + 1}`;
    const dayStr = day.getDate() < 10 ? `0${day.getDate()}` : `${day.getDate()}`;

    fasadeElem.innerHTML = `${yearStr}/${monthStr}/${dayStr}`;
    inputElem.value = `${yearStr}-${monthStr}-${dayStr}`;
  }

  function changeMonth(increment) {
    const changedMonth = newMonth + increment;
    if (changedMonth >= currentMonth) {
      if (changedMonth === currentMonth) prevButtonElem.classList.add('disabled');
      if (changedMonth !== currentMonth) prevButtonElem.classList.remove('disabled');
      const monthIncrement = changedMonth % 12;
      const newYear = currentDate.getFullYear() + (changedMonth - monthIncrement) / 12;
      newMonth = changedMonth;
      newDate = new Date(`${newYear}, ${monthIncrement + 1}, 1`);
    }
    initPanel();
  }

  function activateDay(dayItem) {
    const activeDay = new Date(dayItem.dataset.date);
    const currentDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    if (activeDay >= currentDay) {
      activeDate = activeDay;
      initPanel();
      hidePanel();
    }
  }

  function showPanel() {
    customDateInput.classList.add('active');
  }

  function hidePanel() {
    customDateInput.classList.remove('active');
  }

  initPanel();

  customDateInput.addEventListener('click', (event) => {
    const isСustomDateInputElem = event.target === event.currentTarget;
    const isNextButton = event.target === nextButtonElem;
    const isPrevButton = event.target === prevButtonElem;
    const isFasade = event.target === fasadeElem;
    const isCloseButton = event.target.classList.contains('custom-date-input__panel-close');
    const isCalendarItem = event.target.classList.contains(
      'custom-date-input__panel-calendar-item'
    );

    if (isNextButton) changeMonth(1);
    if (isPrevButton) changeMonth(-1);
    if (isCalendarItem) activateDay(event.target);
    if (isFasade) showPanel();
    if (isCloseButton) hidePanel();
    if (isСustomDateInputElem) hidePanel();
  });
});

// custom date input

const customTimeInputs = document.querySelectorAll('.custom-time-input');

customTimeInputs.forEach((customTimeInput) => {
  const inputElem = customTimeInput.querySelector('.custom-time-input input');
  const fasadeElem = customTimeInput.querySelector('.custom-time-input__fasade');
  const hourBlockElem = customTimeInput.querySelector('.custom-time-input__panel-input_hour');
  const minuteBlockElem = customTimeInput.querySelector('.custom-time-input__panel-input_minute');
  const hourMinusElem = hourBlockElem.querySelector('.custom-time-input__panel-input-minus');
  const hourPlusElem = hourBlockElem.querySelector('.custom-time-input__panel-input-plus');
  const hourValueElem = hourBlockElem.querySelector('.custom-time-input__panel-input-time');
  const minuteMinusElem = minuteBlockElem.querySelector('.custom-time-input__panel-input-minus');
  const minutePlusElem = minuteBlockElem.querySelector('.custom-time-input__panel-input-plus');
  const minuteValueElem = minuteBlockElem.querySelector('.custom-time-input__panel-input-time');
  const actions = { plus: '+', minus: '-' };
  const currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  function changeMinutes(action) {
    const step = 5;
    const minLimit = 0;
    const maxLimit = 60;
    const baseValue = Math.floor(minutes / step) * step;
    const newValuePlus = baseValue + step;
    const newValueMinus = baseValue - step;
    if (action === actions.plus && newValuePlus >= maxLimit) {
      minutes = minLimit;
    } else if (action === actions.plus && newValuePlus < maxLimit) {
      minutes = newValuePlus;
    } else if (action === actions.minus && newValueMinus < minLimit) {
      minutes = minLimit;
    } else if (action === actions.minus && newValueMinus === minLimit) {
      minutes = maxLimit - step;
    } else if (action === actions.minus && newValueMinus > minLimit) {
      minutes = newValueMinus;
    }
    initPanel();
  }

  function changeHours(action) {
    let newValue = 0;
    if (action === actions.plus) {
      newValue = hours + 1 >= 24 ? 0 : hours + 1;
    } else if (action === actions.minus) {
      newValue = hours - 1 <= 0 ? 23 : hours - 1;
    }
    hours = newValue;
    initPanel();
  }

  function showPanel() {
    customTimeInput.classList.add('active');
  }

  function hidePanel() {
    customTimeInput.classList.remove('active');
  }

  function initPanel() {
    const timeStr = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    fasadeElem.innerHTML = timeStr;
    hourValueElem.innerHTML = hours;
    minuteValueElem.innerHTML = minutes;
    inputElem.value = timeStr;
  }

  initPanel();

  customTimeInput.addEventListener('click', (event) => {
    const isСustomTimeInputElem = event.target === event.currentTarget;
    const isHourMinusElem = event.target === hourMinusElem;
    const isHourPlusElem = event.target === hourPlusElem;
    const isMinuteMinusElem = event.target === minuteMinusElem;
    const isMinutePlusElem = event.target === minutePlusElem;
    const isFasade = event.target === fasadeElem;
    const isCloseButton = event.target.classList.contains('custom-time-input__panel-close');

    if (isHourMinusElem) changeHours(actions.minus);
    if (isHourPlusElem) changeHours(actions.plus);
    if (isMinuteMinusElem) changeMinutes(actions.minus);
    if (isMinutePlusElem) changeMinutes(actions.plus);
    if (isFasade) showPanel();
    if (isFasade) showPanel();
    if (isCloseButton) hidePanel();
    if (isСustomTimeInputElem) hidePanel();
  });
});
