// Квиз

function stepForm() {
  const stepsQuiz = document.querySelectorAll('.quiz__item')
  const prevBtnQuiz = document.querySelector('.quiz__btn-prev')
  const nextBtnQuiz = document.querySelector('.quiz__btn-next')
  const submitBtnQuiz = document.querySelector('.quiz__btn-submit')
  const stepNumbersQuiz = document.querySelectorAll('.quiz__step')
  const progressQuiz = document.querySelector('.quiz__success')

  // form.addEventListener('submit', (e) => e.preventDefault())

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