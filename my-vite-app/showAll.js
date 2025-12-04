document.addEventListener('DOMContentLoaded', function () {
  // Основные элементы
  const main = document.querySelector('.main');
  const header = document.querySelector('.header');
  const sideMenu = document.querySelector('.side_menu__navigation');
  const mobileMenu = document.querySelector('.side_menuMobile');
  const slideMenu = document.querySelector('.main__services--slide_menu');
  
  // Модальные окна
  const modalFeedback = document.querySelector('.modal_feedback_mobile');
  const modalCall = document.querySelector('.modal_call');
  
  /*----------------------- Функции управления блюром ----------------------- */
  function addBlurOverlay() {
    main.classList.add('menu-overlay');
    header.classList.add('menu-overlay');
  }
  
  function removeBlurOverlay() {
    main.classList.remove('menu-overlay');
    header.classList.remove('menu-overlay');
    if (sideMenu) sideMenu.classList.remove('menu-overlay');
  }
  
  /*----------------------- btn-showAll ----------------------- */
  const showAllBtns = document.querySelectorAll('.main__services--block_information--read_more');
  
  showAllBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const targetID = this.dataset.toggle;
      const targetWrapper = document.querySelector(`[data-wrapper="${targetID}"]`);
      
      if (!targetWrapper) return;
      
      const textElement = this.querySelector('.main__services--block_information--read_more_text');
      const iconElement = this.querySelector('img');
      
      const isExpanded = targetWrapper.classList.toggle('expanded');
      
      if (isExpanded) {
        textElement.textContent = 'Скрыть';
        iconElement.src = 'src/images/icons/close.svg';
      } else {
        textElement.textContent = 'Показать всё';
        iconElement.src = '/src/images/icons/expand.svg';
      }
    });
  });
  
  /*----------------------- Mobile_side_menu ----------------------- */
  function toggleMobileMenu() {
    if (window.innerWidth >= 1369) return;
    
    const isOpening = !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    
    if (isOpening) {
      addBlurOverlay();
    } else {
      removeBlurOverlay();
    }
  }
  
  // Открытие мобильного меню
  const burgerBtn = document.querySelector('.header__navigation--link-burger');
  if (burgerBtn) {
    burgerBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Закрытие мобильного меню
  const closeMobileMenuBtn = document.querySelector('.side_menuMobile__navigation--icon-cross');
  if (closeMobileMenuBtn) {
    closeMobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  /*----------------------- Slide_menu ----------------------- */
  if (slideMenu) {
    const buttons = slideMenu.querySelectorAll('.main__services--slide_menu-button');
    
    // Активируем первую кнопку, если есть
    if (buttons.length > 0) {
      buttons[0].classList.add('main__services--slide_menu-button-active');
    }
    
    slideMenu.addEventListener('click', event => {
      const clickedBtn = event.target.closest('.main__services--slide_menu-button');
      
      if (!clickedBtn) return;
      
      buttons.forEach(btn => {
        btn.classList.remove('main__services--slide_menu-button-active');
      });
      
      clickedBtn.classList.add('main__services--slide_menu-button-active');
      
      // Добавляем блюр при переключении слайдов
      addBlurOverlay();
      
      // Убираем через 300мс
      setTimeout(() => {
        if (!modalFeedback || !modalFeedback.classList.contains('open')) {
          if (!modalCall || !modalCall.classList.contains('open')) {
            if (!mobileMenu || !mobileMenu.classList.contains('open')) {
              removeBlurOverlay();
            }
          }
        }
      }, 300);
    });
  }
  
  /*----------------------- Modal_Feedback ----------------------- */
  function toggleModalFeedback() {
    const isOpening = !modalFeedback.classList.contains('open');
    
    if (isOpening) {
      // Закрываем другие модалки
      if (modalCall && modalCall.classList.contains('open')) {
        modalCall.classList.remove('open');
      }
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
      }
      
      modalFeedback.classList.add('open');
      addBlurOverlay();
      if (sideMenu) sideMenu.classList.add('menu-overlay');
    } else {
      modalFeedback.classList.remove('open');
      removeBlurOverlay();
    }
  }
  
  // Открытие модалки обратной связи
  const iconTools = document.getElementById('icon_tools');
  if (iconTools) {
    iconTools.addEventListener('click', toggleModalFeedback);
  }
  
  // Закрытие модалки обратной связи
  const closeFeedbackBtn = document.querySelector('.modal_feedback_mobile--icon-cross');
  if (closeFeedbackBtn) {
    closeFeedbackBtn.addEventListener('click', toggleModalFeedback);
  }
  
  // Открытие через кнопку "Оставить заявку"
  const submitYourApplicationBtn = document.getElementById('submitYourApplication');
  if (submitYourApplicationBtn) {
    submitYourApplicationBtn.addEventListener('click', toggleModalFeedback);
  }
  
  /*----------------------- Modal_Call ----------------------- */
  function toggleModalCall() {
    const isOpening = !modalCall.classList.contains('open');
    
    if (isOpening) {
      // Закрываем другие модалки
      if (modalFeedback && modalFeedback.classList.contains('open')) {
        modalFeedback.classList.remove('open');
      }
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
      }
      
      modalCall.classList.add('open');
      addBlurOverlay();
    } else {
      modalCall.classList.remove('open');
      removeBlurOverlay();
    }
  }
  
  // Открытие модалки звонка с десктопа
  const phoneIcon = document.getElementById('phoneIcon');
  if (phoneIcon) {
    phoneIcon.addEventListener('click', toggleModalCall);
  }
  
  // Открытие модалки звонка с мобильного
  const phoneIconMobile = document.getElementById('phoneIcon_mobile');
  if (phoneIconMobile) {
    phoneIconMobile.addEventListener('click', toggleModalCall);
  }
  
  // Закрытие модалки звонка
  const closeCallBtn = document.querySelector('.modal_call--icon-cross');
  if (closeCallBtn) {
    closeCallBtn.addEventListener('click', toggleModalCall);
  }
  
  /*----------------------- Вспомогательные функции ----------------------- */
  function closeAllModals() {
    // Закрываем все модальные окна
    if (modalFeedback && modalFeedback.classList.contains('open')) {
      modalFeedback.classList.remove('open');
    }
    if (modalCall && modalCall.classList.contains('open')) {
      modalCall.classList.remove('open');
    }
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
    }
    
    // Убираем оверлей
    removeBlurOverlay();
  }
  
  // Закрытие по ESC
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeAllModals();
    }
  });
  
  // Закрытие по клику вне меню
  main.addEventListener('click', event => {
    const isMenuOpen = mobileMenu && mobileMenu.classList.contains('open');
    const isBurgerClick = event.target.closest('.header__navigation--link-burger');
    
    if (isMenuOpen && !isBurgerClick) {
      toggleMobileMenu();
    }
  });
  
  /*----------------------- Глобальный обработчик для всех кнопок ----------------------- */
  document.addEventListener('click', function(event) {
    // Проверяем, является ли элемент кнопкой или ссылкой
    const target = event.target;
    const isButton = target.tagName === 'BUTTON' || target.closest('button');
    const isLink = target.tagName === 'A' || target.closest('a[href]');
    const isClickable = isButton || isLink;
    
    if (!isClickable) return;
    
    // Проверяем исключения (не должны добавлять блюр)
    const isContactsIcon = target.closest('img[src*="/src/images/icons/contacts.svg"]');
    const isShowAllBtn = target.closest('.main__services--block_information--read_more');
    
    if (isContactsIcon || isShowAllBtn) return;
    
    // Проверяем, не является ли это уже обработанной специальной кнопкой
    const specialButtonsSelectors = [
      '.header__navigation--link-burger',
      '.modal_feedback_mobile--icon-cross',
      '.modal_call--icon-cross',
      '.side_menuMobile__navigation--icon-cross',
      '.main__services--slide_menu-button',
      '#icon_tools',
      '#phoneIcon',
      '#phoneIcon_mobile',
      '#submitYourApplication'
    ];
    
    let isSpecialButton = false;
    for (const selector of specialButtonsSelectors) {
      if (target.closest(selector)) {
        isSpecialButton = true;
        break;
      }
    }
    
    if (!isSpecialButton) {
      // Добавляем блюр для всех остальных кнопок/ссылок
      addBlurOverlay();
      
      // Убираем через 300мс, если нет открытых модалок
      setTimeout(() => {
        const isAnyModalOpen = 
          (modalFeedback && modalFeedback.classList.contains('open')) ||
          (modalCall && modalCall.classList.contains('open')) ||
          (mobileMenu && mobileMenu.classList.contains('open'));
        
        if (!isAnyModalOpen) {
          removeBlurOverlay();
        }
      }, 300);
    }
  });
  
  /*----------------------- Валидация форм ----------------------- */
  // Валидация формы обратной связи
  const feedbackForm = document.querySelector('.modal_feedback_mobile_form');
  
  if (feedbackForm) {
    const submitBtn = document.getElementById('submitBtn');
    
    if (submitBtn) {
      submitBtn.addEventListener('click', e => {
        e.preventDefault();
        
        if (validateFeedbackForm()) {
          clearForm(feedbackForm);
          clearAllErrors(feedbackForm);
          
          // Закрываем модалку после успешной отправки
          toggleModalFeedback();
        }
      });
    }
  }
  
  // Валидация формы звонка
  const callForm = document.querySelector('.modal_call_form');
  
  if (callForm) {
    const submitBtnCall = document.getElementById('submitBtn_call');
    
    if (submitBtnCall) {
      submitBtnCall.addEventListener('click', e => {
        e.preventDefault();
        
        if (validateCallForm()) {
          clearForm(callForm);
          clearAllErrors(callForm);
          
          // Закрываем модалку после успешной отправки
          toggleModalCall();
        }
      });
    }
  }
  
  function validateFeedbackForm() {
    if (!feedbackForm) return false;
    
    clearAllErrors(feedbackForm);
    
    const formData = {
      name: feedbackForm.querySelector('input[name="name"]'),
      phone: feedbackForm.querySelector('input[name="phone"]'),
      email: feedbackForm.querySelector('input[name="email"]'),
      message: feedbackForm.querySelector('textarea[name="message"]')
    };
    
    let isValid = true;
    
    // Валидация имени
    if (!formData.name.value.trim()) {
      showError(formData.name, 'Введите ваше имя');
      isValid = false;
    } else if (formData.name.value.trim().length < 2) {
      showError(formData.name, 'Имя должно содержать минимум 2 символа');
      isValid = false;
    }
    
    // Валидация телефона
    if (!formData.phone.value.trim()) {
      showError(formData.phone, 'Введите номер телефона');
      isValid = false;
    } else if (!isValidPhone(formData.phone.value.trim())) {
      showError(formData.phone, 'Введите корректный номер телефона');
      isValid = false;
    }
    
    // Валидация email
    if (!formData.email.value.trim()) {
      showError(formData.email, 'Введите email');
      isValid = false;
    } else if (!isValidEmail(formData.email.value.trim())) {
      showError(formData.email, 'Введите корректный email');
      isValid = false;
    }
    
    // Валидация сообщения
    if (!formData.message.value.trim()) {
      showError(formData.message, 'Введите сообщение');
      isValid = false;
    } else if (formData.message.value.trim().length < 10) {
      showError(formData.message, 'Сообщение должно содержать минимум 10 символов');
      isValid = false;
    }
    
    return isValid;
  }
  
  function validateCallForm() {
    if (!callForm) return false;
    
    clearAllErrors(callForm);
    
    const phoneInput = callForm.querySelector('input[name="phone"]');
    let isValid = true;
    
    if (!phoneInput.value.trim()) {
      showError(phoneInput, 'Введите номер телефона');
      isValid = false;
    } else if (!isValidPhone(phoneInput.value.trim())) {
      showError(phoneInput, 'Введите корректный номер телефона');
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
  
  function showError(input, message) {
    if (!input) return;
    
    input.classList.add('error');
    
    // Создаем элемент с сообщением об ошибке
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
    errorMessage.style.fontSize = '12px';
    errorMessage.style.marginTop = '5px';
    
    // Вставляем после input
    input.parentNode.insertBefore(errorMessage, input.nextSibling);
  }
  
  function clearAllErrors(form) {
    if (!form) return;
    
    // Убираем класс error с полей
    form.querySelectorAll('.error').forEach(field => {
      field.classList.remove('error');
    });
    
    // Удаляем сообщения об ошибках
    form.querySelectorAll('.error-message').forEach(message => {
      message.remove();
    });
  }
  
  function clearForm(form) {
    if (!form) return;
    
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.value = '';
    });
  }
  
  /*----------------------- Навигация и языки ----------------------- */
  // Десктопное меню
  const navItems = document.querySelectorAll('.side_menu__navigation-list--li');
  navItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      
      navItems.forEach(navItem => {
        navItem.classList.remove('active');
      });
      
      this.classList.add('active');
      
      // Добавляем блюр для пунктов меню
      addBlurOverlay();
      
      // Убираем через 300мс
      setTimeout(() => {
        if (!modalFeedback || !modalFeedback.classList.contains('open')) {
          if (!modalCall || !modalCall.classList.contains('open')) {
            if (!mobileMenu || !mobileMenu.classList.contains('open')) {
              removeBlurOverlay();
            }
          }
        }
      }, 300);
    });
  });
  
  // Десктопные языки
  const languageButtons = document.querySelectorAll('.side_menu__navigation-languages button');
  languageButtons.forEach(button => {
    button.addEventListener('click', function () {
      languageButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      this.classList.add('active');
      
      // Добавляем блюр для кнопок языков
      addBlurOverlay();
      
      // Убираем через 300мс
      setTimeout(() => {
        if (!modalFeedback || !modalFeedback.classList.contains('open')) {
          if (!modalCall || !modalCall.classList.contains('open')) {
            if (!mobileMenu || !mobileMenu.classList.contains('open')) {
              removeBlurOverlay();
            }
          }
        }
      }, 300);
    });
  });
  
  // Мобильное меню
  const navItemsMobile = document.querySelectorAll('.side_menuMobile__navigation-list--li');
  navItemsMobile.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      
      navItemsMobile.forEach(navItem => {
        navItem.classList.remove('active');
      });
      
      this.classList.add('active');
      
      // Добавляем блюр для пунктов меню
      addBlurOverlay();
      
      // Убираем через 300мс
      setTimeout(() => {
        if (!modalFeedback || !modalFeedback.classList.contains('open')) {
          if (!modalCall || !modalCall.classList.contains('open')) {
            if (!mobileMenu || !mobileMenu.classList.contains('open')) {
              removeBlurOverlay();
            }
          }
        }
      }, 300);
    });
  });
  
  // Мобильные языки
  const languageButtonsMobile = document.querySelectorAll('.side_menuMobile__navigation-languages button');
  languageButtonsMobile.forEach(button => {
    button.addEventListener('click', function () {
      languageButtonsMobile.forEach(btn => {
        btn.classList.remove('active');
      });
      
      this.classList.add('active');
      
      // Добавляем блюр для кнопок языков
      addBlurOverlay();
      
      // Убираем через 300мс
      setTimeout(() => {
        if (!modalFeedback || !modalFeedback.classList.contains('open')) {
          if (!modalCall || !modalCall.classList.contains('open')) {
            if (!mobileMenu || !mobileMenu.classList.contains('open')) {
              removeBlurOverlay();
            }
          }
        }
      }, 300);
    });
  });
});