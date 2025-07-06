let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout((() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty("height") : null;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      !showmore ? target.style.removeProperty("overflow") : null;
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideUpDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty("height") : null;
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout((() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
      document.dispatchEvent(new CustomEvent("slideDownDone", {
        detail: {
          target
        }
      }));
    }), duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

//Меню
const iconMenu = document.querySelector('.top-header__icon');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    e.stopPropagation();
    document.documentElement.classList.toggle("menu-open");
  });

  const menuBody = document.querySelector('.bottom-header');
  document.addEventListener('click', function (e) {
    const isClickInsideMenuBody = menuBody?.contains(e.target);

    if (!isClickInsideMenuBody && document.documentElement.classList.contains("menu-open")) {
      document.documentElement.classList.remove("menu-open");
    }
  });
}

// Пункты меню
const menuItems = document.querySelectorAll('.menu-item');

if (menuItems) {
  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      // Если клик по уже активному элементу — убираем _active и выходим
      if (this.classList.contains('_active')) {
        this.classList.remove('_active');
        return;
      }

      // Убираем _active у всех элементов
      menuItems.forEach(el => {
        el.classList.remove('_active');
      });

      // Добавляем _active текущему элементу
      this.classList.add('_active');
    });
  });
}
/*
const menuItems = document.querySelectorAll('.menu-item');
if (menuItems) {
  const mobileBreakpoint = 1100;
 
  function isMobile() {
    return window.innerWidth < mobileBreakpoint;
  }
 
  // Hover для десктопа
  function addHoverListeners(item) {
    item.addEventListener('mouseenter', () => {
      document.documentElement.classList.add('menu-active');
      item.classList.add('_active');
      const submenu = item.querySelector('.menu__submenu, .menu__submenu2');
      if (submenu) _slideDown(submenu);
    });
 
    item.addEventListener('mouseleave', () => {
      document.documentElement.classList.remove('menu-active');
      item.classList.remove('_active');
      const submenu = item.querySelector('.menu__submenu, .menu__submenu2');
      if (submenu) _slideUp(submenu);
    });
  }
 
  // Клик для мобильных
  function addClickListeners(item) {
    const link = item.querySelector('.menu__link');
    const submenu = item.querySelector('.menu__submenu, .menu__submenu2');
 
    link.addEventListener('click', (e) => {
      e.preventDefault();
 
      // Закрываем все открытые пункты
      menuItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('_active');
          const otherSubmenu = otherItem.querySelector('.menu__submenu, .menu__submenu2');
          if (otherSubmenu) _slideUp(otherSubmenu);
        }
      });
 
      const isActive = item.classList.contains('_active');
 
      if (isActive) {
        item.classList.remove('_active');
        if (submenu) _slideUp(submenu);
      } else {
        item.classList.add('_active');
        if (submenu) _slideDown(submenu);
      }
    });
  }
 
  // Инициализация
  function initMenu() {
    // Сбрасываем _active у всех, кроме первого активного
    let hasActive = false;
 
    menuItems.forEach((item, index) => {
      const submenu = item.querySelector('.menu__submenu, .menu__submenu2');
      if (!submenu) return;
 
      if (item.classList.contains('_active')) {
        if (!hasActive) {
          hasActive = true;
        } else {
          item.classList.remove('_active');
          _slideUp(submenu);
        }
      }
    });
 
    // Применяем обработчики событий и начальное состояние
    menuItems.forEach(item => {
      const submenu = item.querySelector('.menu__submenu, .menu__submenu2');
      if (!submenu) return;
 
      // Очистка обработчиков через клонирование
      const clone = item.cloneNode(true);
      item.parentNode.replaceChild(clone, item);
 
      if (isMobile()) {
        addClickListeners(clone);
      } else {
        addHoverListeners(clone);
      }
 
      // Применяем начальное состояние (если активный)
      if (clone.classList.contains('_active')) {
        const activeSubmenu = clone.querySelector('.menu__submenu, .menu__submenu2');
        if (activeSubmenu) _slideDown(activeSubmenu);
      } else {
        const inactiveSubmenu = clone.querySelector('.menu__submenu, .menu__submenu2');
        if (inactiveSubmenu) _slideUp(inactiveSubmenu);
      }
    });
  }
 
  // Инициализируем при загрузке
  window.addEventListener('DOMContentLoaded', initMenu);
 
  // Обновление при ресайзе
  window.addEventListener('resize', () => {
    if (window.innerWidth > mobileBreakpoint) {
      document.documentElement.classList.remove('menu-active');
      menuItems.forEach(item => {
        const submenu = item.querySelector('.menu__submenu, .menu__submenu2');
        if (submenu && !item.classList.contains('_active')) {
          _slideUp(submenu);
        }
      });
    }
    initMenu();
  });
}
*/

// Добавление к шапке при скролле
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      header.classList.add('_header-scroll');
    } else {
      header.classList.remove('_header-scroll');
    }
  });
}

function indents() {
  const header = document.querySelector('.header');
  const page = document.querySelector('.main');

  //Оступ от шапки
  let hHeader = window.getComputedStyle(header, false).height;
  hHeader = Number(hHeader.slice(0, hHeader.length - 2));

  if (page) {
    page.style.paddingTop = hHeader + 'px';
  }

}
window.addEventListener('scroll', () => {
  indents();
});
window.addEventListener('resize', () => {
  indents();
});
indents();

//Фильтр
const filterButtons = document.querySelectorAll('[data-filter]');
const contentItems = document.querySelectorAll('[data-category]');

if (filterButtons) {
  // Функция для обновления отображения контента
  function updateContentDisplay(activeFilter) {
    contentItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (category === activeFilter) {
        item.classList.remove('_hide');
      } else {
        item.classList.add('_hide');
      }
    });
  }

  // Инициализация: скрыть всё, кроме активного фильтра
  const activeButton = document.querySelector('[data-filter]._active');
  if (activeButton) {
    const initialFilter = activeButton.getAttribute('data-filter');
    updateContentDisplay(initialFilter);
  }

  // Обработчик клика по кнопкам фильтра
  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Удалить _active у всех кнопок и добавить текущей
      filterButtons.forEach(btn => btn.classList.remove('_active'));
      this.classList.add('_active');

      // Получить значение текущего фильтра
      const activeFilter = this.getAttribute('data-filter');

      // Обновить отображение контента
      updateContentDisplay(activeFilter);
    });
  });
}

//========================================================================================================================================================

if (document.querySelector('.top-block-intro__slider')) {
  const swiperIntro = new Swiper('.top-block-intro__slider', {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 5,
    loop: true,
    speed: 400,
    navigation: {
      prevEl: '.top-block-intro__arrow-prev',
      nextEl: '.top-block-intro__arrow-next',
    },
    pagination: {
      el: '.top-block-intro__pagination',
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
}