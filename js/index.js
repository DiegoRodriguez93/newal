(function ($) {

    $('header').html(header);
    $('footer').html(footer);

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {

        $(".loader").fadeOut();
        $("#preloder").delay(100).fadeOut("slow");


        const player = new Plyr('#player', {
            debug: false,
            title: 'Video de muestra',
            keyboard: {
              global: true,
            },
            tooltips: {
              controls: true,
            },
      
          });

          $.ajax({
              type: "GET",
              url: "https://alamazon.ml/cursos",
              dataType: "JSON",
              success: function (data) {

                console.log(data)
                let cursos = '';
            
                $.each(data, function (i, v) { 

                    cursos += `<div onclick="location.replace('curso.html?curso=${v.url}&capitulo=')" class="col-lg-4 mix entrepreneurship">
                    <div class="curso_reedirect">
                        <div class="podcast__item__pic_index">
                            <img src="${v.profile_url}" alt="">
                        </div>
                        <div class="ml-2">
                            <h3 class="price">U$D ${v.price}</h3>
                            <h5 class="gobold">${v.name}</h5>      
                        </div>
                    </div>
                    </div>`;
                     
                });

                $('.podcast-filter').html(cursos);

              }
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


})(jQuery);