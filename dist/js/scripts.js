const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    setTimeout((() => {
      lockPaddingElements.forEach((lockPaddingElement => {
        lockPaddingElement.style.paddingRight = "";
      }));
      document.body.style.paddingRight = "";
      document.documentElement.classList.remove("lock");
    }), delay);
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll("[data-lp]");
    const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
    lockPaddingElements.forEach((lockPaddingElement => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    }));
    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.classList.add("lock");
    bodyLockStatus = false;
    setTimeout((function () {
      bodyLockStatus = true;
    }), delay);
  }
};
function functions_FLS(message) {
  setTimeout((() => {
    if (window.FLS) console.log(message);
  }), 0);
}

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

function getHash() {
  if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
  const media = Array.from(array).filter(function (item) {
    return item.dataset[dataSetValue];
  });

  if (media.length) {
    const breakpointsArray = media.map(item => {
      const params = item.dataset[dataSetValue];
      const paramsArray = params.split(",");
      return {
        value: paramsArray[0],
        type: paramsArray[1] ? paramsArray[1].trim() : "max",
        item: item
      };
    });

    const mdQueries = uniqArray(
      breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
    );

    const mdQueriesArray = mdQueries.map(breakpoint => {
      const [query, value, type] = breakpoint.split(",");
      const matchMedia = window.matchMedia(query);
      const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
      return { itemsArray, matchMedia };
    });

    return mdQueriesArray;
  }
}

function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}

//========================================================================================================================================================

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

  // Установка отступа под шапку
  if (header && page) {
    let hHeader = window.getComputedStyle(header).height;
    hHeader = parseFloat(hHeader);
    page.style.paddingTop = hHeader + 'px';
  }

  // Расчёт высоты для слайдера товаров (только на десктопе)
  const mediaQuery = window.matchMedia("(min-width: 992px)");

  if (mediaQuery.matches) {
    const productsBottoms = document.querySelectorAll('.item-block-products__bottom');
    const productsItems = document.querySelector('.block-products-slider1');
    const productsArrowPrev = document.querySelector('.block-products__arrow-prev');
    const productsArrowNext = document.querySelector('.block-products__arrow-next');

    if (productsBottoms.length > 0) {
      let maxHeight = 0;

      productsBottoms.forEach(productsBottom => {
        const hproductsBottom = parseFloat(window.getComputedStyle(productsBottom).height);
        if (!isNaN(hproductsBottom)) {
          if (productsArrowPrev) productsArrowPrev.style.top = `calc(50% - ${hproductsBottom}px)`;
          if (productsArrowNext) productsArrowNext.style.top = `calc(50% - ${hproductsBottom}px)`;

          if (hproductsBottom > maxHeight) {
            maxHeight = hproductsBottom;
          }
        }
      });

      if (productsItems) {
        productsItems.style.marginBottom = -maxHeight + 'px';
      }
    }
  } else {
    // Удаляем стили при выходе из десктопного режима
    document.querySelectorAll('.block-products__arrow-prev, .block-products__arrow-next').forEach(arrow => {
      if (arrow) arrow.style.top = '';
    });

    const productsItems = document.querySelector('.block-products-slider1');
    if (productsItems) {
      productsItems.style.marginBottom = '';
    }
  }
}

// Вызываем один раз при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  indents();
});

// Слушатели событий
window.addEventListener('resize', indents);
window.addEventListener('scroll', indents);

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

//Инфо
document.querySelectorAll('.info').forEach(function (presentCard) {
  const presentBtn = presentCard.querySelector('button');

  if (presentBtn) {
    presentBtn.addEventListener('click', function (e) {
      e.stopPropagation();

      document.querySelectorAll('.info._active').forEach(function (card) {
        if (card !== presentCard) {
          card.classList.remove('_active');
        }
      });

      presentCard.classList.toggle('_active');
    });
  }
});
document.addEventListener('click', function (event) {
  document.querySelectorAll('.info._active').forEach(function (activeCard) {
    if (!activeCard.contains(event.target)) {
      activeCard.classList.remove('_active');
    }
  });
});

//Количество
function formQuantity() {
  document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.closest('[data-quantity-plus]') || targetElement.closest('[data-quantity-minus]')) {
      const valueElement = targetElement.closest('[data-quantity]').querySelector('[data-quantity-value]');
      let value = parseInt(valueElement.value);
      if (targetElement.hasAttribute('data-quantity-plus')) {
        value++;
        if (+valueElement.dataset.quantityMax && +valueElement.dataset.quantityMax < value) {
          value = valueElement.dataset.quantityMax;
        }
      } else {
        --value;
        if (+valueElement.dataset.quantityMin) {
          if (+valueElement.dataset.quantityMin > value) {
            value = valueElement.dataset.quantityMin;
          }
        } else if (value < 1) {
          value = 1;
        }
      }
      targetElement.closest('[data-quantity]').querySelector('[data-quantity-value]').value = value;
    }
  });
}
formQuantity();

//========================================================================================================================================================

