(function ($) {

    $('header').html(header);
    $('footer').html(footer);

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {



        const params    = new URL(location.href).searchParams;
        const curso     = params.get('curso');
        const capitulo  = params.get('capitulo');

        $.ajax({
            type: "GET",
            url: "https://alamazon.ml/curso?curso="+curso+"&capitulo="+capitulo,
            dataType: "JSON",
            success: function (data) {
                console.log(data)
                let source = '';

                $.each(data.video_data, function (i, v) { 
                     source += `<source
                     src="https://alamazon.ml/${v.url}"
                     type="video/mp4"
                     size="${v.resolution}"
                   />`;
                });
                $('#player').html(source);

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

                  $('.episodes__details__text')
                  .html(`
                  <h4>${data.capitulo_actual.name}</h4>
                  <h6 style="color:#007bff;margin-bottom:8px"><span class="icon_profile"></span> ${data.capitulo_actual.profesor}</h6>
                  <p>${data.capitulo_actual.descripcion}</p>
                  `);

                  let capitulos = '<h4>Capítulos</h4>';

                  $.each(data.capitulos, function (i, v) { 
                       capitulos += `
                    <a href="#" class="sidebar__recent__item">
                       <h6>${v.name}</h6>
                       <p><span class="icon_profile"></span> ${v.profesor}</p>
                   </a>`
                  });

                  $('.sidebar__recent').html(capitulos);

                  
                $(".loader").fadeOut();
                $("#preloder").delay(500).fadeOut("slow");

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