/* The Menu page: dishes for the chosen Casa, by category, with the vegetarian filter. */
(function () {
  var esc = CM.esc;
  var DIETS = [{ id: 'all', label: 'All' }, { id: 'veg', label: 'Vegetarian' }];
  var state = { cat: 'tacos', diet: 'all' };

  var els = {
    tabs: document.querySelector('[data-menu-tabs]'),
    filters: document.querySelector('[data-menu-filters]'),
    note: document.querySelector('[data-menu-note]'),
    title: document.querySelector('[data-menu-title]'),
    dishes: document.querySelector('[data-menu-dishes]'),
    empty: document.querySelector('[data-menu-empty]'),
    emptyText: document.querySelector('[data-menu-empty-text]'),
    clear: document.querySelector('[data-menu-clear]')
  };

  function toggleButtons(list, attr, selected) {
    return list.map(function (x) {
      return '<button type="button" class="cm-btn" ' + attr + '="' + x.id + '" aria-pressed="' + (x.id === selected) + '">' + esc(x.label) + '</button>';
    }).join('');
  }

  function isVegetarian(dish) {
    var tags = dish.t || [];
    return tags.indexOf(VG) >= 0 || tags.indexOf(VN) >= 0;
  }

  function visibleDishes(key) {
    return MENU.filter(function (dish) {
      return dish.c === state.cat &&
        Object.prototype.hasOwnProperty.call(dish.pr, key) &&
        (state.diet !== 'veg' || isVegetarian(dish));
    });
  }

  function dishHtml(dish, i, key, casaName) {
    var desc = dish.d && typeof dish.d === 'object' ? (dish.d[key] || '') : (dish.d || '');
    var only = Object.keys(dish.pr).length === 1;
    var meta = '';
    if (dish.fav) meta += '<span class="fav"><span class="ms" aria-hidden="true">star</span>House favourite</span>';
    if (only) meta += '<span class="only">Only at ' + esc(casaName) + '</span>';
    (dish.t || []).forEach(function (t) { meta += '<span class="tag">' + esc(t) + '</span>'; });
    if (dish.note) meta += '<span class="item-note">' + esc(dish.note) + '</span>';

    return '<article class="dish cm-reveal" style="animation-delay:' + Math.min(i, 10) * 45 + 'ms">' +
      '<div class="item-head"><h3>' + esc(dish.n) + '</h3><span class="leader" aria-hidden="true"></span>' +
      '<span class="item-price">' + esc(dish.pr[key]) + '</span></div>' +
      (desc ? '<p class="item-desc">' + esc(desc) + '</p>' : '') +
      (meta ? '<div class="item-meta">' + meta + '</div>' : '') +
      '</article>';
  }

  function render() {
    var casa = CM.current();
    var cat = CATS.filter(function (c) { return c.id === state.cat; })[0];
    var dishes = visibleDishes(casa.k);

    els.title.textContent = cat.label;
    els.note.textContent = NOTES[state.cat] || '';
    els.note.hidden = !NOTES[state.cat];
    els.dishes.innerHTML = dishes.map(function (dish, i) { return dishHtml(dish, i, casa.k, casa.name); }).join('');
    els.empty.hidden = dishes.length > 0;
    els.emptyText.textContent = 'No vegetarian dishes in ' + cat.label.toLowerCase() + ' at ' + casa.name + '.';

    CM.announce('Showing ' + cat.label + ' at ' + casa.name + (state.diet === 'veg' ? ', vegetarian only' : '') + '. ' +
      dishes.length + (dishes.length === 1 ? ' dish.' : ' dishes.'));
  }

  function setPressed(container, attr, selected) {
    container.querySelectorAll('[' + attr + ']').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute(attr) === selected ? 'true' : 'false');
    });
  }

  els.tabs.innerHTML = toggleButtons(CATS, 'data-cat', state.cat);
  els.filters.innerHTML = toggleButtons(DIETS, 'data-diet', state.diet);

  els.tabs.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]');
    if (!b) return;
    state.cat = b.getAttribute('data-cat');
    setPressed(els.tabs, 'data-cat', state.cat);
    render();
  });
  function setDiet(diet) {
    state.diet = diet;
    setPressed(els.filters, 'data-diet', diet);
    render();
  }
  els.filters.addEventListener('click', function (e) {
    var b = e.target.closest('[data-diet]');
    if (b) setDiet(b.getAttribute('data-diet'));
  });
  els.clear.addEventListener('click', function () { setDiet('all'); });
  document.addEventListener('casachange', render);

  render();
})();