//Селект
class SelectConstructor {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
      speed: 150
    };
    this.config = Object.assign(defaultConfig, props);
    this.selectClasses = {
      classSelect: "select",
      classSelectBody: "select__body",
      classSelectTitle: "select__title",
      classSelectValue: "select__value",
      classSelectLabel: "select__label",
      classSelectInput: "select__input",
      classSelectText: "select__text",
      classSelectLink: "select__link",
      classSelectOptions: "select__options",
      classSelectOptionsScroll: "select__scroll",
      classSelectOption: "select__option",
      classSelectContent: "select__content",
      classSelectRow: "select__row",
      classSelectData: "select__asset",
      classSelectDisabled: "_select-disabled",
      classSelectTag: "_select-tag",
      classSelectOpen: "_select-open",
      classSelectActive: "_select-active",
      classSelectFocus: "_select-focus",
      classSelectMultiple: "_select-multiple",
      classSelectCheckBox: "_select-checkbox",
      classSelectOptionSelected: "_select-selected",
      classSelectPseudoLabel: "_select-pseudo-label"
    };
    this._this = this;
    if (this.config.init) {
      const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
      if (selectItems.length) {
        this.selectsInit(selectItems);
      }
    }
  }

  getSelectClass(className) {
    return `.${className}`;
  }

  getSelectElement(selectItem, className) {
    return {
      originalSelect: selectItem.querySelector('select'),
      selectElement: selectItem.querySelector(this.getSelectClass(className)),
    };
  }

  selectsInit(selectItems) {
    selectItems.forEach((originalSelect, index) => {
      this.selectInit(originalSelect, index + 1);
    });
    document.addEventListener('click', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('keydown', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusin', function (e) {
      this.selectsActions(e);
    }.bind(this));
    document.addEventListener('focusout', function (e) {
      this.selectsActions(e);
    }.bind(this));
  }

  selectInit(originalSelect, index) {
    const _this = this;
    let selectItem = document.createElement("div");
    selectItem.classList.add(this.selectClasses.classSelect);
    originalSelect.parentNode.insertBefore(selectItem, originalSelect);
    selectItem.appendChild(originalSelect);
    originalSelect.hidden = true;
    index ? originalSelect.dataset.id = index : null;

    if (this.getSelectPlaceholder(originalSelect)) {
      originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
      if (this.getSelectPlaceholder(originalSelect).label.show) {
        const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
        selectItemTitle.insertAdjacentHTML('afterbegin', `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
      }
    }

    selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
    this.selectBuild(originalSelect);
    originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : this.config.speed;
    this.config.speed = +originalSelect.dataset.speed;

    originalSelect.addEventListener('change', function (e) {
      _this.selectChange(e);
    });
  }

  selectBuild(originalSelect) {
    const selectItem = originalSelect.parentElement;
    selectItem.dataset.id = originalSelect.dataset.id;
    originalSelect.dataset.classModif ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`) : null;
    originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
    originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);

    this.setSelectTitleValue(selectItem, originalSelect);
    this.setOptions(selectItem, originalSelect);
    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
    originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;
    this.selectDisabled(selectItem, originalSelect);
  }

  selectsActions(e) {
    const targetElement = e.target;
    const targetType = e.type;

    if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
      const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
      const originalSelect = this.getSelectElement(selectItem).originalSelect;

      if (targetType === 'click') {
        if (!originalSelect.disabled) {
          if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
            const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
            const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
            this.optionAction(selectItem, originalSelect, optionItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
            this.selectAction(selectItem);
          } else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
            const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
            this.optionAction(selectItem, originalSelect, optionItem);
          }
        }
      } else if (targetType === 'focusin' || targetType === 'focusout') {
        if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
          targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
        }
      } else if (targetType === 'keydown' && e.code === 'Escape') {
        this.selectsСlose();
      }
    } else {
      this.selectsСlose();
    }
  }

  selectsСlose(selectOneGroup) {
    const selectsGroup = selectOneGroup ? selectOneGroup : document;
    const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
    if (selectActiveItems.length) {
      selectActiveItems.forEach(selectActiveItem => {
        this.selectСlose(selectActiveItem);
      });
    }
  }

  selectСlose(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    if (!selectOptions.classList.contains('_slide')) {
      selectItem.classList.remove(this.selectClasses.classSelectOpen);
      _slideUp(selectOptions, originalSelect.dataset.speed);
      setTimeout(() => {
        selectItem.style.zIndex = '';
      }, originalSelect.dataset.speed);
    }
  }

  selectAction(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOpenzIndex = originalSelect.dataset.zIndex ? originalSelect.dataset.zIndex : 3;
    this.setOptionsPosition(selectItem);

    if (originalSelect.closest('[data-one-select]')) {
      const selectOneGroup = originalSelect.closest('[data-one-select]');
      this.selectsСlose(selectOneGroup);
    }

    setTimeout(() => {
      if (!selectOptions.classList.contains('_slide')) {
        selectItem.classList.toggle(this.selectClasses.classSelectOpen);
        _slideToggle(selectOptions, originalSelect.dataset.speed);
        if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
          selectItem.style.zIndex = selectOpenzIndex;
        } else {
          setTimeout(() => {
            selectItem.style.zIndex = '';
          }, originalSelect.dataset.speed);
        }
      }
    }, 0);
  }

  setSelectTitleValue(selectItem, originalSelect) {
    const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
    const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
    if (selectItemTitle) selectItemTitle.remove();
    selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
    originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
  }

  getSelectTitleValue(selectItem, originalSelect) {
    let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
    if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
      selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`).join('');
      if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
        document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
        if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
      }
    }
    selectTitleValue = selectTitleValue.length ? selectTitleValue : (originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '');
    let pseudoAttribute = '';
    let pseudoAttributeClass = '';
    if (originalSelect.hasAttribute('data-pseudo-label')) {
      pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заповніть атрибут"`;
      pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
    }
    this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
    if (originalSelect.hasAttribute('data-search')) {
      return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
    } else {
      const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : '';
      return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
    }
  }

  getSelectElementContent(selectOption) {
    const selectOptionImage = selectOption.dataset.image ? `<img src="${selectOption.dataset.image}" alt="" class="select__image">` : '';
    let selectOptionContentHTML = ``;

    // Если есть изображение, оборачиваем его в отдельный span
    if (selectOptionImage) {
      selectOptionContentHTML += `<span class="${this.selectClasses.classSelectRow}">
                                <span class="${this.selectClasses.classSelectData}">
                                  ${selectOptionImage}
                                </span>`;
    }

    // Основной текст option
    const mainText = selectOption.textContent.trim();
    const price = selectOption.dataset.price;

    selectOptionContentHTML += `<span class="${this.selectClasses.classSelectText}">`;
    selectOptionContentHTML += `${mainText}`;
    if (price) {
      selectOptionContentHTML += `<span class="select__price">(${price})</span>`;
    }
    selectOptionContentHTML += `</span>`;

    if (selectOptionImage) {
      selectOptionContentHTML += `</span>`;
    }

    return selectOptionContentHTML;
  }

  getSelectPlaceholder(originalSelect) {
    const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
    if (selectPlaceholder) {
      return {
        value: selectPlaceholder.textContent,
        show: selectPlaceholder.hasAttribute("data-show"),
        label: {
          show: selectPlaceholder.hasAttribute("data-label"),
          text: selectPlaceholder.dataset.label
        }
      };
    }
  }

  getSelectedOptionsData(originalSelect, type) {
    let selectedOptions = [];
    if (originalSelect.multiple) {
      selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
    } else {
      selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
    }
    return {
      elements: selectedOptions.map(option => option),
      values: selectedOptions.filter(option => option.value).map(option => option.value),
      html: selectedOptions.map(option => this.getSelectElementContent(option))
    };
  }

  getOptions(originalSelect) {
    const selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
    const customMaxHeightValue = +originalSelect.dataset.scroll ? +originalSelect.dataset.scroll : null;
    let selectOptions = Array.from(originalSelect.options);
    if (selectOptions.length > 0) {
      let selectOptionsHTML = ``;
      if ((this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) || originalSelect.multiple) {
        selectOptions = selectOptions.filter(option => option.value);
      }
      selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ''} class="${this.selectClasses.classSelectOptionsScroll}">`;
      selectOptions.forEach(selectOption => {
        selectOptionsHTML += this.getOption(selectOption, originalSelect);
      });
      selectOptionsHTML += `</div>`;
      return selectOptionsHTML;
    }
  }

  getOption(selectOption, originalSelect) {
    const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';
    const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple ? `hidden` : ``;
    const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
    const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
    const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';
    let selectOptionHTML = ``;
    selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
    selectOptionHTML += this.getSelectElementContent(selectOption);
    selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
    return selectOptionHTML;
  }

  setOptions(selectItem, originalSelect) {
    const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    selectItemOptions.innerHTML = this.getOptions(originalSelect);
  }

  setOptionsPosition(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
    const customMaxHeightValue = +originalSelect.dataset.scroll ? `${+originalSelect.dataset.scroll}px` : ``;
    const selectOptionsPosMargin = +originalSelect.dataset.optionsMargin ? +originalSelect.dataset.optionsMargin : 10;

    if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
      selectOptions.hidden = false;
      const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue('max-height'));
      const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
      const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
      selectOptions.hidden = true;
      const selectItemHeight = selectItem.offsetHeight;
      const selectItemPos = selectItem.getBoundingClientRect().top;
      const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
      const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);

      if (selectItemResult < 0) {
        const newMaxHeightValue = selectOptionsHeight + selectItemResult;
        if (newMaxHeightValue < 100) {
          selectItem.classList.add('select--show-top');
          selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
        } else {
          selectItem.classList.remove('select--show-top');
          selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
        }
      }
    } else {
      setTimeout(() => {
        selectItem.classList.remove('select--show-top');
        selectItemScroll.style.maxHeight = customMaxHeightValue;
      }, +originalSelect.dataset.speed);
    }
  }

  optionAction(selectItem, originalSelect, optionItem) {
    const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
    if (!selectOptions.classList.contains('_slide')) {
      if (originalSelect.multiple) {
        optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
        const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
        originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
          originalSelectSelectedItem.removeAttribute('selected');
        });
        const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
        selectSelectedItems.forEach(selectSelectedItems => {
          originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
        });
      } else {
        if (!originalSelect.hasAttribute('data-show-selected')) {
          setTimeout(() => {
            if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
              selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
            }
            optionItem.hidden = true;
          }, this.config.speed);
        }
        originalSelect.value = optionItem.hasAttribute('data-value') ? optionItem.dataset.value : optionItem.textContent;
        this.selectAction(selectItem);
      }
      this.setSelectTitleValue(selectItem, originalSelect);
      this.setSelectChange(originalSelect);
    }
  }

  selectChange(e) {
    const originalSelect = e.target;
    this.selectBuild(originalSelect);
    this.setSelectChange(originalSelect);
  }

  setSelectChange(originalSelect) {
    if (originalSelect.hasAttribute('data-validate')) {
      formValidate.validateInput(originalSelect);
    }
    if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
      let tempButton = document.createElement("button");
      tempButton.type = "submit";
      originalSelect.closest('form').append(tempButton);
      tempButton.click();
      tempButton.remove();
    }
    const selectItem = originalSelect.parentElement;
    this.selectCallback(selectItem, originalSelect);
  }

  selectDisabled(selectItem, originalSelect) {
    if (originalSelect.disabled) {
      selectItem.classList.add(this.selectClasses.classSelectDisabled);
      this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
    } else {
      selectItem.classList.remove(this.selectClasses.classSelectDisabled);
      this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
    }
  }

  searchActions(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
    const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
    const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
    const _this = this;

    selectInput.addEventListener("input", function () {
      selectOptionsItems.forEach(selectOptionsItem => {
        if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) {
          selectOptionsItem.hidden = false;
        } else {
          selectOptionsItem.hidden = true;
        }
      });
      selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
    });
  }

  selectCallback(selectItem, originalSelect) {
    document.dispatchEvent(new CustomEvent("selectCallback", {
      detail: {
        select: originalSelect
      }
    }));
  }
}
modules_flsModules.select = new SelectConstructor({});

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

if (document.querySelector('.images-product')) {
  const thumbsSwiper = new Swiper('.images-product__thumb', {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 15,
    speed: 400,
    preloadImages: true,
    navigation: {
      prevEl: '.images-product__arrow-prev',
      nextEl: '.images-product__arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 2.5,
      },
      768: {
        slidesPerView: 3,
      },
    },
  });

  const mainThumbsSwiper = new Swiper('.images-product__slider', {
    thumbs: {
      swiper: thumbsSwiper
    },
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 400,
    preloadImages: true,
    navigation: {
      prevEl: '.images-product__arrow-prev',
      nextEl: '.images-product__arrow-next',
    },
  });

  const thumbsContainer = document.querySelector('.images-product__thumbs');

  thumbsSwiper.on('slideChange', function () {
    if (this.isEnd) {
      thumbsContainer.classList.add('end-slider');
    } else {
      thumbsContainer.classList.remove('end-slider');
    }
  });

  if (thumbsSwiper.isEnd) {
    thumbsContainer.classList.add('end-slider');
  }
}

if (document.querySelector('.tabs__slider')) {
  let swiperTabs = null;
  const tabsNavigations = document.querySelector('.tabs__navigation');

  function initSwiper() {
    if (window.innerWidth > 768 && !swiperTabs) {
      swiperTabs = new Swiper('.tabs__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 50,
        speed: 400,
        navigation: {
          prevEl: '.tabs__arrow-prev',
          nextEl: '.tabs__arrow-next',
        },
      });

      // slideChange
      swiperTabs.on('slideChange', function () {
        if (this.isEnd) {
          tabsNavigations.classList.add('end-slider');
        } else {
          tabsNavigations.classList.remove('end-slider');
        }
      });

      if (swiperTabs.isEnd) {
        tabsNavigations.classList.add('end-slider');
      }

      // После инициализации обновляем swiper
      setTimeout(() => {
        swiperTabs.update();
      }, 100);
    }
  }

  function destroySwiper() {
    if (window.innerWidth <= 768 && swiperTabs) {
      swiperTabs.destroy();
      swiperTabs = null;
      tabsNavigations.classList.remove('end-slider');
    }
  }

  initSwiper();

  window.addEventListener('resize', function () {
    destroySwiper();
    initSwiper();

    if (swiperTabs) {
      setTimeout(() => {
        swiperTabs.update();
      }, 100);
    }
  });
}

if (document.querySelector('.block-products-slider1')) {
  const swiperProducts = new Swiper('.block-products-slider1', {
    observer: true,
    observeParents: true,
    slidesPerView: 4,
    spaceBetween: 0,
    speed: 400,
    navigation: {
      prevEl: '.block-products__arrow-prev',
      nextEl: '.block-products__arrow-next',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      450: {
        slidesPerView: 1.5,
        spaceBetween: 15,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2.5,
        spaceBetween: 15,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      1330: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
    },
  });
}

document.querySelectorAll('.images-block-products__slider').forEach(slider => {
  const paginationEl = slider.closest('.images-block-products')?.querySelector('.images-block-products__pagination');

  if (!paginationEl) {
    console.warn('Pagination not found for slider:', slider);
    return;
  }

  new Swiper(slider, {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 2,
    speed: 400,
    loop: true,
    pagination: {
      el: paginationEl,
      clickable: true,
    },
  });
});

function initAllSliders(className) {
  const sliders = document.querySelectorAll(className);

  sliders.forEach(slider => {
    let swiperInstance = null;

    function initSwiper() {
      if (window.innerWidth <= 1330 && !swiperInstance) {
        // Ищем wrapper внутри текущего слайдера
        const wrapper = slider.querySelector('.block-products__wrapper');

        // Так как стрелки НЕ внутри .block-products-slider2, ищем их глобально
        const prevEl = document.querySelector('.block-products__arrow-prev');
        const nextEl = document.querySelector('.block-products__arrow-next');

        if (!wrapper || !prevEl || !nextEl) return;

        swiperInstance = new Swiper(slider, {
          observer: true,
          observeParents: true,
          slidesPerView: 4,
          spaceBetween: 0,
          speed: 400,
          navigation: {
            prevEl: prevEl,
            nextEl: nextEl,
          },
          breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            450: {
              slidesPerView: 1.5,
              spaceBetween: 15,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 15,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
            1330: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
          },
        });
      }

      if (window.innerWidth > 1330 && swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
    }

    initSwiper();
    window.addEventListener('resize', () => {
      initSwiper();
    });
  });
}
initAllSliders('.block-products-slider2');

//========================================================================================================================================================

document.addEventListener('DOMContentLoaded', function () {
  // Функция для проверки ширины экрана
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Функция для добавления/удаления _active у навигации
  function updateNavigationActiveClass(navigationElement) {
    const hasActiveTab = navigationElement.querySelector('._tab-active');
    if (hasActiveTab) {
      navigationElement.classList.add('_active');
    } else {
      navigationElement.classList.remove('_active');
    }
  }

  // Функция для активации таба по значению селекта
  function activateTabByValue(select, value) {
    const tabSelect = select.querySelector(`option[value="${value}"]`).getAttribute('data-tabs-select') ||
      select.querySelector(`option[value="${value}"]`).getAttribute('data-tabs-select2');
    const navigation = select.closest('.tabs-choose-computer__navigation');

    if (!tabSelect) return;

    // Определяем уровень табов по имени select
    const isFirstLevel = select.getAttribute('name') === 'form[]';
    const isSecondLevel = select.getAttribute('name') === 'form[2]';

    // Деактивируем все табы текущего уровня
    if (isFirstLevel) {
      document.querySelectorAll('.tabs-choose-computer__body[data-tabs-select]').forEach(content => {
        content.classList.remove('_tab-active');
      });
    } else if (isSecondLevel) {
      document.querySelectorAll('.tabs-choose-computer__body[data-tabs-select2]').forEach(content => {
        content.classList.remove('_tab-active');
      });
    }

    // Активируем соответствующий таб
    if (isFirstLevel) {
      const activeContent = document.querySelector(`.tabs-choose-computer__body[data-tabs-select="${tabSelect}"]`);
      if (activeContent) activeContent.classList.add('_tab-active');
    } else if (isSecondLevel) {
      const activeContent = document.querySelector(`.tabs-choose-computer__body[data-tabs-select2="${tabSelect}"]`);
      if (activeContent) activeContent.classList.add('_tab-active');
    }

    // Обновляем класс _active для навигации
    updateNavigationActiveClass(navigation);
  }

  // Инициализация табов
  function initTabs() {
    // Для десктопов - активируем первый таб
    if (!isMobile()) {
      const firstTab = document.querySelector('.tabs-choose-computer__title[data-tabs-select]');
      if (firstTab) firstTab.click();
    } else {
      // Для мобильных - активируем первый option в селектах
      document.querySelectorAll('.tabs-choose-computer__navigation select').forEach(select => {
        if (select.options.length > 0) {
          const firstValue = select.options[0].value;
          activateTabByValue(select, firstValue);
        }
      });
    }
  }

  // Обработчики для кнопок табов
  function setupButtonTabs() {
    // Обработчики для табов первого уровня
    document.querySelectorAll('.tabs-choose-computer__title[data-tabs-select]').forEach(button => {
      button.addEventListener('click', function (e) {
        if (isMobile()) return;

        const tabSelect = this.getAttribute('data-tabs-select');
        const navigation = this.closest('.tabs-choose-computer__navigation');

        // Удаляем активные классы у всех кнопок и контента
        document.querySelectorAll('.tabs-choose-computer__title[data-tabs-select]').forEach(btn => {
          btn.classList.remove('_tab-active');
        });
        document.querySelectorAll('.tabs-choose-computer__body[data-tabs-select]').forEach(content => {
          content.classList.remove('_tab-active');
        });

        // Активируем текущий таб
        this.classList.add('_tab-active');
        const activeContent = document.querySelector(`.tabs-choose-computer__body[data-tabs-select="${tabSelect}"]`);
        if (activeContent) activeContent.classList.add('_tab-active');

        // Обновляем select
        const select = navigation.querySelector('select[name="form[]"]');
        if (select) {
          const option = select.querySelector(`option[data-tabs-select="${tabSelect}"]`);
          if (option) option.selected = true;

          // Инициируем событие change для кастомного селекта
          const event = new Event('change');
          select.dispatchEvent(event);
        }

        updateNavigationActiveClass(navigation);
      });
    });

    // Обработчики для табов второго уровня
    document.querySelectorAll('.tabs-choose-computer__title[data-tabs-select2]').forEach(button => {
      button.addEventListener('click', function (e) {
        if (isMobile()) return;

        const tabSelect = this.getAttribute('data-tabs-select2');
        const navigation = this.closest('.tabs-choose-computer__navigation');

        // Удаляем активные классы
        document.querySelectorAll('.tabs-choose-computer__title[data-tabs-select2]').forEach(btn => {
          btn.classList.remove('_tab-active');
        });
        document.querySelectorAll('.tabs-choose-computer__body[data-tabs-select2]').forEach(content => {
          content.classList.remove('_tab-active');
        });

        // Активируем текущий таб
        this.classList.add('_tab-active');
        const activeContent = document.querySelector(`.tabs-choose-computer__body[data-tabs-select2="${tabSelect}"]`);
        if (activeContent) activeContent.classList.add('_tab-active');

        // Обновляем select
        const select = navigation.querySelector('select[name="form[2]"]');
        if (select) {
          const option = select.querySelector(`option[data-tabs-select2="${tabSelect}"]`);
          if (option) option.selected = true;

          // Инициируем событие change для кастомного селекта
          const event = new Event('change');
          select.dispatchEvent(event);
        }

        updateNavigationActiveClass(navigation);
      });
    });
  }

  // Обработчики для селектов (работает с кастомными селектами)
  function setupSelectTabs() {
    // Слушаем кастомные события от SelectConstructor
    document.addEventListener('selectCallback', function (e) {
      const originalSelect = e.detail.select;
      if (originalSelect.closest('.tabs-choose-computer__navigation')) {
        activateTabByValue(originalSelect, originalSelect.value);
      }
    });

    // Также добавляем обработчики напрямую на select (на случай, если события не всплывают)
    document.querySelectorAll('.tabs-choose-computer__navigation select').forEach(select => {
      select.addEventListener('change', function () {
        activateTabByValue(this, this.value);
      });
    });
  }

  // Инициализация при загрузке
  setupButtonTabs();
  setupSelectTabs();
  initTabs();

  // Обработчик ресайза
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      initTabs();
    }, 250);
  });
});

//Табы
function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }

    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });

    let mdQueriesArray = dataMediaQueries(tabs, "tabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach(mdQueriesItem => {
        mdQueriesItem.matchMedia.addEventListener("change", function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }

  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach(({ item: tabsMediaItem }) => {
      const tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      const tabsTitleItems = Array.from(tabsMediaItem.querySelectorAll('[data-tabs-title]')).filter(
        item => item.closest('[data-tabs]') === tabsMediaItem
      );
      const tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      const tabsContentItems = Array.from(tabsMediaItem.querySelectorAll('.tabs__body')).filter(
        item => item.closest('[data-tabs]') === tabsMediaItem
      );

      if (!tabsTitles || !tabsContent) return;

      const wrapper = tabsTitles.querySelector('.swiper-wrapper');
      if (!wrapper) return;

      if (matchMedia.matches) {
        // Режим спойлера
        tabsContentItems.forEach((contentItem, index) => {
          const titleItem = tabsTitleItems[index];
          if (!titleItem) return;

          tabsContent.append(titleItem);
          tabsContent.append(contentItem);
        });

        tabsMediaItem.classList.add('_tab-spoller');

      } else {
        // Режим табы + Swiper
        wrapper.innerHTML = ''; // очищаем

        tabsTitleItems.forEach(titleItem => {
          const slide = document.createElement('div');
          slide.className = 'swiper-slide';
          slide.appendChild(titleItem);
          wrapper.appendChild(slide);
        });

        tabsContent.innerHTML = '';
        tabsContentItems.forEach(contentItem => {
          tabsContent.appendChild(contentItem);
        });

        tabsMediaItem.classList.remove('_tab-spoller');

        // Если Swiper уже есть — обновляем
        if (window.swiperTabs) {
          setTimeout(() => {
            window.swiperTabs.update();
          }, 100);
        }
      }
    });
  }

  function initTabs(tabsBlock) {
    const tabsTitles = Array.from(tabsBlock.querySelectorAll('[data-tabs-title]'));
    const tabsContent = Array.from(tabsBlock.querySelectorAll('.tabs__body'));
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-title]._tab-active');
      if (tabsActiveTitle) {
        tabsActiveTitle.classList.remove('_tab-active');
      }
    }

    if (tabsContent.length) {
      let activeFound = false;

      tabsContent.forEach((tabsContentItem, index) => {
        const title = tabsTitles[index];
        if (!title) return;

        const isActive = tabsActiveHashBlock && index == tabsActiveHash[1];
        const hasActiveClass = title.classList.contains('_tab-active');

        if (isActive || hasActiveClass || (!activeFound && !tabsActiveHashBlock)) {
          title.classList.add('_tab-active');
          activeFound = true;
        }

        tabsContentItem.hidden = !title.classList.contains('_tab-active');
      });
    }
  }

  function setTabsStatus(tabsBlock) {
    const tabsTitles = Array.from(tabsBlock.querySelectorAll('[data-tabs-title]'));
    const tabsContent = Array.from(tabsBlock.querySelectorAll('.tabs__body'));

    function isTabsAnimate(block) {
      if (block.hasAttribute('data-tabs-animate')) {
        const duration = parseInt(block.dataset.tabsAnimate);
        return isNaN(duration) ? 500 : duration;
      }
      return false;
    }

    const animateDuration = isTabsAnimate(tabsBlock);
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const useHash = tabsBlock.hasAttribute('data-tabs-hash');

    tabsContent.forEach((contentItem, index) => {
      const title = tabsTitles[index];

      if (!title) return;

      const isActive = title.classList.contains('_tab-active');

      if (isActive) {
        if (animateDuration) {
          _slideDown(contentItem, animateDuration);
        } else {
          contentItem.hidden = false;
        }

        if (useHash && !contentItem.closest('.popup')) {
          setHash(`tab-${tabsBlockIndex}-${index}`);
        }
      } else {
        if (animateDuration) {
          _slideUp(contentItem, animateDuration);
        } else {
          contentItem.hidden = true;
        }
      }
    });
  }

  function setTabsAction(e) {
    const el = e.target;
    const tabTitle = el.closest('[data-tabs-title]');
    if (!tabTitle) return;

    const tabsBlock = tabTitle.closest('[data-tabs]');
    if (!tabsBlock) return;

    // Останавливаем всплытие события, чтобы не срабатывали родительские табы
    e.stopPropagation();
    e.preventDefault();

    // Проверяем, в режиме ли спойлера мы сейчас
    const isSpoilerMode = tabsBlock.classList.contains('_tab-spoller');

    // Если клик по активному заголовку и мы в режиме спойлера
    if (isSpoilerMode && tabTitle.classList.contains('_tab-active')) {
      tabTitle.classList.remove('_tab-active');
      setTabsStatus(tabsBlock);
      return;
    }

    // Блокируем действия, если анимация в процессе
    if (tabsBlock.querySelector('._slide')) {
      return;
    }

    // Получаем значение data-tabs-select из нажатого таба
    const tabSelectValue = tabTitle.getAttribute('data-tabs-select');

    // Находим все табы в текущем блоке
    const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');

    // Деактивируем все табы в текущем блоке
    tabsTitles.forEach(title => {
      title.classList.remove('_tab-active');
    });

    // Активируем текущий таб
    tabTitle.classList.add('_tab-active');

    // Находим соответствующий контент
    const tabsContent = tabsBlock.querySelector('[data-tabs-body]');
    if (tabsContent) {
      const tabContents = tabsContent.querySelectorAll('[data-tabs-select]');

      // Скрываем весь контент
      tabContents.forEach(content => {
        content.hidden = true;
      });

      // Показываем только выбранный контент
      const activeContent = tabsContent.querySelector(`[data-tabs-select="${tabSelectValue}"]`);
      if (activeContent) {
        activeContent.hidden = false;
      }
    }

    // Обновляем статус табов
    setTabsStatus(tabsBlock);
  }
}
tabs();

//========================================================================================================================================================

//Показать еще
function showMore() {
  window.addEventListener("load", function (e) {
    const showMoreBlocks = document.querySelectorAll('[data-showmore]');
    let showMoreBlocksRegular;
    let mdQueriesArray;

    if (showMoreBlocks.length) {
      // Блоки без медиазапросов
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(item => !item.dataset.showmoreMedia);
      if (showMoreBlocksRegular.length) initItems(showMoreBlocksRegular);

      // Слушатели событий
      document.addEventListener("click", showMoreActions);
      window.addEventListener("resize", showMoreActions);

      // Работа с медиазапросами
      mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach(mdQueriesItem => {
          mdQueriesItem.matchMedia.addEventListener("change", () => {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          });
        });
        initItemsMedia(mdQueriesArray);
      }
    }

    // Инициализация блоков по медиазапросам
    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach(mdQueriesItem => {
        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }

    // Основная инициализация
    function initItems(showMoreBlocks, matchMedia = false) {
      showMoreBlocks.forEach(showMoreBlock => {
        initItem(showMoreBlock, matchMedia);
      });
    }

    // Инициализация одного блока
    function initItem(showMoreBlock, matchMedia = false) {
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;

      const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
      const showMoreButton = showMoreBlock.querySelector('[data-showmore-button]');

      if (!showMoreContent || !showMoreButton) return;

      const itemsCount = showMoreContent.children.length;
      const limit = parseInt(showMoreContent.dataset.showmoreContent) || 3;

      if (matchMedia.matches || !matchMedia) {
        if (itemsCount > limit) {
          const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
          _slideUp(
            showMoreContent,
            0,
            showMoreBlock.classList.contains('_showmore-active') ? getOriginalHeight(showMoreContent) : hiddenHeight
          );
          showMoreButton.hidden = false;
        } else {
          _slideDown(showMoreContent, 0, getOriginalHeight(showMoreContent));
          showMoreButton.hidden = true;
        }
      } else {
        _slideDown(showMoreContent, 0, getHeight(showMoreBlock, showMoreContent));
        showMoreButton.hidden = true;
      }

      // === НОВАЯ ЛОГИКА: СКРЫТИЕ СЛАЙДОВ ДО 992px ===
      const mediaQuery = window.matchMedia("(max-width: 992px)");
      if (mediaQuery.matches) {
        limitSlidesAtMobile(showMoreBlock);
      } else {
        resetSlides(showMoreBlock);
      }

      // Обновляем при изменении размера экрана
      mediaQuery.addEventListener("change", e => {
        if (e.matches) {
          limitSlidesAtMobile(showMoreBlock);
        } else {
          resetSlides(showMoreBlock);
        }
      });
    }

    // === НОВАЯ ФУНКЦИЯ: ОГРАНИЧИТЬ СЛАЙДЫ ДО 4 ШТУК (МОБИЛЬНЫЙ РЕЖИМ) ===
    function limitSlidesAtMobile(showMoreBlock) {
      const container = showMoreBlock.querySelector('.block-products__slider');
      if (!container) return;

      const slides = container.querySelectorAll('.swiper-slide');
      const limit = 4;

      // Скрываем лишние слайды
      slides.forEach((slide, index) => {
        slide.style.display = index < limit ? 'block' : 'none';
      });

      const button = showMoreBlock.querySelector('[data-showmore-button]');
      if (!button) return;

      button.hidden = slides.length <= limit;
      button.onclick = function (e) {
        e.preventDefault();
        const isActive = showMoreBlock.classList.contains('_showmore-active');

        // Показываем или скрываем все слайды
        slides.forEach((slide, index) => {
          slide.style.display = isActive ? (index < limit ? 'block' : 'none') : 'block';
        });

        showMoreBlock.classList.toggle('_showmore-active', !isActive);
        button.setAttribute('aria-expanded', !isActive);
      };
    }

    // === НОВАЯ ФУНКЦИЯ: ПОКАЗАТЬ ВСЕ СЛАЙДЫ НА DESKTOP ===
    function resetSlides(showMoreBlock) {
      const container = showMoreBlock.querySelector('.block-products__slider');
      if (!container) return;

      const slides = container.querySelectorAll('.swiper-slide');
      slides.forEach(slide => {
        slide.style.display = '';
      });

      const button = showMoreBlock.querySelector('[data-showmore-button]');
      if (button) button.hidden = true;
    }

    // Расчёт высоты видимой части
    function getHeight(showMoreBlock, showMoreContent) {
      let hiddenHeight = 0;
      const showMoreType = showMoreBlock.dataset.showmore || 'size';
      const rowGap = parseFloat(getComputedStyle(showMoreContent).rowGap) || 0;

      if (showMoreType === 'items') {
        const limit = parseInt(showMoreContent.dataset.showmoreContent) || 3;
        const items = Array.from(showMoreContent.children);

        for (let i = 0; i < Math.min(limit, items.length); i++) {
          const item = items[i];
          const marginTop = parseFloat(getComputedStyle(item).marginTop) || 0;
          const marginBottom = parseFloat(getComputedStyle(item).marginBottom) || 0;

          hiddenHeight += item.offsetHeight + marginTop;
          if (i < limit - 1 && i < items.length - 1) {
            hiddenHeight += marginBottom + rowGap;
          }
        }
      } else {
        const heightValue = parseInt(showMoreContent.dataset.showmoreContent) || 150;
        hiddenHeight = heightValue;
      }

      return hiddenHeight;
    }

    // Получение полной высоты контента
    function getOriginalHeight(showMoreContent) {
      const parentHidden = showMoreContent.closest('[hidden]');
      if (parentHidden) parentHidden.hidden = false;
      const originalHeight = showMoreContent.scrollHeight;
      if (parentHidden) parentHidden.hidden = true;
      return originalHeight;
    }

    // Обработка кликов и ресайза
    function showMoreActions(e) {
      const targetEvent = e.target;
      const targetType = e.type;

      if (targetType === 'click') {
        const button = targetEvent.closest('[data-showmore-button]');
        if (button) {
          const showMoreBlock = button.closest('[data-showmore]');
          const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]');
          const speed = showMoreBlock.dataset.showmoreButton || 500;
          const hiddenHeight = getHeight(showMoreBlock, showMoreContent);

          if (!showMoreContent.classList.contains('_slide')) {
            showMoreBlock.classList.contains('_showmore-active')
              ? _slideUp(showMoreContent, speed, hiddenHeight)
              : _slideDown(showMoreContent, speed, getOriginalHeight(showMoreContent));

            showMoreBlock.classList.toggle('_showmore-active');
          }
        }
      } else if (targetType === 'resize') {
        if (showMoreBlocksRegular?.length) initItems(showMoreBlocksRegular);
        if (mdQueriesArray?.length) initItemsMedia(mdQueriesArray);
      }
    }
  });
}
showMore();

//========================================================================================================================================================

Fancybox.bind("[data-fancybox]", {
  // опции
});

//========================================================================================================================================================

//Попап
class Popup {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      attributeOpenButton: "data-popup",
      attributeCloseButton: "data-close",
      fixElementSelector: "[data-lp]",
      youtubeAttribute: "data-popup-youtube",
      youtubePlaceAttribute: "data-popup-youtube-place",
      setAutoplayYoutube: true,
      classes: {
        popup: "popup",
        popupContent: "popup__content",
        popupActive: "popup_show",
        bodyActive: "popup-show"
      },
      focusCatch: true,
      closeEsc: true,
      bodyLock: true,
      hashSettings: {
        goHash: true
      },
      on: {
        beforeOpen: function () { },
        afterOpen: function () { },
        beforeClose: function () { },
        afterClose: function () { }
      }
    };
    this.youTubeCode;
    this.isOpen = false;
    this.targetOpen = {
      selector: false,
      element: false
    };
    this.previousOpen = {
      selector: false,
      element: false
    };
    this.lastClosed = {
      selector: false,
      element: false
    };
    this._dataValue = false;
    this.hash = false;
    this._reopen = false;
    this._selectorOpen = false;
    this.lastFocusEl = false;
    this._focusEl = ["a[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "button:not([disabled]):not([aria-hidden])", "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "area[href]", "iframe", "object", "embed", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'];
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings
      },
      on: {
        ...config.on,
        ...options?.on
      }
    };
    this.bodyLock = false;
    this.options.init ? this.initPopups() : null;
  }
  initPopups() {
    this.eventsPopup();
  }
  eventsPopup() {
    document.addEventListener("click", function (e) {
      const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`);
      if (buttonOpen) {
        e.preventDefault();
        this._dataValue = buttonOpen.getAttribute(this.options.attributeOpenButton) ? buttonOpen.getAttribute(this.options.attributeOpenButton) : "error";
        this.youTubeCode = buttonOpen.getAttribute(this.options.youtubeAttribute) ? buttonOpen.getAttribute(this.options.youtubeAttribute) : null;
        if ("error" !== this._dataValue) {
          if (!this.isOpen) this.lastFocusEl = buttonOpen;
          this.targetOpen.selector = `${this._dataValue}`;
          this._selectorOpen = true;
          this.open();
          return;
        }
        return;
      }
      const buttonClose = e.target.closest(`[${this.options.attributeCloseButton}]`);
      if (buttonClose || !e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
    }.bind(this));
    document.addEventListener("keydown", function (e) {
      if (this.options.closeEsc && 27 == e.which && "Escape" === e.code && this.isOpen) {
        e.preventDefault();
        this.close();
        return;
      }
      if (this.options.focusCatch && 9 == e.which && this.isOpen) {
        this._focusCatch(e);
        return;
      }
    }.bind(this));
    if (this.options.hashSettings.goHash) {
      window.addEventListener("hashchange", function () {
        if (window.location.hash) this._openToHash(); else this.close(this.targetOpen.selector);
      }.bind(this));
      window.addEventListener("load", function () {
        if (window.location.hash) this._openToHash();
      }.bind(this));
    }
  }
  open(selectorValue) {
    if (bodyLockStatus) {
      this.bodyLock = document.documentElement.classList.contains("lock") && !this.isOpen ? true : false;
      if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen) this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;
      this.targetOpen.element = document.querySelector(this.targetOpen.selector);
      if (this.targetOpen.element) {
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement("iframe");
          iframe.setAttribute("allowfullscreen", "");
          const autoplay = this.options.setAutoplayYoutube ? "autoplay;" : "";
          iframe.setAttribute("allow", `${autoplay}; encrypted-media`);
          iframe.setAttribute("src", urlVideo);
          if (!this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) {
            this.targetOpen.element.querySelector(".popup__text").setAttribute(`${this.options.youtubePlaceAttribute}`, "");
          }
          this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).appendChild(iframe);
        }
        const videoElement = this.targetOpen.element.querySelector("video");
        if (videoElement) {
          videoElement.muted = true;
          videoElement.currentTime = 0;
          videoElement.play().catch((e => console.error("Autoplay error:", e)));
        }
        if (this.options.hashSettings.location) {
          this._getHash();
          this._setHash();
        }
        this.options.on.beforeOpen(this);
        document.dispatchEvent(new CustomEvent("beforePopupOpen", {
          detail: {
            popup: this
          }
        }));
        this.targetOpen.element.classList.add(this.options.classes.popupActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);
        if (!this._reopen) !this.bodyLock ? bodyLock() : null; else this._reopen = false;
        this.targetOpen.element.setAttribute("aria-hidden", "false");
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;
        this._selectorOpen = false;
        this.isOpen = true;
        this.options.on.afterOpen(this);
        document.dispatchEvent(new CustomEvent("afterPopupOpen", {
          detail: {
            popup: this
          }
        }));
      }
    }
  }
  close(selectorValue) {
    if (selectorValue && "string" === typeof selectorValue && "" !== selectorValue.trim()) this.previousOpen.selector = selectorValue;
    if (!this.isOpen || !bodyLockStatus) return;
    this.options.on.beforeClose(this);
    document.dispatchEvent(new CustomEvent("beforePopupClose", {
      detail: {
        popup: this
      }
    }));
    if (this.youTubeCode) if (this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`)) this.targetOpen.element.querySelector(`[${this.options.youtubePlaceAttribute}]`).innerHTML = "";
    this.previousOpen.element.classList.remove(this.options.classes.popupActive);
    const videoElement = this.previousOpen.element.querySelector("video");
    if (videoElement) videoElement.pause();
    this.previousOpen.element.setAttribute("aria-hidden", "true");
    if (!this._reopen) {
      document.documentElement.classList.remove(this.options.classes.bodyActive);
      !this.bodyLock ? bodyUnlock() : null;
      this.isOpen = false;
    }
    document.dispatchEvent(new CustomEvent("afterPopupClose", {
      detail: {
        popup: this
      }
    }));
  }
  _getHash() {
    if (this.options.hashSettings.location) this.hash = this.targetOpen.selector.includes("#") ? this.targetOpen.selector : this.targetOpen.selector.replace(".", "#");
  }
  _openToHash() {
    let classInHash = document.querySelector(`.${window.location.hash.replace("#", "")}`) ? `.${window.location.hash.replace("#", "")}` : document.querySelector(`${window.location.hash}`) ? `${window.location.hash}` : null;
    const buttons = document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) ? document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash}"]`) : document.querySelector(`[${this.options.attributeOpenButton} = "${classInHash.replace(".", "#")}"]`);
    if (buttons && classInHash) this.open(classInHash);
  }
  _setHash() {
    history.pushState("", "", this.hash);
  }
  _removeHash() {
    history.pushState("", "", window.location.href.split("#")[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);
    if (e.shiftKey && 0 === focusedIndex) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
}
modules_flsModules.popup = new Popup({});

function menuOpen() {
  bodyLock();
  document.documentElement.classList.add("menu-open");
}
function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove("menu-open");
}


