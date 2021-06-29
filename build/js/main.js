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

// Переключаетль меню
(function () {
  var MAX_WIDTH = 1023;

  var toggle = document.querySelector('.burger');
  var menu = document.querySelector('.header__nav');

  var changeButtonLabel = function () {
    if (toggle.classList.contains('burger__active')) {
      toggle.children[0].innerText = 'Закрыть меню';
    } else {
      toggle.children[0].innerText = 'Открыть меню';
    }
  };

  var showerMenu = function () {
    document.documentElement.classList.toggle('page--menu-open');
    toggle.classList.toggle('burger__active');
    menu.classList.toggle('header__menu-open');

    changeButtonLabel();
  };

  var onMenuLinkClick = function (evt) {
    if (evt.target.tagName === 'A') {
      showerMenu();
    }
  };

  var onMenuButtonClick = function () {
    showerMenu();
  };

  var menuToggleHandlers = function () {
    if (window.innerWidth > MAX_WIDTH) {
      toggle.removeEventListener('click', onMenuButtonClick);
      menu.removeEventListener('click', onMenuLinkClick);
    } else {
      toggle.addEventListener('click', onMenuButtonClick);
      menu.addEventListener('click', onMenuLinkClick);
    }
  };

  toggle.addEventListener('click', onMenuButtonClick);
  menu.addEventListener('click', onMenuLinkClick);

  menuToggleHandlers();

  window.addEventListener('optimizedResize', function () {
    menuToggleHandlers();
  });
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
  var inputTel = document.querySelector('input[type="tel"]');

  if (inputTel) {
    var onKeyPress = function (evt) {
      if (evt.keyCode < 48 || evt.keyCode > 57) {
        evt.preventDefault();
      }
    };

    var onKeyDown = function (evt) {
      if (evt.key === 'Backspace' && inputTel.value.length <= 2) {
        evt.preventDefault();
      }
    };

    var onFocus = function () {
      if (inputTel.value.length === 0) {
        inputTel.value = '+7';
        inputTel.selectionStart = inputTel.value.length;
      }
    };

    var onBlur = function () {
      if (inputTel.value === '+7') {
        inputTel.value = '';
      }
    };

    var onClick = function () {
      if (inputTel.selectionStart < 2) {
        inputTel.selectionStart = inputTel.value.length;
      }
    };

    inputTel.addEventListener('keypress', onKeyPress);
    inputTel.addEventListener('keydown', onKeyDown);
    inputTel.addEventListener('focus', onFocus);
    inputTel.addEventListener('blur', onBlur);
    inputTel.addEventListener('click', onClick);
  }
})();
