/**
 * ToC兼容, p1/1
 */
/* - Start - */
(function ($, config) {
  function buildToc(next, prefix, level) {
    next.each(function (index) {
      const a = $(this).children('a');
      a.addClass('level is-mobile');
      const text = a.text();
      const sn = prefix + (level === 1 ? '' : '.') + (index + 1);
      const span = `<span class="level-left">${config.toc.index?`<span class="level-item">${sn}</span>`:null}<span class="level-item">${text}</span></span>`;
      a.text('');
      a.append(span);
      const ul = $(this).children('ul')
      if (ul) {
        ul.addClass('menu-list')
        buildToc(ul.children(), sn);
      }
    });
  }
  const ul = $('#toc').find('#TableOfContents > ul').addClass('menu-list').unwrap()
  if (ul) {
    buildToc(ul.children(), '', 1);
  }
}(jQuery, window.IcarusThemeSettings));
/* -- End -- */

(function (window, document) {
  function register($toc) {
    const currentInView = new Set();
    const headingToMenu = new Map();
    const $menus = Array.from($toc.querySelectorAll('.menu-list > li > a'));

    for (const $menu of $menus) {
      const elementId = $menu.getAttribute('href').trim().slice(1);
      const $heading = document.getElementById(elementId);
      if ($heading) {
        headingToMenu.set($heading, $menu);
      }
    }

    const $headings = Array.from(headingToMenu.keys());

    const callback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          currentInView.add(entry.target);
        } else {
          currentInView.delete(entry.target);
        }
      }
      let $heading;
      if (currentInView.size) {
        // heading is the first in-view heading
        $heading = [...currentInView].sort(($el1, $el2) => $el1.offsetTop - $el2.offsetTop)[0];
      } else if ($headings.length) {
        // heading is the closest heading above the viewport top
        $heading = $headings
          .filter(($heading) => $heading.offsetTop < window.scrollY)
          .sort(($el1, $el2) => $el2.offsetTop - $el1.offsetTop)[0];
      }
      if ($heading && headingToMenu.has($heading)) {
        $menus.forEach(($menu) => $menu.classList.remove('is-active'));

        const $menu = headingToMenu.get($heading);
        $menu.classList.add('is-active');
        let $menuList = $menu.parentElement.parentElement;
        while (
          $menuList.classList.contains('menu-list') &&
          $menuList.parentElement.tagName.toLowerCase() === 'li'
          ) {
          $menuList.parentElement.children[0].classList.add('is-active');
          $menuList = $menuList.parentElement.parentElement;
        }
      }
    };
    const observer = new IntersectionObserver(callback, { threshold: 0 });

    for (const $heading of $headings) {
      observer.observe($heading);
      // smooth scroll to the heading
      if (headingToMenu.has($heading)) {
        const $menu = headingToMenu.get($heading);
        $menu.setAttribute('data-href', $menu.getAttribute('href'));
        $menu.setAttribute('href', 'javascript:;');
        $menu.addEventListener('click', () => {
          if (typeof $heading.scrollIntoView === 'function') {
            $heading.scrollIntoView({ behavior: 'smooth' });
          }
        });
        $heading.style.scrollMargin = '1em';
      }
    }
  }

  if (typeof window.IntersectionObserver === 'undefined') {
    return;
  }

  document.querySelectorAll('#toc').forEach(register);
})(window, document);