//========================================================================================================================================================

//Форма
function formFieldsInit(options = { viewPass: true, autoHeight: false }) {
  document.body.addEventListener("focusin", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.add('_form-focus');
        targetElement.parentElement.classList.add('_form-focus');
      }
      formValidate.removeError(targetElement);
      targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
    }
  });
  document.body.addEventListener("focusout", function (e) {
    const targetElement = e.target;
    if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.remove('_form-focus');
        targetElement.parentElement.classList.remove('_form-focus');
      }
      targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
    }
  });
  if (options.viewPass) {
    document.addEventListener("click", function (e) {
      const targetElement = e.target;
      if (targetElement.closest('.form__viewpass')) {
        const viewpassBlock = targetElement.closest('.form__viewpass');
        const input = viewpassBlock.closest('.form__input').querySelector('input');

        if (input) {
          const isActive = viewpassBlock.classList.contains('_viewpass-active');
          input.setAttribute("type", isActive ? "password" : "text");
          viewpassBlock.classList.toggle('_viewpass-active');
        } else {
          console.error('Input не найден!');
        }
      }
    });
  }
  if (options.autoHeight) {
    const textareas = document.querySelectorAll('textarea[data-autoheight]');
    if (textareas.length) {
      textareas.forEach(textarea => {
        const startHeight = textarea.hasAttribute('data-autoheight-min') ?
          Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
        const maxHeight = textarea.hasAttribute('data-autoheight-max') ?
          Number(textarea.dataset.autoheightMax) : Infinity;
        setHeight(textarea, Math.min(startHeight, maxHeight))
        textarea.addEventListener('input', () => {
          if (textarea.scrollHeight > startHeight) {
            textarea.style.height = `auto`;
            setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
          }
        });
      });
      function setHeight(textarea, height) {
        textarea.style.height = `${height}px`;
      }
    }
  }
}
formFieldsInit({
  viewPass: true,
  autoHeight: false
});
let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach(formRequiredItem => {
        if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;

    if (formRequiredItem.dataset.required === "email") {
      formRequiredItem.value = formRequiredItem.value.replace(" ", "");
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
      this.addError(formRequiredItem);
      this.removeSuccess(formRequiredItem);
      error++;
    } else if (formRequiredItem.dataset.validate === "password-confirm") {
      // Проверяем, совпадает ли пароль с полем #password
      const passwordInput = document.getElementById('password');
      if (!passwordInput) return error;

      if (formRequiredItem.value !== passwordInput.value) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        this.removeSuccess(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
        this.addSuccess(formRequiredItem);
      }
    }

    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('_form-error');
    formRequiredItem.parentElement.classList.add('_form-error');
    let inputError = formRequiredItem.parentElement.querySelector('.form__error');
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('_form-error');
    formRequiredItem.parentElement.classList.remove('_form-error');
    if (formRequiredItem.parentElement.querySelector('.form__error')) {
      formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
    }
  },
  addSuccess(formRequiredItem) {
    formRequiredItem.classList.add('_form-success');
    formRequiredItem.parentElement.classList.add('_form-success');
  },
  removeSuccess(formRequiredItem) {
    formRequiredItem.classList.remove('_form-success');
    formRequiredItem.parentElement.classList.remove('_form-success');
  },
  formClean(form) {
    form.reset();
    setTimeout(() => {
      let inputs = form.querySelectorAll('input,textarea');
      for (let index = 0; index < inputs.length; index++) {
        const el = inputs[index];
        el.parentElement.classList.remove('_form-focus');
        el.classList.remove('_form-focus');
        formValidate.removeError(el);
      }
      let checkboxes = form.querySelectorAll('.checkbox__input');
      if (checkboxes.length > 0) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
        }
      }
      if (flsModules.select) {
        let selects = form.querySelectorAll('div.select');
        if (selects.length) {
          for (let index = 0; index < selects.length; index++) {
            const select = selects[index].querySelector('select');
            flsModules.select.selectBuild(select);
          }
        }
      }
    }, 0);
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
  }
};
function formSubmit() {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener('submit', function (e) {
        const form = e.target;
        formSubmitAction(form, e);
      });
      form.addEventListener('reset', function (e) {
        const form = e.target;
        formValidate.formClean(form);
      });
    }
  }
  async function formSubmitAction(form, e) {
    const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');
      if (ajax) {
        e.preventDefault();
        const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
        const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
        const formData = new FormData(form);

        form.classList.add('_sending');
        const response = await fetch(formAction, {
          method: formMethod,
          body: formData
        });
        if (response.ok) {
          let responseResult = await response.json();
          form.classList.remove('_sending');
          formSent(form, responseResult);
        } else {
          alert("Помилка");
          form.classList.remove('_sending');
        }
      } else if (form.hasAttribute('data-dev')) {
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();
      if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
        const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
        gotoBlock(formGoToErrorClass, true, 1000);
      }
    }
  }
  function formSent(form, responseResult = ``) {
    document.dispatchEvent(new CustomEvent("formSent", {
      detail: {
        form: form
      }
    }));
    setTimeout(() => {
      if (flsModules.popup) {
        const popup = form.dataset.popupMessage;
        popup ? flsModules.popup.open(popup) : null;
      }
    }, 0);
    formValidate.formClean(form);
    formLogging(`Форму відправлено!`);
  }
  function formLogging(message) {
    FLS(`[Форми]: ${message}`);
  }
}
formSubmit()

