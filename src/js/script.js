const dropdown = {

  // Init dropdown
  init: function () {

    const dd = $('.dropdown');
    const option = $('.dropdown option');

    // 1. We create HTML base for custom dropdown
    dd.append('' +
      '<div class="at-dropdown">' +
      '<div class="at-dropdown__top">' +
      'Veuillez sélectionner' +
      '</div>' +
      '<div class="at-dropdown__bottom">' +
      '<div class="at-dropdown__legend">Taille :</div>' +
      '<ul class="at-dropdown__list"></ul>' +
      '</div>' +
      '</div>' +
      '');

    const list = $('.at-dropdown__list');

    // 2. For each option, we just append new html with correct data
    option.each(function (i) {

      const _ = $(this);

      // Get data
      const text = _.text();
      const stock = _.attr('data-stock');
      const price = _.attr('data-price');
      let stockText = "";

      if (stock > 4) {
        stockText = "En stock";
      } else if (stock > 1) {
        stockText = `Vite, plus que ${stock} en stock !`;
      } else if (stock > 0) {
        stockText = "C'est le dernier, dépêchez vous !"
      } else {
        stockText = "Épuisé";
      }

      // Append HTML for each option expect the first one
      if (i !== 0) {
        list.append('' +
          '<li class="at-dropdown__list__option">' +
          '<div class="at-dropdown__list__option__inside">' +
          '<div class="at-dropdown__item at-dropdown__item--strong jsItemText">' + text + '</div>' +
          '<div class="at-dropdown__item">' + stockText + '</div>' +
          '<div class="at-dropdown__item at-dropdown__item--mea">' + price + '</div>' +
          '</div>' +
          '</li>' +
          '');
      }
    });

    dropdown.choice();
  },

  choice: function () {
    const dd = $('.dropdown');
    const top = $('.at-dropdown__top');
    const bottom = $('.at-dropdown__bottom');
    const option = $('.at-dropdown__list__option');

    // Open select on click
    dd.on('click', '.at-dropdown__top', function () {
      top.toggleClass('is-open');
      bottom.toggleClass('show');
    });

    // Hide dropdown if the clik is outside of the dropdown
    $(document).click(function(e) {
      if (!$(e.target).closest('.at-dropdown__top, .at-dropdown__bottom').length) {
        dropdown.close();
      }
    });

    // Change the text of the select when an option is choosed
    dd.on('click', '.at-dropdown__list__option', function () {
      const _ = $(this);
      const optionChoosed = _.find('.jsItemText').text();
      top.text(optionChoosed);
      dropdown.close();
    });

  },

  close: function () {
    const top = $('.at-dropdown__top');
    const bottom = $('.at-dropdown__bottom');

    top.removeClass('is-open');
    bottom.removeClass('show');
  }

};

$(document).ready(function () {
  dropdown.init();
});