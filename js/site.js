/* Shared behaviour for every page: the chosen Casa, the header popover and mobile menu,
   and the lists built from js/data.js. */
var CM = (function () {
  var STORAGE_KEY = 'casa-mexico:casa';

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function readStoredCasa() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function storeCasa(id) {
    try { localStorage.setItem(STORAGE_KEY, id); } catch (e) { /* the choice just lasts for this page */ }
  }
  function findCasa(id) {
    return LOCS.filter(function (l) { return l.id === id; })[0];
  }

  /* Hours are the restaurant's, so "today" is today in Ottawa wherever the visitor is. */
  function todayIndex() {
    var day = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Toronto', weekday: 'short' }).format(new Date());
    return DAYS.indexOf(day);
  }
  function todayText(l) {
    var h = l.hours[todayIndex()];
    return h === 'Closed' ? 'Closed today' : 'Today ' + h;
  }
  function todayLong(l) {
    var h = l.hours[todayIndex()];
    return h === 'Closed' ? 'Closed today' : 'Open today, ' + h;
  }

  /* The week from Monday, with runs of identical hours grouped: "Mon-Thu 12-9 pm". */
  function groupHours(hours) {
    var groups = [];
    [1, 2, 3, 4, 5, 6, 0].forEach(function (d) {
      var last = groups[groups.length - 1];
      if (last && last.h === hours[d]) { last.end = d; } else { groups.push({ start: d, end: d, h: hours[d] }); }
    });
    return groups.map(function (g) {
      return { days: g.start === g.end ? DAYS[g.start] : DAYS[g.start] + '-' + DAYS[g.end], h: g.h };
    });
  }

  /* ---- Lists built from the data ---- */

  var renderers = {
    options: function (l) {
      return '<button type="button" class="option cm-btn" aria-pressed="false" data-pick="' + l.id + '">' +
        '<span class="dot"></span>' +
        '<span class="option__text"><span class="name">' + esc(l.name) + '</span><span class="street">' + esc(l.street) + '</span></span>' +
        '<span class="today">' + esc(todayText(l)) + '</span></button>';
    },
    'home-cards': function (l) {
      return '<div class="shell casa-card" data-casa-card="' + l.id + '"><article class="face">' +
        '<div class="casa-card__head"><h3 class="casa-name">' + esc(l.name) + '</h3><span class="badge badge-your" hidden>Your Casa</span></div>' +
        '<span class="muted">' + esc(l.street) + '</span>' +
        '<span class="today-line"><span class="ms" aria-hidden="true">schedule</span>' + esc(todayLong(l)) + '</span>' +
        '<div class="casa-card__actions">' +
        '<a class="cm-btn btn btn-call is-large" href="locations.html" aria-label="Visit ' + esc(l.name) + '">Visit</a>' +
        '<a class="cm-btn btn btn-outline" href="' + esc(l.map) + '" aria-label="Directions to ' + esc(l.name) + '"><span class="ms ms-18" aria-hidden="true">near_me</span>Directions</a>' +
        '</div></article></div>';
    },
    'location-cards': function (l) {
      var hours = groupHours(l.hours).map(function (g) {
        return '<div><span>' + esc(g.days) + '</span><span>' + esc(g.h) + '</span></div>';
      }).join('');
      return '<div class="shell casa-card" data-casa-card="' + l.id + '"><article class="face is-roomy is-location">' +
        '<div class="casa-card__head is-tall"><span class="casa-card__brand">Casa México</span><span class="badge badge-your" hidden>Your Casa</span></div>' +
        '<h2 class="casa-name">' + esc(l.name) + '</h2>' +
        '<span class="muted">' + esc(l.addr) + '</span>' +
        '<span class="today-line"><span class="ms" aria-hidden="true">schedule</span>' + esc(todayLong(l)) + '</span>' +
        '<div class="hours">' + hours + '</div>' +
        '<a class="cm-link casa-phone" href="' + esc(l.tel) + '"><span class="ms" aria-hidden="true">call</span><span class="underline">' + esc(l.phone) + '</span></a>' +
        '<span class="casa-phone-note">Call to order pickup or book a table</span>' +
        '<div class="casa-card__foot"><a class="cm-btn btn btn-outline" href="' + esc(l.map) + '" aria-label="Directions to ' + esc(l.name) + '"><span class="ms ms-18" aria-hidden="true">near_me</span>Directions</a></div>' +
        '<button type="button" class="cm-link btn-text make-mine" data-pick="' + l.id + '" aria-label="Make this my Casa, ' + esc(l.name) + '">Make this my Casa</button>' +
        '</article></div>';
    },
    'call-list': function (l) {
      return '<a class="cm-link" href="' + esc(l.tel) + '"><span>' + esc(l.name) + '</span><span>' + esc(l.phone) + '</span></a>';
    },
    'footer-casas': function (l) {
      return '<div class="site-footer__casa"><a class="cm-link" href="locations.html">' + esc(l.name) + '</a>' +
        '<span>' + esc(l.street) + '</span><a class="cm-link" href="' + esc(l.tel) + '">' + esc(l.phone) + '</a></div>';
    }
  };

  function renderLists() {
    document.querySelectorAll('[data-render]').forEach(function (el) {
      el.innerHTML = LOCS.map(renderers[el.getAttribute('data-render')]).join('');
    });
  }

  /* ---- The chosen Casa ---- */

  var current = findCasa(readStoredCasa()) || LOCS[0];

  function applyCasa() {
    var values = { name: current.name, phone: current.phone, todayLong: todayLong(current) };
    var links = { tel: current.tel, uber: current.uber, skip: current.skip };

    document.querySelectorAll('[data-casa-text]').forEach(function (el) {
      el.textContent = values[el.getAttribute('data-casa-text')];
    });
    document.querySelectorAll('[data-casa-href]').forEach(function (el) {
      el.href = links[el.getAttribute('data-casa-href')];
    });
    /* aria-label templates: "Call to order or book, Casa México {name}" */
    document.querySelectorAll('[data-casa-aria]').forEach(function (el) {
      el.setAttribute('aria-label', el.getAttribute('data-casa-aria').replace('{name}', current.name));
    });
    document.querySelectorAll('.option[data-pick]').forEach(function (el) {
      el.setAttribute('aria-pressed', el.getAttribute('data-pick') === current.id ? 'true' : 'false');
    });
    document.querySelectorAll('[data-casa-card]').forEach(function (el) {
      var selected = el.getAttribute('data-casa-card') === current.id;
      el.classList.toggle('is-selected', selected);
      el.querySelector('.badge-your').hidden = !selected;
    });
  }

  function announce(message) {
    var live = document.querySelector('[data-live]');
    if (live) live.textContent = message;
  }

  function setCasa(id) {
    var next = findCasa(id);
    if (!next) return;
    current = next;
    storeCasa(id);
    applyCasa();
    announce('Your Casa is ' + current.name + '. ' + todayLong(current) + '.');
    document.dispatchEvent(new CustomEvent('casachange'));
  }

  /* ---- Header: Casa popover and mobile menu ---- */

  function initHeader() {
    var trigger = document.querySelector('[data-casa-trigger]');
    var popover = document.querySelector('[data-casa-menu]');
    var burger = document.querySelector('[data-nav-toggle]');
    var sheet = document.querySelector('[data-nav-sheet]');

    function setPopover(open) {
      popover.hidden = !open;
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    function setSheet(open) {
      sheet.hidden = !open;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      burger.querySelector('.ms').textContent = open ? 'close' : 'menu';
    }

    trigger.addEventListener('click', function () {
      var open = popover.hidden;
      setPopover(open);
      setSheet(false);
      if (open) popover.querySelector('[aria-pressed="true"]').focus();
    });
    burger.addEventListener('click', function () {
      setSheet(sheet.hidden);
      setPopover(false);
    });

    document.addEventListener('click', function (e) {
      var pick = e.target.closest('[data-pick]');
      if (pick) {
        setCasa(pick.getAttribute('data-pick'));
        if (popover.contains(pick)) { setPopover(false); trigger.focus(); }
        return;
      }
      if (!popover.hidden && !popover.contains(e.target) && !trigger.contains(e.target)) setPopover(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (!popover.hidden) { setPopover(false); trigger.focus(); }
      if (!sheet.hidden) { setSheet(false); burger.focus(); }
    });
  }

  renderLists();
  applyCasa();
  initHeader();

  return {
    esc: esc,
    announce: announce,
    todayLong: todayLong,
    current: function () { return current; }
  };
})();