//========================================================================================================================================================

//Смена картинки
let blockProductsSlide = document.querySelectorAll('.block-products__slide');
blockProductsSlide.forEach(slide => {
  const optionItems = slide.querySelectorAll('.options__item');
  const previewImage = slide.querySelector('.option-pic');

  if (previewImage && optionItems.length > 0) {
    optionItems.forEach(item => {
      item.addEventListener('click', function () {
        optionItems.forEach(i => i.classList.remove('_active'));
        this.classList.add('_active');

        const newImageSrc = this.querySelector('.options-image').dataset.optionsImage;
        if (newImageSrc) {
          previewImage.src = newImageSrc;
        }
      });
    });
  }
});

//========================================================================================================================================================

//Копировать
let copyBtn = document.querySelector('.copy-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', async function () {
    const span = document.querySelector('.form__copy span');
    const originalText = document.querySelector('.form__copy-text').textContent;
    const copiedText = span.textContent;

    // Пытаемся скопировать через Clipboard API
    try {
      await navigator.clipboard.writeText(copiedText);

      // Меняем текст в .form__copy-text на "Скопировано!"
      const copyTextElement = document.querySelector('.form__copy-text');
      copyTextElement.textContent = 'Скопировано!';

      // Возвращаем оригинальный текст через 2 секунды
      setTimeout(() => {
        copyTextElement.textContent = originalText;
      }, 2000);

    } catch (err) {
      console.error('Не удалось скопировать: ', err);
      alert('Не удалось скопировать текст. Проверьте настройки браузера.');
    }
  });
}

