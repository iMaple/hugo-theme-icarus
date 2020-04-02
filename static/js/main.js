(function ($) {

  $('.article img:not(".not-gallery-item")').each(function () {
    if ($(this).parent('a').length === 0) {
      $(this).wrap('<a class="gallery-item" href="' + $(this).attr('src') + '"></a>');
      if (this.alt) {
        $(this).after('<div class="has-text-centered is-size-6 has-text-grey caption">' + this.alt + '</div>');
      }
    }
  });

  if (typeof (moment) === 'function') {
    $('.article-meta time').each(function () {
      $(this).text(moment($(this).attr('datetime')).fromNow());
    });
  }

  $('.article > .content > table').each(function () {
    if ($(this).width() > $(this).parent().width()) {
      $(this).wrap('<div class="table-overflow"></div>');
    }
  });

  function adjustNavbar() {
    const navbarWidth = $('.navbar-main .navbar-start').outerWidth() + $('.navbar-main .navbar-end').outerWidth();
    if ($(document).outerWidth() < navbarWidth) {
      $('.navbar-main .navbar-menu').addClass('is-flex-start');
    } else {
      $('.navbar-main .navbar-menu').removeClass('is-flex-start');
    }
  }

  adjustNavbar();
  $(window).resize(adjustNavbar);

  $('div.highlight > div.chroma').addClass('highlight-body');
  if (typeof (IcarusThemeSettings) !== 'undefined' &&
    typeof (IcarusThemeSettings.article) !== 'undefined' &&
    typeof (IcarusThemeSettings.article.highlight) !== 'undefined') {

    const clipboard = IcarusThemeSettings.article.highlight.clipboard;
    const fold = IcarusThemeSettings.article.highlight.fold.trim();

    $('div.highlight').each(function () {
      const trs = $(this).find('div.chroma > table.lntable > tbody > tr');
      trs.children(':first').addClass('gutter');
      trs.children(':last').addClass('code');
      $(this).find('td.code > pre > code').each(function (i, block) {
        hljs.highlightBlock(block);
      });

      if ($(this).find('figcaption').length) {
        $(this).find('figcaption').addClass('level is-mobile');
        $(this).find('figcaption').append('<div class="level-left">');
        $(this).find('figcaption').append('<div class="level-right">');
        $(this).find('figcaption div.level-left').append($(this).find('figcaption').find('span'));
        $(this).find('figcaption div.level-right').append($(this).find('figcaption').find('a'));
      } else {
        if (clipboard || fold) {
          $(this).prepend('<figcaption class="level is-mobile"><div class="level-left"></div><div class="level-right"></div></figcaption>');
        }
      }
    });

    if (typeof (ClipboardJS) !== 'undefined' && clipboard) {
      $('div.highlight').each(function () {
        const id = 'code-' + Date.now() + (Math.random() * 1000 | 0);
        const button = '<a href="javascript:;" class="copy" title="Copy" data-clipboard-target="#' + id + ' .code"><i class="fas fa-copy"></i></a>';
        $(this).attr('id', id);
        $(this).find('figcaption div.level-right').append(button);
      });
      new ClipboardJS('.highlight .copy');
    }

    if (fold) {
      let button = '<span class="fold">' + (fold === 'unfolded' ? '<i class="fas fa-angle-down"></i>' : '<i class="fas fa-angle-right"></i>') + '</span>';
      $('div.highlight').each(function () {
        if ($(this).find('figcaption').find('span').length > 0) {
          let spanArr = $(this).find('figcaption').find('span');
          if (spanArr[0].innerText.indexOf('>folded') > -1) {
            // 去掉folded
            spanArr[0].innerText = spanArr[0].innerText.replace('>folded', '');
            button = '<span class="fold"><i class="fas fa-angle-right"></i></span>';
            $(this).find('figcaption div.level-left').prepend(button);

            // 收叠代码块
            toggleFold(this, true);
            return;
          }
        }
        $(this).find('figcaption div.level-left').prepend(button);
        toggleFold(this, fold === 'folded');
      });

      function toggleFold(codeBlock, isFolded) {
        const $toggle = $(codeBlock).find('.fold i');
        !isFolded ? $(codeBlock).removeClass('folded') : $(codeBlock).addClass('folded');
        !isFolded ? $toggle.removeClass('fa-angle-right') : $toggle.removeClass('fa-angle-down');
        !isFolded ? $toggle.addClass('fa-angle-down') : $toggle.addClass('fa-angle-right');
      }

      $('div.highlight figcaption .fold').click(function () {
        const $code = $(this).closest('div.highlight');
        toggleFold($code.eq(0), !$code.hasClass('folded'));
      });
    }
  }

  const $toc = $('#toc');
  if ($toc.length > 0) {
    const $mask = $('<div>');
    $mask.attr('id', 'toc-mask');

    $('body').append($mask);

    function toggleToc() {
      $toc.toggleClass('is-active');
      $mask.toggleClass('is-active');
    }

    $toc.on('click', toggleToc);
    $mask.on('click', toggleToc);
    $('.navbar-main .catalogue').on('click', toggleToc);
  }

  const $ntoc = $('#TableOfContents');
  if ($ntoc.length > 0) {
    function buildToc(next, prefix, level) {
      next.each(function (index) {
        const a = $(this).children('a');
        a.addClass('is-flex');
        const text = a.text();
        const sn = prefix + (level === 1 ? '' : '.') + (index + 1);
        const span = `<span class="has-mr-6">${sn}</span><span>${text}</span>`;
        a.text('');
        a.append(span);
        if ($(this).children('ul')) {
          buildToc($(this).children('ul').children(), sn);
        }
      });
    }

    const ul = $ntoc.children('ul');
    ul.addClass('menu-list');
    if (ul) {
      buildToc(ul.children(), '', 1);
    }
  }

})(jQuery);
