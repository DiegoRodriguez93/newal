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
                localStorage.setItem('data',JSON.stringify(data))
                let source = '';

                if(data.error){
                    $(".loader").fadeOut();
                    $("#preloder").delay(500).fadeOut("slow");
                    return false;
                }

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

                  $('.episodes__breadcrumb__text').html(`<h2>${data.curso[0].name}</h2>`); //name h2 del curso

                  //capitulos right side
                  $('#player').css('display', 'block');

                  let capitulos = '<h4>Capítulos</h4>';

                  $.each(data.capitulos, function (i, v) { 
                       capitulos += `
                    <a href="curso.html?curso=${data.curso[0].url}&capitulo=${v.number}" class="sidebar__recent__item">
                       <h6>${v.name}</h6>
                       <p><span class="icon_profile"></span> ${v.profesor}</p>
                   </a>`
                  });

                  $('.sidebar__recent').html(capitulos);

                  let leftBottomPart = `<div class="col-lg-6 col-md-6 col-sm-6"></div>`;
                  let rightBottomPart = '<div class="col-lg-6 col-md-6 col-sm-6"></div>';

                  //capitulos bottom side
                  if(capitulo != 1){
                      leftBottomPart = `<div class="col-lg-6 col-md-6 col-sm-6">
                      <a href="curso.html?curso=${data.curso[0].url}&capitulo=${data.capitulos[data.capitulo_actual.number - 2].number}" class="episodes__details__btns__item">
                          <p><span class="arrow_left"></span> Anterior Video</p>
                          <h5>${data.capitulos[data.capitulo_actual.number - 2].name}</h5>
                      </a>
                    </div>`;
                  }

                  if(data.capitulos[data.capitulos.length - 1].number != capitulo){
                    rightBottomPart = `<div class="col-lg-6 col-md-6 col-sm-6">
                    <a href="curso.html?curso=${data.curso[0].url}&capitulo=${data.capitulos[data.capitulo_actual.number].number}"
                    class="episodes__details__btns__item episodes__details__btns__item--next">
                    <p>Siguiente Video <span class="arrow_right"></span></p>
                    <h5>${data.capitulos[data.capitulo_actual.number].name}</h5>
                </a>
            </div>`;
                  }

                  $('.episodes__details__btns').append(leftBottomPart);
                  $('.episodes__details__btns').append(rightBottomPart);





                  
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