//========================================================================================================================================================

document.addEventListener('DOMContentLoaded', () => {
  const revealClasses = ['title1', 'title2'];
  const visibleClass = 'is-visible';
  const isMobile = window.innerWidth < 768;

  const style = document.createElement('style');
  style.textContent = revealClasses.map(cls => `
    .${cls} {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
      transition-delay: 0.12s;
      will-change: opacity, transform;
    }
    .${cls}.${visibleClass} {
      opacity: 1;
      transform: translateY(0);
    }
  `).join('\n');
  document.head.appendChild(style);

  const excludedSelectors = ['.no-reveal', '.disable-reveal'];

  function isExcluded(el) {
    return excludedSelectors.some(sel =>
      el.matches(sel) || el.closest(sel)
    );
  }

  const revealElements = revealClasses.flatMap(cls =>
    Array.from(document.querySelectorAll(`.${cls}`))
  );

  revealElements.forEach(el => {
    if (isMobile && isExcluded(el)) {
      revealClasses.forEach(cls => el.classList.remove(cls));
      // Сброс inline-стилей
      el.style.opacity = '';
      el.style.transform = '';
      el.style.transition = '';
      el.style.willChange = '';
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
        } else {
          entry.target.classList.remove(visibleClass);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
      if (!(isMobile && isExcluded(el))) {
        observer.observe(el);
      }
    });
  } else {
    console.warn('IntersectionObserver не поддерживается в этом браузере.');
  }
});

