document.addEventListener('DOMContentLoaded', function () {
  /*-----------------------btn-showAll----------------------- */
  const showAllBtns = document.querySelectorAll(
    '.main__services--block_information--read_more'
  );

  showAllBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const targetID = this.getAttribute('data-toggle');
      const targetWrapper = document.querySelector(
        `[data-wrapper="${targetID}"]`
      );

      if (targetWrapper) {
        const isExpanded = targetWrapper.classList.contains('expanded');
        const textElement = this.querySelector(
          '.main__services--block_information--read_more_text'
        );
        const iconElement = this.querySelector('img');

        if (isExpanded) {
          targetWrapper.classList.remove('expanded');
          textElement.textContent = 'Показать всё';
          iconElement.src = '/src/images/icons/expand.svg';
        } else {
          targetWrapper.classList.add('expanded');
          textElement.textContent = 'Скрыть';

          iconElement.src = 'src/images/icons/close.svg';
        }
      }
    });
  });

  /*------------------------------------------------------- */

  /*-----------------------Mobile_side_menu----------------------- */

  const main = document.querySelector('.main');
  const mobileMenu = document.querySelector('.side_menuMobile');
  const header = document.querySelector('.header');

  function toggleMobileMenu() {
    if (window.innerWidth >= 1369) {
      return;
    }

    mobileMenu.classList.toggle('open');
    main.classList.toggle('menu-overlay');
    header.classList.toggle('menu-overlay');
  }

  document
    .querySelector('.header__navigation--link-burger')
    .addEventListener('click', toggleMobileMenu);

  document
    .querySelector('.side_menuMobile__navigation--icon-cross')
    .addEventListener('click', toggleMobileMenu);

  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      document.querySelector('.side_menuMobile').classList.contains('open')
    ) {
      toggleMobileMenu();
    }
  });

  document.querySelector('.main').addEventListener('click', function (event) {
    const isMenuOpen = document
      .querySelector('.side_menuMobile')
      .classList.contains('open');

    const isBurgerClick = event.target.closest(
      '.header__navigation--link-burger'
    );

    if (isMenuOpen && !isBurgerClick) {
      toggleMobileMenu();
    }
  });

  /*------------------------------------------------------------------- */

  /*----------------------------Slide_menu----------------------------- */

  const slideMenu = document.querySelector('.main__services--slide_menu');
  const buttons = slideMenu.querySelectorAll(
    '.main__services--slide_menu-button'
  );

  buttons[0]?.classList.add('main__services--slide_menu-button-active');

  slideMenu.addEventListener('click', function (event) {
    const clickeBtn = event.target.closest(
      '.main__services--slide_menu-button'
    );

    if (!clickeBtn) return;

    buttons.forEach((btn) =>
      btn.classList.remove('main__services--slide_menu-button-active')
    );
    clickeBtn.classList.add('main__services--slide_menu-button-active');
  });

  /*---------------------------------------------------------------------- */

  /*----------------------------Modal_Feedback----------------------------- */

  function toggleModalFeedback() {
    const mobileMenuFeedback = document.querySelector('.modal_feedback_mobile');
    const sideMenu = document.querySelector('.side_menu__navigation');

    mobileMenuFeedback.classList.toggle('open');
    main.classList.toggle('menu-overlay');
    sideMenu.classList.toggle('menu-overlay');
  }

  document
    .getElementById('icon_tools')
    .addEventListener('click', toggleModalFeedback);

  document
    .querySelector('.modal_feedback_mobile--icon-cross')
    .addEventListener('click', toggleModalFeedback);

  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      document
        .querySelector('.modal_feedback_mobile')
        .classList.contains('open')
    ) {
      toggleModalFeedback();
    }
  });

  document
    .getElementById('submitYourApplication')
    .addEventListener('click', toggleModalFeedback);

  /*------------------------------------------------------------------------ */

  /*----------------------------Modal_Call----------------------------- */
  const sideMenu = document.querySelector('.side_menu__navigation');
  function toggleModalCall() {
    const mobileMenuCall = document.querySelector('.modal_call');

    mobileMenuCall.classList.toggle('open');

    mobileMenu.classList.remove('open');
    main.classList.remove('menu-overlay');
    sideMenu.classList.remove('menu-overlay');
    header.classList.remove('menu-overlay');
  }

  document
    .getElementById('phoneIcon')
    .addEventListener('click', toggleModalCall);

  document
    .getElementById('phoneIcon_mobile')
    .addEventListener('click', toggleModalCall);

  document
    .querySelector('.modal_call--icon-cross')
    .addEventListener('click', toggleModalCall);

  document.addEventListener('keydown', function (event) {
    if (
      event.key === 'Escape' &&
      document.querySelector('.modal_call').classList.contains('open')
    ) {
      toggleModalCall();
    }
  });

  const feedbackForm = document.querySelector('.modal_call_form');

  function validateFeedbackForm() {
    clearAllErrors();

    const formData = {
      phone: feedbackForm.querySelector('input[name="phone"]'),
    };

    let isValid = true;

    if (!formData.phone.value.trim()) {
      showError(formData.phone, 'Введите номер телефона');
      isValid = false;
    } else if (!isValidPhone(formData.phone.value.trim())) {
      showError(formData.phone, 'Введите корректный номер телефона');
      isValid = false;
    }

    return isValid;
  }

  const submitBtnCall = document.getElementById('submitBtn_call');
  if (submitBtnCall) {
    submitBtnCall.addEventListener('click', (e) => {
      e.preventDefault();

      if (validateFeedbackForm()) {
        clearForm();
        clearAllErrors();

        const modal = document.querySelector('.modal_call');
        if (modal) {
          modal.classList.remove('open');
          main.classList.remove('menu-overlay');
          sideMenu.classList.remove('menu-overlay');
        }
      }
    });
  }

  /*------------------------------------------------------------------------ */

  /*----------------------------ValidateForm--------------------------------- */
  const form = document.querySelector('.modal_feedback_mobile_form');

  function validateForm() {
    clearAllErrors();

    const formData = {
      name: form.querySelector('input[name="name"]'),
      phone: form.querySelector('input[name="phone"]'),
      email: form.querySelector('input[name="email"]'),
      message: form.querySelector('textarea[name="message"]'),
    };

    let isValid = true;

    if (!formData.name.value.trim()) {
      showError(formData.name, 'Введите ваше имя');
      isValid = false;
    } else if (formData.name.value.trim().length < 2) {
      showError(formData.name, 'Имя должно содержать минимум 2 символа');
      isValid = false;
    }

    if (!formData.phone.value.trim()) {
      showError(formData.phone, 'Введите номер телефона');
      isValid = false;
    } else if (!isValidPhone(formData.phone.value.trim())) {
      showError(formData.phone, 'Введите корректный номер телефона');
      isValid = false;
    }

    if (!formData.email.value.trim()) {
      showError(formData.email, 'Введите email');
      isValid = false;
    } else if (!isValidEmail(formData.email.value.trim())) {
      showError(formData.email, 'Введите корректный email');
      isValid = false;
    }

    if (!formData.message.value.trim()) {
      showError(formData.message, 'Введите сообщение');
      isValid = false;
    } else if (formData.message.value.trim().length < 10) {
      showError(
        formData.message,
        'Сообщение должно содержать минимум 10 символов'
      );
      isValid = false;
    }

    return isValid;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  function showError(input) {
    if (!input) return;

    clearFieldError(input);
    input.classList.add('error');
  }

  function clearFieldError(input) {
    if (!input) return;

    input.classList.remove('error');

    const nextSibling = input.nextElementSibling;
    if (nextSibling && nextSibling.classList.contains('error-message')) {
      nextSibling.remove();
    }
  }

  function clearAllErrors() {
    const form = document.querySelector('.modal_feedback_mobile_form');
    if (!form) return;

    form.querySelectorAll('.error').forEach((field) => {
      field.classList.remove('error');
    });

    form.querySelectorAll('.error-message').forEach((message) => {
      message.remove();
    });
  }

  function clearForm() {
    document.querySelectorAll('input, textarea, select').forEach((field) => {
      field.value = '';
    });
  }

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (validateForm()) {
      clearForm();
      clearAllErrors();
    }
  });

  const navItems = document.querySelectorAll('.side_menu__navigation-list--li');

  navItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      navItems.forEach((navItem) => {
        navItem.classList.remove('active');
      });

      this.classList.add('active');
    });
  });

  const languageButtons = document.querySelectorAll(
    '.side_menu__navigation-languages button'
  );

  languageButtons.forEach((button) => {
    button.addEventListener('click', function () {
      languageButtons.forEach((btn) => {
        btn.classList.remove('active');
      });

      this.classList.add('active');
    });
  });

  const navItemsMobile = document.querySelectorAll(
    '.side_menuMobile__navigation-list--li'
  );

  navItemsMobile.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      navItemsMobile.forEach((navItem) => {
        navItem.classList.remove('active');
      });

      this.classList.add('active');
    });
  });

  const languageButtonsMobile = document.querySelectorAll(
    '.side_menuMobile__navigation-languages button'
  );

  languageButtonsMobile.forEach((button) => {
    button.addEventListener('click', function () {
      languageButtonsMobile.forEach((btn) => {
        btn.classList.remove('active');
      });

      this.classList.add('active');
    });
  });
});
