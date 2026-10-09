(function () {
  var nav = document.querySelector('[data-navigation]');
  if (!nav) return;

  var page = window.location.pathname.split('/').pop() || 'index.html';
  var items = [
    ['index.html', 'Strona główna'],
    ['cooperation.html', 'Współpraca'],
    ['me.html', 'O mnie'],
    ['contact.html', 'Kontakt']
  ];
  nav.innerHTML = '<div class="naglowek-wnetrze"><nav class="nawigacja-glowna"><ul>' +
    items.map(function (item) {
      var active = item[0] === page ? ' class="aktywna"' : '';
      return '<li><a href="' + item[0] + '"' + active + '>' + item[1] + '</a></li>';
    }).join('') +
    '</ul></nav></div>';

  var primaryLinks = nav.querySelectorAll('.nawigacja-glowna a');

  document.addEventListener('pointerup', function (event) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    primaryLinks.forEach(function (link) {
      var bounds = link.getBoundingClientRect();
      var clickedLink = event.clientX >= bounds.left && event.clientX <= bounds.right &&
        event.clientY >= bounds.top && event.clientY <= bounds.bottom;

      if (clickedLink) {
        event.preventDefault();
        window.location.assign(link.href);
      }
    });
  }, true);

  function createSectionId(heading, index) {
    var base = heading.textContent.trim().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/ł/g, 'l').replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'sekcja';
    var id = base;
    var duplicate = 2;

    while (document.getElementById(id)) {
      id = base + '-' + duplicate++;
    }
    return id || 'sekcja-' + (index + 1);
  }

  function addSectionNavigation() {
    var headings = document.querySelectorAll('main h2');
    if (!headings.length) return;

    var sectionNav = document.createElement('nav');
    var list = document.createElement('ul');
    sectionNav.className = 'nawigacja-sekcji';
    sectionNav.setAttribute('aria-label', 'Na tej stronie');

    headings.forEach(function (heading, index) {
      if (!heading.id) heading.id = createSectionId(heading, index);

      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent.trim();
      item.appendChild(link);
      list.appendChild(item);
    });

    sectionNav.appendChild(list);
    nav.querySelector('.naglowek-wnetrze').appendChild(sectionNav);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSectionNavigation);
  } else {
    addSectionNavigation();
  }
}());