//========================================================================================================================================================

const allTabsContainers = document.querySelectorAll('[data-tabs]');

allTabsContainers.forEach(container => {
  const titles = container.querySelectorAll('[data-tabs-title]');
  const bodies = container.querySelectorAll('[data-tabs-body] > [data-tabs-select]');

  // Скрыть все табы внутри этого контейнера
  function hideAllTabs() {
    titles.forEach(title => title.classList.remove('_tab-active'));
    bodies.forEach(body => body.classList.remove('_tab-active'));
  }

  // Показать активный таб по умолчанию
  function showDefaultTab() {
    const activeTitle = container.querySelector('[data-tabs-title]._tab-active') ||
      titles[0];
    const target = activeTitle ? activeTitle.getAttribute('data-tabs-select') : null;
    const activeBody = container.querySelector(`[data-tabs-body] > [data-tabs-select="${target}"]`);

    if (activeTitle && activeBody) {
      activeTitle.classList.add('_tab-active');
      activeBody.classList.add('_tab-active');
    }
  }

  // Назначить обработчики клика
  titles.forEach(title => {
    title.addEventListener('click', function () {
      const target = this.getAttribute('data-tabs-select');
      const activeBody = container.querySelector(`[data-tabs-body] > [data-tabs-select="${target}"]`);

      if (!activeBody) return;

      hideAllTabs();
      this.classList.add('_tab-active');
      activeBody.classList.add('_tab-active');
    });
  });

  // Инициализация: показываем первый таб
  showDefaultTab();
});