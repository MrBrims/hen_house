// Плавная прокрутка

const menuLinks = document.querySelectorAll('.go-to[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - 0;

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}

// Квиз

function stepForm() {
  const stepsQuiz = document.querySelectorAll('.quiz__item')
  const prevBtnQuiz = document.querySelector('.quiz__btn-prev')
  const nextBtnQuiz = document.querySelector('.quiz__btn-next')
  const submitBtnQuiz = document.querySelector('.quiz__btn-submit')
  const stepNumbersQuiz = document.querySelectorAll('.quiz__step')
  const progressQuiz = document.querySelector('.quiz__success')

  let formStepIndex = 0

  prevBtnQuiz.addEventListener('click', () => {
    formStepIndex--
    stepNumbersQuiz[formStepIndex + 1].classList.remove('--active-step')
    updateFormSteps()
  })

  nextBtnQuiz.addEventListener('click', () => {
    formStepIndex++
    updateFormSteps()
  })

  function updateFormSteps() {
    stepsQuiz.forEach((step) => {
      step.classList.contains('--active') && step.classList.remove('--active')
    })

    stepsQuiz[formStepIndex].classList.add('--active')
    stepNumbersQuiz[formStepIndex].classList.add('--active-step')

    if (formStepIndex === 0) {
      prevBtnQuiz.style.display = 'none'
    } else {
      prevBtnQuiz.style.display = 'inline-block'
    }

    if (formStepIndex === stepsQuiz.length - 1) {
      nextBtnQuiz.style.display = 'none'
      submitBtnQuiz.style.display = 'inline-block'
    } else {
      submitBtnQuiz.style.display = 'none'
      nextBtnQuiz.style.display = 'inline-block'
    }

    const activeStep = document.querySelectorAll('.--active-step')
    const percentSucces = ((activeStep.length - 1) / (stepNumbersQuiz.length - 1)) * 100 + '%'

    progressQuiz.style.width = percentSucces
  }
  updateFormSteps()
}
stepForm();


// Табы

const tabItems = Array.from(document.querySelectorAll('.tab__nav'))
const tabContent = Array.from(document.querySelectorAll('.tab__content'))

const tabClearClass = (element, className = '--active-tab') => {
  element.find(item => item.classList.remove(`${className}`))
}

const tabSetClass = (element, index, className = '--active-tab') => {
  element[index].classList.add(`${className}`)
}

const tabCheckout = (item, index) => {
  item.addEventListener('click', () => {

    if (item.classList.contains('--active-tab')) return

    tabClearClass(tabItems)
    tabClearClass(tabContent)

    tabSetClass(tabItems, index)
    tabSetClass(tabContent, index)
  })
}

tabItems.forEach(tabCheckout)

// Слайдер гарантий

let swiperSecutity = new Swiper(".security__gallery", {
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".security__gallery-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".security__gallery-next",
    prevEl: ".security__gallery-prev",
  },
});

// Слайдер материалов

let swiperMaterials = new Swiper(".materials__slider", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".materials__pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".materials__btn-next",
    prevEl: ".materials__btn-prev",
  },
});

// Слайдер Отзывов

let swiperReviews = new Swiper(".reviews__slider", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".reviews__slides-nav",
    clickable: true,
  },
  navigation: {
    nextEl: ".reviews__btn-next",
    prevEl: ".reviews__btn-prev",
  },
});

// Табы с селектом

let selectTab = function () {
  const tabSelect = document.querySelector('.tab-select__nav');
  let selectTabHeader = document.querySelectorAll('.tab-select__nav-header');
  let selectTabNav = document.querySelectorAll('.tab-select__nav-item');

  selectTabHeader.forEach(item => {
    item.addEventListener('click', selectTabToggle)
  });

  selectTabNav.forEach(item => {
    item.addEventListener('click', selectTabChoose)
  });

  function selectTabToggle() {
    this.parentElement.classList.toggle('--active-select')
  }

  function selectTabChoose() {
    let tabHTML = this.innerHTML,
      select = this.closest('.tab-select__nav'),
      currentHTML = select.querySelector('.tab-select__nav-current');
    currentHTML.innerHTML = tabHTML;
    select.classList.remove('--active-select');
  }

  document.addEventListener('mouseup', (e) => {
    if (!tabSelect.contains(e.target)) tabSelect.classList.remove('--active-select')
  })

};
selectTab();

const estimateTabItems = Array.from(document.querySelectorAll('.tab-select__nav-item'))
const estimateTabContent = Array.from(document.querySelectorAll('.tab-select__content-item'))

const estimateTabClearClass = (element, className = '--active-content') => {
  element.find(item => item.classList.remove(`${className}`))
}

const estimateTabSetClass = (element, index, className = '--active-content') => {
  element[index].classList.add(`${className}`)
}

const estimateTabCheckout = (item, index) => {
  item.addEventListener('click', () => {

    if (item.classList.contains('--active-content')) return

    estimateTabClearClass(estimateTabItems)
    estimateTabClearClass(estimateTabContent)

    estimateTabSetClass(estimateTabItems, index)
    estimateTabSetClass(estimateTabContent, index)
  })
}

estimateTabItems.forEach(estimateTabCheckout)

//Попап

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});

(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;
      while (node) {
        if (node.matches(css)) return node;
        else node = node.parentElement;
      }
      return null;
    };
  }
})();
(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector;
  }
})();
