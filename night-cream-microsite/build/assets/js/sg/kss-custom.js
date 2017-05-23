(function ($) {
  $(function () {

    var $window = $(window),
      $document = $(document),
      $content = $('.kss-content'),
      $sidebar = $('.kss-sidebar'),
      $sidebarInner = $('.kss-sidebar-inner'),
      $menu = $('.kss-menu'),
      $childMenu = $('.kss-menu-child'),
      $menuItem = $menu.find('.kss-menu-item'),
      $childMenuItem = $childMenu.find('.kss-menu-item'),
      ref = $menu.data('kss-ref'),
      prevScrollTop;

    // Dynamic menu activation
    function scrollSpy() {
      var scrollTop = $window.scrollTop(),
        $anchors = $childMenu.find('a'),
        activeIndex;
      $anchors.each(function (index) {
        var $target = $($(this).attr('href').replace(/\./g, '\\.')),
          offsetTop = $target.offset().top,
          offsetBottom = offsetTop + $target.outerHeight(true);
        if (offsetTop <= scrollTop && scrollTop < offsetBottom) {
          activeIndex = index;
          return false;
        }
      });
      $childMenuItem.removeClass('kss-active');
      if (typeof activeIndex !== 'undefined') {
        $childMenuItem.eq(activeIndex).addClass('kss-active');
      }
    }

    // Fix sidebar position
    function fixSidebar() {
      if ($sidebarInner.outerHeight() < $content.outerHeight()) {
        $sidebar.addClass('kss-fixed');
        if ($sidebarInner.outerHeight() > $window.height()) {
          $sidebar.height($window.height());
          $window.on('scroll', scrollSidebar).trigger('scroll');
        }
        else {
          $sidebar.height('auto');
          $window.off('scroll', scrollSidebar);
        }
      }
      else {
        $sidebar.removeClass('kss-fixed');
        $sidebar.height('auto');
        $window.off('scroll', scrollSidebar);
      }
    }

    // Synchronize sidebar scroll
    function scrollSidebar(event) {
      if (event.handled !== true) {
        var scrollTop = $window.scrollTop(),
          maxScrollTop = $document.height() - $window.height();
        if (scrollTop >= 0 && prevScrollTop >= 0 && scrollTop <= maxScrollTop && prevScrollTop <= maxScrollTop) {  // for Mac scrolling
          $sidebar.scrollTop($sidebar.scrollTop() + (scrollTop - prevScrollTop));
        }
        prevScrollTop = scrollTop;
        event.handled = true;
      }
      else {
        return false;
      }
    }

    // Activate current page item
    $menuItem.eq(ref).addClass('kss-active');

    // Append child menu and attach scrollSpy
    if ($childMenu.length) {
      $childMenu.show().appendTo($menuItem.eq(ref));
      $window.on('scroll', scrollSpy).trigger('scroll');
    }

    // Fixed sidebar
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      $window.on('resize', fixSidebar).trigger('resize');
    }

    // Syntax hightlignting with Rainbow.js
    $('code.html').attr('data-language', 'html');
    $('code.css').attr('data-language', 'css');
    $('code.less, code.scss, code.styl').attr('data-language', 'generic');

    function insertCustomCode() {
      var $custom = $('.kss-custom');

      if ($custom.length) {
        var html = $custom.html(),
        $parent = $custom.parent().parent(),
        list = html.split(';');

        for(var i=0; i < list.length; i++) {
          var $el = $($.parseHTML(list[i]));
          var sel = $el.data('sel') || ('.'+$el[1].className);
          var desc = $el.data('desc') || $el.text();
          $el.removeAttr('sel');
          $el.removeAttr('desc');

          var html = '<div class="kss-modifier">';
              html +=  '<div class="kss-modifier-head">';
              html +=    '<div class="kss-modifier-name">'+sel+'</div>';
              html +=      '<div class="kss-modifier-description"><p>'+desc+'</p></div></div>'
              html +=    '<div class="kss-modifier-example ksskss">'+list[i]+'</div></div>';
          
          var $html = $($.parseHTML(html));

          $html.insertBefore( $parent.find( '.kss-markup' ) );

        }
      }
    }
    setTimeout(insertCustomCode, 500);

  });
}(jQuery));