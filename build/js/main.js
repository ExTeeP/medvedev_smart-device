'use strict';

document.documentElement.classList.remove('nojs');

// Оптимизация ресайза окна
(function () {
  var throttle = function (type, name, obj) {
    obj = obj || window;
    var running = false;

    var func = function () {
      if (running) {
        return;
      }

      running = true;

      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  throttle('resize', 'optimizedResize');
})();

// Показ модального окна
(function () {
  var buttonCallback = document.querySelector('#button-callback');
  var feedbackModal = document.querySelector('#modal-feedback');
  var closeModalButtons = feedbackModal.querySelectorAll('.modal__close-button');
  var modalForm = feedbackModal.querySelector('.modal__form');
  var nameField = modalForm.querySelector('#modal-customer-name');
  var telField = modalForm.querySelector('#modal-customer-phone');
  var messageField = modalForm.querySelector('#modal-customer-agreement');

  var isStorageSupport = true;
  var storageTel = '';
  var storageName = '';
  var storageMessage = '';

  try {
    storageTel = localStorage.getItem('tel');
    storageName = localStorage.getItem('name');
    storageMessage = localStorage.getItem('message');
  } catch (err) {
    isStorageSupport = false;
  }

  var showModal = function (element) {
    document.body.classList.add('page--modal-open');
    element.classList.add('active-modal');
    element.classList.remove('hidden');
    document.addEventListener('keydown', onModalEscPress);
    element.addEventListener('click', onOverlayClick);
  };

  // Закрытие модального окна
  var closeModal = function () {
    var element = document.querySelector('.active-modal');

    document.body.classList.remove('page--modal-open');
    element.classList.remove('active-modal');
    element.classList.add('hidden');
    document.removeEventListener('keydown', onModalEscPress);
  };

  var onOverlayClick = function (evt) {
    if (evt.target.classList.contains('modal')) {
      closeModal();
    }
  };

  // Нажатие на Esc закрывает окно
  var onModalEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeModal();
    }
  };

  var showFeedbackModal = function () {
    showModal(feedbackModal);
    var userName = feedbackModal.querySelector('#modal-customer-name');

    if (storageTel && storageName && storageMessage) {
      telField.value = storageTel;
      nameField.value = storageName;
      messageField.value = storageMessage;
      feedbackModal.focus();
    } else {
      userName.focus();
    }
  };

  var onFormModalSubmit = function (evt) {
    evt.preventDefault();
    closeModal();
  };

  buttonCallback.addEventListener('click', function (evt) {
    evt.preventDefault();
    showFeedbackModal(evt);
  });

  closeModalButtons.forEach(function (element) {
    element.addEventListener('click', function () {
      closeModal();
    });
  });

  modalForm.addEventListener('submit', onFormModalSubmit);
})();

// Плавная прокрутка по якорям
(function () {
  var pageAnchors = document.querySelectorAll('a[href^="#block-"]');

  pageAnchors.forEach(function (link) {

    link.addEventListener('click', function (evt) {
      evt.preventDefault();

      var blockID = link.getAttribute('href');
      document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
})();

// Маска ввода телефона
(function () {
  var inputTel = document.querySelectorAll('input[type="tel"]');
  var im = new Inputmask('+7 (999) 999-99-99');


  inputTel.forEach(function (it) {
    im.mask(it);
  });

})();

// Закрытие аккордеона при повторном нажатии
(function () {
  var accordeonButton = document.querySelectorAll('.accordeon__checkbox');

  function clickRadio(evt) {
    var target = evt.target;

    for (var i = 0; i < accordeonButton.length; i++) {
      if (accordeonButton[i] !== target) {
        accordeonButton[i].oldChecked = false;
      }
    }

    if (target.oldChecked) {
      target.checked = false;
    }

    target.oldChecked = target.checked;
  }

  for (var i = 0; i < accordeonButton.length; i++) {
    accordeonButton[i].addEventListener('click', clickRadio);
  }
})();

// Форма отправки
(function () {
  var feedbackForm = document.querySelector('.feedback-form form');

  feedbackForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
})();
