'use strict';

(function ($) {

    $('header').html(header);
    $('footer').html(footer);

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {

        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");


        const player = new Plyr('#player', {
            debug: false,
            title: 'View From A Blue Moon',
            keyboard: {
              global: true,
            },
            tooltips: {
              controls: true,
            },
      
          });

    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    /*------------------
		Magnific
	--------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

})(jQuery);