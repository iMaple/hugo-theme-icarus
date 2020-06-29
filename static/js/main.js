(function ($, moment, ClipboardJS, config) {
  $('.article img:not(".not-gallery-item")').each(function () {
    if ($(this).parent('a').length === 0) {
      $(this).wrap('<a class="gallery-item" href="' + $(this).attr('src') + '"></a>');
      if (this.alt) {
        $(this).after('<p class="has-text-centered is-size-6 caption">' + this.alt + '</p>');
      }
    }
  });

  if (typeof $.fn.lightGallery === 'function') {
    $('.article').lightGallery({selector: '.gallery-item'});
  }
  if (typeof $.fn.justifiedGallery === 'function') {
    if ($('.justified-gallery > p > .gallery-item').length) {
      $('.justified-gallery > p > .gallery-item').unwrap();
    }
    $('.justified-gallery').justifiedGallery();
  }

  if (!$('.columns .column-right-shadow').children().length) {
    $('.columns .column-right-shadow').append($('.columns .column-right').children().clone());
  }

  if (typeof moment === 'function') {
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
      $('.navbar-main .navbar-menu').addClass('justify-content-start');
    } else {
      $('.navbar-main .navbar-menu').removeClass('justify-content-start');
    }
  }

  adjustNavbar();
  $(window).resize(adjustNavbar);

  function toggleFold(codeBlock, isFolded) {
    const $toggle = $(codeBlock).find('.fold i');
    !isFolded ? $(codeBlock).removeClass('folded') : $(codeBlock).addClass('folded');
    !isFolded ? $toggle.removeClass('fa-angle-right') : $toggle.removeClass('fa-angle-down');
    !isFolded ? $toggle.addClass('fa-angle-down') : $toggle.addClass('fa-angle-right');
  }

  function createFoldButton(fold) {
    return '<span class="fold">' + (fold === 'unfolded' ? '<i class="fas fa-angle-down"></i>' : '<i class="fas fa-angle-right"></i>') + '</span>';
  }

  /**
   * CSS兼容, p1/3
   */
  /* - Start - */
  $('div.highlight').each(function () {
    const $figure = $('<figure class="highlight"></figure>')
    $(this).replaceWith($figure.append($(this).children().children()))
  });
  /* -- End -- */

  $('figure.highlight table').wrap('<div class="highlight-body">');
  if (typeof config !== 'undefined'
    && typeof config.article !== 'undefined'
    && typeof config.article.highlight !== 'undefined') {

    $('figure.highlight').addClass('hljs');
    /**
     * CSS兼容, p2/3
     */
    /* - Start - */
    // $('figure.highlight .code .line span').each(function() {
    //   const classes = $(this).attr('class').split(/\s+/);
    //   if (classes.length === 1) {
    //     $(this).addClass('hljs-' + classes[0]);
    //     $(this).removeClass(classes[0]);
    //   }
    // });
    /* -- End -- */

    const clipboard = config.article.highlight.clipboard;
    const fold = config.article.highlight.fold.trim();

    $('figure.highlight').each(function () {

      /**
       * CSS兼容, p3/3
       */
      /* - Start - */
      const trs = $(this).find('div.highlight-body > table.lntable > tbody > tr');
      trs.children(':first').addClass('gutter');
      trs.children(':last').addClass('code');
      $(this).find('td.lntd > pre.chroma > code > span').each(function () {
        $(this).addClass('line')
      });
      $(this).find('td.code > pre > code').each(function (i, block) {
        hljs.highlightBlock(block);
      });
      /* -- End -- */

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

    if (typeof ClipboardJS !== 'undefined' && clipboard) {
      $('figure.highlight').each(function () {
        const id = 'code-' + Date.now() + (Math.random() * 1000 | 0);
        const button = '<a href="javascript:;" class="copy" title="Copy" data-clipboard-target="#' + id + ' .code"><i class="fas fa-copy"></i></a>';
        $(this).attr('id', id);
        $(this).find('figcaption div.level-right').append(button);
      });
      new ClipboardJS('.highlight .copy'); // eslint-disable-line no-new
    }

    if (fold) {
      $('figure.highlight').each(function () {
        if ($(this).find('figcaption').find('span').length > 0) {
          const span = $(this).find('figcaption').find('span');
          if (span[0].innerText.indexOf('>folded') > -1) {
            span[0].innerText = span[0].innerText.replace('>folded', '');
            $(this).find('figcaption div.level-left').prepend(createFoldButton('folded'));
            toggleFold(this, true);
            return;
          }
        }
        $(this).find('figcaption div.level-left').prepend(createFoldButton(fold));
        toggleFold(this, fold === 'folded');
      });

      $('figure.highlight figcaption .fold').click(function () {
        const $code = $(this).closest('figure.highlight');
        toggleFold($code.eq(0), !$code.hasClass('folded'));
      });
    }
  }

  const $toc = $('#toc');
  if ($toc.length > 0) {
    const $mask = $('<div>');
    $mask.attr('id', 'toc-mask');

    $('body').append($mask);

    function toggleToc() { // eslint-disable-line no-inner-declarations
      $toc.toggleClass('is-active');
      $mask.toggleClass('is-active');
    }

    $toc.on('click', toggleToc);
    $mask.on('click', toggleToc);
    $('.navbar-main .catalogue').on('click', toggleToc);
  }

  /**
   * ToC兼容, p1/1
   */
  /* - Start - */
  const $ntoc = $('#TableOfContents');
  if ($ntoc.length > 0) {
    function buildToc(next, prefix, level) {
      next.each(function (index) {
        const a = $(this).children('a');
        a.addClass('is-flex');
        const text = a.text();
        const sn = prefix + (level === 1 ? '' : '.') + (index + 1);
        const span = `<span class="mr-2">${sn}</span><span>${text}</span>`;
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
  /* -- End -- */

  // hexo-util/lib/is_external_link.js
  function isExternalLink(input, sitehost, exclude) {
    try {
      sitehost = new URL(sitehost).hostname;
    } catch (e) {
    }

    if (!sitehost) return false;

    // handle relative url
    let data;
    try {
      data = new URL(input, 'http://' + sitehost);
    } catch (e) {
      return false;
    }

    // handle mailto: javascript: vbscript: and so on
    if (data.origin === 'null') return false;

    const host = data.hostname;

    if (exclude) {
      exclude = Array.isArray(exclude) ? exclude : [exclude];

      if (exclude && exclude.length) {
        for (const i of exclude) {
          if (host === i) return false;
        }
      }
    }

    if (host !== sitehost) return true;

    return false;
  }

  if (typeof config !== 'undefined'
    && typeof config.site.url !== 'undefined'
    && typeof config.site.external_link !== 'undefined'
    && config.site.external_link.enable) {
    $('.article .content a').filter((i, link) => {
      return link.href
        && !$(link).attr('href').startsWith('#')
        && link.classList.length === 0
        && isExternalLink(link.href,
          config.site.url,
          config.site.external_link.exclude);
    }).each((i, link) => {
      link.relList.add('noopener');
      link.target = '_blank';
    });
  }
}(jQuery, window.moment, window.ClipboardJS, window.IcarusThemeSettings));
